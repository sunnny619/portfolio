"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* 메인(/)은 블로그, 포트폴리오는 /portfolio 에 있다.
   Posts 탭은 포트폴리오의 #posts 섹션이 아니라 메인 블로그로 보낸다. */
const navItems = [
  { id: "profile", label: "Profile", href: "/portfolio#profile" },
  { id: "experiences", label: "Experiences", href: "/portfolio#experiences" },
  { id: "projects", label: "Projects", href: "/portfolio#projects" },
  { id: "posts", label: "Posts", href: "/" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  // 섹션이 없는 페이지에서는 스크롤 위치로 강조하지 않는다
  const [activeId, setActiveId] = useState("");
  const isBlog = pathname === "/" || pathname.startsWith("/blog");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const updateActive = () => {
      const current = sections
        .map((section) => ({
          id: section.id,
          distance: Math.abs(section.getBoundingClientRect().top - 80),
          top: section.getBoundingClientRect().top,
        }))
        .filter((section) => section.top < window.innerHeight * 0.65)
        .sort((a, b) => a.distance - b.distance)[0];

      if (current) setActiveId(current.id);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("hashchange", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, []);

  // 블로그(/, /blog/*)에서는 다른 페이지로 넘어가는 탭을 숨기고 로고만 둔다
  if (isBlog) {
    return (
      <header className="site-header">
        <a href="/" className="brand">
          SEONEUI
        </a>
      </header>
    );
  }

  return (
    <header className="site-header">
      <a href="/portfolio#home" className="brand">
        SEONEUI
      </a>
      <nav className="nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            href={item.href}
            className={activeId === item.id ? "is-active" : undefined}
            key={item.id}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
