"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutGrid, Sparkles, Feather, Scissors, 
  Minus, Square, Zap, Droplets, PaintBucket 
} from "lucide-react";

// --- 9 СТИЛЕЙ ---
const STYLES = {
  bento: {
    id: "bento", 
    label: "Bento", 
    icon: <LayoutGrid size={20} />,
    desc: "Модульность, скругления, мягкий свет (Apple Style).",
    vars: { 
      "--bg-page": "#F1F5F9", 
      "--bg-card": "#FFFFFF", 
      "--text-main": "#0F172A", 
      "--text-sec": "#64748B", 
      "--accent": "#3B82F6", 
      "--radius": "24px", 
      "--border": "1px solid rgba(0,0,0,0.04)", 
      "--font-h": '"Inter", sans-serif', 
      "--shadow": "0 20px 40px -10px rgba(0,0,0,0.08)", 
      "--btn-shape": "12px", 
      "--layout-gap": "24px", 
      "--texture": "none" 
    }
  },
  minimal: {
    id: "minimal", 
    label: "Minimal", 
    icon: <Minus size={20} />,
    desc: "Чистота, много воздуха, фокус на сути.",
    vars: { 
      "--bg-page": "#ffffff", 
      "--bg-card": "transparent", 
      "--text-main": "#000", 
      "--text-sec": "#666", 
      "--accent": "#000", 
      "--radius": "0px", 
      "--border": "none", 
      "--font-h": '"Inter", sans-serif', 
      "--shadow": "none", 
      "--btn-shape": "0px", 
      "--layout-gap": "40px", 
      "--texture": "none" 
    }
  },
  neobrutal: {
    id: "neobrutal", 
    label: "Neo-Brutal", 
    icon: <Square size={20} />,
    desc: "Смелость, жесткие тени, необработанные края.",
    vars: { 
      "--bg-page": "#FFE4E6", 
      "--bg-card": "#fff", 
      "--text-main": "#000", 
      "--text-sec": "#333", 
      "--accent": "#F43F5E", 
      "--radius": "0px", 
      "--border": "3px solid #000", 
      "--font-h": '"Space Grotesk", sans-serif', 
      "--shadow": "6px 6px 0px 0px #000", 
      "--btn-shape": "0px", 
      "--layout-gap": "20px", 
      "--texture": "none" 
    }
  },
  cyberpunk: {
    id: "cyberpunk", 
    label: "Cyberpunk", 
    icon: <Zap size={20} />,
    desc: "Неон, темная тема, глитч, хай-тек.",
    vars: { 
      "--bg-page": "#050505", 
      "--bg-card": "#111", 
      "--text-main": "#0ff", 
      "--text-sec": "#f0f", 
      "--accent": "#f00", 
      "--radius": "2px", 
      "--border": "1px solid #0ff", 
      "--font-h": '"JetBrains Mono", monospace', 
      "--shadow": "0 0 10px rgba(0,255,255,0.3)", 
      "--btn-shape": "0px", 
      "--layout-gap": "16px", 
      "--texture": "none" 
    }
  },
  glass: {
    id: "glass", 
    label: "Glassmorphism", 
    icon: <Droplets size={20} />,
    desc: "Прозрачность, глубина, премиальный 'Frosted Glass' эффект.",
    vars: { 
      // Градиент "Aurora" из ранней версии
      "--bg-page": "radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%), #1a1a1a",
      
      // Настоящее матовое стекло (белый с малой непрозрачностью)
      "--bg-card": "rgba(255, 255, 255, 0.1)", 
      
      "--text-main": "#ffffff",
      "--text-sec": "rgba(255, 255, 255, 0.7)",
      "--accent": "rgba(255, 255, 255, 0.2)",
      "--radius": "24px", 
      
      // Тонкая белая обводка для контура стекла
      "--border": "1px solid rgba(255, 255, 255, 0.15)", 
      
      "--font-h": '"Inter", sans-serif', 
      
      // Тень для отрыва от фона
      "--shadow": "0 8px 32px 0 rgba(0, 0, 0, 0.37)", 
      
      "--btn-shape": "50px", 
      "--layout-gap": "24px", 
      "--texture": "none",
      
      // Сильное размытие фона
      "--backdrop": "blur(20px) saturate(150%)" 
    }
  },
  y2k: {
    id: "y2k", 
    label: "Y2K / Acid", 
    icon: <Sparkles size={20} />,
    desc: "Ностальгия по 2000-м, кислотные цвета.",
    vars: { 
      "--bg-page": "#000", 
      "--bg-card": "#1a1a1a", 
      "--text-main": "#D4FF00", 
      "--text-sec": "#FF00E5", 
      "--accent": "#D4FF00", 
      "--radius": "0px", 
      "--border": "2px solid #D4FF00", 
      "--font-h": '"JetBrains Mono", monospace', 
      "--shadow": "4px 4px 0px 0px #FF00E5", 
      "--btn-shape": "0px", 
      "--layout-gap": "16px", 
      "--texture": "url('/noise.png')" 
    }
  },
  luxury: {
    id: "luxury", 
    label: "Old Money", 
    icon: <Feather size={20} />,
    desc: "Журнальная верстка, антиква, подлинная роскошь минимализма.",
    vars: { 
      // Благородный "яичной скорлупы" (off-white)
      "--bg-page": "#F9F8F6", 
      "--bg-card": "transparent",
      
      // Глубокий, почти чёрный зелёный (Racing Green)
      "--text-main": "#1A1C19", 
      "--text-sec": "#52524E",
      
      // Бронза вместо жёлтого золота
      "--accent": "#8C7B6C", 
      
      "--radius": "0px", 
      
      // Отсутствие явных границ
      "--border": "none", 
      
      // Serif шрифты обязательны
      "--font-h": '"Playfair Display", "Times New Roman", serif', 
      "--shadow": "none", 
      "--btn-shape": "0px", 
      "--layout-gap": "60px", // Очень большие отступы (воздух)
      
      // Нет текстур, чистота
      "--texture": "none" 
    }
  },
  paper: {
    id: "paper", 
    label: "Papercut", 
    icon: <Scissors size={20} />,
    desc: "Эффект бумаги, коллажи, тактильность.",
    vars: { 
      "--bg-page": "#FFFBEB", 
      "--bg-card": "#fff", 
      "--text-main": "#292524", 
      "--text-sec": "#444", 
      "--accent": "#F59E0B", 
      "--radius": "2px", 
      "--border": "2px solid #292524", 
      "--font-h": '"Comic Sans MS", sans-serif', 
      "--shadow": "3px 3px 0px 0px rgba(0,0,0,0.1)", 
      "--btn-shape": "255px 15px 225px 15px / 15px 225px 15px 255px", 
      "--layout-gap": "32px", 
      "--texture": "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)" 
    }
  },
  grunge: {
    id: "grunge", 
    label: "Grunge", 
    icon: <PaintBucket size={20} />,
    desc: "Бунтарство, потертости, текстуры, гранж 90-х.",
    vars: { 
      "--bg-page": "#2e2e2e", 
      "--bg-card": "#3e3e3e", 
      "--text-main": "#dcdcdc", 
      "--text-sec": "#a9a9a9", 
      "--accent": "#d9534f", 
      "--radius": "0px", 
      "--border": "2px dashed #666", 
      "--font-h": '"Courier New", monospace', 
      "--shadow": "5px 5px 10px rgba(0,0,0,0.5)", 
      "--btn-shape": "2px", 
      "--layout-gap": "20px", 
      "--texture": "url('https://www.transparenttextures.com/patterns/concrete-wall.png')" 
    }
  }
};

