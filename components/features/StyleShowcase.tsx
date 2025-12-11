"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Coffee, Grid3x3, Sparkles, Crown, PenTool } from "lucide-react";

// --- 1. Определение Стилей (4 Тренда 2025) ---
const STYLES = {
  bento: {
    name: "Bento Grid",
    label: "Bento Grid",
    icon: <Grid3x3 size={20} />,
    desc: "Тренд 2025. Модульность, скругления, мягкий свет. Стиль современных стартапов и экосистем.",
    vars: {
      "--bg-page": "#F1F5F9",
      "--bg-card": "#FFFFFF",
      "--text-main": "#0F172A",
      "--text-sec": "#64748B",
      "--accent": "#3B82F6",
      "--radius": "24px",
      "--border": "none",
      "--font-h": '"Inter", sans-serif',
      "--shadow": "0 20px 40px rgba(0, 0, 0, 0.08)",
      "--btn-shape": "24px",
      "--layout-gap": "24px",
    },
  },
  y2k: {
    name: "Y2K Acid",
    label: "Y2K / Acid",
    icon: <Sparkles size={20} />,
    desc: "Ностальгия по 2000-м. Кислотные цвета, пиксельные шрифты, брутальные рамки.",
    vars: {
      "--bg-page": "#000000",
      "--bg-card": "#0A0A0A",
      "--text-main": "#D4FF00",
      "--text-sec": "#88FF00",
      "--accent": "#FF00E5",
      "--radius": "0px",
      "--border": "2px solid #FF00E5",
      "--font-h": '"JetBrains Mono", monospace',
      "--shadow": "0 0 20px rgba(255, 0, 229, 0.4)",
      "--btn-shape": "0px",
      "--layout-gap": "16px",
    },
  },
  luxury: {
    name: "Old Money",
    label: "Люкс",
    icon: <Crown size={20} />,
    desc: "Тихая роскошь. Антиква, много воздуха, тонкие линии, отсутствие лишних цветов.",
    vars: {
      "--bg-page": "#F9F8F6",
      "--bg-card": "rgba(255, 255, 255, 0.5)",
      "--text-main": "#1C1917",
      "--text-sec": "#78716C",
      "--accent": "#6B4423",
      "--radius": "0px",
      "--border": "1px solid rgba(28, 25, 23, 0.1)",
      "--font-h": '"Times New Roman", serif',
      "--shadow": "none",
      "--btn-shape": "2px",
      "--layout-gap": "40px",
    },
  },
  paper: {
    name: "Papercut",
    label: "Papercut",
    icon: <PenTool size={20} />,
    desc: "Тактильность. Эффект бумаги, коллажи, рукописные элементы. Очень живой стиль.",
    vars: {
      "--bg-page": "#FFFBEB",
      "--bg-card": "#FFFFFF",
      "--text-main": "#0F172A",
      "--text-sec": "#94A3B8",
      "--accent": "#F59E0B",
      "--radius": "8px",
      "--border": "2px dashed #F59E0B",
      "--font-h": '"Comic Sans MS", cursive',
      "--shadow": "3px 3px 0px rgba(0, 0, 0, 0.1)",
      "--btn-shape": "12px",
      "--layout-gap": "32px",
    },
  },
};

type StyleKey = keyof typeof STYLES;

