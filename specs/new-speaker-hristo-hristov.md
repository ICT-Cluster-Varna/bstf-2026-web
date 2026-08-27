# Спецификация: Добавяне на нов лектор — Христо Христов

**Дата:** 2026-08-27
**Приоритет:** Нормален
**Тип:** Ново съдържание — лектор

---

## Описание

Добавяне на нов потвърден лектор — **Христо Христов** от **TopMobility** — към сайта на CONNEXUS 2026. Лекторът е в ново тематично направление „Бъдещето на транспорта", което не съществува в текущите тракове и трябва да се създаде.

---

## Данни за лектора

| Поле | Стойност |
|---|---|
| Пълно име (BG) | Христо Христов |
| Пълно име (EN) | Hristo Hristov |
| Slug | `hristo-hristov` |
| Позиция (BG) | Търговски и оперативен мениджър @ TopMobility |
| Позиция (EN) | Commercial and Operational Manager @ TopMobility |
| Тематично направление (BG) | Бъдещето на транспорта |
| Тематично направление (EN) | Future of Transport |
| Track ID | `transport` *(нов — вижте Задача 1)* |
| Снимка | `images/speakers/hristo-hristov.jpg` *(трябва да се качи)* |

**Биография (BG):**
Христо Христов е търговски и оперативен мениджър в TopMobility с над 7 години опит във велосипедния сектор и микромобилността. Отговаря за търговското развитие, стратегическите партньорства, дигиталната услуга и изграждането на устойчив модел за градска мобилност в България.

**Биография (EN)** *(работен превод — потвърди с лектора):*
Hristo Hristov is Commercial and Operational Manager at TopMobility with over 7 years of experience in the bicycle sector and micromobility. He oversees commercial development, strategic partnerships, digital services, and the building of a sustainable urban mobility model in Bulgaria.

---

## Данни за лекцията

| Поле | Стойност |
|---|---|
| Тема (BG) | Бъдещето на мобилността: от притежанието към достъпа |
| Тема (EN) | The Future of Mobility: From Ownership to Access |

**Описание на лекцията (BG):**
Темата разглежда как се променя начинът, по който хората възприемат и използват транспорта. Все по-често фокусът се измества от притежанието на конкретно превозно средство към достъпа до различни форми на мобилност според нуждите. Ще бъдат засегнати ролята на технологиите, споделените модели, устойчивото придвижване и променящите се потребителски навици. Темата поставя въпроса как ще изглежда мобилността в бъдеще и дали достъпът постепенно ще се превърне в по-важен от собствеността.

**Описание на лекцията (EN)** *(работен превод — потвърди с лектора):*
The talk explores how the way people perceive and use transport is changing. Increasingly, the focus is shifting from owning a specific vehicle to accessing various forms of mobility based on needs. The role of technology, shared models, sustainable mobility, and changing consumer habits will be addressed. The session raises the question of what mobility will look like in the future and whether access will gradually become more important than ownership.

**Основни изводи за аудиторията (BG):**
Аудиторията ще получи по-ясна представа за това как и защо се променят моделите на мобилност и какво стои зад прехода от притежание към достъп. Ще разгледаме как технологиите, устойчивостта и новите потребителски навици влияят върху избора ни на транспорт. Участниците ще научат за предимствата на различните модели на придвижване и ще могат да преценят кога притежанието е необходимо и как достъпът до мобилността може да бъде по-гъвкав и ефективен избор.

**Основни изводи за аудиторията (EN)** *(работен превод — потвърди с лектора):*
Attendees will gain a clearer understanding of how and why mobility models are changing and what drives the transition from ownership to access. We will explore how technology, sustainability, and new consumer habits influence our transport choices. Participants will learn about the advantages of different mobility models and be able to assess when ownership is necessary and how access to mobility can be a more flexible and effective choice.

---

## Задачи

### Задача 1 — Добавяне на нов трак `transport` в `data/speakers-data.js`

**Защо:** Тематично направление „Бъдещето на транспорта / Future of Transport" **не съществува** в текущите тракове. Трябва да се добави нов елемент в масива `TRACKS`.

**Файл:** `data/speakers-data.js`

**Добави след последния елемент на `TRACKS` масива** (след `agritech`):

