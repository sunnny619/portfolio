"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/lib/markdown";

/* 오른쪽 목차 — 화면에 보이는 제목을 따라 강조가 움직인다. */

export default function ArticleToc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const update = () => {
      // 헤더 아래 기준선을 지난 제목 중 가장 마지막 것을 고른다
      const line = 140;
      let current = targets[0];
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= line) current = target;
      }
      setActiveId(current.id);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="목차">
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={activeId === heading.id ? "is-active" : undefined}
              aria-current={activeId === heading.id ? "true" : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
