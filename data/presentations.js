/*
 * CONNEXUS 2026 - speaker presentations (PDF), single source of truth.
 * Each entry points at one PDF hosted on this site in /presentations/
 * (compressed, latin kebab-case name, e.g. dimitar-karlovski.pdf).
 *   - NO ?v= on PDF links. A PDF is never edited in place: a corrected deck
 *     is a NEW file name (dimitar-karlovski-v2.pdf) and this entry is updated.
 *   - `drive` is the id of the backup copy in the shared Google Drive folder
 *     "CONNEXUS 2026 - Презентации PDF"; it is a record only, never linked.
 * Consumed by:
 *   - index.html / en/index.html  (program: talk title -> PDF; keys are
 *     referenced from PROGRAM_SCHEDULE)
 *   - the speaker-page generator  (speakers have `decks: ['key', ...]` in
 *     data/speakers-data.js; the block at the bottom of each speaker page)
 * titleBg/titleEn = the talk title exactly as the program shows it, or the
 * deck's own title slide where the program names the speaker but no title.
 * Loaded as a plain <script> so it works over file:// too.
 */
(function (global) {
  'use strict';

  global.CONNEXUS_DECKS = {
    "simeon-keynote": { file: "simeon-stoyanov-brain-keynote.pdf", titleBg: "Основен доклад: Катализатор на възможности: българската AI фабрика BRAIN++ – защо, какво и как", titleEn: "Keynote: Enabler for Opportunities: Bulgarian AI BRAIN++ Factory – Why/What & How", drive: "1Utsg-a8f4NB9aiK-87JdwOYDJXpt9hnT" },
    "lazarov": { file: "borislav-lazarov.pdf", titleBg: "Интелигентно управление в енергията: от данните към решенията", titleEn: "Intelligent Energy Management - From Data to Decisions", drive: "1ZQ8TF3Q2ulEKM_7JXByPTefjcIbDzdea" },
    "zhelyazkov": { file: "iliya-zhelyazkov.pdf", titleBg: "Ако енергията можеше да мисли? AI – от прогнозиране до автономни енергийни решения", titleEn: "What If Energy Could Think? AI - From Forecasting to Autonomous Energy Decisions", drive: "1ZsFVOde4k7gsPjRPPQsCnOf6FRePurV_" },
    "topalov": { file: "petar-topalov.pdf", titleBg: "AI трансформация на практика: какво научих след 10 месеца", titleEn: "AI Transformation in Practice: What I Learned After 10 Months", drive: "13xH3L-IvJoqcCZxsRAn013hbW_PhezPZ" },
    "eskenazi": { file: "kristina-eskenazi.pdf", titleBg: "Бъдещето на здравеопазването и науките за живота: от научни постижения към мащабируеми иновации", titleEn: "Future of Health & Life Sciences: From Research Excellence to Scalable Innovation", drive: "1K9T6ef5GdHDmjBKhIkP6PRS6ZrnXab7h" },
    "karlovski": { file: "dimitar-karlovski.pdf", titleBg: "Практически пример – митохондриите като Ци: да пребъде Силата с теб", titleEn: "Practical Use Case: Mitochondria as Chi: May the Force Be with You", drive: "1BOrv2gRt2c1dx4a_yO9rB5I20AgtsNFS" },
    "encheva": { file: "elitsa-encheva.pdf", titleBg: "Образна диагностика на тумори както никога досега", titleEn: "Imaging Tumor Like Never Before", drive: "1IEqszLJWKxzhdRW38J5UwRsq8NQX0ABx" },
    "tonchev": { file: "anton-tonchev.pdf", titleBg: "Поглед в микросвета и отвъд него", titleEn: "Zoom into the Micro-World, and Beyond", drive: "14fTalqLEopsEmHDrgVUBhrZgFs3I2qn2" },
    "bliznakova": { file: "kristina-bliznakova.pdf", titleBg: "Ранен скрининг за рак на гърдата", titleEn: "Early Screening of Breast Cancer", drive: "1e3Q-zIqF0HAunWqrFkYi1V1LAO1ouZpz" },
    "pancheva": { file: "ruzha-pancheva.pdf", titleBg: "Изкуствен интелект в подкрепа на детското хранене: от научните данни до персонализираните препоръки", titleEn: "AI in Support of Child Nutrition: From Scientific Data to Personalized Recommendations", drive: "1dK2w9ZmvaCxH99Dn3Qy0rpXx9KhJeK8Q" },
    "boshnakov": { file: "petyo-boshnakov.pdf", titleBg: "Иновационни технологии във винопроизводството", titleEn: "Innovative Technologies in Winemaking", drive: "1dkYE5NXg0n_wpwGA7JXX3ZlADMN3UH0b" },
    "tasinov": { file: "oskan-tasinov.pdf", titleBg: "WineX – повече от вино", titleEn: "WineX - More Than Wine", drive: "1bkBGzQnkHv9mKJhS4qSMywta2MKzeG5x" },
    "barash": { file: "gilad-barash.pdf", titleBg: "Основен доклад: Как компаниите внедряват изкуствен интелект устойчиво", titleEn: "Keynote: How Companies Implement AI Sustainably", drive: "1MB2JVikcNZgNipjUoGvjLNIoo4c7WEZY" },
    "kordon-applied": { file: "arthur-kordon-applied-business-ai.pdf", titleBg: "Приложен бизнес AI – от Тъмните векове към агентното бъдеще", titleEn: "Applied Business AI — From the Dark Ages to the Agentic Future", drive: "1_zXg-NcG3gJNRrEqFF0JjuTHIZf1PYKK" },
    "kuvandzhiev": { file: "martin-kuvandzhiev.pdf", titleBg: "Блокчейн, финтех и изкуствен интелект: следващата вълна от иновации", titleEn: "Blockchain, Fintech, and AI: The Next Wave of Innovation", drive: "1SZ2QRlyi_GVSuwiiPcthYXu2UZf5U8Ez" },
    "madzharov": { file: "todor-madzharov.pdf", titleBg: "AI пътят на MEAVO – единна корпоративна платформа за 6 месеца, която обслужва всички процеси: от веригата на доставки и производството до продажбите и обслужването на клиенти", titleEn: "MEAVO’s AI Journey: Building a Unified Enterprise Platform in 6 Months to Power End-to-End Operations—from Supply Chain and Manufacturing to Sales and Customer Support", drive: "1YadTudQDX3zDuJWeAkppgRHWEqNH8tE9" },
    "syvak": { file: "oleksandr-syvak.pdf", titleBg: "AI в лабораторията – от заданието до готовия модел", titleEn: "AI in the Laboratory – From Brief to Finished Model", drive: "1t3mwpwWjQNORurbqiEyZz-8gKtizqOdt" },
    "vatkov": { file: "dragomir-vatkov.pdf", titleBg: "Основен доклад: Невидимата архитектура – как основите на киберсигурността определят устойчивостта в непредсказуем свят", titleEn: "Keynote: The Invisible Architecture: How Cyber Security Foundations Determine Resilience in an Unpredictable World", drive: "12g7dOdX5_7gJfOBMkCdlNyNQZwjzlJ1a" },
    "savov": { file: "ilin-savov.pdf", titleBg: "Бизнесът в центъра – киберпревенция, човешко поведение и устойчивост в дигиталната буря", titleEn: "Business at the Centre – Cyber Prevention, Human Behaviour, and Resilience in the Digital Storm", drive: "1LG7f9Ko1Jq_Xyy-2K6Dm1J1Zac6qBuAb" },
    "minchev-konev": { file: "alexander-minchev-ivaylo-konev.pdf", titleBg: "Физическите аспекти на сигурността на данните", titleEn: "The Physical Aspects of Data Security", drive: "1XenzfEkMFmeYtXhGybJO9M1Xevt41igT" },
    "koleva": { file: "yoana-koleva.pdf", titleBg: "DPO (длъжностно лице по защита на данните) и AI", titleEn: "DPO (Data Protection Officer) and AI", drive: "1J3mlC42ACsr2HnayfZtyN5NKp1HfgY9v" },
    "daskalov-identity": { file: "hristiyan-daskalov-digital-identity.pdf", titleBg: "Европейските портфейли за цифрова самоличност са тук - възможности и рискове за граждани, държава, бизнес", titleEn: "European Digital Identity Wallets Are Here - Opportunities and Risks for Citizens, State, and Business", drive: "1gT07CN2vPN2DV4LR6w8jldCXwrxuZuCz" },
    "tanev": { file: "yasen-tanev.pdf", titleBg: "Помощ, а не тежест: Как да превърнем регулаторните изисквания в реална киберсигурност", titleEn: "Help, Not a Burden: Turning Regulatory Requirements into Real Cybersecurity", drive: "1wr5R11qSvfzT_W7E2SRKeyhso2ODRYZ4" },
    "lambert": { file: "paul-lambert.pdf", titleBg: "Основите имат значение", titleEn: "Foundations Matter", drive: "1owITaVAqFjjGauqV8h5aJEpVSzd89BEN" },
    "punter": { file: "teade-punter.pdf", titleBg: "Откриваща лекция (keynote): Интеграция на интелигентни системи", titleEn: "Opening Keynote: Smart System Integration", drive: "18oFaWzel2mp_hO5-qEchiWzg1C4eS1t0" },
    "horinouchi": { file: "mitsuru-horinouchi.pdf", titleBg: "Подходът на Япония, основан на концепцията „Общество 5.0“", titleEn: "Japan’s Approach: The Society 5.0 Concept", drive: "1EyAgUf3JCaITiyPIA8NK7h7uufo-7lvK" },
    "nikolov": { file: "georgi-nikolov.pdf", titleBg: "Примерът на Renesas", titleEn: "The Renesas Example", drive: "1C6c7kTakypKX6OSsMKT3t-e42fzQcZuu" },
    "dinev": { file: "konstantin-dinev.pdf", titleBg: "Примерът на Robotoplus", titleEn: "The Robotoplus Example", drive: "1w0ZpvQtnyAF-jlyJXOvd2crgomrQ9V2w" },
    "vasileva": { file: "dochka-vasileva.pdf", titleBg: "Фонд на фондовете", titleEn: "Fund of Funds", drive: "1uJ1SltUkts2y3RnZcs_NT5f1IQUCcpWU" },
    "svetlin": { file: "svetlin-stoyanov.pdf", titleBg: "AI в корабостроенето", titleEn: "AI in Shipbuilding", drive: "1DQ38AYNjqJ6amKpN2avVjyO2uD316ujl" },
    "cemile-maritime": { file: "cemile-koseler-usta-maritime-intelligence.pdf", titleBg: "Морска аналитика: данните като основа за по-умни, по-зелени и по-устойчиви операции", titleEn: "Maritime Intelligence: Transforming Data into Smarter, Greener and More Resilient Operations", drive: "1k-PB10glbJ4q3AkgNN05ub3rjP5C9F-q" },
    "mednikarov": { file: "boyan-mednikarov.pdf", titleBg: "Иновативното образование като основа за развитие на морските технологии", titleEn: "Innovative Education as a Foundation for the Development of Maritime Technologies", drive: "1r0fPU3Ty7gty-a-MhJY1QlHEn4HPcOmz" },
    "kanchev": { file: "grigor-kanchev.pdf", titleBg: "Технологична трансформация на данните", titleEn: "Technology Data Transform", drive: "1hQMtWjeLstjWekIVJ-NAf-5amy8yfnBH" },
    "teberov": { file: "borislav-teberov.pdf", titleBg: "Автономни морски системи за реални мисии", titleEn: "Autonomous Maritime Systems Build for Real-World Missions", drive: "1VO3M9laWreJMJHtr_78IwdBlGLO0OXU8" },
    "bayezit": { file: "ismail-bayezit.pdf", titleBg: "„Навигация към бъдещето с автономни кораби“", titleEn: "Navigating the Future with Autonomous Ships", drive: "1tu2Bx9ptnDcd8KfF3KUpj_OCCx-bVyHI" },
    "bultisad": { file: "kerem-ozbek-bultisad.pdf", titleBg: "Визията на камарата", titleEn: "Chamber Vision", drive: "1ab2z22kvV8goYYPVcQrwnn4YlnrCwuoB" },
    "erguner": { file: "dogukan-erguner.pdf", titleBg: "UMİ – анализ на медии с отворен код", titleEn: "UMİ – Open-Source Media Analysis", drive: "1sksST6T-iLj4J_9AVPZ5elfSGke5YXjm" },
    "daskalov-cybersec": { file: "hristiyan-daskalov-cybersec4ot.pdf", titleBg: "Проект CyberSec4OT", titleEn: "CyberSec4OT Project", drive: "1ZQGRWv-pg2pfgWjdTmTX36UPzYbpMl12" },
    "leijten": { file: "martijn-leijten.pdf", titleBg: "Социотехнически системи за стабилна критична инфраструктура", titleEn: "Socio-technical systems for robust critical infrastructures", drive: "19Sb1FCLul3KZKqEKiAZDnRBSmhibL9HD" },
    "cemile-ici": { file: "cemile-koseler-usta-istanbul-chamber-of-industry.pdf", titleBg: "Възможности за сътрудничество с Истанбулската индустриална камара", titleEn: "Exploring Collaboration Opportunities with Istanbul Chamber of Industry", drive: "1h9sxevM-PB9CRlWrnFiI2NUyW3aiVYyV" },
    "sanli": { file: "miray-sanli.pdf", titleBg: "Трансфер на технологии от Технопарк Измир", titleEn: "Technology Transfer from Teknopark İzmir", drive: "1dJhNEVyao4wdrkhQj9KMcWfodI5698Rx" },
    "hertum": { file: "jeroen-van-hertum.pdf", titleBg: "Една врата, много врати: как мрежата от камари помага на турски компании да растат в България и отвъд", titleEn: "One door, many doors: How the chamber network helps Turkish companies grow in Bulgaria and beyond", drive: "1qNT96YYgrMWoLh5nWizEAepes_O1_rkB" },
    "slavov": { file: "gerasim-slavov.pdf", titleBg: "Дигиталният хъб като портал към AI фабрики", titleEn: "The Digital Hub as a Gateway to AI Factories", drive: "115U5aiyngMbvfv8w4g94ZywrZt7pN5si" },
    "hristo-daskalov": { file: "hristo-daskalov.pdf", titleBg: "Инвестиции в Турция, пазарът на Близкия изток", titleEn: "Investments in Türkiye, Middle East Market", drive: "1XKHshlCIGMMKyDjPEtKwi1YRhYS0IbI3" },
    "ozbek-cambro": { file: "kerem-ozbek-cambro-bg.pdf", titleBg: "Международна инвестиция в България – пример", titleEn: "International Investment in Bulgaria – An Example", drive: "1gwEBY9qF555u2eG0RLAHu7JQpjHqMoqc" },
    "lilov": { file: "andrey-lilov.pdf", titleBg: "Интелигентен туризъм", titleEn: "Smart Tourism", drive: "1jsYeYIKauU0jvE7-ORaJPZaZQEVJT9pf" },
    "stoilova": { file: "elitsa-stoilova.pdf", titleBg: "AI в туризма", titleEn: "AI in Tourism", drive: "1gX65P2ampzh83Pew19FfxkF1j3hP8JYL" },
    "hristov": { file: "hristo-hristov.pdf", titleBg: "Бъдещето на мобилността: от притежанието към достъпа", titleEn: "The Future of Mobility: From Ownership to Access", drive: "1s7ETBu1PinvR62skqiwXqCCkq0IB8Zvv" },
    "yankova": { file: "veselina-yankova.pdf", titleBg: "Интелигентният град Дубай през очите на жител", titleEn: "Smart City Dubai Through the Eyes of a Resident", drive: "1gx-_QS01URLXZzkVYbAh8s2EgbAKK3wx" },
    "kostadinov": { file: "kalin-kostadinov.pdf", titleBg: "От данни към решения: цифровият близнак на София и City Living Lab на практика", titleEn: "From Data to Decisions: Sofia’s Digital Twin and City Living Lab in Practice", drive: "1ohOxI3EQr82LIenBq0uNKgtRwfKXHN-H" },
    "kisimov": { file: "valentin-kisimov.pdf", titleBg: "Дигитализация на икономиката в среда на големите данни", titleEn: "Digitalization of the Economy in a Big Data Environment", drive: "1tr1SnUcARHjftZUd7DWvhxzF36WjVZs6" },
    "rusimov": { file: "tsvetan-rusimov.pdf", titleBg: "AI може да го създаде. Но кой ще го поиска?", titleEn: "AI Can Build It. Who Will Want It?", drive: "1lb_PtQX07IGeBy10BbgMDhXir50V_nxO" },
    "petek": { file: "dominik-petek.pdf", titleBg: "AI агенти в снабдяването", titleEn: "AI Agents in Procurement", drive: "1TUKwNCvY6p5qN3AtoKPDwEyG0kuPE7yi" },
    "stavrov": { file: "teodor-stavrov.pdf", titleBg: "AI не се намира просто на едно място", titleEn: "AI Is Not Found in Just One Place", drive: "1eGM347qAmovwcMPk4qOc8KLDlRLVK7bc" },
    "borisov": { file: "zvezdelin-borisov.pdf", titleBg: "CHAIN++: федерирано езеро от данни за AI", titleEn: "Federated AI Data Lake CHAIN++", drive: "1_ummtky5cQzfsMkkIQYGmH2gi8dSYaAK" },
    "petkanov": { file: "nikolay-petkanov.pdf", titleBg: "Основен доклад: От внимание към възможност. Как бизнесът печели доверие и бива избран в ерата на AI", titleEn: "Keynote: From Attention to Opportunity. How Businesses Earn Trust and Get Chosen in the Age of AI", drive: "13I5ZDXnQV3nn-T1jo2g5bQiQxhz7UKJn" },
    "valev": { file: "nikolay-valev.pdf", titleBg: "Как модерните бизнеси ще използват AI през следващите 5 години", titleEn: "How Modern Businesses Will Use AI Over the Next 5 Years", drive: "1K6xJSiz8FoQaNSE8HK04dtv-Thit3Ky_" },
    "goshev": { file: "alexander-goshev.pdf", titleBg: "От съдържание към действие - как AI променя маркетинга", titleEn: "From Content to Action - How AI Is Changing Marketing", drive: "11XVjzlXY0Kk-SmhewsL2rQoaKnaLcKUw" },
    "brzoska": { file: "malgorzata-brzoska.pdf", titleBg: "Предимството LinkedIn – дигиталната ви репутация започва в LinkedIn", titleEn: "The LinkedIn Advantage - Your Digital Reputation Starts on LinkedIn", drive: "1te722wy806x-158ErqqfQPiwZoI0D6Fl" },
    "fotev": { file: "stanislav-fotev.pdf", titleBg: "Вътрешно предприемачество", titleEn: "Intrapreneurship", drive: "1dOvmf_q-Gt1Is4cKfKVyhuc7ysuiW162" },
    "todorova": { file: "mariyana-todorova.pdf", titleBg: "Какво предстои?!", titleEn: "What’s Coming?!", drive: "1kKUYHq4ra68Z-CCI5n78iG4vUv2ytD1u" },
    "simeon-ahead": { file: "simeon-stoyanov-whats-ahead.pdf", titleBg: "Какво предстои?!", titleEn: "What’s Coming?!", drive: "1FtO35Kh9a3OWMK1FSKExsGSMGG1w4jCz" },
    "pavlov": { file: "radoy-pavlov.pdf", titleBg: "Опитът на Швейцария в дигитализацията", titleEn: "Switzerland’s Experience in Digitalization", drive: "1PJl-Lwm6bZ9BqJz3t9rywu7GEujzIFT_" },
    "ayrakova": { file: "rozalina-ayrakova.pdf", titleBg: "Тенденции и възможности за двустранната търговия между Обединеното кралство и България", titleEn: "Trends and Opportunities for Bilateral Trade Between the UK and Bulgaria", drive: "1ew-99n3hIV1soK1ZdWfNla6P50kTxeUA" },
    "kordon-workshop": { file: "arthur-kordon-workshop.pdf", titleBg: "Адаптиране на бизнеса към модерен начин на работа, задвижван от AI", titleEn: "Adjusting the Business towards a Modern AI-driven Mode of Operation", drive: "1Dv4NOIaBj8E0DpINGuWe4mbMyqVSbWqQ" }
  };

  global.connexusDeckUrl = function (key) {
    var d = global.CONNEXUS_DECKS[key];
    return d ? '/presentations/' + d.file : null;
  };
})(window);