// --- 2. Мини-Сайт (Контент Coffee.io) ---
const MockWebsite = ({ currentStyle }: { currentStyle: (typeof STYLES)[StyleKey] }) => {
  const vars = currentStyle.vars;

  return (
    <div
      className="w-full h-full p-8 transition-all duration-500 overflow-y-auto relative"
      style={{
        background: vars["--bg-page"],
        color: vars["--text-main"],
        fontFamily: vars["--font-h"],
      } as React.CSSProperties}
    >
      {/* Фоновая текстура для papercut */}
      {currentStyle.name === "Papercut" && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {/* Header */}
      <header className="flex justify-between items-center mb-12 relative z-10">
        <div className="font-bold text-2xl" style={{ fontFamily: vars["--font-h"] }}>
          COFFEE
          <span style={{ color: vars["--accent"] }}>.IO</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm" style={{ color: vars["--text-sec"] }}>
          <span>Продукты</span>
          <span>О нас</span>
          <span>Контакты</span>
        </nav>
        <button
          style={{
            background: vars["--accent"],
            color: currentStyle.name === "Y2K" ? "#000" : "#fff",
            border: vars["--border"],
            borderRadius: vars["--btn-shape"],
            boxShadow: vars["--shadow"],
            padding: "0.5rem 1.5rem",
            fontWeight: "bold",
            fontFamily: vars["--font-h"],
            transform: currentStyle.name === "Papercut" ? "rotate(-1deg)" : undefined,
          } as React.CSSProperties}
          className="transition-all hover:scale-105"
        >
          Купить
        </button>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16 relative z-10">
        <div className="flex-1 space-y-6">
          {/* Badge */}
          <div
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              fontSize: "0.75rem",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              background: vars["--bg-card"],
              border: vars["--border"],
              borderRadius: vars["--radius"],
              color: vars["--accent"],
            } as React.CSSProperties}
          >
            Новая коллекция 2025
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: currentStyle.name === "Old Money" ? "2.5rem" : "2.25rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              color: vars["--text-main"],
              fontFamily: vars["--font-h"],
              fontStyle: currentStyle.name === "Old Money" ? "italic" : undefined,
              transform: currentStyle.name === "Papercut" ? "rotate(-0.5deg)" : undefined,
            } as React.CSSProperties}
          >
            Утреннее <br /> <span style={{ color: vars["--accent"] }}>Ритуальное</span>
          </h1>

          {/* Description */}
          <p style={{ color: vars["--text-sec"], lineHeight: "1.6", maxWidth: "400px" }}>
            Мы переизобрели кофе. Идеальная температура, идеальный вкус, идеальный момент для ваших наилучших идей.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              style={{
                background: vars["--accent"],
                color: currentStyle.name === "Y2K" ? "#000" : "#fff",
                border: vars["--border"],
                borderRadius: vars["--btn-shape"],
                boxShadow: vars["--shadow"],
                padding: "0.75rem 1.5rem",
                fontWeight: "bold",
                fontFamily: vars["--font-h"],
                transform: currentStyle.name === "Papercut" ? "rotate(0.5deg)" : undefined,
              } as React.CSSProperties}
              className="transition-all hover:scale-105"
            >
              Попробовать
            </button>
            <button
              style={{
                background: "transparent",
                color: vars["--accent"],
                border: vars["--border"],
                borderRadius: vars["--btn-shape"],
                padding: "0.75rem 1.5rem",
                fontWeight: "bold",
                fontFamily: vars["--font-h"],
              } as React.CSSProperties}
              className="transition-all hover:opacity-80"
            >
              Подробнее
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div
          className="flex-1 w-full flex items-center justify-center relative"
          style={{
            aspectRatio: "1",
            background: vars["--bg-card"],
            border: vars["--border"],
            borderRadius: vars["--radius"],
            boxShadow: vars["--shadow"],
            transform: currentStyle.name === "Papercut" ? "rotate(2deg)" : undefined,
          } as React.CSSProperties}
        >
          <Coffee size={100} strokeWidth={1.5} style={{ color: vars["--accent"] }} />
          {currentStyle.name === "Y2K" && (
            <div className="absolute top-3 right-3 text-xs font-mono" style={{ color: vars["--accent"] }}>
              #Y2K
            </div>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: vars["--layout-gap"],
          marginTop: "2rem",
        } as React.CSSProperties}
      >
        {[
          { title: "Обжарка", desc: "Контролируемая", icon: Zap },
          { title: "Интенсивность", desc: "Экстремальная", icon: Sparkles },
          { title: "Стиль", desc: "Эксклюзивный", icon: Coffee },
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              style={{
                padding: "1.5rem",
                background: vars["--bg-card"],
                border: vars["--border"],
                borderRadius: vars["--radius"],
                boxShadow: vars["--shadow"],
                transform:
                  currentStyle.name === "Papercut" ? (i === 1 ? "rotate(1.5deg)" : "rotate(-1deg)") : undefined,
              } as React.CSSProperties}
            >
              <div
                style={{
                  marginBottom: "1rem",
                  color: vars["--accent"],
                }}
              >
                <Icon size={24} />
              </div>
              <h3
                style={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: vars["--text-main"],
                  fontFamily: vars["--font-h"],
                }}
              >
                {feature.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: vars["--text-sec"] }}>{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Footer Watermark */}
      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: vars["--border"],
          textAlign: "center",
          fontSize: "0.75rem",
          color: vars["--text-sec"],
          opacity: 0.5,
        }}
      >
        POWERED BY ODINLAB
      </div>
    </div>
  );
};

