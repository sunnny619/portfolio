import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/app/_components/site-header";
import { getAllPosts, getPost } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";

import GiscusComments from "./giscus-comments";
import ArticleToc from "./toc";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다 - SEONEUI",
    };
  }

  return {
    title: `${post.title} - SEONEUI`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const { blocks, headings } = renderMarkdown(post.body);

  return (
    <>
      <SiteHeader />

      <main className="article-page">
        <Link className="article-back" href="/blog">
          Blog
        </Link>

        <div className="article-layout">
          <article className="article">
            <header className="article-head">
              <div className="blog-post-meta">
                <time className="post-date">{post.dateLong}</time>
                <span className="post-tag">{post.tag}</span>
              </div>
              <h1>{post.title}</h1>
              {post.summary ? <p>{post.summary}</p> : null}
            </header>

            <div className="article-body">{blocks}</div>
            <GiscusComments />
          </article>

          <aside className="article-side">
            <ArticleToc headings={headings} />
          </aside>
        </div>
      </main>
    </>
  );
}
