#!/bin/bash

# OdinLab Studios - Quick Start Script
# Этот скрипт быстро настроит проект для разработки

echo "🚀 OdinLab Studios - Инициализация проекта..."
echo ""

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    echo "Загрузите с: https://nodejs.org/ (LTS версия)"
    exit 1
fi

echo "✅ Node.js версия: $(node --version)"
echo "✅ npm версия: $(npm --version)"
echo ""

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки зависимостей!"
    exit 1
fi

echo "✅ Зависимости установлены"
echo ""

# Создание .env.local если его нет
if [ ! -f .env.local ]; then
    echo "📝 Создание .env.local..."
    cp .env.example .env.local
    echo "✅ Файл .env.local создан из .env.example"
    echo "   (отредактируйте его если нужны переменные окружения)"
    echo ""
fi

# Проверка TypeScript
echo "🔍 Проверка TypeScript..."
npx tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ TypeScript конфигурация валидна"
else
    echo "⚠️  Найдены ошибки TypeScript (не критично)"
fi

echo ""
echo "✅ Инициализация завершена!"
echo ""
echo "🎯 Следующий шаг: npm run dev"
echo ""
echo "📚 Документация:"
echo "  - Setup: https://github.com/nkVas1/odinlab-studios-website/blob/main/docs/SETUP_GUIDE.md"
echo "  - Development: https://github.com/nkVas1/odinlab-studios-website/blob/main/docs/DEVELOPMENT.md"
echo ""
