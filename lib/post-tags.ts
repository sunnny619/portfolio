import type { CSSProperties } from "react";

type TagTone = {
  background: string;
  color: string;
  border: string;
};

const TAG_TONES: Record<string, TagTone> = {
  개발: {
    background: "#e8f3ff",
    color: "#1d5d9b",
    border: "#b8d9f5",
  },
  도서: {
    background: "#f2ebff",
    color: "#6b3fa0",
    border: "#d8c8f6",
  },
  스터디: {
    background: "#e3f6ef",
    color: "#1f7a5a",
    border: "#b5e3d1",
  },
  전체: {
    background: "#ffe9dd",
    color: "#c2441a",
    border: "#ffcdb8",
  },
};

const DEFAULT_TONE: TagTone = {
  background: "#eef3ee",
  color: "#48624a",
  border: "#d4dfd4",
};

type TagStyle = CSSProperties & {
  "--tag-bg": string;
  "--tag-color": string;
  "--tag-border": string;
};

export function getTagStyle(tag: string): TagStyle {
  const tone = TAG_TONES[tag] ?? DEFAULT_TONE;

  return {
    "--tag-bg": tone.background,
    "--tag-color": tone.color,
    "--tag-border": tone.border,
  };
}
