# Спецификация: Нов лектор — Dominik Petek

**Дата:** 2026-09-11
**Приоритет:** Висок
**Тип:** Ново съдържание — лектор

---

> **Бележка:** Останалите трима лектори от същия мейл (Jeroen van Hertum, Martijn Leijten, Гълъбин Гълъбов) вече са покрити в [new-speakers-hertum-leijten-galabov.md](new-speakers-hertum-leijten-galabov.md). Тази спецификация е **само за Dominik Petek**.

---

## Данни за лектора

| Поле | Стойност |
|---|---|
| Пълно име | Dominik Petek |
| Slug | `dominik-petek` |
| Изписване | Само латиница (както Paul Lambert / Dr. Teade Punter) — `name` без `nameEn` |
| Позиция | Founder & Managing Director @ ProCom / CPO Value Lab (Munich) |
| Трак | `ai` (Изкуствен интелект / Artificial Intelligence) |
| Снимка | `images/speakers/dominik-petek.jpg` *(приложена към мейла — Симо я има)* |
| Тема (EN) | From Hype to Hard Value: AI Agents in Everyday Procurement |
| Тема (BG) | *предстои превод — Симо* |

**Био (EN)** — съставено от предоставения professional experience:
> Dominik Petek is the founder and managing director of ProCom / CPO Value Lab in Munich, a consulting firm specializing in strategic procurement, procurement transformation, and AI-driven sourcing solutions. Since 2013 he has built the CPO Value Lab platform as a "Procurement Operating System" for mid-size and large enterprises, and developed and commercialized Agentic AI offerings for strategic procurement — from use-case design and technology selection to implementation support. He advises CPOs and CFOs on procurement transformation, building organizations, processes, and digital capabilities, and has delivered strategic procurement and sourcing projects for major clients including GSK, Deutsche Glasfaser, Sky, E.ON, and Stratec SE.

**Био (BG):** *предстои превод — Симо*

**Кратко описание на лекцията (EN, предоставено):**
> Procurement is one of the best places to put AI agents to work — structured decisions, rich data, and value you can measure. This talk walks through five real situations from daily procurement, from validating supplier price increases to taming maverick spend, each with the concrete outcome and the watch-outs that make it work.

**Основни ползи за аудиторията (EN, предоставено):**
> Attendees will learn where AI agents genuinely fit in procurement — and how to tell a real use case from hype. They'll take away a practical sense of what these agents can and can't do today, and what it takes to make them work in daily operations. And they'll leave able to spot the first high-value use case in their own organization.

**Описание и ползи (BG):** *предстои превод — Симо*

---

## Задачи за разработчика (Симо)

### Задача 1 — Добавяне в `data/speakers-data.js`

Добави обекта в масива `SPEAKERS`, в групата `// ── AI ──` (напр. след `martin-kuvandzhiev`):

```js
{
  id: 'dominik-petek', track: 'ai',
  img: '/images/speakers/dominik-petek.jpg?v=20260911', alt: 'Dominik Petek',
  objectPosition: 'center top',
  name: 'Dominik Petek',
  role: 'Founder & Managing Director @ ProCom / CPO Value Lab',
  topicBg: 'TODO — превод',
  topicEn: 'From Hype to Hard Value: AI Agents in Everyday Procurement',
  bioEn: [
    'Dominik Petek is the founder and managing director of ProCom / CPO Value Lab in Munich, a consulting firm specializing in strategic procurement, procurement transformation, and AI-driven sourcing solutions. Since 2013 he has built the CPO Value Lab platform as a "Procurement Operating System" for mid-size and large enterprises, and developed and commercialized Agentic AI offerings for strategic procurement — from use-case design and technology selection to implementation support.',
    'He advises CPOs and CFOs on procurement transformation, building organizations, processes, and digital capabilities, and has delivered strategic procurement and sourcing projects for major clients including GSK, Deutsche Glasfaser, Sky, E.ON, and Stratec SE.'
  ],
  bioBg: [], // TODO — превод
  sessionDescEn: 'Procurement is one of the best places to put AI agents to work — structured decisions, rich data, and value you can measure. This talk walks through five real situations from daily procurement, from validating supplier price increases to taming maverick spend, each with the concrete outcome and the watch-outs that make it work.',
  sessionDescBg: 'TODO — превод',
  takeawaysEn: "Attendees will learn where AI agents genuinely fit in procurement — and how to tell a real use case from hype. They'll take away a practical sense of what these agents can and can't do today, and what it takes to make them work in daily operations. And they'll leave able to spot the first high-value use case in their own organization.",
  takeawaysBg: 'TODO — превод'
},
```

