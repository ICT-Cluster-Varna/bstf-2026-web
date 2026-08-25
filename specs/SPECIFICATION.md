# Спецификация на сайта CONNEXUS 2026 (blackseatech.org)

> Документ, съставен чрез пълен обход на всички файлове в хранилището.
> Дата на съставяне: 2026-08-25. Автор: Todor Belchev.
> Всички пътища са релативни спрямо корена на сайта (`bstf-2026-web/`).
> Оригиналните текстове от сайта са запазени дословно на езика, на който са в кода.

---

## 1. Общ преглед

### 1.1 Какъв е сайтът

**CONNEXUS 2026 — Черноморски технологичен форум (Black Sea Technology Forum, BSTF)** е
презентационен/продажбен сайт на тридневна международна технологична конференция:

| Параметър | Стойност |
|---|---|
| Продуктово име | CONNEXUS 2026 |
| Алтернативни имена | Черноморски технологичен форум, Black Sea Technology Forum, BSTF 2026 |
| Дати | 5 – 7 октомври 2026 г. (старт 05.10 в 13:00, край 07.10 в 17:00, TZ +03:00) |
| Място | Хотел „Черно море“, бул. Сливница 33, Варна 9000, България (43.2049673, 27.9198957) |
| Организатор | ИКТ Клъстер Варна (ICT Cluster Varna) |
| Патронаж | Президентът на Република България Илияна Йотова |
| Домейн | https://www.blackseatech.org/ |
| Контакти | bstf@ictclustervarna.com, +359 876 658 296 |
| Соц. мрежи | LinkedIn showcase „Connexus Black Sea Tech Forum“, Facebook страница |
| Билети | Standard (Full Event) €199, VIP €399, ULTRA VIP €749 (без ДДС), продажба през urboapp.com |
| Спонсорски пакети | Expo €1 700, Silver €7 500, Gold €12 000, Stage €18 000, Institution €30 000 |

Сайтът служи за: представяне на форума и програмата, продажба на билети (външна платформа),
привличане на изложители/спонсори, представяне на лекторите, набиране на кандидатури за лектори,
и интерактивно разглеждане на изложбената зала в 3D.

### 1.2 Език на съдържанието

Двуезичен сайт с **две отделни дървета от файлове** (не runtime превод):

- **Български (основен)** — корен на сайта, `<html lang="bg">`, `<base href="/">`
- **Английски** — папка `/en/`, `<html lang="en">`, `<base href="/en/">`

Всеки текстов елемент носи атрибути `data-bg` / `data-en`; в BG дървото видимият текст е
българският, в EN дървото — английският (пре-рендериран при генериране). Функцията `setLang()`
може да превключва in-page, но реалният езиков превключвател BG/EN в навигацията навигира към
другото дърво (виж `shared/site-chrome.js` → `otherTreeLink()`).

Изключения:
- `3d-model/floorplan3d_v2.html` — визитьорските текстове са двуезични през `window.LANG`
  (от `?lang=` или `document.referrer`); редакторският панел за настройки е само на български.
- `participants.html` и `expo.html` — само български (паркирани страници, виж §3.10–3.11).

### 1.3 Технологичен профил

- **Няма build стъпка.** Чист статичен HTML/CSS/JS, качва се директно.
- **Няма нито един `.css` файл.** Целият CSS е inline в `<style>` блок в `<head>` на всяка страница.
- JavaScript е ES5-съвместим vanilla JS (без фреймуърк, без bundler), inline в страниците +
  три външни `.js` файла (`shared/site-chrome.js`, `data/speakers-data.js`, `3d-model/*.js`).
- Единственият сървърен компонент е **Classic ASP** (`send-email.asp`, JScript) на IIS.
- Хостинг: **IIS зад Cloudflare**. `web.config` е активната cache политика; `.htaccess` е инертен.
- Cache-busting: статични `?v=YYYYMMDD` низове на всяка препратка към скрипт/изображение/видео.

> ⚠️ Забележка: `CLAUDE.md` в хранилището описва `index.html` като React/Tailwind/GSAP бъндъл.
> Това **вече не отговаря на кода** — актуалният `index.html` е ръчно написан статичен HTML с
> собствен CSS и vanilla JS. Няма React, няма Tailwind, няма GSAP.

### 1.4 Дърво на проекта

```
bstf-2026-web/
├── index.html                     Начална страница (BG) — 292 KB, 7578 реда
├── speakers.html                  Списък лектори (BG)
├── sponsors.html                  Изложители и спонсорски пакети (BG)
├── speaker.html                   Redirect shim за стари #slug линкове (BG, noindex)
├── expo.html                      ПАРКИРАНА — изложение/щандове (стар дизайн)
├── participants.html              ПАРКИРАНА — „скоро“ страница
├── SPECIFICATION.md               ← този документ
├── CLAUDE.md                      Инструкции за AI агенти (частично остарели)
├── web.config                     IIS cache политика + 301 index.html → /
├── .htaccess                      Apache cache политика — ИНЕРТНА (сървърът е IIS)
├── robots.txt                     Allow: / + Sitemap
├── sitemap.xml                    58 URL-а с hreflang alternates
├── send-email.asp                 Classic ASP (JScript) → Resend API
├── resend-config.example.asp      Шаблон за API ключа (реалният файл е gitignored)
├── .gitignore
│
├── en/                            АНГЛИЙСКО ДЪРВО (огледало на BG)
│   ├── index.html
│   ├── speakers.html
│   ├── sponsors.html
│   ├── speaker.html               Redirect shim (EN)
│   └── speakers/{slug}/index.html × 26
│
├── speakers/{slug}/index.html × 26   Генерирани страници на лектори (BG)
│
├── shared/
│   └── site-chrome.js             Споделени <nav> и <footer> (рендерират се от JS)
│
├── data/
│   ├── speakers-data.js           Единствен източник на истина за лектори и тракове (108 KB)
│   └── promo-codes.json           76 партньорски промокода
│
├── 3d-model/                      Интерактивен 3D план на залата (three.js)
│   ├── floorplan3d_v2.html        176 KB — сцена, UI, редактор
│   ├── data.js                    4.6 MB — геометрия на залата (mm, сегменти)
│   ├── stands.js                  Данни за 35 щанда: наематели, нива, цени
│   ├── {company}_logo.js × 10     Лога като base64 data: URI
│   ├── Logos/                     14 растерни/векторни лога на изложители
│   └── libs/                      three.min.js, three.module.js, OrbitControls
│
├── images/                        ~110 файла (виж §6)
│   ├── speakers/                  30 портрета
│   ├── streams/                   14 икони на тематични области
│   └── _unused/                   6 архивирани изображения
│
├── videos/                        6 MP4 файла за hero фона
│
├── development/                   Проектна документация
│   ├── requirements.md            SEO/UX одит (9 препоръки, BG)
│   ├── dev-plan.md                План за изпълнение
│   └── registration-form-plan.md  План за Paysera Checkout (нереализиран)
│
├── specs/test.md                  Празен файл (0 B)
└── _deploy/                       Деплой пакет (gitignored)
    ├── _manifest.txt
    └── web.config
```

**Обобщени бройки:** 235 файла общо · 63 HTML файла · 0 CSS файла · ~110 изображения · 6 видеа.

---

## 2. Карта на сайта

### 2.1 Всички HTML страници

#### Публични, индексируеми (в `sitemap.xml`)

| # | Път | URL | Език |
|---|---|---|---|
| 1 | `index.html` | `/` | BG |
| 2 | `en/index.html` | `/en/` | EN |
| 3 | `speakers.html` | `/speakers.html` | BG |
| 4 | `en/speakers.html` | `/en/speakers.html` | EN |
| 5 | `sponsors.html` | `/sponsors.html` | BG |
| 6 | `en/sponsors.html` | `/en/sponsors.html` | EN |
| 7–32 | `speakers/{slug}/index.html` | `/speakers/{slug}/` | BG (26 бр.) |
| 33–58 | `en/speakers/{slug}/index.html` | `/en/speakers/{slug}/` | EN (26 бр.) |

Всичките 58 URL-а присъстват в `sitemap.xml`, всеки с `xhtml:link` alternates за `bg`, `en`, `x-default`.

**26-те slug-а на лектори:**
`alexander-minchev`, `andrey-lilov`, `anton-tonchev`, `cemile-usta`, `dimitar-karlovski`,
`dragomir-vatkov`, `elitsa-encheva`, `elitza-stoilova`, `georgi-dobrev`, `hristian-daskalov`,
`ilia-iordanov`, `kalina-tsolova`, `krastena-nikolova`, `kristina-bliznakova`, `kristina-eskenazi`,
`lars-frolund`, `martin-kuvandzhiev`, `michael-roux`, `oskan-tasinov`, `paul-lambert`,
`ruslan-stefanov`, `stanislav-simeonov`, `svetlin-stoyanov`, `teade-punter`, `trifon-tsekov`,
`yasen-tanev`

#### Служебни / не-индексируеми

| Път | Роля |
|---|---|
| `speaker.html` | Redirect shim, `<meta name="robots" content="noindex">` |
| `en/speaker.html` | Redirect shim (EN), noindex |
| `3d-model/floorplan3d_v2.html` | Зарежда се само в `<iframe>` от `sponsors.html` |

#### Паркирани (не са част от живия сайт)

| Път | Статус |
|---|---|
| `expo.html` | Паркирана. Стар дизайн, собствен inline nav/footer, брандинг „BSTF 2026“ вместо „CONNEXUS“. Не е в sitemap-а, не е линкната отникъде. |
| `participants.html` | Паркирана. „Скоро“ placeholder. Не е в sitemap-а, не е линкната отникъде. |

> `CLAUDE.md` изрично указва тези два файла да не се редактират и да не влизат в одити.
> Тук са описани само за пълнота на инвентара (§3.10–3.11).

### 2.2 Навигационна структура

Навигацията и footer-ът **не са в HTML-а на страниците**. Всяка страница има празни placeholder-и,
които `shared/site-chrome.js` заменя:

```html
<div id="site-nav-root"></div>
<script src="shared/site-chrome.js?v=20260824"></script>
<script>SiteChrome.renderNav('home');</script>
...
<div id="site-footer-root"></div>
<script>SiteChrome.renderFooter('home');</script>
```

Подпис: `SiteChrome.renderNav(pageKey, lang, overridePath)` —
`pageKey` ∈ `'home' | 'speakers' | 'speaker' | 'sponsors'`, `lang` ∈ `'bg' | 'en'` (по подразбиране `'bg'`),
`overridePath` се подава само от генерираните страници на лектори (напр. `'speakers/teade-punter/'`),
за да може BG⇄EN превключвателят да сочи към правилния „брат“ в другото дърво.

**Главно меню (еднакво на всички страници):**

| Линк | BG етикет | EN етикет | Href на началната | Href на вътрешните |
|---|---|---|---|---|
| program | Програма | Program | `#program` | `index.html#program` |
| speakers | Лектори | Speakers | `speakers.html` | `speakers.html` |
| sponsors | Изложители | Exhibitors | `sponsors.html` | `sponsors.html` |
| contact | Контакти | Contact | `#contact` | `index.html#contact` |

Отдясно: BG/EN превключвател, CTA бутон „**Купи Билет**“ / „**Buy Ticket**“ (`#nav-cta-btn`,
скролва до `#tickets`), hamburger бутон за мобилно меню.
Логото сочи `#` на началната и `index.html` на вътрешните страници.

**Footer (еднакъв на всички страници), 4 колони:**

1. **Бранд** — лого + „black sea tech forum“ + „Черноморски технологичен форум“ +
   „Технологии от 7-мо поколение без граници“
2. **Събитие / Event** — Програма, Лектори, Място (`#venue`), Билети (`#tickets`), Изложители, Контакти
3. **Правни / Legal** — Политика за поверителност (`privacy-policy.html`), Условия за ползване
   (`terms-and-conditions.html`)
4. **Контакт / Contact** — email с copy-бутон, телефон, LinkedIn + Facebook икони

Footer-ът има `id="contact"` — той е целта на анкера `#contact`.

### 2.3 Вътрешни връзки (граф)

```
                    ┌──────────────────────────────┐
                    │  nav / footer (site-chrome)  │  ← на всяка страница
                    └───────────────┬──────────────┘
                                    │
   index.html ◄──────────────────────┼──────────────────────► speakers.html
     │  #program #tickets #venue     │                            │
     │  #speakers #expo #sponsors    │                            │ speakers/{slug}/
     │  #contact                     │                            ▼
     │                               │                    speakers/{slug}/index.html
     ├──► speakers.html  („Виж всички лектори“)                   │
     ├──► sponsors.html  („Стани партньор →“, модал)              ├──► index.html#program
     ├──► sponsors.html#floor-plan („Виж щандовете“)              └──► speakers.html
     └──► urboapp.com   (външно, „Купи Билет“ × 3)

   sponsors.html
     ├──► 3d-model/floorplan3d_v2.html  (<iframe>, lazy, при клик)
     │      └── postMessage {type:'bstf3d', action:'reserveStand'} ──► отваря #exhibitor-modal
     ├──► sponsors.html#floor-plan
     └──► index.html#program / #tickets (footer, prefooter)

   speaker.html#{slug}  ──301(JS)──►  speakers/{slug}/
   speaker.html         ──301(JS)──►  speakers.html

   BG ⇄ EN: / ⇄ /en/ , /speakers.html ⇄ /en/speakers.html , /sponsors.html ⇄ /en/sponsors.html,
            /speakers/{slug}/ ⇄ /en/speakers/{slug}/  (query string и hash се запазват)
```

**Анкери в `index.html`:** `#program`, `#speakers`, `#sponsors`, `#expo`, `#venue`, `#tickets`,
`#cta-banner`, `#contact` (footer). Всички с `scroll-padding-top: 84px` и плавен скрол.

**Анкер в `sponsors.html`:** `#floor-plan` (на `.floor-plan-intro` параграфа).

**Анкери в `speakers.html`:** `#track-{trackId}` за всяка тематична секция (генерирани динамично).

### 2.4 Счупени връзки и страници-сираци

#### 🔴 Счупени връзки

| Връзка | Къде | Проблем |
|---|---|---|
| `privacy-policy.html` | `shared/site-chrome.js` → footer, **на всичките 58 страници** | Файлът не съществува в проекта → 404 |
| `terms-and-conditions.html` | `shared/site-chrome.js` → footer, **на всичките 58 страници** | Файлът не съществува в проекта → 404 |

#### 🟠 Разминаване в регистъра на буквите (case mismatch)

| Препратка в HTML | Реален файл |
|---|---|
| `images/streams/gaming.png` | `images/streams/Gaming.png` |
| `images/streams/tourism.png` | `images/streams/Tourism.png` |

Работи на IIS (case-insensitive файлова система), но би дало 404 при миграция към Linux/Apache/nginx
или при обслужване през case-sensitive CDN origin.

#### 🟡 Страници-сираци

