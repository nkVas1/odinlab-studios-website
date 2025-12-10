"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-odin-dark py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.2),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            Let's build <br />
            <span className="text-odin-gold">the future</span>
          </motion.h2>

          <div className="space-y-6 text-odin-text/80 font-mono text-lg">
            <div className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-odin-gold/50 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <span>hello@odinlab.studio</span>
            </div>

            <div className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-odin-gold/50 transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <span>+7 (999) 123-45-67</span>
            </div>

            <div className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-odin-gold/50 transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <span>Москва, Пресненская наб., 12</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-odin-muted">
                  Имя
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-odin-gold outline-none transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-odin-muted">
                  Компания
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-odin-gold outline-none transition-colors"
                  placeholder="Odin Corp"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-odin-muted">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-odin-gold outline-none transition-colors"
                placeholder="hello@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-odin-muted">
                О проекте
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-odin-gold outline-none transition-colors resize-none"
                placeholder="Расскажите о вашей задаче..."
              />
            </div>

            <button
              type="submit"
              className="w-full group relative overflow-hidden rounded-full bg-white px-8 py-4 text-black transition-all hover:bg-odin-gold"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                Отправить заявку
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
