# 🎨 Modern Responsive Design Standards 

## Принципы адаптивного дизайна из лучших приложений

### 📱 **Анализ популярных приложений:**

#### **Telegram Mini Apps**
- **TON Space:** горизонтальные badge'ы с dot separator
- **Hamster Kombat:** `@username • status` layout
- **Durov's Dogs:** компактная горизонтальная компоновка

#### **Social Media Apps** 
- **Instagram:** `@username • location` с адаптивными размерами
- **Twitter:** `@handle • timestamp` с responsive typography
- **Discord:** flex-wrap на мобильных устройствах

#### **iOS/Material Design**
- Горизонтальные метки с разделителями
- Container queries для точного контроля
- Accessibility-first подход

---

## 🛠 **Технические стандарты**

### **1. Fluid Typography**
```css
/* Используем clamp() для плавного масштабирования */
font-size: clamp(0.75rem, 2.2vw, 0.9rem);
padding: clamp(0.25rem, 1.2vw, 0.4rem) clamp(0.6rem, 2.5vw, 1rem);
```

### **2. Container Queries**
```css
.container {
  container-type: inline-size;
}

@container (max-width: 300px) {
  /* Ultra-compact layout */
  flex-direction: column;
}
```

### **3. Modern Flexbox**
```css
.badges-container {
  display: flex;
  gap: clamp(0.5rem, 2vw, 0.875rem);
  flex-wrap: wrap;
  overflow: visible;
}
```

### **4. Accessibility Standards**
```css
@media (prefers-reduced-motion: reduce) {
  transition: none;
}

@media (prefers-color-scheme: dark) {
  /* Dark mode adaptations */
}
```

---

## 📐 **Layout Patterns**

### **Badge + Separator Pattern**
```
@username • Senior Engineer
```

**Применение:**
- Горизонтальная компоновка с `•` разделителем  
- `flex-wrap` для переноса на маленьких экранах
- `justify-content: center` на мобильных
- `justify-content: flex-start` на desktop

### **Breakpoint Strategy**
```css
/* Mobile-first approach */
@media (max-width: 479px)    { /* Small phones */ }
@media (min-width: 480px)    { /* Large phones */ }
@media (min-width: 768px)    { /* Tablets */ }
@media (min-width: 1024px)   { /* Desktop */ }
```

---

## 🎯 **Implementation Guidelines**

### **DO:**
✅ Используйте `clamp()` для fluid sizing  
✅ Container queries для точного контроля  
✅ `flex-wrap` для адаптивности  
✅ `overflow: visible` для hover animations  
✅ Accessibility медиа-запросы  

### **DON'T:**
❌ Fixed pixel values без fallbacks  
❌ Ignore высокая плотность экранов  
❌ Забывать про reduced motion  
❌ Overflow: hidden на интерактивных элементах  

---

## 📊 **Performance Standards**

- **Render Performance:** Container queries > Media queries
- **Bundle Size:** Selective imports, tree-shaking
- **Animation:** Transform > Layout changes
- **Loading:** Progressive enhancement

---

*Документ обновлен: 2025-09-17*
*Версия: 1.0.0*