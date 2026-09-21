"use client";

import { useEffect } from "react";

/* 같은 페이지 안의 # 링크(헤더 내비, 글 목차)만 부드럽게 스크롤합니다.

   html 에 scroll-behavior: smooth 를 걸면 페이지를 이동할 때
   Next.js 가 맨 위로 되돌리는 동작까지 애니메이션으로 재생되어,
   긴 페이지에서는 화면이 아래에서 위로 훑고 올라갑니다. */

export default function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // "#id" 와 "/#id" 둘 다 받는다 — 헤더는 /#profile 형태를 쓴다
      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
          ? href.slice(1)
          : "";
      if (hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
