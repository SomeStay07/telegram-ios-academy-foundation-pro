# Git Workflow для Telegram iOS Academy Foundation Pro

## 🎯 Цель документа
Стандартизировать процесс разработки для обеспечения качества кода, безопасности и стабильности релизов.

## 📊 Схема веток
```
main (production) ←── develop (staging) ←── feature/* (development)
     ↑                       ↑                      ↑
   Releases               Auto-deploy         Active development
```

## 🌿 Структура веток

### `main` - Production Branch
- **Назначение**: Стабильная production версия
- **Защита**: Protected branch, только через PR
- **Деплой**: Manual deployment после тестирования
- **Статус**: Всегда готов к релизу

### `develop` - Development/Staging Branch  
- **Назначение**: Integration branch для новых фич
- **Защита**: Protected branch, только через PR
- **Деплой**: Auto-deployment при push
- **CI/CD**: Полная проверка (build, tests, security audit)

### `feature/*` - Feature Branches
- **Назначение**: Разработка новых фич
- **Именование**: `feature/description-of-feature`
- **Базовая ветка**: `develop`
- **Merge**: Только через PR в `develop`

### `hotfix/*` - Hotfix Branches
- **Назначение**: Критические исправления production
- **Именование**: `hotfix/critical-bug-fix`
- **Базовая ветка**: `main`
- **Merge**: В `main` И `develop`

### `release/*` - Release Branches
- **Назначение**: Подготовка релиза
- **Именование**: `release/v1.2.0`
- **Базовая ветка**: `develop`
- **Merge**: В `main` после тестирования

## 🔄 Workflow Process

### 1. Начало работы над фичей
```bash
# Обновляем develop
git checkout develop
git pull origin develop

# Создаем feature branch
git checkout -b feature/profile-improvements

# Работаем над фичей...
```

### 2. Разработка фичи
```bash
# Делаем коммиты с понятными сообщениями
git add .
git commit -m "feat(profile): implement horizontal scrollable metrics

- Replace static badges with interactive scrollable metrics
- Add visual scrollability hints with fade gradients
- Implement 7 metric cards with design tokens
- Follow СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ principles

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Пушим в feature branch
git push origin feature/profile-improvements
```

### 3. Создание Pull Request
```bash
# Создаем PR через GitHub CLI
gh pr create \
  --base develop \
  --head feature/profile-improvements \
  --title "feat(profile): implement horizontal scrollable metrics" \
  --body "$(cat <<'EOF'
## Summary
- Replace static badges with interactive scrollable metrics
- Add visual scrollability hints with fade gradients  
- Implement 7 metric cards with design tokens

## Changes
- **ScrollableMetrics.tsx**: New horizontal scrolling component
- **ProfileHeader.tsx**: Integrated ScrollableMetrics
- **ProfilePage.module.css**: Added design tokens for metrics

## Test plan
- [x] Metrics scroll horizontally on mobile
- [x] Visual hints show scrollability
- [x] Design system compliance maintained
- [x] Responsive behavior tested

## Screenshots
[Add screenshots if UI changes]

🤖 Generated with [Claude Code](https://claude.ai/code)
EOF
)"
```

### 4. Code Review Process
- **Reviewer checks**:
  - ✅ Code quality and style
  - ✅ Design system compliance
  - ✅ Security considerations
  - ✅ Performance impact
  - ✅ Documentation completeness

- **Auto-checks (CI/CD)**:
  - ✅ Build успешен
  - ✅ Tests проходят
  - ✅ Bundle size ≤ 220KB
  - ✅ Security audit чист
  - ✅ Type checking

### 5. Merge и Deploy
```bash
# После approval мержим через GitHub UI или:
gh pr merge --squash --delete-branch

# Автоматически происходит:
# 1. Merge в develop
# 2. Автодеплой в staging
# 3. Удаление feature branch
```

## 📝 Соглашения по коммитам

### Формат коммита
```
<type>(<scope>): <description>

<body>

<footer>
```

### Типы коммитов
- **feat**: Новая фича
- **fix**: Исправление бага
- **docs**: Изменения в документации
- **style**: Форматирование, отсутствующие точки с запятой
- **refactor**: Рефакторинг кода
- **test**: Добавление тестов
- **chore**: Обновление задач сборки, конфигураций

