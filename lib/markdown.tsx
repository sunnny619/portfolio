import type { ReactNode } from "react";

/* ══════════════════════════════════════════════════════════════
   아주 작은 마크다운 렌더러 — 추가 패키지 없이 동작합니다.

   지원하는 문법
     ## / ###        제목 (목차에 잡히는 건 ## 입니다)
     빈 줄로 나눈 문단
     - 또는 *        글머리 목록
     1.              번호 목록
     > 인용
     ```코드블록```  (``` 뒤에 언어 이름 적어도 됩니다)
     | 표 | 표 |
     ---             구분선
     인라인: `코드`  **굵게**  *기울임*  [링크](주소)  ![이미지](주소)  ![[옵시디언이미지]]
   ══════════════════════════════════════════════════════════════ */

export type Heading = { id: string; text: string };

/** 제목 글자로 앵커 id 를 만든다. 한글은 그대로 두고 공백만 - 로 바꾼다. */
function slugify(text: string, used: Set<string>) {
  const base =
    text
      .toLowerCase()
      .replace(/[`*_[\]()]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "") || "section";

  let slug = base;
  let n = 2;
  while (used.has(slug)) slug = `${base}-${n++}`;
  used.add(slug);
  return slug;
}

/* ── 인라인 ────────────────────────────────────────────────── */

const INLINE =
  /(`[^`]+`)|(!\[\[[^\]]+\]\])|(!\[[^\]]*\]\([^)]+\))|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/;

function obsidianImageSource(value: string) {
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return `/blog-assets/${value}`;
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let i = 0;

  while (rest.length > 0) {
    const match = INLINE.exec(rest);
    if (!match || match.index === undefined) {
      out.push(rest);
      break;
    }

    if (match.index > 0) out.push(rest.slice(0, match.index));
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;

    if (token.startsWith("`")) {
      out.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("![[")) {
      const value = token.slice(3, -2).trim();
      const [target, label] = value.split("|").map((part) => part.trim());
      const src = obsidianImageSource(target);
      const alt = label || target.replace(/^.*\//, "");
      // 글 안의 이미지는 크기를 알 수 없어 next/image 대신 img 를 쓴다
      // eslint-disable-next-line @next/next/no-img-element
      out.push(<img key={key} src={src} alt={alt} />);
    } else if (token.startsWith("![")) {
      const [, alt, src] = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(token) ?? [];
      // 글 안의 이미지는 크기를 알 수 없어 next/image 대신 img 를 쓴다
      // eslint-disable-next-line @next/next/no-img-element
      out.push(<img key={key} src={src} alt={alt ?? ""} />);
    } else if (token.startsWith("[")) {
      const [, label, href] = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token) ?? [];
      const external = href?.startsWith("http");
      out.push(
        <a
          key={key}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {label}
        </a>,
      );
    } else if (token.startsWith("**")) {
      out.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      out.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    rest = rest.slice(match.index + token.length);
  }

  return out;
}

function isTableRow(line: string) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.includes("|");
}

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function tableAlign(cell: string) {
  const normalized = cell.trim();
  if (!/^:?-{3,}:?$/.test(normalized)) return null;
  if (normalized.startsWith(":") && normalized.endsWith(":")) return "center";
  if (normalized.endsWith(":")) return "right";
  return "left";
}

function parseTableDivider(line: string) {
  if (!isTableRow(line)) return null;
  const aligns = splitTableRow(line).map(tableAlign);
  return aligns.every(Boolean) ? aligns : null;
}

/* ── 블록 ──────────────────────────────────────────────────── */

export function renderMarkdown(source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  const headings: Heading[] = [];
  const used = new Set<string>();
  let key = 0;
  let i = 0;

  const paragraph = (buffer: string[]) => {
    if (buffer.length === 0) return;
    const text = buffer.join(" ").trim();
    if (text) blocks.push(<p key={`p${key++}`}>{inline(text, `p${key}`)}</p>);
    buffer.length = 0;
  };

  const buffer: string[] = [];

  while (i < lines.length) {
    const line = lines[i];

    // 코드 블록
    if (line.trimStart().startsWith("```")) {
      paragraph(buffer);
      const lang = line.trim().slice(3).trim();
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1; // 닫는 ```
      blocks.push(
        <pre key={`c${key++}`} data-lang={lang || undefined}>
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // 표
    const divider = i + 1 < lines.length ? parseTableDivider(lines[i + 1]) : null;
    if (isTableRow(line) && divider) {
      paragraph(buffer);
      const headers = splitTableRow(line);
      const rows: string[][] = [];
      i += 2;

      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }

      blocks.push(
        <div className="md-table-wrap" key={`t${key++}`}>
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    style={{ textAlign: divider[index] ?? "left" }}
                  >
                    {inline(header, `th${key}-${index}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{ textAlign: divider[cellIndex] ?? "left" }}
                    >
                      {inline(row[cellIndex] ?? "", `td${key}-${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // 제목
    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      paragraph(buffer);
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text, used);
      if (level === 2) headings.push({ id, text });
      blocks.push(
        level === 2 ? (
          <h2 key={`h${key++}`} id={id}>
            {inline(text, `h${key}`)}
          </h2>
        ) : (
          <h3 key={`h${key++}`} id={id}>
            {inline(text, `h${key}`)}
          </h3>
        ),
      );
      i += 1;
      continue;
    }

    // 구분선
    if (/^(-{3,}|\*{3,})\s*$/.test(line)) {
      paragraph(buffer);
      blocks.push(<hr key={`r${key++}`} />);
      i += 1;
      continue;
    }

    // 인용
    if (/^>\s?/.test(line)) {
      paragraph(buffer);
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(
        <blockquote key={`q${key++}`}>
          {inline(quote.join(" ").trim(), `q${key}`)}
        </blockquote>,
      );
      continue;
    }

    // 목록
    const bullet = /^\s*([-*])\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      paragraph(buffer);
      const ordered = Boolean(numbered);
      const items: string[] = [];
      while (i < lines.length) {
        const b = /^\s*([-*])\s+(.*)$/.exec(lines[i]);
        const n = /^\s*\d+\.\s+(.*)$/.exec(lines[i]);
        if (ordered && n) items.push(n[1]);
        else if (!ordered && b) items.push(b[2]);
        else break;
        i += 1;
      }
      const children = items.map((item, index) => (
        <li key={index}>{inline(item, `l${key}-${index}`)}</li>
      ));
      blocks.push(
        ordered ? (
          <ol key={`o${key++}`}>{children}</ol>
        ) : (
          <ul key={`u${key++}`}>{children}</ul>
        ),
      );
      continue;
    }

    // 빈 줄 → 문단 끊기
    if (line.trim() === "") {
      paragraph(buffer);
      i += 1;
      continue;
    }

    buffer.push(line.trim());
    i += 1;
  }

  paragraph(buffer);

  return { blocks, headings };
}