| Страница | Бележка |
|---|---|
| `expo.html` | Няма нито една входяща връзка. Не е в `sitemap.xml`. Паркирана. |
| `participants.html` | Няма нито една входяща връзка. Не е в `sitemap.xml`. Паркирана. Единствената ѝ изходяща връзка е `index.html#speakers`. |
| `3d-model/floorplan3d_v2.html` | Не е сирак по замисъл — зарежда се като `<iframe>` при клик върху постера в `sponsors.html`. Не е в sitemap-а (правилно). |

#### 🟡 Други несъответствия

- `send-email.asp` мапва `companyType` кодове `sme`, `corporate`, `public`, `ngo`, докато
  `#reg-company-type` в `index.html` подава `startup`, `tech-vendor`, `tech-buyer`, `public-sector`,
  `university`, `ngo-cluster`, `investor`, `freelancer`, `other`. Само `startup` и `other` съвпадат;
  останалите се изписват в имейла като суровия код.
- `index.html` съдържа JS за поле `#reg-promo`, но **такова поле няма в регистрационната форма**.
  Промокодът работи само през URL параметъра `?promo=`.
- `expo.html` има footer линкове „Политика за поверителност“ и „Условия за ползване“ с `href="#"`.

---

## 3. Страници — детайлно

---

### 3.1 `index.html` — Начална страница (BG)

**Път:** `index.html` · **URL:** `https://www.blackseatech.org/` · **Размер:** 292 KB / 7578 реда

#### Мета данни

| Поле | Стойност |
|---|---|
| `<title>` | `CONNEXUS 2026 — Черноморски технологичен форум, Варна` |
| `meta description` | `Черноморският технологичен форум CONNEXUS, 5-7 октомври 2026 във Варна. Изкуствен интелект, киберсигурност, морски технологии и умни градове в две зали. Вземи билет.` |
| `canonical` | `https://www.blackseatech.org/` |
| `hreflang` | bg → `/`, en → `/en/`, x-default → `/` |
| `og:type` | `website` |
| `og:image` | `images/og-cover.jpg?v=20260731` (1200×630) |
| `twitter:card` | `summary_large_image` |
| `<base href>` | `/` |

**Structured data (JSON-LD), 3 блока:**
1. `Organization` — `#organization`: име CONNEXUS, alternateName масив, лого, email, телефон, `sameAs` (Facebook, LinkedIn)
2. `Event` — `#event`: дати, `eventStatus: EventScheduled`, `OfflineEventAttendanceMode`,
   `Place` (Хотел Черно море + geo), 3 × `Offer` (199/399/749 EUR, url към urboapp), `about` (11 теми),
   `performer` (масив с всичките 26 лектора: име, jobTitle, worksFor, image)
3. `WebSite` — `#website`, `publisher` → `#organization`, `about` → `#event`

#### Резюме на съдържанието

Едностранична (one-page) презентация на форума: hero с видео фон и брояч на статистики,
патронажна лента, тематични области, партньори, пълна 3-дневна програма с филтри,
съпътстващи събития, лектори, експо, място, билети и pre-footer CTA.

#### Структура на секциите

| # | Секция | CSS клас / id | Фон |
|---|---|---|---|
| 0 | Навигация | `nav.main-nav` (от site-chrome.js) | бяло/прозрачно |
| 1 | Hero | `.hero.cx-hero` | видео + градиент, `#030a11` |
| 2 | Патронажна лента | `.cx-patron-band` | бяло |
| 3 | CTA банер | `#cta-banner` | `var(--light-gray)` |
| 4 | Три зали | `.halls-section` | бяло |
| 5 | 11 тематични области | (inline) | `var(--light-gray)` |
| 6 | Партньори и спонсори | `#sponsors` | градиент `#FFFFFF → #F8FAFC` |
| 7 | 3-дневна програма | `.program-section#program` | бяло |
| 8 | Съпътстващи събития | `.side-events-section` | бяло |
| 9 | Лектори | `.speakers-section#speakers` | градиент navy → `#0d4a6e` |
| 10 | Експо | `.expo-v2#expo` | тъмно + glow |
| 11 | Място | `.venue-section#venue` | фото фон `varna_seaside_bg.jpg` |
| 12 | Билети | `.tickets-section#tickets` | бяло |
| 13 | Pre-footer CTA | `.prefooter-cta` | тъмно |
| 14 | Footer | `footer.main-footer#contact` | `var(--dark)` |
| — | 4 модала + Back-to-top + мобилен sticky CTA | | overlay |

#### Ключови текстове — дословно

**Hero (секция 1)**

- Kicker: `Хора. Идеи. Изкуствен интелект.` / EN: `People. Ideas. Artificial Intelligence.`
- **h1:** `CONNEXUS 2026 – Черноморски технологичен форум` / EN: `CONNEXUS 2026 – Black Sea Technology Forum`
- **h2:** `Свързваме хората, ускоряваме бъдещето.` / EN: `Connecting people, accelerating the future.`
  (последните две думи са в акцентен цвят — `.cx-hero-title-accent`)
- Описание: `Connexus е мястото, където визионери, предприемачи и иноватори създават връзки, които променят бизнеса и света.`
  EN: `Connexus is where visionaries, entrepreneurs and innovators build connections that change business and the world.`
- **CTA бутони:** `Купи Билет →` (`.btn-primary`, скролва до `#tickets`) · `Виж програмата ↓` (`.btn-outline`, `href="#program"`)
- Значки: `5-7 ОКТОМВРИ 2026` (икона календар) · `Хотел Черно море, Варна` (икона пин)

**Hero статистики** (анимиран count-up при влизане във viewport, `.cx-count`):

| Стойност | Етикет BG | Етикет EN | Подтекст BG |
|---|---|---|---|
| `500+` | УЧАСТНИЦИ | ATTENDEES | Лидери. Иноватори. Визионери. |
| `79 800` | РЪКОСТИСКАНИЯ | HANDSHAKES | Реални връзки. Реални възможности. |
| `40+` | ЛЕКТОРИ | SPEAKERS | Световни експерти, три зали. |
| `3 дни` | ВДЪХНОВЕНИЕ | INSPIRATION | Идеи. Стратегии. Технологии. |

- Scroll indicator: `БЪДЕЩЕТО ЗАПОЧВА ТУК` / `THE FUTURE STARTS HERE` (линк към `#program`)

**Патронажна лента (секция 2)**

Държавен герб (`images/gerp-image.png`) + два реда:
`ПОД ПАТРОНАЖА НА ПРЕЗИДЕНТА НА` / `РЕПУБЛИКА БЪЛГАРИЯ ИЛИЯНА ЙОТОВА`
EN: `UNDER THE PATRONAGE OF THE PRESIDENT OF` / `THE REPUBLIC OF BULGARIA ILIANA IOTOVA`

**CTA банер (секция 3)**

- Бутон: `ЗАПАЗИ МЯСТО` / `RESERVE A SPOT`
- **h2:** `Там, където Изтокът среща Запада.` / `Where the East Meets the West.`
- Текст: `3 дни, 11 тематични области, 30+ държави. Не пропускайте бъдещето на AI, морски технологии и умни градове.`
  EN: `3 days, 11 thematic areas, 30+ countries. Don't miss the future of AI, Marine Tech, and Smart Cities.`

**Три зали (секция 4)** — **h2:** `Три зали. Три направления.` / `Three halls. Three tracks.`

| Зала | Кратко описание | Карта |
|---|---|---|
| `Зала „България“` | `Основната сцена за хоризонтални технологии - AI, IoT, роботика, киберсигурност.` | `AI, IoT, роботизация, киберсигурност и други технологии с широко приложение.` |
| `Зала „Черно море“` | `Заедно с фоайето - домакин на изложението и стартъп зоната.` | `Фирми изложители и секция за стартъпи - демонстрации, контакти и партньорства.` |
| `Зала „Варна“` | `Паралелната програма със секторни и вертикални теми.` | `Морски технологии, биотехнологии, умно земеделие, туризъм, индустрия/производство.` |

**11 тематични области (секция 5)**

- **h2:** `11 тематични области. 3 дни. Максимална стойност.` / `11 Streams. 3 Days. Maximum Value.`
- Подзаглавие: `Изберете тема и вижте съответните акценти от програмата.` / `Click a theme to see related program highlights.`
- 12 карти в grid 4 колони (80×80 px икони):
  Изкуствен интелект · Транспорт на бъдещето · Умен град · Киберсигурност · Автоматизация и роботика ·
  AgriTech · Морски технологии · BioTech · Гейминг · Регионални иновационни политики · Туризъм · Нетуъркинг

**Партньори и спонсори (секция 6, `#sponsors`)**

- Eyebrow: `Партньори и спонсори` · **h2:** `Заедно изграждаме форума.` / `Building the forum together.`
- Редове (`.partner-row`):

| Ред | Съдържание |
|---|---|
| Патронаж | герб + `Под патронажа на президента на Република България **Илияна Йотова**` |
| `Организатори` | ИКТ Клъстер Варна · ИАНМСП · Община Варна · Brain++ AI Factory · ARC Fund |
| `Партньори` | BULTİŞAD · БАСЕЛ |
| `Мобилити партньор` | Top Rent a Car |
| `Медийни партньори` | 21 логота (виж §6.3) |

- Благодарност: `Благодарим на нашите партньори и спонсори за доверието и подкрепата.`
- CTA: `Заинтересовани от спонсорство? Разгледайте пакетите ни.` + бутон `Стани партньор →` → `sponsors.html`

**3-дневна програма (секция 7, `#program`)**

- **h2:** `3-дневна програма` / `3-Day Programme`
- Подзаглавие: `Основна програма + Секторни теми, работещи паралелно.`
- Бележка: `Програмата подлежи на постоянна актуализация.` / `The programme is subject to ongoing updates.`
- Филтърна лента `#progFilterBar`: бутон `Филтри` + панел с редове `Зала` и `Тематична област` (pill бутони,
  multi-select) + `изчисти филтрите`
- Легенда на залите: `Зала „България“` (teal) и `Зала „Варна“` (navy) — кликаеми филтри
- Grid контейнери: `#progGrid` (desktop, 3 колони), `#progGridTail`, `#progGridMobile`

Програмните данни са в JS константа `PROGRAM_DAYS` (редове 5499–5665). Структура на слот:
`{ time, kind: 'break'|'single'|'double', block?, cards: [{ room, title{bg,en}, track, detail? }] }`.

**Ден 1 — 5 октомври**

| Час | Зала | Заглавие |
|---|---|---|
| 13:00 – 13:30 | България | `Официално откриване` — 13:00–13:10 `Откриване: ключов момент за европейските иновации` (Емил Цанков, Председател на УС ICT Cluster Varna; Бойко Таков, Изп. директор ИАНМСП) · 13:10–13:30 `Ключова реч: Полюси на растеж в Черноморския регион – визия за европейски иновации, технологичен суверенитет и индустриална трансформация` (Илияна Йотова, Президент на Република България) |
| 13:30 – 14:00 | България | `Към европейска иновационна екосистема: как Европа да се конкурира и сътрудничи със САЩ и Китай` (Lars Frølund, MIT / NATO Innovation Fund; модератор Руслан Стефанов, ARC Fund) |
| 14:00 – 14:10 | — | пауза `Кафе пауза & Expo networking` |
| 14:10 – 15:30 | България | `Блок 1 (80 мин) – Регионални иновационни политики` |
| 15:30 – 15:45 | — | пауза |
| 15:45 – 17:05 | Варна | `Блок 2 (80 мин) – Регионални иновационни политики` |
| 17:05 – 17:15 | — | пауза |
| 17:15 – 17:45 | България | `Обобщаващ панел` |
| 18:00 – 20:00 | България | `Техностар Мотиватор` |
| 20:00 – 22:00 | България | `Гала коктейл – ресторант х-л „Черно море“` |

**Ден 2 — 6 октомври**

| Час | Зала България | Зала Варна |
|---|---|---|
| 09:30 – 09:50 | `Откриване и обобщение от Ден 1` | — |
| 09:50 – 10:15 | `Keynote – Съвременни предизвикателства и новите бизнес модели` | — |
| 10:15 – 10:30 | пауза | |
| 10:30 – 11:50 | `Блок 1 (80 мин) – Сигурни данни, устойчиви вериги и киберустойчив бизнес` (cybersecurity) | `Морски технологии` (marine) |
| 11:50 – 13:00 | `Пауза / Обяд / Networking` | |
| 13:00 – 14:20 | `Блок 2 (80 мин) – Управление с данни: IoT + логистика` (smart-city) | `Биотехнологии, здраве и устойчиви индустрии` (biotech) |
| 14:20 – 15:00 | пауза | |
| 15:00 – 16:05 | `Блок 3 (65 мин) – Роботика` (automation) | `Туризъм` (tourism) |
| 16:05 – 16:20 | пауза | |
| 16:20 – 16:50 | `Обобщаващ панел` | — |
| 20:00 – 22:00 | `Networking парти – ресторант х-л „Черно море“` | — |

**Ден 3 — 7 октомври**

| Час | Зала България | Зала Варна |
|---|---|---|
| 09:30 – 09:50 | `Откриване и обобщение от Ден 2` | — |
| 09:50 – 10:15 | `Keynote – Какво следва?` | — |
| 10:15 – 10:30 | пауза | |
| 10:30 – 11:50 | `Блок 1 (80 мин) – Финансиране, износ, нови пазари` | `Образование` |
| 11:50 – 13:00 | `Пауза / Обяд / Networking` | |
| 13:00 – 14:20 | `Блок 2 (80 мин) – Индустрия` | `Образование` |
| 14:20 – 15:00 | пауза | |
| 15:00 – 16:05 | `Блок 3 (65 мин) – Нови хоризонти…` | `Умно земеделие` (agritech) |
| 16:05 – 16:20 | пауза | |
| 16:20 – 17:00 | `Закриване на Черноморски технологичен форум Варна 2026` | — |

Клик върху карта със `detail` отваря `#session-modal` с подробния тайминг и лекторите.

**Съпътстващи събития (секция 8)**

- **h2:** `Съпътстващи събития, които превръщат контактите в сътрудничества.`
  EN: `Side events that turn contacts into collaborations.`
- 3 карти на времева линия:

| Дата | h3 | Описание |
|---|---|---|
| `5 октомври` | `Техностар Мотиватор` | `Вдъхновяваща сесия за стартиращи компании и предприемачи.` |
| `5 октомври вечер` | `Гала коктейл` | `Гала коктейл за нетуъркинг и забавление.` |
| `6 октомври вечер` | `Networking парти` | `Парти за нетуъркинг и забавление.` |

**Лектори (секция 9, `#speakers`)**

- **h2:** `Лектори` / `Speakers`
- Интро: `Практици, учени и стратегически лидери от региона на Черно море и света - на една сцена.`
- Бележка: `Формираме силна международна линия от практици, изследователи и институционални лидери от региона на Черно море и извън него. Очаквайте официалното обявяване на лекторите в следващите седмици.`
- Статистики: `40+` лектори · `30+` панела
- CTA: `Кандидатствай като лектор` (отваря `#speaker-modal`) · `Виж всички лектори` → `speakers.html`

