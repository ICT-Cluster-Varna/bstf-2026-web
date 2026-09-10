# Спецификация: Обновяване на Expo щандове — щанд 8, 14, 15

**Дата:** 2026-09-10  
**Приоритет:** Висок  
**Тип:** Промяна на съдържание — 3D Floor Plan

---

## Обобщение на промените

| Щанд | Текущо | Ново |
|---|---|---|
| 8 | ИТР Мениджмънт Консулт ООД (ITRM Consult) | ТиД Инженеринг ЕООД (TiD Engineering) |
| 14 | *(свободен)* | ARCFund |
| 15 | *(свободен)* | ARCFund |

**Засегнат файл:** `3d-model/floorplan3d_v2.html`

---

## Как работи системата (контекст за Симо)

Всеки лого в 3D модела се зарежда по следния начин:
1. Логото е кодирано като base64 `data:image` в отделен JS файл (напр. `3d-model/nearshore_logo.js`), който задава `window.XXX_LOGO_SRC = 'data:image/png;base64,...'`.
2. Файлът се включва с `<script src="xxx_logo.js?v=...">` в `floorplan3d_v2.html`.
3. В main скрипта има блок, който взема mesh-а на щанда, зарежда логото и рендерира 3D панел.
4. Отделно, `exhibitors` JSON блокът (ред ~1125) контролира popup прозореца при клик на щанда.

---

## Задача 1 — Щанд 8: замяна на ИТР Мениджмънт Консулт с ТиД Инженеринг

### 1а — Нов logo JS файл: `3d-model/tid_engineering_logo.js`

Вземи логото на ТиД Инженеринг от сайта им: **https://www.tid-engineering.bg/**

Конвертирай го в base64 PNG (оптимизирано, ~400×200 px, без прозрачен фон ако изглежда зле върху тъмен фон) и създай файл `3d-model/tid_engineering_logo.js`:

```js
window.TID_ENGINEERING_LOGO_SRC = 'data:image/png;base64,XXXXXXXX...';
```

*(Използвай същия формат като `nearshore_logo.js` — само една линия с window.XXX_LOGO_SRC)*

### 1б — Добави `<script>` include в `floorplan3d_v2.html`

Намери блока с script includes (ред ~1168–1178) и добави новия файл след `nearshore_logo.js`:

**Преди:**
```html
  <script src="nearshore_logo.js?v=20260908"></script>
  <script src="omnilinx_logo.js?v=20260908"></script>
```

**След:**
```html
  <script src="nearshore_logo.js?v=20260908"></script>
  <script src="tid_engineering_logo.js?v=20260910"></script>
  <script src="omnilinx_logo.js?v=20260908"></script>
```

### 1в — Смени 3D sign панела за щанд 8 (ред ~2859)

**Преди:**
```js
    // -- Stand 8 – ITRM Consult / Nearshore (front + back) --
    (() => {
      const m8 = standMeshes.find(m => m.userData.n === 8);
      if (!m8) return;
      const img = new Image();
      img.onload = () => {
        groups.stand.add(makeSignPanel(m8, img, { face: 'front', company: 'ITRM Consult' }));
        groups.stand.add(makeSignPanel(m8, img, { face: 'back', company: 'ITRM Consult' }));
        markDirty();
      };
      img.src = window.NEARSHORE_LOGO_SRC;
    })();
```

**След:**
```js
    // -- Stand 8 – TiD Engineering (front + back) --
    (() => {
      const m8 = standMeshes.find(m => m.userData.n === 8);
      if (!m8) return;
      const img = new Image();
      img.onload = () => {
        groups.stand.add(makeSignPanel(m8, img, { face: 'front', company: 'TiD Engineering' }));
        groups.stand.add(makeSignPanel(m8, img, { face: 'back', company: 'TiD Engineering' }));
        markDirty();
      };
      img.src = window.TID_ENGINEERING_LOGO_SRC;
    })();
```

### 1г — Обнови `exhibitors` JSON блока (ред ~1125)

**Преди:**
```json
  "exhibitors": {
    "6":  { "company": "Top-Rent-A-Car",  "logo": "Logos/toprentacar.png",  "status": "partner",  "website": "", "description": "" },
    "12": { "company": "Девиа България",  "logo": "Logos/deviaLogoBG.png",  "status": "occupied", "website": "", "description": "" }
  },
```

