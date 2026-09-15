/* ══════════════════════════════════════════════════════════════
   Experience — 가로로 긴 카드 리스트
   아래 experiences 배열만 고치면 카드가 자동으로 늘어납니다.
   ══════════════════════════════════════════════════════════════ */

type Experience = {
  id: string;
  period: string;
  org: string;
  title: string;
  summary: string;
  points: string[];
};

const experiences: Experience[] = [
  {
    id: "exp-01",
    period: "2023.09 - 2026.08",
    org: "교내 개발자 커뮤니티",
    title: "Google Developer Groups on Campus Soongsil",
    summary:
      "교내 개발자 커뮤니티로 ",
    points: [
      "Designer : ",
      "DevRel : ",
      "Organizer : ",
    ],
  },
  {
    id: "exp-02",
    period: "2023.08 - 2025.12",
    org: "마케팅 프로그램",
    title: "Google Student Ambassador",
    summary:
      "로봇 제어 결과를 실시간으로 확인하는 웹 대시보드를 설계하고 프론트엔드를 맡았습니다.",
    points: [
      "WebSocket 기반 실시간 상태 모니터링 화면 구현",
      "디자인 시스템을 먼저 잡아 4명이 동시에 화면을 나눠 개발",
      "창의적 종합설계 경진대회 대상 · 산업통상부장관상 수상",
    ],
  },
];

export default function ExperienceList() {
  return (
    <ul className="exp-list">
      {experiences.map((item) => (
        <li className="exp-card motion-item" key={item.id}>
          <div className="exp-head">
            <div className="exp-headline">
              <h3 className="exp-title">{item.title}</h3>
              <p className="exp-org">{item.org}</p>
            </div>
            <span className="exp-period">{item.period}</span>
          </div>

          <p className="exp-summary">{item.summary}</p>

          <div className="exp-points-block">
            <h4 className="exp-points-label">주요 성과</h4>
            <ul className="exp-points">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
