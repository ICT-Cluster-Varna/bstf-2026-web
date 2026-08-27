# Спецификация: Възстановяване на индексацията — blackseatech.org

**Дата:** 2026-08-27  
**Приоритет:** Критичен  
**Докладвано от:** Niki Netpeak (Telegram, 09:05)  
**Домейн:** https://www.blackseatech.org/

---

## Проблем

Сайтът изпраща HTTP хедър `x-robots-tag: noindex` към всички crawlers, включително Googlebot. Това инструктира търсачките да не индексират нито една страница. Хедърът **не е** зададен в `web.config` (IIS) — произхожда от Cloudflare (потвърдено по наличието на `__cflb` session cookie в същия response).

```
x-robots-tag: noindex   ← трябва да се премахне
```

Докато хедърът е активен, всички вече индексирани URL-а могат да бъдат деиндексирани при следващ crawl на Google.

---

## Задачи

### Задача 1 — Премахване на `x-robots-tag: noindex` от Cloudflare

**Къде:** Cloudflare Dashboard → акаунт за `blackseatech.org`

**Стъпки:**
1. Влез в Cloudflare Dashboard.
2. Избери зоната `blackseatech.org`.
3. Провери в **Rules → Transform Rules → Modify Response Header** — ако има правило, което добавя `x-robots-tag: noindex`, изтрий го или го деактивирай.
4. Провери и в **Rules → Page Rules** за евентуален "Disable indexing" флаг.
5. Провери в **Speed → Optimization** дали "Automatic Platform Optimization" е активно и дали носи noindex.
6. След промяната — **Purge All Cache** (Caching → Configuration → Purge Everything).
7. Верифицирай с:
   ```bash
   curl -sS -o /dev/null -D - https://www.blackseatech.org/ | grep -i x-robots
   ```
   Очакван резултат: редът `x-robots-tag` да липсва.

---

### Задача 2 — Добавяне на DNS TXT запис за Google Search Console

**Цел:** Верификация на собственост в Google Search Console за по-бързо възстановяване на индексацията.

**Стойност на записа:**
```
google-site-verification=dp3G3PruydsVoMkWaaR_gdZKcO5K_YwC-wjmptxTZHQ
```

**Стъпки:**
1. Влез в Cloudflare Dashboard → зона `blackseatech.org` → **DNS → Records**.
2. Добави нов запис:

   | Поле | Стойност |
   |---|---|
   | Type | `TXT` |
   | Name | `@` (корен на домейна) |
   | Content | `google-site-verification=dp3G3PruydsVoMkWaaR_gdZKcO5K_YwC-wjmptxTZHQ` |
   | TTL | Auto |
   | Proxy | DNS only (сив облак — TXT записи не се проксират) |

3. Запази.
4. Изчакай DNS propagation (обикновено 1–5 мин при Cloudflare).
5. Верифицирай в Google Search Console → Add Property → Domain.

---

### Задача 3 — Поискай повторно индексиране (след Задача 1 и 2)

1. Влез в Google Search Console за `blackseatech.org`.
2. Провери **Coverage / Indexing** — трябва да се вижда падането на индексираните страници.
3. Използвай **URL Inspection → Request Indexing** за главните URL-а:
   - `https://www.blackseatech.org/`
   - `https://www.blackseatech.org/en/`
   - `https://www.blackseatech.org/speakers.html`
   - `https://www.blackseatech.org/sponsors.html`
4. Submit-ни `sitemap.xml` ако не е submitнат: `https://www.blackseatech.org/sitemap.xml`

---

## Приемателни критерии

- [ ] `curl -sS -o /dev/null -D - https://www.blackseatech.org/ | grep -i x-robots` връща **празен резултат**
- [ ] DNS TXT запис с `google-site-verification=...` е видим: `dig TXT blackseatech.org`
- [ ] Google Search Console показва верификацията като успешна
- [ ] Google Search Console не показва нови "noindex" грешки в Coverage

---

## Бележки

- `robots.txt` в репото (`/robots.txt`) **не** е причината за проблема — той не съдържа `noindex` директива.
- `speaker.html` и `en/speaker.html` умишлено имат `<meta name="robots" content="noindex">` — те са redirect shims и **трябва** да останат noindex.
- Промяната е изцяло в Cloudflare и DNS — **не изисква deploy** на кода.
