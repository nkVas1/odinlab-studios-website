"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Code, Rocket, BarChart, ChevronRight } from "lucide-react";

const STEPS = [
  { 
    id: 1, 
    title: "Discovery", 
    icon: <Search />, 
    short: "Исследование",
    desc: "Мы погружаемся в вашу нишу. Глубинные интервью, анализ конкурентов и составление CJM (Customer Journey Map). Мы не начинаем рисовать, пока не поймем 'Зачем?'.",
    color: "bg-blue-500"
  },
  { 
    id: 2, 
    title: "Art Direction", 
    icon: <PenTool />, 
    short: "Дизайн-концепция",
    desc: "Создание уникального визуального языка. Мудборды, 3D-скетчи и интерактивные прототипы в Figma. Вы увидите свой продукт еще до написания кода.",
    color: "bg-purple-500"
  },
  { 
    id: 3, 
    title: "Development", 
    icon: <Code />, 
    short: "Разработка",
    desc: "Кодинг на стеке 2025 года (Next.js 15, WebGL). Чистая архитектура, микросервисы и безупречная SEO-оптимизация под капотом.",
    color: "bg-indigo-500"
  },
  { 
    id: 4, 
    title: "Launch", 
    icon: <Rocket />, 
    short: "Запуск",
    desc: "QA-тестирование, нагрузочные тесты и настройка CI/CD. Мягкий запуск и мониторинг первых метрик.",
    color: "bg-orange-500"
  },
  { 
    id: 5, 
    title: "Evolution", 
    icon: <BarChart />, 
    short: "Масштабирование",
    desc: "Продукт живет. Мы анализируем поведение пользователей, внедряем новые фичи и помогаем расти.",
    color: "bg-green-500"
  },
];

export default function ProcessMap() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 md:py-32 bg-odin-dark relative overflow-hidden">
      {/* Фоновый элемент */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Левая колонка: Навигация */}
          <div className="w-full lg:w-1/3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center lg:text-left">
              Как мы <span className="text-odin-gold">работаем</span>
            </h2>
            
            {/* МОБИЛЬНАЯ ВЕРСИЯ: Горизонтальный скролл | ДЕСКТОП: Вертикальные кнопки */}
            <div className="flex lg:flex-col overflow-x-auto pb-4 gap-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 lg:gap-2">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex-shrink-0 w-[80%] lg:w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group snap-center border ${
                    activeStep === step.id 
                      ? "bg-white/10 text-white border-white/20 shadow-lg" 
                      : "text-gray-500 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                       activeStep === step.id ? "bg-odin-gold text-black" : "bg-white/5 text-gray-500"
                    }`}>
                      {step.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="block font-bold text-base md:text-lg truncate">{step.title}</span>
                      <span className="text-xs uppercase tracking-wider opacity-60 block truncate">{step.short}</span>
                    </div>
                  </div>
                  
                  {activeStep === step.id && (
                    <ChevronRight className="w-5 h-5 text-odin-gold hidden lg:block flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Правая колонка: Детализация (Карточка) */}
          <div className="w-full lg:w-2/3 mt-4 lg:mt-0">
             <div className="relative aspect-[4/5] md:aspect-video lg:aspect-[16/9] bg-black/50 border border-white/10 rounded-2xl overflow-hidden p-6 md:p-12 flex flex-col justify-end">
                
                {/* Анимированный фон карточки */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 opacity-20 ${STEPS[activeStep - 1].color} blur-[100px]`}
                  />
                </AnimatePresence>

                {/* Большая цифра (адаптивная) */}
                <div className="absolute top-4 right-4 md:right-8 text-[80px] md:text-[120px] font-display font-bold text-white/5 leading-none select-none">
                  0{activeStep}
                </div>

                {/* Контент */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-4 mb-6 text-odin-gold">
                       {STEPS[activeStep - 1].icon}
                       <span className="text-sm font-mono uppercase tracking-widest">
                         Step {activeStep} / {STEPS.length}
                       </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                      {STEPS[activeStep - 1].title}
                    </h3>
                    
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                      {STEPS[activeStep - 1].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
