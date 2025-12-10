#!/usr/bin/env pwsh
# OdinLab Studios - Quick Start Script (PowerShell)
# Этот скрипт быстро настроит проект для разработки

Write-Host ""
Write-Host "🚀 OdinLab Studios - Инициализация проекта..." -ForegroundColor Cyan
Write-Host ""

# Проверка Node.js
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js не установлен!" -ForegroundColor Red
    Write-Host "Загрузите с: https://nodejs.org/ (LTS версия)" -ForegroundColor Yellow
    Exit 1
}

$npmVersion = npm --version 2>&1

Write-Host "✅ Node.js версия: $nodeVersion" -ForegroundColor Green
Write-Host "✅ npm версия: $npmVersion" -ForegroundColor Green
Write-Host ""

# Установка зависимостей
Write-Host "📦 Установка зависимостей..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка установки зависимостей!" -ForegroundColor Red
    Exit 1
}

Write-Host "✅ Зависимости установлены" -ForegroundColor Green
Write-Host ""

# Создание .env.local если его нет
if (!(Test-Path ".env.local")) {
    Write-Host "📝 Создание .env.local..." -ForegroundColor Cyan
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Файл .env.local создан из .env.example" -ForegroundColor Green
    Write-Host "   (отредактируйте его если нужны переменные окружения)" -ForegroundColor Yellow
    Write-Host ""
}

# Проверка TypeScript
Write-Host "🔍 Проверка TypeScript..." -ForegroundColor Cyan
npx tsc --noEmit

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript конфигурация валидна" -ForegroundColor Green
} else {
    Write-Host "⚠️  Найдены ошибки TypeScript (не критично)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Инициализация завершена!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Следующий шаг: npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Документация:" -ForegroundColor Cyan
Write-Host "  - Setup: https://github.com/nkVas1/odinlab-studios-website/blob/main/docs/SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host "  - Development: https://github.com/nkVas1/odinlab-studios-website/blob/main/docs/DEVELOPMENT.md" -ForegroundColor Gray
Write-Host ""
