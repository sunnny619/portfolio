import fs from "node:fs";
import path from "node:path";

/* ══════════════════════════════════════════════════════════════
   content/posts/*.md 를 읽어옵니다.
   파일 이름이 글 주소가 됩니다 — vrt-migration.md → /blog/vrt-migration
   ══════════════════════════════════════════════════════════════ */

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  tag: string;
  /** 원본 그대로 (2026-07-15) */
  date: string;
  /** 목록에 쓰는 표기 (2026.07.15) */
  dateLabel: string;
  /** 본문에 쓰는 표기 (2026년 7월 15일) */
  dateLong: string;
  summary: string;
  body: string;
};

/** 파일 맨 위 --- 사이의 설정을 읽는다. 값에 : 가 들어가도 괜찮다. */
function parseFrontmatter(raw: string) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!match) return { meta: {} as Record<string, string>, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(":");
    if (at === -1) continue;
    const key = line.slice(0, at).trim();
    const value = line
      .slice(at + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");
    if (key) meta[key] = value;
  }
  return { meta, body: raw.slice(match[0].length) };
}

function formatDates(value: string) {
  const [y, m, d] = value.split(/[-.]/).map((part) => part.trim());
  if (!y || !m || !d) return { dateLabel: value, dateLong: value };
  return {
    dateLabel: `${y}.${m.padStart(2, "0")}.${d.padStart(2, "0")}`,
    dateLong: `${y}년 ${Number(m)}월 ${Number(d)}일`,
  };
}

/** 요약이 없으면 본문 첫 문단에서 만들어 쓴다. */
function firstParagraph(body: string) {
  for (const chunk of body.split(/\n\s*\n/)) {
    const text = chunk.trim();
    if (!text || text.startsWith("#") || text.startsWith("```")) continue;
    const plain = text
      .replace(/[`*>]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    return plain.length > 110 ? `${plain.slice(0, 110)}…` : plain;
  }
  return "";
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, name), "utf8");
      const { meta, body } = parseFrontmatter(raw);
      const slug = name.replace(/\.md$/, "");
      const date = meta.date ?? "";

      return {
        slug,
        title: meta.title ?? slug,
        tag: meta.tag ?? "기타",
        date,
        ...formatDates(date),
        summary: meta.summary || firstParagraph(body),
        body,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

/** 홈 Posts 섹션에 보여줄 개수 */
export const HOME_POST_COUNT = 4;

/** 글들의 tag 에서 카테고리 목록을 자동으로 만든다. */
export function getCategories() {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    counts.set(post.tag, (counts.get(post.tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));
}
