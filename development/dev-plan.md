# Development Plan — blackseatech.org

Детайлен план за имплементация на препоръките от SEO/UX одита. Промените се прилагат директно в `index.html` (production bundle — минифициран React + Tailwind + GSAP).

---

## Обща информация

- **Файл за промяна:** `index.html` (self-contained SPA, ~475KB)
- **Технологии в bundle:** React, Tailwind CSS, GSAP + ScrollTrigger
- **Навигация:** Hash-based anchors (`#program`, `#speakers`, `#tickets`, `#venue`, `#expo`)
- **Responsive breakpoint:** `md:` (mobile-first)
- **Шрифтове:** Space Grotesk, Inter, IBM Plex Mono (Google Fonts)

> **Забележка:** Тъй като repo-то съдържа само production build (без `src/`, `package.json` или build конфигурация), всички промени се правят директно в минифицирания HTML. Препоръчително е преди всяка задача да се направи backup или git commit.

---

## Задача 1: Sticky Header (постоянно фиксиран)

**Проблем:** Header-ът изчезва при скрол до определен елемент. Трябва да е видим винаги.

**Текущо състояние:** Навигацията използва `position: sticky` и вероятно GSAP ScrollTrigger логика, която я скрива.

**Стъпки:**

1. Намери навигационния компонент в минифицирания JS (търси по текстове като "Program", "Speakers", "Tickets" в навигационните елементи).
2. Промени позиционирането от `sticky` на `fixed` с `top: 0`, `left: 0`, `right: 0`, `z-index: 50` (или по-висок).
3. Намери и премахни/деактивирай GSAP ScrollTrigger анимацията, която скрива header-а (вероятно `opacity: 0` или `display: none` при определен scroll offset).
4. Добави `padding-top` на body или на първия контейнер, равен на височината на header-а (~64-80px), за да не се припокрива hero секцията.
5. Тествай на mobile и desktop — header-ът трябва да е видим при всяко scroll положение.

**Зависимости:** Задача 7 (anchor навигация) трябва да отчита височината на fixed header при scroll offset.

---

## Задача 2: Back to Top бутон

**Проблем:** Няма начин за бързо връщане до началото на страницата.

**Стъпки:**

1. Добави нов HTML елемент — бутон с SVG стрелка нагоре (`↑` или chevron-up icon).
2. Стилизация:
   - `position: fixed`
   - `bottom: 1.5rem` (desktop) / `bottom: 5rem` (mobile — над sticky CTA бутона, виж Задача 6)
   - `right: 1.5rem`
   - `z-index: 40`
   - `width: 48px`, `height: 48px`
   - Кръгъл, с фон съответстващ на дизайна (напр. полупрозрачен тъмен)
   - `opacity: 0`, `pointer-events: none` по подразбиране (скрит)
   - Transition: `opacity 0.3s ease`
3. Добави JS listener за `scroll` event:
   - Показва бутона (`opacity: 1`, `pointer-events: auto`) когато `window.scrollY > window.innerHeight * 1.5`
   - Скрива го при по-малко scroll.
4. При клик: `window.scrollTo({ top: 0, behavior: 'smooth' })`.
5. На mobile — позиционирай бутона така, че да не се припокрива със sticky CTA (Задача 6). Използвай `bottom: 5rem` за mobile, за да е над CTA бутона.

**Зависимости:** Задача 6 (sticky CTA mobile) — координиране на позицията.

---

## Задача 3: Изчистване на CTA структурата

**Проблем:** Три различни бутона (Tickets в менюто, Register в header-а, Get tickets в hero) водят до едно и също действие, което създава объркване.

**Стъпки:**

### 3.1 Навигация — преименуване на Register бутон
1. Намери CTA бутона в навигацията (текст "Register").
2. Промени текста на **"Register now"**.
3. Промени `href` да води до формата за регистрация (ако е отделна секция — anchor `#register`; ако е external URL — директен линк).

### 3.2 Tickets елемент в менюто
1. Увери се, че "Tickets" в менюто води до `#tickets` секцията (pricing cards).
2. Да остане обикновен навигационен елемент (без CTA стилизация).

### 3.3 Hero секция — промяна на CTA бутон
1. Намери бутона "Get tickets" в hero секцията.
2. Промени текста на **"Register now"**.
3. Промени `href`/`onClick` да води до формата за регистрация (същата дестинация като бутона от навигацията).

### 3.4 Ticket карти — запази текущото поведение
1. Бутоните "Register now" в ticket картите остават и водят до формата за регистрация.
2. Не се изисква промяна тук, освен визуалната (виж Задача 8).

---

## Задача 4: Добавяне на информация за ICT Cluster

**Проблем:** Няма информация кой организира събитието в above-the-fold зоната.

**Стъпки:**

1. В hero секцията, намери основното съдържание (заглавие, дата, описание).
2. Добави текст: **"Organized by ICT Cluster — Varna"** (и българска версия за BG: **"Организирано от ИКТ Клъстер — Варна"**).
3. Позиция: под заглавието или над/под датата на събитието.
4. Стил: по-малък шрифт (Inter, `text-sm` или `text-base`), по-нисък контраст от заглавието (напр. `text-gray-300` или `text-white/70`).

