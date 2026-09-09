# Спецификация: Добавяне на нов лектор — Гилад Бараш (Gilad Barash)

**Дата:** 2026-09-09  
**Приоритет:** Висок  
**Тип:** Ново съдържание — лектор (кийноут)

---

## Данни за лектора

| Поле | Стойност |
|---|---|
| Пълно име (BG) | Гилад Бараш |
| Пълно име (EN) | Gilad Barash |
| Slug | `gilad-barash` |
| Позиция (EN) | Data & AI Strategy Consultant @ Matrix IFS |
| Позиция (BG) | Консултант по Data & AI стратегия @ Matrix IFS |
| Трак | `ai` |
| Снимка | `images/speakers/gilad-barash.jpg` *(трябва да се получи)* |
| Тема (EN) | How Companies Implement AI Sustainably |
| Тема (BG) | Как компаниите имплементират AI устойчиво *(работен превод — потвърди)* |

**Участие в програмата:**
- **Ден 1, Блок 2:** *Applied AI — From Opportunity to Operational Results*
- Формат: **кийноут лектор**

**Биография (EN):**  
Gilad Barash is a Data & AI Strategy Consultant with over 15 years of experience helping organizations use Data and AI for actual business impact. Leading data and business transformation at Matrix IFS, he has worked across construction, pharma, maritime, and health-tech — identifying use-cases, designing AI pilots and translating complex business requirements into strategies that organizations can execute. A frequent speaker at international conferences and host of the "Who's Your Data?" podcast, Gilad brings an implementor's perspective to Connexus: not what AI can theoretically do, but what it actually takes to make it work.

**Биография (BG):** *(очаква превод — Симо ще преведе)*

---

## Задачи за разработчика (Симо)

### Задача 1 — Добавяне на лектора в `data/speakers-data.js`

**Файл:** `data/speakers-data.js` — масивът `SPEAKERS`, в секцията `ai`.

```js
{
  id: 'gilad-barash', track: 'ai',
  img: '/images/speakers/gilad-barash.jpg?v=20260909', alt: 'Gilad Barash',
  objectPosition: 'center top',
  name: 'Гилад Бараш',
  nameEn: 'Gilad Barash',
  role: 'Data & AI Strategy Consultant @ Matrix IFS',
  topicBg: 'Как компаниите имплементират AI устойчиво',
  topicEn: 'How Companies Implement AI Sustainably',
  bioBg: [], // ще се добави превод по-късно от Симо
  bioEn: [
    'Gilad Barash is a Data & AI Strategy Consultant with over 15 years of experience helping organizations use Data and AI for actual business impact. Leading data and business transformation at Matrix IFS, he has worked across construction, pharma, maritime, and health-tech — identifying use-cases, designing AI pilots and translating complex business requirements into strategies that organizations can execute.',
    'A frequent speaker at international conferences and host of the "Who\'s Your Data?" podcast, Gilad brings an implementor\'s perspective to Connexus: not what AI can theoretically do, but what it actually takes to make it work.'
  ]
},
```

---

### Задача 2 — Качване на снимката

**Файл:** `images/speakers/gilad-barash.jpg`  
**Формат:** JPG, препоръчителен размер 400×533 px (portrait, 3:4), макс. 150 KB.  
**Действие:** Получи снимката и я постави в `images/speakers/`.

---

### Задача 3 — Генериране на статичните страници

Пусни Node генератора (вижте `CLAUDE.md` → "Per-Speaker Pages").

Ще се генерират:
- `speakers/gilad-barash/index.html` (BG)
- `en/speakers/gilad-barash/index.html` (EN)

---

### Задача 4 — Обновяване на `sitemap.xml`

Добави 2 нови `<url>` блока:

```xml
<url>
  <loc>https://www.blackseatech.org/speakers/gilad-barash/</loc>
  <xhtml:link rel="alternate" hreflang="bg" href="https://www.blackseatech.org/speakers/gilad-barash/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.blackseatech.org/en/speakers/gilad-barash/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.blackseatech.org/speakers/gilad-barash/"/>
</url>
<url>
  <loc>https://www.blackseatech.org/en/speakers/gilad-barash/</loc>
  <xhtml:link rel="alternate" hreflang="bg" href="https://www.blackseatech.org/speakers/gilad-barash/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.blackseatech.org/en/speakers/gilad-barash/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.blackseatech.org/speakers/gilad-barash/"/>
</url>
```

---

### Задача 5 — Обновяване на JSON-LD `performer` в `index.html` и `en/index.html`

**`index.html` (BG):**

```json
{
  "@type": "Person",
  "name": "Гилад Бараш",
  "jobTitle": "Консултант по Data & AI стратегия",
  "worksFor": { "@type": "Organization", "name": "Matrix IFS" },
  "image": "https://www.blackseatech.org/images/speakers/gilad-barash.jpg"
}
```

**`en/index.html` (EN):**

```json
{
  "@type": "Person",
  "name": "Gilad Barash",
  "jobTitle": "Data & AI Strategy Consultant",
  "worksFor": { "@type": "Organization", "name": "Matrix IFS" },
  "image": "https://www.blackseatech.org/images/speakers/gilad-barash.jpg"
}
```

---

### Задача 6 — Bump на cache-busting версиите

| Файл | Какво да обновиш |
|---|---|
| `speakers.html` | `?v=` на `data/speakers-data.js` → `20260909` |
| `en/speakers.html` | `?v=` на `../data/speakers-data.js` → `20260909` |
| Всички генерирани speaker файлове | Пусни генератора — не редактирай на ръка |

---

## Отворени въпроси

| # | Въпрос | Отговорник |
|---|---|---|
| 1 | Снимката на Гилад Бараш — откъде се получава? | Организационен екип |
| 2 | BG превод на биографията — Симо ще преведе ли, или трябва от другаде? | Симо |

---

## Приемателни критерии

- [ ] `https://www.blackseatech.org/speakers/gilad-barash/` зарежда страницата
- [ ] `https://www.blackseatech.org/en/speakers/gilad-barash/` зарежда EN версията
- [ ] Лекторът се вижда в `speakers.html` в секция AI
- [ ] Снимката се зарежда коректно
- [ ] `sitemap.xml` съдържа двата нови URL-а
- [ ] JSON-LD `Event.performer` е обновен в двата `index.html` файла
- [ ] JSON-LD валидира в [Rich Results Test](https://search.google.com/test/rich-results)
