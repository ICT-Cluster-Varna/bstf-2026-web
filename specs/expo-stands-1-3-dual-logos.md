# Спецификация: Продадени щандове №1 и №3 — двойни лога в 3D визуализацията

**Дата:** 2026-09-11
**Приоритет:** Висок
**Тип:** Промяна на съдържание — 3D Floor Plan

---

## Обобщение

Два premium щанда са продадени и трябва да получат лога в 3D визуализацията:

| Щанд | Тип | Компании |
|---|---|---|
| №1 | Stage Partner (голям, правоъгълен) | **Ardes** + **Samsung** |
| №3 | Gold Partner (голям, правоъгълен) | **ALSO** + **Microsoft** |

**Засегнат файл:** `3d-model/floorplan3d_v2.html` (+ нови logo JS файлове в `3d-model/`)

---

## Ключово решение — оформление на двете лога

Всеки от тези щандове носи **две лога**. Функцията `makeSignPanel()` (ред ~2782) рендерира **едно изображение върху една фасада**. Затова:

> **Препоръчан подход:** за всеки щанд се прави **едно комбинирано изображение** с двете лога, вградено като base64 в отделен `standN_logo.js` файл — точно както другите щандове (напр. `energopro_logo.js`). Така **не се променя** `makeSignPanel()` и рендерирането остава консистентно.

**Разположение — едно до друго (side-by-side):**
Щандове №1 и №3 са големи с **широка предна фасада** (`panelW = faceWidth × 0.80`, а `panelH = STAND_H × 0.60` → панелът е по-широк, отколкото висок). При такова съотношение **двете лога едно до друго** запълват панела най-добре и остават четими. Затова:

