# OdinLab Studios Website - Документация Дизайна

## 🎨 Промпты Flux для генерации изображений

Все изображения генерируются с помощью Flux AI. Приложенные промпты являются рекомендуемыми шаблонами для создания виз контента.

### 1. Hero Section - Главный визуал

**Файл:** `public/images/hero-main-visual.png`
**Размер:** 1920x1080px
**Промпт:**
```
Abstract futuristic 3D geometric composition, floating crystalline structures, 
deep blue and amber gradient, holographic effects, particle systems, cinematic 
lighting, ultra detailed, 8k quality, professional studio photography, 
cyberpunk aesthetic
```

### 2. About Section - О компании

**Файл:** `public/images/about-studio-artwork.png`
**Размер:** 1600x900px
**Промпт:**
```
Modern creative studio workspace, minimalist aesthetic, floating digital screens, 
abstract data visualization, isometric perspective, deep navy and golden yellow 
accents, ambient occlusion, Blender 3D style, ultra realistic
```

### 3. Service - Web Development

**Файл:** `public/images/service-development.png`
**Размер:** 800x800px
**Промпт:**
```
Futuristic code visualization, 3D matrix of programming symbols, glowing nodes 
connected by light beams, cyberpunk aesthetic, holographic terminals, deep blue 
background with golden highlights, abstract tech visualization
```

### 4. Service - Design

**Файл:** `public/images/service-design.png`
**Размер:** 800x800px
**Промпт:**
```
Abstract representation of creative design process, fluid shapes morphing, neon 
wireframes, UI/UX elements floating in space, gradient mesh, contemporary digital 
art, electric blue and amber, organic geometry
```

### 5. Service - Marketing

**Файл:** `public/images/service-marketing.png`
**Размер:** 800x800px
**Промпт:**
```
Abstract data analytics visualization, growth charts transforming into organic 
shapes, social media icons as 3D objects, dynamic composition, modern infographic 
style, gradient color scheme, blue and gold theme
```

### 6. Production Division

**Файл:** `public/images/production-division.png`
**Размер:** 1400x700px
**Промпт:**
```
Cinematic production scene, virtual film studio, 3D cameras floating, light rays, 
film reel elements, professional color grading, dramatic lighting, ultra-wide 
angle, Hollywood aesthetic, noir lighting
```

### 7. Games Division

**Файл:** `public/images/games-division.png`
**Размер:** 1400x700px
**Промпт:**
```
Epic gaming universe visualization, abstract game controller elements, particle 
effects, dynamic action poses implied through geometry, neon accents, explosive 
energy, AAA game art style, Unreal Engine 5 quality
```

### 8. Team - Коллаборация

**Файл:** `public/images/team-abstract.png`
**Размер:** 1200x600px
**Промпт:**
```
Abstract representation of collaboration, interconnected nodes forming human 
silhouettes, network visualization, warm and cool color harmony, depth of field, 
premium corporate art, minimal style
```

### 9. Tech Stack Визуализация

**Файл:** `public/images/tech-stack-visual.png`
**Размер:** 1600x400px
**Промпт:**
```
Floating technology icons as 3D objects, code symbols, geometric patterns, 
orbiting elements, space theme, glass morphism, modern tech illustration, 
dark blue background with gold accents
```

### 10. Background Pattern

**Файл:** `public/images/bg-pattern.png`
**Размер:** 2400x1200px
**Промпт:**
```
Subtle geometric grid pattern, hexagonal mesh, barely visible depth, dark navy 
blue base, minimal contrast, tileable texture, professional web background, 
ultra subtle
```

## 🎨 Цветовая палитра

### Основные цвета

```
Primary Dark: #050A14 (RGB: 5, 10, 20)
Primary Blue: #0A1628 (RGB: 10, 22, 40)
Accent Blue: #1E3A8A (RGB: 30, 58, 138)
Gold/Amber: #FBBF24 (RGB: 251, 191, 36)
Text Light: #E2E8F0 (RGB: 226, 232, 240)
Text Muted: #64748B (RGB: 100, 116, 139)
```

### Использование в Figma/Adobe XD

```
Dark Mode Primary: #050A14
Dark Mode Secondary: #0A1628
Accent Primary: #FBBF24
Accent Secondary: #1E3A8A
Text Primary: #E2E8F0
Text Secondary: #64748B
```

## 🔤 Типографика

### Основные шрифты

**Заголовки (H1, H2, H3):**
- Название: Space Grotesk
- Вес: 700, 800, 900
- Размер: 32px - 96px
- Высота строки: 0.8 - 0.9

**Подзаголовки и текст:**
- Название: Inter
- Вес: 400, 500, 600
- Размер: 16px - 28px
- Высота строки: 1.4 - 1.6

**Монопространство (коды, детали):**
- Название: JetBrains Mono
- Вес: 400, 600
- Размер: 12px - 16px
- Высота строки: 1.5

## 🎬 Анимации

### Scroll-Triggered (GSAP ScrollTrigger)

1. **Hero Section:**
   - Fade in с parallax при scroll
   - Морфинг 3D объекта
   - Duration: 1.5s, Ease: power4.out

2. **Services Section:**
   - Горизонтальный скролл
   - Pin trigger на секцию
   - Translate: -300vw
   - Duration: 3000px scroll

3. **Contact Section:**
   - Fade in и slide up
   - Trigger: top 80%
   - Duration: 1s

### Hover Effects

- Buttons: Scale 1.05, shadow expansion
- Links: Color change to gold
- Cards: 3D transform rotation

## 📱 Responsive Design

### Breakpoints

```
xs: 0px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Mobile Optimization

- Hero text: 12vw → 8vw (mobile)
- Section padding: 24px (mobile) → 96px (desktop)
- Grid: 1 column (mobile) → 2-4 columns (desktop)

## 🔍 SEO Assets

### Meta Images

**OG Image:**
- Размер: 1200x630px
- Файл: `public/og-image.jpg`
- Содержит: Логотип, название, основной цвет

**Twitter Card:**
- Размер: 1200x675px
- Файл: `public/twitter-image.jpg`

## 📐 Grid и Layout

### Сетка (Tailwind)

```
Container: 1200px
Gutter: 24px
Columns: 12
Gap: 24px (mobile) - 48px (desktop)
```

### Spacing Scale

```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
```

## 🎯 Ключевые требования дизайна

1. **Киберпанк-эстетика с минимализмом**
   - Контрастные цвета
   - Геометрические формы
   - Минимум текста, максимум визуала

2. **Движение везде**
   - Ничего статичного
   - Микроанимации при hover
   - Scroll-triggered эффекты

3. **Читаемость на первом месте**
   - Контраст текста ≥ 7:1
   - Размер шрифта ≥ 16px
   - Line-height ≥ 1.4

4. **Performance-focused**
   - WebP изображения
   - Lazy loading
   - Минимум 60fps анимаций

---

**Дата обновления:** 11 декабря 2025
**Версия:** 1.0
