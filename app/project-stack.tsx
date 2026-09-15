import Image from "next/image";

/* ══════════════════════════════════════════════════════════════
   Projects — 스크롤하면 다음 장이 앞 장을 덮는 스티키 스택
   아래 projects 배열만 고치면 됩니다. 이미지는 public/projects/ 에.
   ══════════════════════════════════════════════════════════════ */

type Project = {
  id: string;
  src: string;
  alt: string;
};

const projects: Project[] = [
  {
    id: "cogo",
    src: "/projects/COGO.png",
    alt: "COGO — 대학동문 커피챗 서비스",
  },
  {
    id: "safetypass",
    src: "/projects/SafetyPass.png",
    alt: "SafetyPass — AI 기반 대형 공연장 긴급 대피 최적화 서비스",
  },
  {
    id: "ongi",
    src: "/projects/ongi.png",
    alt: "온기 — 어르신 복약 서비스 플랫폼",
  },
  {
    id: "socratia",
    src: "/projects/socratia.png",
    alt: "소크라티아 — 소크라테스식 문답 기반 AI 전공 학습 튜터",
  },
  {
    id: "ssumate",
    src: "/projects/SSUMATE.png",
    alt: "SSUMATE — 숭실대학교 창업지원단 동아리 협업 에이전트",
  },
];

export default function ProjectStack() {
  return (
    <div className="proj-stack">
      {projects.map((project, index) => (
        <section className="proj-slide" key={project.id}>
          <figure className="proj-card">
            <Image
              src={project.src}
              alt={project.alt}
              width={1500}
              height={844}
              sizes="(max-width: 900px) 100vw, 1400px"
              quality={95}
              priority={index === 0}
            />
          </figure>
        </section>
      ))}
    </div>
  );
}
