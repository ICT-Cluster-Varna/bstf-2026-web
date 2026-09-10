# Спецификация: Трима нови лектори — Jeroen van Hertum, Dr. Martijn Leijten, Гълъбин Гълъбов

**Дата:** 2026-09-10
**Приоритет:** Висок
**Тип:** Ново съдържание — лектори

---

## Обобщение

Добавяне на трима нови лектора към `data/speakers-data.js` и регенериране на статичните страници.

| Лектор | Slug | Трак | Език на предоставеното био |
|---|---|---|---|
| Jeroen van Hertum | `jeroen-van-hertum` | **предстои** (виж Липсваща информация) | само EN |
| Dr. Martijn Leijten | `martijn-leijten` | **предстои** (виж Липсваща информация) | само EN |
| Гълъбин Гълъбов | `galabin-galabov` | `regional-innovation-policy` ✓ | само BG |

> **Изписване на имена:** двамата нидерландски лектори — **само латиница** (както Paul Lambert / Michaël Roux / Lars Frølund): `name` без `nameEn`, еднакво в BG и EN. Гълъбин Гълъбов — `name` (кирилица) + `nameEn` (латиница).

---

## Лектор 1 — Jeroen van Hertum

**Позиция (предложение, за потвърждение):** Board Member @ Dutch Bulgarian Chamber of Commerce / Founder @ Sourcelab
**Тема:** *не е предоставена — предстои (виж Липсваща информация)*

**Био (EN, предоставено):**
> Jeroen van Hertum serves on the board of the Dutch Bulgarian Chamber of Commerce, the bridge between the Dutch and Bulgarian business communities, where he works on cross-border technology cooperation, nearshoring and connecting Bulgarian tech to Western European markets. He is also the founder of Sourcelab, a European technology consultancy operating between Sofia and the Netherlands. Over thirty years he has built advanced digital products for startups, fintechs, banks and large enterprises, from small teams shipping fast to regulated institutions carrying real risk. Dutch by birth and based in Bulgaria since 2010, his focus is digital trust and European digital identity: eIDAS, qualified electronic signatures and the emerging EU Digital Identity Wallet. He argues that trust is becoming a business advantage rather than a compliance cost.

**Био (BG):** *предстои превод — Симо*

---

## Лектор 2 — Dr. Martijn Leijten

**Позиция:** Assistant Professor @ TU Delft (Technology, Policy & Management)
**Тема:** *не е предоставена — предстои (виж Липсваща информация)*

**Био (EN, предоставено):**
> Dr. Martijn Leijten is an assistant professor of Organisation and Governance of the faculty of Technology, Policy and Management of Delft University of Technology (the Netherlands) and acts as scientific coordinator of Next Generation Infrastructures, a research platform of six public infrastructure providers in the field of transport, energy and drinking water in the Netherlands. He researches complex projects and technology transition processes and teaches both in academia and in the public and private sector.

**Био (BG):** *предстои превод — Симо*

---

## Лектор 3 — Гълъбин Гълъбов

**Позиция (BG):** Председател на УС и ИД @ Българска агенция за експортно застраховане (БАЕЗ)
**Позиция (EN, предложение):** Chairman of the Board & CEO @ Bulgarian Export Insurance Agency (BAEZ)
**Трак:** Регионални иновационни политики / Regional Innovation Policy ✓
**Тема (BG):** Финансови инструменти за подкрепа на експортния и МСП бизнеса от страна на Българска агенция за експортно застраховане.
**Тема (EN):** *предстои превод — Симо*

**Био (BG, предоставено):**
> Мениджър с над 30 години професионален опит в областта на финансите, а понастоящем Председател на УС и ИД на Българска агенция за експортно застраховане ЕАД.

**Кратко описание на сесията (BG, предоставено):**
> Представяне на инструментите, които БАЕЗ предоставя за подкрепа на експортно ориентираните фирми, както и застраховка на кредити за оборотни нужди на фирми от сегмента МСП.

**Основни ползи за аудиторията (BG, предоставено):**
> Българска агенция за експортно застраховане предоставя различни инструменти за споделяне риска на българските експортьори, който те поемат при продажба на отложено плащане, както и на банките при финансиране на експортни сделки и улесняване на оборотно кредитиране на фирми от МСП сегмента. В допълнение Агенцията предоставя застраховки тип гаранция, които дават възможност за замяна на банковите гаранции в страната и чужбина за участие в търг, добро изпълнение и поддръжка.