---

## Задача 5: Sticky CTA бутон на мобилна версия

**Проблем:** На mobile потребителят губи достъп до основния CTA при скрол.

**Стъпки:**

1. Добави нов HTML елемент — sticky CTA bar:
   ```
   position: fixed
   bottom: 0
   left: 0
   right: 0
   z-index: 45
   padding: 0.75rem 1rem
   background: rgba(0,0,0,0.95) или solid тъмен цвят
   ```
2. Съдържание: бутон **"Register now"** на цяла ширина, водещ до формата за регистрация.
3. Стил на бутона: акцентен цвят (matching primary CTA от дизайна), `text-base`, `font-semibold`, `py-3`, `rounded-lg`.
4. Видимост:
   - Показва се **само на mobile** (`display: block` до `md:` breakpoint, `md:hidden`).
   - Скрива се когато потребителят е в hero секцията (където CTA вече е видим) — използвай scroll listener или IntersectionObserver.
   - Скрива се когато потребителят е на формата за регистрация (target-ът на бутона).
5. Добави `padding-bottom: ~4rem` на body/main container на mobile, за да не покрива footer съдържание.
6. Координирай с Back to Top бутона (Задача 2) — Back to Top трябва да е позициониран над sticky CTA на mobile.

---

## Задача 6: Anchor навигация с smooth scroll

**Проблем:** Менюто не води до конкретни секции; при споделяне на URL не се отваря правилната секция.

**Стъпки:**

### 6.1 Добави уникални ID-та на секциите
1. Намери всеки React section component в HTML:
   - Hero → `id="home"`
   - Program at a Glance → `id="program"`
   - Speakers → `id="speakers"`
   - Halls and Tracks → може да е под `#program` или отделен
   - Tickets → `id="tickets"`
   - Venue → `id="venue"`
   - Expo → `id="expo"`
2. Добави `id` атрибут на wrapper `<div>` на всяка секция.

### 6.2 Навигация — href anchors
1. Намери навигационните линкове.
2. Увери се, че всеки `href` сочи към правилния anchor:
   - Program → `#program`
   - Speakers → `#speakers`
   - Tickets → `#tickets`
   - Venue → `#venue`
   - Expo → `#expo`

### 6.3 Smooth scroll с offset за fixed header
1. Добави CSS: `html { scroll-behavior: smooth; }` (ако не е налично).
2. Добави `scroll-padding-top` равен на височината на header-а (напр. `scroll-padding-top: 80px`).
3. Алтернативно, добави JS click handler на навигационните линкове:
   ```js
   element.scrollIntoView({ behavior: 'smooth', block: 'start' })
   ```
   с `scroll-margin-top` на всяка секция.

### 6.4 URL hash при зареждане
1. При page load, провери `window.location.hash`.
2. Ако има hash, scroll до съответната секция с offset за header-а.

---

## Задача 7: Оптимизация на скрола (премахване на scroll snapping)

**Проблем:** Scroll snapping/GSAP scroll hijacking прави навигацията неестествена — изисква 3 скрол жеста за преминаване между секции, визуално е натоварващо, появяват се празни екрани.

**Стъпки:**

1. **Намери scroll snap CSS**:
   - Търси `scroll-snap-type`, `scroll-snap-align`, `scroll-snap-strictness` в inline `<style>`.
   - Премахни или коментирай тези правила.

2. **Намери GSAP ScrollTrigger scroll hijacking**:
   - Търси `ScrollTrigger.create`, `.pin`, `snap:`, `scrub:` в inline JS.
   - Премахни `snap` конфигурацията от ScrollTrigger instances.
   - Премахни `pin: true` ако секциите са pinned (това причинява "заключване" при скрол).
   - Запази полезни анимации (fade-in, slide-in), но без scroll locking.

3. **Премахни принудително section height**:
   - Ако секциите имат `min-height: 100vh` или `height: 100vh`, промени на `min-height: auto` или премахни.
   - Оставь секции, които наистина трябва да са full-viewport (напр. hero), но премахни за content секциите.

4. **Премахни празни междинни екрани**:
   - Намери spacer/filler `<div>` елементи между секциите (вероятно с `height: 100vh` и без съдържание).
   - Премахни ги или намали до разумен spacing (`padding: 2-4rem`).

5. **Тествай резултата**:
   - Скролването трябва да е нормално (без стъпки, без заключване).
   - Анимациите трябва да се активират при scroll, но без да блокират скрола.
   - На mobile: един swipe gesture = нормално придвижване.

**Внимание:** Тази задача е най-рискова — промените в GSAP ScrollTrigger могат да счупят layout-а. Препоръчително е да се направи git commit преди начало.

---

## Задача 8: Визуална обратна връзка при избор на билет

**Проблем:** При избор на карта 2 или 3, карта 1 остава визуално "активна" (ярка рамка, ярък бутон), което объркващо.

**Стъпки:**

