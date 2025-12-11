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
    label: "Glass", 
    icon: <Droplets size={20} />,
    desc: "Глассморфизм: прозрачность, размытие фона.",
    vars: { 
      "--bg-page": "linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)", 
      "--bg-card": "rgba(255,255,255,0.2)", 
      "--text-main": "#fff", 
      "--text-sec": "rgba(255,255,255,0.8)", 
      "--accent": "#fff", 
      "--radius": "20px", 
      "--border": "1px solid rgba(255,255,255,0.3)", 
      "--font-h": '"Inter", sans-serif', 
      "--shadow": "0 8px 32px 0 rgba(31,38,135,0.37)", 
      "--btn-shape": "50px", 
      "--layout-gap": "24px", 
      "--texture": "none" 
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
    desc: "Тихая роскошь, антиква, сдержанность.",
    vars: { 
      "--bg-page": "#F5F5F4", 
      "--bg-card": "transparent", 
      "--text-main": "#292524", 
      "--text-sec": "#78716C", 
      "--accent": "#292524", 
      "--radius": "0px", 
      "--border": "1px solid #D6D3D1", 
      "--font-h": '"Times New Roman", serif', 
      "--shadow": "none", 
      "--btn-shape": "0px", 
      "--layout-gap": "40px", 
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
      className="w-full h-full p-4 md:p-8 overflow-y-auto transition-all duration-500"
      style={{
        background: currentStyle.vars["--bg-page"],
        color: currentStyle.vars["--text-main"],
        fontFamily: currentStyle.vars["--font-h"],
        backgroundImage: currentStyle.vars["--texture"] !== 'none' ? currentStyle.vars["--texture"] : 'none'
      } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b pb-4" style={{borderColor: currentStyle.vars["--border"] === 'none' ? 'rgba(0,0,0,0.1)' : currentStyle.vars["--border"]}}>
        <h1 className="text-2xl font-bold">BRAND</h1>
        <button style={{
          background: currentStyle.vars["--accent"],
          color: currentStyle.id === 'y2k' || currentStyle.id === 'cyberpunk' ? 'black' : 'white',
          padding: '8px 16px',
          borderRadius: currentStyle.vars["--btn-shape"],
          border: currentStyle.vars["--border"],
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}>
          Login
        </button>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          className="aspect-square flex items-center justify-center p-8"
          style={{
            background: currentStyle.vars["--bg-card"],
            borderRadius: currentStyle.vars["--radius"],
            border: currentStyle.vars["--border"],
            boxShadow: currentStyle.vars["--shadow"]
          }}
        >
          <div className="text-4xl md:text-5xl font-bold text-center leading-tight">
            DESIGN <br/>
            <span style={{color: currentStyle.vars["--accent"]}}>SYSTEM</span>
          </div>
        </div>
        
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-4xl font-bold">Headline Text</h2>
          <p style={{color: currentStyle.vars["--text-sec"]}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Стиль {currentStyle.label} меняет восприятие этого текста.
          </p>
          <div className="h-2 w-full rounded-full overflow-hidden mt-4" style={{background: 'rgba(0,0,0,0.1)'}}>
            <div className="h-full w-2/3" style={{background: currentStyle.vars["--accent"]}} />
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-12 text-center opacity-50 text-sm" style={{color: currentStyle.vars["--text-sec"]}}>
        POWERED BY ODINLAB
      </div>
    </div>
  )
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
              Матрица <span className="text-odin-gold">Стилей</span>
            </h2>
            <p className="text-odin-muted text-lg">
              Выберите ячейку, чтобы загрузить новую визуальную реальность.
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