**Био / описание / ползи (EN):** *предстои превод — Симо*

---

## Задачи за разработчика (Симо)

### Задача 1 — Добавяне на тримата в `data/speakers-data.js`

Добави обектите в масива `SPEAKERS`. Гълъбин — в групата `regional-innovation-policy` (напр. след `lars-frolund`). Двамата нидерландци — в групата на избрания за тях трак (виж Липсваща информация).

**Гълъбин Гълъбов** (готов, освен EN преводите):

```js
{
  id: 'galabin-galabov', track: 'regional-innovation-policy',
  img: '/images/speakers/galabin-galabov.jpg?v=20260910', alt: 'Galabin Galabov',
  objectPosition: 'center top',
  name: 'Гълъбин Гълъбов',
  nameEn: 'Galabin Galabov',
  role: 'Chairman of the Board & CEO @ Bulgarian Export Insurance Agency (BAEZ)',
  topicBg: 'Финансови инструменти за подкрепа на експортния и МСП бизнеса от страна на Българска агенция за експортно застраховане.',
  topicEn: 'TODO — превод',
  bioBg: [
    'Мениджър с над 30 години професионален опит в областта на финансите, а понастоящем Председател на УС и ИД на Българска агенция за експортно застраховане ЕАД.'
  ],
  bioEn: [
    'TODO — превод'
  ],
  sessionDescBg: 'Представяне на инструментите, които БАЕЗ предоставя за подкрепа на експортно ориентираните фирми, както и застраховка на кредити за оборотни нужди на фирми от сегмента МСП.',
  sessionDescEn: 'TODO — превод',
  takeawaysBg: 'Българска агенция за експортно застраховане предоставя различни инструменти за споделяне риска на българските експортьори, който те поемат при продажба на отложено плащане, както и на банките при финансиране на експортни сделки и улесняване на оборотно кредитиране на фирми от МСП сегмента. В допълнение Агенцията предоставя застраховки тип гаранция, които дават възможност за замяна на банковите гаранции в страната и чужбина за участие в търг, добро изпълнение и поддръжка.',
  takeawaysEn: 'TODO — превод'
},
```

**Jeroen van Hertum** (чака трак + тема + BG превод):

```js
{
  id: 'jeroen-van-hertum', track: 'TODO',
  img: '/images/speakers/jeroen-van-hertum.jpg?v=20260910', alt: 'Jeroen van Hertum',
  objectPosition: 'center top',
  name: 'Jeroen van Hertum',
  role: 'Board Member @ Dutch Bulgarian Chamber of Commerce / Founder @ Sourcelab', // за потвърждение
  topicBg: 'TODO — тема',
  topicEn: 'TODO — тема',
  bioEn: [
    'Jeroen van Hertum serves on the board of the Dutch Bulgarian Chamber of Commerce, the bridge between the Dutch and Bulgarian business communities, where he works on cross-border technology cooperation, nearshoring and connecting Bulgarian tech to Western European markets. He is also the founder of Sourcelab, a European technology consultancy operating between Sofia and the Netherlands.',
    'Over thirty years he has built advanced digital products for startups, fintechs, banks and large enterprises, from small teams shipping fast to regulated institutions carrying real risk. Dutch by birth and based in Bulgaria since 2010, his focus is digital trust and European digital identity: eIDAS, qualified electronic signatures and the emerging EU Digital Identity Wallet. He argues that trust is becoming a business advantage rather than a compliance cost.'
  ],
  bioBg: [] // TODO — превод
},
```

**Dr. Martijn Leijten** (чака трак + тема + BG превод):

```js
{
  id: 'martijn-leijten', track: 'TODO',
  img: '/images/speakers/martijn-leijten.jpg?v=20260910', alt: 'Dr. Martijn Leijten',
  objectPosition: 'center top',
  name: 'Dr. Martijn Leijten',
  role: 'Assistant Professor @ TU Delft',
  topicBg: 'TODO — тема',
  topicEn: 'TODO — тема',
  bioEn: [
    'Dr. Martijn Leijten is an assistant professor of Organisation and Governance of the faculty of Technology, Policy and Management of Delft University of Technology (the Netherlands) and acts as scientific coordinator of Next Generation Infrastructures, a research platform of six public infrastructure providers in the field of transport, energy and drinking water in the Netherlands. He researches complex projects and technology transition processes and teaches both in academia and in the public and private sector.'
  ],
  bioBg: [] // TODO — превод
},
```

