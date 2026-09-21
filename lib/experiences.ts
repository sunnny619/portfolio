/* ══════════════════════════════════════════════════════════════
   Experience 데이터 — 홈 섹션과 상세 페이지가 함께 씁니다.
   아래 experiences 배열만 고치면 카드와 상세 페이지가 같이 늘어납니다.

   id 가 곧 주소입니다 — gdgoc-soongsil → /experience/gdgoc-soongsil
   detail 을 채우면 케이스 스터디형 상세 페이지가 되고,
   비워두면 요약과 주요 성과만 있는 기본 레이아웃으로 나옵니다.
   ══════════════════════════════════════════════════════════════ */

export type ExperienceDetail = {
  /** 상단 작은 라벨 — "동아리 활동" */
  label: string;
  /** 소개 문단 */
  intro: string[];
  links: { label: string; href: string }[];
  photos: { src: string; alt: string; width: number; height: number }[];
  /** 사진 아래 한 줄 선언 */
  statement: { lead: string; highlight: string; tail: string };
  /** 겹치는 원 다이어그램 섹션 */
  concept: {
    label: string;
    heading: string[];
    body: string;
    circles: string[];
    aside: string[];
    items: { title: string; body: string }[];
  };
  /** 슈몰세미나 발표 기록 */
  talks: {
    label: string;
    heading: string[];
    body: string;
    items: { date: string; title: string; event: string; href: string }[];
  };
  /** 흐름 카드 */
  flow: {
    label: string;
    heading: string[];
    body: string;
    steps: { badge: string; role: string; title: string; body: string }[];
  };
};

export type Experience = {
  id: string;
  period: string;
  org: string;
  title: string;
  summary: string;
  points: string[];
  detail?: ExperienceDetail;
};

