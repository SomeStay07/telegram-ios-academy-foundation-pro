# Pull Request Templates

## 📋 Доступные Templates

### 1. Default Template
**Файл**: `pull_request_template.md`  
**Использование**: Автоматически применяется ко всем PR  
**Подходит для**: Общих изменений, рефакторинга, небольших улучшений

### 2. Feature Template
**Файл**: `feature.md`  
**URL параметр**: `?template=feature.md`  
**Подходит для**: Новых функций, компонентов, больших фич

### 3. Bug Fix Template  
**Файл**: `bugfix.md`  
**URL параметр**: `?template=bugfix.md`  
**Подходит для**: Исправления багов, regression fixes

### 4. Hotfix Template
**Файл**: `hotfix.md`  
**URL параметр**: `?template=hotfix.md`  
**Подходит для**: Критических исправлений production

---

## 🚀 Как использовать

### Способ 1: GitHub CLI
```bash
# Feature PR
gh pr create --template feature.md --base develop

# Bug fix PR  
gh pr create --template bugfix.md --base develop

# Hotfix PR
gh pr create --template hotfix.md --base main
```

### Способ 2: GitHub Web Interface
1. Создайте PR обычным способом
2. Добавьте к URL параметр `?template=feature.md`
   ```
   https://github.com/user/repo/compare/develop...feature-branch?template=feature.md
   ```

### Способ 3: Прямые ссылки
- **Feature**: [Create Feature PR](../../compare/develop...HEAD?template=feature.md)
- **Bug Fix**: [Create Bug Fix PR](../../compare/develop...HEAD?template=bugfix.md)  
- **Hotfix**: [Create Hotfix PR](../../compare/main...HEAD?template=hotfix.md)

---

## 📋 Checklist Guidelines

### ✅ Обязательные чекбоксы
Эти пункты **MUST** быть выполнены перед merge:
- Design system compliance
- Security checklist
- Bundle size verification
- Cross-platform testing
- CI/CD success

### 🔍 Reviewer guidelines
- Все чекбоксы должны быть отмечены автором
- Reviewer проверяет качество выполнения
- Любые вопросы обсуждаются в комментариях
- Approval только после полной проверки

---

## 🎯 Best Practices

### Для авторов PR
1. **Выберите правильный template** в зависимости от типа изменений
2. **Заполните все секции** подробно и честно
3. **Отметьте чекбоксы** только после реального выполнения
4. **Добавьте скриншоты** для UI изменений
5. **Протестируйте thoroughly** перед запросом review

### Для reviewers
1. **Проверьте соответствие template** типу изменений
2. **Убедитесь в выполнении чекбоксов** практически
3. **Проведите code review** по архитектуре и качеству
4. **Протестируйте критичные изменения** самостоятельно
5. **Дайте constructive feedback** для улучшений

---

## 🔧 Customization

### Добавление нового template
1. Создайте файл в `.github/pull_request_template/`
2. Добавьте описание в этот README
3. Обновите quick links выше
4. Протестируйте с `?template=filename.md`

### Изменение default template
Отредактируйте `.github/pull_request_template.md`

---

## 📞 Вопросы и поддержка

При проблемах с templates:
1. Проверьте синтаксис markdown
2. Убедитесь в правильности имени файла
3. Обратитесь к tech lead
4. Создайте issue для улучшения templates

---

**Версия**: 1.0  
**Обновлено**: 2025-09-20  
**Автор**: Claude Code AI Assistant