**Експо (секция 10, `#expo`)**

- **h2:** `Експо зона. Зона за стартиращи компании. **Live demos.**` / `Expo Zone. Startup Zone. Live demos.`
- Описание: `Запознайте се с доставчици на решения в областта на AI, роботиката, IoT и вертикалните сектори. Стартиращите компании получават специална зона + време за представяне.`
- CTA: `Виж щандовете →` → `sponsors.html#floor-plan`
- Панел **h3:** `Изложение или представяне` с 3 реда:
  `Пакети за щандове и нива на спонсорство` · `Кандидатури за представяне на стартиращи компании са отворени` · `Часове за срещи с инвеститори`

**Място (секция 11, `#venue`)**

- **h2:** `Варна. Където **Черно море** се среща с дълбоките технологии.`
  EN: `Varna. Where the **Black Sea** meets deep tech.`
- Карта-„пропуск“: `5 - 7 октомври 2026` / `3 дни конференция` · `Хотел „Черно море“, Варна` / `България`
- Линк: `Насоки за пристигане →` → Google Maps (`Hotel+Cherno+More+Varna+Bulgaria`)
- Ивица с удобства: `Летище 15 мин` · `Хотели наблизо` · `Обществен транспорт` · `Достъпност`

**Билети (секция 12, `#tickets`)**

- **h2:** `Билети` / `Tickets` · Подзаглавие: `Изберете пропуска, който отговаря на вашите цели.`
- Grid 3 колони, всяка карта с ъглова лента `3 DAYS PASS`:

| Пакет | Цена | Период | Включва |
|---|---|---|---|
| `Standard (Full Event)` | €199 | `Стандартна цена` | Достъп до всички сцени и лекции · Достъп до изложбената зона · Дигитални материали |
| `VIP` (значка `Популярен`) | €399 | `Ограничен брой` | Всичко от Full Event · Приоритетен достъп до VIP зона · VIP обяд с лекторите |
| `ULTRA VIP` | €749 | `Ограничен брой` | Всичко от VIP билета · Гала коктейл с лектори и специални гости · VIP обяд с лектори · Достъп до Networking Party |

Всяка карта има бутон `Купи Билет` (`.bstf-ticket-buy-link`) → `https://urboapp.com/bg/e25066-connexus-black-sea-tech-forum-2026-varna/entrance`
(в EN режим се пренасочва към `/en/...`). Кликът върху карта я маркира `.active` и я запомня в `localStorage` (`bstf-selected-ticket`).

**Pre-footer CTA (секция 13)**

- **h2:** `Ще се видим във Варна.` / `See you in Varna.` · Подтекст: `5-7 окт 2026 • CONNEXUS`
- Бутони: `Регистрирай се` (скрол до `#tickets`) · `Стани изложител` (отваря `#exhibitor-modal`)

**Мобилен sticky CTA** `#bstf-mob-cta`: бутон `Регистрирай се` / `Register now`, показва се след hero-то.
**Back to top** `#bstf-btt`: стрелка ↑, появява се след 1.5× височина на екрана.

#### Изображения на страницата

| Файл | Употреба |
|---|---|
| `images/hero-poster-new.jpg` | poster на hero видеото (desktop) |
| `images/hero-poster-mobile.jpg` | poster (mobile, `data-poster-mobile`) |
| `videos/hero-bg-new-clean.mp4` | hero видео (desktop, `data-src-desktop`) |
| `videos/hero-bg-mobile-clean.mp4` | hero видео (mobile, `data-src-mobile`) |
| `images/gerp-image.png` | държавен герб (× 2 — патронажна лента и партньорски ред) |
| `images/streams/*.png` (12) | икони на тематичните области |
| `images/ict_cluster_logo.png`, `bsmepa_logo.svg`, `varna_coat.png`, `brainpp_logo.png`, `ARCF_logo.svg` | организатори |
| `images/partner-bultisad.png`, `partner-basel.png` | партньори |
| `images/mobility-partner.png` | Top Rent a Car |
| `images/media-partner-*.png/jpg/svg` (21) | медийни партньори |
| `images/varna_seaside_bg.jpg` | CSS фон на `.venue-section` |
| `images/Connexus - WHITE.svg` / `- BLACK.svg` | лого (през `site-chrome.js`) |
| `images/og-cover.jpg` | OG/Twitter card |
| `images/favicon*.png`, `favicon.ico`, `apple-touch-icon.png` | иконки |
| `images/speakers/*.jpg|png` (26) | само в JSON-LD `performer[].image` |

---

### 3.2 `en/index.html` — Начална страница (EN)

**Път:** `en/index.html` · **URL:** `/en/` · **Размер:** 284 KB

Пълно огледало на `index.html`. Разликите (≈996 diff реда) са само:

1. `<html lang="en">`, `<base href="/en/">`
2. `<title>`: `CONNEXUS 2026 — Black Sea Technology Forum, Varna`
3. `meta description`: `The Black Sea Technology Forum CONNEXUS, 5-7 October 2026 in Varna, Bulgaria. AI, cybersecurity, marine tech and smart cities across two halls. Get your ticket.`
4. `canonical`: `https://www.blackseatech.org/en/`
5. Всички относителни пътища към асети са с префикс `../` (`../images/…`, `../videos/…`, `../shared/…`)
6. Видимият текст е английската версия на `data-en` (маркъпът и `data-bg`/`data-en` атрибутите са идентични)
7. `SiteChrome.renderNav('home', 'en')` / `renderFooter('home', 'en')`

Всичко останало — секции, CSS, JS, JSON-LD структура — е идентично.

---

### 3.3 `speakers.html` — Лектори (BG)

**Път:** `speakers.html` · **URL:** `/speakers.html` · **Размер:** 76 KB

#### Мета данни

| Поле | Стойност |
|---|---|
| `<title>` | `Лектори на CONNEXUS 2026 — Черноморски технологичен форум` |
| `meta description` | `Специалисти, изследователи и институционални лидери от Черноморския регион и света в 7 тематични направления, 5-7 октомври на CONNEXUS във Варна. Виж кой ще говори.` |
| `canonical` | `https://www.blackseatech.org/speakers.html` |
| `og:image` | `images/og-cover.jpg?v=20260731` |

**JSON-LD:** `Organization` (`#organization`) + `CollectionPage` (`#webpage`) с
`itemListElement[]`, чиито `url` полета сочат `/speakers/{slug}/`.

#### Резюме

Каталог на всички лектори, групирани по тематични тракове. Картите се рендерират **изцяло от JS**
на база `data/speakers-data.js` — в HTML-а има само празни контейнери `#track-jump-nav` и `#tracks-container`.

#### Структура

1. **Page hero** (`.page-hero`)
   - Eyebrow: `CONNEXUS 2026 · ВАРНА · 5-7 ОКТОМВРИ`
   - **h1:** `Лектори` / `Speakers`
   - Описание: `Практици, учени и стратегически лидери от региона на Черно море и света.`
   - Статистики: `40+` `потвърдени лектори` · `5`→(динамично, реално 8) `тематични трака` · `3` `дни форум`
2. **`.speakers-main`** — 3 декоративни кръга + бадж икона + eyebrow `Лектори` + **h2:** `Нашите лектори` / `Our Speakers`
3. **Track jump навигация** — по един pill за всеки трак с лектори, `href="speakers.html#track-{id}"`
4. **Секции по тракове** — за всеки трак band с име, разделител и описание + grid с карти
5. **CTA:** бутон `Кандидатствай като лектор` (отваря `#speaker-modal`)
6. **Pre-footer CTA** — **h2:** `Готови ли сте за Connexus 2026?` / `Ready for Connexus 2026?`,
   подтекст `Присъединете се към водещата технологична конференция в Черноморския регион.`,
   бутони `Регистрирай се` → `index.html#tickets` и `Виж програмата` → `index.html#program`
7. **Footer** (site-chrome)
8. **2 модала:** `#register-modal`, `#speaker-modal`

#### Структура на картата (`renderCard()`)

```
<a class="spk-card" href="speakers/{slug}/">
  <div class="spk-photo"><img src={spk.img} alt={spk.alt} style="object-position:{spk.objectPosition}"></div>
  <div class="spk-body">
    <span class="spk-track">{track.label}</span>
    <div class="spk-name">{name}</div>
    <div class="spk-role">{role}</div>
    <div class="spk-topic"><div class="spk-topic-label">Тема</div><span>{topic}</span></div>
  </div>
</a>
```

#### Тракове (от `data/speakers-data.js`)

Дефинирани са **9** трака; показват се само тези с ≥1 лектор → **8** (`smart-city` е празен).

| id | Име BG | Име EN | Описание BG | Лектори |
|---|---|---|---|---|
| `ai` | ИЗКУСТВЕН ИНТЕЛЕКТ | ARTIFICIAL INTELLIGENCE | Машинно обучение, автоматизация и AI стратегии | 1 |
| `smart-city` | УМЕН ГРАД | SMART CITY | Дигитализация, иновации и градски екосистеми | **0** |
| `cybersecurity` | КИБЕРСИГУРНОСТ | CYBERSECURITY | Кибер защита, регулации и цифрова идентичност | 5 |
| `biotech` | БИОТЕХНОЛОГИИ | BIOTECH | Медицинска наука, биоинженерство и здравни иновации | 8 |
| `marine` | МОРСКИ ТЕХНОЛОГИИ | MARINE TECH | Корабостроене, морски иновации и Черноморски регион | 2 |
| `tourism` | ТУРИЗЪМ | TOURISM | Дигитализация и AI в туризма и събитийната индустрия | 2 |
| `regional-innovation-policy` | РЕГИОНАЛНИ ИНОВАЦИОННИ ПОЛИТИКИ | REGIONAL INNOVATION POLICY | Иновационни екосистеми и политики за Черноморския регион | 6 |
| `automation` | АВТОМАТИЗАЦИЯ И РОБОТИКА | AUTOMATION AND ROBOTICS | Умни системи, роботика и интеграция на IoT решения | 1 |
| `agritech` | АГРОТЕХНОЛОГИИ | AGRITECH | Технологии за прецизно и устойчиво земеделие | 1 |

Всички тракове имат `dot: '#00cdff'`.

#### Пълен списък на 26-те лектора

| # | Трак | Slug | Име (BG) | Име (EN) | Позиция | Тема (BG) |
|---|---|---|---|---|---|---|
| 1 | ai | `martin-kuvandzhiev` | Мартин Куванджиев | Martin Kuvandzhiev | Founder @ Encorp \| Co-founder, Bitcoin Gold | Blockchain, fintech и AI: следващата вълна на иновации |
| 2 | automation | `teade-punter` | Dr. Teade Punter | — | Leading Professor, AI for Society @ Fontys University | Интеграция на умни системи |
| 3 | cybersecurity | `alexander-minchev` | Александър Минчев | Alexander Minchev | Founder & MD @ AbsCloud / Abilix Soft | Физическите аспекти на сигурността на данните |
| 4 | cybersecurity | `hristian-daskalov` | д-р Христиан Даскалов | Dr. Hristian Daskalov | Cybersecurity Compliance Director \| Chair @ DIH Trakia | Европейски портфейли за цифрова самоличност: възможности и рискове |
| 5 | cybersecurity | `dragomir-vatkov` | Драгомир Вътков | Dragomir Vatkov | Lead Cyber Security Architect, SABSA | Невидимата архитектура: как основите на киберсигурността определят устойчивостта |
| 6 | cybersecurity | `yasen-tanev` | Ясен Танев | Yasen Tanev | Cybersecurity Expert @ DIH Trakia | Помощ, а не тежест: Как да превърнем регулаторните изисквания в реална киберсигурност |
| 7 | cybersecurity | `stanislav-simeonov` | Станислав Симеонов | Stanislav Simeonov | Product Manager, Cloud, IT Services & Cybersecurity @ Neterra | Киберсигурност (съвместна лекция с Александър Минчев) |
| 8 | biotech | `kristina-eskenazi` | Кристина Ешкенази | Kristina Eskenazi | Chair @ Health & Life Sciences Cluster Bulgaria | Бъдещето на здравеопазването: от изследвания към мащабни иновации |
| 9 | biotech | `dimitar-karlovski` | Димитър Карловски | Dimitar Karlovski | Founder @ Mitotopia | Митохондриите като Chi: May the Force be with you |
| 10 | biotech | `trifon-tsekov` | Трифон Цеков | Trifon Tsekov | CEO @ 3-Fi Medical | От изолирани данни до клинични доказателства: федерирано обучение в медицинския софтуер |
| 11 | biotech | `anton-tonchev` | проф. Антон Тончев | Prof. Anton Tonchev | Professor & Chair, Anatomy @ Medical University Varna | Поглед към микросвета - и отвъд него |
| 12 | biotech | `elitsa-encheva` | проф. Елица Енчева | Prof. Elitsa Encheva | Head of Radiation Oncology @ Medical University Varna | Образна диагностика и прецизно таргетиране на тумори както никога досега |
| 13 | biotech | `krastena-nikolova` | проф. Кръстена Николова | Prof. Krastena Nikolova | Full Professor of Biophysics @ Medical University Varna | Портативно аналитично устройство - химичен състав в ръцете ви |
| 14 | biotech | `kristina-bliznakova` | проф. Кристина Близнакова | Prof. Kristina Bliznakova | Associate Professor @ TU Varna \| Medical University Varna | Ранен скрининг на рак на гърдата |
| 15 | biotech | `oskan-tasinov` | доц. Оскан Тасинов | Assoc. Prof. Oskan Tasinov | Associate Professor, Molecular Biology & Biochemistry @ Medical University Varna | WineX - повече от вино |
| 16 | marine | `svetlin-stoyanov` | Светлин Стоянов | Svetlin Stoyanov | Executive Director @ MTG Dolphin Shipyard \| Chair @ BULNAS | Корабостроенето на Черно море: иновации и предизвикателства |
| 17 | marine | `cemile-usta` | Cemile Köseler Usta | — | Deputy Manager, Technology & Digitalisation @ Istanbul Chamber of Industry | Морски AI и управлявано от данни корабоплаване |
| 18 | tourism | `elitza-stoilova` | Елица Стоилова | Elitza Stoilova | Co-founder & CEO @ Umni \| AI2B Zone | AI чатботове в туризма: реален бизнес ефект |
| 19 | tourism | `andrey-lilov` | Андрей Лилов | Andrey Lilov | Co-founder & CEO @ URBO Studio | Дигитализация на туризма и събитийната индустрия |
| 20 | regional-innovation-policy | `kalina-tsolova` | Калина Цолова | Kalina Tsolova | Expert @ ARC Fund | Иновационни екосистеми и технологична устойчивост на градовете |
| 21 | regional-innovation-policy | `georgi-dobrev` | Георги Добрев | Georgi Dobrev | Analyst @ ARC Fund | Дигитализация на МСП: анализ и политики |
| 22 | regional-innovation-policy | `ruslan-stefanov` | Руслан Стефанов | Ruslan Stefanov | Director Strategy & Innovation @ ARC Fund | 20 години Innovation.bg: картата на иновациите в България |
| 23 | regional-innovation-policy | `paul-lambert` | Paul Lambert | — | Ambassador of the Kingdom of Belgium to the Republic of Bulgaria | Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион |
| 24 | regional-innovation-policy | `michael-roux` | Michaël Roux | — | Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France | Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион |
| 25 | regional-innovation-policy | `lars-frolund` | Dr. Lars Frølund | — | Lecturer @ MIT \| Strategic Advisor @ NATO Innovation Fund | Към европейска иновационна екосистема: как Европа може да се конкурира и партнира със САЩ и Китай |
| 26 | agritech | `ilia-iordanov` | Илия Йорданов | Ilia Iordanov | Co-founder @ ONDO | Технологии в земеделието - внедряване на AI |

