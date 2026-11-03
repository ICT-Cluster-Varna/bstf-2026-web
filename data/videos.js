/* Conference recordings (video/{year}/), rendered by shared/videos.js.
   Day -> hall -> session (one YouTube playlist each) -> videos (one per
   talk / speaker, in playlist order). A session without `videos` shows as
   "coming soon". Video: `id` (YouTube id), `dur`, title bg/en from the
   program, `speakers` [{bg, en, slug?}] — slug links the speaker's profile
   page. A video without `id` is announced but not uploaded yet ("скоро").
   Where the organizers put two program sessions in one playlist, they are
   one session here (Day 1 13:00, Day 2 Bulgaria 09:00, Day 2 Varna 09:10,
   Day 3 Bulgaria 15:00 + the closing). A session the organizers uploaded as
   one video has no `playlist`.
   Thumbnails are self-hosted: images/video/{year}/{id}.jpg (YouTube's
   maxresdefault, fetched once), so the page loads nothing from YouTube
   until someone presses play. `thumbs` is their ?v= stamp.
   Subtitles are YouTube's own (auto-captions + YouTube's translation); the
   page only needs to know which caption track a video has: v.cc / v.track,
   set from CAPTIONS / CHECKED / TRACKS below. */
(function () {
  function P(bg, en, slug) { return slug ? { bg: bg, en: en, slug: slug } : { bg: bg, en: en }; }
  function V(id, dur, bg, en, speakers) { return { id: id, dur: dur, bg: bg, en: en, speakers: speakers || [] }; }

  var STAMENOV = P('Светослав Стаменов', 'Svetoslav Stamenov');
  var STEFANOV = P('Руслан Стефанов', 'Ruslan Stefanov', 'ruslan-stefanov');
  var VAN_HERTUM = P('Jeroen van Hertum', 'Jeroen van Hertum', 'jeroen-van-hertum');
  var DOBREV = P('Георги Добрев', 'Georgi Dobrev', 'georgi-dobrev');
  var VATKOV = P('Драгомир Вътков', 'Dragomir Vatkov', 'dragomir-vatkov');
  var BARASH = P('Gilad Barash', 'Gilad Barash', 'gilad-barash');
  var VEENSTRA = P('Albert Veenstra', 'Albert Veenstra');
  var LEIJTEN = P('д-р Martijn Leijten', 'Dr. Martijn Leijten', 'martijn-leijten');
  var OZBEK = P('Kerem Ozbek', 'Kerem Ozbek', 'kerem-ozbek');
  var S_IVANOV = P('проф. Станислав Иванов', 'Prof. Stanislav Ivanov', 'stanislav-ivanov');
  var H_DASKALOV = P('Християн Даскалов', 'Hristiyan Daskalov', 'hristian-daskalov');
  var AYRAKOVA = P('Розалина Айракова', 'Rozalina Ayrakova', 'rozalina-ayrakova');
  var KORDON = P('д-р Артур Кордон', 'Dr Arthur Kordon', 'arthur-kordon');
  var TSANKOV = P('Емил Цанков', 'Emil Tsankov');
  var TODOROVA = P('доц. д-р Марияна Тодорова', 'Assoc. Prof. Dr. Mariyana Todorova', 'mariyana-todorova');
  var S_STOYANOV = P('проф. Симеон Стоянов', 'Prof. Simeon Stoyanov', 'simeon-stoyanov');
  var PETKANOV = P('Николай Петканов', 'Nikolay Petkanov', 'nikolay-petkanov');

  window.CONNEXUS_VIDEOS = {
    2026: {
      thumbs: '20261103',
      days: [
        {
          key: 'den-1', title: { bg: 'Ден 1', en: 'Day 1' }, date: { bg: '5 октомври', en: '5 October' },
          halls: [
            {
              hall: 'bulgaria',
              sessions: [
                {
                  time: '13:00', bg: 'Официално откриване и приветствия', en: 'Official Opening and Welcome Addresses',
                  playlist: 'PLMv35F1RV44o',
                  videos: [
                    V('IuKq4JjeJMw', '6:47', 'Официално откриване', 'Official Opening', [STAMENOV]),
                    V('IYOgAlwKaDY', '11:50', 'Откриване: решаващ момент за европейските иновации', 'Opening: A Pivotal Moment for European Innovation',
                      [P('Емил Цанков', 'Emil Tsankov'), P('д-р Бойко Таков', 'Dr. Boyko Takov'), P('инж. Пламен Китипов', 'Eng. Plamen Kitipov')]),
                    V('ro1V_PgaBXM', '27:03', 'Приветствия', 'Welcome Addresses', [P('Иван Василев', 'Ivan Vasilev'), P('Илин Димитров', 'Ilin Dimitrov')]),
                    V('FIaVzUTvnec', '16:07', 'Основен доклад: Черноморските полюси на растеж', 'Keynote Address: Black Sea Growth Poles', [P('Илияна Йотова', 'Iliana Iotova')]),
                    V('0knzVVoLv70', '3:11', 'Какво сме предвидили в Connexus “Black Sea Forum Varna”', 'What We Have Planned at Connexus “Black Sea Forum Varna”'),
                    V('nKnoQsbmODk', '18:26', 'Към европейска иновационна екосистема: как Европа може да се конкурира и да си сътрудничи със САЩ и Китай', 'Towards a European Innovation Ecosystem: How Can Europe Compete and Collaborate with the US and China',
                      [P('Lars Frølund', 'Lars Frølund', 'lars-frolund'), P('Невен Дилков', 'Neven Dilkov', 'neven-dilkov'), P('Светослава Георгиева', 'Svetoslava Georgieva', 'svetoslava-georgieva'), STEFANOV])
                  ]
                },
                { time: '14:25', bg: 'Блок 1: Дигитална трансформация', en: 'Block 1: Digital Transformation' },
                { time: '16:10', bg: 'Блок 2: История на проглеждането: приложен изкуствен интелект – от възможност до оперативни резултати', en: 'Block 2: A Story of Seeing Clearly: Applied AI – from Opportunity to Operational Results' },
                { time: '18:00', bg: 'Техностарт Мотиватор', en: 'Technostart Motivator' }
              ]
            },
            {
              hall: 'varna',
              sessions: [
                { time: '14:25', bg: 'Биотехнологии, здраве и устойчиви индустрии', en: 'Biotechnology, Health and Sustainable Industries' },
                {
                  time: '16:10', bg: 'Обмен между България и Нидерландия', en: 'Exchange Between Bulgaria and the Netherlands',
                  playlist: 'PLUSr0I33E998',
                  videos: [
                    V('rQpQFJbzi5Q', '31:36', 'Дигитална и AI трансформация за индустриален растеж: сигурни европейски вериги за доставки', 'Digital & AI Transformation for Industrial Growth: Secure European Supply Chains',
                      [VAN_HERTUM, P('Стоян Златков', 'Stoyan Zlatkov', 'stoyan-zlatkov'), P('Филип Балкански', 'Philip Balkanski', 'philip-balkanski'), DOBREV]),
                    V('XwoW_PcZ2J4', '42:09', 'Ускоряване на черноморската иновационна екосистема: трансфер на технологии и възможности за растеж', 'Supercharging the Black Sea Innovation Ecosystem: Technology Transfer and Scale-Up Opportunities',
                      [P('Пламен Борисов', 'Plamen Borisov'), P('Татяна Иванова', 'Tatyana Ivanova', 'tatyana-ivanova'), STEFANOV, STAMENOV])
                  ]
                }
              ]
            }
          ]
        },
        {
          key: 'den-2', title: { bg: 'Ден 2', en: 'Day 2' }, date: { bg: '6 октомври', en: '6 October' },
          halls: [
            {
              hall: 'bulgaria',
              sessions: [
                {
                  time: '09:00', bg: 'Блок 1: AI и автоматизацията като отговор на растящите разходи и недостига на ресурси', en: 'Block 1: AI and Automation as a Response to Rising Costs and Resource Shortages',
                  playlist: 'PLDMrebPJICWg',
                  videos: [
                    V('F8z7lGcBExw', '6:26', 'Откриване и обобщение от Ден 1', 'Opening and Summary of Day 1'),
                    V('-FryU9bg4i8', '15:02', 'Основен доклад: Как компаниите внедряват изкуствен интелект устойчиво', 'Keynote: How Companies Implement AI Sustainably', [BARASH]),
                    V('8cHpY5-CoTA', '23:42', 'Приложен бизнес AI – от Тъмните векове към агентното бъдеще', 'Applied Business AI — From the Dark Ages to the Agentic Future', [KORDON]),
                    V('AJCirgcO5KA', '8:49', 'Блокчейн, финтех и изкуствен интелект: следващата вълна от иновации', 'Blockchain, Fintech, and AI: The Next Wave of Innovation', [P('Мартин Куванджиев', 'Martin Kuvandzhiev', 'martin-kuvandzhiev')]),
                    V('oBG1QahzUk4', '17:36', 'AI пътят на MEAVO – единна корпоративна платформа за 6 месеца', 'MEAVO’s AI Journey: Building a Unified Enterprise Platform in 6 Months', [P('Тодор Маджаров', 'Todor Madzharov', 'todor-madzharov')]),
                    V('SZXTSm_zAug', '9:51', 'AI в лабораторията – от заданието до готовия модел', 'AI in the Laboratory – From Brief to Finished Model', [P('Олександър Сивак', 'Oleksandr Syvak', 'oleksandr-syvak'), P('Ксения Середяк', 'Kseniia Serediak')]),
                    V('HxDkxEk9z6s', '11:17', 'Отговорно внедряване на AI: хора, процеси и данни', 'Responsible AI Adoption: People, Processes and Data', [P('Ева Петрова', 'Eva Petrova', 'eva-petrova'), P('Кристиан Илиев', 'Kristian Iliev', 'kristian-iliev')]),
                    V('iMpZPnTptCI', '7:48', 'Панел: AI и автоматизацията като отговор на растящите разходи и недостига на ресурси', 'Panel: AI and Automation as a Response to Rising Costs and Resource Shortages', [BARASH])
                  ]
                },
                {
                  time: '10:55', bg: 'Блок 2: Сигурни данни, устойчиви вериги и киберустойчив бизнес', en: 'Block 2: Secure Data, Resilient Supply Chains, and Cyber-Resilient Business',
                  playlist: 'PLIqUuzrrw4Nw',
                  videos: [
                    V('wM4fqSuhSDA', '13:10', 'Основен доклад: Невидимата архитектура', 'Keynote: The Invisible Architecture', [VATKOV]),
                    V('vobHOoMmbvc', '11:35', 'Бизнесът в центъра – киберпревенция, човешко поведение и устойчивост в дигиталната буря', 'Business at the Centre – Cyber Prevention, Human Behaviour, and Resilience in the Digital Storm',
                      [P('старши комисар проф. д-р Илин Савов, д.н.', 'Senior Commissioner Prof. Ilin Savov, PhD, DSc', 'ilin-savov')]),
                    V('MN4XdPyRIx8', '19:13', 'Физическите аспекти на сигурността на данните', 'The Physical Aspects of Data Security', [P('Александър Минчев', 'Alexander Minchev', 'alexander-minchev'), P('Ивайло Конев', 'Ivaylo Konev', 'ivaylo-konev')]),
                    V('U7ze-eGI7M0', '13:34', 'DPO (длъжностно лице по защита на данните) и AI', 'DPO (Data Protection Officer) and AI', [P('Йоана Колева', 'Yoana Koleva', 'yoana-koleva')]),
                    V('ntggxjUhQiA', '12:03', 'Европейските портфейли за цифрова самоличност са тук – възможности и рискове за граждани, държава, бизнес', 'European Digital Identity Wallets Are Here – Opportunities and Risks for Citizens, State, and Business', [H_DASKALOV]),
                    V('b4mYnIO2uoI', '9:51', 'Помощ, а не тежест: как да превърнем регулаторните изисквания в реална киберсигурност', 'Help, Not a Burden: Turning Regulatory Requirements into Real Cybersecurity', [P('Ясен Танев', 'Yasen Tanev', 'yasen-tanev')]),
                    V('n0Fn9edO5l8', '16:08', 'Основите имат значение', 'Foundations Matter', [P('Paul Lambert', 'Paul Lambert', 'paul-lambert')])
                  ]
                },
                {
                  time: '13:15', bg: 'Блок 3: Автоматизация: Роботика + Смарт земеделие', en: 'Block 3: Automation: Robotics + Smart Agriculture',
                  playlist: 'PLSwsTQ7uwTxk',
                  videos: [
                    V('48PXXUKU9RA', '19:19', 'Откриваща лекция (keynote): Интеграция на интелигентни системи', 'Opening Keynote: Smart System Integration',
                      [P('проф. Teade Punter', 'Prof. Teade Punter', 'teade-punter')]),
                    V('eNbUUmv1JJ4', '10:34', 'Примерът на Renesas', 'The Renesas Example', [P('д-р Георги Николов', 'Dr. Georgi Nikolov', 'georgi-nikolov')]),
                    V('CQBwskZEw1Y', '10:10', 'Подходът на Япония, основан на концепцията „Общество 5.0“', 'Japan’s Approach: The Society 5.0 Concept',
                      [P('Mitsuru Horinouchi', 'Mitsuru Horinouchi', 'mitsuru-horinouchi')]),
                    V('Zu_QqCmjxv8', '9:57', 'Примерът на Robotoplus', 'The Robotoplus Example', [P('Константин Динев', 'Konstantin Dinev', 'konstantin-dinev')]),
                    // panelists not named by the program: confirm with the organizers
                    V('ixgNMlIWgBo', '7:00', 'Панел: Автоматизация: Роботика + Смарт земеделие', 'Panel: Automation: Robotics + Smart Agriculture'),
                    V('hZKaJVmu8bo', '10:00', 'Технологии в земеделието — внедряване на AI', 'Technologies in Agriculture — AI Adoption', [P('Илия Йорданов', 'Ilia Iordanov', 'ilia-iordanov')])
                  ]
                },
                {
                  time: '15:00', bg: 'Блок 4: Финансиране, износ, нови пазари, венчърни фондове', en: 'Block 4: Financing, Export, New Markets, Venture Funds',
                  videos: [
                    V('ZXiHOqQ0POQ', '1:16:24', 'Финансиране, износ, нови пазари, венчърни фондове', 'Financing, Exports, New Markets, Venture Funds',
                      [P('Антон Тодоров', 'Anton Todorov', 'anton-todorov'), P('Габриела Горанова-Димчева', 'Gabriela Goranova-Dimcheva'),
                        P('д-р Дочка Василева', 'Dr. Dochka Vasileva', 'dochka-vasileva'), P('д-р Бойко Таков', 'Dr. Boyko Takov')])
                  ]
                },
                {
                  time: '16:40', bg: 'Блок 5: Морски технологии', en: 'Block 5: Maritime Technologies',
                  playlist: 'PLfYmTyLkqUyg',
                  videos: [
                    V('qEhzLaSOI3I', '10:04', 'AI в корабостроенето', 'AI in Shipbuilding', [P('Светлин Стоянов', 'Svetlin Stoyanov', 'svetlin-stoyanov')]),
                    V('AFNz7HkalRc', '14:20', 'Морска аналитика: данните като основа за по-умни, по-зелени и по-устойчиви операции',
                      'Maritime Intelligence: Transforming Data into Smarter, Greener and More Resilient Operations', [P('Cemile Köseler Usta', 'Cemile Köseler Usta', 'cemile-usta')]),
                    V('fY0pLxvxz_Q', '12:19', 'Иновативното образование като основа за развитие на морските технологии',
                      'Innovative Education as a Foundation for the Development of Maritime Technologies', [P('проф. двн Боян Медникаров', 'Prof. Boyan Mednikarov, DSc', 'boyan-mednikarov')]),
                    V('UFBXWegr8RE', '10:13', 'Технологична трансформация на данните', 'Technology Data Transform', [P('Григор Кънчев', 'Grigor Kanchev', 'grigor-kanchev')]),
                    V('Zpo0xDiSKlc', '7:44', 'Автономни морски системи за реални мисии', 'Autonomous Maritime Systems Build for Real-World Missions', [P('Борислав Теберов', 'Borislav Teberov', 'borislav-teberov')]),
                    V('XGvVwA0mynE', '17:48', 'Навигация към бъдещето с автономни кораби', 'Navigating the Future with Autonomous Ships', [P('доц. Ismail Bayezit', 'Assoc. Prof. Ismail Bayezit', 'ismail-bayezit')]),
                    // panelists not named by the program: confirm with the organizers
                    V('_oilDnsgWHE', '5:40', 'Панел: Морски технологии', 'Panel: Maritime Technologies')
                  ]
                }
              ]
            },
            {
              hall: 'varna',
              sessions: [
                {
                  time: '09:10', bg: 'Българо-нидерландски бизнес обмен: сигурност и устойчивост в Черноморския регион', en: 'Bulgaria–Netherlands Business Exchange: Security and Resilience in the Black Sea Region',
                  playlist: 'PLHpmbPhBQCe8',
                  videos: [
                    V('HOyewd_mc78', '40:45', 'Справяне със стратегическата несигурност в Черноморския регион', 'Tackling Strategic Insecurity in the Black Sea Region',
                      [VEENSTRA, P('доц. д-р Сияна Люцканова', 'Assoc. Prof. Dr. Siyana Lyutskanova'), DOBREV]),
                    V('y0d-xa-fK58', '35:04', 'Интелигентни решения за защита на критичната инфраструктура', 'Smart Solutions for Critical Infrastructure Protection',
                      // the program names Emil Tsankov as moderator; the video (slide + stage) shows Georgi Dobrev
                      [LEIJTEN, VATKOV, DOBREV]),
                    V('S6K8e0lVbM0', '45:51', 'Киберустойчивост в спорните морски региони', 'Cyber Resilience in Contested Maritime Regions',
                      [P('Иво Зимбилев', 'Ivo Zimbilev', 'ivo-zimbilev'), VEENSTRA, P('Калина Цолова', 'Kalina Tcolova', 'kalina-tsolova')]),
                    V('CQpnY4jfVyE', '28:14', 'Публично-частно сътрудничество за иновации в киберсигурността и сигурността на AI', 'Public-Private Cooperation for Cybersecurity and AI Security Innovation',
                      [VAN_HERTUM, P('Кирил Кирилов', 'Kiril Kirilov'), P('Татяна Новосьолова', 'Tatyana Novossiolova')])
                  ]
                },
                {
                  time: '13:15', bg: 'Бизнес обмен между България и Турция: трансфер на технологии и достъп до нови пазари', en: 'Business Exchange Between Bulgaria and Türkiye: Technology Transfer and Access to New Markets',
                  playlist: 'PLaFGvrKB6-rs',
                  videos: [
                    V('46bcYATEWHU', '6:27', 'Визията на камарата', 'Chamber Vision', [OZBEK]),
                    V('w0MwW5B-428', '13:28', 'UMİ – анализ на медии с отворен код', 'UMİ – Open-Source Media Analysis', [P('Доукукан Ергюнер', 'Doğukan Ergüner')]),
                    V('LGfQfUfnPMY', '7:54', 'Проект CyberSec4OT', 'CyberSec4OT Project', [H_DASKALOV]),
                    V('iYiNvq7-Wr8', '12:44', 'Социотехнически системи за стабилна критична инфраструктура', 'Socio-technical Systems for Robust Critical Infrastructures', [LEIJTEN]),
                    V('wOdPj4MNOaM', '16:38', 'Възможности за сътрудничество с Истанбулската индустриална камара', 'Exploring Collaboration Opportunities with Istanbul Chamber of Industry', [P('Cemile Köseler Usta', 'Cemile Köseler Usta', 'cemile-usta')]),
                    V('JItXcLu6dcI', '9:40', 'Панел: Бизнес обмен между България и Турция', 'Panel: Business Exchange Between Bulgaria and Türkiye', [OZBEK])
                  ]
                },
                {
                  time: '15:00', bg: 'Бизнес обмен между България и Турция: трансфер на технологии, иновационни екосистеми и достъп до нови пазари', en: 'Business Exchange Between Bulgaria and Türkiye: Technology Transfer, Innovation Ecosystems and Access to New Markets',
                  playlist: 'PLKgsrqVdLFSw',
                  videos: [
                    V('kiw7RMuv6Nk', '10:39', 'Трансфер на технологии от Технопарк Измир', 'Technology Transfer from Teknopark İzmir', [P('Miray Şanlı', 'Miray Şanlı', 'miray-sanli')]),
                    V('IQPodPQPCig', '7:51', 'Една врата, много врати: как мрежата от камари помага на турски компании да растат в България и отвъд', 'One Door, Many Doors: How the Chamber Network Helps Turkish Companies Grow in Bulgaria and Beyond', [VAN_HERTUM]),
                    V('yJvEYUfRTuE', '9:10', 'Дигиталният хъб като портал към AI фабрики', 'The Digital Hub as a Gateway to AI Factories', [P('Герасим Славов', 'Gerasim Slavov', 'gerasim-slavov')]),
                    V('rWA-6Mm3qPk', '10:19', 'ЕС – проектно финансиране', 'EU Project Financing', [STEFANOV]),
                    V('JQjDgdFyaF4', '12:42', 'Инвестиции в Турция, пазарът на Близкия изток', 'Investments in Türkiye, Middle East Market', [P('Христо Даскалов', 'Hristo Daskalov', 'hristo-daskalov')]),
                    V('lzIUK59X8sc', '11:01', 'Международна инвестиция в България – пример', 'International Investment in Bulgaria – An Example', [OZBEK]),
                    V('3bSxtWB4y_M', '10:14', 'Панел: Бизнес обмен между България и Турция', 'Panel: Business Exchange Between Bulgaria and Türkiye', [STAMENOV])
                  ]
                },
                {
                  time: '16:40', bg: 'Туризъм и умен град', en: 'Tourism and Smart City',
                  playlist: 'PLFiC_KGtUCAg',
                  videos: [
                    V('FUuInUaw1AY', '7:18', 'Високотехнологични преживявания в туризма', 'High-Tech Experiences in Tourism', [S_IVANOV]),
                    V('BT7aUjsbjbk', '7:40', 'Интелигентен туризъм', 'Smart Tourism', [P('Андрей Лилов', 'Andrey Lilov', 'andrey-lilov')]),
                    V('5eMf1ZPUDXY', '7:16', 'AI в туризма', 'AI in Tourism', [P('Елица Стоилова', 'Elitsa Stoilova', 'elitza-stoilova')]),
                    V('DmbDTQ97jsw', '9:48', 'Бъдещето на мобилността: от притежанието към достъпа', 'The Future of Mobility: From Ownership to Access', [P('Христо Христов', 'Hristo Hristov', 'hristo-hristov')]),
                    V('bAvsmqxgQkk', '9:10', 'Интелигентният град Дубай през очите на жител', 'Smart City Dubai Through the Eyes of a Resident', [P('д-р Веселина Янкова', 'Dr. Veselina Yankova', 'veselina-yankova')]),
                    V('oZtoJQdzTKY', '7:54', 'От данни към решения: цифровият близнак на София и City Living Lab на практика', 'From Data to Decisions: Sofia’s Digital Twin and City Living Lab in Practice', [P('Калин Костадинов', 'Kalin Kostadinov', 'kalin-kostadinov')]),
                    // announced by the organizers 2026-10-29, not in the playlist yet — add its id when it is uploaded
                    { bg: 'Дигитализация на икономиката в среда на големите данни', en: 'Digitalization of the Economy in a Big Data Environment', speakers: [P('проф. Валентин Кисимов', 'Prof. Valentin Kisimov', 'valentin-kisimov')] },
                    V('xT7BwuJJSBU', '10:54', 'Въпроси и отговори: Туризъм и умен град', 'Q&A: Tourism and Smart City', [S_IVANOV])
                  ]
                }
              ]
            }
          ]
        },
        {
          key: 'den-3', title: { bg: 'Ден 3', en: 'Day 3' }, date: { bg: '7 октомври', en: '7 October' },
          halls: [
            {
              hall: 'bulgaria',
              sessions: [
                { time: '09:00', bg: 'Откриване и обобщение от Ден 2', en: 'Opening and Day 2 Recap' },
                { time: '09:10', bg: 'Блок 1: Оптимизация на бизнес процеси: геймификация, AI и още', en: 'Block 1: Business Process Optimisation: Gamification, AI and More' },
                {
                  time: '10:55', bg: 'Блок 2: AI в дигиталния маркетинг и още', en: 'Block 2: AI in Digital Marketing and More',
                  playlist: 'PLY-Un9CUSpGw',
                  videos: [
                    V('I4u0Uw9JU7Y', '8:26', 'Основен доклад: От внимание към възможност. Как бизнесът печели доверие и бива избран в ерата на AI', 'Keynote: From Attention to Opportunity. How Businesses Earn Trust and Get Chosen in the Age of AI', [PETKANOV]),
                    V('Kej_nJgzoMs', '9:53', 'Как модерните бизнеси ще използват AI през следващите 5 години', 'How Modern Businesses Will Use AI Over the Next 5 Years', [P('Николай Вълев', 'Nikolay Valev', 'nikolay-valev')]),
                    V('q0wJgbGW6ps', '15:04', 'От съдържание към действие – как AI променя маркетинга', 'From Content to Action – How AI Is Changing Marketing', [P('Александър Гошев', 'Alexander Goshev', 'alexander-goshev')]),
                    V('pN_nGYd-OxI', '16:08', 'Предимството LinkedIn – дигиталната ви репутация започва в LinkedIn', 'The LinkedIn Advantage – Your Digital Reputation Starts on LinkedIn', [P('Малгоржата Бржоска', 'Małgorzata Brzoska', 'megan-brzoska')]),
                    V('NkLGKuwWDY8', '9:28', 'Вътрешно предприемачество', 'Intrapreneurship', [P('Станислав Фотев', 'Stanislav Fotev', 'stanislav-fotev')]),
                    V('2FwNXM6KAdI', '16:44', 'Панел: AI в дигиталния маркетинг и още', 'Panel: AI in Digital Marketing and More', [PETKANOV])
                  ]
                },
                {
                  time: '13:15', bg: 'Блок 3: Нови хоризонти… Какво следва?', en: 'Block 3: New Horizons… What Comes Next?',
                  playlist: 'PLTsv_IPU7SuE',
                  videos: [
                    V('V9762TfAIe8', '31:07', 'Какво предстои?!', 'What’s Coming?!', [TODOROVA]),
                    V('WAU3NSd-zUw', '19:08', 'Какво предстои?!', 'What’s Coming?!', [S_STOYANOV]),
                    V('LCsMnptWXeQ', '12:55', 'Опитът на Швейцария в дигитализацията', 'Switzerland’s Experience in Digitalization', [P('Радой Павлов', 'Radoy Pavlov', 'radoy-pavlov')]),
                    V('XlD7zO4S5Kc', '9:24', 'Какво предстои?!', 'What’s Coming?!', [KORDON]),
                    V('tZ5QyTdi-L8', '16:21', 'Дискусия: Формулиране на препоръки и пътна карта за дигиталната трансформация на бизнеса', 'Discussion: Formulating Recommendations and a Roadmap for the Digital Transformation of Business', [TSANKOV])
                  ]
                },
                {
                  time: '15:00', bg: 'Блок 4: Формулиране на препоръки и пътна карта за дигиталната трансформация на бизнеса', en: 'Block 4: Recommendations and a Roadmap for the Digital Transformation of Business',
                  playlist: 'PLTN3BhmrT1wM',
                  videos: [
                    V('qdbmEO4XtYs', '1:27:01', 'Формулиране на препоръки и пътна карта за дигиталната трансформация на бизнеса', 'Formulating Recommendations and a Roadmap for the Digital Transformation of Business',
                      [TODOROVA, P('инж. Пламен Китипов', 'Eng. Plamen Kitipov'), STEFANOV, S_STOYANOV, P('проф. д-р Йордан Сивков', 'Prof. Dr. Yordan Sivkov'), STAMENOV, TSANKOV]),
                    V('tEd6S3gqEOw', '1:59', 'Закриване на Черноморски технологичен форум Варна 2026', 'Closing of the Black Sea Technology Forum Varna 2026')
                  ]
                }
              ]
            },
            {
              hall: 'varna',
              sessions: [
                {
                  time: '09:10', bg: 'AI работилница', en: 'AI Workshop',
                  videos: [
                    V('rUhvpomzADM', '1:36:28', 'AI работилница: Адаптиране на бизнеса към модерен начин на работа, задвижван от AI', 'AI Workshop: Adjusting the Business towards a Modern AI-driven Mode of Operation', [KORDON])
                  ]
                },
                {
                  time: '13:15', bg: 'Търговски възможности в България и Обединеното кралство', en: 'Trade Opportunities in Bulgaria and the UK',
                  playlist: 'PLf0OgVjw5xuQ',
                  videos: [
                    V('qdMHyRzuUUI', '6:14', 'Приветствия', 'Welcoming Remarks', [P('София Колева', 'Sofia Koleva'), AYRAKOVA, P('Албена Любомирова', 'Albena Lyubomirova')]),
                    V('ETah7M2Ncz8', '18:52', 'Тенденции и възможности за двустранната търговия между Обединеното кралство и България', 'Trends and Opportunities for Bilateral Trade Between the UK and Bulgaria', [AYRAKOVA, P('Елена Йорданова', 'Elena Yordanova')]),
                    V('1PuXVAy94j4', '26:16', 'Панел „Истории на успеха“ с представители на местния бизнес', 'Success Stories Panel with Local Business Representatives',
                      [P('Лора Дичева', 'Lora Dicheva'), P('Николай Стойков', 'Nikolay Stoykov'), P('Изабел Видева', 'Isabel Videva')])
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  };

  // video id -> speaker deck in data/presentations.js ("Презентация (PDF)" under the player)
  var DECKS = {
    '-FryU9bg4i8': 'barash', '8cHpY5-CoTA': 'kordon-applied', 'AJCirgcO5KA': 'kuvandzhiev', 'oBG1QahzUk4': 'madzharov',
    'SZXTSm_zAug': 'syvak', 'wM4fqSuhSDA': 'vatkov', 'vobHOoMmbvc': 'savov', 'MN4XdPyRIx8': 'minchev-konev',
    'U7ze-eGI7M0': 'koleva', 'ntggxjUhQiA': 'daskalov-identity', 'b4mYnIO2uoI': 'tanev', 'n0Fn9edO5l8': 'lambert',
    '46bcYATEWHU': 'bultisad', 'w0MwW5B-428': 'erguner', 'LGfQfUfnPMY': 'daskalov-cybersec', 'iYiNvq7-Wr8': 'leijten',
    'wOdPj4MNOaM': 'cemile-ici', 'kiw7RMuv6Nk': 'sanli', 'IQPodPQPCig': 'hertum', 'yJvEYUfRTuE': 'slavov',
    'JQjDgdFyaF4': 'hristo-daskalov', 'lzIUK59X8sc': 'ozbek-cambro', 'BT7aUjsbjbk': 'lilov', '5eMf1ZPUDXY': 'stoilova',
    'DmbDTQ97jsw': 'hristov', 'bAvsmqxgQkk': 'yankova', 'oZtoJQdzTKY': 'kostadinov', 'ETah7M2Ncz8': 'ayrakova',
    '48PXXUKU9RA': 'punter', 'eNbUUmv1JJ4': 'nikolov', 'CQBwskZEw1Y': 'horinouchi', 'Zu_QqCmjxv8': 'dinev',
    'qEhzLaSOI3I': 'svetlin', 'AFNz7HkalRc': 'cemile-maritime', 'fY0pLxvxz_Q': 'mednikarov', 'UFBXWegr8RE': 'kanchev',
    'Zpo0xDiSKlc': 'teberov', 'XGvVwA0mynE': 'bayezit', 'ZXiHOqQ0POQ': 'vasileva', 'I4u0Uw9JU7Y': 'petkanov',
    'Kej_nJgzoMs': 'valev', 'q0wJgbGW6ps': 'goshev', 'pN_nGYd-OxI': 'brzoska', 'NkLGKuwWDY8': 'fotev',
    'V9762TfAIe8': 'todorova', 'WAU3NSd-zUw': 'simeon-ahead', 'LCsMnptWXeQ': 'pavlov', 'rUhvpomzADM': 'kordon-workshop'
  };
  // video id -> language of the talk when it is not English (checked on the
  // transcript, 2026-10-30).
  // w0MwW5B-428 and kiw7RMuv6Nk carry a Turkish track in YouTube but are spoken
  // in English by Turkish speakers: that track is garbage, so they are not 'tr'.
  var CAPTIONS = {
    'ro1V_PgaBXM': 'bg', 'FIaVzUTvnec': 'bg', 'DmbDTQ97jsw': 'bg',
    'qdMHyRzuUUI': 'bg', 'ETah7M2Ncz8': 'bg', '1PuXVAy94j4': 'bg'
  };
  // ids whose spoken language was checked on the transcript (2026-11-02). A video NOT listed here is new:
  // v.cc / v.track stay empty and the page asks YouTube for every language (see applySubs). After checking a
  // new video, add it here (and to CAPTIONS if it is not English).
  var CHECKED = {};
  ('IuKq4JjeJMw IYOgAlwKaDY ro1V_PgaBXM FIaVzUTvnec 0knzVVoLv70 nKnoQsbmODk rQpQFJbzi5Q XwoW_PcZ2J4 F8z7lGcBExw -FryU9bg4i8 8cHpY5-CoTA AJCirgcO5KA oBG1QahzUk4 SZXTSm_zAug HxDkxEk9z6s iMpZPnTptCI wM4fqSuhSDA vobHOoMmbvc MN4XdPyRIx8 U7ze-eGI7M0 ntggxjUhQiA b4mYnIO2uoI n0Fn9edO5l8 HOyewd_mc78 y0d-xa-fK58 S6K8e0lVbM0 CQpnY4jfVyE 46bcYATEWHU w0MwW5B-428 LGfQfUfnPMY iYiNvq7-Wr8 wOdPj4MNOaM JItXcLu6dcI kiw7RMuv6Nk IQPodPQPCig yJvEYUfRTuE rWA-6Mm3qPk JQjDgdFyaF4 lzIUK59X8sc 3bSxtWB4y_M FUuInUaw1AY BT7aUjsbjbk 5eMf1ZPUDXY DmbDTQ97jsw bAvsmqxgQkk oZtoJQdzTKY xT7BwuJJSBU qdMHyRzuUUI ETah7M2Ncz8 1PuXVAy94j4').split(' ').forEach(function (id) { CHECKED[id] = 1; });
  // video id -> language of the track YouTube holds when it differs from the spoken
  // language (the Turkish ASR of the two English talks): the base for YouTube's own
  // translation.
  var TRACKS = { 'w0MwW5B-428': 'tr', 'kiw7RMuv6Nk': 'tr' };
  window.CONNEXUS_VIDEOS[2026].days.forEach(function (d) {
    d.halls.forEach(function (h) {
      h.sessions.forEach(function (s) {
        (s.videos || []).forEach(function (v) {
          if (v.id) {
            v.cc = CAPTIONS[v.id] || (CHECKED[v.id] ? 'en' : '');
            v.track = TRACKS[v.id] || v.cc;
          }
          if (DECKS[v.id]) v.deck = DECKS[v.id];
          if (!v.id && /Kisimov/.test(v.speakers[0].en)) v.deck = 'kisimov';
        });
      });
    });
  });

  window.CONNEXUS_VIDEO_HALLS = {
    bulgaria: { bg: 'Зала „България“', en: 'Hall Bulgaria', shortBg: 'България', shortEn: 'Bulgaria', trackBg: 'Бизнес направление', trackEn: 'Business Track' },
    varna: { bg: 'Зала „Варна“', en: 'Hall Varna', shortBg: 'Варна', shortEn: 'Varna', trackBg: 'Международен бизнес обмен', trackEn: 'International Business Exchange' }
  };
})();
