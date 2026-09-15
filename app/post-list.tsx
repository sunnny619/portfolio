/* ══════════════════════════════════════════════════════════════
   Posts — 날짜 · 제목 · 태그 한 줄짜리 목록
   아래 posts 배열만 고치면 됩니다.
   ══════════════════════════════════════════════════════════════ */

/** 블로그 주소가 정해지면 여기만 바꾸면 됩니다. */
const blogUrl = "#";

type Post = {
  id: string;
  date: string;
  title: string;
  tag: string;
  /** 글 주소. 없으면 제목이 링크가 되지 않습니다. */
  href?: string;
};

const posts: Post[] = [
  {
    id: "post-01",
    date: "2026.08.28",
    title: "Socket.io 연결이 자꾸 끊기던 이유를 찾기까지",
    tag: "트러블슈팅",
  },
  {
    id: "post-02",
    date: "2026.08.14",
    title: "React 렌더링 최적화, 세 가지 방법을 직접 측정해봤습니다",
    tag: "React",
  },
  {
    id: "post-03",
    date: "2026.07.30",
    title: "백준 1753 최단경로 — 우선순위 큐 다익스트라 정리",
    tag: "알고리즘",
  },
  {
    id: "post-04",
    date: "2026.07.11",
    title: "면접에서 이벤트 루프를 설명하지 못했던 날",
    tag: "면접",
  },
];

export default function PostList() {
  return (
    <div className="post-wrap">
      <ul className="post-list">
        {posts.map((post) => (
          <li className="post-row" key={post.id}>
            {post.href ? (
              <a className="post-link" href={post.href}>
                <PostRow post={post} />
              </a>
            ) : (
              <PostRow post={post} />
            )}
          </li>
        ))}
      </ul>

      <a className="post-more" href={blogUrl}>
        블로그 전체 보기
      </a>
    </div>
  );
}

function PostRow({ post }: { post: Post }) {
  return (
    <>
      <time className="post-date">{post.date}</time>
      <span className="post-title">{post.title}</span>
      <span className="post-tag">{post.tag}</span>
    </>
  );
}
