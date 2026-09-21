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
    return { title: "경험을 찾을 수 없습니다 - SEONEUI" };
  }

  return {
    title: `${experience.title} - SEONEUI`,
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
            {(detail.links ?? []).map((link) => (
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
      {detail.concept ? (
      <section className="case-block">
        <div className="case-block-head">
          <p className="case-eyebrow">{detail.concept!.label}</p>
          <h2>
            {detail.concept!.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="case-block-body">{detail.concept!.body}</p>
        </div>

        <div className="case-venn-row">
          <div className="case-venn" aria-hidden="true">
            {detail.concept!.circles.map((circle) => (
              <span className="case-venn-circle" key={circle}>
                {circle}
              </span>
            ))}
          </div>
          <div className="case-venn-note">
            {detail.concept!.aside.map((line, index) => (
              <p key={line} className={index === 1 ? "is-strong" : undefined}>
                {line}
              </p>
            ))}
          </div>
        </div>

        <ul className="case-notes">
          {detail.concept!.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
      ) : null}

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

      {/* ── 진행 과정 ── */}
      {detail.process ? (
        <section className="case-block case-block--stack">
          <div className="case-block-head">
            <p className="case-eyebrow">{detail.process.label}</p>
            <h2>
              {detail.process.heading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="case-block-body">{detail.process.body}</p>
          </div>

          <ol className="case-steps">
            {detail.process.steps.map((step) => (
              <li className="case-step" key={step.badge}>
                <span className="case-step-badge">{step.badge}</span>
                <p className="case-step-role">{step.role}</p>
                <h3>{step.title}</h3>
                <p className="case-step-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* ── 채널별 실행 내용 ── */}
      {detail.groups ? (
        <section className="case-block case-block--stack">
          <div className="case-block-head">
            <p className="case-eyebrow">{detail.groups.label}</p>
            <h2>
              {detail.groups.heading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="case-block-body">{detail.groups.body}</p>
          </div>

          <ol className="case-groups">
            {detail.groups.items.map((group, index) => (
              <li key={group.title}>
                <p className="case-group-index">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="case-group-main">
                  <div className="case-group-head">
                    <h3>{group.title}</h3>
                    {group.phase ? (
                      <span className="case-group-phase">{group.phase}</span>
                    ) : null}
                  </div>

                  {group.meta ? (
                    <dl className="case-group-meta">
                      {group.meta.map((row) => (
                        <div
                          key={row.label}
                          className={row.label === "결과" ? "is-result" : undefined}
                        >
                          <dt>{row.label}</dt>
                          <dd>{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <ul className="case-group-points">
                    {group.points.map((point) => (
                      <li key={point.name}>
                        <strong>{point.name}</strong>
                        <span>{point.body}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* ── 숫자 성과 ── */}
      {detail.metrics ? (
        <section className="case-block case-block--stack">
          <div className="case-block-head">
            <p className="case-eyebrow">{detail.metrics.label}</p>
            <h2>
              {detail.metrics.heading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="case-block-body">{detail.metrics.body}</p>
          </div>

          <dl className="case-metrics">
            {detail.metrics.items.map((item) => (
              <div key={item.label}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* ── 슈몰세미나 발표 기록 ── */}
      {detail.talks ? (
      <section className="case-block case-block--stack">
        <div className="case-block-head">
          <p className="case-eyebrow">{detail.talks!.label}</p>
          <h2>
            {detail.talks!.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="case-block-body">{detail.talks!.body}</p>
        </div>

        <ul className="case-talks">
          {detail.talks!.items.map((talk) => (
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
      ) : null}

      {/* ── Solution Challenge 프로젝트 ── */}
      {detail.projects ? (
      <section className="case-block case-block--stack">
        <div className="case-block-head">
          <p className="case-eyebrow">{detail.projects!.label}</p>
          <h2>
            {detail.projects!.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="case-block-body">{detail.projects!.body}</p>
        </div>

        <ol className="case-projects">
          {detail.projects!.items.map((project) => (
            <li key={project.href}>
              <p className="case-project-year">{project.year}</p>

              <div className="case-project-main">
                <div className="case-project-head">
                  <h3>{project.name}</h3>
                  <span className="case-project-event">{project.event}</span>
                </div>

                <p className="case-project-tagline">{project.tagline}</p>
                <p className="case-project-body">{project.body}</p>

                <ul className="case-chips">
                  {project.roles.map((role) => (
                    <li className="is-role" key={role}>
                      {role}
                    </li>
                  ))}
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <p className="case-project-links">
                  <a href={project.href} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  {project.demo ? (
                    <a href={project.demo.href} target="_blank" rel="noreferrer">
                      {project.demo.label}
                    </a>
                  ) : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      ) : null}
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