#### Изображения

Само иконките + `og-cover.jpg`. Портретите се зареждат динамично от `data/speakers-data.js`
(`/images/speakers/{slug}.jpg`, 400×533, `loading="lazy"`).

---

### 3.4 `en/speakers.html` — Лектори (EN)

Огледало на `speakers.html`: `<base href="/en/">`, `../shared/site-chrome.js`,
`../data/speakers-data.js`, `SiteChrome.renderNav('speakers', 'en')`, английски `<title>`/description,
canonical `/en/speakers.html`. Картите сочат `speakers/{slug}/` (относително спрямо `/en/` → `/en/speakers/{slug}/`).

---

### 3.5 `speakers/{slug}/index.html` × 26 — Страници на лектори (BG)

**Пътища:** `speakers/{slug}/index.html` · **URL:** `/speakers/{slug}/` · **Размер:** 56–68 KB всяка

> ⚠️ **Тези файлове са ГЕНЕРИРАНИ, не се редактират на ръка.** Продуцират се от Node скрипт
> на база `data/speakers-data.js` (съдържание) и копие на стария `speaker.html` (CSS, модали, GTM,
> footer JS — запазени дословно като шаблонна обвивка). Промяна се прави само в
> `data/speakers-data.js`, след което се пуска генераторът за всичките 52 файла.

#### Мета данни (формула)

| Поле | Формула | Пример (`teade-punter`) |
|---|---|---|
| `<title>` | `{Name}, лектор на CONNEXUS 2026` | `Dr. Teade Punter, лектор на CONNEXUS 2026` |
| `meta description` | `{Name}, {първа клауза от позицията}, на CONNEXUS 2026, 5-7 октомври, Варна. Тема: {topic}.` | `Dr. Teade Punter, Leading Professor, AI for Society @ Fontys University, на CONNEXUS 2026, 5-7 октомври, Варна. Тема: Интеграция на умни системи.` |
| `canonical` | `https://www.blackseatech.org/speakers/{slug}/` | |
| `hreflang` | bg → `/speakers/{slug}/`, en → `/en/speakers/{slug}/`, x-default → bg | |
| `og:type` | `profile` | |
| `og:image` / `twitter:image` | портретът на лектора | `https://www.blackseatech.org/images/speakers/teade-punter.jpg` |

**JSON-LD:** `ProfilePage` (`#profilepage`) → `isPartOf` `#website`, `about` `#event`,
`mainEntity` = `Person` с `name`, `jobTitle`, `worksFor` (`Organization`), `image`, `description` (темата).

#### Структура

1. **Page hero** (`.page-hero`)
   - Линк назад: `← Всички лектори` / `← All speakers` → `speakers.html`
   - Eyebrow: името на трака (напр. `Автоматизация и роботика`)
   - **h1:** името на лектора
   - Описание: позицията
2. **`.sp-main`** → `#sp-root` → `.sp-profile[data-track]`
   - **`.sp-card`** — снимка (400×533, `loading="eager"`) + трак pill + **h2** `.sp-name` +
     `.sp-role` + `.sp-topic` (етикет `Тема на лекцията` / `Talk Topic`) +
     CTA ред: `Виж програмата` → `index.html#program`, `Всички лектори` → `speakers.html`
   - **`.sp-details`** — секции:
     - **h3:** `За лектора` / `About the speaker` → биография (1–2 параграфа, `bioBg`/`bioEn`)
     - **h3:** `За лекцията` / `About the talk` (само ако има данни) →
       `Описание на лекцията` / `Talk Description` (`sessionDescBg`/`sessionDescEn`) и
       `Основни изводи за аудиторията` / `Key Takeaways` (`takeawaysBg`/`takeawaysEn`)
3. **Pre-footer CTA** — идентичен на този в `speakers.html`
4. **Footer** — `SiteChrome.renderFooter('speaker', 'bg', 'speakers/{slug}/')`
5. **2 модала:** `#register-modal`, `#speaker-modal` (собствено копие във всеки файл)

#### Изображения

Само портретът на съответния лектор + иконките. Няма `og-cover.jpg` (OG image е портретът).

---

### 3.6 `en/speakers/{slug}/index.html` × 26 — Страници на лектори (EN)

Идентични, с:
- `<base href="/en/">`, `../shared/site-chrome.js`
- `<title>`: `{Name}, speaker at CONNEXUS 2026`
- Английски `meta description` по същата формула
- `canonical`: `/en/speakers/{slug}/`
- `SiteChrome.renderNav('speaker', 'en', 'speakers/{slug}/')`
- Видимият текст е от `data-en`

---

### 3.7 `sponsors.html` — Изложители (BG)

**Път:** `sponsors.html` · **URL:** `/sponsors.html` · **Размер:** 92 KB

#### Мета данни

| Поле | Стойност |
|---|---|
| `<title>` | `Изложители и спонсорски пакети — CONNEXUS 2026, Варна` |
| `meta description` | `Щандове от 1700 евро, интерактивен 3D план на залата, изложбена зона и стартъп секция, 5-7 октомври 2026 на CONNEXUS във Варна. Заявете участие в изложението.` |
| `canonical` | `https://www.blackseatech.org/sponsors.html` |

**JSON-LD:** `Organization` (`#organization`) + `WebPage` (`#webpage`,
`name: "Изложители и спонсорски пакети"`).

#### Структура

1. **Page hero**
   - Eyebrow: `CONNEXUS 2026 · ВАРНА · 5‑7 ОКТОМВРИ`
   - **h1:** `Изложители` / `Exhibitors`
   - Подтекст: `Станете партньор на водещия технологичен форум в Черноморския регион.`
2. **Схема на изложението** (`.floor-plan-section`)
   - Eyebrow `Изложение` · **h2:** `Схема на изложението` / `Exhibition Floor Plan`
   - Интро (`#floor-plan` — целта на анкера):
     `Разгледайте залата, щандовете и сцените отвътре - завъртете модела на 360° и изберете позицията, която пасва на вашия бранд, преди да заявите пакет.`
   - `.fp-stage` — постер `images/new-preview.jpg` (980×417) + бутон `.fp-activate`:
     значка `Интерактивен 3D модел`, надпис `Разгледай щандовете в 3D` / подтекст `Кликни за пълноекранен 3D изглед`
   - Бутон `.fp-fs` — `Цял екран`
3. **Спонсорски пакети** (`.sponsor-packages`)
   - Eyebrow `Спонсорство` · **h2:** `Спонсорски пакети` / `Sponsorship Packages`
   - 5 карти:

| Пакет | Цена | Места | Статус | Придобивки |
|---|---|---|---|---|
| `INSTITUTION` | €30,000 | `3 места` | **`Изчерпан пакет`** (`data-sold-out="true"`) | Съорганизатор на събитието · Откриващо приветствие · Лого на баджове, връзки и торбички · Лого в хедъра на сайта · Брандиране на сцена и зала · 10 мин. Keynote · Premium щанд · 2 ULTRA VIP + 4 VIP + 6 Full Event |
| `STAGE` | €18,000 | `1 място` | `Остава 1 място` | Брандиране на основната сцена · Именуване на сцена · Брандиране във VIP зала · Брандиран панел / фирмена сесия · Лого на LED екрани и дисплеи · 5 мин. Speaking slot · Premium щанд · 1 ULTRA VIP + 2 VIP + 4 Full Event |
| `GOLD` | €12,000 | `2 места` | `Остават 2 места` | Лого на LED екрани и дисплеи · Лого в сайта на събитието · Лого в програма и материали · Панелно участие · Участие на Startup / Recruitment сцена · Premium щанд · 1 VIP + 4 Full Event билети |
| `SILVER` | €7,500 | `3 места` | `Остават 2 места` | Лого на LED екрани и дисплеи · Лого в сайта на събитието · Лого в програма и материали · Участие на Startup / Recruitment сцена · Expo щанд · 1 e-mail включване · 1 VIP + 3 Full Event билети |
| `EXPO` | €1,700 | `29 места` | `Остават 6 места` | Лого в сайта на събитието · Лого в програма и материали · Expo щанд · Listing в matchmaking апликация · 1 Full Event билет |

   Всяка карта има бутон `Заявете` / `Inquire` → `openExhibitorModalForTier(tier)`.
   Изчерпаният пакет отваря `#soldout-modal` вместо формата.
4. **Сравнение на пакетите** (`.comparison-section`)
   - Eyebrow `Детайли` · **h2:** `Сравнение на пакетите` / `Package Comparison`
   - Таблица `<table class="comparison-table">` — колона `Какво получавате` + 5 колони с пакетите.
     Категории (`.cat-row`): `Брандиране и видимост`, `Участие и представяне`, `Щандове`,
     `Маркетинг и промоция`, `Включени билети`. 24 реда.
   - `#tierAccordion` — мобилна алтернатива, **изгражда се динамично от самата таблица**, за да не се разминат
   - Бележка: `* Всички цени са без ДДС.` / `* All prices are VAT excluded.`
5. **Pre-footer CTA**
   - **h2:** `Станете спонсор на CONNEXUS 2026` / `Become a CONNEXUS 2026 Sponsor`
   - `Свържете се с нас за персонализирано предложение.`
   - Бутони: `Свържете се с нас` (отваря `#contact-modal`) · `Виж изложението` → `sponsors.html#floor-plan`
6. **Footer** (site-chrome)
7. **4 модала:** `#exhibitor-modal` (`Запитване за щанд`), `#contact-modal` (`Свържете се с нас`),
   `#soldout-modal` (`Пакетът е изчерпан`), `#register-modal` (`Регистрация`)

#### Изображения

`images/new-preview.jpg` (постер на 3D сцената), `images/og-cover.jpg`, иконките.
Логата в 3D модела идват от `3d-model/Logos/` и `images/bsmepa_logo.svg`.

---

### 3.8 `en/sponsors.html` — Изложители (EN)

Огледало: `<base href="/en/">`, `../shared/site-chrome.js`, английски мета данни,
canonical `/en/sponsors.html`, `SiteChrome.renderNav('sponsors', 'en')`.
3D iframe-ът се извиква с `?lang=en`.

---

### 3.9 `speaker.html` / `en/speaker.html` — Redirect shim

**Размер:** ~1.7 KB всеки · `<meta name="robots" content="noindex">` · `<title>CONNEXUS 2026</title>`

Логика (в `<head>`, изпълнява се веднага):

```js
var rawHash = window.location.hash.replace(/^#/, '');
var id;
try { id = decodeURIComponent(rawHash); } catch (e) { id = rawHash; }
if (!id) { id = new URLSearchParams(window.location.search).get('id'); }
if (id) { window.location.replace('speakers/' + encodeURIComponent(id) + '/'); }
else    { window.location.replace('speakers.html'); }
```

`<noscript><meta http-equiv="refresh" content="0;url=speakers.html"></noscript>`

Празно `<body>` (само GTM noscript iframe). Целта е да не се счупят вече индексирани/споделени
линкове от вида `speaker.html#martin-kuvandzhiev` или `speaker.html?id=…`.

---

### 3.10 `expo.html` — ПАРКИРАНА страница

**Път:** `expo.html` · **Размер:** 48 KB · Не е в sitemap-а, няма входящи връзки.

| Поле | Стойност |
|---|---|
| `<title>` | `Изложение и щандове - BSTF 2026` |
| `meta description` | `Black Sea Technology Forum 2026 - Exhibition Floor Plan & Booth Types` |

**Структура:** собствен inline `<nav>` и `<footer>` (не използва `site-chrome.js`) →
Page hero (**h1:** `Изложение и щандове` / `Exhibition & Booths`) →
Схема на изложението (**h2:** `Схема на изложението`, постер `images/new-preview.png`,
CTA `Разгледай в интерактивен 3D` / подтекст `Завърти, приближи и влез в залата`, iframe
`3d-model/floorplan3d_v2.html?v=20260731` **без** `&lang=`) →
Pre-footer CTA (**h2:** `Готови ли сте за BSTF 2026?`, `Резервирайте своя щанд или разгледайте спонсорските пакети.`,
бутони `Запитване за щанд` и `Спонсорски пакети`) → Footer → 2 модала (`Запитване за изложители`, `Регистрация`).

**Изображения:** `images/Varna.png` (CSS фон на hero-то, opacity 0.15), `images/new-preview.png`,
`images/Connexus - BLACK.svg`, `images/Connexus - WHITE.svg`, `images/og-cover.jpg`.
`images/Varna.png` и `images/new-preview.png` се използват **само** тук.

**Разлики от живия сайт:** старо брандиране „BSTF 2026“ вместо „CONNEXUS“, езиковият превключвател
е с `<button>` вместо `<a>`, footer-ът има `href="#"` за правните страници, няма GTM-съгласуван
canonical/hreflang блок.

---

### 3.11 `participants.html` — ПАРКИРАНА страница

**Път:** `participants.html` · **Размер:** ~1.6 KB · Не е в sitemap-а, няма входящи връзки.

| Поле | Стойност |
|---|---|
| `<title>` | `BSTF2026 - Участници` |

Единствената реална страница със **собствена, различна цветова схема** (тъмна: фон `#030a11`,
акцент `#14e1d6`) и шрифтове `Space Grotesk` / `IBM Plex Mono` — остатък от по-ранна дизайн итерация.

Съдържание (цялото):
- **h1:** `Участници`
- Параграф: `Страницата с всички участници (снимки, имена и теми) ще бъде добавена скоро.`
- Линк: `Обратно към секция Лектори` → `index.html#speakers`

Съдържа GTM (script + noscript). Няма изображения.

---

### 3.12 `3d-model/floorplan3d_v2.html` — Интерактивен 3D план

**Път:** `3d-model/floorplan3d_v2.html` · **Размер:** 176 KB · `<html lang="en">` ·
`<title>Floor Plan +5.40 - 3D Model / Stand Editor</title>`

Зарежда се **само в `<iframe>`** от `sponsors.html` (`?v=20260824&lang=bg`) и `en/sponsors.html`
(`?lang=en`). Атрибути на iframe-а: `allow="fullscreen; accelerometer; gyroscope; screen-wake-lock"`,
`allowfullscreen`.

