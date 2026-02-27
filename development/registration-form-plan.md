# План: Регистрация и плащане на билети чрез Paysera Checkout

## Контекст

Формата за регистрация (`#bstf-modal`) в момента работи само визуално — при submit показва success съобщение, но не изпраща данни никъде. Решението на ръководителя на проекта е **Paysera Checkout** като единствен вариант за обработка на регистрации и плащания.

**Paysera** е лицензирана финансова институция с офис в България.
- Сайт: https://www.paysera.bg/v2/bg-BG/index
- Документация: https://developers.paysera.com/en/checkout/basic
- Контакт: sales@paysera.bg / +359 886 611 411

---

## Архитектура на решението

```
┌─────────────┐     POST      ┌──────────────┐    redirect    ┌─────────┐
│  index.html │ ──────────▶   │   Backend    │  ──────────▶   │ Paysera │
│  (форма)    │               │  (Node.js)   │               │  /pay/  │
└─────────────┘               └──────────────┘               └────┬────┘
                                     ▲                            │
                              callback (POST)              плащане от
                              "OK" response                потребителя
                                     │                            │
                              ┌──────┴──────┐    redirect    ┌────▼────┐
                              │  Callback   │ ◀──────────    │ Success │
                              │  handler    │                │  page   │
                              └──────┬──────┘               └─────────┘
                                     │
                              ┌──────▼──────┐
                              │  Storage    │  (DB / JSON / Google Sheet)
                              │  + Email    │  (confirmation имейл)
                              └─────────────┘
```

### Потокът стъпка по стъпка

1. Потребителят попълва формата (име, имейл, телефон, тип билет)
2. При submit → `fetch()` към нашия backend с данните
3. Backend-ът генерира уникален `orderid`, записва pending поръчка, създава Paysera `data` + `sign`
4. Backend връща redirect URL → браузърът пренасочва към Paysera
5. Потребителят плаща в Paysera (карта / банков превод / Apple Pay / Google Pay)
6. При успех → Paysera redirect към `accepturl` (thank you страница)
7. Paysera изпраща server-to-server callback към `callbackurl`
8. Backend валидира подписа, маркира поръчката като платена, изпраща confirmation имейл
9. Backend отговаря с "OK" на Paysera

---

## Такси (за България)

| Брой транзакции/мес | Карти (ЕС) | Карти (извън ЕС) | Open Banking |
|---------------------|-----------|-----------------|-------------|
| 1–50 | 1.45% (мин. 0.15€) | 2.90% | 0.90% (мин. 0.10€) |
| 51–150 | 1.40% | 2.80% | — |
| 151–250 | 1.35% | 2.70% | — |
| 251–500 | 1.30% | 2.60% | 0.75% |
| 750+ | По договаряне | По договаряне | По договаряне |

- **Без setup fee, без месечна такса**
- Поддържа: Visa, Mastercard, Maestro, Apple Pay, Google Pay, банкови преводи
- 25+ валути

---

## Paysera API — технически детайли

### Endpoint
```
https://www.paysera.com/pay/?data=...&sign=...
```

### Задължителни параметри

| Параметър | Описание |
|-----------|----------|
| `projectid` | ID на проекта в Paysera |
| `orderid` | Уникален номер на поръчката |
| `accepturl` | URL при успешно плащане |
| `cancelurl` | URL при отказ от потребителя |
| `callbackurl` | Server-to-server notification URL |
| `version` | Версия на API (1.9) |
| `amount` | Сума **в центове** (напр. 5000 = 50.00 EUR) |
| `currency` | ISO валутен код (EUR, BGN) |
| `test` | 1 за тестов режим |

### Генериране на подпис

1. URL-encode на всички параметри (`http_build_query`)
2. Base64 encode на резултата
3. Замяна на символи: `/` → `_`, `+` → `-`
4. `sign = md5(data + sign_password)`

### Callback

- Paysera изпраща POST към `callbackurl`
- Сървърът **трябва да върне "OK"** като отговор
- При липса на "OK" → retry: веднага, +1 час, +3 часа, +24 часа

---

## Предварителни стъпки (преди имплементация)

### 1. Регистрация в Paysera
- [ ] Регистрация на бизнес акаунт в Paysera (изисква юридическо лице)
- [ ] Бизнес верификация (KYC) — няколко работни дни
- [ ] Създаване на проект в Paysera dashboard
- [ ] Получаване на `projectid` и `sign_password`

### 2. Определяне на цени на билетите
- [ ] Early Bird — цена в EUR/BGN
- [ ] Standard — цена в EUR/BGN
- [ ] VIP / All Access — цена в EUR/BGN
- [ ] Валута (EUR или BGN)

### 3. Избор на хостинг за backend
- [ ] Vercel (безплатен план, 100K req/мес) — препоръчително
- [ ] Cloudflare Workers (безплатен план, 100K req/ден)
- [ ] VPS / споделен хостинг (ако вече има)
- [ ] Домейн за API (напр. api.bstf2026.bg или blackseatech.org/api)

