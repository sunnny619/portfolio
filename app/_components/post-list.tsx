import Link from "next/link";

import { getRecentPosts } from "@/lib/posts";

/* 홈 Posts 섹션 — 오늘 기준 최신 4개만 보여주고 나머지는 /blog 로 넘긴다.
   글 내용은 content/posts/*.md 에서 관리합니다. */

export default function PostList() {
  const recent = getRecentPosts();

  return (
    <div className="post-wrap">
      <ul className="post-list">
        {recent.map((post) => (
          <li className="post-row" key={post.slug}>
            <Link className="post-link" href={`/blog/${post.slug}`}>
              <time className="post-date">{post.dateLabel}</time>
              <span className="post-title">{post.title}</span>
              <span className="post-tag">{post.tag}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link className="post-more" href="/blog">
        블로그 전체 보기
      </Link>
    </div>
  );
}