### Примеры хороших коммитов
```bash
feat(profile): add About App section with version history
fix(auth): resolve Telegram authentication timeout issue
docs(api): update authentication flow documentation
style(components): apply consistent spacing in design system
refactor(store): migrate to Zustand state management
test(profile): add comprehensive ProfileHeader test coverage
chore(deps): upgrade React Router to v6.8.0
```

## 🚀 Release Process

### 1. Подготовка релиза
```bash
# Создаем release branch
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# Обновляем версию
npm version minor  # или major/patch

# Создаем PR в main
gh pr create --base main --head release/v1.2.0 \
  --title "Release v1.2.0" \
  --body "Release notes..."
```

### 2. Production Deploy
```bash
# После merge в main
git checkout main
git pull origin main
git tag v1.2.0
git push origin v1.2.0

# Manual deployment process
```

### 3. Sync develop
```bash
# Обновляем develop с изменениями из main
git checkout develop
git merge main
git push origin develop
```

## 🛡️ Branch Protection Rules

### `main` branch
- ✅ Require PR reviews (минимум 1)
- ✅ Require status checks to pass
- ✅ Require linear history
- ✅ Include administrators
- ✅ Restrict pushes (только через PR)

### `develop` branch  
- ✅ Require PR reviews (минимум 1)
- ✅ Require status checks to pass
- ✅ Allow squash merging
- ✅ Auto-delete head branches

## 🚨 Hotfix Process

### Критичный баг в production
```bash
# Создаем hotfix от main
git checkout main
git pull origin main
git checkout -b hotfix/critical-auth-fix

# Исправляем баг
# ... код ...

# Коммитим
git commit -m "fix: resolve critical Telegram auth timeout

- Increase authentication timeout from 5s to 15s
- Add retry mechanism for failed auth attempts
- Improve error handling for network issues

Fixes #123"

# Создаем PR в main (приоритетный)
gh pr create --base main --head hotfix/critical-auth-fix \
  --title "🚨 HOTFIX: resolve critical auth timeout" \
  --label "hotfix,urgent"

# После merge в main, также мержим в develop
gh pr create --base develop --head hotfix/critical-auth-fix \
  --title "chore: merge hotfix into develop"
```

## 📋 Checklist для PR

### Перед созданием PR
- [ ] Код соответствует стандартам проекта
- [ ] Добавлены/обновлены тесты
- [ ] Документация обновлена
- [ ] Design system compliance проверен
- [ ] Bundle size в пределах лимита
- [ ] Нет console.log и debug кода
- [ ] Secrets не попали в код

### Для reviewer
- [ ] Код читаемый и понятный
- [ ] Архитектурные решения обоснованы
- [ ] Нет дублирования кода
- [ ] Performance оптимален
- [ ] Security соображения учтены
- [ ] Accessibility требования соблюдены

## 🔧 Инструменты

### GitHub CLI команды
```bash
# Посмотреть статус PR
gh pr status

# Посмотреть список PR
gh pr list

# Checkout PR локально
gh pr checkout 123

# Approve PR
gh pr review 123 --approve

# Merge PR
gh pr merge 123 --squash
```

### Git aliases (рекомендуемые)
```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

## 🎯 Лучшие практики

### Do's ✅
- Всегда работать в feature branches
- Делать atomic commits (одна логическая единица изменений)
- Писать описательные commit messages
- Тестировать перед push
- Делать rebase вместо merge для чистой истории
- Использовать meaningful branch names

### Don'ts ❌
- Не пушить напрямую в main/develop
- Не коммитить secrets или sensitive data
- Не делать огромные commits (>500 строк)
- Не оставлять debug код
- Не забывать про documentation
- Не игнорировать CI/CD failures

## 📞 Контакты и помощь

При вопросах по workflow:
1. Проверьте эту документацию
2. Посмотрите существующие PR как примеры
3. Задайте вопрос в team chat
4. Обратитесь к tech lead

---

**Версия документа**: 1.0
**Последнее обновление**: 2025-09-20
**Автор**: Claude Code AI Assistant

*Этот workflow будет развиваться вместе с проектом. Предложения по улучшению приветствуются!* 🚀