- **Използвай „едно до друго" (хоризонтално).**
- Центрирай вертикално; изравни оптически по височина (нормализирай така, че двете лога да изглеждат еднакво „тежки", а не буквално еднаква пикселна височина).
- Тънък вертикален разделител или просто отстояние между тях; прозрачен/бял фон според логата.
- Изключение: ако при преглед се окаже, че конкретното лого е много удължено и side-by-side излиза дребно — тогава за този щанд мини на „едно под друго" (вертикално).

---

## Необходими лога

| Компания | Източник |
|---|---|
| Ardes | Вече в репото: `images/partner-ardes.png` |
| Samsung | Вече в репото: `images/partner-samsung.png` |
| ALSO | Изтегли официалното лого от нета (ALSO Holding — `also.com`) |
| Microsoft | Изтегли официалното лого от нета (`microsoft.com` brand assets) |

---

## Задачи за разработчика (Симо)

### Задача 1 — Комбинирани изображения + logo JS файлове

1. Направи **едно комбинирано PNG** за всеки щанд (двете лога едно до друго, прозрачен/бял фон, достатъчна резолюция ~1024 px ширина):
   - Щанд №1: Ardes + Samsung
   - Щанд №3: ALSO + Microsoft
2. Кодирай всяко като base64 `data:image/png` в нов файл (както `energopro_logo.js`):
   - `3d-model/stand1_logo.js` → `window.STAND1_LOGO_SRC = 'data:image/png;base64,...';`
   - `3d-model/stand3_logo.js` → `window.STAND3_LOGO_SRC = 'data:image/png;base64,...';`
3. Запази и „плоски" PNG версии за popup thumbnail-а в `3d-model/Logos/`:
   - `3d-model/Logos/stand1-ardes-samsung.png`
   - `3d-model/Logos/stand3-also-microsoft.png`

---

### Задача 2 — Include на новите JS файлове

В блока с logo script includes (ред ~1169–1185) добави:

```html
  <script src="stand1_logo.js?v=20260911"></script>
  <script src="stand3_logo.js?v=20260911"></script>
```

---

### Задача 3 — Render блокове за щанд №1 и №3

Добави след съществуващите per-stand блокове (напр. след Stand 7 / Stand 10 групата, ~ред 2905+), по същия шаблон като другите щандове. Премиум щандовете са добре видими от прохода — рендерирай **front** (и **back**, ако щандът се вижда и отзад, като Stand 7):

```js
    // -- Stand 1 – Ardes + Samsung (front + back) --
    (() => {
      const m1 = standMeshes.find(m => m.userData.n === 1);
      if (!m1) return;
      const img = new Image();
      img.onload = () => {
        groups.stand.add(makeSignPanel(m1, img, { face: 'front', bg: '#ffffff', accent: 'rgba(30,100,200,0.8)' }));
        groups.stand.add(makeSignPanel(m1, img, { face: 'back',  bg: '#ffffff', accent: 'rgba(30,100,200,0.8)' }));
        markDirty();
      };
      img.src = window.STAND1_LOGO_SRC;
    })();

    // -- Stand 3 – ALSO + Microsoft (front + back) --
    (() => {
      const m3 = standMeshes.find(m => m.userData.n === 3);
      if (!m3) return;
      const img = new Image();
      img.onload = () => {
        groups.stand.add(makeSignPanel(m3, img, { face: 'front', bg: '#ffffff', accent: 'rgba(30,100,200,0.8)' }));
        groups.stand.add(makeSignPanel(m3, img, { face: 'back',  bg: '#ffffff', accent: 'rgba(30,100,200,0.8)' }));
        markDirty();
      };
      img.src = window.STAND3_LOGO_SRC;
    })();
```

> **Бележка за `company` caption:** комбинираните изображения вече са wordmark-ове, затова **не подавай** `company` (както при ENERGO-PRO / Stand 7), за да няма надпис отдолу. `bg`/`accent` са дадени за светъл панел — коригирай при нужда спрямо цветовете на логата.

---

### Задача 4 — Popup данни (`exhibitors` JSON, ред ~1125)

Добави записи за щанд 1 и 3, за да се показват като заети при клик:

```json
  "exhibitors": {
    "1":  { "company": "Ardes & Samsung",   "logo": "Logos/stand1-ardes-samsung.png",  "status": "occupied", "website": "", "description": "" },
    "3":  { "company": "ALSO & Microsoft",   "logo": "Logos/stand3-also-microsoft.png", "status": "occupied", "website": "", "description": "" },
    "6":  { "company": "Top-Rent-A-Car",  "logo": "Logos/toprentacar.png",  "status": "partner",  "website": "", "description": "" },
    "12": { "company": "Девиа България",  "logo": "Logos/deviaLogoBG.png",  "status": "occupied", "website": "", "description": "" }
  },
```

> `website` е оставено празно (схемата поддържа един линк, а щандовете имат по две компании). Ако искате линкове — уточни към кой сайт да сочи (виж Липсваща информация).

---

### Задача 5 — Cache-busting

- Обнови `?v=` на **всички** `<script src>` в `floorplan3d_v2.html` до `20260911` (следвай текущата схема; при втора редакция същия ден — суфикс `-2`).
- Обнови `?v=` на `floorplan3d_v2.html` в iframe src-а вътре в `expo.html`.

---

## ⚠️ Липсваща информация (за колегите)

| # | Какво липсва | Бележка |
|---|---|---|
| 1 | Официални лога на **ALSO** и **Microsoft** (вектор/PNG, прозрачен фон) | Да се вземат от нета; ако имате официални brand файлове — по-добре. |
| 2 | Линкове за popup-а (по избор) | Щандовете имат по 2 компании; ако искате кликаем сайт — кой да е (или без линк). |

---

## Приемателни критерии

- [ ] Щанд №1 показва Ardes + Samsung на 3D панела (front, и back ако е видим)
- [ ] Щанд №3 показва ALSO + Microsoft на 3D панела
- [ ] Двете лога на всеки щанд са четими, оптически изравнени и добре разположени (едно до друго)
- [ ] Клик на щанд №1/№3 показва popup „зает" с комбинираното лого
- [ ] Всички `?v=` в `floorplan3d_v2.html` са обновени до `20260911`
- [ ] `expo.html` iframe src е обновен
- [ ] Няма визуален регрес по другите щандове
