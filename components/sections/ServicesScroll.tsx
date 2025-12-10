"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Web Development",
    desc: "Инновационные сайты и веб-приложения на Next.js",
    color: "from-blue-900 to-slate-900",
  },
  {
    id: "02",
    title: "OdinLab Games",
    desc: "Разработка игр AAA-класса и иммерсивных механик",
    color: "from-purple-900 to-indigo-900",
  },
  {
    id: "03",
    title: "Production",
    desc: "Продюсирование, съемки и визуальный сторителлинг",
    color: "from-amber-900 to-orange-900",
  },
  {
    id: "04",
    title: "Design & Art",
    desc: "Уникальный фирменный стиль и 3D-графика",
    color: "from-emerald-900 to-teal-900",
  },
];

export default function ServicesScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="flex h-screen w-[400vw] flex-row relative"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative flex h-screen w-screen flex-col justify-center px-12 md:px-24 bg-gradient-to-br ${service.color}`}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-black" />

              <div className="relative z-10 max-w-4xl">
                <span className="mb-4 block font-mono text-xl text-white/50">
                  {service.id} — DIVISION
                </span>
                <h2 className="mb-6 font-display text-6xl font-bold uppercase text-white md:text-8xl">
                  {service.title}
                </h2>
                <p className="max-w-xl text-xl text-gray-300 md:text-2xl">
                  {service.desc}
                </p>

                <button className="mt-12 rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black">
                  Подробнее
                </button>
              </div>

              <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