> Внимание: в оригинала на „Key Takeaways" имаше водещ символ „о " — почистен е тук.

---

### Задача 2 — Снимка

`images/speakers/dominik-petek.jpg` — приложена е към мейла. Формат JPG, ~400×533 px (portrait, 3:4), макс. 150 KB.

---

### Задача 3 — Генериране на статичните страници

Пусни Node генератора (виж `CLAUDE.md` → „Per-Speaker Pages"). Генерира:
- `speakers/dominik-petek/index.html` (BG)
- `en/speakers/dominik-petek/index.html` (EN)

---

### Задача 4 — `sitemap.xml`

Добави 2 нови `<url>` блока (BG + EN) по установения шаблон.

---

### Задача 5 — JSON-LD `performer` в `index.html` и `en/index.html`

Добави като `Person` обект в `Event.performer` (двата файла):

```json
{
  "@type": "Person",
  "name": "Dominik Petek",
  "jobTitle": "Founder & Managing Director",
  "worksFor": { "@type": "Organization", "name": "ProCom / CPO Value Lab" },
  "image": "https://www.blackseatech.org/images/speakers/dominik-petek.jpg"
}
```

---

### Задача 6 — Cache-busting

Обнови `?v=` до `20260911` на `data/speakers-data.js` в `speakers.html` и `en/speakers.html`; регенерирай speaker файловете с генератора.

---

## ⚠️ Липсваща информация

| # | Какво липсва | За кого |
|---|---|---|
| 1 | **BG превод** на тема, био, описание и ползи | Симо (предоставено е само EN) |
| 2 | Потвърждение, че снимката от мейла е приложена във `images/speakers/` | Симо |

---

## Приемателни критерии

- [ ] Dominik Petek се вижда в `speakers.html` в секция „Изкуствен интелект"
- [ ] BG + EN страници зареждат коректно
- [ ] Снимката се зарежда
- [ ] `sitemap.xml` съдържа двата нови URL-а
- [ ] JSON-LD `Event.performer` е обновен в двата `index.html`
- [ ] Няма останали `TODO` полета в записа
- [ ] JSON-LD валидира в [Rich Results Test](https://search.google.com/test/rich-results)

---

## Изпълнение (2026-09-14)

Всички задачи 1-6 са изпълнени. Отклонения и допълнения спрямо заданието по-горе:

| Поле | В заданието | Изпълнено | Защо |
|---|---|---|---|
| `objectPosition` | `center top` | `30% center` | Снимката от мейла е хоризонтална (2500x1664), не портретна. При `center top` лицето излиза извън кадъра 400x533; `30%` го центрира. Проверено визуално на карта и профил. |
| `img` cache-bust | `?v=20260911` | `?v=20260914` | Датата на реалното качване. |
| Снимка | JPG, ~400x533, макс. 150 KB | 1652x1100, 128 KB | Оригиналът е 2500x1664 / 1.6 MB - преоразмерен и компресиран. Не е изрязан до 3:4, защото картите използват `object-fit: cover` и кадрирането се прави от `objectPosition`. |

**BG преводи** (точка 1 от „Липсваща информация") - изготвени и добавени: тема, био (2 абзаца), описание на лекцията, основни ползи. Био-текстът е адаптация на EN версията, а не буквален превод. **Подлежат на преглед от лектора/организаторите.**

Английските текстове са пренесени дословно от заданието (вкл. почистения водещ символ в „Key Takeaways").

**Точка 2** от „Липсваща информация" - потвърдено: снимката е на място във `images/speakers/dominik-petek.jpg`.

### Засегнати файлове

`data/speakers-data.js`, `images/speakers/dominik-petek.jpg` (нов), `speakers/dominik-petek/index.html` (нов), `en/speakers/dominik-petek/index.html` (нов), `speakers.html`, `en/speakers.html`, `index.html`, `en/index.html`, `sitemap.xml`.

Генераторът пренаписа и останалите 54 страници на лектори, но съдържанието им е идентично с master - единствената разлика е преномерирането на `position` в `ItemList` JSON-LD на `speakers.html` / `en/speakers.html`, защото новият запис е втори в масива.
