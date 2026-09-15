"use client";

import { useEffect } from "react";

export default function ScrollMotion() {
  useEffect(() => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".motion-item"));

    if (!motionOK) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    items.forEach((item, index) => {
      if (item.classList.contains("profile-motion-1")) {
        item.style.setProperty("--motion-delay", "0ms");
      } else if (item.classList.contains("profile-motion-2")) {
        item.style.setProperty("--motion-delay", "140ms");
      } else if (item.classList.contains("profile-motion-3")) {
        item.style.setProperty("--motion-delay", "280ms");
      } else {
        item.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 90}ms`);
      }
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