**Двуезичност:** `window.LANG` се определя в inline скрипт **преди** зареждането на `stands.js`, по:
1. `?lang=` параметъра на собствения URL;
2. fallback — `document.referrer` (ако съдържа `/en/`).
Визитьорските текстове (popup-и на щандовете) са двуезични; редакторският панел `#ui` е само на български.

**Функционалност:**
- **Loading overlay** `#loadOverlay` — `CONNEXUS 2026` + `Зареждане на 3D изложението…`, при грешка:
  `Проблем при зареждането. Проверете интернет връзката и презаредете страницата.`
- **3D сцена** (three.js): фон `0xEDF7FA`, fog, HemisphereLight + DirectionalLight (sun + fill) + PointLight-и,
  под с процедурна CanvasTexture, таван, стени, колони, щандове с лога
- **Камера/контроли:** PerspectiveCamera (fov 50) + OrbitControls с damping;
  различни mouse bindings за 3D view и Top edit
- **Режими:** `3D view` / `Top edit` · `🚶 Влез в залата` (walkthrough — WASD/мишка, Esc за изход)
- **Редакторски панел** `#ui` (скрива се/показва се с `#uiPin` / `#uiHide`):
  легенда (свободен / зает / резервиран), мащабиране на всички щандове, drag режим,
  `Export positions`, скриване/показване на стени и колони, непрозрачност на стените,
  поставяне/изтриване/ротация на мебели, `Запази изглед` / `Нулиране`
- **Резервация на щанд:** popup „Резервирай щанд“ изпраща към родителя
  `postMessage({ type: 'bstf3d', action: 'reserveStand', stand, tier, price }, window.location.origin)`.
  `sponsors.html` го прихваща, излиза от fullscreen, отваря `#exhibitor-modal`, задава
  `#exhibitor-tier = 'expo'` и попълва `#exhibitor-notes` с
  `Щанд № {n} - {tier} позиция (€{price})` / EN `Booth no. {n} - {tier} position (€{price})`.

**Данни за щандовете (`stands.js`):** 35 щанда.

| № | Ниво | Цена | Premium |
|---|---|---|---|
| 1 | Stage Partner (`#8064A2`) | €18 000 | да |
| 2, 3 | Gold Partner (`#BF9000`) | €12 000 | да |
| 4, 5 | Silver Partner (`#7F7F7F`) | €7 500 | не |
| 6–35 | Expo (`#548235`) | €1 700 | не |

Заети/резервирани щандове: 2 (`Резервиран за пакет Gold Partner`), 4 (`Резервиран за пакет Silver Partner`),
6 Top-Rent-A-Car, 7 ResearchMetrics, 8 ITRM Consult, 9 DXC, 10 SIS Technology, 11 Omnilinx,
12 Netpeak & PR Market, 13 Electrohold, 17–35 ИАНМСП / BSMEPA.

---

## 4. Дизайн

### 4.1 Цветова палитра

CSS custom properties, дефинирани идентично в `:root` на `index.html`, `speakers.html`,
`sponsors.html` и всяка страница на лектор:

| Променлива | Hex | Роля |
|---|---|---|
| `--navy` | `#0B3954` | основен тъмносин — заглавия, тъмни фонове |
| `--navy-deep` | `#0d4a6e` | по-светъл край на navy градиентите |
| `--teal` | `#00cdff` | акцент — CTA, подчертавания, hover |
| `--teal-contrast` | `#006d8f` | достъпен вариант на teal върху светъл фон (текст, outline бутони) |
| `--teal-deep` | `#00a0cc` | долен край на teal градиентите |
| `--light-blue` | `#EDF7FA` | светли карти, фон на 3D сцената |
| `--white` | `#FFFFFF` | основен фон |
| `--light-gray` | `#F5F7F9` | алтерниращ фон на секции, scrollbar track |
| `--dark` | `#1a1a2e` | фон на footer-а |
| `--text` | `#333` | основен текст |
| `--text-light` | `#666` | вторичен текст |

**Допълнителни hex стойности, срещани директно в CSS:**

| Hex | Употреба |
|---|---|
| `#33d6ff` | hover на `.btn-primary` (горен край на градиента) |
| `#f4fafb` | долен край на `.btn-white` градиента |
| `#f8fafc` | долен край на фона на `#sponsors` |
| `#c0392b` | цвят на съобщенията за грешка във формите |
| `#ff6b6b` | акцент при невалидно поле |
| `#146672`, `#1a5c7a`, `#1f4e78`, `#0d3852` | нюанси в тъмните секции/градиенти |
| `#030a11` | фон на hero-то (под видеото) и на `participants.html` |
| `#d0ebf1`, `#e2e8ee`, `#f0f4f7` | светли бордюри/разделители |
| `#6ee0eb` | светъл teal акцент |
| `#8a8f98`, `#6c757d`, `#bbb`, `#ccc`, `#ddd` | сиви нюанси |
| `#8064A2`, `#BF9000`, `#7F7F7F`, `#548235` | нива на щандовете в 3D модела (Stage/Gold/Silver/Expo) |
| `#14e1d6` | акцент само в `participants.html` (наследен) |

**Сенки и градиенти:**

```css
--shadow:       0 4px 20px rgba(0, 0, 0, 0.08);
--shadow-lg:    0 8px 40px rgba(0, 0, 0, 0.12);
--shadow-modal: inset 0 1px 0 rgba(255,255,255,0.7),
                0 8px 20px rgba(11,57,84,0.12),
                0 30px 64px rgba(11,57,84,0.2);
--dot-grid:     radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0);
```

Scrollbar: 11 px, thumb с градиент `linear-gradient(180deg, var(--teal), var(--navy))`, radius 20 px,
3 px рамка в цвета на track-а. `::selection` — фон `--teal`, текст `--white`.

### 4.2 Шрифтове

| Роля | `font-family` | Тегла | Източник |
|---|---|---|---|
| **Заглавия** (h1–h6, лого, nav CTA) | `'hyperspace-race-variable', 'myriad-pro', 'Archivo', sans-serif` | 800, `font-variation-settings: 'wdth' 140` | Adobe Typekit `oqj4tys` (fallback Archivo от Google Fonts) |
| **Основен текст** (body) | `'Inter', sans-serif` | 400–900 | Google Fonts |
| **Моноспейс** (`--mono`) — eyebrow-и, етикети, таймери | `'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace` | 400, 500, 600 | Google Fonts |
| `participants.html` (само) | `'Space Grotesk', sans-serif` + `'IBM Plex Mono'` | — | не се зарежда (fallback) |

**Зареждане** (еднакво на всички живи страници):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://use.typekit.net/oqj4tys.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://use.typekit.net/oqj4tys.css"></noscript>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900
      &family=Archivo:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
      as="style" onload="this.onload=null;this.rel='stylesheet'">
```

Страниците на лектори зареждат по-лек набор: `Inter:wght@400;500;600;700` + `IBM Plex Mono`.

**Типографски размери (ключови):**

| Селектор | Размер |
|---|---|
| `body` | 16 px, `line-height: 1.6` |
| `h1–h6` | `line-height: 1.2`, `font-weight: 800` |
| `.section-title` (index) | `2.5rem`, `font-style: italic`, `text-wrap: balance` |
| `.section-title` (speakers/sponsors) | `clamp(1.7rem, 3vw, 2.2rem)`, italic |
| `.section-subtitle` | `1.125rem` |
| `.section-eyebrow` | `0.75rem`, mono, `letter-spacing: 0.14em`, uppercase |
| `.btn` | `1rem`, `font-weight: 600` |
| `.btn-sm` | `0.875rem` |
| `nav .nav-links a` | `0.9rem`, `font-weight: 500` |
| `.cx-nav-tagline` | `9px`, `letter-spacing: 0.6em` |
| `.stream-card` етикет | `0.9rem`, `font-weight: 600` |

### 4.3 Лейаут система

**Контейнер:** `.container { max-width: 1200px; margin: 0 auto; padding: 0 24px }`

**Reset:** `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }`,
`img { max-width: 100%; display: block }`, `ul { list-style: none }`,
`a { text-decoration: none; color: inherit }`.

**Скрол:** `html { scroll-padding-top: 84px }` + `scroll-behavior: smooth`
(в `index.html` — само при `@media (prefers-reduced-motion: no-preference)`).

**Grid / Flexbox — къде какво:**

| Секция | Техника |
|---|---|
| Hero | flex колона, `height: 100vh/100dvh` |
| Статистики в hero | flex ред (`.cx-hero-stats`), wrap на мобилен |
| Тематични области | `grid-template-columns: repeat(4, 1fr)`, gap 24 px, `max-width: 1100px` |
| Билети | `grid-template-columns: repeat(3, 1fr)` |
| Три зали | flex редове с `gap: 60px`, `flex: 1` за двете колони |
| Партньори | flex-wrap логотипи в `.partner-row__logos` |
| Програма (desktop) | `grid-template-columns: repeat(3, 1fr)`, `gap: 10px 32px`, `align-items: start` |
| Програма (mobile) | линеен списък `#progGridMobile` |
| Експо | 2-колонен `.expo-v2__inner` |
| Карти на лектори | `.spk-grid` (auto-fill grid) |
| Footer | `.footer-grid` — 4 колони |
| Сравнителна таблица | `<table>` + акордеон-заместител на мобилен |

**Breakpoints (mobile-адаптация чрез `max-width`, десктоп-first за някои блокове):**

| Заявка | Употреба |
|---|---|
| `@media (min-width: 640px)` | `.hero-desc-break` |
| `@media (max-width: 640px)` | фини корекции |
| `@media (max-width: 480px)` / `(max-width: 520px)` | най-малки екрани |
| `@media (max-width: 540px)` / `(max-width: 560px)` | карти на лектори |
| **`@media (max-width: 768px)`** | **основният мобилен breakpoint** (9 блока в `index.html`) |
| `@media (min-width: 769px)` | десктоп-only правила |
| `@media (min-width: 769px) and (max-width: 900px)` | таблети |
| `@media (max-width: 860px)` / `(max-width: 900px)` | hero band, nav |
| `@media (min-width: 901px)` | пълен hero |
| `@media (max-width: 960px)` / `(max-width: 1000px)` | програмата пада на 1 колона |
| `@media (max-width: 1024px)` / `(max-width: 1280px)` | междинни |
| `@media (min-width: 1600px)` | много широки екрани |
| `@media (prefers-reduced-motion: reduce)` | изключва анимации на модали и reveal |
| `@media (hover: none)` | тъч устройства (sponsors, speakers) |

**Responsive поведение (обобщено):**
- `≤ 900 px` — hero видеото се сменя с вертикалния клип, parallax се изключва, hero-то става
  къса лента; nav линковете се скриват в hamburger меню
- `≤ 1000 px` — 3-колонната програма става една колона (мобилен линеен рендер)
- `≤ 768 px` — контейнерите намаляват padding-а, grid-овете колабират, появява се
  мобилният sticky CTA, back-to-top се вдига на `bottom: 5rem`
- Сравнителната таблица в `sponsors.html` се заменя с акордеон

**View transitions** (само `sponsors.html`):

```css
@view-transition { navigation: auto }
::view-transition-group(root) { animation-duration: .45s; animation-timing-function: var(--ease-premium) }
```

### 4.4 Повтарящи се UI компоненти

**Бутони**

```css
.btn         { display:inline-flex; align-items:center; justify-content:center;
               padding:14px 32px; border-radius:var(--radius); font-weight:600; font-size:1rem }
.btn-primary { background:linear-gradient(155deg, var(--teal) 0%, var(--teal-deep) 100%);
               color:var(--white);
               box-shadow:0 1px 0 rgba(255,255,255,.25) inset, 0 8px 20px rgba(0,160,204,.28) }
.btn-outline { border:2px solid var(--teal-contrast); color:var(--teal-contrast);
               background:rgba(0,205,255,.03) }
.btn-white   { background:linear-gradient(155deg, #fff 0%, #f4fafb 100%); color:var(--navy) }
.btn-sm      { padding:10px 20px; font-size:.875rem }
.btn:active  { transform:scale(.97); opacity:.85 }
```

Hover на всички: `transform: translateY(-2px)` + по-силна сянка.

**Навигация** (`nav.main-nav`)
- `position: fixed`, `z-index: 200`, височина 72 px, `padding: 0 32px`
- Фон `rgba(255,255,255,0.97)` + `backdrop-filter: blur(12px)` + долна рамка `rgba(0,0,0,0.06)`
- На началната страница логото е двойно (бяло над hero-то, черно след скрол — `.cx-nav-logo-img--white/--black`)
- Логото има таглайн „black sea tech forum“ с `letter-spacing: 0.6em`
- Мобилно меню: `.mobile-nav` (slide-in) + `.mobile-nav-backdrop`; hamburger се превръща в „×“

**Секционни глави** (последователен ритъм на `speakers.html` / `sponsors.html`):
`.section-badge` (44 px кръг с radial-gradient и SVG икона) → `.section-eyebrow`
(mono, uppercase, с хоризонтални линии от двете страни през `::before`/`::after`) →
`.section-title` → `.section-rule` (44×3 px teal градиент).

**Карти**
- `.hall-card` — светлосин фон, `border-left: 4px solid var(--teal)`, radius 12 px
- `.stream-card` — центрирана, 80×80 икона, hover lift
- `.ticket-card` — ъглова лента `3 DAYS PASS`, опционална значка `Популярен`,
  `.active` състояние с teal outline при клик
- `.sponsor-card.tier-{name}` — per-tier акцентен цвят, `data-sold-out` състояние
- `.spk-card` / `.sp-card` — снимка 400×533 с `object-position` per lector, трак pill, име, роля, тема
- `.event-card` — на времева линия с точки (`.events-timeline__rail`)
- `.partner-row` — етикет / вертикален разделител / логотипна редица

**Модали**
- `.modal-overlay` (`.open`) + `.modal[role="dialog"][aria-modal="true"][tabindex="-1"]`
- Затварящ бутон `.modal-close` (`&times;`), `aria-label="Close"`
- Tab focus trap (`bstfGetFocusable`), Esc затваря, клик върху overlay-а затваря
- `.modal-eyebrow` → `<h2>` → `.modal-desc` → `.modal-form` → `.modal-success`
- В `index.html` модалът има допълнителна затваряща анимация през клас `.closing`
- Под `prefers-reduced-motion: reduce` анимациите се изключват

**Микро-взаимодействия**
- `.animate-on-scroll` — IntersectionObserver reveal с каскаден `transition-delay`
  (`min(idx, 6) * 0.05s`), еднократно, добавя `.cx-reveal-done`
- `.cx-count` — count-up анимация (1800 ms, easeOutCubic), с групиране на хилядите
- `.copy-email-btn` — копира имейла (Clipboard API + `execCommand` fallback), показва `Копирано!` за 1800 ms
- `.page-exit` — 120 ms fade преди навигация към друга вътрешна страница
- `.bg-glow-left` / `.bg-glow-right` — декоративни radial glow-ове в тъмните секции

**Easing:** `--ease-premium: cubic-bezier(0.16, 1, 0.3, 1)`;
`--transition: 0.3s var(--ease-premium)`, `--transition-fast: 0.15s var(--ease-premium)`.

