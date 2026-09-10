# Спецификация: Добавяне на лого — Румънска камара в секция Партньори

**Дата:** 2026-09-10  
**Приоритет:** Нормален  
**Тип:** Ново съдържание — партньорско лого

---

## Описание

Добавяне на логото на Румънската камара в секция **Партньори** (`partner-row` с лейбъл „Партньори / Partners") в `index.html` (BG) и `en/index.html` (EN).

**Лого файл:** изтегли от Google Drive:  
`https://drive.google.com/open?id=15e4Ts2k6O6dWI-dtuHjjNIYm2qZm-m5R&usp=drive_fs`

Запази като: `images/partner-romanian-chamber.png`  
*(Ако файлът е SVG, запази като `.svg` и коригирай `src` съответно.)*

---

## Текущо състояние на секция „Партньори"

В момента редът „Партньори" съдържа две лога:
- **BULTİŞAD** (`partner-logo--bultisad`) — `images/partner-bultisad.png`
- **БАСЕЛ** (`partner-logo--basel`) — `images/partner-basel.png`

Новото лого се добавя като трети елемент в същия ред.

---

## Задачи за разработчика (Симо)

### Задача 1 — Качване на лого файла

Изтегли файла от Google Drive и го постави в:  
`images/partner-romanian-chamber.png`

**Формат:** Запази оригиналния формат (PNG или SVG). Препоръчителна максимална ширина: 400 px, макс. 80 KB.

---

### Задача 2 — Добавяне на HTML в `index.html` (BG, ред ~5648)

Намери блока с Партньори (след коментара `<!-- Partners -->`):

```html
          <!-- Partners -->
          <div class="partner-row">
            <div class="partner-row__label">
              <span data-bg="Партньори" data-en="Partners">Партньори</span>
            </div>
            <div class="partner-row__divider"></div>
            <div class="partner-row__content partner-row__logos">
              <div class="partner-logo partner-logo--bultisad">
                ...
              </div>
              <div class="partner-logo partner-logo--basel">
                ...
              </div>
            </div>
          </div>
```

Добави новия div **след** `partner-logo--basel`:

```html
              <div class="partner-logo partner-logo--romchamber">
                <a href="TODO_WEBSITE_URL" target="_blank" rel="noopener">
                  <img src="images/partner-romanian-chamber.png?v=20260910"
                    alt="TODO_CHAMBER_NAME_BG"
                    loading="lazy" decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
```

> **TODO полета:** замени `TODO_WEBSITE_URL` с уебсайта на камарата, `TODO_CHAMBER_NAME_BG` с пълното BG/EN название, и `TODO_W`/`TODO_H` с реалните пиксели на изображението.

---

### Задача 3 — Добавяне на HTML в `en/index.html` (EN, същото място)

Същата промяна като Задача 2, но в `en/index.html`. `alt` атрибутът трябва да е на английски:

```html
              <div class="partner-logo partner-logo--romchamber">
                <a href="TODO_WEBSITE_URL" target="_blank" rel="noopener">
                  <img src="../images/partner-romanian-chamber.png?v=20260910"
                    alt="TODO_CHAMBER_NAME_EN"
                    loading="lazy" decoding="async" width="TODO_W" height="TODO_H">
                </a>
              </div>
```

> **Забележка за пътя:** в `en/index.html` пътят до `images/` е `../images/`.

---

### Задача 4 — CSS размер на логото

Добави в `<style>` блока на **двата** файла (`index.html` и `en/index.html`), след `.partner-logo--bultisad img { ... }`:

```css
      .partner-logo--romchamber img {
        height: 60px;
        max-width: 220px;
      }
```

> Провери визуално и коригирай `height` и `max-width` спрямо реалния размер на логото.

---

### Задача 5 — Bump на cache-busting версиите

Засегнати файлове — обнови `?v=` до `20260910` навсякъде, където е редактиран файлът:

| Файл | Какво да обновиш |
|---|---|
| `index.html` | `?v=` на `og-cover.jpg` (само ако е сменен), `shared/site-chrome.js` |
| `en/index.html` | Същото |

Новото лого вече получава `?v=20260910` директно в `<img src>`.

---

## Отворени въпроси

| # | Въпрос | Отговорник |
|---|---|---|
| 1 | Пълно официално название на камарата (BG и EN) — за `alt` атрибута | Организационен екип |
| 2 | Уебсайт на камарата — за `href` атрибута (или изобщо няма линк?) | Организационен екип |

---

## Приемателни критерии

- [ ] Логото на Румънската камара се вижда в секция „Партньори" на `index.html`
- [ ] Логото се вижда и в `en/index.html`
- [ ] Логото е правилно оразмерено и наредено с BULTİŞAD и БАСЕЛ
- [ ] Клик върху логото отваря уебсайта на камарата (ако е наличен)
- [ ] `alt` текстът е попълнен на BG/EN
- [ ] `?v=` версията е `20260910`
