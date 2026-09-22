"use client";

import { useEffect, useState } from "react";

const weights = [300, 400, 500, 600, 700, 800];

export default function HeroTitle() {
  const [helloWeight, setHelloWeight] = useState(500);
  const [sunnyWeight, setSunnyWeight] = useState(500);

  useEffect(() => {
    const helloTimer = window.setInterval(() => {
      setHelloWeight(randomWeight());
    }, 1200);

    const sunnyTimer = window.setInterval(() => {
      setSunnyWeight(randomWeight());
    }, 900);

    return () => {
      window.clearInterval(helloTimer);
      window.clearInterval(sunnyTimer);
    };
  }, []);

  return (
    <h1>
      <span className="hero-title-part" style={{ fontWeight: helloWeight }}>
        안녕하세요,
      </span>{" "}
      <span className="hero-title-part hero-title-part--sunny" style={{ fontWeight: sunnyWeight }}>
        SUNNY
      </span>
      <span className="hero-title-part" style={{ fontWeight: sunnyWeight }}>
        입니다.
      </span>
    </h1>
  );
}

function randomWeight() {
  return weights[Math.floor(Math.random() * weights.length)];
}
