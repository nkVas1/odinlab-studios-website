"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  { 
    id: 1, 
    text: "OdinLab перевернули наше представление о том, каким может быть корпоративный сайт. Это искусство, а не просто верстка.", 
    author: "Алексей М.", 
    company: "FinTech Corp", 
    role: "CTO"
  },
  { 
    id: 2, 
    text: "Безупречная работа с 3D-графикой. Наш продукт теперь выглядит на миллион долларов. ROI в первый месяц превзошел ожидания.", 
    author: "Sarah Connor", 
    company: "CyberDyne Systems", 
    role: "CEO"
  },
  { 
    id: 3, 
    text: "Скорость и креативность на высоте. Ребята понимают тренды раньше, чем они появляются. Работать с ними — одно удовольствие.", 
    author: "Директор Маркетинга", 
    company: "Fashion Brand", 
    role: "CMO"
  },
  { 
    id: 4, 
    text: "Интерфейс, который они создали, повысил конверсию на 40%. Цифры говорят сами за себя. Это лучшие разработчики из всех, что мы встречали.", 
    author: "Иван Петров", 
    company: "E-commerce Giant", 
    role: "Product Lead"
  },
  { 
    id: 5, 
    text: "Редкий случай, когда разработчики слышат бизнес-задачи, а не просто пишут код. Профессионализм высочайшего уровня.", 
    author: "Founder", 
    company: "Startup X", 
    role: "Founder"
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Параллакс эффекты для колонок (едят в разные стороны)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-32 bg-odin-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Доверие <span className="text-odin-gold">Лидеров</span> Индустрии
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Компании, которые изменили свою траекторию благодаря нашей работе
          </p>
        </div>

        {/* Контейнер с маской для параллакса */}
        <div 
          className="relative h-[600px] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 absolute w-full">
            
            {/* Колонка 1 (Едет вверх) */}
            <motion.div style={{ y: y1 }} className="space-y-8">
              {REVIEWS.filter((_, i) => i % 2 === 0).map((review) => (
                <motion.div 
                  key={review.id} 
                  className="p-8 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all group"
                  whileHover={{ y: -4 }}
                >
                  {/* Звёзды */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-odin-gold text-odin-gold" />
                    ))}
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-lg text-gray-300 mb-6 font-medium leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Автор */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-odin-gold/40 to-odin-gold/20 flex items-center justify-center text-odin-gold font-bold text-lg">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{review.author}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider">{review.role}</div>
                      <div className="text-gray-600 text-xs">{review.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Колонка 2 (Едет вниз) */}
            <motion.div style={{ y: y2 }} className="space-y-8 mt-8 md:mt-0">
              {REVIEWS.filter((_, i) => i % 2 !== 0).map((review) => (
                <motion.div 
                  key={review.id} 
                  className="p-8 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all group"
                  whileHover={{ y: -4 }}
                >
                  {/* Звёзды */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-blue-400 text-blue-400" />
                    ))}
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-lg text-gray-300 mb-6 font-medium leading-relaxed">
                    "{review.text}"
                  </p>

                  {/* Автор */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-400/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{review.author}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider">{review.role}</div>
                      <div className="text-gray-600 text-xs">{review.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* CTA блок */}
        <div className="text-center mt-32">
          <p className="text-gray-400 mb-6 text-lg">
            Присоединяйтесь к компаниям, которые выбирают качество
          </p>
          <motion.button 
            className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-odin-gold transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Начать проект
          </motion.button>
        </div>

      </div>
    </section>
  );
}