**Радиуси:** `--radius: 12px`, `--radius-sm: 8px`, `--radius-lg: 20px`.

---

## 5. Техническа част

### 5.1 CSS файлове

**Проектът няма нито един самостоятелен `.css` файл.** Целият CSS е inline `<style>` в `<head>`:

| Файл | Редове CSS | Какво покрива |
|---|---|---|
| `index.html` | 488 – 4776 (≈4290 реда) | Пълната дизайн система: `:root` променливи, reset, типография, `.container`, бутони, навигация + мобилно меню, hero (видео/parallax/статистики), патронажна лента, зали, тематични области, партньори, цялата програмна решетка (`.prog-*`), съпътстващи събития, лектори, експо, място, билети, prefooter, footer, всички модали, back-to-top, мобилен sticky CTA, `.animate-on-scroll` |
| `en/index.html` | ≈ същите | Идентично копие |
| `speakers.html` | 52 – 1578 (≈1526 реда) | Reset + палитра, `.page-hero`, `.hero-stats-strip`, `.speakers-main` + декоративни кръгове, `.section-badge/eyebrow/title/rule`, `.track-jump-nav`, `.track-band`, `.spk-grid` / `.spk-card`, `.apply-cta-wrap`, prefooter, footer, 2 модала |
| `en/speakers.html` | ≈ същите | Идентично |
| `sponsors.html` | 45 – 322 (компактен, минифициран стил) | Reset + палитра, view transitions, `.page-hero`, `.floor-plan-section` + `.fp-*` (постер/активатор/fullscreen/iframe), `.sponsor-cards` + `.tier-*`, `.comparison-table`, `.tier-accordion`, prefooter, footer, 4 модала |
| `en/sponsors.html` | ≈ същите | Идентично |
| `speakers/{slug}/index.html` × 26 | 50 – 1287 (≈1237 реда) | Наследено от стария `speaker.html` шаблон: reset + палитра, `.page-hero` + `.back-to-speakers`, `.sp-main` / `.sp-profile` / `.sp-card` / `.sp-photo` / `.sp-details` / `.sp-section`, prefooter, footer, 2 модала |
| `en/speakers/{slug}/index.html` × 26 | ≈ същите | Идентично |
| `expo.html` | 20 – 207 | Паркирана: собствени nav/footer стилове, `.page-hero` с `Varna.png` фон, `.fp-*` |
| `participants.html` | 17 – 25 | 5 правила: тъмна тема, центриран `.box` |
| `3d-model/floorplan3d_v2.html` | 21 – 896 | Loading overlay, редакторски панел `#ui`, popup-и на щандовете, walkthrough hint, модал за export |

**Следствие:** промяна в дизайн системата изисква редакция във всичките ~60 файла
(за 52-та генерирани — през генератора).

### 5.2 JavaScript файлове

#### Външни `.js` файлове

| Файл | Размер | Какво прави |
|---|---|---|
| **`shared/site-chrome.js`** | 16 KB | Единствен източник на `<nav>` и `<footer>`. IIFE, публикува `window.SiteChrome = { renderNav, renderFooter }`. Съдържа: `PAGES` конфигурация по `pageKey`, `PAGE_FILE` мапинг, `pick(bg, en, lang)` за езика, `href(cfg, anchor)` (in-page анкер vs `index.html#anchor`), `escAttr()` за екраниране (href-овете съдържат `location.search`/`hash`, т.е. вход от URL-а), `otherTreeLink()` за BG⇄EN линка (запазва query string и hash), `langToggleHtml()`, `navLinksHtml()`, `logoHtml()` (двойно лого само на home). Заменя placeholder-ите чрез `outerHTML`. Footer-ът включва текущата година през `new Date().getFullYear()`. |
| **`data/speakers-data.js`** | 108 KB | IIFE над `window`. Експортира `BSTF_TRACKS` (9 трака), `BSTF_SPEAKERS` (26 лектора), и helper-ите `bstfGetTrack(id)`, `bstfGetSpeaker(id)`, `bstfSpeakersByTrack(trackId)`. Зарежда се като обикновен `<script>` (не модул), за да работи и през `file://`. Поле по лектор: `id`, `track`, `img`, `alt`, `objectPosition`, `name`, `nameEn`, `role`, `roleEn`, `topicBg`, `topicEn`, `bioBg[]`, `bioEn[]`, `sessionDescBg/En`, `takeawaysBg/En`. |
| **`3d-model/stands.js`** | 12 KB | `window.STANDS_DATA = { exhibitors: {…}, stand_info: {…} }` — 35 щанда, наематели, лога, статус (`free`/`occupied`/`reserved`/`partner`), ниво, цена, двуезични списъци с придобивки (`DESC_STAGE/GOLD/SILVER/EXPO`, избрани по `window.LANG`). |
| **`3d-model/data.js`** | 4.6 MB | `var DATA = { units:"mm", bounds:[…], segments:{ wall:[…], … } }` — геометрия на залата, експортирана от CAD. |
| **`3d-model/{company}_logo.js`** × 10 | 4–52 KB | По един файл на изложител: `window.{NAME}_LOGO_SRC = 'data:image/svg+xml;base64,…'`. Файлове: `bsmepa_logo.js`, `dxc_logo.js`, `electrohold_logo.js`, `nearshore_logo.js`, `netpeak_logo.js`, `omnilinx_logo.js`, `researchmetrics_logo.js`, `sistechnology_logo.js`, `toprentacar_logo.js`. |
| **`3d-model/libs/three.min.js`** | 656 KB | three.js (глобален build) |
| **`3d-model/libs/three.module.js`** | 1.2 MB | three.js (ES module build) — **не се зарежда от `floorplan3d_v2.html`** |
| **`3d-model/libs/OrbitControls-global.js`** | 24 KB | OrbitControls (глобален) — това се зарежда |
| **`3d-model/libs/controls/OrbitControls.js`** | 32 KB | ES-module вариант — не се зарежда |

#### Inline скриптове в `index.html`

**Блок 1 — програмна решетка (редове 5481–6056)**

- `PROGRAM_TRACKS` — 9 филтруеми тематични области
- `PROGRAM_DAYS` — 3 дни × слотове (източник на истина за програмата)
- IIFE `renderProgramTimeline()`:
  - Филтърна лента: toggle с auto-close след 1100 ms пауза (multi-select пилюли),
    badge с брой активни филтри, `изчисти филтрите`
  - Филтър по зала (`state.hall`) и multi-select по тракове (`state.tracks`)
  - `buildHeaderCell()`, `buildSlotCell()`, `cardMatches()`
  - `commonPrefixLength()` — намира колко начални слота са с еднакъв тип във всичките 3 дни,
    за да ги подравни в обща grid решетка; останалите отиват в `#progGridTail`
  - `renderDesktopAligned()`, `renderDesktopTail()`, `renderMobileLinear()`, `equalizeTailRows()`
  - resize handler с 150 ms debounce
  - Публикува `window.bstfSetProgramTrack(trackId)` — за пре-филтриране отвън
  - Кликаема карта отваря `window.openSessionModal(card, day)`; поддържа и клавиатура

**Блок 2 — главен скрипт (редове 6648–7576), един IIFE в `'use strict'`**

| Подсистема | Какво прави |
|---|---|
| **Промокодове** | `bstfGetUrlPromo()` чете `?promo=`; `fetch('data/promo-codes.json')` (без `?v=`); `bstfFindPromo(code)`; `applyPromoDisplay(code)` — идемпотентно преизчислява цените на билетите: зачертава старата, показва новата, добавя `Вашата отстъпка: N%` и `Осигурено от <b>{компания}</b>`. Ако кодът е празен/невалиден — връща цените в изходно състояние. |
| **Език** | `setLang(lang)` — записва `localStorage['bstf-lang']`, сменя `documentElement.lang`, обхожда `[data-bg][data-en]` и подменя `innerHTML` (или `placeholder` за input/textarea), обновява `<option>` текстовете, пренасочва `.bstf-ticket-buy-link` към BG/EN версията на urboapp. |
| **Мобилно меню** | Отваряне/затваряне, backdrop, затваряне при клик върху линк, промяна на фона на nav при скрол |
| **Hero видео** | Избира desktop/mobile източник и постер според `matchMedia('(max-width: 900px)')`; при `saveData`/2G или `prefers-reduced-motion` изобщо не зарежда видео; IntersectionObserver пауза/възобновяване извън екрана (без рестарт от кадър 0); rAF-throttled parallax (`translate3d(0, 0→12%, 0) scale(1.06→1.12)`) само на десктоп; пре-синхронизира се при преминаване на breakpoint-а |
| **Плавен скрол** | Прихваща `a[href^="#"]`, скролва и обновява hash-а с `history.replaceState` |
| **Избор на билет** | Клик върху `.ticket-card` → `.active` + запис в `localStorage`; възстановява избора при зареждане |
| **Модали** | `openModal(id, ticketType)`, `closeModal(id)` (с `.closing` анимация и `animationend`/timeout fallback), `bstfGetFocusable()` + Tab focus trap, Esc и клик върху overlay затварят |
| **Session модал** | `renderSessionDetail(card)` + `openSessionModal(card, day)` — рендерира подробния тайминг, лекторите (с инициали чрез `personInitials()`), модератори и бележки |
| **Валидация** | `BSTF_NAME_PATTERN` (латиница + кирилица, ≥2 букви на дума), `BSTF_EMAIL_PATTERN`, телефон: `/^(\+[1-9]\d{6,14}\|0\d{6,11})$/` + отхвърля еднакви цифри. Грешките се показват в `.form-error[role="alert"]`, полето получава `.field-invalid` + `aria-invalid` |
| **Изпращане** | `bstfSubmitForm(fields, btn, errorId, formId, successId)` → `fetch('send-email.asp', {method:'POST', 'application/x-www-form-urlencoded'})`, бутонът показва `Изпращане...` / `Sending...`, при `{success:true}` формата се скрива и се показва success панелът |
| **Копиране на имейл** | Clipboard API с `execCommand('copy')` fallback |
| **Page transitions** | `.page-exit` клас + 120 ms забавяне преди навигация (пропуска `#`, `mailto:`, `tel:`, `target=_blank`, Ctrl/Cmd/Shift клик) |
| **Scroll spy** | IntersectionObserver с `rootMargin: '-30% 0px -60% 0px'` подсветява активния nav линк и **синхронизира hash-а на BG/EN линка**, за да се приземиш на същата секция след смяна на езика |
| **Back to top** | Показва се след `scrollY > innerHeight * 1.5` |
| **Мобилен sticky CTA** | IntersectionObserver върху hero-то (само при `innerWidth < 769`) |
| **Reveal анимации** | IntersectionObserver `threshold: 0.1`, `rootMargin: '0px 0px -50px 0px'`, каскаден delay |
| **Count-up** | 1800 ms easeOutCubic, `threshold: 0.4`, форматиране с групиране на хилядите |
| **bfcache fix** | `window.addEventListener('pageshow', e => { if (e.persisted) location.reload() })` |

> Бележка в кода: предишната GSAP ScrollTrigger секция е **премахната** — дублирала е reveal-а,
> игнорирала е `prefers-reduced-motion` и е теглела ~70 KB CDN скрипт за тривиален opacity преход.

#### Inline скриптове в `speakers.html`

IIFE, който чете `window.BSTF_TRACKS` / `bstfSpeakersByTrack()`, филтрира траковете с ≥1 лектор
и рендерира `#track-jump-nav` и `#tracks-container` чрез `renderTrackJump()`, `renderTrackSection()`,
`renderCard()` (с `esc()` за екраниране). Обновява `#stat-speakers` (`'40+'`) и `#stat-tracks`
(реалния брой тракове). Отделен блок съдържа `setLang`, модалите, focus trap, валидацията и
`bstfSubmitForm` (същата логика като в `index.html`).

#### Inline скриптове в `sponsors.html`

| Подсистема | Какво прави |
|---|---|
| **Tier акордеон** | Изгражда `#tierAccordion` **от живата `.comparison-table`** (`copyDataAttrs()` пренася `data-bg`/`data-en`), така че мобилният изглед никога не се разминава с таблицата |
| **3D iframe** | Lazy: при клик върху `.fp-activate` създава `<iframe src="3d-model/floorplan3d_v2.html?v=20260824&lang=bg">`, влиза във fullscreen (валиден user gesture), премахва постера след 700 ms |
| **postMessage мост** | Слуша `message` с проверка `ev.origin !== window.location.origin`; при `{type:'bstf3d', action:'reserveStand'}` излиза от fullscreen, отваря `#exhibitor-modal`, задава пакета и попълва бележките с номера/нивото/цената на щанда |
| **Модали** | `openModal`, `closeModal`, `openContactModal(packageName)`, `openExhibitorModalForTier(tier)` (изчерпаните нива отиват към `#soldout-modal`), focus trap |
| **Форми** | `submitRegister()`, `submitExhibitor()` → `bstfSubmitForm()` → `send-email.asp` |
| **Останало** | `setLang`, copy-email, `.animate-on-scroll` observer |

#### Inline скриптове в `speakers/{slug}/index.html`

Наследени дословно от стария `speaker.html` шаблон: `setLang` (с два статично зададени
`document.title` низа — BG и EN, без runtime lookup), мобилно меню, модали + focus trap,
валидация, `bstfSubmitForm`, copy-email, reveal observer.

### 5.3 Форми

Всички форми са реални `<form>` елементи с `type="submit"` бутони — така native `required` /
`type="email"` валидацията се задейства преди JS логиката. Всички изпращат
`POST application/x-www-form-urlencoded` към **`send-email.asp`** и очакват JSON `{success, message}`.

#### A. Регистрация — `#register-modal` / `#register-form` → `submitRegister()`

Присъства в: `index.html`, `en/index.html`, `speakers.html`, `en/speakers.html`,
`sponsors.html`, `en/sponsors.html`, всичките 52 страници на лектори, `expo.html`.

- Eyebrow: `CONNEXUS 2026 · 5-7 ОКТ · ВАРНА` · **h2:** `Регистрация` / `Registration`

| Поле | id | Тип | Задължително | Placeholder / опции |
|---|---|---|---|---|
| `Име и фамилия` / `Full Name` | `reg-name` | text | ✔ | `John Doe` |
| `Имейл` / `Email` | `reg-email` | email | ✔ | `john@example.com` |
| `Телефон` / `Phone` | `reg-phone` | tel (`inputmode="tel"`) | ✔ | `+359 ...` |
| `Тип билет` / `Ticket Type` | `reg-ticket` | select | — | `standard` / `vip` / `ultra-vip` (с цени в етикета) |
| `Тип компания` / `Company Type` | `reg-company-type` | select | — | (празно) `Изберете (незадължително)`, `startup` Стартъп (до 5 г.), `tech-vendor` Технологична компания / доставчик, `tech-buyer` Компания – краен потребител на технологии, `public-sector` Държавна или общинска администрация, `university` Университет / научна организация, `ngo-cluster` НПО / клъстер / браншова организация, `investor` Инвеститор / фонд / акселератор, `freelancer` Свободна практика / консултант, `other` Друго |