// --- 3. Основной Компонент (Обертка) ---
export default function StyleShowcase() {
  const [activeStyle, setActiveStyle] = useState<StyleKey>("bento");

  const currentStyleData = STYLES[activeStyle];

  return (
    <section className="py-24 bg-odin-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Заголовок Блока */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Дизайн для <span className="text-odin-gold">вашего</span> стиля
          </h2>
          <p className="text-odin-muted text-lg max-w-2xl mx-auto">
            Четыре радикально разных подхода к дизайну. Выбирайте стиль, который резонирует с вашей философией бренда.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Панель Управления */}
          <div className="w-full lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {Object.entries(STYLES).map(([key, style]) => (
              <button
                key={key}
                onClick={() => setActiveStyle(key as StyleKey)}
                className={`group relative flex items-center p-4 rounded-xl transition-all duration-300 border ${
                  activeStyle === key
                    ? "bg-white/10 border-odin-gold shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                    : "bg-transparent border-white/10 hover:bg-white/5 hover:border-white/30"
                }`}
              >
                <div
                  className={`mr-4 p-2 rounded-lg flex items-center justify-center ${
                    activeStyle === key ? "bg-odin-gold text-black" : "bg-white/10 text-white"
                  }`}
                >
                  {style.icon}
                </div>
                <div className="text-left">
                  <h3
                    className={`font-bold ${activeStyle === key ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                  >
                    {style.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{style.desc}</p>
                </div>

                {activeStyle === key && (
                  <div className="absolute right-4">
                    <motion.div layoutId="active-dot" className="w-2 h-2 bg-odin-gold rounded-full" />
                  </div>
                )}
              </button>
            ))}

            {/* CTA внутри панели */}
            <div className="mt-8 p-6 bg-gradient-to-br from-odin-accent/20 to-odin-blue/20 rounded-xl border border-odin-accent/30 text-center">
              <h4 className="text-white font-bold mb-2">Нужен уникальный стиль?</h4>
              <p className="text-sm text-gray-400 mb-4">Мы создадим дизайн-систему под ваше видение.</p>
              <button className="w-full py-2 bg-odin-accent hover:bg-odin-accent/80 text-white rounded-lg transition-colors font-medium text-sm">
                Запросить консультацию
              </button>
            </div>
          </div>

          {/* Окно Превью */}
          <div className="w-full lg:w-2/3 h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-black/50 backdrop-blur-sm">
            {/* Browser Bar */}
            <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block px-3 py-0.5 bg-black/30 rounded text-[10px] text-gray-500 font-mono">
                  odinlab.design/styles
                </div>
              </div>
            </div>

            {/* Содержимое превью с анимацией */}
            <div className="w-full h-[calc(100%-32px)] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStyle}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <MockWebsite currentStyle={currentStyleData} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
