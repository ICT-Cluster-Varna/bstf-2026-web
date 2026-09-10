# Спецификация: Нови медийни партньори (batch)

**Дата:** 2026-09-10
**Приоритет:** Нормален
**Тип:** Ново съдържание — медийни партньорски лога

---

## Описание

Добавяне на **6 нови медийни партньора** в секция „Медийни партньори" (`partner-row` с лейбъл „Медийни партньори / Media Partners") в `index.html` (BG) и `en/index.html` (EN).

> **Бележка:** В оригиналния списък `sinor.bg` беше посочен два пъти — добавя се **само веднъж**. Уникалните нови партньори са 6.

Логата се вземат **директно от сайтовете на съответните медии**.

---

## Списък на новите партньори

| # | Медия | Уебсайт (href) | Файл (предложение) | alt текст |
|---|---|---|---|---|
| 1 | Синор.БГ | `https://www.sinor.bg/` | `images/media-partner-sinor.png` | `Синор.БГ` |
| 2 | Агро.БГ | `https://www.agro.bg/` | `images/media-partner-agro.png` | `Агро.БГ` |
| 3 | AgroTV | `https://agrotv.bg/` | `images/media-partner-agrotv.png` | `AgroTV` |
| 4 | Строител БГ | `https://stroitelbg.bg/` | `images/media-partner-stroitelbg.png` | `Строител БГ` |
| 5 | Бряг | `https://www.briag.bg/` | `images/media-partner-briag.png` | `Бряг` |
| 6 | VNews | `https://vnews.bg/` | `images/media-partner-vnews.png` | `VNews` |

> **За проверка (Симо):** потвърди точния URL и официалното изписване на името на всяка медия от самия им сайт преди публикуване (напр. дали е `sinor.bg` или `www.sinor.bg`, дали логото носи различно търговско име). Ако логото е налично като SVG на сайта им — предпочети SVG (запази като `.svg` и коригирай `src`).

---

## Текущо състояние на секцията

Секцията „Медийни партньори" в момента съдържа ~22 лога, последното от които е **Standart News** (`media-partner-standartnews.svg`). Новите лога се добавят **след него**, преди затварящия `</div>` на `partner-row__logos`.

- **BG:** `index.html` — блокът приключва на ред ~5811–5812 (след `standartnews.svg`).
- **EN:** `en/index.html` — блокът приключва на ред ~5811 (пътищата до `images/` са с префикс `../`).

Медийните лога **нямат** per-лого CSS — използват генеричния стил `.partner-logo img { height: 64px; width: auto; max-width: 190px; object-fit: contain; }`. Затова **не се налага нов CSS** — само нови `<div class="partner-logo partner-logo--media">` блокове.

---

## Задачи за разработчика (Симо)

### Задача 1 — Изтегляне и подготовка на логата

За всеки от 6-те партньора:
1. Изтегли логото от сайта на медията (виж таблицата за URL).
2. Оптимизирай го — препоръчителна височина ~64 px рендер, макс. ширина ~190 px, макс. ~60 KB. Предпочети прозрачен фон (PNG/SVG); ако логото е на тъмен/цветен фон, който изглежда зле върху бяло, вземи версия с прозрачност или на бял фон.
3. Запиши във `images/` с имената от таблицата.

---

### Задача 2 — Добавяне на HTML в `index.html` (BG)

Намери края на `partner-row__logos` в блока „Медийни партньори" (след записа за `standartnews`, ред ~5811) и добави **преди** затварящия `</div>`:

```html
              <div class="partner-logo partner-logo--media">
                <a href="https://www.sinor.bg/" target="_blank" rel="noopener">
                  <img src="images/media-partner-sinor.png?v=20260910" alt="Синор.БГ" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
              <div class="partner-logo partner-logo--media">
                <a href="https://www.agro.bg/" target="_blank" rel="noopener">
                  <img src="images/media-partner-agro.png?v=20260910" alt="Агро.БГ" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
              <div class="partner-logo partner-logo--media">
                <a href="https://agrotv.bg/" target="_blank" rel="noopener">
                  <img src="images/media-partner-agrotv.png?v=20260910" alt="AgroTV" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
              <div class="partner-logo partner-logo--media">
                <a href="https://stroitelbg.bg/" target="_blank" rel="noopener">
                  <img src="images/media-partner-stroitelbg.png?v=20260910" alt="Строител БГ" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
              <div class="partner-logo partner-logo--media">
                <a href="https://www.briag.bg/" target="_blank" rel="noopener">
                  <img src="images/media-partner-briag.png?v=20260910" alt="Бряг" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
              <div class="partner-logo partner-logo--media">
                <a href="https://vnews.bg/" target="_blank" rel="noopener">
                  <img src="images/media-partner-vnews.png?v=20260910" alt="VNews" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
```

> Замени `TODO_W` / `TODO_H` с реалните пиксели на всяко изображение (за да не „скача" оформлението при зареждане).

---

### Задача 3 — Добавяне на HTML в `en/index.html` (EN)

Същите 6 блока на същото място в `en/index.html`, но с префикс `../` в `src`:

```html
                  <img src="../images/media-partner-sinor.png?v=20260910" alt="Синор.БГ" ...>
```

`alt` текстовете остават същите (имена на медии — не се превеждат). Пътищата стават `../images/...`.

---

### Задача 4 — Cache-busting

Новите `<img>` вече носят `?v=20260910` директно.

Ако при редакцията се променят и други версионирани ресурси в `index.html` / `en/index.html` (напр. `shared/site-chrome.js`), обнови техните `?v=` до `20260910` съгласно `CLAUDE.md`. Иначе не е нужно.

---

## Отворени въпроси

*Няма блокери.* Единствената проверка за Симо е да потвърди точния URL и официалното изписване на името на всяка медия директно от сайта ѝ (виж бележката под таблицата).

---

## Приемателни критерии

- [ ] 6-те нови лога се виждат в секция „Медийни партньори" на `index.html`
- [ ] Същите 6 лога се виждат и в `en/index.html`
- [ ] Всяко лого е с прозрачен/бял фон и е оразмерено консистентно с останалите медийни лога
- [ ] Клик върху всяко лого отваря съответния уебсайт в нов таб (`target="_blank" rel="noopener"`)
- [ ] `width`/`height` атрибутите отговарят на реалните размери на изображенията
- [ ] `sinor.bg` присъства само веднъж (без дублиране)
- [ ] `?v=20260910` е зададено на новите `<img>` тагове
