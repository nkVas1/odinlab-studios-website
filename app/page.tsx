"use client";

import { useEffect, useRef, Suspense } from "react";
import { gsap } from "gsap";
import Scene from "@/components/canvas/Scene";
import FloatingShape from "@/components/canvas/FloatingShape";
import ServicesScroll from "@/components/sections/ServicesScroll";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      heroTextRef.current,
      { y: 100, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
    ).fromTo(
      subTextRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=1"
    );
  }, []);

  return (
    <>
      {/* Временно отключен Canvas из-за ошибки React */}
      {/* <Suspense fallback={<div className="fixed inset-0 bg-odin-dark" />}>
        <Scene>
          <FloatingShape />
        </Scene>
      </Suspense> */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-odin-dark via-odin-dark/95 to-odin-blue/20" />

      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <div className="z-10 flex flex-col items-center text-center mix-blend-difference">
          <h1
            ref={heroTextRef}
            className="font-display text-[12vw] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 md:text-[8vw]"
          >
            ODINLAB
            <br />
            <span className="text-odin-gold">STUDIOS</span>
          </h1>

          <p
            ref={subTextRef}
            className="mt-8 max-w-lg font-mono text-sm uppercase tracking-[0.2em] text-odin-text/80 md:text-base"
          >
            Design · Production · Games · Future
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-10 w-6 rounded-full border-2 border-odin-text/30 p-1">
            <div className="h-2 w-full rounded-full bg-odin-gold" />
          </div>
        </div>
      </section>

      <section className="relative z-10 min-h-screen bg-odin-dark/90 px-4 py-20 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
            Мы создаем <span className="text-odin-accent">цифровые миры</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-odin-muted">
            OdinLab — это синергия технологий и искусства. Мы не просто пишем код,
            мы проектируем эмоции.
          </p>
        </div>
      </section>

      <ServicesScroll />
      <ContactSection />
    </>
  );
}
