import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/app/site-header";
import {
  experiences,
  getExperience,
  type Experience,
  type ExperienceDetail,
} from "@/lib/experiences";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return experiences.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const experience = getExperience(id);

  if (!experience) {
    return { title: "경험을 찾을 수 없습니다 — SEONEUI" };
  }

  return {
    title: `${experience.title} — SEONEUI`,
    description: experience.summary,
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { id } = await params;
  const experience = getExperience(id);

  if (!experience) notFound();

  return (
    <>
      <SiteHeader />

      <main className="case">
        <div className="case-back">
          <Link className="article-back" href="/#experience">
            Experience
          </Link>
        </div>

        {experience.detail ? (
          <CaseStudy experience={experience} detail={experience.detail} />
        ) : (
          <SimpleDetail experience={experience} />
        )}
      </main>
    </>
  );
}

/* ── 케이스 스터디형 — detail 이 채워진 경험 ─────────────── */

function CaseStudy({
  experience,
  detail,
}: {
  experience: Experience;
  detail: ExperienceDetail;
}) {
  return (
    <article>
      <header className="case-hero">
        <p className="case-label">{detail.label}</p>
        <h1>{experience.title}</h1>

        <div className="case-intro">
          {detail.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="case-meta">
          <span className="case-period">{experience.period}</span>
          <ul className="case-links">
            {detail.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="case-photos">
        {detail.photos.map((photo) => (
          <figure key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </figure>
        ))}
      </div>

      <p className="case-statement">
        <span className="case-statement-lead">{detail.statement.lead}</span>
        <span>
          <strong>{detail.statement.highlight}</strong>
          {detail.statement.tail}
        </span>
      </p>

      <hr className="case-rule" />

      {/* ── 겹치는 원 다이어그램 ── */}
      <section className="case-block">
        <div className="case-block-head">
          <p className="case-eyebrow">{detail.concept.label}</p>
          <h2>
            {detail.concept.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="case-block-body">{detail.concept.body}</p>
        </div>

        <div className="case-venn-row">
          <div className="case-venn" aria-hidden="true">
            {detail.concept.circles.map((circle) => (
              <span className="case-venn-circle" key={circle}>
                {circle}
              </span>
            ))}
          </div>
          <div className="case-venn-note">
            {detail.concept.aside.map((line, index) => (
              <p key={line} className={index === 1 ? "is-strong" : undefined}>
                {line}
              </p>
            ))}
          </div>
        </div>

        <ul className="case-notes">
          {detail.concept.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 역할 흐름 카드 ── */}
      <section className="case-block case-block--stack">
        <div className="case-block-head">
          <p className="case-eyebrow">{detail.flow.label}</p>
          <h2>
            {detail.flow.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="case-block-body">{detail.flow.body}</p>
        </div>

        <ol className="case-steps">
          {detail.flow.steps.map((step) => (
            <li className="case-step" key={step.badge}>
              <span className="case-step-badge">{step.badge}</span>
              <p className="case-step-role">{step.role}</p>
              <h3>{step.title}</h3>
              <p className="case-step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 슈몰세미나 발표 기록 ── */}
      <section className="case-block case-block--stack">
        <div className="case-block-head">
          <p className="case-eyebrow">{detail.talks.label}</p>
          <h2>
            {detail.talks.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="case-block-body">{detail.talks.body}</p>
        </div>

        <ul className="case-talks">
          {detail.talks.items.map((talk) => (
            <li key={talk.href}>
              <a href={talk.href} target="_blank" rel="noreferrer">
                <time>{talk.date}</time>
                <div className="case-talk-body">
                  <h3>{talk.title}</h3>
                  <p>{talk.event}</p>
                </div>
                <span className="case-talk-cta">영상 보기</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

/* ── 기본형 — detail 이 아직 없는 경험 ──────────────────── */

function SimpleDetail({ experience }: { experience: Experience }) {
  return (
    <article className="exp-detail">
      <header className="exp-detail-head">
        <span className="exp-period">{experience.period}</span>
        <p className="exp-org">{experience.org}</p>
        <h1>{experience.title}</h1>
        <p className="exp-detail-summary">{experience.summary}</p>
      </header>

      <section className="exp-detail-section">
        <h2>주요 성과</h2>
        <ul className="exp-points">
          {experience.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
