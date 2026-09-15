import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "../site-header";
import { getAllPosts, getCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — SEONEUI",
  description: "공부한 내용과 코딩 테스트 풀이를 기록합니다.",
};

const ALL = "전체";

/* searchParams 는 Promise 라서 await 해야 합니다.
   덕분에 ?category= 주소를 그대로 공유할 수 있고 JS 없이도 동작합니다. */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const raw = (await searchParams).category;
  const selected = Array.isArray(raw) ? raw[0] : raw;

  const posts = getAllPosts();
  const categories = getCategories();
  const known = categories.some((category) => category.name === selected);
  const current = known && selected ? selected : ALL;

  const visible =
    current === ALL ? posts : posts.filter((post) => post.tag === current);

  return (
    <>
      <SiteHeader />

      <main className="blog">
        <header className="blog-head">
          <p className="blog-eyebrow">Blog</p>
          <h1>Posts</h1>
        </header>

        <div className="blog-layout">
          <aside className="blog-side" aria-label="카테고리">
            <h2 className="blog-side-title">Category</h2>
            <nav className="blog-cats">
              <CategoryLink
                name={ALL}
                count={posts.length}
                current={current}
                href="/blog"
              />
              {categories.map((category) => (
                <CategoryLink
                  key={category.name}
                  name={category.name}
                  count={category.count}
                  current={current}
                  href={`/blog?category=${encodeURIComponent(category.name)}`}
                />
              ))}
            </nav>
          </aside>

          <section className="blog-main" aria-label="글 목록">
            <p className="blog-count">
              {current === ALL ? "전체 글" : current} <b>{visible.length}</b>
            </p>

            <ul className="blog-posts">
              {visible.map((post) => (
                <li className="blog-post" key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="blog-post-link">
                    <div className="blog-post-meta">
                      <time className="post-date">{post.dateLabel}</time>
                      <span className="post-tag">{post.tag}</span>
                    </div>
                    <h3 className="blog-post-title">{post.title}</h3>
                    <p className="blog-post-summary">{post.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>

            <Link className="post-more" href="/">
              포트폴리오로 돌아가기
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

function CategoryLink({
  name,
  count,
  current,
  href,
}: {
  name: string;
  count: number;
  current: string;
  href: string;
}) {
  const active = current === name;
  return (
    <Link
      href={href}
      className={active ? "blog-cat is-active" : "blog-cat"}
      aria-current={active ? "page" : undefined}
    >
      <span>{name}</span>
      <em>{count}</em>
    </Link>
  );
}
