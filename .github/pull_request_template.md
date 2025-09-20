## 📋 Pull Request Summary

### 🎯 What does this PR do?
<!-- Краткое описание изменений (1-2 предложения) -->

### 🔗 Related Issue(s)
<!-- Укажите номер issue, если есть: Closes #123, Fixes #456 -->

## 🛠️ Type of Change
<!-- Отметьте подходящий тип изменения -->
- [ ] 🆕 **feat** - новая функциональность
- [ ] 🐛 **fix** - исправление бага  
- [ ] 📚 **docs** - изменения в документации
- [ ] 🎨 **style** - форматирование, отсутствующие точки с запятой
- [ ] ♻️ **refactor** - рефакторинг без изменения функциональности
- [ ] ⚡ **perf** - улучшение производительности
- [ ] ✅ **test** - добавление или исправление тестов
- [ ] 🔧 **chore** - обновление зависимостей, конфигураций
- [ ] 🚨 **hotfix** - критическое исправление для production

## 📱 Applications Affected
- [ ] MiniApp (React + Vite)
- [ ] API (NestJS + Prisma)
- [ ] Bot (grammY)
- [ ] Packages (UI, specs, etc.)
- [ ] Documentation

## 🎨 Design System Compliance

### UI/UX Requirements
- [ ] Следует принципам **СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ**
- [ ] Использует компоненты из design system (`src/design-system/`)
- [ ] Соответствует Telegram WebApp UI guidelines
- [ ] Адаптивный дизайн (mobile-first подход)
- [ ] Accessibility соблюдено (ARIA labels, keyboard navigation)
- [ ] Typography согласно `DESIGN_AGREEMENTS.md`
- [ ] Color palette использует design tokens

### Animation & Interaction
- [ ] Анимации subtle и calm (scale ≤ 1.05, y ≤ 2px)
- [ ] Hover effects не агрессивные
- [ ] Haptic feedback использована корректно
- [ ] No layout shifts (CLS optimization)
- [ ] Loading states красивые и информативные

## ✅ Testing

### Automated Testing
- [ ] Tests pass locally with `pnpm test`
- [ ] Build succeeds with `pnpm build` 
- [ ] Bundle size ≤ 220KB (gzipped) for MiniApp
- [ ] TypeScript errors отсутствуют
- [ ] ESLint warnings устранены

### Manual Testing
- [ ] Протестировано на desktop (Chrome/Safari/Firefox)
- [ ] Протестировано на mobile (iOS/Android)
- [ ] Протестировано в Telegram WebApp
- [ ] Протестировано в dark/light theme
- [ ] Edge cases и error states проверены

## 📖 Documentation
- [ ] Code is self-documenting or has comments
- [ ] README updated (if needed)
- [ ] Documentation updated (if needed)

## 🔐 Security & Code Quality

### Security Checklist
- [ ] Нет hardcoded secrets/API keys в коде
- [ ] Input validation добавлена где нужно
- [ ] XSS protection применена
- [ ] No console.log в production коде
- [ ] Error messages не раскрывают sensitive данные
- [ ] Dependencies проверены на уязвимости

### Code Quality
- [ ] Код читаемый и self-documenting
- [ ] No code duplication
- [ ] Error boundaries добавлены где нужно
- [ ] Proper error handling с user-friendly messages
- [ ] Memory leaks отсутствуют (event listeners очищены)
- [ ] React best practices соблюдены (memo, useMemo, useCallback где нужно)

## 📦 Bundle Impact
If this affects the MiniApp bundle:
- Bundle size before: XKB
- Bundle size after: XKB
- Change: +/-XKB

## 📱 Telegram Integration
If this affects Telegram WebApp:
- [ ] BackButton behavior verified
- [ ] MainButton behavior verified  
- [ ] Haptics working correctly
- [ ] Theme integration working
- [ ] initData validation working

## 🌐 i18n
If this affects translations:
- [ ] Russian translations added/updated
- [ ] English translations added/updated
- [ ] Translation keys follow naming convention

## 📊 Analytics
If this affects analytics:
- [ ] PostHog events properly defined
- [ ] OpenTelemetry traces added
- [ ] Event names follow naming convention

## 🔗 Related Issues
Closes #(issue)

## 📸 Screenshots
If applicable, add screenshots to help explain your changes.

## 👥 For Reviewer

### Review Checklist
- [ ] Code architecture понятна и логична
- [ ] No anti-patterns или code smells
- [ ] Performance implications приемлемы
- [ ] Security considerations соблюдены
- [ ] User experience интуитивна
- [ ] Design system compliance проверен
- [ ] Error handling comprehensive

### Final Approval
- [ ] All CI/CD checks проходят успешно
- [ ] Manual testing выполнено
- [ ] Documentation актуальна
- [ ] Ready for merge

---

## ✨ Additional Notes
<!-- Любая дополнительная информация о PR -->

---

**🤖 Generated with [Claude Code](https://claude.ai/code)**

<!-- 
Спасибо за ваш вклад в проект! 🚀
Убедитесь, что все чекбоксы отмечены перед запросом review.

Помните:
- Следуйте принципам СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ
- Используйте компоненты из design system
- Тестируйте в Telegram WebApp
- Соблюдайте bundle size ≤ 220KB
-->