- Submit: `Регистрирай се` / `Register`
- Изпращани полета: `formType=register`, `name`, `email`, `phone`, `ticket`, `companyType`,
  `promoCode`, `promoSource` (`url`\|`form`\|`none`), `promoCompany`, `promoDiscountPercent`,
  `promoDiscountVisible`
- Success (`#register-success`): ✓ `Регистрацията е успешна!` / `Ще се свържем с вас скоро.` +
  `Или се свържете директно:` bstf@ictclustervarna.com / +359 876 658 296 + бутон `Затвори`
- Съобщения за грешка (BG / EN):
  `Моля, въведете истинско име (само букви).` / `Please enter your real name (letters only).`
  `Моля, въведете валиден имейл адрес.` / `Please enter a valid email address.`
  `Моля, въведете валиден телефонен номер (само цифри, 8-15 символа).` / `Please enter a valid phone number (digits only, 8-15 characters).`
  `Възникна грешка. Моля, опитайте отново.` / `Something went wrong. Please try again.`

#### B. Изложител (index) — `#exhibitor-modal` / `#exhibitor-form` → `submitExhibitor()`

- Eyebrow: `CONNEXUS 2026 · ИЗЛОЖЕНИЕ` · **h2:** `Стани изложител` / `Become an exhibitor`
- Описание: `Заявете щанд на CONNEXUS 2026 изложението.`
- Линк: `Виж пълните цени и пакети →` → `sponsors.html`

| Поле | id | Тип | Задължително |
|---|---|---|---|
| `Име на компанията` | `exh-company` | text | ✔ |
| `Лице за контакт` | `exh-contact` | text | ✔ |
| `Имейл` | `exh-email` | email | ✔ |
| `Интересуващ пакет` | `exh-package` | select | — |
| `Допълнителна информация` | `exh-notes` | textarea (3 реда) | — |

Опции на пакета (без `value=` атрибути — подава се видимият текст):
`Expo - €1,700 (Expo щанд)`, `Silver - €7,500 (Premium щанд)`, `Gold - €12,000 (Premium щанд)`,
`Stage - €18,000 (Premium щанд)`, `Institution - €30,000 (Premium щанд)`,
`Все още не съм сигурен/а - консултирайте ме`.
Hint: `Пълно сравнение на включените придобивки за всеки пакет: страница Изложители.`

- Submit: `Изпрати заявка` / `Submit Application` · `formType=exhibitor`
- Success: ✓ `Заявката е изпратена!` / `Ще се свържем с вас в рамките на 2 работни дни.`

#### C. Лектор — `#speaker-modal` / `#speaker-form` → `submitSpeaker()`

- Eyebrow: `CONNEXUS 2026 · ЛЕКТОРИ` · **h2:** `Стани лектор` / `Become a Speaker`
- Описание: `Предложете тема за лекция на CONNEXUS 2026.`

| Поле | id | Тип | Задължително |
|---|---|---|---|
| `Име и фамилия` | `spk-name` | text | ✔ |
| `Имейл` | `spk-email` | email | ✔ |
| `Компания / Организация` | `spk-company` | text | — |
| `Тема на лекцията` | `spk-topic` | text | ✔ |
| `Тематичен поток` | `spk-stream` | select (11 опции) | — |
| `Кратко описание` | `spk-desc` | textarea (3 реда) | — |

Опции на потока: Изкуствен интелект · Транспорт на бъдещето · Умен град · Киберсигурност ·
Автоматизация и роботика · AgriTech · Морски технологии · BioTech · Гейминг ·
Регионални иновационни политики · Туризъм

- Submit: `Изпрати предложение` / `Submit Proposal` · `formType=speaker`
- Success: ✓ `Предложението е изпратено!` / `Ще разгледаме предложението ви и ще се свържем с вас.`

#### D. Запитване за щанд (sponsors) — `#exhibitor-modal` / `#exhibitor-form`

Различни id-та на полетата от версията в `index.html`:

| Поле | id |
|---|---|
| `Име на компанията` | `exhibitor-company` |
| `Лице за контакт` | `exhibitor-contact` |
| `Имейл` | `exhibitor-email` |
| `Интересуващ пакет` | `exhibitor-tier` (select с `value`: `expo`/`silver`/`gold`/`stage`/`institution`) |
| `Допълнителна информация` | `exhibitor-notes` |

- **h2:** `Запитване за щанд` / `Booth Inquiry` · Submit: `Изпрати запитване` / `Submit Inquiry`
- Success: ✓ `Запитването е изпратено!`

#### E. Информационни модали (без форми) в `sponsors.html`

- `#contact-modal` — **h2:** `Свържете се с нас`, текст
  `Пишете ни или се обадете и ще ви изготвим индивидуална оферта.`, бутони mailto + tel
- `#soldout-modal` — **h2:** `Пакетът е изчерпан`, текст
  `Този пакет вече е изчерпан. Свържете се с нас за друга опция.`, бутони mailto + tel

#### F. Session модал (`#session-modal`, само `index.html`)

Не е форма — read-only панел с деня, залата, заглавието и подробния тайминг на сесията.

### 5.4 Backend — `send-email.asp`

**Технология:** Classic ASP, `<%@ Language="JScript" CodePage="65001" %>`, отговор
`application/json; charset=utf-8`, `Cache-Control: no-cache`.

**Конфигурация:** `<!--#include file="resend-config.asp"-->` — файлът е **gitignored** и се качва
ръчно; съдържа `var RESEND_API_KEY = "…"`. Шаблон: `resend-config.example.asp`.

| Константа | Стойност |
|---|---|
| `FROM_EMAIL` | `CONNEXUS 2026 <onboarding@resend.dev>` (Resend sandbox sender; TODO: смяна след верификация на домейн) |
| `TO_EMAIL` | `ssabev@shopmetrics.com` (получател на **всички** форми засега) |

**Поток:** чете `Request.Form`, валидира сървърно (`isValidEmail`, `isRealName`, `isRealPhone`),
изгражда HTML + plain-text тяло, POST-ва към `https://api.resend.com/emails` през
`MSXML2.ServerXMLHTTP.6.0` с таймаути `(5000, 5000, 10000, 15000)` ms и
`Authorization: Bearer {RESEND_API_KEY}`, връща `{"success":bool,"message":string}`.
При не-2xx → `502 Bad Gateway`; при изключение → `500`.
`sendJson()` (който вика `Response.End()`) е изнесен **след** `try/catch`, за да не бъде погълнат abort-ът.

**Типове форми и теми на имейлите:**

| `formType` | Subject |
|---|---|
| `register` | `CONNEXUS 2026 - Нова регистрация: {име}` |
| `exhibitor` | `CONNEXUS 2026 - Заявка за изложител: {компания}` |
| `speaker` | `CONNEXUS 2026 - Предложение за лектор: {име}` |
| друго | `{"success":false,"message":"Unknown form type"}` |

`reply_to` се задава на имейла на подателя.

**Обогатяване на данните:**
- `TICKET_PRICE_RULES` — разпознава `ultra-vip`/`vip`/`standard` (по код или по видим текст) → `€749`/`€399`/`€199`
- `PACKAGE_PRICE_RULES` — `expo`/`silver`/`gold`/`stage`/`institution` → `€1,700`…`€30,000`
- `COMPANY_TYPE_LABELS` — мапва `startup`/`sme`/`corporate`/`public`/`ngo`/`other` към български етикети
  (⚠️ разминава се с реалните `value` кодове на формата — виж §2.4)
- **Промокод логика:** кодът се записва **винаги** (партньорска атрибуция), дори без отстъпка.
  Два бизнес модела зад една и съща `discountPercent` стойност:
  - `discountVisible = true` → `Отстъпка за клиента (N%) - клиентът плаща по-малко (€X вместо €Y)`
  - `discountVisible = false` → `Комисиона за партньора (N%) - клиентът плаща пълна цена (€Y платени, дължима комисиона: €Z)`

### 5.5 Промокодове — `data/promo-codes.json`

Формат:

```json
{ "promoCodes": [
    { "code": "ARDES", "company": "Ardes", "discountPercent": 10,
      "discountVisible": true, "companyEn": "Ardes" }, … ] }
```

**76 кода**, всички с `discountPercent: 10` и `discountVisible: true`.
Активират се само през URL параметъра `?promo=CODE` (в UI няма поле за въвеждане).
Файлът се дърпа с `fetch('data/promo-codes.json')` **без** `?v=` — затова `web.config` му дава
отделна 2-минутна cache политика (виж §5.8).
При липса на файл / офлайн — `catch` без визуална промяна.

### 5.6 Външни библиотеки и зависимости

| Библиотека | Версия/източник | Къде | Начин |
|---|---|---|---|
| **three.js** | локално `3d-model/libs/three.min.js` (656 KB) | `floorplan3d_v2.html` | `<script src>` |
| **OrbitControls** | локално `3d-model/libs/OrbitControls-global.js` | `floorplan3d_v2.html` | `<script src>` |

**Няма CDN-зареждани JS библиотеки на нито една публична страница.**
Няма фреймуърк, няма bundler, няма package manager (`package.json` не съществува).
`three.module.js` и `libs/controls/OrbitControls.js` присъстват, но **не се зареждат** (ES-module варианти).

### 5.7 Външни услуги

| Услуга | Идентификатор / URL | Къде |
|---|---|---|
| **Google Tag Manager** | `GTM-K6JDS83T` | `<script>` в `<head>` + `<noscript><iframe>` в `<body>` — на **всичките 63 HTML файла**, включително паркираните и 3D модела. Хардкоднат навсякъде (няма build стъпка). |
| **Google Fonts** | `fonts.googleapis.com/css2?family=Inter…&family=Archivo…&family=IBM+Plex+Mono…` | Всички живи страници, с `preconnect` + `preload`/`onload` swap + `<noscript>` fallback |
| **Adobe Typekit** | `https://use.typekit.net/oqj4tys.css` | Всички живи страници (шрифт `hyperspace-race-variable`) |
| **Resend (email API)** | `https://api.resend.com/emails` | `send-email.asp` (server-side) |
| **URBO (билети)** | `https://urboapp.com/{bg\|en}/e25066-connexus-black-sea-tech-forum-2026-varna/entrance` | 3 бутона в `#tickets` (`target="_blank" rel="noopener noreferrer"`) |
| **Google Maps** | `https://www.google.com/maps/search/?api=1&query=Hotel+Cherno+More+Varna+Bulgaria` | Бутон `Насоки за пристигане` в `#venue` |
| **LinkedIn** | `https://www.linkedin.com/showcase/connexus-black-s%D0%B5%D0%B0-%D1%82ech-forum` | Footer + JSON-LD `sameAs` |
| **Facebook** | `https://www.facebook.com/people/Connexus-Black-Sea-Tech-Forum/61592355459711/` | Footer + JSON-LD `sameAs` |
| **Cloudflare** | (инфраструктура) | CDN пред IIS origin; HTML се сервира като `DYNAMIC` |

**Външни линкове към партньори** (всички `target="_blank" rel="noopener"`, в `#sponsors`):
ictclustervarna.com · sme.government.bg · varna.bg · brainplusplus.bg · arcfund.net ·
bgtrchamber.org · basel.bg · toprentacar.bg · lider.bg · moreto.net · budnavarna.com ·
varnautre.bg · fakti.bg · varnanews.net · varnafix.com · offnews.bg · hicomm.bg · prmarket.bg ·
netpeak.bg · entrepreneur.bg · manager.bg · glasove.com · novavarna.net · mignews.info ·
novinite.bg · faktor.bg · dir.bg · poligraff.net · lifeonline.bg · standartnews.com ·
omnilinx.com (в 3D модела)

### 5.8 Конфигурация, кеширане и деплой

**`web.config` (IIS) — активната политика:**

| Път | `Cache-Control` |
|---|---|
| По подразбиране (HTML, robots.txt, sitemap.xml, `/en/`) | `max-age=120, must-revalidate` |
| `images/` | `max-age=2678400` (31 дни) |
| `videos/` | `max-age=2678400` |
| `shared/` | `max-age=2678400` |
| `data/` | `max-age=2678400` |
| `3d-model/` | `max-age=2678400` |
| `data/promo-codes.json` (изключение) | `max-age=120, must-revalidate` |

Освен това — URL Rewrite правило `Redirect index.html to root`:
`^(en/)?index\.html$` → `/{R:1}` (301), за да канонизира `/index.html` → `/` и `/en/index.html` → `/en/`.

**`.htaccess` — инертен.** Съдържа Apache правила (`mod_headers`, `mod_expires`), но сървърът е IIS.
Запазен само в случай на бъдеща миграция.
`<meta http-equiv="Cache-Control">` таговете в `<head>` също са инертни (браузърите игнорират
meta cache директиви за самия документ).

**Cache-busting конвенция:** всяка препратка към скрипт, изображение или видео носи `?v=YYYYMMDD`.
Наблюдавани версии в кода: `20260730`, `20260731`, `20260806`, `20260811`, `20260813`, `20260817`,
`20260818`, `20260819`, `20260819b`, `20260820`, `20260821`, `20260824`, `20260824-2`.
При втора промяна в същия ден се добавя суфикс (`20260702-2`), не се фалшифицира дата.

**`_deploy/`** — gitignored работна папка, генерирана от `prepare-deploy.sh`; съдържа само
променените от последния merge файлове, с оригиналните релативни пътища + `_manifest.txt`.

**`.gitignore`:** `.DS_Store`, `.claude/`, `docs/`, `resend-config.asp`, `design-plans/`,
`audit-report.md`, `CLAUDE.md`, `_deploy/`.

### 5.9 SEO и достъпност

**SEO:**
- `robots.txt`: `User-agent: * / Allow: /` + `Sitemap: https://www.blackseatech.org/sitemap.xml`
- `sitemap.xml`: 58 URL-а, всеки с `xhtml:link` alternates за `bg`, `en`, `x-default`
- Canonical + hreflang на всяка индексируема страница
- JSON-LD: `Organization`, `Event` (с offers, performers, about), `WebSite`, `CollectionPage`,
  `WebPage`, `ProfilePage` + `Person`
- OG + Twitter card мета на всяка страница
- `speaker.html` е `noindex` (redirect shim)

**Достъпност:**
- Модалите: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `tabindex="-1"`, Tab focus trap, Esc
- Съобщенията за грешка: `role="alert"`, `aria-live="assertive"`, `aria-describedby` от полетата
- Невалидни полета: `aria-invalid="true"` + `.field-invalid`
- Декоративни елементи: `aria-hidden="true"`
- `@media (prefers-reduced-motion: reduce)` изключва анимациите на модалите и reveal-а;
  hero видеото изобщо не се зарежда, count-up-ът показва крайната стойност директно
- Всички `<img>` имат `alt`, `width`, `height` (предотвратява layout shift)
- Ленивo зареждане: `loading="lazy" decoding="async"` навсякъде освен hero-то и портрета на лектора

---

## 6. Асети — пълен опис

