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

/* ── 목록 ──────────────────────────────────────────────────── */

const LIST_ITEM = /^(\s*)([-*]|\d+\.)\s+(.*)$/;

type ListItem = {
  ordered: boolean;
  text: string;
  /** 항목 아래에 들여쓴 설명 문단 */
  body: string[];
  children: ListItem[];
};

/** 탭은 4칸으로 세어 들여쓰기 깊이를 잰다 (옵시디언이 탭을 쓴다) */
function indentWidth(prefix: string) {
  let width = 0;
  for (const ch of prefix) {
    if (ch === "\t") width += 4;
    else if (ch === " ") width += 1;
    else break;
  }
  return width;
}

function isListItem(line: string) {
  return LIST_ITEM.test(line);
}

/** 목록에 딸린 들여쓴 본문 줄 — 목록 기호 없이 공백으로 시작한다 */
function isListBody(line: string) {
  return line.trim() !== "" && /^\s/.test(line) && !isListItem(line);
}

/** 들여쓰기 깊이로 목록을 트리로 만든다 */
function buildListTree(lines: string[]) {
  const roots: ListItem[] = [];
  const stack: { item: ListItem; indent: number }[] = [];

  for (const line of lines) {
    const match = LIST_ITEM.exec(line);

    if (!match) {
      // 항목 아래 들여쓴 설명 줄 → 가장 가까운 항목에 붙인다
      const text = line.trim();
      if (text && stack.length > 0) stack[stack.length - 1].item.body.push(text);
      continue;
    }

    const indent = indentWidth(match[1]);
    const item: ListItem = {
      ordered: /\d/.test(match[2]),
      text: match[3].trim(),
      body: [],
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) stack.pop();

    if (stack.length === 0) roots.push(item);
    else stack[stack.length - 1].item.children.push(item);

    stack.push({ item, indent });
  }

  return roots;
}

function renderList(items: ListItem[], keyPrefix: string): ReactNode {
  const ordered = items[0]?.ordered ?? false;
  const children = items.map((item, index) => (
    <li key={index}>
      {inline(item.text, `${keyPrefix}-${index}`)}
      {item.body.map((paragraph, bodyIndex) => (
        <p key={bodyIndex}>{inline(paragraph, `${keyPrefix}-${index}-b${bodyIndex}`)}</p>
      ))}
      {item.children.length > 0
        ? renderList(item.children, `${keyPrefix}-${index}-c`)
        : null}
    </li>
  ));

  return ordered ? (
    <ol key={keyPrefix}>{children}</ol>
  ) : (
    <ul key={keyPrefix}>{children}</ul>
  );
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

    // 목록 — 들여쓰기로 중첩되고, 항목 아래 들여쓴 문단도 함께 묶는다
    if (isListItem(line)) {
      paragraph(buffer);
      const raw: string[] = [];

      while (i < lines.length) {
        const current = lines[i];

        if (isListItem(current) || isListBody(current)) {
          raw.push(current);
          i += 1;
          continue;
        }

        // 빈 줄 하나로는 목록이 끊기지 않는다 — 다음 줄이 아직 목록이면 이어간다
        if (current.trim() === "") {
          const next = lines[i + 1];
          if (next !== undefined && (isListItem(next) || isListBody(next))) {
            i += 1;
            continue;
          }
        }

        break;
      }

      blocks.push(renderList(buildListTree(raw), `l${key++}`));
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
