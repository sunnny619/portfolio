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
      "GDGoC Soongsil은 Google 산하 학생 개발자 커뮤니티로, 숭실대학교에 지식과 경험을 자유롭게 나누는 개방적이고 즐거운 개발 문화를 만들기 위해 활동합니다.",
    points: [
      "Designer : 커뮤니티 운영진으로 활동하며 디자인 업무를 맡았습니다. 로고와 컬러 등 기본 브랜딩을 정리하고, 모집 포스터·SNS 게시물·행사 안내물 등을 제작했습니다.",
      "DevRel : 멤버들이 가진 기술 지식과 경험이 자연스럽게 공유될 수 있도록 네트워킹 프로그램과 운영 방식을 기획했습니다. 이를 통해 개인의 경험이 커뮤니티 전체의 성장으로 이어지는 지식 공유 문화를 만들었습니다.",
      "Organizer : 커뮤니티 운영 전반을 관리하며, 멤버 모집부터 활동 기획, 운영 개선까지 전체 흐름을 이끌고 있습니다. 커뮤니티가 지속적으로 성장할 수 있도록 구조를 만들고 실행하였습니다.",
    ],
  },
  {
    id: "exp-02",
    period: "2023.08 - 2025.12",
    org: "마케팅 프로그램",
    title: "Google Student Ambassador",
    summary:
      "Google Student Ambassador 주요 활동으로는 Gemini의 학생 저변 확대를 위한 마케팅 전략 수립 및 실행을 주도했습니다.",
    points: [
      "온·오프라인 하이브리드 마케팅 전개",
      "체험형 오프라인 부스 운영",
      " 소셜 바이럴 마케팅 미션 진행",
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
