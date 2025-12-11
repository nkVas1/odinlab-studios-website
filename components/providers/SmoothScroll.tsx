"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Инициализация только на клиенте
    if (typeof window === "undefined") return;

    try {
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Подключить ScrollTrigger к Lenis событиям
      lenis.on("scroll", ScrollTrigger.update);

      // Использовать requestAnimationFrame вместо GSAP ticker
      // Это избегает конфликтов с React батчингом
      const raf = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };

      rafRef.current = requestAnimationFrame(raf);

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (error) {
      console.error("SmoothScroll initialization error:", error);
      return undefined;
    }
  }, []);

  return <div className="root-wrapper">{children}</div>;
}