type StyleKey = keyof typeof STYLES;

// MockWebsite компонент
const MockWebsite = ({ currentStyle }: { currentStyle: any }) => {
  return (
    <div 
      className="w-full h-full overflow-y-auto transition-all duration-500 relative"
      style={{
        background: currentStyle.vars["--bg-page"],
        color: currentStyle.vars["--text-main"],
        fontFamily: currentStyle.vars["--font-h"],
        backgroundImage: currentStyle.vars["--texture"] !== 'none' ? currentStyle.vars["--texture"] : undefined
      } as React.CSSProperties}
    >
      {/* Декоративные пятна для Glassmorphism (видны только на прозрачных фонах) */}
      {currentStyle.id === 'glass' && (
         <>
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/30 blur-[80px]" />
           <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/30 blur-[80px]" />
         </>
      )}

      <div className="relative z-10 p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <header className={`flex items-center transition-all ${currentStyle.id === 'luxury' ? 'flex-col gap-6 justify-center text-center' : 'justify-between'}`}>
          <div className={`font-bold tracking-tighter flex items-center gap-2 ${currentStyle.id === 'luxury' ? 'flex-col text-4xl tracking-widest uppercase border-b pb-4 border-current w-full' : 'text-2xl'}`}>
            {currentStyle.id === 'luxury' ? (
              <>
                <span>ODIN</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: currentStyle.vars["--accent"], color: currentStyle.id === 'y2k' ? 'black' : 'white' }}>O</div>
                <span>ODIN<span style={{opacity: 0.6}}>UI</span></span>
              </>
            )}
          </div>

          {/* Навигация */}
          <nav className={`hidden md:flex gap-6 text-sm font-medium opacity-70 ${currentStyle.id === 'luxury' ? 'uppercase tracking-[0.2em] text-xs' : ''}`}>
            <span>{currentStyle.id === 'luxury' ? 'Collection' : 'Product'}</span>
            <span>{currentStyle.id === 'luxury' ? 'Maison' : 'Solutions'}</span>
            <span>Contact</span>
          </nav>

          {/* Кнопка (скрываем для Luxury) */}
          {currentStyle.id !== 'luxury' && (
            <button 
              style={{
                background: currentStyle.vars["--accent"],
                color: currentStyle.id === 'y2k' || currentStyle.id === 'cyberpunk' ? 'black' : 'white',
                borderRadius: currentStyle.vars["--btn-shape"],
                border: currentStyle.vars["--border"],
                boxShadow: currentStyle.vars["--shadow"],
                padding: '10px 24px',
                fontWeight: 'bold',
                backdropFilter: currentStyle.vars["--backdrop"] || 'none'
              } as React.CSSProperties}
            >
              Start Free
            </button>
          )}
        </header>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-4">
          <div className="space-y-6">
             <div 
               className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest mb-2"
               style={{ 
                 background: currentStyle.vars["--bg-card"], 
                 border: currentStyle.vars["--border"],
                 borderRadius: currentStyle.vars["--btn-shape"],
                 backdropFilter: currentStyle.vars["--backdrop"] || 'none'
               } as React.CSSProperties}
             >
               v2.0 Released
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold leading-[0.95]">
               Design <br/>
               <span style={{ 
                 color: currentStyle.id === 'paper' ? 'inherit' : currentStyle.vars["--accent"],
                 textDecoration: currentStyle.id === 'paper' ? 'underline decoration-wavy' : 'none'
               }}>
                 Reality
               </span>
             </h1>
             
             <p className="text-lg leading-relaxed max-w-md" style={{ color: currentStyle.vars["--text-sec"] }}>
               Создавайте интерфейсы будущего сегодня. Адаптивность, доступность и красота в каждой строчке кода.
             </p>

             <div className="flex gap-4 pt-4">
                <button 
                   className="flex-1 py-4 text-center font-bold text-lg hover:brightness-110 transition-all"
                   style={{
                     background: currentStyle.vars["--text-main"],
                     color: currentStyle.vars["--bg-page"].includes('gradient') ? 'black' : currentStyle.vars["--bg-page"],
                     borderRadius: currentStyle.vars["--btn-shape"],
                     boxShadow: currentStyle.vars["--shadow"]
                   } as React.CSSProperties}
                >
                  Get Started
                </button>
                <button 
                   className="flex-1 py-4 text-center font-bold text-lg border hover:bg-black/5 transition-all"
                   style={{
                     borderColor: currentStyle.vars["--text-main"],
                     borderRadius: currentStyle.vars["--btn-shape"]
                   } as React.CSSProperties}
                >
                  Demo
                </button>
             </div>
          </div>

          {/* Feature Card (Visual) */}
          <div 
            className="aspect-square relative flex items-center justify-center p-8 group"
            style={{
              background: currentStyle.vars["--bg-card"],
              borderRadius: currentStyle.vars["--radius"],
              border: currentStyle.vars["--border"],
              boxShadow: currentStyle.vars["--shadow"],
              backdropFilter: currentStyle.vars["--backdrop"] || 'none'
            } as React.CSSProperties}
          >
             {/* Abstract Shapes */}
             <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-current opacity-10 rounded-full animate-pulse" style={{ color: currentStyle.vars["--accent"] }} />
                <div className="absolute top-1/4 right-1/4 w-16 h-16 border-4 border-current opacity-20 rounded-full" style={{ color: currentStyle.vars["--accent"] }} />
             </div>
             
             <div className="relative z-10 text-center">
                <div className="text-6xl mb-2">✨</div>
                <div className="text-2xl font-bold">Magic UI</div>
                <div className="text-sm opacity-60">Component Library</div>
             </div>
          </div>
        </div>

        {/* Stats / Grid Section */}
        <div 
          className="grid grid-cols-3 gap-4 md:gap-8" 
          style={{ gap: currentStyle.vars["--layout-gap"] }}
        >
           {[
             { label: 'Users', val: '10K+' },
             { label: 'Revenue', val: '$2M' },
             { label: 'Rating', val: '4.9' }
           ].map((stat, i) => (
             <div 
               key={i} 
               className="p-6 text-center"
               style={{
                  background: currentStyle.vars["--bg-card"],
                  borderRadius: currentStyle.vars["--radius"],
                  border: currentStyle.vars["--border"],
                  backdropFilter: currentStyle.vars["--backdrop"] || 'none'
               } as React.CSSProperties}
             >
                <div className="text-3xl font-bold mb-1" style={{ color: currentStyle.vars["--accent"] }}>{stat.val}</div>
                <div className="text-xs uppercase tracking-wider opacity-60">{stat.label}</div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default function StyleShowcase() {
  const [activeStyle, setActiveStyle] = useState<StyleKey>("bento");
  const [hoveredStyle, setHoveredStyle] = useState<StyleKey | null>(null);

  return (
    <section className="py-24 bg-odin-dark relative overflow-hidden" id="showcase">
      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Левая часть: Описание + Компактное Меню */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Какой <span className="text-odin-gold">стиль</span> подходит вам?
            </h2>
            <p className="text-odin-muted text-lg leading-relaxed">
              Дизайн — это язык. Выберите диалект, на котором ваш бренд будет говорить с аудиторией. 
              Кликайте по стилям ниже, чтобы увидеть мгновенное преображение.
            </p>
          </div>

          {/* Компактный Грид Кнопок (3x3) */}
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(STYLES).map(([key, style]) => (
              <div key={key} className="relative group">
                <button
                  onClick={() => setActiveStyle(key as StyleKey)}
                  onMouseEnter={() => setHoveredStyle(key as StyleKey)}
                  onMouseLeave={() => setHoveredStyle(null)}
                  className={`w-full aspect-square flex items-center justify-center rounded-xl border transition-all duration-300 ${
                    activeStyle === key 
                      ? "bg-odin-gold text-black border-odin-gold shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105" 
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/30"
                  }`}
                >
                  {style.icon}
                </button>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredStyle === key && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-black/90 backdrop-blur border border-white/20 rounded-lg z-20 pointer-events-none"
                    >
                      <div className="text-white font-bold text-sm mb-1">{style.label}</div>
                      <div className="text-xs text-gray-400 leading-tight">{style.desc}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="text-xs uppercase tracking-widest text-odin-muted mb-2">Активный стиль</div>
            <div className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              {STYLES[activeStyle].icon}
              {STYLES[activeStyle].label}
            </div>
            <div className="text-sm text-gray-400">
              {STYLES[activeStyle].desc}
            </div>
          </div>
        </div>

        {/* Правая часть: Окно Сайта */}
        <div className="w-full lg:w-2/3 h-[500px] md:h-[600px] bg-black rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStyle}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <MockWebsite currentStyle={STYLES[activeStyle]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
