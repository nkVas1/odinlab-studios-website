"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Box, Coffee } from "lucide-react";

// --- 1. Определение Стилей (Пресеты) ---
const STYLES = {
  minimal: {
    name: "Minimalism",
    label: "Минимализм",
    desc: "Чистота, воздух, фокус на контенте.",
    vars: {
      "--bg": "#ffffff",
      "--text": "#1a1a1a",
      "--accent": "#1a1a1a",
      "--surface": "#f5f5f5",
      "--border": "none",
      "--radius": "0px",
      "--font-h": '"Inter", sans-serif',
      "--font-p": '"Inter", sans-serif',
      "--shadow": "none",
      "--btn-radius": "0px",
      "--backdrop": "none",
      "--clip-path": "none",
    },
  },
  neobrutalism: {
    name: "Neo-Brutalism",
    label: "Нео-Брутализм",
    desc: "Смелость, контраст, сырой дизайн.",
    vars: {
      "--bg": "#FFDEE9",
      "--text": "#000000",
      "--accent": "#FF4D4D",
      "--surface": "#FFFFFF",
      "--border": "3px solid #000000",
      "--radius": "0px",
      "--font-h": '"Space Grotesk", sans-serif',
      "--font-p": '"Space Grotesk", sans-serif',
      "--shadow": "5px 5px 0px 0px #000000",
      "--btn-radius": "0px",
      "--backdrop": "none",
      "--clip-path": "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)",
    },
  },
  cyberpunk: {
    name: "Cyberpunk",
    label: "Киберпанк",
    desc: "Неон, темный режим, глитч-эффекты.",
    vars: {
      "--bg": "#050A14",
      "--text": "#00F0FF",
      "--accent": "#FF003C",
      "--surface": "rgba(0, 240, 255, 0.1)",
      "--border": "1px solid #00F0FF",
      "--radius": "0px",
      "--font-h": '"JetBrains Mono", monospace',
      "--font-p": '"JetBrains Mono", monospace',
      "--shadow": "0 0 10px rgba(0, 240, 255, 0.5)",
      "--btn-radius": "0px",
      "--backdrop": "none",
      "--clip-path": "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)",
    },
  },
  glassmorphism: {
    name: "Glassmorphism",
    label: "Глассморфизм",
    desc: "Прозрачность, размытие, глубина.",
    vars: {
      "--bg": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "--text": "#ffffff",
      "--accent": "rgba(255, 255, 255, 0.3)",
      "--surface": "rgba(255, 255, 255, 0.1)",
      "--border": "1px solid rgba(255, 255, 255, 0.2)",
      "--radius": "24px",
      "--font-h": '"Inter", sans-serif',
      "--font-p": '"Inter", sans-serif',
      "--shadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      "--btn-radius": "50px",
      "--backdrop": "blur(10px)",
      "--clip-path": "none",
    },
  },
  corporate: {
    name: "Corporate",
    label: "Корпоративный",
    desc: "Надежность, структура, спокойствие.",
    vars: {
      "--bg": "#F8FAFC",
      "--text": "#334155",
      "--accent": "#0F172A",
      "--surface": "#FFFFFF",
      "--border": "1px solid #E2E8F0",
      "--radius": "8px",
      "--font-h": '"Inter", sans-serif',
      "--font-p": '"Inter", sans-serif',
      "--shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      "--btn-radius": "6px",
      "--backdrop": "none",
      "--clip-path": "none",
    },
  },
};

type StyleKey = keyof typeof STYLES;

