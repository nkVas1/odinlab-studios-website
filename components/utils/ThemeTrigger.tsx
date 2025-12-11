"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThemeTrigger() {
  useEffect(() => {
    // Триггер для темы "Glass"
    ScrollTrigger.create({
      trigger: "#services-section",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        document.body.classList.add("theme-glass");
        document.body.classList.remove("theme-kinetic");
      },
      onLeaveBack: () => {
        document.body.classList.remove("theme-glass");
        document.body.classList.remove("theme-kinetic");
      },
    });

    // Триггер для темы "Kinetic"
    ScrollTrigger.create({
      trigger: "#contact-section",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        document.body.classList.remove("theme-glass");
        document.body.classList.add("theme-kinetic");
      },
      onLeaveBack: () => {
        document.body.classList.remove("theme-kinetic");
        document.body.classList.add("theme-glass");
      },
    });

    // Очистка при размонтировании
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.body.className = "";
    };
  }, []);

  return null;
}
