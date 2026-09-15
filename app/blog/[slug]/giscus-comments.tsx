"use client";

import { useEffect, useRef } from "react";

const config = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

function isConfigured() {
  return Boolean(
    config.repo && config.repoId && config.category && config.categoryId,
  );
}

export default function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isConfigured()) return;

    container.replaceChildren();

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.repo = config.repo!;
    script.dataset.repoId = config.repoId!;
    script.dataset.category = config.category!;
    script.dataset.categoryId = config.categoryId!;
    script.dataset.mapping = "pathname";
    script.dataset.strict = "0";
    script.dataset.reactionsEnabled = "1";
    script.dataset.emitMetadata = "0";
    script.dataset.inputPosition = "bottom";
    script.dataset.theme = "preferred_color_scheme";
    script.dataset.lang = "ko";
    script.dataset.loading = "lazy";

    container.appendChild(script);
  }, []);

  if (!isConfigured()) {
    return (
      <section className="comments comments-empty" aria-label="댓글">
        <h2>Comments</h2>
        <p>Giscus 환경변수를 설정하면 댓글이 표시됩니다.</p>
      </section>
    );
  }

  return (
    <section className="comments" aria-label="댓글">
      <h2>Comments</h2>
      <div ref={containerRef} className="giscus-container" />
    </section>
  );
}