1. Намери ticket card компонентите в минифицирания JS.
2. Идентифицирай state management за selected card (вероятно `useState` или подобен React state).
3. Промени CSS класовете за card states:

   **Неизбрана карта (default):**
   - Рамка: `border-gray-700` или `border-white/20` (subtle)
   - CTA бутон: `bg-transparent` или `bg-white/10`, `text-gray-400` (subdued)
   - Общ opacity: нормален

   **Избрана карта (selected/active):**
   - Рамка: `border-primary` или `border-cyan-400` (акцентен цвят)
   - CTA бутон: `bg-primary` или `bg-cyan-400`, `text-black` (ярък, активен)
   - Опционално: subtle glow или shadow ефект
   - Опционално: "Selected" badge/икона в горния ъгъл

4. Увери се, че при клик на карта, предишната избрана карта се деактивира визуално.
5. При page load, нито една карта не трябва да изглежда "активна" (или първата карта да е pre-selected, но тогава трябва да е clear).

---

## Задача 9: Българска версия на сайта (i18n)

**Проблем:** Сайтът е само на английски; необходима е българска версия като основна.

**Текущо състояние:** В bundle-а има следи от translation инфраструктура, `lang="en"` на `<html>`.

**Стъпки:**

### 9.1 Подготовка на преводи
1. Извлечи всички текстови низове от сайта (headings, параграфи, бутони, labels).
2. Създай translation map обект с два ключа: `bg` и `en`.
3. Примерна структура:
   ```js
   const translations = {
     bg: {
       nav_program: "Програма",
       nav_speakers: "Лектори",
       nav_tickets: "Билети",
       nav_venue: "Място",
       nav_expo: "Експо",
       cta_register: "Регистрирай се",
       hero_title: "Black Sea Technology Forum 2026",
       hero_subtitle: "...",
       // ... всички текстове
     },
     en: {
       nav_program: "Program",
       nav_speakers: "Speakers",
       // ...
     }
   }
   ```

### 9.2 Language switcher UI
1. Добави бутон в горен десен ъгъл на навигацията (преди CTA бутона "Register now").
2. Дизайн: кратък текст **"BG"** / **"EN"** или flag icon.
3. При клик: toggle между `bg` и `en`.
4. Запази избора в `localStorage` (key: `lang`).

### 9.3 Интеграция
1. При page load:
   - Провери `localStorage.getItem('lang')`.
   - Ако няма запазен език → default `bg`.
   - Промени `<html lang="...">` атрибута.
2. Създай helper функция `t(key)` която връща текста за текущия език.
3. Приложи `t()` на всички текстови елементи в React компонентите.

### 9.4 Тестване
- По подразбиране сайтът трябва да се зарежда на български.
- Language switcher трябва да превключва без reload (client-side).
- Всички секции трябва да са преведени.

**Внимание:** Това е най-обемната задача. В минифициран bundle, промяната на всички текстове е трудоемка. Възможна алтернатива: дублиране на `index.html` → `index-bg.html` с преведени текстове и redirect логика, но това не е идеално за поддръжка.

---

## Приоритет и ред на изпълнение

| Приоритет | Задача | Сложност | Зависимости |
|-----------|--------|----------|-------------|
| 1 | **Задача 7** — Оптимизация на скрола | Висока | Няма (но засяга всички секции) |
| 2 | **Задача 1** — Sticky header | Средна | Задача 7 (scroll поведението трябва да е fix-нато първо) |
| 3 | **Задача 6** — Anchor навигация | Средна | Задача 1 (нужен е fixed header за offset) |
| 4 | **Задача 3** — CTA изчистване | Ниска | Задача 6 (anchors за Register now) |
| 5 | **Задача 4** — ICT Cluster info | Ниска | Няма |
| 6 | **Задача 8** — Ticket card визуална обратна връзка | Средна | Няма |
| 7 | **Задача 2** — Back to Top бутон | Ниска | Няма |
| 8 | **Задача 5** — Sticky CTA mobile | Средна | Задача 2 (координация на позиция) |
| 9 | **Задача 9** — Българска версия (i18n) | Висока | Всички останали (текстовете трябва да са финални) |

---

## Подход за работа с минифициран bundle

Тъй като `index.html` съдържа минифициран JS/CSS:

1. **Преди всяка задача** — `git commit` на текущото състояние.
2. **Форматиране** — При нужда, използвай Prettier за да format-неш частично JS блокове за по-лесна работа, после минифицирай обратно.
3. **Търсене** — Търси по уникални текстови низове (напр. "Get tickets", "Register", "Tickets"), а не по variable names (те са mangled).
4. **Тестване** — Стартирай локален сървър (`npx serve .`) и тествай след всяка промяна. Тествай и на mobile viewport (Chrome DevTools → responsive mode).
5. **CSS промени** — Могат да се добавят в края на inline `<style>` блока или като нов `<style>` елемент в `<head>`.
6. **JS промени** — За нова функционалност (Back to Top, language switcher), добави нов `<script>` блок преди `</body>`, вместо да модифицираш съществуващия минифициран код.
