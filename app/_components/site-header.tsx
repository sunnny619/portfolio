"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "posts", label: "Posts" },
];

export default function SiteHeader() {
  // 홈이 아닌 페이지(/blog 등)에는 섹션이 없으니 아무것도 강조하지 않는다
  const [activeId, setActiveId] = useState("");

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

  return (
    <header className="site-header">
      <a href="/#home" className="brand">
        SEONEUI
      </a>
      <nav className="nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            href={`/#${item.id}`}
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
