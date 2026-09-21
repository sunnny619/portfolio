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
  links?: { label: string; href: string }[];
  photos: { src: string; alt: string; width: number; height: number }[];
  /** 사진 아래 한 줄 선언 */
  statement: { lead: string; highlight: string; tail: string };
  /** 겹치는 원 다이어그램 섹션 */
  concept?: {
    label: string;
    heading: string[];
    body: string;
    circles: string[];
    aside: string[];
    items: { title: string; body: string }[];
  };
  /** 묶음 목록 — 채널별 실행 내용 */
  groups?: {
    label: string;
    heading: string[];
    body: string;
    items: {
      phase?: string;
      title: string;
      /** 기간 · 목표처럼 제목 아래 붙는 짧은 항목 */
      meta?: { label: string; value: string }[];
      points: { name: string; body: string }[];
    }[];
  };
  /** 진행 과정 — flow 와 같은 카드 형태 */
  process?: {
    label: string;
    heading: string[];
    body: string;
    steps: { badge: string; role: string; title: string; body: string }[];
  };
  /** 숫자 성과 */
  metrics?: {
    label: string;
    heading: string[];
    body: string;
    items: { value: string; label: string }[];
  };
  /** 슈몰세미나 발표 기록 */
  talks?: {
    label: string;
    heading: string[];
    body: string;
    items: { date: string; title: string; event: string; href: string }[];
  };
  /** Solution Challenge 프로젝트 */
  projects?: {
    label: string;
    heading: string[];
    body: string;
    items: {
      year: string;
      name: string;
      event: string;
      tagline: string;
      body: string;
      roles: string[];
      stack: string[];
      href: string;
      demo?: { label: string; href: string };
    }[];
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
      projects: {
        label: "Project",
        heading: ["Solution Challenge"],
        body: "GDGoC의 대표 활동인 Solution Challenge에 3년 연속 참가했습니다. 매년 팀을 꾸려 기획과 디자인, 모바일 개발을 맡았습니다.",
        items: [
          {
            year: "2026",
            name: "안심",
            event: "Solution Challenge 2026",
            tagline: "사진 한 장으로 신고하는 AI 도시 위험 제보 서비스",
            body: "강동구 싱크홀과 정자교 붕괴처럼, 이상 징후가 목격되고도 전달되지 않아 생긴 사고에서 출발했습니다. 사진을 찍으면 AI가 위험 유형과 심각도를 판별하고, 지도에 올라가 주변 주민에게 공유됩니다.",
            roles: ["기획", "디자인", "Flutter 개발"],
            stack: ["Flutter", "Material Design 3", "go_router"],
            href: "https://github.com/gdsc-ssu/ansim-app",
          },
          {
            year: "2025",
            name: "ANBD",
            event: "Solution Challenge 2025",
            tagline: "아껴쓰고 나눠쓰고 바꿔쓰고 다시쓰자, 동네 기반 무료 나눔 플랫폼",
            body: "사고파는 중고거래가 아니라 나눔과 교환, 기부로 굴러갑니다. 노쇼를 막기 위해 소액 기부를 신청 조건으로 걸고 Cloud Vision으로 기부 영수증을 검증합니다. Gemini가 물건에 맞는 재활용 아이디어를 제안합니다.",
            roles: ["기획", "디자인", "Flutter 개발"],
            stack: ["Flutter", "Gemini API", "Cloud Vision API"],
            href: "https://github.com/gdsc-ssu/anbd-app",
            demo: { label: "데모 영상", href: "https://youtu.be/hoBEhgEUL4M" },
          },
          {
            year: "2024",
            name: "Beyond-B",
            event: "GDSC Solution Challenge 2024",
            tagline: "경계선 지능 아동을 위한 문해력·표현력 학습 앱",
            body: "도서를 읽고 퀴즈로 이해를 확인한 뒤, 여섯 단계로 나눈 일기 쓰기와 캘린더 기록으로 표현을 연습합니다. 아이가 한 번에 긴 글을 쓰지 않도록 쓰는 과정을 잘게 쪼갰습니다.",
            roles: ["기획", "디자인", "Android 개발"],
            stack: ["Java", "Android"],
            href: "https://github.com/Beyond-B/Beyond-B-Front",
          },
        ],
      },
    },
  },
  {
    id: "google-student-ambassador",
    period: "2025.08 - 2025.11",
    org: "마케팅 프로그램",
    title: "Google Student Ambassador",
    summary:
      "Google Student Ambassador 주요 활동으로는 Gemini의 학생 저변 확대를 위한 마케팅 전략 수립 및 실행을 주도했습니다.",
    points: [
      "온·오프라인 하이브리드 마케팅 전개",
      "체험형 오프라인 부스 운영",
      "소셜 바이럴 마케팅 미션 진행",
    ],
    detail: {
      label: "대외활동 - Google Student Ambassador",
      intro: [
        "Google Student Ambassador 주요 활동으로는 Gemini의 학생 저변 확대를 위한 마케팅 전략 수립 및 실행을 주도했습니다.",
      ],
      photos: [
        {
          src: "/experience/gsa-1.jpg",
          alt: "'Gemini와 점프를' 현수막을 건 야외 체험 부스",
          width: 1200,
          height: 900,
        },
        {
          src: "/experience/gsa-2.jpg",
          alt: "#Team Gemini 안내판을 세운 실내 부스와 참가 안내 포스터",
          width: 1200,
          height: 900,
        },
        {
          src: "/experience/gsa-3.jpg",
          alt: "대동제 야외 부스에서 게임 체험에 참여하는 학생",
          width: 1200,
          height: 900,
        },
      ],
      statement: {
        lead: "학생들에게 Gemini를 소개하며 제가 세운 목표는,",
        highlight: "'대학생의 일상 속 친근한 존재'",
        tail: "로 만드는 것이었습니다.",
      },
      flow: {
        label: "Phase",
        heading: ["두 개의 미션으로", "구성된 프로그램"],
        body: "Google Student Ambassador는 두 개의 미션으로 구성된 프로그램이었습니다. 미션마다 목표가 달라서 채널과 콘텐츠 방식을 각각 다르게 잡았습니다.",
        steps: [
          {
            badge: "PHASE 1",
            role: "Google AI Pro for Students",
            title: "사인업 미션",
            body: "학생들이 Google AI Pro 플랜에 가입하도록 유도하고, 실질적인 AI 활용 사례를 체험하게 하는 데 집중했습니다.",
          },
          {
            badge: "PHASE 2",
            role: "Google Gemini",
            title: "소셜 바이럴 미션",
            body: "Gemini를 대학생의 일상 속 친근한 존재로 포지셔닝하기 위해 '친구, 선배, 연인, 가족'이라는 네 가지 페르소나를 설정하여 숏폼 콘텐츠 중심의 마케팅을 진행했습니다.",
          },
        ],
      },
      process: {
        label: "Process",
        heading: ["기획안부터 결과까지", "실무처럼"],
        body: "두 미션 모두 같은 절차로 진행했습니다. 현업 구글 실무자 앞에서 기획안을 발표해 승인과 예산을 받고, 캠페인이 끝난 뒤에는 결과를 숫자로 정리해 다시 발표했습니다. 목표를 먼저 숫자로 약속하고 그 숫자로 답해야 하는 구조였습니다.",
        steps: [
          {
            badge: "STEP 1",
            role: "Pitching",
            title: "기획안 피칭",
            body: "채널별 목표 KPI와 실행 계획, 필요 예산을 담은 기획안을 현업 구글 실무자 앞에서 발표했습니다. 온라인 2건과 오프라인 2건, 총 사인업 950회를 목표로 잡았습니다.",
          },
          {
            badge: "STEP 2",
            role: "Feedback",
            title: "피드백 반영",
            body: "기존 홍보의 트래킹 현황, 투입 대비 KPI가 낮게 잡힌 구간, 로고와 브랜드 사용 범위에 대한 피드백을 받아 기획을 수정한 뒤 예산을 배정받았습니다.",
          },
          {
            badge: "STEP 3",
            role: "Execution",
            title: "캠페인 실행",
            body: "8월부터 10월까지 온·오프라인 네 개 캠페인을 차례로 진행하며 채널별 지표를 기록했습니다.",
          },
          {
            badge: "STEP 4",
            role: "Reporting",
            title: "결과 보고",
            body: "캠페인 종료 후 채널별 성과를 정리해 결과 PT로 발표했습니다.",
          },
        ],
      },
      groups: {
        label: "Activity",
        heading: ["캠페인별", "실행 내용"],
        body: "Phase 1에서는 온·오프라인 다섯 건, Phase 2에서는 페르소나 네 건과 추가 밈 제작을 진행했습니다. 캠페인마다 목표 KPI를 먼저 정하고 채널과 실행 방식을 맞췄습니다. Phase 2 기획 단계의 [교수님처럼]은 실행에서 [가족처럼]으로 바뀌었고, 바이럴 밈은 추가 프로그램으로 넣었습니다.",
        items: [
          {
            phase: "Phase 1 · Online",
            title: "숭실대학교 학과 및 동아리 단톡방 홍보",
            meta: [
              { label: "기간", value: "2025.08.11 - 10.06" },
              { label: "목표", value: "사인업 500회 · 콘텐츠 20건 · 노출 8,000건" },
              { label: "결과", value: "콘텐츠 21건 · 노출 4,163건" },
            ],
            points: [
              {
                name: "대상과 채널",
                body: "숭실대학교 대학(원)생을 대상으로 학과별 카카오톡 단체방 14개와 동아리 단체방 6개에 배포했습니다.",
              },
              {
                name: "준비",
                body: "홍보할 학과와 동아리를 리스트업하고 각 운영진을 컨택해 홍보를 제의했습니다. 홍보물을 검수하고 트래킹용 링크를 따로 준비했습니다.",
              },
              {
                name: "실행",
                body: "21학번부터 25학번까지의 단체방에 Google AI Pro for Students 프로모션 홍보물을 배포했습니다.",
              },
            ],
          },
          {
            phase: "Phase 1 · Online",
            title: "GDGoC Soongsil 인스타그램 카드뉴스 게시",
            meta: [
              { label: "기간", value: "2025.08.11 - 09.03" },
              { label: "목표", value: "콘텐츠 2건 · 노출 2,000건" },
              { label: "결과", value: "콘텐츠 3건 · 노출 4,740건" },
            ],
            points: [
              {
                name: "대상과 채널",
                body: "타 대학 GDGoC 학생과 GDGoC 활동에 관심 있는 학생 개발자를 대상으로, 팔로워 343명·게시물 162개의 GDGoC Soongsil 인스타그램 계정을 활용했습니다.",
              },
              {
                name: "준비",
                body: "오프라인 활동 사진을 촬영·기록하고 프로모션 상세 내용을 담은 카드뉴스를 디자인했습니다.",
              },
              {
                name: "측정",
                body: "카드뉴스를 조회한 사람 중 팔로워와 비팔로워의 비율을 함께 확인해, 계정 밖으로 얼마나 퍼졌는지 볼 수 있게 했습니다.",
              },
            ],
          },
          {
            phase: "Phase 1 · Offline",
            title: "GDGoC Soongsil Final Event : Playground",
            meta: [
              { label: "기간", value: "2025.08.15 - 09.06" },
              { label: "목표", value: "방문자 100명 · 링크 인입 100회 · 사인업 50회" },
              { label: "결과", value: "방문자 80명 · 노출 80회 · 사인업 10회" },
            ],
            points: [
              {
                name: "대상",
                body: "숭실대학교 재학생과 휴학생을 주 대상으로, 외부 방문객과 Google AI에 관심 있는 일반인까지 포함했습니다.",
              },
              {
                name: "구성",
                body: "Solution Challenge 7개 부스에서 프로젝트를 전시·시연하고, 별도의 Google Gemini 부스를 '숨겨진 기능' 찾기와 럭키드로우의 거점으로 운영했습니다. 교내 게시판 포스터와 인스타그램 사전 공지로 방문을 유도했습니다.",
              },
              {
                name: "진행 순서",
                body: "행사 곳곳에 Gemini가 적용된 기능이 숨어 있다고 안내해 흥미를 유발하고, 참여를 원하는 방문객에게 Google AI Pro for Students 가입으로 참가 자격을 부여한 뒤, 부스를 돌며 Gemini가 쓰인 기능을 찾아오는 미션을 수행하게 했습니다.",
              },
              {
                name: "리워드",
                body: "솔루션 챌린지 부스 세 곳에서 Gemini가 쓰인 부분을 찾으면 미션 완료로 보고 럭키드로우 추첨권을 한 장씩 줬습니다. 행사 종료 한 시간 전에 추첨해 현장에 있는 참가자에게 경품을 증정했습니다.",
              },
            ],
          },
          {
            phase: "Phase 1 · Offline",
            title: "Gemini와 점프를! - 숭실대학교 대동제 '위량제'",
            meta: [
              { label: "기간", value: "2025.08.15 - 09.25" },
              { label: "목표", value: "방문자 300명 · 링크 인입 300회 · 사인업 300회" },
            ],
            points: [
              {
                name: "게임 개발",
                body: "크롬 오프라인 공룡 게임을 모티브로, Gemini 프롬프팅만으로 부스에서 돌릴 게임을 만들었습니다.",
              },
              {
                name: "진행 순서",
                body: "방문객에게 플랜과 게임을 소개하고, Google AI Pro for Students 가입으로 참가 권한을 얻게 한 뒤, 참가자가 직접 그린 그림을 스캔해 Gemini로 게임 캐릭터로 변환하고 그 캐릭터로 플레이하게 했습니다.",
              },
              {
                name: "차별점",
                body: "모든 체험을 무료로 열고, 단순히 구경하는 부스가 아니라 방문객이 자기 결과물을 만들어 가는 구조로 짰습니다.",
              },
            ],
          },
          {
            phase: "Phase 1 · Online",
            title: "8초 VEO 챌린지 - 8초면 충분해, 특별한 순간을 만드는 법",
            meta: [
              { label: "목표", value: "조회수 2,000회" },
              { label: "결과", value: "조회수 2,390회" },
            ],
            points: [
              {
                name: "기획",
                body: "GDGoC Soongsil이 직접 Gemini로 챌린지에 참여하는 모습을 보여줘, 학생들이 챌린지를 어렵거나 부담스럽게 느끼지 않도록 했습니다.",
              },
              {
                name: "영상 구성",
                body: "1분 이하의 릴스로, 무신사 박스를 열고 Gemini로 아이디어를 구현하는 제작 과정을 담은 뒤 완성된 8초 챌린지 영상을 하이라이트로 붙였습니다.",
              },
              {
                name: "참여 유도",
                body: "\"우리도 직접 참여했다\"는 메시지로 거리감을 줄이고, 가볍고 생동감 있는 톤으로 자발적인 UGC 확산을 노렸습니다.",
              },
            ],
          },
          {
            phase: "Phase 2 · 친구처럼",
            title: "커피빵 내기 릴스",
            meta: [
              { label: "기간", value: "2025.11.05 - 11.23" },
              { label: "목표", value: "Social Viral Score 1,400점 · 조회 3,000회" },
              { label: "결과", value: "노출 8,059 · 좋아요 117 · 댓글 40 · 공유 93" },
            ],
            points: [
              {
                name: "컨셉",
                body: "제미나이를 언제나 곁에 있는 친구처럼, 공부뿐 아니라 소소한 농담과 취향 공유까지 함께하는 존재로 그렸습니다.",
              },
              {
                name: "채널 선택",
                body: "일상에 더 가깝게 다가가기 위해 팀 계정이 아니라 앰버서더 개인 계정에 올려 자연스러운 확산을 노렸습니다.",
              },
              {
                name: "메시지 구조",
                body: "Hook으로 \"오늘 커피 쏠 사람은 AI가 정한다!\"를 던지고, 제미나이에게 문제와 선택을 맡긴 뒤, 결과에 웃고 놀라는 리얼 리액션으로 마무리했습니다. 친구 3~4인이 등장하는 게임형 숏폼입니다.",
              },
            ],
          },
          {
            phase: "Phase 2 · 선배처럼",
            title: "홍콩 여행 제미나이에게 물어보기",
            meta: [
              { label: "기간", value: "2025.11.05 - 11.23" },
              { label: "목표", value: "Social Viral Score 1,400점 · 조회 3,000회" },
              { label: "결과", value: "노출 838 · 좋아요 7 · 댓글 2 · 공유 3" },
            ],
            points: [
              {
                name: "컨셉",
                body: "여행 목적지를 제미나이에게 추천받는 과정을 보여주며 길을 알려주는 선배 역할을 강조했습니다.",
              },
              {
                name: "포맷",
                body: "투어 Vlog 위에 AI 프롬프트를 오버레이했습니다. Hook은 \"여행 가이드 Gemini가 추천하는 홍콩 관광지 7곳!\"이고, 프롬프트를 넣는 장면과 실제 방문 장면을 이어 붙였습니다.",
              },
              {
                name: "시각 요소",
                body: "프롬프트 캡처와 지도·이모티콘 오버레이를 얹고 밝은 배경음을 깔았습니다.",
              },
            ],
          },
          {
            phase: "Phase 2 · 연인처럼",
            title: "애인과 싸우기 전에 제미나이 사용해보세요",
            meta: [
              { label: "기간", value: "2025.11.05 - 11.20" },
              { label: "목표", value: "Social Viral Score 1,400점 · 조회 3,000회" },
              { label: "결과", value: "노출 1,212 · 좋아요 6 · 댓글 9 · 공유 9" },
            ],
            points: [
              {
                name: "컨셉",
                body: "제미나이를 감정적으로 표현해 사용자의 취향과 습관, 생각을 이해하는 존재로 그렸습니다. 공감과 유머로 '사람보다 다정한 AI'라는 이미지를 만들고자 했습니다.",
              },
              {
                name: "구조",
                body: "Hook은 \"POV : 애인과 싸울때\"로 상황을 먼저 이해시키고, 카톡 대화창과 제미나이 프롬프트 창을 전환하며 보여줬습니다.",
              },
              {
                name: "채널",
                body: "팀 계정(@teamgemini_gdg.ssu)에 업로드했습니다.",
              },
            ],
          },
          {
            phase: "Phase 2 · 가족처럼",
            title: "혹시 너도 졸업 스냅 귀찮아?",
            meta: [
              { label: "기간", value: "2025.11.05 - 11.24" },
              { label: "목표", value: "Social Viral Score 1,400점 · 조회 3,000회" },
              { label: "결과", value: "노출 3,833 · 좋아요 119 · 댓글 49 · 공유 10" },
            ],
            points: [
              {
                name: "컨셉",
                body: "바쁜 졸업 시즌에 가장 예쁜 모습을 남겨주고 싶은 언니나 부모님의 마음으로, 제미나이가 졸업 스냅을 만들어주는 컨셉입니다.",
              },
              {
                name: "출연",
                body: "앰버서더가 아니라 숭실대 학생이 직접 출연하고 업로드했습니다. 인물이 등장하면서 집중도가 올라갔습니다.",
              },
              {
                name: "구조",
                body: "Hook은 \"다가온 졸업시즌…! 만나면 이런 질문을 자주 듣는다\"로 열고, 제미나이 프롬프트 결과를 공유하는 흐름으로 짰습니다.",
              },
            ],
          },
          {
            phase: "Phase 2 · 추가",
            title: "바이럴 밈 제작",
            meta: [
              { label: "기간", value: "2025.11.05 - 11.24" },
              { label: "목표", value: "Social Viral Score 1,400점 · 조회 3,000회" },
              { label: "결과", value: "게시글 8건 · 릴스 8건 · 노출 3,290 · 좋아요 92" },
            ],
            points: [
              {
                name: "컨셉",
                body: "딱딱한 기능 설명 대신 밈과 숏폼이라는 MZ세대의 문법을 써서, 제미나이를 놀이 도구이자 유쾌한 친구로 포지셔닝했습니다.",
              },
              {
                name: "공감형 릴스",
                body: "\"코딩할 때 내 모습 → 제미나이 사용\"처럼 공감할 만한 상황극을 빠른 호흡으로 제작해 몰입도를 높였습니다.",
              },
              {
                name: "트렌드 활용",
                body: "낙엽 밟기처럼 유행하는 콘텐츠를 가져다 쓰고, 제미나이의 정보와 활용법을 유머로 풀었습니다.",
              },
            ],
          },
        ],
      },
      metrics: {
        label: "Result",
        heading: ["숫자로 본", "캠페인"],
        body: "결과 보고서에 기록한 채널별 노출과 조회입니다. 캠페인별 목표 대비 달성 현황은 위 항목에 함께 적어뒀습니다.",
        items: [
          { value: "8,059", label: "[친구처럼] 커피빵 내기 릴스 노출" },
          { value: "4,740", label: "인스타그램 카드뉴스 노출" },
          { value: "4,163", label: "카카오톡 프로모션 노출" },
          { value: "3,833", label: "[가족처럼] 졸업 스냅 릴스 노출" },
          { value: "3,290", label: "바이럴 밈 8건 노출" },
          { value: "2,390", label: "VEO 챌린지 릴스 조회" },
        ],
      },
    },
  },
];

export function getExperience(id: string) {
  return experiences.find((item) => item.id === id) ?? null;
}