### 6.1 Брандинг и лога

| Файл | Формат | Употреба |
|---|---|---|
| `images/Connexus - WHITE.svg` | SVG | Лого в nav (home, над hero) и във footer-а — през `site-chrome.js` |
| `images/Connexus - BLACK.svg` | SVG | Лого в nav (вътрешни страници и home след скрол); JSON-LD `Organization.logo` |
| `images/og-cover.jpg` | JPG 1200×630 | OG/Twitter image на `index`, `speakers`, `sponsors`, `expo` (BG+EN) |

### 6.2 Иконки (favicon)

| Файл | Употреба |
|---|---|
| `images/favicon.ico` | `rel="icon"` — **използва се** (58 страници) |
| `images/favicon-16.png` | `rel="icon" sizes="16x16"` — **използва се** |
| `images/favicon-32.png` | `rel="icon" sizes="32x32"` — **използва се** |
| `images/apple-touch-icon.png` | `rel="apple-touch-icon" sizes="180x180"` — **използва се** |
| `images/favicon-48.png` | ❌ неизползван |
| `images/favicon-180.png` | ❌ неизползван |
| `images/favicon-192.png` | ❌ неизползван |
| `images/favicon-512.png` | ❌ неизползван |
| `images/favicon-source.png` | ❌ неизползван (изходен файл) |

### 6.3 Лога на партньори и организатори

**Организатори** (в `#sponsors`):

| Файл | Организация |
|---|---|
| `images/ict_cluster_logo.png` (1184×392) | ИКТ Клъстер Варна |
| `images/bsmepa_logo.svg` (600×405) | ИАНМСП (използва се и в 3D модела) |
| `images/varna_coat.png` (284×328) | Община Варна |
| `images/brainpp_logo.png` (738×249) | Brain++ AI Factory |
| `images/ARCF_logo.svg` (342×54) | ARC Fund |
| `images/gerp-image.png` (487×410) | Държавен герб на Република България |

**Партньори:** `images/partner-bultisad.png` (2911×900, BULTİŞAD) ·
`images/partner-basel.png` (386×108, БАСЕЛ)

**Мобилити партньор:** `images/mobility-partner.png` (700×459, Top Rent a Car)

**Медийни партньори (21):**

| Файл | Медия |
|---|---|
| `media-partner-lider.png` | Лидер.БГ |
| `media-partner-moreto.jpg` | Moreto.net |
| `media-partner-budnavarna.png` | Budna Varna |
| `media-partner-varnautre.png` | VarnaUtre.bg |
| `media-partner-fakti.png` | Факти |
| `media-partner-varnanews.png` | Varna News |
| `media-partner-varnafix.png` | Граждани на квартала |
| `media-partner-offnews.jpg` | OFFNews |
| `media-partner-hicomm.jpg` | HiComm |
| `media-partner-prmarket.png` | PR Market |
| `media-partner-netpeak.svg` | Netpeak |
| `media-partner-entrepreneur.png` | Entrepreneur.bg |
| `media-partner-manager.jpg` | Мениджър |
| `media-partner-glasove.png` | Гласове |
| `media-partner-novavarna.png` | Nova Varna |
| `media-partner-mignews.png` | МИГ NEWS.INFO |
| `media-partner-novinite.png` | Novinite.bg |
| `media-partner-faktor.png` | Faktor.bg |
| `media-partner-dirbg.png` | Dir.bg |
| `media-partner-poligraff.png` | Poligraff.net |
| `media-partner-lifeonline.png` | LifeOnline.bg |
| `media-partner-standartnews.svg` | Standart News |

### 6.4 Портрети на лектори — `images/speakers/` (30 файла)

**Използвани (26)** — всеки в `speakers.html` (карта), `speakers/{slug}/` (профил, BG+EN),
`index.html` JSON-LD `performer[].image`, и като OG image на профилната страница:

`alexander-minchev.jpg` · `andrey-lilov.jpg` · `anton-tonchev.jpg` · `cemile-usta.jpg` ·
`dimitar-karlovski.jpg` · `dragomir-vatkov.jpg` · `elitsa-encheva.jpg` · `elitza-stoilova.jpg` ·
`georgi-dobrev.jpg` · `hristian-daskalov.jpg` · `ilia-iordanov.jpg` · `kalina-tsolova.jpg` ·
`krastena-nikolova.jpg` · `kristina-bliznakova.jpg` · `kristina-eskenazi.jpg` · `lars-frolund.jpg` ·
**`martin-kuvandzhiev-2.png`** · `michael-roux.jpg` · `oskan-tasinov.jpg` · `paul-lambert.jpg` ·
`ruslan-stefanov.jpg` · `stanislav-simeonov.jpg` · `svetlin-stoyanov.jpg` · `teade-punter.jpg` ·
`trifon-tsekov.jpg` · `yasen-tanev.jpg`

**❌ Неизползвани (4):**

| Файл | Бележка |
|---|---|
| `images/speakers/martin-kuvandzhiev.jpg` | по-стара версия |
| `images/speakers/martin-kuvandzhiev-2.jpg` | JPG дубликат на използвания PNG |
| `images/speakers/arthur-kordon.jpg` | лектор, който не е в `speakers-data.js` |

### 6.5 Икони на тематични области — `images/streams/` (14 файла)

**Използвани (10, точно съвпадение):** `ai.png` · `transport.png` · `smart_city.png` ·
`cybersecurity.png` · `automation.png` · `agritech.png` · `marine_tech.png` · `biotech.png` ·
`regional-innovation-policies.png` · `networking.png`

**⚠️ Използвани със сгрешен регистър (2):**

| Реален файл | HTML препратка |
|---|---|
| `images/streams/Gaming.png` | `images/streams/gaming.png?v=20260819` |
| `images/streams/Tourism.png` | `images/streams/tourism.png?v=20260819` |

**❌ Неизползвани (2):** `images/streams/blockchain.png` · `images/streams/cloud.png`

### 6.6 Фонови изображения и постери

| Файл | Статус |
|---|---|
| `images/varna_seaside_bg.jpg` | ✔ CSS фон на `.venue-section` (index BG+EN) |
| `images/hero-poster-new.jpg` | ✔ poster на hero видеото (desktop) |
| `images/hero-poster-mobile.jpg` | ✔ poster на hero видеото (mobile) |
| `images/new-preview.jpg` (980×417) | ✔ постер на 3D сцената в `sponsors.html` |
| `images/new-preview.png` (980×557) | ⚠️ използва се само в `expo.html` (паркирана) |
| `images/Varna.png` | ⚠️ използва се само в `expo.html` (паркирана) |
| `images/hero-poster.jpg` | ❌ неизползван (стара версия) |
| `images/hero_bg.jpg` | ❌ неизползван |
| `images/hero_3d.png` | ❌ неизползван |
| `images/background.jpeg` | ❌ неизползван |
| `images/audience_bg.jpg` | ❌ неизползван |
| `images/hall_wide_bg.jpg` | ❌ неизползван |
| `images/expo_floor_bg.jpg` | ❌ неизползван |
| `images/networking_evening_bg.jpg` | ❌ неизползван |
| `images/speaker_close_bg.jpg` | ❌ неизползван |
| `images/stage_presenter_bg.jpg` | ❌ неизползван |
| `images/floor_plan.png` | ❌ неизползван |
| `images/floor_schema.png` | ❌ неизползван |
| `images/Varna2.png` | ❌ неизползван |
| `images/gerp-image-original-backup.png` | ❌ неизползван (бекъп) |
| `images/brainpplogo.png` | ❌ неизползван (дубликат на `brainpp_logo.png`) |
| `images/Brain++_logo.svg` | ❌ неизползван (SVG вариант) |
| `images/bsmepa_logo.png` | ❌ неизползван (PNG вариант; използва се SVG-то) |
| `images/mobility-partner.webp` | ❌ неизползван (WebP вариант) |

### 6.7 Архивирани изображения — `images/_unused/`

Изрично отделена папка, нищо от нея не се препраща:
`image (3).png` · `image-43.png` · `mobilitypartner.png` ·
`streams/other.png` · `streams/more-final.png` · `streams/more-final-v2.png`

### 6.8 Видеа — `videos/` (6 файла)

| Файл | Статус |
|---|---|
| `videos/hero-bg-new-clean.mp4` | ✔ hero видео, desktop (`data-src-desktop`) |
| `videos/hero-bg-mobile-clean.mp4` | ✔ hero видео, mobile (`data-src-mobile`) |
| `videos/hero-bg-1080.mp4` | ❌ неизползван |
| `videos/hero-bg-1080-clean.mp4` | ❌ неизползван |
| `videos/hero-bg-720.mp4` | ❌ неизползван |
| `videos/hero-bg-720-clean.mp4` | ❌ неизползван |

### 6.9 Асети на 3D модела — `3d-model/`

**Лога на изложители (`3d-model/Logos/`), реферирани от `stands.js` или `floorplan3d_v2.html`:**

| Файл | Изложител |
|---|---|
| `toprentacar.png` | Top-Rent-A-Car (щанд 6) |
| `ResearchMetrics.png` | ResearchMetrics (щанд 7) |
| `ITR Management Consult.png` | ITRM Consult (щанд 8) |
| `dxc.png` | DXC (щанд 9) |
| `sis-technology.png` | SIS Technology (щанд 10) |
| `omnilinx.svg` | Omnilinx (щанд 11) |
| `Netpeak_logo.svg` | Netpeak & PR Market (щанд 12) |
| `ElectroHold_Logo_Sales.svg` | Electrohold (щанд 13) |
| `deviaLogoBG.png` | Девиа България (в inline данни на `floorplan3d_v2.html`) |
| `brainpp_logo.png` | Brain++ |

**❌ Неизползвани в `3d-model/`:**
`Logos/Nearshore.png` · `Logos/Tempus.png` · `Logos/Tempus.webp` · `Logos/toprentacar.webp` ·
`poster.jpg` · `libs/three.module.js` · `libs/controls/OrbitControls.js`

**Лога като data: URI (`.js` файлове):** `bsmepa_logo.js`, `dxc_logo.js`, `electrohold_logo.js`,
`nearshore_logo.js`, `netpeak_logo.js`, `omnilinx_logo.js`, `researchmetrics_logo.js`,
`sistechnology_logo.js`, `toprentacar_logo.js` — всичките се зареждат от `floorplan3d_v2.html`.

### 6.10 Други файлове

| Файл | Тип | Роля |
|---|---|---|
| `robots.txt` | текст | Allow all + sitemap |
| `sitemap.xml` | XML (24 KB) | 58 URL-а с hreflang |
| `web.config` | XML | Активна IIS cache политика + 301 rewrite |
| `.htaccess` | текст | Apache политика — инертна |
| `send-email.asp` | Classic ASP | Backend за формите |
| `resend-config.example.asp` | Classic ASP | Шаблон за API ключ |
| `data/promo-codes.json` | JSON (16 KB) | 76 промокода |
| `development/requirements.md` | Markdown | SEO/UX одит на български (9 препоръки) |
| `development/dev-plan.md` | Markdown | План за изпълнение с приоритети и зависимости |
| `development/registration-form-plan.md` | Markdown | План за Paysera Checkout интеграция (**нереализиран** — билетите се продават през URBO) |
| `CLAUDE.md` | Markdown | Инструкции за AI агенти (частично остарели — виж §1.3) |
| `specs/test.md` | празен (0 B) | ❌ празен placeholder |
| `_deploy/_manifest.txt` | текст | Манифест на последния деплой пакет |
| `_deploy/web.config` | XML | Копие за качване |
| `.DS_Store` × 3 | macOS | ❌ артефакти (в `.gitignore`) |

### 6.11 Обобщение на неизползваните асети

| Категория | Брой | Приблизителен ефект |
|---|---|---|
| Неизползвани фонови изображения | 14 | най-голямата група — остатъци от предишен дизайн |
| Неизползвани видеа | 4 | най-обемните файлове |
| Неизползвани favicon-и | 5 | (192/512 биха били полезни за PWA manifest, ако се добави такъв) |
| Неизползвани портрети | 3 | дубликати + един отпаднал лектор |
| Неизползвани икони на области | 2 | `blockchain`, `cloud` |
| Архивирани в `_unused/` | 6 | вече изрично отделени |
| Неизползвани в `3d-model/` | 7 | вкл. `three.module.js` (1.2 MB) |
| Празни/служебни файлове | 4 | `specs/test.md`, 3 × `.DS_Store` |
| **Общо** | **≈45 файла** | |

---

## Приложение А — Бърза справка за разработчика

| Искам да… | Редактирам… |
|---|---|
| Добавя/променя лектор | `data/speakers-data.js`, после **пускам генератора** за 52-та файла |
| Променя програмата | `PROGRAM_DAYS` в `index.html` (ред ~5499) **и** в `en/index.html` |
| Променя nav или footer | `shared/site-chrome.js` + бумвам `?v=` в `index/speakers/sponsors` + **регенерирам** страниците на лектори |
| Променя цена на билет | `#tickets` карти в `index.html`/`en/index.html`, `<option>`-ите в `#reg-ticket`, JSON-LD `Event.offers`, `TICKET_PRICE_RULES` и `TICKET_BASE_PRICES` в `send-email.asp` |
| Променя спонсорски пакет | `sponsors.html` (карти + таблица), `en/sponsors.html`, `3d-model/stands.js`, `PACKAGE_PRICE_RULES` в `send-email.asp` |
| Добавя промокод | `data/promo-codes.json` |
| Сменя получателя на формите | `TO_EMAIL` в `send-email.asp` |
| Сменя GTM ID | 6 ръчно писани файла + шаблона на генератора → регенерация |
| Променя cache политиката | `web.config` (**не** `.htaccess`) |
| Добавя изображение | сложи го в `images/`, реферирай с `?v=YYYYMMDD` от самото начало |

## Приложение Б — Установени проблеми (обобщено)

| Приоритет | Проблем | Локация |
|---|---|---|
| 🔴 Висок | `privacy-policy.html` и `terms-and-conditions.html` не съществуват — 404 от footer-а на всичките 58 страници | `shared/site-chrome.js` |
| 🟠 Среден | Case mismatch: `gaming.png`/`tourism.png` vs `Gaming.png`/`Tourism.png` — счупва се при case-sensitive сървър | `index.html`, `en/index.html` |
| 🟠 Среден | `COMPANY_TYPE_LABELS` в `send-email.asp` не съвпада с `value` кодовете на `#reg-company-type` — суровите кодове влизат в имейла | `send-email.asp` |
| 🟡 Нисък | JS търси поле `#reg-promo`, каквото няма във формата; промокодът работи само през `?promo=` | `index.html` |
| 🟡 Нисък | `CLAUDE.md` описва остарял технологичен стек (React/Tailwind/GSAP) | `CLAUDE.md` |
| 🟡 Нисък | ~45 неизползвани асета, вкл. 4 неизползвани видеа и `three.module.js` (1.2 MB) | `images/`, `videos/`, `3d-model/` |
| 🟡 Нисък | `specs/test.md` е празен файл | `specs/` |
