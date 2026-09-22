import Link from "next/link";

import { experiences } from "@/lib/experiences";

/* ══════════════════════════════════════════════════════════════
   Experience — 가로로 긴 카드 리스트
   카드 전체가 상세 페이지(/experiences/[id]) 로 가는 링크입니다.
   내용은 lib/experiences.ts 에서 관리합니다.
   ══════════════════════════════════════════════════════════════ */

export default function ExperienceList() {
  return (
    <ul className="exp-list">
      {experiences.map((item) => (
        <li className="exp-card motion-item" key={item.id}>
          <Link className="exp-card-link" href={`/experiences/${item.id}`}>
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

            <span className="exp-more">자세히 보기</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