```js
{
  id: 'transport',
  nameBg: 'БЪДЕЩЕТО НА ТРАНСПОРТА',
  nameEn: 'FUTURE OF TRANSPORT',
  labelBg: 'Бъдеще на транспорта',
  labelEn: 'Future of Transport',
  descBg: 'Микромобилност, споделени модели и устойчиво градско придвижване',
  descEn: 'Micromobility, shared models and sustainable urban transport',
  dot: '#00cdff',
  countPluralBg: 'лектора'
},
```

---

### Задача 2 — Добавяне на лектора в `data/speakers-data.js`

**Файл:** `data/speakers-data.js` — масивът `SPEAKERS`

Добави нов обект (по същия шаблон като останалите лектори). `bioBg` е масив от параграфи; `sessionDescBg` и `takeawaysBg` са единични низове:

```js
{
  slug: 'hristo-hristov',
  track: 'transport',
  nameBg: 'Христо Христов',
  nameEn: 'Hristo Hristov',
  roleBg: 'Търговски и оперативен мениджър @ TopMobility',
  roleEn: 'Commercial and Operational Manager @ TopMobility',
  topicBg: 'Бъдещето на мобилността: от притежанието към достъпа',
  topicEn: 'The Future of Mobility: From Ownership to Access',
  img: '/images/speakers/hristo-hristov.jpg?v=20260827',
  alt: 'Христо Христов — TopMobility',
  objectPosition: 'center top',
  bioBg: [
    'Христо Христов е търговски и оперативен мениджър в TopMobility с над 7 години опит във велосипедния сектор и микромобилността. Отговаря за търговското развитие, стратегическите партньорства, дигиталната услуга и изграждането на устойчив модел за градска мобилност в България.'
  ],
  bioEn: [
    'Hristo Hristov is Commercial and Operational Manager at TopMobility with over 7 years of experience in the bicycle sector and micromobility. He oversees commercial development, strategic partnerships, digital services, and the building of a sustainable urban mobility model in Bulgaria.'
  ],
  sessionDescBg: 'Темата разглежда как се променя начинът, по който хората възприемат и използват транспорта. Все по-често фокусът се измества от притежанието на конкретно превозно средство към достъпа до различни форми на мобилност според нуждите. Ще бъдат засегнати ролята на технологиите, споделените модели, устойчивото придвижване и променящите се потребителски навици. Темата поставя въпроса как ще изглежда мобилността в бъдеще и дали достъпът постепенно ще се превърне в по-важен от собствеността.',
  sessionDescEn: 'The talk explores how the way people perceive and use transport is changing. Increasingly, the focus is shifting from owning a specific vehicle to accessing various forms of mobility based on needs. The role of technology, shared models, sustainable mobility, and changing consumer habits will be addressed. The session raises the question of what mobility will look like in the future and whether access will gradually become more important than ownership.',
  takeawaysBg: 'Аудиторията ще получи по-ясна представа за това как и защо се променят моделите на мобилност и какво стои зад прехода от притежание към достъп. Ще разгледаме как технологиите, устойчивостта и новите потребителски навици влияят върху избора ни на транспорт. Участниците ще научат за предимствата на различните модели на придвижване и ще могат да преценят кога притежанието е необходимо и как достъпът до мобилността може да бъде по-гъвкав и ефективен избор.',
  takeawaysEn: 'Attendees will gain a clearer understanding of how and why mobility models are changing and what drives the transition from ownership to access. We will explore how technology, sustainability, and new consumer habits influence our transport choices. Participants will learn about the advantages of different mobility models and be able to assess when ownership is necessary and how access to mobility can be a more flexible and effective choice.'
},
```

---

### Задача 3 — Качване на снимката на лектора

**Файл:** `images/speakers/hristo-hristov.jpg`
**Формат:** JPG, препоръчителен размер 400×533 px (portrait, 3:4), макс. 150 KB.
**Действие:** Получи снимката от лектора и я постави в `images/speakers/`.

> Ако снимката не е получена навреме, може временно да се публикуват данните без нея — провери как `renderCard()` в `speakers.html` се държи при `img: ''` преди да пуснеш генератора.

---

### Задача 4 — Генериране на статичните страници на лектора

**Файл/команда:** Пусни Node генератора за всичките 52 файла (виж `CLAUDE.md` → "Per-Speaker Pages").

**Резултат:** Ще се генерират:
- `speakers/hristo-hristov/index.html` (BG)
- `en/speakers/hristo-hristov/index.html` (EN)

**Очаквани мета данни (генерират се автоматично от генератора):**

