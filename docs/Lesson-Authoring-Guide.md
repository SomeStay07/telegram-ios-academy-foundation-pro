# Guide: Создание уроков и курсов

## UX Flow урока
Hook → Objectives → Recall → Concept → WorkedExample (fading) → Interactive → Formative Quiz → Callouts → Checkpoint → Summary → Spaced Review → Transfer Task.

## Правила контента
- Один outcome — одна проверка (verifiedBy).
- WorkedExample: каждая следующая ступень с меньшей подсказкой.
- Quiz: четкое объяснение к каждому варианту.
- Checkpoint: passThreshold ∈ (0,1], обычно 0.8.

## Builder CLI
- `academy-builder lesson:new <id>` — шаблон урока
- `academy-builder lesson:lint <file.json>` — Zod + кросс-валидации
- `academy-builder course:new`, `course:lint`
- `academy-builder interview:new-set`, `interview:lint`

## Подсказки авторам
- Сначала написать outcomes (по Bloom).
- Связать каждый outcome с modules через `verifiedBy`.
- Добавить минимум 2 formative-вопроса и один worked-example.
- Обязательно — spaced review (D1/D7/D30).