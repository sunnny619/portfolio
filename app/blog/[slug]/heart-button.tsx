"use client";

import { useEffect, useState } from "react";

type HeartState = {
  count: number;
  liked: boolean;
  configured: boolean;
};

export default function HeartButton({ slug }: { slug: string }) {
  const [state, setState] = useState<HeartState>({
    count: 0,
    liked: false,
    configured: true,
  });
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let alive = true;

    setHasError(false);
    fetch(`/api/hearts/${slug}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load heart state");
        return response.json();
      })
      .then((data: HeartState | null) => {
        if (!alive || !data) return;
        setState(data);
      })
      .catch(() => {
        if (alive) setHasError(true);
      })
      .finally(() => {
        if (alive) setReady(true);
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  const toggle = async () => {
    if (saving) return;

    const nextLiked = !state.liked;
    const previous = state;
    setHasError(false);
    setSaving(true);
    setState({
      ...state,
      liked: nextLiked,
      count: Math.max(0, state.count + (nextLiked ? 1 : -1)),
    });

    const response = await fetch(`/api/hearts/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: nextLiked }),
    }).catch(() => null);

    if (response?.ok) {
      setState((await response.json()) as HeartState);
    } else {
      setState(previous);
      setHasError(true);
    }

    setSaving(false);
  };

  return (
    <button
      type="button"
      className={state.liked ? "heart-button is-liked" : "heart-button"}
      onClick={toggle}
      disabled={!ready || saving}
      aria-pressed={state.liked}
      aria-label={state.liked ? "하트 취소" : "하트 누르기"}
      title={
        hasError
          ? "하트 저장에 실패했습니다"
          : state.configured
            ? undefined
            : "개발 모드 임시 저장소를 사용 중입니다"
      }
    >
      <span aria-hidden="true">♥</span>
      <b>{state.count}</b>
    </button>
  );
}