| Поле | BG стойност | EN стойност |
|---|---|---|
| `<title>` | `Христо Христов, лектор на CONNEXUS 2026` | `Hristo Hristov, speaker at CONNEXUS 2026` |
| `meta description` | `Христо Христов, Търговски и оперативен мениджър @ TopMobility, на CONNEXUS 2026, 5-7 октомври, Варна. Тема: Бъдещето на мобилността: от притежанието към достъпа.` | `Hristo Hristov, Commercial and Operational Manager @ TopMobility, at CONNEXUS 2026, 5-7 October, Varna. Talk: The Future of Mobility: From Ownership to Access.` |
| `canonical` | `https://www.blackseatech.org/speakers/hristo-hristov/` | `https://www.blackseatech.org/en/speakers/hristo-hristov/` |
| `og:image` | `https://www.blackseatech.org/images/speakers/hristo-hristov.jpg` | ← същото |

---

### Задача 5 — Обновяване на `sitemap.xml`

**Файл:** `sitemap.xml`

Добави 2 нови `<url>` блока по същия шаблон като останалите лектори:

```xml
<url>
  <loc>https://www.blackseatech.org/speakers/hristo-hristov/</loc>
  <xhtml:link rel="alternate" hreflang="bg" href="https://www.blackseatech.org/speakers/hristo-hristov/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.blackseatech.org/en/speakers/hristo-hristov/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.blackseatech.org/speakers/hristo-hristov/"/>
</url>
<url>
  <loc>https://www.blackseatech.org/en/speakers/hristo-hristov/</loc>
  <xhtml:link rel="alternate" hreflang="bg" href="https://www.blackseatech.org/speakers/hristo-hristov/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.blackseatech.org/en/speakers/hristo-hristov/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.blackseatech.org/speakers/hristo-hristov/"/>
</url>
```

---

### Задача 6 — Обновяване на JSON-LD `performer` масива в `index.html` и `en/index.html`

В JSON-LD блока на `Event` (`#event`) добави нов `Person` обект в масива `performer`.

**`index.html` (BG):**

```json
{
  "@type": "Person",
  "name": "Христо Христов",
  "jobTitle": "Търговски и оперативен мениджър",
  "worksFor": { "@type": "Organization", "name": "TopMobility" },
  "image": "https://www.blackseatech.org/images/speakers/hristo-hristov.jpg"
}
```

**`en/index.html` (EN):**

```json
{
  "@type": "Person",
  "name": "Hristo Hristov",
  "jobTitle": "Commercial and Operational Manager",
  "worksFor": { "@type": "Organization", "name": "TopMobility" },
  "image": "https://www.blackseatech.org/images/speakers/hristo-hristov.jpg"
}
```

---

### Задача 7 — Bump на cache-busting версиите

При всяка промяна на файл, обнови `?v=` параметъра до `20260827`:

| Файл | Какво да обновиш |
|---|---|
| `speakers.html` | `?v=` на `data/speakers-data.js` |
| `en/speakers.html` | `?v=` на `../data/speakers-data.js` |
| Всички 52 генерирани `speakers/{slug}/index.html` | `?v=` на `../../../data/speakers-data.js` — **пусни генератора**, не ги редактирай на ръка |

---

## Приемателни критерии

- [ ] `https://www.blackseatech.org/speakers/hristo-hristov/` зарежда страницата на лектора
- [ ] `https://www.blackseatech.org/en/speakers/hristo-hristov/` зарежда EN версията
- [ ] Лекторът се вижда в `speakers.html` в секция „Бъдещето на транспорта"
- [ ] Снимката се зарежда коректно (`images/speakers/hristo-hristov.jpg`)
- [ ] `sitemap.xml` съдържа двата нови URL-а
- [ ] JSON-LD `Event.performer` съдържа лектора в двата `index.html` файла
- [ ] JSON-LD валидира в [Rich Results Test](https://search.google.com/test/rich-results)

---

## Бележки

- Тракът `transport` е **нов** — не съществуваше преди. `index.html` секция 5 показва 12 тематични области с икони — ако „Бъдещето на транспорта" трябва да се появи там, ще е нужна и икона (`images/streams/transport.png`) и допълнителен ред в `index.html`. Уточни с дизайнера.
- EN биографията, описанието и изводите в тази спецификация са работни преводи — потвърди с лектора или преводач преди публикуване.
- Изображението (`hristo-hristov.jpg`) трябва да се получи от лектора. Без него `renderCard()` в `speakers.html` ще рендерира карта с празен `<img>` — провери дали изглежда приемливо или добави placeholder.