### 4. Имейл за потвърждения
- [ ] Определяне на sender имейл адрес
- [ ] Ако custom домейн (напр. noreply@bstf2026.bg) → настройка на Resend/Mailgun + DNS записи (SPF, DKIM)
- [ ] Ако Gmail → по-просто, но имейлите ще идват от @gmail.com

---

## Имплементация — стъпки

### Стъпка 1: Backend проект

Създаване на Node.js проект (напр. за Vercel) със следните endpoints:

```
POST /api/create-payment
  - Приема: { fname, lname, email, phone, ticketType }
  - Генерира orderid (UUID)
  - Записва pending поръчка в storage
  - Изчислява data + sign за Paysera
  - Връща: { redirectUrl: "https://www.paysera.com/pay/?data=...&sign=..." }

POST /api/paysera-callback
  - Приема: data + sign от Paysera (GET/POST параметри)
  - Валидира подписа
  - Маркира поръчката като "paid"
  - Изпраща confirmation имейл до потребителя
  - Връща: "OK"

GET /api/payment-status?orderId=xxx
  - Проверка на статус (за polling от frontend, ако е нужно)
```

### Стъпка 2: Storage

Варианти за съхранение на поръчки:

| Вариант | Плюсове | Минуси |
|---------|---------|--------|
| Vercel KV (Redis) | Бързо, вградено | 30K req/мес безплатно |
| Turso (SQLite) | SQL, безплатен план | Допълнителна настройка |
| Google Sheets API | Организаторите виждат в Sheet | По-бавно, Google auth |
| JSON файл | Просто | Не скалира, губи се при redeploy |

**Препоръка:** Vercel KV или Turso — зависи от обема.

### Стъпка 3: Имейл изпращане

При успешен callback от Paysera, backend-ът изпраща потвърдителен имейл:

| Услуга | Безплатен план | Custom домейн |
|--------|---------------|---------------|
| Resend | 3000 имейла/мес | Да (DNS) |
| Mailgun | 1000 имейла/мес (3 мес trial) | Да (DNS) |
| Gmail (nodemailer) | 500/ден | Не (@gmail.com) |

**Препоръка:** Resend — щедър безплатен план, лесна интеграция, поддържа custom домейн.

### Стъпка 4: Промени в index.html

Файл: `index.html`, submit handler (линии 906-913)

Промени:
- Submit бутонът изпраща `fetch()` към `/api/create-payment`
- Loading state на бутона ("Обработка..." / "Processing...")
- При успех → `window.location.href = redirectUrl` (пренасочване към Paysera)
- При грешка → error съобщение в модала
- Accept page: показва thank you съобщение (може да е `index.html?status=success`)
- Cancel page: показва съобщение за отказ (може да е `index.html?status=cancelled`)

### Стъпка 5: Thank you / Cancel обработка

В custom script блока на `index.html`:
- Проверка на URL параметрите при зареждане (`?status=success` / `?status=cancelled`)
- При `success` → показване на success модал с благодарност
- При `cancelled` → показване на модал с опция за повторен опит

---

## Файлове за промяна / създаване

| Файл | Действие | Описание |
|------|----------|----------|
| `index.html` | Промяна | Submit handler, accept/cancel URL handling |
| `backend/` (нов проект) | Създаване | Node.js API с 3 endpoints |
| `backend/package.json` | Създаване | Dependencies (crypto, resend/nodemailer) |
| `backend/vercel.json` | Създаване | Vercel deployment config |

---

## Тестване

### Тестов режим на Paysera
- Активиране на "Allow test payments" в Paysera dashboard
- Изпращане на `test=1` параметър → плащането е симулирано, без реални пари

### Чеклист за тестване
- [ ] Submit с валидни данни → redirect към Paysera
- [ ] Тестово плащане → redirect обратно към accept URL
- [ ] Callback от Paysera → поръчката маркирана като платена
- [ ] Confirmation имейл получен от потребителя
- [ ] Cancel от Paysera → redirect към cancel URL, опция за retry
- [ ] Submit с невалидни данни → валидация не позволява submit
- [ ] Мрежова грешка → error съобщение
- [ ] BG/EN езикови версии на всички съобщения
- [ ] Mobile: целият flow работи на телефон

---

## Бележки

- Paysera **изисква бизнес регистрация** — активирането отнема няколко работни дни
- `sign_password` **никога не трябва да е в client-side кода** — затова е нужен backend
- Callback URL трябва да е **публично достъпен** — localhost не работи за production
- За локално тестване на callback може да се ползва ngrok или подобен тунел
- Официални Paysera SDK: PHP (`lib-webtopay`), .NET. За Node.js — ръчна имплементация по спецификацията
