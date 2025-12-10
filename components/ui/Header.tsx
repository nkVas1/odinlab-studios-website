"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Главная", href: "/" },
  { title: "Услуги", href: "/services" },
  { title: "OdinLab Production", href: "/production" },
  { title: "Games Division", href: "/games" },
  { title: "Контакты", href: "/contacts" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-odin-dark/80 backdrop-blur-md"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="relative z-50 group">
            <span className="font-display text-2xl font-bold tracking-tighter text-white transition-colors group-hover:text-odin-gold">
              ODINLAB<span className="text-odin-gold">.</span>
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white hover:text-odin-gold transition-colors"
          >
            <span className="hidden md:block">{isOpen ? "Закрыть" : "Меню"}</span>
            <div className="rounded-full border border-white/20 p-2 backdrop-blur-sm transition-transform hover:scale-110 hover:border-odin-gold/50">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-odin-blue"
          >
            <div className="absolute inset-0 opacity-20 bg-gradient-radial from-odin-gold/10 to-transparent" />

            <nav className="relative z-10 flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    duration: 0.5,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group relative font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 hover:to-odin-gold transition-all duration-300"
                  >
                    {link.title}
                    <span className="absolute -bottom-2 left-0 h-1 w-0 bg-odin-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 left-0 right-0 text-center font-mono text-xs text-white/40"
            >
              MOSCOW — 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
