# OdinLab Studios - Development Workflow

## 📋 Git Workflow

### Ветвление

```
main (production)
├── develop (staging)
│   ├── feature/hero-section
│   ├── feature/services-page
│   ├── fix/3d-performance
│   └── chore/update-deps
```

### Правила коммитов

Используйте следующий формат сообщений (на русском):

```
<тип>(<область>): <описание> | <описание на английском>

<объяснение>

<footer>
```

#### Типы:
- `feat` - новая функция
- `fix` - исправление бага
- `docs` - обновление документации
- `style` - форматирование кода
- `refactor` - рефакторинг кода
- `perf` - улучшение производительности
- `test` - добавление тестов
- `chore` - обновление зависимостей, конфигов

#### Примеры:

```bash
# Хороший коммит
feat(hero): добавлена анимация входа морфинга | Add morphing entrance animation

fix(3d): исправлена ошибка рендеринга на мобильных | Fix rendering error on mobile

docs(readme): обновлена инструкция по деплою | Update deployment guide

chore(deps): обновлены зависимости React и Next.js | Update React and Next.js
```

### Git workflow команды

```bash
# 1. Создание новой фичи
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. Разработка и коммиты
git add .
git commit -m "feat(component): описание на русском | English description"

# 3. Push и создание PR
git push origin feature/my-feature
# Создайте Pull Request на GitHub

# 4. После merge в develop
git checkout develop
git pull origin develop

# 5. Подготовка к production (в main)
git checkout main
git pull origin main
git merge --no-ff develop
git push origin main

# 6. Удаление локальной ветки
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

## 🏗 Архитектура компонентов

### Структура папок

```
components/
├── canvas/               # React Three Fiber компоненты
│   ├── Scene.tsx        # Canvas обертка
│   └── FloatingShape.tsx
│
├── sections/            # Крупные секции страниц
│   ├── ServicesScroll.tsx
│   └── ContactSection.tsx
│
├── ui/                  # Переиспользуемые UI компоненты
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Cursor.tsx
│
└── providers/           # React Context/Zustand провайдеры
    ├── SmoothScroll.tsx
    └── index.tsx
```

### Правила создания компонентов

1. **Все компоненты - функциональные** (функции, не классы)
2. **TypeScript типизация обязательна**
3. **"use client" директива для интерактивных компонентов**
4. **Экспорт по умолчанию**

#### Шаблон компонента

```tsx
"use client";

import { FC } from "react";

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className="my-component">
      {title}
    </div>
  );
};

export default MyComponent;
```

## 🎨 Стилизация

### Tailwind CSS + CSS Modules

```tsx
// Использование Tailwind (предпочтительно)
<div className="flex items-center justify-center p-4 bg-odin-dark">
  <h1 className="text-4xl font-bold text-odin-gold">Заголовок</h1>
</div>

// Или с модулями (для сложных стилей)
import styles from './MyComponent.module.css';

<div className={styles.container}>
  {/* content */}
</div>
```

### Переменные цветов

```tsx
// Используйте Tailwind классы
className="bg-odin-dark text-odin-gold"

// Или CSS переменные (если нужны)
style={{ color: 'var(--odin-gold)' }}
```

## 📊 Управление состоянием

### Zustand (рекомендуется)

```tsx
// store/useAppStore.ts
import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
}));

// Использование в компоненте
import { useAppStore } from '@/store/useAppStore';

export default function Header() {
  const { isMenuOpen, setMenuOpen } = useAppStore();
  return <button onClick={() => setMenuOpen(!isMenuOpen)}>Menu</button>;
}
```

## 🔍 Тестирование

### Unit Tests (Jest + React Testing Library)

```bash
# Установка (если нужна)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Запуск тестов
npm test

# Watch mode
npm test -- --watch
```

### Пример теста

```tsx
// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## 🚀 Performance Optimization

### Image Optimization

```tsx
// Используйте Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority // Для hero изображений
  quality={80}
/>
```

### Code Splitting

```tsx
// Ленивая загрузка компонентов
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
});
```

### Bundle Analysis

```bash
# Анализ размера бандла (если добавили analyzer)
ANALYZE=true npm run build
```

## 🔐 Security Best Practices

### Environment Variables

```bash
# НИКОГДА в .env
SENSITIVE_API_KEY=secret123

# Используйте NEXT_PUBLIC_ только для публичных данных
NEXT_PUBLIC_SITE_URL=https://odinlab.studio
```

### Input Validation

```tsx
// Валидация форм перед отправкой
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Санитизация HTML (если нужна)
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

## 📈 Monitoring & Analytics

### Vercel Analytics (встроен)

```tsx
// Автоматически отправляет Web Vitals на Vercel
// Просто используйте на Production
```

### Custom Events

```tsx
// Отслеживание кастомных событий
function trackEvent(name: string, data?: any) {
  if (typeof window !== 'undefined') {
    window.gtag?.event(name, data);
  }
}

// Использование
onClick={() => trackEvent('button_click', { name: 'cta' })}
```

## 🐛 Debugging

### Browser DevTools

```bash
# React DevTools (установите расширение Chrome)
# Redux DevTools (если используете Redux)
# Next.js DevTools (встроены в Next.js)
```

### Console Logging

```tsx
// Development only logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### VS Code Debug

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

## 📝 Documentation

### Комментарии в коде

```tsx
/**
 * FloatingShape - 3D объект с морфингом
 * @component
 * @example
 * return <FloatingShape />
 */
export default function FloatingShape() {
  // implementation
}
```

### README для компонентов

```markdown
# Button Component

Переиспользуемая кнопка со встроенной стилизацией.

## Props
- `variant`: 'primary' | 'secondary'
- `size`: 'sm' | 'md' | 'lg'
- `onClick`: () => void

## Example
\`\`\`tsx
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
\`\`\`
```

## 🎯 Code Review Checklist

Перед созданием Pull Request проверьте:

- [ ] Код следует правилам именования (PascalCase, camelCase)
- [ ] TypeScript типизирован (нет `any`)
- [ ] Компоненты отзывчивы (мобильная версия проверена)
- [ ] Нет console.log в production коде
- [ ] Нет магических чисел (используйте константы)
- [ ] Комментарии для сложной логики добавлены
- [ ] Все ссылки на изображения работают
- [ ] Коммиты описательные и атомарные
- [ ] Нет конфликтов с main веткой

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: # Deploy step
```

---

**Версия:** 1.0
**Последнее обновление:** 11 декабря 2025
