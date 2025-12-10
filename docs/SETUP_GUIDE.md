# OdinLab Studios - Setup & Installation Guide

## 📋 Предварительные требования

- **Node.js**: 18.17.0 или выше
- **npm**: 9.0 или выше (или yarn/pnpm)
- **Git**: 2.35 или выше
- **Свободное место на диске**: минимум 2GB

## 🚀 Локальная установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/nkVas1/odinlab-studios-website.git
cd odinlab-studios-website
```

### 2. Установка зависимостей

```bash
# С использованием npm (рекомендуется)
npm install

# Или с yarn
yarn install

# Или с pnpm (самый быстрый)
pnpm install
```

Время установки: 2-5 минут в зависимости от скорости интернета.

### 3. Настройка окружения (опционально)

Создайте файл `.env.local` в корне проекта для переменных окружения:

```bash
# Copy example
cp .env.example .env.local
```

Содержимое `.env.local`:

```bash
# API endpoints (если используются)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Analytics IDs (опционально)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# Другие переменные по мере необходимости
```

### 4. Запуск локального сервера разработки

```bash
npm run dev
```

Сайт будет доступен по адресу: **http://localhost:3000**

Сервер автоматически перезагружается при изменении файлов (Hot Reload).

## 🏗 Production сборка

### Создание оптимизированной сборки

```bash
# Создание production билда
npm run build

# Проверка размера сборки
npm run analyze  # если добавите analyzer

# Локальный тест production сборки
npm run start
```

Сайт будет работать на: **http://localhost:3000** в production режиме.

## 🌐 Деплой на Vercel

### Способ 1: Через GitHub (рекомендуется)

1. **Сделайте push в GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: OdinLab Studios website"
   git push origin main
   ```

2. **Подключите Vercel к GitHub**
   - Перейдите на https://vercel.com
   - Нажмите "Import Project"
   - Выберите ваш GitHub репозиторий
   - Нажмите "Import"

3. **Настройка окружения на Vercel**
   - В разделе "Environment Variables" добавьте переменные из `.env.local` (если есть)
   - Нажмите "Deploy"

4. **Автоматический деплой**
   - Теперь каждый push в `main` ветку автоматически развернет сайт
   - Vercel создаст Preview URL для Pull Requests

### Способ 2: Через Vercel CLI

```bash
# Установка Vercel CLI
npm i -g vercel

# Логин в Vercel
vercel login

# Deploy в production
vercel --prod

# Деплой в preview
vercel
```

### Способ 3: Docker (альтернатива)

```bash
# Создание Docker образа
docker build -t odinlab-studio .

# Запуск контейнера локально
docker run -p 3000:3000 odinlab-studio

# Push на Docker Hub / Registery
docker tag odinlab-studio your-registry/odinlab-studio
docker push your-registry/odinlab-studio
```

## 📊 Структура проекта после установки

```
odinlab-studios-website/
├── .next/                     # Build output (auto-generated)
├── node_modules/              # Dependencies (auto-installed)
├── app/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── globals.css           # Global styles
│   └── api/                  # API routes
├── components/
│   ├── canvas/               # 3D components
│   ├── sections/             # Page sections
│   ├── ui/                   # Reusable components
│   └── providers/            # React providers
├── public/
│   ├── images/               # Images
│   ├── robots.txt
│   └── sitemap.xml
├── .github/
│   └── workflows/            # GitHub Actions
├── .env.local               # Environment variables (local)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 🔧 Полезные команды

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Create production build
npm run start            # Start production server

# Linting & Formatting
npm run lint             # Run ESLint
npm run format           # Format code with Prettier (если добавлен)

# Testing
npm run test             # Run tests (если добавлены)
npm run test:watch      # Watch mode

# Database/Migrations (если используются)
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
```

## 🐛 Troubleshooting

### Проблема: "port 3000 is already in use"

```bash
# Решение 1: Используйте другой порт
npm run dev -- -p 3001

# Решение 2: Найдите и убейте процесс (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Решение 3: Найдите и убейте процесс (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

### Проблема: "Cannot find module..."

```bash
# Очистите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install

# Или очистите npm кэш
npm cache clean --force
npm install
```

### Проблема: "TypeScript errors"

```bash
# Перепроверьте TypeScript конфиг
npx tsc --noEmit

# Установите типы для зависимостей
npm install --save-dev @types/node
```

### Проблема: 3D объекты не грузятся

```bash
# Проверьте консоль браузера (F12)
# Убедитесь, что WebGL поддерживается:
# 1. Откройте https://get.webgl.org/
# 2. Отключите ad-блокеры (могут блокировать Three.js)
# 3. Проверьте, что видеокарта поддерживает WebGL
```

### Проблема: Медленная сборка

```bash
# Используйте Turbopack для ускорения (уже в конфиге)
npm run dev --turbopack

# Или очистите .next папку
rm -rf .next
npm run dev
```

## 📈 Оптимизация производительности

### Анализ размера бандла

```bash
# Установите analyzer (если нужен)
npm install --save-dev @next/bundle-analyzer

# Используйте в next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
```

### Проверка Core Web Vitals

```bash
# Локально
npm run build
npm run start
# Откройте https://pagespeed.web.dev и проверьте сайт
```

## 🔒 Безопасность

### Обновление зависимостей

```bash
# Проверьте уязвимости
npm audit

# Исправьте автоматически (с осторожностью)
npm audit fix

# Обновите зависимости
npm update

# Обновите до новых мажорных версий
npm outdated
# Вручную обновьте в package.json
```

### Защита секретов

```bash
# НИКОГДА не коммитьте .env.local
# Убедитесь, что в .gitignore добавлено:
.env
.env.local
.env.*.local
```

## 📚 Дополнительные ресурсы

- **Next.js документация**: https://nextjs.org/docs
- **React документация**: https://react.dev
- **Three.js туториалы**: https://threejs.org/docs/
- **GSAP документация**: https://gsap.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🎓 Рекомендуемый порядок разработки

1. **Этап 1: Setup & Configuration** (1-2 часа)
   - ✅ Установка зависимостей
   - ✅ Настройка конфигов
   - ✅ Проверка локального запуска

2. **Этап 2: Core Components** (4-6 часов)
   - ✅ Layout и базовые компоненты
   - ✅ Навигация
   - ✅ 3D сцена

3. **Этап 3: Pages & Content** (6-8 часов)
   - ✅ Главная страница
   - ✅ Дополнительные страницы
   - ✅ Формы и взаимодействия

4. **Этап 4: Оптимизация & Деплой** (2-4 часа)
   - ✅ Оптимизация изображений
   - ✅ SEO настройки
   - ✅ Testing & Preview
   - ✅ Production деплой

## ✅ Чек-лист перед Production

- [ ] Все страницы работают (npm run build успешна)
- [ ] Нет TypeScript ошибок (npx tsc --noEmit)
- [ ] Мобильная версия проверена (DevTools F12)
- [ ] 404 страница настроена
- [ ] Favicon добавлен
- [ ] SEO мета-теги заполнены
- [ ] Все изображения оптимизированы
- [ ] Переменные окружения установлены
- [ ] Git коммиты чистые (git log)
- [ ] README обновлен

---

**Версия:** 1.0
**Последнее обновление:** 11 декабря 2025
**Статус:** ✅ Production Ready