export const experiences: Experience[] = [
  {
    id: "gdgoc-soongsil",
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
    detail: {
      label: "동아리 활동 - GDGoC Soongsil",
      intro: [
        "GDGoC Soongsil(전 GDSC)은 Google 산하의 학생 개발자 커뮤니티로 '실력 너머의 유쾌함으로 세상을 바꾼다'는 이념 아래 서로의 지식과 경험을 공유하고 집단 지성의 힘을 발휘하며, 숭실대학교에 개방적이고 즐거운 개발 문화가 정착할 수 있도록 기여하는 학생 개발자 커뮤니티입니다.",
      ],
      links: [
        { label: "홈페이지", href: "https://gdgocsoongsil.com/" },
        { label: "github", href: "https://github.com/gdsc-ssu" },
        { label: "instagram", href: "https://www.instagram.com/gdg.ssu/" },
        { label: "youtube", href: "https://www.youtube.com/@gdgocsoongsil6711" },
      ],
      photos: [
        {
          src: "/experience/gdgoc-1.jpg",
          alt: "수료증을 들고 단체 사진을 찍는 GDSC EXHIBITION 참가자들",
          width: 1200,
          height: 903,
        },
        {
          src: "/experience/gdgoc-2.jpg",
          alt: "행사장 무대 앞에 모여 단체 사진을 찍는 커뮤니티 멤버들",
          width: 1200,
          height: 900,
        },
        {
          src: "/experience/gdgoc-3.jpg",
          alt: "강의실에서 손하트를 만들며 단체 사진을 찍는 커뮤니티 멤버들",
          width: 1178,
          height: 868,
        },
      ],
      statement: {
        lead: "지난 3년간 GDGoC Soongsil에서 Designer, DevRel, 그리고 Organizer로 활동하며 제가 집중했던 것은 단 하나,",
        highlight: "'학생 개발자들이 머물고 싶은 건강한 생태계'",
        tail: "를 만드는 것이었습니다.",
      },
      concept: {
        label: "Goal",
        heading: ["커뮤니티가", "지향한 세 가지"],
        body: "GDGoC Soongsil은 단순한 기술 학습을 넘어, 즐거움이 동력이 되는 지속 가능한 성장의 장을 만들기 위해 존재합니다. 세 가지 방향은 따로 놓인 목표가 아니라, 서로 겹치는 지점에서 하나의 생태계를 만듭니다.",
        circles: ["개방", "협업", "연결"],
        aside: [
          "개방 · 협업 · 연결이 겹치는 자리에",
          "학생 개발자들이 머물고 싶은 건강한 생태계",
        ],
        items: [
          {
            title: "'경쟁'이 아닌 '개방'된 개발 문화",
            body: "많은 대학생 개발자가 학업과 취업 준비 과정에서 고립되거나 경쟁에 지칩니다. 닫힌 개인의 학습을 열린 공유의 장으로 이끌어내는 것을 첫 번째 과제로 삼았습니다.",
          },
          {
            title: "실력을 넘어선 '협업의 즐거움'",
            body: "기술 역량만으로는 세상을 바꿀 수 없습니다. 동료와 함께 문제를 해결하는 과정 자체가 즐거운 놀이가 될 수 있음을 보여주어, 개발을 오래 사랑할 동기를 만들고자 했습니다.",
          },
          {
            title: "글로벌 기술 생태계와의 연결",
            body: "전 세계 111개국 1,863개 챕터와 이어진 Google 커뮤니티로서, 학교라는 울타리 안에서도 전 세계의 개발 흐름과 호흡할 수 있는 교두보 역할을 합니다.",
          },
        ],
      },
      flow: {
        label: "Role",
        heading: ["세 가지 역할로", "이어온 3년"],
        body: "디자인에서 시작해 프로그램 기획으로, 다시 커뮤니티 운영 전반으로 역할을 넓혀왔습니다. 각 단계에서 맡은 일은 달랐지만 향한 곳은 같았습니다.",
        steps: [
          {
            badge: "STEP 1",
            role: "Designer",
            title: "브랜딩과 커뮤니케이션",
            body: "커뮤니티 운영진으로 활동하며 디자인 업무를 맡았습니다. 로고와 컬러 등 기본 브랜딩을 정리하고, 모집 포스터·SNS 게시물·행사 안내물을 제작했습니다.",
          },
          {
            badge: "STEP 2",
            role: "DevRel",
            title: "지식 공유 문화 만들기",
            body: "멤버들이 가진 기술 지식과 경험이 자연스럽게 공유되도록 네트워킹 프로그램과 운영 방식을 기획했습니다. 개인의 경험이 커뮤니티 전체의 성장으로 이어지도록 했습니다.",
          },
          {
            badge: "STEP 3",
            role: "Organizer",
            title: "지속 가능한 구조 설계",
            body: "커뮤니티 운영 전반을 관리하며 멤버 모집부터 활동 기획, 운영 개선까지 전체 흐름을 이끌었습니다. 커뮤니티가 계속 성장할 수 있는 구조를 만들고 실행했습니다.",
          },
        ],
      },
      talks: {
        label: "Activity",
        heading: ["슈몰세미나", "발표 기록"],
        body: "슈몰세미나는 정기모임의 시그니처 세션입니다. 실력이 뛰어나야 설 수 있는 자리가 아니라 누구나 한 번은 연사가 되는 자리로 만들었고, 만들자고 한 사람으로서 저도 기수마다 한 번씩 섰습니다.",
        items: [
          {
            date: "2026.03.18",
            title: "Clean Architecture in Flutter",
            event: "GDGoC Soongsil 5th 정기모임 슈몰세미나",
            href: "https://www.youtube.com/watch?v=_KDpYRfehmo",
          },
          {
            date: "2025.09.08",
            title: "초보자의 눈으로 본 Flutter",
            event: "GDGoC Soongsil 4th 오픈슈몰세미나",
            href: "https://www.youtube.com/watch?v=Meq6pgfhcXg&t=572s",
          },
          {
            date: "2024.10.26",
            title: "GDSC 스터디 마스터",
            event: "GDSC Soongsil 3th 정기모임 슈몰세미나",
            href: "https://www.youtube.com/watch?v=WDVhhDMHFiI",
          },
        ],
      },
    },
  },
  {
    id: "google-student-ambassador",
    period: "2023.08 - 2025.12",
    org: "마케팅 프로그램",
    title: "Google Student Ambassador",
    summary:
      "Google Student Ambassador 주요 활동으로는 Gemini의 학생 저변 확대를 위한 마케팅 전략 수립 및 실행을 주도했습니다.",
    points: [
      "온·오프라인 하이브리드 마케팅 전개",
      "체험형 오프라인 부스 운영",
      "소셜 바이럴 마케팅 미션 진행",
    ],
  },
];

export function getExperience(id: string) {
  return experiences.find((item) => item.id === id) ?? null;
}
