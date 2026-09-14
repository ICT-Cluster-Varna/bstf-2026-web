# Спецификация: Добавяне на партньор — Para.expert

**Дата:** 2026-09-14
**Приоритет:** Нормален
**Тип:** Ново съдържание — партньорско лого

---

## Описание

Добавяне на **Para.expert** (`https://para.expert/`) като партньор в секция „Партньори" (`partner-row` с лейбъл „Партньори / Partners") в `index.html` (BG) и `en/index.html` (EN).

---

## Текущо състояние на секцията

Редът „Партньори" вече съдържа 12 лога (BULTİŞAD, БАСЕЛ, БРТК/BRCC, BBCC, MCB, BASSCOM, AHK, DBCC, ORCCI, Ardes, Samsung, LAZUR). Para.expert се добавя като **последен** елемент, **след** `partner-logo--lazur` (ред ~5748 в BG, преди затварящия `</div>` на `partner-row__logos`).

Всяко лого има собствен per-лого CSS клас за фина настройка на размера.

---

## Задачи за разработчика (Симо)

### Задача 1 — Качване на логото

Изтегли логото от `https://para.expert/` (предпочети SVG/PNG с прозрачен фон) и запиши като:
`images/partner-para.png` *(или `.svg`, ако е векторно — коригирай `src` съответно)*

**Обработка:** изрежи излишните полета; препоръчителна ширина ~600 px, макс. ~60 KB. Запомни реалните пиксели за `width`/`height`.

---

### Задача 2 — HTML в `index.html` (BG, след ред ~5748)

След блока `partner-logo--lazur`, преди затварящия `</div>`:

```html
              <div class="partner-logo partner-logo--para">
                <a href="https://para.expert/" target="_blank" rel="noopener">
                  <img src="images/partner-para.png?v=20260914" alt="Para.expert" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
```

---

### Задача 3 — HTML в `en/index.html` (EN, същото място)

Същият блок след `partner-logo--lazur`, но с префикс `../` в `src`:

```html
              <div class="partner-logo partner-logo--para">
                <a href="https://para.expert/" target="_blank" rel="noopener">
                  <img src="../images/partner-para.png?v=20260914" alt="Para.expert" loading="lazy"
                    decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
```

---

### Задача 4 — CSS размер

Добави в `<style>` блока на **двата** файла, след `.partner-logo--lazur img { ... }` (ред ~4235):

```css
      .partner-logo--para img {
        height: 46px;
        max-width: 200px;
      }
```

Провери визуално и коригирай `height`/`max-width` спрямо реалното лого.

---

### Задача 5 — Cache-busting

Новото `<img>` вече носи `?v=20260914`. Ако при редакцията се пипат други версионирани ресурси (`shared/site-chrome.js` и т.н.), обнови техните `?v=` до `20260914` съгласно `CLAUDE.md`.

---

## Отворени въпроси

*Всичко е изяснено — няма блокери.*

| # | Въпрос | Решение |
|---|---|---|
| 1 | Лого файл на Para.expert | Взема се от `https://para.expert/` |
| 2 | Изписване за `alt` | Както на сайта — „Para.expert" |

---

## Приемателни критерии

- [ ] Логото на Para.expert се вижда в секция „Партньори" на `index.html`
- [ ] Логото се вижда и в `en/index.html`
- [ ] Логото е оразмерено консистентно с останалите партньорски лога
- [ ] Клик върху логото отваря `https://para.expert/` в нов таб
- [ ] `width`/`height` отговарят на реалните размери на изображението
- [ ] `?v=20260914` е зададено на новия `<img>` таг