**След:**
```json
  "exhibitors": {
    "6":  { "company": "Top-Rent-A-Car",    "logo": "Logos/toprentacar.png",       "status": "partner",  "website": "",                          "description": "" },
    "8":  { "company": "ТиД Инженеринг",    "logo": "Logos/tid-engineering.png",   "status": "occupied", "website": "https://www.tid-engineering.bg/", "description": "" },
    "12": { "company": "Девиа България",    "logo": "Logos/deviaLogoBG.png",       "status": "occupied", "website": "",                          "description": "" },
    "14": { "company": "ARCFund",           "logo": "Logos/arcfund.png",           "status": "occupied", "website": "https://arcfund.net/",       "description": "" },
    "15": { "company": "ARCFund",           "logo": "Logos/arcfund.png",           "status": "occupied", "website": "https://arcfund.net/",       "description": "" }
  },
```

### 1д — Добави лого PNG в `3d-model/Logos/`

- `3d-model/Logos/tid-engineering.png` — изтегли от сайта им или получи от клиента. Препоръчителен размер: ~400×200 px.

> Това PNG се използва само в popup прозореца при клик на щанда, не в 3D рендерирането. Може временно да е placeholder.

---

## Задача 2 — Щандове 14 и 15: добавяне на ARCFund лого

### 2а — Нов logo JS файл: `3d-model/arcfund_logo.js`

Нужно е ARCFund лого файл. **Очаква се от организационния екип.**

Конвертирай го в base64 PNG и създай `3d-model/arcfund_logo.js`:

```js
window.ARCFUND_LOGO_SRC = 'data:image/png;base64,XXXXXXXX...';
```

### 2б — Добави `<script>` include в `floorplan3d_v2.html`

Добави в блока с script includes:

```html
  <script src="arcfund_logo.js?v=20260910"></script>
```

### 2в — Добави 3D sign панели за щандове 14 и 15

Добави след блока на щанд 16 (ред ~2918):

```js
    // -- Stand 14 – ARCFund logo on facade ------------------
    (() => {
      const m14 = standMeshes.find(m => m.userData.n === 14);
      if (!m14) return;
      const img = new Image();
      img.onload = () => {
        groups.stand.add(makeSignPanel(m14, img, { company: 'ARCFund', bg: '#ffffff', accent: 'rgba(30,100,200,0.8)' }));
        markDirty();
      };
      img.src = window.ARCFUND_LOGO_SRC;
    })();

    // -- Stand 15 – ARCFund logo on facade ------------------
    (() => {
      const m15 = standMeshes.find(m => m.userData.n === 15);
      if (!m15) return;
      const img = new Image();
      img.onload = () => {
        groups.stand.add(makeSignPanel(m15, img, { company: 'ARCFund', bg: '#ffffff', accent: 'rgba(30,100,200,0.8)' }));
        markDirty();
      };
      img.src = window.ARCFUND_LOGO_SRC;
    })();
```

> **Бележка за цветовете:** `bg` и `accent` по-горе са начални стойности. Провери с ARCFund брандинг цветове и коригирай при нужда (напр. синьото на ARCFund). Гледай `Stand 9 – DXC` или `Stand 10 – SIS Technology` за референтен стил.

### 2г — Добави лого PNG в `3d-model/Logos/`

- `3d-model/Logos/arcfund.png` — получи от организационния екип.

---

## Задача 3 — Bump на cache-busting версията

**Файл:** `3d-model/floorplan3d_v2.html`

Обнови `?v=` датата на всички `<script src>` тагове в `floorplan3d_v2.html` до `20260910`:

```html
<script src="stands.js?v=20260910"></script>
<script src="bsmepa_logo.js?v=20260910"></script>
...
```

Освен това намери в `expo.html` iframe src-а, който включва `floorplan3d_v2.html`, и обнови и неговия `?v=` параметър.

---

## Отворени въпроси

| # | Въпрос | Отговорник |
|---|---|---|
| 1 | ARCFund лого файл — откъде идва? (PNG/SVG за base64 конвертиране) | Организационен екип |
| 2 | ARCFund брандинг цветове за `bg`/`accent` на 3D панела? | Организационен екип |
| 3 | ТиД Инженеринг лого — да се вземе от сайта им или ще го предоставят? | Организационен екип |

---

## Приемателни критерии

- [ ] Щанд 8 показва „TiD Engineering" в 3D модела (и двете страни)
- [ ] Щанд 8 popup показва „ТиД Инженеринг" с линк към `tid-engineering.bg`
- [ ] Щандове 14 и 15 показват ARCFund лого в 3D модела
- [ ] Щандове 14 и 15 popup показва „ARCFund" с линк към `arcfund.net`
- [ ] „ITRM Consult" не се появява никъде в 3D модела
- [ ] Всички `?v=` са обновени до `20260910`
- [ ] `expo.html` iframe src е обновен