---

### Задача 2 — Качване на снимките

| Файл | Статус |
|---|---|
| `images/speakers/jeroen-van-hertum.jpg` | предстои — виж Липсваща информация |
| `images/speakers/martijn-leijten.jpg` | предстои — виж Липсваща информация |
| `images/speakers/galabin-galabov.jpg` | предстои — виж Липсваща информация |

**Формат:** JPG, ~400×533 px (portrait, 3:4), макс. 150 KB.

---

### Задача 3 — Генериране на статичните страници

Пусни Node генератора (виж `CLAUDE.md` → „Per-Speaker Pages"). Ще се генерират BG + EN страници за тримата:
- `speakers/jeroen-van-hertum/` + `en/speakers/jeroen-van-hertum/`
- `speakers/martijn-leijten/` + `en/speakers/martijn-leijten/`
- `speakers/galabin-galabov/` + `en/speakers/galabin-galabov/`

---

### Задача 4 — Обновяване на `sitemap.xml`

Добави 6 нови `<url>` блока (2 на лектор) по установения шаблон (виж как е за останалите лектори).

---

### Задача 5 — JSON-LD `performer` в `index.html` и `en/index.html`

Добави тримата като `Person` обекти в `Event.performer` масива (BG и EN). Пример за Гълъбин:

```json
{
  "@type": "Person",
  "name": "Гълъбин Гълъбов",
  "jobTitle": "Chairman of the Board & CEO",
  "worksFor": { "@type": "Organization", "name": "Bulgarian Export Insurance Agency (BAEZ)" },
  "image": "https://www.blackseatech.org/images/speakers/galabin-galabov.jpg"
}
```
(EN файлът — `"name": "Galabin Galabov"`.) Аналогично за Jeroen van Hertum и Dr. Martijn Leijten.

---

### Задача 6 — Cache-busting

Обнови `?v=` до `20260910` на `data/speakers-data.js` в `speakers.html` и `en/speakers.html`; регенерирай 52-те (сега 55) файла с генератора. Новите `<img>` вече носят `?v=20260910`.

---

## ⚠️ Липсваща информация (за колегите — да се допълни)

| # | Какво липсва | За кого | Бележка |
|---|---|---|---|
| 1 | **Тематично направление (трак)** | Jeroen van Hertum | Съдържанието клони към „Киберсигурност" (цифрова идентичност, eIDAS), но не е потвърдено. |
| 2 | **Тематично направление (трак)** | Dr. Martijn Leijten | Профил: инфраструктурни преходи + политики (транспорт/енергия/води). Кой трак? |
| 3 | **Тема на лекцията (session title, BG + EN)** | Jeroen van Hertum | Не е предоставена. |
| 4 | **Тема на лекцията (session title, BG + EN)** | Dr. Martijn Leijten | Не е предоставена. |
| 5 | **Потвърждение на позицията (role)** | Jeroen van Hertum | Board Member на камарата, или Founder на Sourcelab — кое да е водещо? |
| 6 | **Снимка** | и тримата | `jeroen-van-hertum.jpg`, `martijn-leijten.jpg`, `galabin-galabov.jpg` |
| 7 | **EN превод** на био/тема/описание/ползи | Гълъбин Гълъбов | Предоставено е само на BG. |
| 8 | **BG превод** на био | Jeroen van Hertum, Dr. Martijn Leijten | Предоставено е само на EN. |

---

## Приемателни критерии

- [ ] Тримата лектори се виждат в `speakers.html` в съответните им тракове
- [ ] BG + EN страници на тримата зареждат коректно
- [ ] Снимките се зареждат
- [ ] `sitemap.xml` съдържа 6-те нови URL-а
- [ ] JSON-LD `Event.performer` е обновен в двата `index.html`
- [ ] Няма останали `TODO` полета в `data/speakers-data.js`
- [ ] JSON-LD валидира в [Rich Results Test](https://search.google.com/test/rich-results)
