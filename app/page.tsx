import Image from "next/image";
import ExperienceList from "./experience-list";
import HeroTitle from "./hero-title";
import ProjectStack from "./project-stack";
import ScrollMotion from "./scroll-motion";
import SiteHeader from "./site-header";

const postCards = Array.from({ length: 4 });

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ScrollMotion />

      <main>
        <section className="hero motion-section" id="home">
          <div className="sun-wrap motion-item">
            <Image
              src="/sun.png"
              alt=""
              width={1254}
              height={1254}
              priority
              className="hero-sun"
            />
          </div>

          <div className="hero-copy motion-item">
            <p className="side-note side-note-left">
              Contact
              <br />
              eileelea2031@gmail.com
            </p>
            <HeroTitle />
            <p className="side-note side-note-right">Software Engineer</p>
          </div>
        </section>

        <section className="profile-section motion-section" id="profile">
          <div className="profile-grid">
            <section className="intro-card motion-item profile-motion-1" aria-label="Introduction">
              <p>
                <strong>안녕하세요</strong>
              </p>
              <p>
                <strong>같이 일하면</strong>
              </p>
              <p>
                <strong>하루가 환해지는 개발자</strong>
              </p>
              <p>
                <strong>
                  <span>지선의</span>입니다.
                </strong>
              </p>
              <small>
                한 번에 풀린 문제는 거의 없었습니다.
                <br />
                대부분의 시간은 안 되는 이유를 하나씩 지워나가는 데 썼고,
                <br />
                그 과정을 기록하고 공유하는 걸 좋아합니다.
              </small>

              <div className="profile-contact">
                <div>
                  <h2>Profile</h2>
                  <dl>
                    <dt>지선의</dt>
                    <dd>SeonEui Jee</dd>
                  </dl>
                </div>
                <div>
                  <h2>Contact</h2>
                  <dl>
                    <dt>Email</dt>
                    <dd>ellieella2031@gmail.com</dd>
                    <dt>Linkedin</dt>
                    <dd>지선의</dd>
                    <dt>GitHub</dt>
                    <dd>sunny619</dd>
                  </dl>
                </div>
              </div>
            </section>

            <section className="info-list motion-item profile-motion-2">
              <h2>Education</h2>
              <InfoRow year="2022.02" text="영락고등학교 졸업" />
              <InfoRow year="2027.02" text="숭실대학교 컴퓨터학부 졸업예정" />

              <h2>Certifications</h2>
              <InfoRow year="2015.03" text="GTQ그래픽기술자격 2급" note="한국생산성본부(KPC)" />
              <InfoRow year="2023.06" text="MOS Excel Expert 2016" note="Microsoft / 국제공인자격" />
              <InfoRow year="2026.09" text="정보처리기사" note="한국산업인력공단" />

              <h2>Awards</h2>
              <InfoRow year="2025.11" text="지능형 로봇 컨소시엄 창의적 종합설계 경진대회 대상" note="한영대학교에리카" />
              <InfoRow year="2025.11" text="창의적 종합설계 경진대회 산업통상부장관상" note="산업통상부" />
              <InfoRow year="2026.08" text="제 3회 AX 인터렉티브 콘텐츠 공모전 장려상" note="숭실대학교 교수학습혁신센터" />
            </section>

            <section className="skills-block motion-item profile-motion-3">
              <h2>Skills</h2>
              <SkillRow label="Languages" text="영락고등학교 졸업" />
              <SkillRow label="Frameworks" text="숭실대학교 컴퓨터학부 졸업예정" />
              <SkillRow label="Tooling" text="숭실대학교 컴퓨터학부 졸업예정" />
              <SkillRow label="Collaboration" text="숭실대학교 컴퓨터학부 졸업예정" />
              <Image
                src="/sun.png"
                alt=""
                width={1254}
                height={1254}
                className="mini-sun"
              />
            </section>
          </div>
        </section>

        <Section
          id="experience"
          title="Experience"
          subtitle="다양한 환경에서 쌓은 경험들입니다."
          motionBody={false}
        >
          <ExperienceList />
        </Section>

        <Section
          id="projects"
          title="Projects"
          subtitle="다양한 기술을 활용하여 개발한 프로젝트들입니다."
          motionBody={false}
        >
          <ProjectStack />
        </Section>

        <Section id="posts" title="Posts" subtitle="공부한 내용과 코딩 테스트 풀이를 기록합니다.">
          <div className="post-stack">
            {postCards.map((_, index) => (
              <div className="placeholder post-card" key={index} />
            ))}
          </div>
        </Section>
      </main>

      <footer className="footer">
        <p>Copyright © 2026 SeonEui Jee</p>
        <div className="footer-icons" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </footer>
    </>
  );
}

function InfoRow({ year, text, note }: { year: string; text: string; note?: string }) {
  return (
    <p className="info-row">
      <span>{year}</span>
      <strong>{text}</strong>
      {note ? <em>{note}</em> : null}
    </p>
  );
}

function SkillRow({ label, text }: { label: string; text: string }) {
  return (
    <p className="skill-row">
      <span>{label}</span>
      <strong>{text}</strong>
    </p>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
  motionBody = true,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  /** false 면 본문을 통째로 올리지 않고, 안쪽 요소가 각자 모션을 갖는다 */
  motionBody?: boolean;
}) {
  return (
    <section className="content-section motion-section" id={id}>
      <div className="section-heading motion-item">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {motionBody ? <div className="motion-item">{children}</div> : children}
    </section>
  );
}