// --- 2. Мини-Сайт (Контент) ---
const MockWebsite = ({ currentStyle }: { currentStyle: (typeof STYLES)[StyleKey] }) => {
  const bgValue = currentStyle.vars["--bg"] as string;
  const isBg = bgValue.includes("linear-gradient");

  return (
    <div
      className="w-full h-full p-8 transition-all duration-500 overflow-y-auto"
      style={{
        background: isBg ? bgValue : (currentStyle.vars["--bg"] as string),
        color: currentStyle.vars["--text"],
        fontFamily: currentStyle.vars["--font-p"],
      } as React.CSSProperties}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <div className="font-bold text-2xl tracking-tighter" style={{ fontFamily: currentStyle.vars["--font-h"] }}>
          COFFEE<span style={{ color: currentStyle.vars["--accent"] }}>.IO</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm opacity-80">
          <span>Продукты</span>
          <span>История</span>
          <span>Контакты</span>
        </nav>
        <button
          style={{
            background: currentStyle.vars["--accent"] as string,
            color: bgValue === "#ffffff" ? "#000" : "#fff",
            border: currentStyle.vars["--border"] as string,
            borderRadius: currentStyle.vars["--btn-radius"] as string,
            boxShadow: currentStyle.vars["--shadow"] as string,
            padding: "0.5rem 1.5rem",
            clipPath: currentStyle.vars["--clip-path"] as string,
          } as React.CSSProperties}
          className="font-bold transition-transform hover:scale-105"
        >
          Купить
        </button>
      </header>

      {/* Hero Content */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div
            className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest"
            style={{
              background: currentStyle.vars["--surface"] as string,
              border: currentStyle.vars["--border"] as string,
              borderRadius: currentStyle.vars["--btn-radius"] as string,
              backdropFilter: currentStyle.vars["--backdrop"] as string,
            } as React.CSSProperties}
          >
            Новый вкус 2025
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ fontFamily: currentStyle.vars["--font-h"] }}
          >
            Энергия <br />
            <span style={{ color: currentStyle.vars["--accent"] }}>Будущего</span>
          </h1>

          <p className="opacity-80 text-lg leading-relaxed max-w-md">
            Мы переизобрели кофе. Квантовая обжарка, нано-помол и абсолютно новый уровень бодрости для ваших идей.
          </p>

          <div className="flex gap-4 pt-4">
            <button
              style={{
                background: currentStyle.vars["--text"] as string,
                color: bgValue === "#ffffff" ? "#fff" : "#000",
                border: currentStyle.vars["--border"] as string,
                borderRadius: currentStyle.vars["--btn-radius"] as string,
                boxShadow: currentStyle.vars["--shadow"] as string,
                padding: "1rem 2rem",
                clipPath: currentStyle.vars["--clip-path"] as string,
              } as React.CSSProperties}
              className="font-bold"
            >
              Попробовать
            </button>
            <button
              style={{
                background: "transparent",
                color: currentStyle.vars["--text"] as string,
                border:
                  (currentStyle.vars["--border"] as string) === "none"
                    ? `1px solid ${currentStyle.vars["--text"]}`
                    : (currentStyle.vars["--border"] as string),
                borderRadius: currentStyle.vars["--btn-radius"] as string,
                padding: "1rem 2rem",
                clipPath: currentStyle.vars["--clip-path"] as string,
              } as React.CSSProperties}
              className="font-bold opacity-80"
            >
              Подробнее
            </button>
          </div>
        </div>

        {/* Hero Image / Card */}
        <div className="flex-1 w-full">
          <div
            className="aspect-square w-full relative flex items-center justify-center"
            style={{
              background: currentStyle.vars["--surface"] as string,
              border: currentStyle.vars["--border"] as string,
              borderRadius: currentStyle.vars["--radius"] as string,
              boxShadow: currentStyle.vars["--shadow"] as string,
              backdropFilter: currentStyle.vars["--backdrop"] as string,
            } as React.CSSProperties}
          >
            <Coffee size={120} strokeWidth={1} style={{ color: currentStyle.vars["--accent"] }} />

            {/* Декоративные элементы */}
            <div className="absolute top-4 right-4 text-xs font-mono opacity-50">#A1-F9</div>
            {currentStyle.name === "Cyberpunk" && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6"
            style={{
              background: currentStyle.vars["--surface"] as string,
              border: currentStyle.vars["--border"] as string,
              borderRadius: currentStyle.vars["--radius"] as string,
              backdropFilter: currentStyle.vars["--backdrop"] as string,
            } as React.CSSProperties}
          >
            <div className="mb-4 opacity-50">
              <Zap size={24} />
            </div>
            <h3 className="font-bold mb-2">Особенность {i}</h3>
            <p className="text-sm opacity-70">Краткое описание уникального преимущества продукта в выбранном стиле.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 3. Основной Компонент (Обертка) ---
export default function StyleShowcase() {
  const [activeStyle, setActiveStyle] = useState<StyleKey>("minimal");

  return (
    <section className="py-24 bg-odin-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Заголовок Блока */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Какой <span className="text-odin-gold">стиль</span> подходит вам?
          </h2>
          <p className="text-odin-muted text-lg max-w-2xl mx-auto">
            Дизайн — это язык. Выберите диалект, на котором ваш бренд будет говорить с аудиторией. Кликайте по стилям
            ниже, чтобы увидеть мгновенное преображение.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Панель Управления (Слева/Сверху) */}
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
                  className={`mr-4 p-2 rounded-lg ${activeStyle === key ? "bg-odin-gold text-black" : "bg-white/10 text-white"}`}
                >
                  <Box size={20} />
                </div>
                <div className="text-left">
                  <h3 className={`font-bold ${activeStyle === key ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                    {style.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{style.desc}</p>
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
              <h4 className="text-white font-bold mb-2">Не нашли свой стиль?</h4>
              <p className="text-sm text-gray-400 mb-4">
                Мы разработаем уникальную дизайн-систему специально под ваши задачи.
              </p>
              <button className="w-full py-2 bg-odin-accent hover:bg-odin-accent/80 text-white rounded-lg transition-colors font-medium">
                Заказать дизайн
              </button>
            </div>
          </div>

          {/* Окно Превью (Справа/Снизу) */}
          <div className="w-full lg:w-2/3 h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-black/50 backdrop-blur-sm">
            {/* Browser Bar (Декорация) */}
            <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block px-3 py-0.5 bg-black/30 rounded text-[10px] text-gray-500 font-mono">
                  example.com/preview
                </div>
              </div>
            </div>

            {/* Само Превью с Анимацией перехода */}
            <div className="w-full h-[calc(100%-32px)] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStyle}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <MockWebsite currentStyle={STYLES[activeStyle]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
