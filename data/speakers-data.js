/*
 * BSTF 2026 - single source of truth for speaker & track data.
 * Consumed by speakers.html (listing) at runtime, and by the speaker-page
 * generator at build time to produce the static speakers/{slug}/index.html
 * and en/speakers/{slug}/index.html pages (speaker.html itself is now just
 * a redirect shim and no longer reads this file).
 * Loaded as a plain <script> (not a module) so it works over file:// too.
 */
(function (global) {
  'use strict';

  var TRACKS = [
    {
      id: 'ai',
      nameBg: 'ИЗКУСТВЕН ИНТЕЛЕКТ',
      nameEn: 'ARTIFICIAL INTELLIGENCE',
      labelBg: 'Изкуствен интелект',
      labelEn: 'Artificial Intelligence',
      descBg: 'Машинно обучение, автоматизация и AI стратегии',
      descEn: 'Machine learning, automation & AI strategies',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'smart-city',
      nameBg: 'УМЕН ГРАД',
      nameEn: 'SMART CITY',
      labelBg: 'Умен град',
      labelEn: 'Smart City',
      descBg: 'Дигитализация, иновации и градски екосистеми',
      descEn: 'Digitalization, innovation & urban ecosystems',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'cybersecurity',
      nameBg: 'КИБЕРСИГУРНОСТ',
      nameEn: 'CYBERSECURITY',
      labelBg: 'Киберсигурност',
      labelEn: 'Cybersecurity',
      descBg: 'Кибер защита, регулации и цифрова идентичност',
      descEn: 'Cyber defence, regulations & digital identity',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'biotech',
      nameBg: 'БИОТЕХНОЛОГИИ',
      nameEn: 'BIOTECH',
      labelBg: 'Биотехнологии',
      labelEn: 'BioTech',
      descBg: 'Медицинска наука, биоинженерство и здравни иновации',
      descEn: 'Medical science, bioengineering & health innovation',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'marine',
      nameBg: 'МОРСКИ ТЕХНОЛОГИИ',
      nameEn: 'MARINE TECH',
      labelBg: 'Морски технологии',
      labelEn: 'Marine Tech',
      descBg: 'Корабостроене, морски иновации и Черноморски регион',
      descEn: 'Shipbuilding, marine innovation & the Black Sea region',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'tourism',
      nameBg: 'ТУРИЗЪМ',
      nameEn: 'TOURISM',
      labelBg: 'Туризъм',
      labelEn: 'Tourism',
      descBg: 'Дигитализация и AI в туризма и събитийната индустрия',
      descEn: 'Digitalization & AI in tourism and the events industry',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'regional-innovation-policy',
      nameBg: 'РЕГИОНАЛНИ ИНОВАЦИОННИ ПОЛИТИКИ',
      nameEn: 'REGIONAL INNOVATION POLICY',
      labelBg: 'Регионални иновационни политики',
      labelEn: 'Regional Innovation Policy',
      descBg: 'Иновационни екосистеми и политики за Черноморския регион',
      descEn: 'Innovation ecosystems & policy for the Black Sea region',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'automation',
      nameBg: 'АВТОМАТИЗАЦИЯ И РОБОТИКА',
      nameEn: 'AUTOMATION AND ROBOTICS',
      labelBg: 'Автоматизация и роботика',
      labelEn: 'Automation and Robotics',
      descBg: 'Умни системи, роботика и интеграция на IoT решения',
      descEn: 'Smart systems, robotics and IoT integration',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'agritech',
      nameBg: 'АГРОТЕХНОЛОГИИ',
      nameEn: 'AGRITECH',
      labelBg: 'Агротехнологии',
      labelEn: 'AgriTech',
      descBg: 'Технологии за прецизно и устойчиво земеделие',
      descEn: 'Technologies for precision and sustainable agriculture',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    },
    {
      id: 'transport',
      nameBg: 'БЪДЕЩЕТО НА ТРАНСПОРТА',
      nameEn: 'FUTURE OF TRANSPORT',
      labelBg: 'Бъдеще на транспорта',
      labelEn: 'Future of Transport',
      descBg: 'Микромобилност, споделени модели и устойчиво градско придвижване',
      descEn: 'Micromobility, shared models and sustainable urban transport',
      dot: '#00cdff',
      countPluralBg: 'лектора'
    }
  ];

  var SPEAKERS = [
    // ── AI ──
    {
      id: 'martin-kuvandzhiev', track: 'ai',
      img: '/images/speakers/martin-kuvandzhiev-2.png?v=20260730', alt: 'Martin Kuvandzhiev',
      objectPosition: 'center 8%',
      name: 'Мартин Куванджиев',
      nameEn: 'Martin Kuvandzhiev',
      role: 'Founder @ Encorp | Co-founder, Bitcoin Gold',
      topicBg: 'Blockchain, fintech и AI: следващата вълна на иновации',
      topicEn: 'Blockchain, fintech & AI: the next innovation wave',
      bioEn: [
        'As the founder of Encorp, a leading fintech, blockchain and healthcare solutions provider, Martin has over ten years of experience creating and scaling innovative projects that leverage cutting-edge technology and business acumen. Encorp has been growing 2x yearly since 2019, thanks to a talented team of 30+ professionals and a diverse portfolio of clients and partners.',
        'He is also a co-founder of Bitcoin Gold, one of the top cryptocurrencies in the market, and a blockchain advisor for several other ventures, such as TokaCity. With a background in software development and programming, he has won multiple NASA Space Apps Challenges and developed award-winning applications for iOS and other platforms.'
      ],
      bioBg: [
        'Като основател на Encorp - водещ доставчик на fintech, blockchain и healthcare решения - Мартин има над десет години опит в създаването и мащабирането на иновативни проекти, съчетаващи модерни технологии и бизнес нюх. От 2019 г. насам Encorp расте двойно всяка година благодарение на екип от над 30 специалисти и разнообразно портфолио от клиенти и партньори.',
        'Той е и съосновател на Bitcoin Gold - една от водещите криптовалути на пазара - и blockchain консултант на няколко други проекта, сред които TokaCity. С опит в софтуерната разработка и програмирането, той е печелил многократно NASA Space Apps Challenge и е разработвал отличавани приложения за iOS и други платформи.'
      ]
    },
    {
      id: 'dominik-petek', track: 'ai',
      img: '/images/speakers/dominik-petek.jpg?v=20260914', alt: 'Dominik Petek',
      objectPosition: '30% center',
      name: 'Dominik Petek',
      role: 'Founder & Managing Director @ ProCom / CPO Value Lab',
      topicBg: 'От хайпа към реалната стойност: AI агенти в ежедневното снабдяване',
      topicEn: 'From Hype to Hard Value: AI Agents in Everyday Procurement',
      bioEn: [
        'Dominik Petek is the founder and managing director of ProCom / CPO Value Lab in Munich, a consulting firm specializing in strategic procurement, procurement transformation, and AI-driven sourcing solutions. Since 2013 he has built the CPO Value Lab platform as a "Procurement Operating System" for mid-size and large enterprises, and developed and commercialized Agentic AI offerings for strategic procurement — from use-case design and technology selection to implementation support.',
        'He advises CPOs and CFOs on procurement transformation, building organizations, processes, and digital capabilities, and has delivered strategic procurement and sourcing projects for major clients including GSK, Deutsche Glasfaser, Sky, E.ON, and Stratec SE.'
      ],
      bioBg: [
        'Dominik Petek е основател и управляващ директор на ProCom / CPO Value Lab в Мюнхен — консултантска компания в областта на стратегическото снабдяване, трансформацията на снабдяването и решенията за сорсинг, базирани на изкуствен интелект. От 2013 г. изгражда платформата CPO Value Lab като „операционна система за снабдяване“ за средни и големи предприятия и разработва и извежда на пазара Agentic AI решения за стратегическо снабдяване — от дизайн на случаи на употреба и избор на технологии до подкрепа при внедряването.',
        'Консултира CPO и CFO по трансформацията на снабдяването — изграждане на организации, процеси и дигитални способности. Реализирал е проекти в областта на стратегическото снабдяване и сорсинга за големи клиенти, сред които GSK, Deutsche Glasfaser, Sky, E.ON и Stratec SE.'
      ],
      sessionDescEn: 'Procurement is one of the best places to put AI agents to work — structured decisions, rich data, and value you can measure. This talk walks through five real situations from daily procurement, from validating supplier price increases to taming maverick spend, each with the concrete outcome and the watch-outs that make it work.',
      sessionDescBg: 'Снабдяването е едно от най-подходящите места за прилагане на AI агенти — структурирани решения, богати данни и стойност, която може да бъде измерена. Лекцията преминава през пет реални ситуации от ежедневната работа по снабдяване — от проверката на исканията на доставчици за повишение на цените до овладяването на неконтролираните разходи (maverick spend) — като за всяка от тях се представят конкретният резултат и рисковете, които трябва да се имат предвид.',
      takeawaysEn: "Attendees will learn where AI agents genuinely fit in procurement — and how to tell a real use case from hype. They'll take away a practical sense of what these agents can and can't do today, and what it takes to make them work in daily operations. And they'll leave able to spot the first high-value use case in their own organization.",
      takeawaysBg: 'Участниците ще научат къде AI агентите наистина намират място в снабдяването и как да разграничат реалния случай на употреба от хайпа. Ще си тръгнат с практическа представа какво могат и какво не могат тези агенти днес и какво е необходимо, за да заработят в ежедневните операции. И ще могат да разпознаят първия случай на употреба с висока стойност в собствената си организация.'
    },
    {
      id: 'gilad-barash', track: 'ai',
      img: '/images/speakers/gilad-barash.jpg?v=20260915', alt: 'Gilad Barash',
      objectPosition: 'center top',
      name: 'Gilad Barash',
      role: 'Data & AI Strategy Consultant @ Matrix IFS',
      roleBg: 'Консултант по стратегии за данни и изкуствен интелект @ Matrix IFS',
      roleEn: 'Data & AI Strategy Consultant @ Matrix IFS',
      topicBg: 'Как компаниите внедряват изкуствен интелект устойчиво',
      topicEn: 'How Companies Implement AI Sustainably',
      bioEn: [
        'Gilad Barash is a Data & AI Strategy Consultant with over 15 years of experience helping organizations use Data and AI for actual business impact. Leading data and business transformation at Matrix IFS, he has worked across construction, pharma, maritime, and health-tech - identifying use-cases, designing AI pilots and translating complex business requirements into strategies that organizations can execute. A frequent speaker at international conferences and host of the "Who\'s Your Data?" podcast, Gilad brings an implementor\'s perspective to CONNEXUS: not what AI can theoretically do, but what it actually takes to make it work.'
      ],
      bioBg: [
        'Gilad Barash е консултант по стратегии за данни и изкуствен интелект с над 15 години опит в подпомагането на организации да използват данните и AI за реален бизнес ефект. Ръководи трансформацията на данните и бизнеса в Matrix IFS и е работил в сектори като строителство, фармация, морска индустрия и здравни технологии - идентифицира приложения, проектира пилотни AI проекти и превръща сложни бизнес изисквания в стратегии, които организациите могат да изпълнят. Чест лектор на международни конференции и водещ на подкаста „Who\'s Your Data?“, Gilad носи на CONNEXUS гледната точка на практика: не какво теоретично може изкуственият интелект, а какво реално е нужно, за да проработи.'
      ]
    },
    {
      id: 'genoveva-christova', track: 'ai',
      img: '/images/speakers/genoveva-christova.jpg?v=20260916', alt: 'Genoveva Christova',
      objectPosition: 'center top',
      name: 'Геновева Христова',
      nameEn: 'Genoveva Christova',
      role: 'President @ CreaTech Bulgaria | Managing Director @ Ligna Group',
      roleBg: 'Председател @ CreaTech Bulgaria | Управител @ Ligna Group',
      roleEn: 'President @ CreaTech Bulgaria | Managing Director @ Ligna Group',
      topicBg: 'От Евровизия до изкуствения интелект: креативните индустрии като лаборатория за бъдещето на бизнеса',
      topicEn: 'From Eurovision to AI: Creative Industries as a Laboratory for the Future of Business',
      bioBg: [
        'Геновева Христова-Мъри е председател на CreaTech Bulgaria и Български мебелен клъстер и управител на Ligna Group. Има богат опит в развитието на клъстери, предприемачеството, международното сътрудничество, бизнес развитието и иновационните екосистеми.'
      ],
      bioEn: [
        'Genoveva Christova-Murray is President of CreaTech Bulgaria and the Bulgarian Furniture Cluster and Managing Director of Ligna Group. She has extensive experience in cluster development, entrepreneurship, international cooperation, business development and innovation ecosystems.'
      ],
      sessionDescBg: 'Креативните индустрии са мястото, където технологиите, творчеството и новите бизнес модели често се срещат първи. От Евровизия и живите събития до гейминга, имърсив преживяванията и изкуствения интелект, те дават представа как бизнесът може да ангажира публика, да изгражда общности и да създава нови форми на стойност. Лекцията разглежда какво могат да научат другите индустрии от креативния сектор - и защо творчеството се превръща в ключово конкурентно предимство в ерата на изкуствения интелект.',
      sessionDescEn: 'Creative industries are where technology, creativity, and new business models often meet first. From Eurovision and live entertainment to gaming, immersive experiences, and AI, they offer a glimpse into how businesses can engage audiences, build communities, and create new forms of value. This talk explores what other industries can learn from the creative sector - and why creativity is becoming a key competitive advantage in the age of AI.'
    },    {
      id: 'arthur-kordon', track: 'ai',
      img: '/images/speakers/arthur-kordon.jpg?v=20260918', alt: 'Arthur Kordon',
      objectPosition: 'center top',
      name: 'Dr. Arthur Kordon',
      role: 'International Expert in Applied Artificial Intelligence @ Kordon Consulting',
      roleBg: 'Международен експерт по приложен изкуствен интелект @ Kordon Consulting',
      roleEn: 'International Expert in Applied Artificial Intelligence @ Kordon Consulting',
      topicBg: 'Приложен бизнес изкуствен интелект - от тъмните векове към агентното бъдеще',
      topicEn: 'Applied Business AI - From the Dark Ages to the Agentic Future',
      workshopTopicBg: 'Адаптиране на бизнеса към модерен начин на работа, задвижван от AI',
      workshopTopicEn: 'Adjusting the Business towards a Modern AI-driven Mode of Operation',
      bioBg: [
        'Д-р Артур Кордон е международно признат експерт и един от пионерите в прилагането на изкуствения интелект в индустрията. Той свързва научните достижения в областта на AI с реалните потребности на бизнеса, превръщайки технологиите в практически решения с измерима икономическа стойност.',
        'Сред реализираните от него приложения са дигитални двойници, системи за предиктивна поддръжка, интелигентен анализ за намаляване на енергийните разходи, прогнозиране на цените на суровини и оптимизиране на офис пространства.',
        'Д-р Кордон участва в международни научни и програмни комитети към IEEE и IFAC. Притежава американски патент и е автор на повече от 70 публикации, три книги и 16 глави в специализирани издания в областта на приложния изкуствен интелект и науката за данните.'
      ],
      bioEn: [
        'Dr. Arthur Kordon is an internationally recognized expert and one of the pioneers of applying artificial intelligence in industry. He connects scientific advances in AI with the real needs of business, turning technology into practical solutions with measurable economic value.',
        'His delivered applications include digital twins, predictive maintenance systems, intelligent analytics for reducing energy costs, raw material price forecasting, and office space optimization.',
        'Dr. Kordon serves on international scientific and program committees of the IEEE and IFAC. He holds a US patent and is the author of more than 70 publications, three books, and 16 chapters in specialized editions in the field of applied artificial intelligence and data science.'
      ],
      sessionDescBg: 'Практическа рамка за превръщането на модели на изкуствен интелект и технологични възможности в устойчиви бизнес резултати.',
      sessionDescEn: 'A practical framework for transforming AI models and technology opportunities into sustainable business results.'
    },
    {
      id: 'valentin-kisimov', track: 'ai',
      img: '/images/speakers/valentin-kisimov.jpg?v=20260916', alt: 'Valentin Kisimov',
      objectPosition: 'center top',
      name: 'проф. Валентин Кисимов',
      nameEn: 'Prof. Valentin Kisimov',
      role: 'Professor, DSc @ University of National and World Economy (UNWE)',
      roleBg: 'Професор, д.н. @ УНСС',
      roleEn: 'Professor, DSc @ University of National and World Economy (UNWE)',
      topicBg: 'Център за компетентност „Дигитализация на икономиката в среда на големи данни“ - дигитализация и подход с изкуствен интелект',
      topicEn: 'Center of Competence "Digitalization of the Economy in Big Data Ecosystem" - Digitalization and AI Approach',
      bioBg: [
        'Проф. д.н. Валентин Кисимов преподава в Университета за национално и световно стопанство и работи по Центъра за компетентност „Дигитализация на икономиката в среда на големи данни“.'
      ],
      bioEn: [
        'Prof. Valentin Kisimov, DSc, teaches at the University of National and World Economy and works on the Center of Competence "Digitalization of the Economy in Big Data Ecosystem".'
      ],
      sessionDescBg: 'Фокус на Центъра за компетентност, който използва системите за големи данни в дигитализацията на икономическите бизнес процеси и в прилагането на изкуствен интелект в икономиката.',
      sessionDescEn: 'A focus on the Center of Competence, which applies big data systems to the digitalization of economic business processes and to the adoption of artificial intelligence across the economy.',
      takeawaysBg: 'Как големите данни подпомагат дигитализацията на бизнес процесите и прилагането на изкуствен интелект.',
      takeawaysEn: 'How big data supports the digitalization of business processes and the adoption of artificial intelligence.'
    },
    {
      id: 'cvetan-rusimov', track: 'ai',
      img: '/images/speakers/cvetan-rusimov.jpg?v=20260916', alt: 'Cvetan Rusimov',
      objectPosition: 'center top',
      name: 'Цветан Русимов',
      nameEn: 'Cvetan Rusimov',
      role: 'Chief Executive Officer @ Imperia Online | Board Member, CreaTech Bulgaria',
      roleBg: 'Изпълнителен директор @ Imperia Online | Член на борда, CreaTech Bulgaria',
      roleEn: 'Chief Executive Officer @ Imperia Online | Board Member, CreaTech Bulgaria',
      topicBg: 'Изкуственият интелект може да го създаде. Но кой ще го иска?',
      topicEn: 'AI Can Build It. Who Will Want It?',
      bioEn: [
        'Serial entrepreneur and gaming industry executive with 25 years of management experience. Board Member of CreaTech Bulgaria. Joined Imperia Online as Chief Operating Officer in 2008 and has served as Chief Executive Officer since 2023. Extensive experience in business development, product strategy, operational leadership, and building high-performing technology and product teams.'
      ],
      bioBg: [
        'Сериен предприемач и ръководител в гейминг индустрията с 25 години управленски опит. Член на борда на CreaTech Bulgaria. Присъединява се към Imperia Online като оперативен директор през 2008 г. и е изпълнителен директор от 2023 г. Има богат опит в бизнес развитието, продуктовата стратегия, оперативното ръководство и изграждането на високоефективни технологични и продуктови екипи.'
      ],
      sessionDescEn: 'What happens when making a digital product gets easier - but making people care stays hard? Starting with Sensor Tower\'s State of Gaming 2026, a gaming CEO takes a fast, candid look at how AI could reshape games, iGaming, and all digital products over the next five years. Expect bigger ambitions for small teams, uncomfortable questions about jobs, and a look at what still makes a product worth choosing. We will explore what this means for businesses, universities, and cities across Bulgaria and the Black Sea region that want to develop talent and create products the world actually wants.',
      sessionDescBg: 'Какво се случва, когато създаването на цифров продукт става по-лесно, а спечелването на вниманието на хората остава също толкова трудно? Тръгвайки от Sensor Tower State of Gaming 2026, изпълнителен директор в гейминга хвърля бърз и откровен поглед върху това как изкуственият интелект може да преобрази игрите, iGaming и всички цифрови продукти през следващите пет години. Очаквайте по-големи амбиции за малките екипи, неудобни въпроси за работните места и поглед върху това кое все още прави един продукт достоен за избор. Ще разгледаме какво означава това за бизнеса, университетите и градовете в България и Черноморския регион, които искат да развиват таланти и да създават продукти, които светът наистина иска.',
      takeawaysEn: 'Why faster and cheaper production does not automatically deliver better products or more customers. How AI could reshape product creation and development teams by 2031. Which tasks face automation pressure, and how juniors become tomorrow\'s experts. How local talent can build and own globally competitive products.',
      takeawaysBg: 'Защо по-бързото и по-евтино производство не води автоматично до по-добри продукти или повече клиенти. Как изкуственият интелект може да преобрази създаването на продукти и развойните екипи до 2031 г. Кои задачи са под натиска на автоматизацията и как младшите специалисти се превръщат в утрешните експерти. Как местните таланти могат да изграждат и притежават глобално конкурентни продукти.'
    },
    {
      id: 'nikolay-valev', track: 'ai',
      img: '/images/speakers/nikolay-valev-profile.jpg?v=20260929', alt: 'Nikolay Valev',
      objectPosition: '70% center',
      name: 'Николай Вълев',
      nameEn: 'Nikolay Valev',
      role: 'Founder @ Work Spot Ai',
      roleBg: 'Основател @ Work Spot Ai',
      roleEn: 'Founder @ Work Spot Ai',
      topicBg: 'Как модерните бизнеси ще използват AI през следващите 5 години',
      topicEn: 'How modern businesses will use AI over the next 5 years',
      bioBg: [
        'Николай Вълев е основател на софтуерната компания Work Spot Ai.'
      ],
      bioEn: [
        'Nikolay Valev is the founder of the software company Work Spot Ai.'
      ],
      sessionDescBg: 'Кои инструменти и стратегии ще се наложи на бизнесите да използват, за да останат в новата реалност през 2030 г.?',
      sessionDescEn: 'Which tools and strategies will businesses need to use in order to stay in the new reality of 2030?',
      takeawaysBg: 'Маркетинг и тенденции.',
      takeawaysEn: 'Marketing and trends.'
    },
    {
      id: 'ruzha-pancheva', track: 'ai',
      img: '/images/speakers/ruzha-pancheva.jpg?v=20260929', alt: 'Ruzha Pancheva',
      objectPosition: 'center top',
      name: 'проф. Ружа Панчева',
      nameEn: 'Prof. Ruzha Pancheva',
      role: 'Professor @ Medical University – Varna | Deputy Director of the Research Institute',
      roleBg: 'Професор @ Медицински университет – Варна | Заместник-директор на Научноизследователския институт',
      roleEn: 'Professor @ Medical University – Varna | Deputy Director of the Research Institute',
      topicBg: 'Изкуствен интелект в подкрепа на детското хранене: от научните данни до персонализираните препоръки',
      topicEn: 'Artificial intelligence in support of child nutrition: from scientific data to personalized recommendations',
      bioBg: [
        'Проф. д-р Ружа Панчева, д.м., е педиатър, детски гастроентеролог и специалист по хранене и диететика, професор в Медицинския университет – Варна и заместник-директор на Научноизследователския институт. Работи в областта на детското хранене, персонализираната оценка на хранителния статус и приложението на съвременни технологии в медицината.'
      ],
      bioEn: [
        'Prof. Ruzha Pancheva, MD, PhD, is a pediatrician, pediatric gastroenterologist and specialist in nutrition and dietetics, Professor at the Medical University – Varna and Deputy Director of the Research Institute. Her work focuses on child nutrition, personalized assessment of nutritional status and the application of modern technologies in medicine.'
      ],
      sessionDescBg: 'Презентацията представя дигиталната платформа diet-autism-kids.bg, разработена в подкрепа на храненето при деца с аутизъм. Акцентът е върху използването на изкуствен интелект за структуриране на експертно знание, индивидуализиране на препоръките и подпомагане на родителите и специалистите при вземане на решения. Ще бъдат представени концепцията, научната основа и практическото приложение на платформата, както и потенциалът на AI за персонализирана диетична подкрепа.',
      sessionDescEn: 'The presentation introduces the digital platform diet-autism-kids.bg, developed to support nutrition in children with autism. The focus is on using artificial intelligence to structure expert knowledge, individualize recommendations and support parents and specialists in decision-making. The concept, scientific basis and practical application of the platform will be presented, along with the potential of AI for personalized dietary support.',
      takeawaysBg: 'Участниците ще видят как изкуственият интелект може да подпомага храненето на деца с аутизъм. Ще научат как работи платформата, как може да бъде полезна за родители и специалисти и какви са възможностите и ограниченията на AI при даване на хранителни препоръки.',
      takeawaysEn: 'Participants will see how artificial intelligence can support the nutrition of children with autism. They will learn how the platform works, how it can be useful to parents and specialists, and what the possibilities and limitations of AI are in providing nutritional recommendations.'
    },
    {
      id: 'todor-madzharov', track: 'ai',
      img: '/images/speakers/todor-madzharov.jpg?v=20260929', alt: 'Todor Madzharov',
      objectPosition: 'center top',
      name: 'Тодор Маджаров',
      nameEn: 'Todor Madzharov',
      role: 'Co-founder @ MEAVO',
      roleBg: 'Съосновател @ MEAVO',
      roleEn: 'Co-founder @ MEAVO',
      topicBg: 'Пътят на MEAVO с AI: изграждане на единна корпоративна платформа за 6 месеца, която задвижва операциите от край до край – от веригата на доставки и производството до продажбите и обслужването на клиенти',
      topicEn: 'MEAVO’s AI Journey: Building a unified enterprise platform in 6 months to power end-to-end operations – from supply chain and manufacturing to sales and customer support',
      bioBg: [
        'Тодор Маджаров е съосновател на MEAVO – екологична марка, родена в коуъркинг пространство в Лондон. Възпитаник на Bayes Business School и експерт по growth маркетинг, той развива MEAVO в устойчиво глобално начинание, а днес помага на други основатели да изграждат мащабируеми организации с голямо въздействие.'
      ],
      bioEn: [
        'Todor Madzharov is the co-founder of MEAVO, an eco-friendly brand born in a London coworking space. A Bayes Business School graduate and growth marketing expert, he scaled MEAVO into a sustainable global venture and now helps other founders build scalable, high-impact organisations.'
      ],
      sessionDescBg: 'През последните 6 до 9 месеца MEAVO трансформира бизнес операциите си, като използва изкуствен интелект, за да изгради напълно интегрирана, собствена ERP платформа. Сесията проследява пътя ни в разработването на цялостна екосистема от приложения, която оптимизира оперативните процеси – от веригата на доставки, производството и логистиката до продажбите, обслужването на клиенти и следпродажбеното обслужване.',
      sessionDescEn: 'Over the past 6 to 9 months, MEAVO transformed its business operations by leveraging AI to build a fully integrated, custom ERP platform. This session explores our journey in developing an end-to-end ecosystem of applications – streamlining operational processes from supply chain, manufacturing and logistics to sales, customer support and after-sales service.',
      takeawaysBg: 'Как да разпознаете къде изкуственият интелект може да създаде реална оперативна стойност. Как да изградите бизнес екосистема, задвижвана от AI. Как да превърнете AI от експеримент в ежедневна бизнес инфраструктура.',
      takeawaysEn: 'How to identify where AI can create real operational value. How to build an AI-powered business ecosystem. How to turn AI from an experiment into everyday business infrastructure.'
    },
    {
      id: 'nikolay-petkanov', track: 'ai',
      img: '/images/speakers/nikolay-petkanov.jpg?v=20260929', alt: 'Nikolay Petkanov',
      objectPosition: 'center top',
      name: 'Николай Петканов',
      nameEn: 'Nikolay Petkanov',
      role: 'Founder & CEO @ MBRAND',
      roleBg: 'Основател и изпълнителен директор @ MBRAND',
      roleEn: 'Founder & CEO @ MBRAND',
      topicBg: 'От внимание към възможност. Как бизнесът печели доверие и бива избран в ерата на AI',
      topicEn: 'From attention to opportunity. How businesses earn trust and get chosen in the age of AI',
      bioBg: [
        'Николай Петканов е основател и изпълнителен директор на MBRAND, предприемач, бизнес и маркетинг консултант, обучител и лектор. С близо 30 години опит той помага на компаниите да превръщат дигиталната стратегия, AI и продажбите в устойчив растеж.'
      ],
      bioEn: [
        'Nikolay Petkanov is the founder and CEO of MBRAND, an entrepreneur, business and marketing consultant, trainer and speaker. With nearly 30 years of experience, he helps companies turn digital strategy, AI and sales into sustainable growth.'
      ],
      sessionDescBg: 'AI ще направи съдържанието, рекламите, анализите и кампаниите по-лесни. Но няма да направи автоматично никого предпочитан. Как тогава клиентите ще избират?',
      sessionDescEn: 'AI will make content, advertising, analytics and campaigns easier. But it will not automatically make anyone the preferred choice. So how will customers choose?',
      takeawaysBg: 'Участниците ще си отговорят: коя е тази една възможност, която искам да създам през следващите 90 дни, и какво трябва да знаят хората за мен, за да я изберат?',
      takeawaysEn: 'Participants will answer for themselves: what is the one opportunity I want to create over the next 90 days, and what do people need to know about me in order to choose it?'
    },
    {
      id: 'megan-brzoska', track: 'ai',
      img: '/images/speakers/megan-brzoska-profile.jpg?v=20260929', alt: 'Megan Brzoska',
      objectPosition: 'center top',
      name: 'Megan Brzoska',
      role: 'AI & Marketing Professional | Employer & Personal Branding',
      roleBg: 'Специалист по AI и маркетинг | Работодателска и лична марка',
      roleEn: 'AI & Marketing Professional | Employer & Personal Branding',
      topicBg: 'Предимството LinkedIn: дигиталната ви репутация започва от LinkedIn',
      topicEn: 'The LinkedIn Advantage: Your Digital Reputation Starts on LinkedIn',
      bioBg: [
        'Megan Brzoska е специалист по AI и маркетинг с фокус върху работодателската и личната марка. Тя помага на бизнеса да използва AI и съвременни маркетингови стратегии, за да укрепи марката си, да повиши видимостта си и да превърне онлайн присъствието си в измерим ръст на приходите.'
      ],
      bioEn: [
        'Megan Brzoska is an AI and marketing professional specialising in employer and personal branding. She helps businesses use AI and modern marketing strategies to strengthen their brand, increase visibility and turn their online presence into measurable revenue growth.'
      ],
      sessionDescBg: 'Дигиталната ви репутация започва още преди първия разговор - и често това се случва в LinkedIn. Лекцията разглежда как бизнесът и професионалистите могат да използват LinkedIn, за да изграждат авторитет, да повишават видимостта си и да създават доверие в голям мащаб. Ще научите как личната марка, работодателската марка и съвременните маркетингови стратегии работят заедно, за да влияят на решенията за покупка и да стимулират ръста на приходите.',
      sessionDescEn: 'Your digital reputation starts before the first conversation - and LinkedIn is often where it begins. This talk explores how businesses and professionals can use LinkedIn to build authority, increase visibility and create trust at scale. You will discover how personal branding, employer branding and modern marketing strategies work together to influence buying decisions and drive revenue.',
      takeawaysBg: 'Участниците ще научат как да изградят по-силна дигитална репутация в LinkedIn, как да създават съдържание, което повишава видимостта и доверието към тях, и как да използват личната марка като част от съвременна стратегия за растеж на бизнеса. Ще си тръгнат с практични идеи, които могат да приложат веднага, за да подобрят присъствието си в LinkedIn, да укрепят марката си и да подкрепят ръста на приходите.',
      takeawaysEn: 'Attendees will learn how to build a stronger digital reputation on LinkedIn, create content that increases visibility and credibility, and use personal branding as part of a modern business growth strategy. They will leave with practical ideas they can immediately apply to improve their LinkedIn presence, strengthen their brand and support revenue growth.'
    },
    {
      id: 'nadezhda-dinisheva', track: 'ai',
      img: '/images/speakers/nadezhda-dinisheva.jpg?v=20260929', alt: 'Nadezhda Dinisheva',
      objectPosition: 'center top',
      name: 'Надежда Динишева',
      nameEn: 'Nadezhda Dinisheva',
      role: 'Certified Coach and Mentor | IT Sales and Business Partnerships Expert',
      roleBg: 'Сертифициран коуч и ментор | Експерт по IT продажби и бизнес партньорства',
      roleEn: 'Certified Coach and Mentor | IT Sales and Business Partnerships Expert',
      topicBg: 'Моето изживяване с AI',
      topicEn: 'My Experience with AI',
      bioBg: [
        'Надежда Динишева е експерт с дългогодишен международен опит в IT индустрията, продажбите и развитието на бизнес партньорства. Тя е сертифициран коуч и ментор с фокус върху лидерството, развитието на хора и бизнес трансформацията.'
      ],
      bioEn: [
        'Nadezhda Dinisheva is an expert with many years of international experience in the IT industry, sales and business partnership development. She is a certified coach and mentor focused on leadership, people development and business transformation.'
      ],
      sessionDescBg: 'Един prompt в 7:36 сутринта промени начина, по който работя. Две години с ChatGPT и Copilot: какво правят отлично, къде грешат с пълна увереност и кои навици останаха трайно в ежедневието ми. Чуйте една лична история от моето AI пътешествие.',
      sessionDescEn: 'One prompt at 7:36 in the morning changed the way I work. Two years with ChatGPT and Copilot: what they do brilliantly, where they get things wrong with complete confidence, and which habits have stuck in my daily routine for good. Hear a personal story from my AI journey.',
      takeawaysBg: 'Стимулиране на желанието за тестване и използване на Microsoft 365 Copilot.',
      takeawaysEn: 'Encouraging the audience to try out and start using Microsoft 365 Copilot.'
    },
    {
      id: 'teodor-stavrov', track: 'ai',
      img: '/images/speakers/teodor-stavrov.jpg?v=20260929', alt: 'Teodor Stavrov',
      objectPosition: '45% center',
      name: 'Теодор Ставров',
      nameEn: 'Teodor Stavrov',
      role: 'AI Team Manager @ LIREX BS',
      roleBg: 'Мениджър на AI екип @ LIREX BS',
      roleEn: 'AI Team Manager @ LIREX BS',
      topicBg: 'AI не стои просто на едно място',
      topicEn: 'AI Doesn\'t Just Sit in One Place',
      bioBg: [
        'Теодор Ставров има над 16 години професионален опит в IT технологиите, поддръжката на ИТ инфраструктури и управлението на екипи. Близо 10 години ръководи екипа за сървърна поддръжка в LIREX, а през последните 6 месеца развива AI & Automation екипа LISA.',
        'Теодор е инженер по „Компютърни системи и технологии“ от Техническия университет - Варна. Притежава сертификати MCP и ITIL, както и редица професионални квалификации в областта на информационните технологии.'
      ],
      bioEn: [
        'Teodor Stavrov has over 16 years of professional experience in IT technologies, IT infrastructure support and team management. For nearly 10 years, he has led the Server Support Team at LIREX, and over the past six months he has been developing the LISA AI & Automation team.',
        'Teodor holds a degree in Computer Systems and Technology Engineering from the Technical University of Varna. He holds MCP and ITIL certifications, as well as a range of professional qualifications in the field of information technology.'
      ],
      sessionDescBg: 'В това представяне ще покажем как AI асистентът „LISA Bubble“ въвежда корпоративния AI в ежедневния работен процес, като свързва хората с необходимата им AI инфраструктура и информация. Ще разгледаме и как AI агентите и автоматизацията могат да работят с множество вътрешни и външни източници - да търсят, анализират, обединяват и проследяват информация и да предоставят необходимите данни в точния момент.',
      sessionDescEn: 'In this presentation, we will show how the AI assistant "LISA Bubble" brings corporate AI into the everyday workflow, connecting people with the AI infrastructure and information they need. We will also explore how AI agents and automation can work across multiple internal and external sources - searching, analysing, combining and monitoring information, and delivering relevant insights when they are needed.',
      takeawaysBg: 'Участниците ще придобият по-задълбочено разбиране за това как корпоративният AI и AI асистентите могат да подпомагат ежедневната работа. Представянето на AI асистента „LISA Bubble“ ще покаже как автоматизацията и достъпът до информация от различни източници могат да направят работните процеси по-ефективни, да освободят време от повтарящи се задачи и да осигурят достъп до необходимата информация в точния момент.',
      takeawaysEn: 'Participants will gain a deeper understanding of how enterprise AI and AI assistants can support everyday work. The presentation of the AI assistant "LISA Bubble" will demonstrate how automation and access to information across multiple sources can make workflows more efficient, free up time spent on repetitive tasks, and ensure that relevant information is available when it matters most.'
    },
    {
      id: 'oleksandr-syvak', track: 'ai',
      img: '/images/speakers/oleksandr-syvak.jpg?v=20260930', alt: 'Oleksandr Syvak',
      objectPosition: 'center top',
      name: 'Олександър Сивак',
      nameEn: 'Oleksandr Syvak',
      role: 'Strateg, Odesa, Ukraine',
      roleBg: 'Strateg, Одеса, Украйна',
      roleEn: 'Strateg, Odesa, Ukraine',
      topicBg: 'AI в лабораторията – от заданието до готовия модел',
      topicEn: 'AI in the Laboratory – From Brief to Finished Model',
      bioBg: [
        'Олександър Сивак е от Strateg, Одеса, Украйна. На CONNEXUS 2026 представя заедно с Ксения Середяк темата „AI в лабораторията – от заданието до готовия модел“.'
      ],
      bioEn: [
        'Oleksandr Syvak is with Strateg, Odesa, Ukraine. At CONNEXUS 2026 he presents "AI in the Laboratory – From Brief to Finished Model" together with Kseniia Serediak.'
      ],
      sessionDescBg: 'Част от Блок 1 „Оптимизация на бизнес процеси: геймификация, AI и още“ (7 октомври, 09:10 – 10:30, Зала „България“), заедно с Ксения Середяк, Strateg.',
      sessionDescEn: 'Part of Block 1 "Business Process Optimization - Gamification, AI, and More" (7 October, 09:10 – 10:30, Hall "Bulgaria"), together with Kseniia Serediak, Strateg.'
    },
    {
      id: 'kalin-kostadinov', track: 'smart-city',
      img: '/images/speakers/kalin-kostadinov.jpg?v=20260916', alt: 'Kalin Kostadinov',
      objectPosition: 'center top',
      name: 'Калин Костадинов',
      nameEn: 'Kalin Kostadinov',
      role: 'City Living Lab Manager @ GATE Institute',
      roleBg: 'Мениджър City Living Lab @ Институт GATE',
      roleEn: 'City Living Lab Manager @ GATE Institute',
      topicBg: 'От данни към решения: цифровият близнак на София и City Living Lab на практика',
      topicEn: 'From Data to Decisions: Sofia\'s Digital Twin and City Living Lab in Practice',
      bioEn: [
        'City Living Lab Manager at GATE Institute. Leads the Lab\'s work on turning urban data into decisions - from sensor networks and mobile mapping to Sofia\'s 3D digital twin and privacy-preserving mobility data - across EU research projects and partnerships with cities and industry.'
      ],
      bioBg: [
        'Калин Костадинов е мениджър на City Living Lab в Институт GATE. Ръководи работата на лабораторията по превръщането на градските данни в решения - от сензорни мрежи и мобилно картографиране до 3D цифровия близнак на София и данни за мобилност със запазена поверителност - в рамките на европейски изследователски проекти и партньорства с градове и индустрия.'
      ],
      sessionDescEn: 'GATE Institute\'s City Living Lab in Sofia works with the municipality to turn city data into better decisions for the city and its residents. The talk shows how this is done in practice: which data the Lab collects - noise and pedestrian sensors, LiDAR and 360 degree street scans - and how it comes together in a 3D digital twin of the city to answer concrete questions about pedestrian flows, noise, sensor placement and planning scenarios. We share lessons from Sofia on what a city needs to get started. The session then looks ahead to what the Lab is building next: CityRhythm, a travel-tracking app that detects residents\' journeys passively while only legally anonymous aggregates ever reach the city, and the data spaces and AI-ready tools that could let cities, researchers and companies build on shared city data.',
      sessionDescBg: 'City Living Lab на Институт GATE в София работи заедно с общината, за да превърне градските данни в по-добри решения за града и неговите жители. Лекцията показва как това се случва на практика: какви данни събира лабораторията - сензори за шум и пешеходен поток, LiDAR и 360-градусово сканиране на улиците - и как те се обединяват в 3D цифров близнак на града, който отговаря на конкретни въпроси за пешеходните потоци, шума, разполагането на сензори и сценариите за планиране. Споделяме поуките от София за това какво е нужно на един град, за да започне. След това сесията поглежда напред към следващото, което лабораторията изгражда: CityRhythm - приложение, което пасивно засича пътуванията на жителите, като до града достигат само законово анонимни агрегирани данни, както и пространствата за данни и инструментите, готови за изкуствен интелект, които биха позволили на градове, изследователи и компании да надграждат върху споделени градски данни.',
      takeawaysEn: 'Which data a city can realistically collect today - fixed sensors, mobile mapping, residents\' phones, municipal data - what each is good for and where it falls short. How a 3D digital twin becomes a working tool for city management rather than a showpiece: linking data to decisions on pedestrian flows, noise, sensor placement and planning scenarios. A privacy architecture for mobility data that never gives the city raw locations - only legally anonymous aggregates leave residents\' phones. A practical starting path for a city without a living lab, using data it already has. Where this is heading: data spaces and AI-ready tools that could let companies and researchers build on shared city data.',
      takeawaysBg: 'Какви данни един град може реалистично да събира днес - стационарни сензори, мобилно картографиране, телефоните на жителите, общински данни - за какво е подходящ всеки източник и къде са границите му. Как 3D цифровият близнак се превръща в работещ инструмент за управление на града, а не във витрина: свързване на данните с решения за пешеходните потоци, шума, разполагането на сензори и сценариите за планиране. Архитектура за поверителност при данните за мобилност, при която градът никога не получава сурови локации - телефоните на жителите напускат само законово анонимни агрегирани данни. Практичен начален път за град без living lab, използвайки данните, с които вече разполага. Накъде води всичко това: пространства за данни и инструменти, готови за изкуствен интелект, които биха позволили на компании и изследователи да надграждат върху споделени градски данни.'
    },
    {
      id: 'veselina-yankova', track: 'smart-city',
      img: '/images/speakers/veselina-yankova.jpg?v=20260929', alt: 'Veselina Yankova',
      objectPosition: 'center top',
      name: 'д-р Веселина Янкова',
      nameEn: 'Dr. Veselina Yankova',
      role: 'Academic Program Chair, BSc Innovation and Entrepreneurship @ Higher Colleges of Technology (UAE)',
      roleBg: 'Ръководител на бакалавърска програма „Иновации и предприемачество“ @ Higher Colleges of Technology (ОАЕ)',
      roleEn: 'Academic Program Chair, BSc Innovation and Entrepreneurship @ Higher Colleges of Technology (UAE)',
      topicBg: 'Градът, който спираш да забелязваш',
      topicEn: 'The City You Stop Noticing',
      bioBg: [
        'Д-р Веселина Янкова е родена във Варна, където започва професионалния си път в Техническия университет - Варна. Има над 20 години академичен опит, като последните единадесет от тях са в Higher Colleges of Technology (HCT) - най-голямата институция за висше образование в Обединените арабски емирства, с над 23 000 студенти в седем кампуса, където е ръководител на бакалавърската програма „Иновации и предприемачество“.',
        'Сред настоящите ѝ области на работа са предприемачеството като практика с фокус върху студентските стартъпи; партньорството с индустрията чрез курсове, разработвани и преподавани съвместно с практици, съвместни проекти и студентски стажове; както и интегрирането на изкуствения интелект в академичните курсове.',
        'Д-р Янкова е Fellow на Higher Education Academy, Великобритания (FHEA), и член на Chartered Institute of Marketing, Великобритания. Сред професионалните ѝ квалификации са Microsoft Certified Educator, Digital Teaching and Learning (eTeacher) на Blackboard Academy, САЩ, и Competency Based Education на The Ohio State University, САЩ. Носител е на множество международни и национални награди, сред които ACBSP Teaching Excellence Award от американския акредитационен орган за бизнес образование, Curriculum Innovation Award за интегриране на AI и Empowerment Leader Award.'
      ],
      bioEn: [
        'Dr. Veselina Yankova was born in Varna, where she began her professional career at the Technical University of Varna. She has over 20 years of academic experience, the last eleven of them at the Higher Colleges of Technology (HCT) - the largest higher education institution in the United Arab Emirates, with over 23,000 students across seven campuses - where she is Academic Program Chair of the BSc Innovation and Entrepreneurship program.',
        'Her current areas of work include entrepreneurship as a practice, with a focus on student startups; partnership with industry, through courses co-designed and co-delivered with practitioners, joint projects and student internships; and the integration of artificial intelligence into academic courses.',
        'Dr. Yankova is a Fellow of the Higher Education Academy, UK (FHEA) and a member of the Chartered Institute of Marketing, UK. Among her professional qualifications are Microsoft Certified Educator, Digital Teaching and Learning (eTeacher) of Blackboard Academy, USA, and Competency Based Education of The Ohio State University, USA. She has received numerous international and national awards, among them the ACBSP Teaching Excellence Award from the American accreditation body for business education, the Curriculum Innovation Award for AI integration, and the Empowerment Leader Award.'
      ],
      sessionDescBg: 'Най-доброто доказателство, че един град е умен, е, че жителите му престават да го забелязват. Д-р Янкова познава Дубай от две гледни точки: изследвала е рамката му за умен град и живее в него повече от десетилетие - и като жител отдавна е спряла да брои платформите и приложенията. Вместо това тя измерва онова, което тихо е изчезнало от ежедневието: опашката, пътуването през целия град, папката с хартиени документи, пазени в случай че някой ги поиска. Почти всичко, от което има нужда от града, днес тя прави от телефона си, и според нея това никога не е било основно технологично постижение - технологията е била достъпна за много градове - а въпрос на бързо решение и последователното му прилагане в голям мащаб. Това, което тя внася в дискусията, не е рецепта за други градове - след единадесет години живот извън България - а погледът на един жител върху това какво реално се променя, когато всичко това работи, и какво изисква то от хората, които живеят в този град.',
      sessionDescEn: 'The best proof that a city is smart is that its residents stop noticing it. Dr. Yankova has two views of Dubai: she has researched its smart city framework, and she has lived inside it for over a decade - and as a resident she stopped counting platforms and apps long ago. What she measures instead is what has quietly disappeared from everyday life: the queue, the trip across town, the folder of paper documents kept in case someone asks for them. Almost everything she needs from the city she now does from a phone, and she argues that this was never mainly a technological achievement - the technology was available to many cities - but a matter of deciding quickly and carrying it through at scale. What she brings to the discussion is not a prescription for other cities, having lived away from Bulgaria for eleven years, but a resident\'s account of what actually changes when this works, and what it asks of the people living in it.',
      takeawaysBg: 'Мярката на жителя за умен град: не броят на платформите и приложенията, а онова, което е изчезнало от ежедневието - опашката, пътуването през целия град, папката с документи, пазени в случай че някой ги поиска. Защо резултатът на Дубай е не толкова технологично постижение, колкото резултат от бързо взети решения и последователното им прилагане в голям мащаб - технологията е била достъпна за много градове. Какво изисква един работещ умен град от хората, които живеят в него, и какво се променя за тях на практика.',
      takeawaysEn: 'A resident\'s measure of a smart city: not the number of platforms and apps, but what has disappeared from everyday life - the queue, the trip across town, the folder of documents kept in case someone asks. Why Dubai\'s result was less a technological achievement than one of deciding quickly and carrying it through at scale - the technology was available to many cities. What a working smart city asks of the people living inside it, and what changes for them in practice.'
    },
    {
      id: 'teade-punter', track: 'automation',
      img: '/images/speakers/teade-punter.jpg?v=20260730', alt: 'Teade Punter',
      objectPosition: '65% 15%',
      name: 'Dr. Teade Punter',
      role: 'Leading Professor, AI for Society @ Fontys University',
      topicBg: 'Интеграция на умни системи',
      topicEn: 'Smart System Integration',
      bioEn: [
        "Dr.Ir. Teade Punter is a professor (lector) in High Tech Embedded Software at Fontys University of Applied Sciences, Eindhoven, the Netherlands. His research group conducts applied research on data engineering, digital twinning and AI for smart systems development, with a focus on cybersecurity in cyber-physical systems. Teade also leads Fontys' Centre of Expertise AI for Society, in which 7 research groups collaborate on aspects of AI such as AI engineering and ELSA.",
        'Before joining Fontys, Teade was a research fellow at the TNO Embedded Systems Initiative, knowledge manager at the Embedded Systems Institute, consultant in Formal Methods at the Laboratory of Quality Software of Eindhoven University of Technology, group leader and competence manager at Fraunhofer IESE in Kaiserslautern, and course team leader at the Open University of the Netherlands.'
      ],
      bioBg: [
        "Д-р инж. Теаде Пунтер е професор (лектор) по High Tech Embedded Software във Fontys University of Applied Sciences, Айндховен, Нидерландия. Изследователската му група работи по приложни изследвания в областта на инженеринга на данни, цифровите двойници и AI за разработка на умни системи, с фокус върху киберсигурността на кибер-физически системи. Теаде ръководи и Центъра за компетентност на Fontys „AI for Society“, в който 7 изследователски групи си партнират по различни аспекти на AI - инженеринг на AI и ELSA.",
        'Преди да се присъедини към Fontys, Теаде е бил научен сътрудник в TNO Embedded Systems Initiative, мениджър знания в Embedded Systems Institute, консултант по формални методи в Лабораторията за качествен софтуер на Технологичния университет на Айндховен, ръководител на екип и компетентностен мениджър във Fraunhofer IESE в Кайзерслаутерн, и ръководител на учебен екип в Открития университет на Нидерландия.'
      ],
      sessionDescEn: 'This presentation provides an overview of key aspects encountered in smart system development. These systems encompass equipment and robotics and need orchestration and AI to work properly.',
      sessionDescBg: 'Презентацията представя преглед на ключовите аспекти при разработката на умни системи. Тези системи включват оборудване и роботика и се нуждаят от оркестрация и AI, за да работят правилно.',
      takeawaysEn: 'The importance of architectural thinking and systems thinking when applying AI.',
      takeawaysBg: 'Значението на архитектурното и системното мислене при прилагането на AI.'
    },

    // ── Cybersecurity ──
    {
      id: 'alexander-minchev', track: 'cybersecurity',
      img: '/images/speakers/alexander-minchev.jpg?v=20260730', alt: 'Alexander Minchev',
      objectPosition: 'center 25%',
      name: 'Александър Минчев',
      nameEn: 'Alexander Minchev',
      role: 'Founder & MD @ AbsCloud / Abilix Soft',
      topicBg: 'Физическите аспекти на сигурността на данните',
      topicEn: 'The Physical Aspects of Data Security',
      bioEn: [
        'Alexander Minchev is the founder and managing director of Abilix Soft Ltd. He has been working professionally with servers for over 25 years, or, as he likes to put it, since the end of the last millennium. Under his leadership, Abilix Soft has specialized in providing high-quality cloud solutions for business clients, offered under the AbsCloud brand.',
        "In April 2025, the company's renovated data center in Varna opened its doors to external clients under the brand ACDC (AbsCloud Data Center). The project stands out for its concept of harnessing the heat generated by the servers in the data center and storing it in specialized containers for subsequent use in the city's district heating system.",
        'In parallel, Alexander Minchev is working on a doctoral dissertation in artificial intelligence and security. He is dedicated to staying at the forefront of technological progress and to leveraging artificial intelligence to enhance cybersecurity.'
      ],
      bioBg: [
        'Александър Минчев е основател и управляващ директор на „Абиликс Софт“ ЕООД. Работи професионално със сървъри повече от 25 години - или, както обича да казва, от края на миналото хилядолетие. Под неговото ръководство Abilix Soft се специализира в предоставянето на висококачествени облачни решения за бизнес клиенти под марката AbsCloud.',
        'През април 2025 г. обновеният център за данни на компанията във Варна отвори врати за външни клиенти под марката ACDC (AbsCloud Data Center). Проектът се откроява с концепцията за оползотворяване на топлината, генерирана от сървърите в центъра за данни, и съхраняването ѝ в специализирани контейнери за последващо използване в градската топлофикационна система.',
        'Паралелно с това Александър Минчев работи по докторска дисертация в областта на изкуствения интелект и сигурността. Той е посветен на това да бъде в крак с технологичния прогрес и да използва изкуствения интелект за подобряване на киберсигурността.'
      ]
    },
    {
      id: 'hristian-daskalov', track: 'cybersecurity',
      img: '/images/speakers/hristian-daskalov.jpg?v=20260730', alt: 'Hristian Daskalov',
      objectPosition: 'center 8%',
      name: 'д-р Христиан Даскалов',
      nameEn: 'Dr. Hristian Daskalov',
      role: 'Cybersecurity Compliance Director | Chair @ DIH Trakia',
      topicBg: 'Европейски портфейли за цифрова самоличност: възможности и рискове',
      topicEn: 'European digital identity wallets: opportunities and risks',
      bioEn: [
        'Dr. Hristian Daskalov is a cybersecurity practitioner, researcher, university lecturer, and digital policy advisor with over 15 years of experience in digital transformation, open technologies, and regulatory frameworks for governance and resilience. He currently serves as Cybersecurity Compliance Director at a leading qualified trust service provider.',
        'Previously, he co-founded the Center for Shared Science & Business (CSSB) at the Technical University of Sofia, where he piloted the application of blockchain technologies in academia. Between 2023 and 2026, he served as Chairman of the Board of Digital Innovation Hub Trakia (Cyber4AllSTAR), Bulgaria\'s cybersecurity EDIH, and coordinated the Hub\'s engagement under the pan-European CyberSec4OT and OSCRAT.EU initiatives.',
        'In this capacity, he supported the provision of cybersecurity services to industrial SMEs across Europe and helped enable their compliance with cybersecurity regulatory frameworks, including the European Cyber Resilience Act. His work focuses on building institutional and technological resilience in digitally dependent ecosystems, with an emphasis on public-private collaboration, secure product lifecycle governance, and capacity building for cyber-aware innovation.'
      ],
      bioBg: [
        'Д-р Христиан Даскалов е практик в областта на киберсигурността, изследовател, университетски преподавател и съветник по политики за цифрово управление с над 15 години опит в цифровата трансформация, отворените технологии и регулаторните рамки за управление и устойчивост. В момента той е директор „Съответствие в киберсигурността“ във водещ квалифициран доставчик на удостоверителни услуги.',
        'Преди това е съосновател на Центъра за споделена наука и бизнес към Техническия университет - София, където пилотира прилагането на блокчейн технологии в академична среда. В периода 2023-2026 г. той изпълнява мандат като председател на Управителния съвет на Европейски цифров иновационен хъб „Тракия“ (Cyber4AllSTAR), българския европейски цифров иновационен хъб в областта на киберсигурността, и координира участието на хъба в паневропейските инициативи CyberSec4OT и OSCRAT.EU.',
        'В това си качество той подкрепя предоставянето на услуги в областта на киберсигурността за индустриални малки и средни предприятия в Европа и допринася за постигането на съответствие с регулаторните рамки в областта на киберсигурността, включително Европейския акт за киберустойчивост. Работата му е насочена към изграждане на институционална и технологична устойчивост в цифрово зависими екосистеми, с акцент върху публично-частното сътрудничество, сигурното управление на жизнения цикъл на продуктите и изграждането на капацитет за иновации с осъзнатост за киберрисковете.'
      ],
      sessionDescBg: 'Европейските портфейли за цифрова самоличност, до които всяко правителство следва да предостави достъп на своите граждани до края на 2026 г., ще позволят на всички в Европа да се идентифицират по сигурен начин, когато имат достъп до публични и частни услуги, както и да съхраняват и показват цифрови документи като мобилни шофьорски книжки и образователни удостоверения - всичко това от мобилните си телефони. Те също така ще подобрят неприкосновеността на личния живот, като споделят само точната информация, за която е постигнато съгласие. Сходни ще бъдат ползите за европейските компании по линия на „Европейския бизнес портфейл“. Презентацията ще влезе в детайлите както на възможностите, които произтичат от тези нови технологични решения, така и на заплахите, които следва да бъдат адресирани в процеса на имплементация.',
      sessionDescEn: 'European digital identity wallets, which every government must give its citizens access to by the end of 2026, will let everyone in Europe securely identify themselves when accessing public and private services, and store and present digital documents such as mobile driving licences and educational certificates - all from their mobile phones. They will also improve privacy by sharing only the exact information consented to. Similar benefits will apply to European companies via the "European Business Wallet". The talk will detail both the opportunities created by these new technological solutions and the threats that need to be addressed during implementation.',
      takeawaysBg: 'Европейските портфейли за цифрова самоличност ще създадат универсално, надеждно и сигурно средство за цифрова идентификация за всички европейци, както и за европейските компании и публични организации.',
      takeawaysEn: 'European digital identity wallets will create a universal, trustworthy and secure means of digital identification for all Europeans, as well as for European companies and public organizations.'
    },
    {
      id: 'dragomir-vatkov', track: 'cybersecurity',
      img: '/images/speakers/dragomir-vatkov.jpg?v=20260730', alt: 'Dragomir Vatkov',
      objectPosition: 'center 35%',
      name: 'Драгомир Вътков',
      nameEn: 'Dragomir Vatkov',
      role: 'Lead Cyber Security Architect, SABSA',
      topicBg: 'Невидимата архитектура: как основите на киберсигурността определят устойчивостта',
      topicEn: 'The Invisible Architecture: How Cyber Security Foundations Determine Resilience',
      bioEn: [
        'Dragomir is a seasoned Enterprise Cyber Security Architect with more than 27 years of experience designing and governing business-driven security architectures across IT, OT, and software-centric product environments. As Lead Cyber Security Architect, he leads security-by-design initiatives grounded in Enterprise Architecture and SABSA principles, ensuring cyber security is systematically embedded into digital products, platforms, and operations to deliver tangible business value.',
        'Previously, Dragomir held senior leadership roles in the energy, cyber security products and services development sectors. He holds an MSc from RWTH Aachen (Germany), is a SABSA Chartered Architect, and combines deep architectural rigor with hands-on industry, product, and research experience.'
      ],
      bioBg: [
        'Драгомир е опитен архитект по корпоративна киберсигурност с над 27 години опит в проектирането и управлението на бизнес-ориентирани архитектури за сигурност в сферата на ИТ, оперативните технологии и софтуерно-ориентирани продуктови среди. Като водещ архитект по киберсигурност, той ръководи инициативи за „сигурност по дизайн“, базирани на принципите на Enterprise Architecture и SABSA, осигурявайки систематично вграждане на киберсигурността в цифровите продукти, платформи и операции с реална бизнес стойност.',
        'Преди това Драгомир е заемал старши ръководни позиции в сектора на енергетиката и в разработката на продукти и услуги за киберсигурност. Той притежава магистърска степен от RWTH Аахен (Германия), сертифициран е като SABSA Chartered Architect и съчетава задълбочена архитектурна прецизност с практически опит в индустрията, продуктите и научните изследвания.'
      ],
      sessionDescEn: 'Sets the strategic context: why architecture, cyber security hygiene and baseline practices - not reactive tools - are the true determinant of organisational resilience. Bridges technical depth with board-level narrative. Challenges leaders to rethink their security posture as a strategic, not operational, decision in a rapidly changing environment shaped by AI, geopolitical tensions, and continuously increasing regulatory pressure.',
      sessionDescBg: 'Задава стратегическия контекст: защо архитектурата, киберхигиената и базовите практики - не реактивните инструменти - са истинският определящ фактор за устойчивостта на организацията. Свързва техническата дълбочина с наратив на ниво борд на директорите. Предизвиква лидерите да преосмислят позицията си по сигурността като стратегическо, а не оперативно решение, в бързо променяща се среда, оформена от AI, геополитическо напрежение и непрекъснато нарастващ регулаторен натиск.',
      takeawaysEn: 'Bridges technical depth with board-level narrative. Challenges leaders to rethink their security posture as a strategic, not operational, decision.',
      takeawaysBg: 'Свързва техническата дълбочина с наратив на ниво борд на директорите. Предизвиква лидерите да преосмислят позицията си по сигурността като стратегическо, а не оперативно решение.'
    },
    {
      id: 'yasen-tanev', track: 'cybersecurity',
      img: '/images/speakers/yasen-tanev.jpg?v=20260730', alt: 'Yasen Tanev',
      objectPosition: 'center top',
      name: 'Ясен Танев',
      nameEn: 'Yasen Tanev',
      role: 'Cybersecurity Expert @ DIH Trakia',
      topicBg: 'Помощ, а не тежест: Как да превърнем регулаторните изисквания в реална киберсигурност',
      topicEn: 'Help, Not Burden: How to Transform Regulatory Requirements into Real Cybersecurity',
      bioBg: [
        'Ясен Танев е експерт по киберсигурност с дългогодишен опит в управлението на информационната сигурност, съответствието и обучението. Активно работи по развитието на професионални стандарти, квалификации и добри практики в областта на киберсигурността.'
      ],
      bioEn: [
        'Yasen Tanev is a cybersecurity expert with long-standing experience in information security management, compliance, and training. He actively works on the development of professional standards, qualifications, and best practices in cybersecurity.'
      ],
      sessionDescBg: 'С навлизането на NIS2 и Закона за киберсигурност, AI Act и Cyber Resilience Act организациите са изправени пред нова реалност – съответствието вече не е еднократна инициатива, а непрекъснат процес на адаптация. Вместо да се възприемат като административна тежест, тези регулации могат да служат като практическа рамка за управление на риска, повишаване на устойчивостта и изграждане на доверие. Лекцията ще представи концепцията за развиващо се съответствие (continuous compliance) и ще покаже чрез реални примери как регулаторните изисквания могат да бъдат превърнати в инструмент за по-ефективна и устойчива киберсигурност.',
      sessionDescEn: 'With the arrival of NIS2 and the Cybersecurity Act, the AI Act and the Cyber Resilience Act, organizations face a new reality - compliance is no longer a one-off initiative but a continuous process of adaptation. Rather than being treated as an administrative burden, these regulations can serve as a practical framework for risk management, resilience-building and trust. The talk introduces the concept of continuous compliance and shows, through real-world examples, how regulatory requirements can be turned into a tool for more effective and resilient cybersecurity.',
      takeawaysBg: 'Разбиране на връзката между NIS2/Закона за киберсигурност, AI Act, Cyber Resilience Act и съществуващите рамки за управление на информационната сигурност. Практически подход за преминаване от „съответствие на хартия“ към реално управление на риска и повишаване на киберустойчивостта. Идентифициране на общите контроли и процеси, които позволяват едновременно покриване на множество регулаторни изисквания. Изграждане на модел за развиващо се съответствие, който подпомага бизнеса да се адаптира към нови регулации без значително увеличаване на административната тежест.',
      takeawaysEn: 'Understanding the relationship between NIS2/the Cybersecurity Act, the AI Act, the Cyber Resilience Act and existing information security management frameworks. A practical approach for moving from "paper compliance" to real risk management and improved cyber resilience. Identifying the common controls and processes that allow multiple regulatory requirements to be covered at once. Building a continuous-compliance model that helps businesses adapt to new regulations without a significant increase in administrative burden.'
    },
    {
      id: 'ivaylo-konev', track: 'cybersecurity',
      img: '/images/speakers/ivaylo-konev.jpg?v=20260910', alt: 'Ivaylo Konev',
      objectPosition: 'center 15%',
      name: 'Ивайло Конев',
      nameEn: 'Ivaylo Konev',
      role: 'Pre-sales Engineer @ Neterra',
      topicBg: 'Физическите аспекти на сигурността на данните (съвместна лекция с Александър Минчев)',
      topicEn: 'The Physical Aspects of Data Security (joint talk with Alexander Minchev)',
      bioBg: [
        'Ивайло Конев е Pre-sales Engineer в Нетера с над 20 години опит в IT сектора. През последните години е фокусиран върху проектирането и изграждането на комплексни инфраструктурни решения, като работи активно с мрежови технологии и оборудване на Cisco, Meraki, Fortinet и Juniper, както и със сървърни и сторидж платформи на Dell, Lenovo, Supermicro и HPE.',
        'Опитът му в системната интеграция му позволява да превръща бизнес и техническите изисквания на клиентите в надеждни, мащабируеми и практически приложими решения.',
        'Ивайло е инженер по „Компютърни системи и технологии“ от Технически университет – София. През годините е покривал професионални сертификации като Cisco CCNA и Fortinet NSE 1 и NSE 3, както и редица специализирани обучения в областта на мрежовите и инфраструктурните технологии.'
      ],
      bioEn: [
        'Ivaylo Konev is a Pre-sales Engineer at Neterra with more than 20 years of experience in the IT industry. In recent years, his work has focused on designing and delivering complex infrastructure solutions, with hands-on expertise in networking technologies and solutions from Cisco, Meraki, Fortinet, and Juniper, as well as server and storage platforms from Dell, Lenovo, Supermicro, and HPE.',
        'His background in system integration enables him to translate business and technical requirements into reliable, scalable, and practical IT solutions.',
        'Ivaylo holds an engineering degree in Computer Systems and Technologies from the Technical University of Sofia. Over the years, he has also earned professional certifications such as Cisco CCNA and Fortinet NSE 1 and NSE 3, along with various specialized trainings in networking and IT infrastructure technologies.'
      ]
    },
    {
      id: 'yoana-koleva', track: 'cybersecurity',
      img: '/images/speakers/yoana-koleva.jpg?v=20260916', alt: 'Yoana Koleva',
      objectPosition: 'center top',
      name: 'Йоана Колева',
      nameEn: 'Yoana Koleva',
      role: 'AI and Data Manager @ GATE Institute',
      roleBg: 'Мениджър „AI и данни“ @ Институт GATE',
      roleEn: 'AI and Data Manager @ GATE Institute',
      topicBg: 'Сигурни данни, устойчиви вериги на доставки и киберустойчив бизнес',
      topicEn: 'Secure Data, Resilient Supply Chains and Cyber-Resilient Business',
      bioBg: [
        'Йоана Колева е мениджър „AI и данни“ в Институт GATE, където отговаря за целия жизнен цикъл на данните: от тяхното събиране и защита до извличането на стойност. Има над 10 години международен опит в Лондон в ръководене на стратегически проекти за обработка на данни и бизнес трансформация чрез анализи.'
      ],
      bioEn: [
        'Yoana Koleva is AI and Data Manager at GATE Institute, where she is responsible for the full data lifecycle - from collection and protection through to extracting value. She brings over 10 years of international experience in London leading strategic data processing projects and business transformation through analytics.'
      ],
      sessionDescBg: 'Сигурността на данните започва много преди кибер защитата: с правилното им управление, ясен контрол, качество, класификация и политики за достъп още от момента на събиране. Без стабилно управление дори най-добрата техническа защита работи върху хаотична и рискова основа. „Пространства за данни“ е модел, който показва как устойчивото и сигурно споделяне на данни между организации е възможно именно защото се гради върху доверие, стандарти и контролиран достъп, а не само върху технически ограничения. Целта е да се покаже, че киберустойчивостта на бизнеса зависи от веригата на управление на данните като цяло, а не само от защитните механизми на отделните звена.',
      sessionDescEn: 'Data security begins long before cyber defence: with proper data governance, clear control, quality, classification and access policies from the moment data is collected. Without solid governance, even the best technical protection is built on a chaotic and risky foundation. Data Spaces is a model showing how sustainable and secure data sharing between organisations becomes possible precisely because it is built on trust, standards and controlled access, and not only on technical restrictions. The aim is to show that the cyber resilience of a business depends on the data governance chain as a whole, and not only on the protective mechanisms of individual units.',
      takeawaysBg: 'Аудиторията ще получи практични насоки как да управлява данните си с ясни модели за класификация и контрол на достъп като основа за истинска сигурност, а не само технически преглед. Ще разбере защо сигурността на данните не е само технически въпрос, а започва именно с правилното им управление. Ще получи конкретен модел (Data Spaces) за това как организациите могат да споделят данни сигурно и устойчиво, вместо да избягват споделянето от страх. Ще си тръгне с разбирането, че киберустойчивостта на бизнеса зависи от цялата верига на управление на данните: от вътрешните процеси до партньорствата с други организации. Организациите ще получат практическа рамка за самооценка, която ще им помогне да разберат дали проблемите с данните в тяхната организация идват от липса на технология или от липса на управление и ясни процеси.',
      takeawaysEn: 'The audience will gain practical guidance on managing their data with clear classification and access-control models as the foundation of real security, rather than just a technical review. They will understand why data security is not only a technical question, but starts with proper data governance. They will take away a concrete model (Data Spaces) for how organisations can share data securely and sustainably instead of avoiding sharing out of fear. They will leave understanding that the cyber resilience of a business depends on the entire data governance chain: from internal processes to partnerships with other organisations. Organisations will receive a practical self-assessment framework to help them determine whether their data problems stem from a lack of technology or from a lack of governance and clear processes.'
    },
    {
      id: 'ilin-savov', track: 'cybersecurity',
      img: '/images/speakers/ilin-savov.jpg?v=20260916', alt: 'Ilin Savov',
      objectPosition: 'center top',
      name: 'Старши комисар проф. д-р Илин Савов, д.н.',
      nameEn: 'Senior Commissioner Prof. Ilin Savov, PhD, DSc',
      role: 'Rector @ Academy of the Ministry of Interior',
      roleBg: 'Ректор @ Академия на МВР',
      roleEn: 'Rector @ Academy of the Ministry of Interior',
      topicBg: 'Бизнесът в центъра: Кибер превенция, човешко поведение и устойчивост в дигиталната буря',
      topicEn: 'Business at the Centre: Cyber Prevention, Human Behaviour and Resilience in the Digital Storm',
      bioBg: [
        'Старши комисар проф. д-р Илин Савов, д.н. е назначен за ректор на Академията на МВР. Той е международен експерт по киберсигурност и киберпревенция, с над 25 години професионален и практически опит в службите за сигурност и МВР.'
      ],
      bioEn: [
        'Senior Commissioner Prof. Ilin Savov, PhD, DSc has been appointed Rector of the Academy of the Ministry of Interior. He is an international expert in cybersecurity and cyber prevention, with over 25 years of professional and hands-on experience in the security services and the Ministry of Interior.'
      ],
      takeawaysBg: 'Насоки за преминаване от реактивна защита към превенция, киберустойчивост и по-бърз институционален отговор.',
      takeawaysEn: 'Guidance on moving from reactive defence to prevention, cyber resilience and a faster institutional response.'
    },
    {
      id: 'obreten-obretenov', track: 'cybersecurity',
      img: '/images/speakers/obreten-obretenov-profile.jpg?v=20260929', alt: 'Obreten Obretenov',
      objectPosition: 'center top',
      name: 'Обретен Обретенов',
      nameEn: 'Obreten Obretenov',
      role: 'Founder @ Commodor Cybersecurity | Lecturer @ Nikola Vaptsarov Naval Academy',
      roleBg: 'Основател @ Commodor Cybersecurity | Преподавател @ ВВМУ „Н. Й. Вапцаров“',
      roleEn: 'Founder @ Commodor Cybersecurity | Lecturer @ Nikola Vaptsarov Naval Academy',
      topicBg: 'Ще одобрите ли този превод? AI измами, deepfake и последната линия на защита',
      topicEn: 'Would You Approve This Transfer? AI Fraud, Deepfakes and the Last Line of Defence',
      bioBg: [
        'Обретен Обретенов е специалист по информационна и киберсигурност с практически опит в защитата на финансови системи, управлението на киберриска, реакцията при инциденти, управлението на уязвимости и изграждането на организационни и технически мерки за сигурност.',
        'В професионалната си дейност работи по теми, свързани с информационна сигурност, регулаторно съответствие, киберустойчивост и управление на риска във финансова среда. Паралелно с това е основател на Commodor Cybersecurity, където фокусът му е върху практични решения за подобряване на киберсигурността на бизнеса.',
        'Обретен е и преподавател във ВВМУ „Н. Й. Вапцаров“, където води занятия в областта на компютърната сигурност.',
        'Основен акцент в работата му е превръщането на сложните технически рискове в ясни и приложими бизнес решения. Интересите му включват социално инженерство, AI-базирани заплахи, устойчивост на бизнес процесите, защита на чувствителни данни и изграждане на ефективна култура на сигурност в организациите.'
      ],
      bioEn: [
        'Obreten Obretenov is an information security and cybersecurity specialist with hands-on experience in protecting financial systems, cyber risk management, incident response, vulnerability management and building organisational and technical security measures.',
        'In his professional work he focuses on information security, regulatory compliance, cyber resilience and risk management in a financial environment. In parallel, he is the founder of Commodor Cybersecurity, where his focus is on practical solutions that improve the cybersecurity of businesses.',
        'Obreten is also a lecturer at the Nikola Vaptsarov Naval Academy, where he teaches computer security.',
        'A central theme of his work is turning complex technical risks into clear, actionable business decisions. His interests include social engineering, AI-driven threats, business process resilience, protection of sensitive data and building an effective security culture within organisations.'
      ],
      sessionDescBg: 'Практически уъркшоп за AI-базирани измами, deepfake съдържание и социално инженерство, насочени към доверието и бизнес процесите в организациите. Участниците ще преминат през реалистичен сценарий с фалшива комуникация, спешно финансово искане и AI-подпомагана имитация на самоличност. Заедно ще анализираме къде традиционните механизми за защита могат да се окажат недостатъчни и какви проверки биха прекъснали атаката. В края ще изградим кратък практически модел за верификация и одобрение на чувствителни бизнес действия.',
      sessionDescEn: 'A hands-on workshop on AI-driven fraud, deepfake content and social engineering that target trust and business processes within organisations. Participants will work through a realistic scenario involving fake communication, an urgent financial request and AI-assisted identity impersonation. Together we will analyse where traditional protection mechanisms may fall short and which checks would break the attack. At the end, we will build a short, practical model for verifying and approving sensitive business actions.',
      takeawaysBg: 'AI прави социалното инженерство по-убедително, персонализирано и трудно за разпознаване. Техническите контроли сами по себе си не са достатъчни, когато атаката е насочена към доверието и бизнес процеса. При чувствителни действия трябва да се проверяват независимо както самоличността, така и самото искане. Независимата верификация, доверените комуникационни канали и двойното одобрение значително намаляват риска. Сигурният бизнес процес трябва да остане устойчив дори когато фалшивият глас, видео или съобщение изглеждат напълно автентични.',
      takeawaysEn: 'AI makes social engineering more convincing, more personalised and harder to recognise. Technical controls on their own are not enough when the attack targets trust and the business process. For sensitive actions, both the identity and the request itself must be verified independently. Independent verification, trusted communication channels and dual approval significantly reduce the risk. A secure business process must stay resilient even when a fake voice, video or message looks completely authentic.'
    },

    // ── BioTech ──
    {
      id: 'kristina-eskenazi', track: 'biotech',
      img: '/images/speakers/kristina-eskenazi.jpg?v=20260730', alt: 'Kristina Eskenazi',
      objectPosition: 'center top',
      name: 'Кристина Ешкенази',
      nameEn: 'Kristina Eskenazi',
      role: 'Chair @ Health & Life Sciences Cluster Bulgaria',
      topicBg: 'Бъдещето на здравеопазването: от изследвания към мащабни иновации',
      topicEn: 'Future of Health & Life Sciences: from research excellence to scalable innovation',
      bioEn: [
        'Kristina Eskenazi is Chair of the Health & Life Sciences Cluster Bulgaria and AI Cluster Bulgaria, Vice President of the Council of European BioRegions (CEBR), and Board Member of KRIB. She is co-founder of Spinoff Bulgaria and actively promotes innovation, biotechnology, AI, and deep-tech entrepreneurship in Europe.'
      ],
      bioBg: [
        'Кристина Ескенази е председател на Health & Life Sciences Cluster Bulgaria и AI Cluster Bulgaria, вицепрезидент на Съвета на европейските биорегиони (CEBR) и член на управителния съвет на КРИБ. Тя е съосновател на Spinoff Bulgaria и активно насърчава иновациите, биотехнологиите, AI и deep-tech предприемачеството в Европа.'
      ],
      sessionDescEn: "This lecture explores how Europe can transform outstanding scientific research into scalable health and life sciences innovations. It will examine the role of innovation ecosystems, university spinoffs, investment, regulation, and cross-sector collaboration in accelerating the journey from laboratory discoveries to market-ready solutions that improve patient outcomes and strengthen Europe's competitiveness.",
      sessionDescBg: 'Лекцията разглежда как Европа може да превърне върховите научни изследвания в мащабируеми иновации в сферата на здравеопазването и науките за живота. Ще бъде разгледана ролята на иновационните екосистеми, университетските spin-off компании, инвестициите, регулациите и междусекторното сътрудничество за ускоряване на пътя от лабораторните открития до пазарно готови решения, които подобряват резултатите за пациентите и укрепват конкурентоспособността на Европа.',
      takeawaysEn: 'Strong innovation ecosystems do not emerge by chance - they are built through long-term collaboration, trust, shared vision, and strategic investment in people, knowledge, and partnerships.',
      takeawaysBg: 'Силните иновационни екосистеми не се появяват случайно - те се изграждат чрез дългосрочно сътрудничество, доверие, споделена визия и стратегическа инвестиция в хора, знания и партньорства.'
    },
    {
      id: 'dimitar-karlovski', track: 'biotech',
      img: '/images/speakers/dimitar-karlovski.jpg?v=20260730', alt: 'Dimitar Karlovski',
      objectPosition: 'center 5%',
      name: 'Димитър Карловски',
      nameEn: 'Dimitar Karlovski',
      role: 'Founder @ Mitotopia',
      topicBg: 'Митохондриите като Chi: May the Force be with you',
      topicEn: 'Mitochondria as Chi: May the Force be with you',
      bioEn: [
        'Mitotopia is a start-up developing products and services promoting mitochondrial health in reproduction, sports and longevity, founded by Dimitar Karlovski.'
      ],
      bioBg: [
        'Mitotopia е стартъп, разработващ продукти и услуги за подобряване на митохондриалното здраве в областта на репродукцията, спорта и дълголетието, основан от Димитър Карловски.'
      ],
      sessionDescEn: "From the Chinese concept of Chi to the contemporary knowledge of energy and metabolism, mitochondria play the lead role. They are powerful, flexible and adaptable. So is Mitotopia. What's the story?",
      sessionDescBg: 'От китайската концепция за Чи до съвременните познания за енергията и метаболизма - митохондриите играят главна роля. Те са мощни, гъвкави и адаптивни. Такъв е и Mitotopia. Каква е историята?',
      takeawaysEn: 'Mitochondria are much more than the powerhouses of the cell - they are coordinators of cellular biochemistry. Clinical practice can generate ideas and address problems; when combined with science and research, ideas can be turned into prospective solutions, which can then be applied back into practice.',
      takeawaysBg: 'Митохондриите са много повече от „енергийните централи“ на клетката - те са координатори на клетъчната биохимия. Клиничната практика може да генерира идеи и да адресира проблеми; при съчетаване с наука и изследвания идеите могат да се превърнат в перспективни решения, които впоследствие се прилагат обратно в практиката.'
    },
    {
      id: 'trifon-tsekov', track: 'biotech',
      img: '/images/speakers/trifon-tsekov.jpg?v=20260730', alt: 'Trifon Tsekov',
      objectPosition: 'center 18%',
      name: 'Трифон Цеков',
      nameEn: 'Trifon Tsekov',
      role: 'CEO @ 3-Fi Medical',
      topicBg: 'От изолирани данни до клинични доказателства: федерирано обучение в медицинския софтуер',
      topicEn: 'From Data Silos to Clinical Evidence: Federated Learning for Medical Software',
      bioEn: [
        'Trifon Tsekov is CEO of 3-Fi Medical, a former Director of Hardware R&D and radar systems architect with 10+ years in embedded systems, real-time signal processing, and rugged defence hardware. An AI Cluster Bulgaria member, he applies high-reliability engineering to regulated medical AI.'
      ],
      bioBg: [
        'Трифон Цеков е CEO на 3-Fi Medical, бивш директор „Хардуерни R&D“ и архитект на радарни системи с над 10 години опит във вградени системи, обработка на сигнали в реално време и издръжлив хардуер за отбранителни приложения. Член на AI Cluster Bulgaria, той прилага инженерство с висока надеждност в регулирания медицински AI.'
      ],
      sessionDescEn: 'Medical AI teams need evidence that their software is safe, performs as intended, and creates clinical value - but relevant patient data is often fragmented across institutions. This session introduces federated learning as a practical way to work across approved data environments without centralizing sensitive patient data, connecting the concept to SaMD evidence generation under the EU MDR using plain-language examples. It is intended for founders, researchers, hospitals, and innovation teams working to turn strong research into scalable, trustworthy health products.',
      sessionDescBg: 'Екипите, разработващи медицински AI, се нуждаят от доказателства, че софтуерът им е безопасен, работи според очакванията и създава клинична стойност - но релевантните данни за пациенти често са разпръснати между различни институции. Тази сесия представя федерираното обучение като практичен начин за работа през одобрени среди с данни, без централизиране на чувствителни пациентски данни, свързвайки концепцията с генерирането на доказателства за SaMD съгласно EU MDR чрез разбираеми примери. Предназначена е за основатели, изследователи, болници и иновационни екипи, работещи за превръщането на силни изследвания в мащабируеми и надеждни здравни продукти.',
      takeawaysEn: 'A plain-language view of why clinical evidence matters for medical software beyond model accuracy, and the practical idea behind federated learning - bringing computation to governed data environments instead of moving sensitive data into one central repository. The session shows how multi-site collaboration can support validation, monitoring, and evidence-generation workflows for SaMD products, and highlights what startups, hospitals, and researchers need to align early: intended use, governance, validation criteria, and regulatory documentation.',
      takeawaysBg: 'Разбираемо обяснение защо клиничните доказателства са важни за медицинския софтуер отвъд точността на модела, и практическата идея зад федерираното обучение - пренасяне на изчисленията към управлявани среди с данни, вместо преместване на чувствителни данни в едно централно хранилище. Сесията показва как сътрудничеството между множество обекти може да подпомогне валидацията, мониторинга и генерирането на доказателства за SaMD продукти, и очертава какво трябва да бъде съгласувано рано между стартъпи, болници и изследователи: предназначение на употреба, управление, критерии за валидация и регулаторна документация.'
    },
    {
      id: 'anton-tonchev', track: 'biotech',
      img: '/images/speakers/anton-tonchev.jpg?v=20260730', alt: 'Anton Tonchev',
      objectPosition: 'center 30%',
      name: 'проф. Антон Тончев',
      nameEn: 'Prof. Anton Tonchev',
      role: 'Professor & Chair, Anatomy @ Medical University Varna',
      topicBg: 'Поглед към микросвета - и отвъд него',
      topicEn: 'Zoom into the micro-world, and beyond',
      bioEn: [
        'Anton Tonchev graduated in Medicine from the Medical University of Varna in 1998. From 1998 to 2003, he pursued his PhD at the research unit of the Department of Neurosurgery, University of Kanazawa, Japan. He returned to Bulgaria in 2003 and has since led the country\'s first research group focused on brain stem cells.',
        'From 2012 to 2024, he chaired the Department of Anatomy and Cell Biology at the Medical University of Varna, and since 2018 he has been Director of the university\'s Research Institute. Prof. Tonchev is the chief organizer of the international "Black Sea Neurogenesis" conference (www.blacksea-neuro.org), and has supervised and consulted more than 10 PhD students, mainly in the field of brain stem cells.'
      ],
      bioBg: [
        'Антон Тончев завършва „Медицина“ в Медицински университет – Варна през 1998 г. В периода 1998–2003 г. работи по своята докторантура към научното звено на Катедрата по неврохирургия, Университет на Каназава, Япония. През 2003 г. се завръща в България и оттогава ръководи първата в България научна група, фокусирана върху стволовите клетки в мозъка.',
        'В периода 2012–2024 г. ръководи Катедрата по анатомия и клетъчна биология в МУ-Варна, а от 2018 г. е директор на Научноизследователския институт на МУ-Варна. А. Тончев е главният организатор на международната конференция „Black Sea Neurogenesis“ (www.blacksea-neuro.org). Научен ръководител и консултант на над 10 докторанти, главно в областта на мозъчните стволови клетки.'
      ]
    },
    {
      id: 'elitsa-encheva', track: 'biotech',
      img: '/images/speakers/elitsa-encheva.jpg?v=20260730', alt: 'Elitsa Encheva',
      objectPosition: 'center 40%',
      name: 'проф. Елица Енчева',
      nameEn: 'Prof. Elitsa Encheva',
      role: 'Head of Radiation Oncology @ Medical University Varna',
      topicBg: 'Образна диагностика и прецизно таргетиране на тумори както никога досега',
      topicEn: 'Imaging and targeting tumor like never before',
      bioEn: [
        'Prof. Elitsa Encheva, MD, PhD is a Radiation Oncologist with over 20 years of experience - head and founder of the Radiotherapy Clinic, St. Marina University Hospital, Varna, and head of the Radiotherapy Department at the Department of Nuclear Medicine and Radiotherapy, Medical University of Varna.',
        'She graduated from the Medical University of Sofia in 2003, was board-certified in Radiotherapy in 2009, and earned her PhD at MU-Sofia in 2011. In 2014, she completed a Master\'s degree in Public Health and Health Management, and in 2018 she was awarded the academic title of Professor at MU-Varna - the youngest in Radiotherapy in Bulgaria. She has specialized in Germany, Denmark, Belgium, the UK, Italy, Ireland, Israel, Switzerland and the Netherlands, among others. She is the only Bulgarian radiation oncologist on the teaching faculty of the International Stereotactic Radiosurgery Society (ISRS), and the author of over 100 scientific papers with a combined impact factor above 25 and more than 470 citations in international journals.',
        'She holds the Honorary Badge of the Bulgarian Medical Association (2016) for her contribution to innovative medicine, and in the same year she and the Radiotherapy Clinic received the Varna Award for the installation of high-tech radiotherapy equipment. In 2025, she was recognized by Open Society Varna for her contribution to medicine and healthcare.',
        'She participates in two European Commission-funded projects on 3D breast cancer imaging models (MaXIMA, PHENOMENO) and is co-principal investigator of the Swiss National Science Foundation project A-BEACON on AI-based brain metastases tracking and segmentation. She also leads a Medical University of Varna project to install an MRI unit for oncology care, funded through the EU\'s Integrated Territorial Investment programme.',
        'Under her leadership, all modern radiotherapy techniques for adults and children - IMRT, VMAT, IGRT, SRS radiosurgery and SBRT - have been introduced into practice, and her team was first in Bulgaria to introduce chemoradiation and hyperfractionated accelerated radiotherapy for lung cancer, whole-brain hippocampal-sparing irradiation, PET-CT-guided radiotherapy planning, and deep-inspiration breath-hold irradiation for breast cancer and for radiosurgery of the lung and liver.'
      ],
      bioBg: [
        'Проф. Елица Енчева, доктор по медицина, е лъчетерапевт с над 20 години опит - ръководител и основател на Клиниката по лъчелечение в УМБАЛ „Св. Марина“, Варна, и ръководител на Отделението по лъчелечение към Катедрата по нуклеарна медицина и лъчелечение на Медицински университет – Варна.',
        'Завършва Медицински университет – София през 2003 г., придобива специалност „Лъчелечение“ през 2009 г. и защитава докторска степен в МУ-София през 2011 г. През 2014 г. завършва магистратура по обществено здраве и здравен мениджмънт, а през 2018 г. получава академичното звание „професор“ в МУ-Варна - най-младият професор по лъчелечение в България. Специализирала е в Германия, Дания, Белгия, Обединеното кралство, Италия, Ирландия, Израел, Швейцария и Нидерландия, наред с други страни. Тя е единственият български лъчетерапевт в преподавателския състав на Международното дружество по стереотактична радиохирургия (ISRS) и автор на над 100 научни публикации с общ импакт фактор над 25 и над 470 цитирания в чуждестранни списания.',
        'Носител е на почетния знак на Българския лекарски съюз (2016 г.) за приноса си в развитието и внедряването на иновативна медицина, а същата година тя и Клиниката по лъчелечение получават Наградата на Варна за въвеждане в експлоатация на високотехнологична лъчетерапевтична апаратура. През 2025 г. е отличена от Отворено общество – Варна за приноса си в медицината и здравеопазването.',
        'Участва в два проекта на Европейската комисия за 3D модели за образна диагностика на рак на гърдата (MaXIMA, PHENOMENO) и е съ-водещ изследовател по проекта A-BEACON на Швейцарския национален научен фонд за AI-базирано проследяване и сегментиране на мозъчни метастази. Ръководи и проект на МУ-Варна за инсталиране на ЯМР за онкологични грижи, финансиран по програмата за интегрирани териториални инвестиции на ЕС.',
        'Под нейно ръководство в практиката се въвеждат всички съвременни лъчетерапевтични техники за възрастни и деца - IMRT, VMAT, IGRT, радиохирургия SRS и SBRT, като екипът ѝ е първият в България, въвел химиолъчелечение и хиперфракционирано ускорено лъчелечение при рак на белия дроб, облъчване на целия мозък с щадене на хипокампа, планиране на лъчелечение с ПЕТ-КТ, и облъчване с техниката ABC (задържане на дъха при дълбоко вдишване) при рак на гърдата и радиохирургия на бял дроб и черен дроб.'
      ]
    },
    {
      id: 'krastena-nikolova', track: 'biotech',
      img: '/images/speakers/krastena-nikolova.jpg?v=20260730', alt: 'Krastena Nikolova',
      objectPosition: 'center 35%',
      name: 'проф. Кръстена Николова',
      nameEn: 'Prof. Krastena Nikolova',
      role: 'Full Professor of Biophysics @ Medical University Varna',
      topicBg: 'Портативно аналитично устройство - химичен състав в ръцете ви',
      topicEn: 'Portable analytic device - chemical composition in your hands',
      bioEn: [
        "Professor Krastena Nikolova graduated from the Faculty of Physics at Paisii Hilendarski University of Plovdiv in 2001, and obtained a Master's degree in Applied Mathematics from the same university in 2002.",
        'In 2007, she was awarded a PhD in Physics for her dissertation "Application of Refractometry in the Food Industry", defended at the Central Laboratory of Optical Storage and Processing of Information of the Bulgarian Academy of Sciences.',
        'She served at the University of Food Technologies, Plovdiv, from 2002 to 2011, rising from Assistant to Chief Assistant Professor, and was a visiting lecturer at the Agricultural University of Plovdiv from 2011 to 2014.',
        'In 2016, she was elected Associate Professor of Physics at the Medical University of Varna, promoted to Full Professor in 2018, and obtained a specialty qualification in Biophysics in 2019.'
      ],
      bioBg: [
        'Проф. Кръстена Николова завършва Физическия факултет на Пловдивски университет „Паисий Хилендарски“ през 2001 г. и придобива магистърска степен по приложна математика в същия университет през 2002 г.',
        'През 2007 г. защитава докторска степен по физика с дисертация на тема „Приложение на рефрактометрията в хранителната промишленост“ в Централната лаборатория по оптично съхранение и обработка на информацията на БАН.',
        'В периода 2002–2011 г. работи в Университета по хранителни технологии – Пловдив, преминавайки от асистент до главен асистент, а в периода 2011–2014 г. е гост-преподавател в Аграрния университет – Пловдив.',
        'През 2016 г. е избрана за доцент по физика в Медицински университет – Варна, а през 2018 г. е повишена в „професор“. През 2019 г. придобива специализация по биофизика.'
      ],
      sessionDescBg: 'Представяме компактна спектрална платформа за бърз анализ на микрообразци в реална среда – от течности до твърди и прахообразни материали. Устройството съчетава флуоресцентни, пропускателни и разсейвателни режими, за да разкрие характерния оптичен „отпечатък“ на пробата без необходимост от обемна лабораторна инфраструктура. Чрез миниатюрни влакнесто-оптични пробници и съвместимост със смартфон-базирани спектрометри технологията превръща сложната спектроскопия в достъпен инструмент за полеви и приложни биотехнологични изследвания. Това е подход към аналитиката на бъдещето – бърза, мобилна и насочена към решения там, където пробата се намира.',
      sessionDescEn: 'We present a compact spectral platform for rapid analysis of microsamples in real-world environments, from liquids to solid and powdered materials. The device combines fluorescence, transmittance and scattering modes to reveal the distinctive optical fingerprint of a sample without relying on large laboratory infrastructure. By integrating miniaturized fiber-optic probes with smartphone-compatible spectrometry, the technology transforms advanced spectroscopy into an accessible tool for field and applied biotechnological studies. It represents a future-oriented analytical concept: fast, mobile and capable of bringing insight directly to the point of sampling.'
    },
    {
      id: 'kristina-bliznakova', track: 'biotech',
      img: '/images/speakers/kristina-bliznakova.jpg?v=20260730', alt: 'Kristina Bliznakova',
      objectPosition: 'center top',
      name: 'проф. Кристина Близнакова',
      nameEn: 'Prof. Kristina Bliznakova',
      role: 'Associate Professor @ TU Varna | Medical University Varna',
      topicBg: 'Ранен скрининг на рак на гърдата',
      topicEn: 'Early screening of breast cancer',
      bioEn: [
        'Professor Kristina Bliznakova graduated in Electronic Engineering and Microelectronics from the Technical University of Varna in 1996, and completed a Master\'s program in Biomedical Engineering at the University of Patras, Greece, in 1998.',
        'In 2003, she earned her PhD at the University of Patras with a dissertation on software simulation for X-ray imaging, developing a method for creating anthropomorphic computational breast models for X-ray imaging.',
        'From 2004 to 2012, she led the Monte Carlo Simulations Research Group at the University of Patras. In 2012, she was awarded a Marie Curie Career Integration Grant to support her reintegration into Bulgaria through a project on 3D breast cancer detection based on phase-contrast technology.',
        'Since 2016, she has been Associate Professor in the Department of Computer Science and Engineering at the Technical University of Varna, and since 2019 a member of the Department of Medical Equipment, Electronic and Information Technologies in Healthcare at the Medical University of Varna. She leads the "Anthropomorphic Phantoms" module within EUTEMPE-NET, the European Training and Education Network for Medical Physics Experts.',
        'Her research focuses on biomedical engineering, mathematical modelling of anthropomorphic tissue phantoms, and novel X-ray imaging techniques for breast cancer detection. She is a member of IEEE, IFMBE and EFOMP.'
      ],
      bioBg: [
        'Проф. Кристина Близнакова завършва „Електроника и микроелектроника“ в Технически университет – Варна през 1996 г. и магистърска програма по биомедицинско инженерство в Университета на Патрас, Гърция, през 1998 г.',
        'През 2003 г. защитава докторска степен в Университета на Патрас с дисертация върху софтуерна симулация за рентгенова образна диагностика, разработвайки метод за създаване на антропоморфни изчислителни модели на гърда за рентгенова диагностика.',
        'В периода 2004–2012 г. ръководи изследователската група по симулации Monte Carlo в Университета на Патрас. През 2012 г. получава грант Marie Curie Career Integration Grant за реинтеграцията си в България чрез проект за 3D откриване на рак на гърдата, базиран на фазово-контрастна технология.',
        'От 2016 г. е доцент в Катедрата по компютърни науки и инженерство на Технически университет – Варна, а от 2019 г. - член на Катедрата по медицинска техника, електроника и информационни технологии в здравеопазването на Медицински университет – Варна. Ръководи модула „Антропоморфни фантоми“ в рамките на EUTEMPE-NET - Европейската мрежа за обучение и образование на експерти по медицинска физика.',
        'Научните ѝ интереси са в областта на биомедицинското инженерство, математическото моделиране на антропоморфни тъканни фантоми и нови рентгенови техники за откриване на рак на гърдата. Член е на IEEE, IFMBE и EFOMP.'
      ],
      sessionDescBg: 'От 2020 г. насам ракът на гърдата е най-често диагностицираният рак в света, като ранното откриване остава предизвикателство – особено при жени с плътна гръдна тъкан. За да адресираме това, разработихме нова образна платформа, съчетаваща микрофокусен рентгенов източник с детектори както за преброяване на фотони, така и енергийно-интегриращи детектори. Системата разполага със собствен софтуер за управление на детектора, роботизирано сканиране и реконструкция на изображения, ръководени от предварителна изчислителна оптимизация. Успоредно с хардуера, проектирахме и произведохме нови физически антропоморфни фантоми на гърда, които точно възпроизвеждат тъканните структури и лезии. Валидираните фантоми осигуряват надеждна платформа за тестване на прототипа, подпомагайки разработването на диагностика от ново поколение.',
      sessionDescEn: 'Since 2020, breast cancer has been the most commonly diagnosed cancer worldwide, with early detection remaining a challenge - especially for women with dense breasts. To address this, we developed a novel imaging platform that combines a microfocus x-ray source with both photon-counting and energy-integrating detectors. The system features in-house software for detector control, robotic-assisted scanning, and image reconstruction, all guided by prior computational optimisation. Alongside the hardware, we designed and manufactured novel physical anthropomorphic breast phantoms that closely replicate tissue structures and lesions. The validated phantoms provide a reliable platform for testing the prototype, supporting the development of next-generation diagnostics.',
      takeawaysBg: 'Публиката ще научи повече за последните иновации в образната диагностика на гърдата. Освен това участниците ще получат представа за разработването на прототипни образни системи и антропоморфни фантоми на гърда.',
      takeawaysEn: 'The audience will learn about recent innovations in breast imaging. Further, participants will gain insight into the development of prototype imaging systems and anthropomorphic breast phantoms.'
    },
    {
      id: 'oskan-tasinov', track: 'biotech',
      img: '/images/speakers/oskan-tasinov.jpg?v=20260730', alt: 'Oskan Tasinov',
      objectPosition: 'center top',
      name: 'доц. Оскан Тасинов',
      nameEn: 'Assoc. Prof. Oskan Tasinov',
      role: 'Associate Professor, Molecular Biology & Biochemistry @ Medical University Varna',
      topicBg: 'WineX - повече от вино',
      topicEn: 'WineX - more than wine',
      bioEn: [
        'Assoc. Prof. Oskan B. Tasinov is a molecular biologist, with specialty in biochemistry and researcher at the Medical University "Prof. Dr. Paraskev Stoyanov" in Varna, Bulgaria. He holds a PhD in Biochemistry (2015) and an MSc in Molecular Biology and Biotechnologies from Plovdiv University, following a BSc from Sofia University. Since 2023, he has been an Associate Professor.',
        'His research focuses on oxidative stress, inflammation, insulin resistance, and molecular biomarkers in colorectal cancer, applying advanced methods such as qPCR, ELISA, and transcriptomic analysis. He has extensive experience in studying the biological effects of medicinal plants and cytotoxic agents, as well as gene expression in clinical and cell line experimental models.',
        'Assoc. Prof. Tasinov has completed international specializations across Europe and is an active member of leading scientific organizations, including FEBS and NuGO. He has received multiple awards recognizing his contributions to biomedical research.'
      ],
      bioBg: [
        'Доц. Оскан Б. Тасинов е молекулярен биолог със специалност биохимия и научен работник в Медицински университет „Проф. д-р Параскев Стоянов“ – Варна, България. Притежава докторска степен по биохимия (2015 г.) и магистърска степен по молекулярна биология и биотехнологии от Пловдивски университет, след бакалавърска степен от Софийски университет. От 2023 г. е доцент.',
        'Научните му интереси са в областта на оксидативния стрес, възпалението, инсулиновата резистентност и молекулярните биомаркери при колоректален рак, чрез прилагане на съвременни методи като qPCR, ELISA и транскриптомен анализ. Има богат опит в изследването на биологичните ефекти на лечебни растения и цитотоксични агенти, както и на генната експресия в клинични и клетъчно-линийни експериментални модели.',
        'Доц. Тасинов е преминал международни специализации в Европа и е активен член на водещи научни организации, включително FEBS и NuGO. Носител е на множество награди, признаващи приноса му в биомедицинските изследвания.'
      ],
      sessionDescBg: 'Природни продукти като червено вино, мед и екстракти от плодове на бъз са признати за богат източник на биоактивни съединения с антиоксидантни, имуномодулиращи и антивирусни свойства. Въз основа на тези характеристики е разработена нова биоактивна натурална комбинация в рамките на скорошна патентна заявка. Концепцията интегрира допълващи се фитохимични профили в единна формулация с повишен функционален потенциал. Експерименталната оценка показва висока in vitro антиоксидантна активност и повишено полифенолно съдържание, както и значителен антивирусен ефект срещу вирус на грип тип А, включващ както инхибиране на вирусната репликация, така и директна вирусоцидна активност. Освен това формулацията показва благоприятен профил на безопасност и стимулира жизнеспособността на имунните клетки, което подсказва имуномодулиращ потенциал. Резултатите показват синергични взаимодействия между компонентите и подчертават потенциала на тази натурална комбинация като мултифункционален подход за превенция и подпомагащо управление на състояния, свързани с оксидативен стрес и вирусни инфекции.',
      sessionDescEn: 'Natural products such as red wine, honey and dwarf elder fruits-derived extracts are recognized as rich sources of bioactive compounds with antioxidant, immunomodulatory and antiviral properties. Based on these characteristics, a novel bioactive natural combination was developed within the framework of a recent patent application. The concept integrates complementary phytochemical profiles into a single formulation with enhanced functional potential. Experimental evaluation demonstrates high in vitro antioxidant activity and elevated polyphenolic content, alongside significant antiviral effects against influenza A virus, including both inhibition of viral replication and direct virucidal activity. Additionally, the formulation exhibits a favorable safety profile and stimulates immune cell viability, suggesting immunomodulatory potential. The results indicate synergistic interactions between the components and highlight the potential of this natural combination as a multifunctional approach for prevention and supportive management of conditions associated with oxidative stress and viral infections.'
    },

    // ── Marine ──
    {
      id: 'svetlin-stoyanov', track: 'marine',
      img: '/images/speakers/svetlin-stoyanov.jpg?v=20260730', alt: 'Svetlin Stoyanov',
      objectPosition: '40% top',
      name: 'Светлин Стоянов',
      nameEn: 'Svetlin Stoyanov',
      role: 'Executive Director @ MTG Dolphin Shipyard | Chair @ BULNAS',
      topicBg: 'Корабостроенето на Черно море: иновации и предизвикателства',
      topicEn: 'Black Sea shipbuilding: innovation & challenges',
      bioEn: [
        'Svetlin Stoyanov is Executive Director of MTG Dolphin Shipyard in Varna, Bulgaria. He is Chairman of the Managing Committee of the Bulgarian National Association of Shipbuilding and Ship Repair (BULNAS), a Member of the Board of the Confederation of Employers and Industrialists in Bulgaria (CEIB), and a Member of the Board of the Bulgarian Chamber of Shipping.',
        'He also sits on the Supervisory Board of the Naval Academy and is a member of the ABS Black Sea Technical Committee and the BV Hellenic and Black Sea Technical Committee. Mr. Stoyanov graduated from the High Maritime School – Varna and holds an MSc from the Naval Academy, Varna.'
      ],
      bioBg: [
        'Светлин Стоянов е изпълнителен директор на корабостроителница MTG Dolphin – Варна, България. Той е председател на Управителния комитет на Българската национална асоциация по корабостроене и кораборемонт (БУЛНАС), член на управителния съвет на Конфедерацията на работодателите и индустриалците в България (КРИБ) и член на управителния съвет на Българската камара на корабоплаването.',
        'Той е и член на Настоятелството на Военноморското училище, както и на техническите комитети на ABS за Черно море и на BV за Елада и Черно море. Г-н Стоянов е завършил Висшето военноморско училище – Варна и притежава магистърска степен от Военноморска академия – Варна.'
      ]
    },
    {
      id: 'cemile-usta', track: 'marine',
      img: '/images/speakers/cemile-usta.jpg?v=20260819b', alt: 'Cemile Köseler Usta',
      objectPosition: 'center 8%',
      name: 'Cemile Köseler Usta',
      role: 'Deputy Manager, Technology & Digitalisation @ Istanbul Chamber of Industry',
      topicBg: 'Морски AI и управлявано от данни корабоплаване',
      topicEn: 'Maritime AI & Data-Driven Shipping',
      bioEn: [
        'Cemile Köseler Usta is Deputy Manager of the Technology and Digitalisation Dept. at the Istanbul Chamber of Industry and an Enterprise Europe Network (EEN) expert. A driving force behind industrial innovation and digital transformation, she empowers SMEs through strategic partnerships, technology adoption and EU-funded opportunities.'
      ],
      bioBg: [
        'Джемиле Кьоселер Уста е заместник-ръководител на отдел „Технологии и дигитализация“ в Търговско-промишлената камара на Истанбул и експерт на Enterprise Europe Network (EEN). Движеща сила зад индустриалните иновации и дигиталната трансформация, тя подпомага МСП чрез стратегически партньорства, внедряване на технологии и възможности за финансиране от ЕС.'
      ]
    },

    // ── Tourism ──
    {
      id: 'elitza-stoilova', track: 'tourism',
      img: '/images/speakers/elitza-stoilova.jpg?v=20260730', alt: 'Elitza Stoilova',
      objectPosition: 'center 12%',
      name: 'Елица Стоилова',
      nameEn: 'Elitza Stoilova',
      role: 'Co-founder & CEO @ Umni | AI2B Zone',
      topicBg: 'AI чатботове в туризма: реален бизнес ефект',
      topicEn: 'AI chatbots in tourism: real business impact',
      bioEn: [
        'Elitza Stoilova is the co-founder and CEO of Umni - an AI chatbot platform for creating and managing AI chatbots for sales, marketing and customer support, and a co-founder, CEO and expert of AI agency AI2B Zone (audit, consultancy and training in AI).',
        'Elitza has over 20 years of experience in the hospitality and tourism industry, with an established career as a Marketing Director and General Manager of hotels, a tour operator, and a real estate company managing hotels. She has worked in hotels in Turkey, Tunisia and Morocco, and developed her career in the hospitality industry over 17 years on Saipan, Northern Mariana Islands (USA). She served as a destination marketing consultant and committee chair for the Marianas Visitors Authority (AdHoc, MVA) for over 10 years and received 2 awards from MVA for her impact on destination development.',
        'Elitza co-founded Umni while participating in and successfully completing the largest global startup accelerator, The Founder Institute (by Silicon Valley), with a focus on chatbots, in 2017.',
        'Elitza was a lecturer at Software University with the first comprehensive course in Bulgaria on AI chatbots. She is a certified AEO Specialist (AI visibility optimization), AI consultant and trainer, a frequent expert guest in national media, and a speaker at conferences, public events and universities in Bulgaria and China, where she teaches "AI in Tourism". She is the author of the AI Travel Economy column at BGTourism.bg and of Bulgaria\'s first course "AEO for hotels".'
      ],
      bioBg: [
        'Елица Стоилова е съосновател и CEO на Umni.bg – AI чатбот платформа за създаване и управление на AI чатботове за маркетинг, продажби и клиентска поддръжка, както и съосновател, CEO и експерт на AI агенция AI2B Zone (аудит, консултации и обучение в сферата на AI).',
        'Елица има над 20 години опит в хотелиерството и туризма, с утвърдена кариера като маркетинг директор и генерален мениджър на хотели, туроператор и компания за недвижими имоти, управляваща хотели. Работила е в хотели в Турция, Тунис и Мароко и е развивала кариерата си в хотелиерството в продължение на 17 години на о-в Сайпан, Северни Мариански острови (САЩ). Тя е била консултант по маркетинг на дестинация и председател на комитет на Marianas Visitors Authority (AdHoc, MVA) в продължение на над 10 години и е получила 2 награди от MVA за приноса си към развитието на дестинацията.',
        'Елица съосновава Umni.bg през 2017 г. по време на участието си в най-големия глобален акселератор за стартиращи компании, The Founder Institute (от Силициевата долина), с фокус върху чатботовете.',
        'Елица е автор на първия у нас цялостен курс по бизнес AI чатботове (СофтУни). Тя е сертифициран AEO специалист (оптимизация за AI видимост), AI консултант и обучител, често гостува като експерт в националните медии и е лектор на конференции, публични събития и университети в България и Китай, където преподава „AI в туризма“. Тя е автор на рубриката „AI Travel Economy“ в BGTourism.bg и на първия у нас курс „АЕО за хотели“.'
      ]
    },
    {
      id: 'andrey-lilov', track: 'tourism',
      img: '/images/speakers/andrey-lilov.jpg?v=20260730', alt: 'Andrey Lilov',
      objectPosition: 'center top',
      name: 'Андрей Лилов',
      nameEn: 'Andrey Lilov',
      role: 'Co-founder & CEO @ URBO Studio',
      topicBg: 'Дигитализация на туризма и събитийната индустрия',
      topicEn: 'Digitalization of tourism & events industry',
      bioEn: [
        'Andrey Lilov is Co-founder and CEO of URBO Studio - a technology company developing solutions for digitalization, sales and management in tourism, events, culture, sports and the entertainment industry.',
        'He has extensive experience in business development, hospitality software, sales and the creation of digital platforms that connect businesses with their customers in a more direct and efficient way.',
        'Under his leadership, URBO Studio develops solutions for online ticketing, reservations, payments, access control, QR-based sales, and tourism platforms for municipalities and tourism sites, museums, attractions, hotels and event organizers.',
        "Today, Andrey is focused on the next stage of URBO Studio's development - the integration of AI, automation and new models for access, sales and experience management."
      ],
      bioBg: [
        'Андрей Лилов е съосновател и CEO на URBO Studio - технологична компания, която разработва решения за дигитализация, продажби и управление в туризма, събитийната индустрия, културата, спорта и развлекателния сектор.',
        'Той има дългогодишен опит в бизнес развитието, хотелския софтуер, продажбите и изграждането на дигитални платформи, които свързват бизнеса с неговите клиенти по по-директен и ефективен начин.',
        'Под негово ръководство URBO Studio развива решения за онлайн билети, резервации, плащания, контрол на достъпа, QR продажби, туристически платформи за общини и туристически обекти, музеи, атракции, хотели и организатори на събития.',
        'Днес Андрей работи върху следващата фаза в развитието на URBO Studio - интеграция на AI, автоматизации и нови модели за достъп, продажби и управление на преживяванията.'
      ]
    },
    {
      id: 'stanislav-ivanov', track: 'tourism',
      img: '/images/speakers/stanislav-ivanov.jpg?v=20260929', alt: 'Stanislav Ivanov',
      objectPosition: 'center top',
      name: 'проф. Станислав Иванов',
      nameEn: 'Prof. Stanislav Ivanov',
      role: 'President @ International Federation for IT and Travel & Tourism | Director @ Zangador Research Institute',
      roleBg: 'Президент @ International Federation for IT and Travel & Tourism | Директор @ Zangador Research Institute',
      roleEn: 'President @ International Federation for IT and Travel & Tourism | Director @ Zangador Research Institute',
      topicBg: 'Високотехнологични преживявания в туризма',
      topicEn: 'High-tech experiences in tourism',
      bioBg: [
        'Станислав Иванов е професор във Висше училище по мениджмънт, Варна, управител на Изследователски институт „Зангадор“ и президент на IFITT - Международната федерация за информационни технологии и туризъм. Главен редактор е на European Journal of Tourism Research и ROBONOMICS: The Journal of the Automated Economy. Научните му изследвания са насочени към робономика, приложение на роботи и изкуствен интелект в туризма, икономически и социални измерения на технологиите.'
      ],
      bioEn: [
        'Stanislav Ivanov is a Professor at Varna University of Management, Director of the Zangador Research Institute, and President of IFITT, the International Federation for IT and Travel & Tourism (2026-28). He is the Editor-in-Chief of the European Journal of Tourism Research and ROBONOMICS: The Journal of the Automated Economy. His research interests include robonomics, robots and AI in tourism, and the economic and social aspects of technology.'
      ],
      sessionDescBg: 'Туризмът вече не е само разглеждане на места - той е потапяне в тях. Изкуственият интелект, AR/VR, роботите и интелигентните технологии превръщат дестинациите в завладяващи, персонализирани преживявания, в които всеки посетител може да изследва, да взаимодейства и да запомня по различен начин. Нека видим как цялата туристическа екосистема ще промени из основи това, което днес наричаме „туризъм“.',
      sessionDescEn: 'Tourism is no longer just about seeing places - it is about entering them. AI, AR/VR, robots and smart technologies are turning destinations into immersive, personalised experiences where every visitor can explore, interact and remember differently. Let\'s see how the entire tourism ecosystem will profoundly change what we now call "tourism".'
    },

    // ── Regional Innovation Policy ──
    {
      id: 'kalina-tsolova', track: 'regional-innovation-policy',
      img: '/images/speakers/kalina-tsolova.jpg?v=20260730', alt: 'Kalina Tsolova',
      objectPosition: 'center top',
      name: 'Калина Цолова',
      nameEn: 'Kalina Tsolova',
      role: 'Expert @ ARC Fund',
      topicBg: 'Иновационни екосистеми и технологична устойчивост на градовете',
      topicEn: 'Innovation ecosystems & urban technology resilience',
      bioEn: [
        'Kalina Tsolova is an expert in innovation, regional development, and climate-focused urban transformation, with experience in the public, private, and non-governmental sectors. At ARC Fund, she focuses on the development of innovation ecosystems and technology-driven solutions that strengthen the resilience, sustainability, and competitiveness of cities and regions.',
        'Kalina organizes the high-level Security and Innovation Dialogue – an ARC Fund engagement with the Silicon Valley and Miami innovation community, where she engages with global technology companies, investors, and academic institutions on the future of AI, digital infrastructure, and resilient supply chains. She brings a comprehensive understanding of the link between digital transformation and industrial competitiveness, with a focus on positioning the Black Sea region within Europe\'s evolving technology and energy landscape.'
      ],
      bioBg: [
        'Калина Цолова е експерт по иновации, регионално развитие и градска трансформация, ориентирана към климата, с опит в публичния, частния и неправителствения сектор. В ARC Fund тя се фокусира върху развитието на иновационни екосистеми и технологични решения, които укрепват устойчивостта, устойчивото развитие и конкурентоспособността на градовете и регионите.',
        'Калина организира високото ниво диалог Security and Innovation Dialogue - инициатива на ARC Fund с иновационната общност на Силициевата долина и Маями, в рамките на която работи с глобални технологични компании, инвеститори и академични институции по темите за бъдещето на AI, дигиталната инфраструктура и устойчивите вериги на доставки. Тя има задълбочено разбиране за връзката между дигиталната трансформация и индустриалната конкурентоспособност, с фокус върху позиционирането на Черноморския регион в развиващия се технологичен и енергиен пейзаж на Европа.'
      ]
    },
    {
      id: 'georgi-dobrev', track: 'regional-innovation-policy',
      img: '/images/speakers/georgi-dobrev.jpg?v=20260730', alt: 'Georgi Dobrev',
      objectPosition: 'center 8%',
      name: 'Георги Добрев',
      nameEn: 'Georgi Dobrev',
      role: 'Analyst @ ARC Fund',
      topicBg: 'Дигитализация на МСП: анализ и политики',
      topicEn: 'SME digitalization: analysis & policy',
      bioEn: [
        "Georgi Dobrev works as an analyst at the Applied Research and Communications Fund (ARC Fund), focusing on support for technology transfer and the digitalisation of SMEs, the sustainable development of the regional innovation ecosystem, and employability through the integration of vulnerable groups into the labour market. He analyses and publishes on innovation, trade, and technology policy, using quantitative methods that combine macroeconomic statistics, financial and survey data. Georgi contributes to ARC Fund's annual Innovation.bg report, the Global Competitiveness Yearbook of the IMD World Competitiveness Centre, and the regular reports of the Global Trade and Innovation Policy Alliance."
      ],
      bioBg: [
        'Георги Добрев работи като анализатор във Фондация „Приложни изследвания и комуникации“ (ARC Fund), фокусирайки се върху подкрепа за трансфера на технологии и дигитализацията на МСП, устойчивото развитие на регионалната иновационна екосистема и заетостта чрез интеграция на уязвими групи на пазара на труда. Той анализира и публикува по теми, свързани с иновациите, търговията и технологичните политики, използвайки количествени методи, съчетаващи макроикономическа статистика, финансови и анкетни данни. Георги допринася за годишния доклад Innovation.bg на ARC Fund, Global Competitiveness Yearbook на IMD World Competitiveness Centre, както и за редовните доклади на Global Trade and Innovation Policy Alliance.'
      ]
    },
    {
      id: 'ruslan-stefanov', track: 'regional-innovation-policy',
      img: '/images/speakers/ruslan-stefanov.jpg?v=20260730', alt: 'Ruslan Stefanov',
      objectPosition: 'center top',
      name: 'Руслан Стефанов',
      nameEn: 'Ruslan Stefanov',
      role: 'Director Strategy & Innovation @ ARC Fund',
      topicBg: '20 години Innovation.bg: картата на иновациите в България',
      topicEn: "20 years Innovation.bg: mapping Bulgaria's innovation landscape",
      bioEn: [
        "Ruslan Stefanov is the Director for Strategy and Innovation at the Applied Research and Communications Fund (ARC Fund). He leads ARC Fund's research, project management and consulting work on smart specialization, regional innovation strategies, technology and innovation assessments, and innovation-driven enterprise support and scale-up in Southeast Europe and the Black Sea region. Ruslan is chair and editor of Innovation.bg, the most reputable annual assessment of the innovation performance of the Bulgarian economy over the past 20 years, and a member of the jury of the National Innovation Award. He is a member of the Global Trade and Innovation Policy Alliance and the MIT REAP Bulgaria team."
      ],
      bioBg: [
        'Руслан Стефанов е директор „Стратегия и иновации“ във Фондация „Приложни изследвания и комуникации“ (ARC Fund). Той ръководи изследователската, проектната и консултантската дейност на ARC Fund в областта на интелигентната специализация, регионалните иновационни стратегии, оценките на технологиите и иновациите, както и подкрепата и мащабирането на иновативни предприятия в Югоизточна Европа и Черноморския регион. Руслан е председател и редактор на Innovation.bg - най-авторитетната годишна оценка на иновационното представяне на българската икономика през последните 20 години - и член на журито на Националната награда за иновации. Той е член на Global Trade and Innovation Policy Alliance и на екипа на MIT REAP България.'
      ]
    },
    {
      id: 'paul-lambert', track: 'regional-innovation-policy',
      img: '/images/speakers/paul-lambert.jpg?v=20260730', alt: 'Paul Lambert',
      objectPosition: 'center 12%',
      name: 'Paul Lambert',
      role: 'Ambassador of the Kingdom of Belgium to the Republic of Bulgaria',
      topicBg: 'Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион',
      topicEn: "The European Union's innovation and geoeconomic power in the Black Sea region",
      bioEn: [
        'Paul Lambert combines over 25 years of diplomatic experience. Most recently, from summer 2020 till summer 2024, as Deputy DG ICT, Mr. Lambert was heading the cybersecurity department at the Belgian Ministry of Foreign Affairs. He pushed for high user acceptance of broad cybersecurity to achieve long-lasting changes (mass roll-out of modern endpoints, introduction of an anti-phishing platform, a DLP scheme, phasing out of Bring Your Own Devices) and pushed for a pilot project on the use of AI to render official data more readily available.',
        'During his previous tenure, from 2016 till 2020, Mr. Lambert was the Belgian Consul General in Shanghai, where he contributed to the success of a large Trade Mission which led to new commercial ventures in the sports area, notably regarding football.',
        'At CONNEXUS 2026, Ambassador Lambert joins the panel "The European Union\'s innovation and geoeconomic power in the Black Sea region", together with Michael Roux, Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France, and Stefan Muntoiu, Business Development Manager at Jan De Nul Group. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.'
      ],
      bioBg: [
        'Пол Ламбърт съчетава над 25 години дипломатически опит. Най-скоро, от лятото на 2020 г. до лятото на 2024 г., като заместник генерален директор „ИКТ“, г-н Ламбърт ръководи отдела по киберсигурност в белгийското Министерство на външните работи. Той работи за високо ниво на приемане от потребителите на широкообхватни мерки за киберсигурност с цел постигане на трайни промени (масово внедряване на съвременни крайни устройства, въвеждане на платформа срещу фишинг, DLP схема, извеждане от употреба на политиката „донеси своето устройство“ (BYOD)) и подкрепя пилотен проект за използване на AI за по-лесен достъп до официални данни.',
        'През предходния си мандат, от 2016 до 2020 г., г-н Ламбърт е бил генерален консул на Белгия в Шанхай, където допринася за успеха на голяма търговска мисия, довела до нови търговски начинания в областта на спорта, по-специално във футбола.',
        'На CONNEXUS 2026 посланик Ламбърт се присъединява към панела „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“, заедно с Michael Roux, посланик за Източното партньорство и Черноморския регион в Министерството на Европа и външните работи на Франция, и Stefan Muntoiu, мениджър бизнес развитие в Jan De Nul Group. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
      ],
      sessionDescEn: 'Panel discussion - "The European Union\'s innovation and geoeconomic power in the Black Sea region" - with Michael Roux, Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France, Paul Lambert, Ambassador of Belgium to Bulgaria, and Stefan Muntoiu, Business Development Manager, Jan De Nul Group. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.',
      sessionDescBg: 'Панелна дискусия - „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“ - с участието на Michael Roux, посланик за Източното партньорство и Черноморския регион в Министерството на Европа и външните работи на Франция, Пол Ламбърт, посланик на Белгия в България, и Stefan Muntoiu, мениджър бизнес развитие в Jan De Nul Group. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
    },
    {
      id: 'michael-roux', track: 'regional-innovation-policy',
      img: '/images/speakers/michael-roux.jpg?v=20260824-2', alt: 'Michaël Roux',
      objectPosition: 'center 48%',
      name: 'Michaël Roux',
      role: 'Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France',
      topicBg: 'Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион',
      topicEn: "The European Union's innovation and geoeconomic power in the Black Sea region",
      bioEn: [
        'Michaël Roux, born in 1966, is a career French diplomat and a graduate of the National School of Statistics and Economic Administration (France). Before joining the French Ministry for Europe and Foreign Affairs in 2002, he worked as a consultant, notably for the European Commission and the World Bank, on projects including the pre-accession of Bulgaria and Romania and various TACIS programmes across Europe, Africa and Asia.',
        'As a career diplomat since 2002, he served as desk officer for the directorate for Africa and the Indian Ocean in Paris, Deputy Head of Mission in Mauritius (2005-2008) and in Ukraine (2008-2012), and Deputy Director for Southern Africa and the Indian Ocean (2012-2016). He was Ambassador of France to the Kyrgyz Republic (2016-2020) and to the Republic of Liberia (2020-2023), and has served as Ambassador for the Eastern Partnership and the Black Sea since 2023.',
        'At CONNEXUS 2026, Ambassador Roux joins the panel "The European Union\'s innovation and geoeconomic power in the Black Sea region", together with Paul Lambert, Ambassador of the Kingdom of Belgium to the Republic of Bulgaria, and Stefan Muntoiu, Business Development Manager at Jan De Nul Group. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.'
      ],
      bioBg: [
        'Michaël Roux, роден през 1966 г., е кариерен френски дипломат и завършва Националното училище по статистика и икономическа администрация на Франция. Преди да се присъедини към френското Министерство на Европа и външните работи през 2002 г., той работи като консултант, включително за Европейската комисия и Световната банка, по проекти, свързани с предприсъединяването на България и Румъния, както и различни програми TACIS в Европа, Африка и Азия.',
        'Като кариерен дипломат от 2002 г. насам, той е служител в дирекция „Африка и Индийски океан“ в Париж, заместник-ръководител на мисията в Мавриций (2005-2008 г.) и в Украйна (2008-2012 г.), както и заместник-директор за Южна Африка и Индийски океан (2012-2016 г.). Бил е посланик на Франция в Киргизката република (2016-2020 г.) и в Република Либерия (2020-2023 г.), а от 2023 г. е посланик за Източното партньорство и Черноморския регион.',
        'На CONNEXUS 2026 посланик Roux се присъединява към панела „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“, заедно с Пол Ламбърт, посланик на Кралство Белгия в Република България, и Stefan Muntoiu, мениджър бизнес развитие в Jan De Nul Group. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
      ],
      sessionDescEn: 'Panel discussion - "The European Union\'s innovation and geoeconomic power in the Black Sea region" - with Michael Roux, Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France, Paul Lambert, Ambassador of Belgium to Bulgaria, and Stefan Muntoiu, Business Development Manager, Jan De Nul Group. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.',
      sessionDescBg: 'Панелна дискусия - „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“ - с участието на Michael Roux, посланик за Източното партньорство и Черноморския регион в Министерството на Европа и външните работи на Франция, Пол Ламбърт, посланик на Белгия в България, и Stefan Muntoiu, мениджър бизнес развитие в Jan De Nul Group. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
    },
    {
      id: 'lars-frolund', track: 'regional-innovation-policy',
      img: '/images/speakers/lars-frolund.jpg?v=20260824', alt: 'Dr. Lars Frølund',
      objectPosition: 'center 15%',
      name: 'Dr. Lars Frølund',
      role: 'Lecturer @ MIT',
      topicBg: 'Към европейска иновационна екосистема: как Европа може да се конкурира и партнира със САЩ и Китай',
      topicEn: 'Towards a European innovation ecosystem: How can Europe compete and collaborate with the US and China',
      bioEn: [
        'Dr. Lars Frølund is a Deep Tech Investment expert and executive. His expertise lies at the intersection of mission-driven innovation (incl. defense and security), grant & venture capital investments into deep tech ventures, and the geopolitical/strategic aspects of technological capacity building at the national and international level.',
        'He is a Distinguished Senior Lecturer at the Massachusetts Institute of Technology (MIT) and an adjunct professor at the Niels Bohr Institute, Copenhagen University.'
      ],
      bioBg: [
        'Д-р Lars Frølund е експерт и ръководител в областта на инвестициите в дълбоки технологии (deep tech). Опитът му се намира в пресечната точка на мисийно-ориентираните иновации (вкл. отбрана и сигурност), грантовите и рисковите капиталови инвестиции в дълбокотехнологични проекти, и геополитическите/стратегическите аспекти на изграждането на технологичен капацитет на национално и международно ниво.',
        'Той е Distinguished Senior Lecturer в Масачузетския технологичен институт (MIT) и хоноруван професор в Института „Нилс Бор“ към Университета на Копенхаген.'
      ]
    },
    {
      id: 'robin-peeters', track: 'regional-innovation-policy',
      img: '/images/speakers/robin-peeters.jpg?v=20260915', alt: 'Robin Peeters',
      objectPosition: 'center top',
      name: 'Robin Peeters',
      role: 'Deputy Ambassador of the Kingdom of the Netherlands to Bulgaria',
      roleBg: 'Заместник-посланик на Кралство Нидерландия в България',
      roleEn: 'Deputy Ambassador of the Kingdom of the Netherlands to Bulgaria',
      topicBg: 'Справяне със стратегическата несигурност в Черноморския регион',
      topicEn: 'Tackling Strategic Insecurity in the Black Sea Region',
      bioEn: [
        'Robin Peeters is a Dutch diplomat who currently serves as Deputy Head of Mission at the Embassy of the Kingdom of the Netherlands in Sofia. He holds advanced degrees in law and international affairs from the University of Amsterdam and Sciences Po Paris. Prior to his post in Sofia, his career with the Netherlands Ministry of Foreign Affairs included roles as Private Secretary to the UN Senior Humanitarian and Reconstruction Coordinator for Gaza, Political Coordinator at the Permanent Representation to the UN in New York, Advisor to the President of the UN General Assembly, and First Secretary in Moscow.'
      ],
      bioBg: [
        'Robin Peeters е нидерландски дипломат, който в момента е заместник-ръководител на мисията в посолството на Кралство Нидерландия в София. Има магистърски степени по право и международни отношения от Университета на Амстердам и Sciences Po Париж. Преди назначението си в София кариерата му в нидерландското Министерство на външните работи включва позициите личен секретар на старшия координатор на ООН по хуманитарните въпроси и възстановяването на Газа, политически координатор в Постоянното представителство към ООН в Ню Йорк, съветник на председателя на Общото събрание на ООН и първи секретар в Москва.'
      ]
    },
    {
      id: 'stefan-muntoiu', track: 'regional-innovation-policy',
      img: '/images/speakers/stefan-muntoiu.jpg?v=20260915', alt: 'Stefan Muntoiu',
      objectPosition: 'center top',
      name: 'Stefan Muntoiu',
      role: 'Business Development Manager @ Jan De Nul Group',
      roleBg: 'Мениджър бизнес развитие @ Jan De Nul Group',
      roleEn: 'Business Development Manager @ Jan De Nul Group',
      topicBg: 'Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион',
      topicEn: "The European Union's innovation and geoeconomic power in the Black Sea region",
      bioEn: [
        'Stefan Muntoiu is a Business Development Manager at Jan De Nul Group, which specialises in offshore energy construction, dredging solutions and other major construction projects on an international scale. A highly experienced team leader in senior management, he brings professional experience spanning multiple domains, including shipping, construction, oil and gas, administration, consulting and HR.'
      ],
      bioBg: [
        'Stefan Muntoiu е Business Development Manager в Jan De Nul Group - компания, специализирана в изграждането на офшорни енергийни съоръжения, драгажни решения и други мащабни международни строителни проекти. Той е високо опитен ръководител на екипи на висше управленско ниво и носи професионален опит в редица области, сред които корабоплаване, строителство, нефт и газ, администрация, консултиране и управление на човешки ресурси.'
      ],
      sessionDescEn: 'Panel discussion - "The European Union\'s innovation and geoeconomic power in the Black Sea region" - with Michael Roux, Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France, Paul Lambert, Ambassador of Belgium to Bulgaria, and Stefan Muntoiu, Business Development Manager, Jan De Nul Group. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.',
      sessionDescBg: 'Панелна дискусия - „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“ - с участието на Michael Roux, посланик за Източното партньорство и Черноморския регион в Министерството на Европа и външните работи на Франция, Пол Ламбърт, посланик на Белгия в България, и Stefan Muntoiu, мениджър бизнес развитие в Jan De Nul Group. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
    },
    {
      id: 'jeroen-van-hertum', track: 'regional-innovation-policy',
      img: '/images/speakers/jeroen-van-hertum.jpg?v=20260916', alt: 'Jeroen van Hertum',
      objectPosition: 'center top',
      name: 'Jeroen van Hertum',
      role: 'Board Member @ Dutch Bulgarian Chamber of Commerce',
      topicBg: 'Публично-частно сътрудничество за иновации в киберсигурността и сигурността на изкуствения интелект',
      topicEn: 'Public-Private Cooperation for Cybersecurity and AI Security Innovation',
      bioEn: [
        'Jeroen van Hertum serves on the board of the Dutch Bulgarian Chamber of Commerce, the bridge between the Dutch and Bulgarian business communities, where he works on cross-border technology cooperation, nearshoring and connecting Bulgarian tech to Western European markets. He is also the founder of Sourcelab, a European technology consultancy operating between Sofia and the Netherlands.',
        'Over thirty years he has built advanced digital products for startups, fintechs, banks and large enterprises, from small teams shipping fast to regulated institutions carrying real risk. Dutch by birth and based in Bulgaria since 2010, his focus is digital trust and European digital identity: eIDAS, qualified electronic signatures and the emerging EU Digital Identity Wallet. He argues that trust is becoming a business advantage rather than a compliance cost.'
      ],
      bioBg: [
        'Jeroen van Hertum е член на борда на Нидерландско-българската търговска камара - мостът между нидерландската и българската бизнес общност, където работи по трансгранично технологично сътрудничество, ниършоринг и свързването на българския технологичен сектор със западноевропейските пазари. Той е и основател на Sourcelab - европейска технологична консултантска компания, която работи между София и Нидерландия.',
        'В продължение на над тридесет години изгражда съвременни цифрови продукти за стартъпи, финтех компании, банки и големи предприятия - от малки екипи, които разработват бързо, до регулирани институции, които носят реален риск. Нидерландец по произход и установен в България от 2010 г., той е фокусиран върху цифровото доверие и европейската цифрова идентичност: eIDAS, квалифицираните електронни подписи и създаващия се Европейски портфейл за цифрова идентичност. Тезата му е, че доверието се превръща в бизнес предимство, а не в разход за съответствие.'
      ]
    },
    {
      id: 'martijn-leijten', track: 'regional-innovation-policy',
      img: '/images/speakers/martijn-leijten.jpg?v=20260916', alt: 'Martijn Leijten',
      objectPosition: 'center top',
      name: 'Dr. Martijn Leijten',
      role: 'Assistant Professor, Faculty of Technology, Policy and Management @ Delft University of Technology',
      topicBg: 'Интелигентни решения за защита на критичната инфраструктура',
      topicEn: 'Smart Solutions for Critical Infrastructure Protection',
      bioEn: [
        'Dr. Martijn Leijten is an assistant professor of Organisation and Governance of the faculty of Technology, Policy and Management of Delft University of Technology (the Netherlands) and acts as scientific coordinator of Next Generation Infrastructures, a research platform of six public infrastructure providers in the field of transport, energy and drinking water in the Netherlands. He researches complex projects and technology transition processes and teaches both in academia and in the public and private sector.'
      ],
      bioBg: [
        'Д-р Martijn Leijten е асистент-професор по организация и управление във Факултета по технологии, политики и управление на Технологичния университет в Делфт (Нидерландия) и научен координатор на Next Generation Infrastructures - изследователска платформа на шест публични инфраструктурни оператора в областта на транспорта, енергетиката и питейните води в Нидерландия. Изследва сложни проекти и процеси на технологичен преход и преподава както в академична среда, така и в публичния и частния сектор.'
      ]
    },
    {
      id: 'galabin-galabov', track: 'regional-innovation-policy',
      img: '/images/speakers/galabin-galabov.jpg?v=20260916', alt: 'Galabin Galabov',
      objectPosition: 'center top',
      name: 'Гълъбин Гълъбов',
      nameEn: 'Galabin Galabov',
      role: 'Chairman of the Board and CEO @ Bulgarian Export Insurance Agency (BAEZ)',
      roleBg: 'Председател на УС и ИД @ Българска агенция за експортно застраховане (БАЕЗ)',
      roleEn: 'Chairman of the Board and CEO @ Bulgarian Export Insurance Agency (BAEZ)',
      topicBg: 'Финансови инструменти за подкрепа на експортния и МСП бизнеса от страна на Българска агенция за експортно застраховане',
      topicEn: 'Financial Instruments from the Bulgarian Export Insurance Agency in Support of Exporters and SMEs',
      bioBg: [
        'Мениджър с над 30 години професионален опит в областта на финансите, а понастоящем Председател на УС и ИД на Българска агенция за експортно застраховане ЕАД.'
      ],
      bioEn: [
        'A manager with over 30 years of professional experience in finance, currently Chairman of the Management Board and Executive Director of the Bulgarian Export Insurance Agency EAD.'
      ],
      sessionDescBg: 'Представяне на инструментите, които БАЕЗ предоставя за подкрепа на експортно ориентираните фирми, както и застраховка на кредити за оборотни нужди на фирми от сегмента МСП.',
      sessionDescEn: 'A presentation of the instruments BAEZ provides in support of export-oriented companies, as well as insurance of working capital loans for companies in the SME segment.',
      takeawaysBg: 'Българска агенция за експортно застраховане предоставя различни инструменти за споделяне риска на българските експортьори, който те поемат при продажба на отложено плащане, както и на банките при финансиране на експортни сделки и улесняване на оборотно кредитиране на фирми от МСП сегмента. В допълнение Агенцията предоставя застраховки тип гаранция, които дават възможност за замяна на банковите гаранции в страната и чужбина за участие в търг, добро изпълнение и поддръжка.',
      takeawaysEn: 'The Bulgarian Export Insurance Agency offers a range of instruments for sharing the risk that Bulgarian exporters take on when selling on deferred payment terms, as well as the risk banks take on when financing export deals and facilitating working capital lending to companies in the SME segment. In addition, the Agency provides guarantee-type insurance, which makes it possible to replace bank guarantees in Bulgaria and abroad for tender participation, performance and maintenance.'
    },
    {
      id: 'neven-dilkov', track: 'regional-innovation-policy',
      img: '/images/speakers/neven-dilkov.jpg?v=20260925', alt: 'Neven Dilkov',
      objectPosition: 'center top',
      name: 'Невен Дилков',
      nameEn: 'Neven Dilkov',
      role: 'Founder & CEO @ Neterra | Founder @ NetIX',
      roleBg: 'Основател и изпълнителен директор @ Neterra | Основател @ NetIX',
      roleEn: 'Founder & CEO @ Neterra | Founder @ NetIX',
      topicBg: 'Към европейска иновационна екосистема: как Европа може да се конкурира и партнира със САЩ и Китай',
      topicEn: 'Towards a European innovation ecosystem: How can Europe compete and collaborate with the US and China',
      bioEn: [
        'Neven Dilkov is a visionary entrepreneur and a global leader in the telecommunications industry with over 30 years of experience. As the founder and CEO of Neterra, he has built an independent global network spanning 220 locations in 75+ countries, serving hundreds of global enterprises and 9 of the world’s 10 largest telecoms. Under his leadership, Neterra has been recognized as the Best Connectivity Provider in Central and Eastern Europe for three consecutive years (2023, 2024, and 2025) and has become a Starlink Authorized Reseller.',
        'Neven is also the founder of NetIX, one of the top 10 global Internet Exchange platforms, which revolutionized how networks exchange traffic internationally. His ecosystem of innovative ventures includes Sofia Data Center, Neterra.Cloud, and Neterra.TV.',
        'A respected voice in European policy, Neven served two successful mandates as Chairman of the Board of ecta (European Competitive Telecommunications Association) and continues to contribute as a Board Member. He was also a member of the Forbes Business Council through 2025.',
        'Neven holds a degree in Computer Science and Mathematics (summa cum laude) from West Virginia Wesleyan College and has studied at Tsinghua University (China) and Sofia Technical University. He is fluent in English, Bulgarian, and Mandarin Chinese.'
      ],
      bioBg: [
        'Невен Дилков е предприемач с визия и глобален лидер в телекомуникационната индустрия с над 30 години опит. Като основател и изпълнителен директор на Neterra той изгражда независима глобална мрежа с 220 точки на присъствие в над 75 държави, която обслужва стотици международни компании и 9 от 10-те най-големи телекома в света. Под негово ръководство Neterra е отличена за най-добър доставчик на свързаност в Централна и Източна Европа три поредни години (2023, 2024 и 2025) и става оторизиран дистрибутор на Starlink.',
        'Невен е и основател на NetIX - една от 10-те най-големи глобални платформи за обмен на интернет трафик (Internet Exchange), която променя начина, по който мрежите обменят трафик в международен мащаб. Екосистемата му от иновативни проекти включва още Sofia Data Center, Neterra.Cloud и Neterra.TV.',
        'Уважаван глас в европейските политики, Невен е бил два мандата председател на Управителния съвет на ecta (Европейската асоциация на конкурентните телекомуникационни оператори) и продължава да участва в работата ѝ като член на борда. До 2025 г. е член и на Forbes Business Council.',
        'Завършил е компютърни науки и математика с отличие (summa cum laude) в West Virginia Wesleyan College, учил е и в Университета Цинхуа (Китай) и в Техническия университет - София. Владее свободно английски, български и китайски (мандарин).'
      ]
    },
    {
      id: 'svetoslava-georgieva', track: 'regional-innovation-policy',
      img: '/images/speakers/svetoslava-georgieva.jpg?v=20260925', alt: 'Svetoslava Georgieva',
      objectPosition: 'center top',
      name: 'Светослава Георгиева',
      nameEn: 'Svetoslava Georgieva',
      role: 'Board Chair @ European Innovation Council Fund',
      roleBg: 'Председател на борда @ European Innovation Council Fund',
      roleEn: 'Board Chair @ European Innovation Council Fund',
      topicBg: 'Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион',
      topicEn: "The European Union's innovation and geoeconomic power in the Black Sea region",
      bioEn: [
        'Svetoslava has extensive experience in finance, both in the public and the private sector.',
        'She is the Chair of the EIC Fund, the VC arm of Europe’s flagship innovation programme supporting breakthrough technologies and innovations with a EUR 10bn budget. She is a Member of the Investment Committee of InvestEU, the European Commission’s programme that aims to mobilise over €372 billion in investments. She was the Bulgarian representative in the Pan-European Guarantee Fund (EGF) managed by the EIB Group and established in the context of the COVID-19 pandemic. She was the executive director of the Fund of Funds in Bulgaria, which manages a portfolio of c. EUR 600 million of debt and equity mandates, where she was responsible for the establishment, fund manager selection and oversight of five VC funds, three debt funds and two risk-sharing mandates for infrastructure and micro finance.',
        'Prior to that, she gained international experience in finance and in European institutions. She worked in banking and equity investments in London, and in the European Commission in Brussels, dealing with EU economic governance and state aid for banks in Greece, Italy, Slovenia, Bulgaria.'
      ],
      bioBg: [
        'Светослава има богат опит във финансите - както в публичния, така и в частния сектор.',
        'Тя е председател на EIC Fund - фонда за рисков капитал към водещата европейска програма за иновации, която подкрепя пробивни технологии и иновации с бюджет от 10 млрд. евро. Член е на Инвестиционния комитет на InvestEU - програмата на Европейската комисия, която цели да мобилизира над 372 млрд. евро инвестиции. Била е представител на България в Паневропейския гаранционен фонд (EGF), управляван от Групата на ЕИБ и създаден в отговор на пандемията от COVID-19. Била е изпълнителен директор на Фонда на фондовете в България, който управлява портфейл от около 600 млн. евро в дългови и капиталови мандати - там отговаря за създаването, избора на фонд мениджъри и надзора на пет фонда за рисков капитал, три дългови фонда и два мандата за споделяне на риска в инфраструктурата и микрофинансирането.',
        'Преди това натрупва международен опит във финансите и в европейските институции. Работи в банковия сектор и в капиталовите инвестиции в Лондон, както и в Европейската комисия в Брюксел, където се занимава с икономическото управление на ЕС и държавната помощ за банки в Гърция, Италия, Словения и България.'
      ]
    },
    {
      id: 'ivo-zimbilev', track: 'regional-innovation-policy',
      img: '/images/speakers/ivo-zimbilev.jpg?v=20260925', alt: 'Ivo Zimbilev',
      objectPosition: 'center top',
      name: 'Иво Зимбилев',
      nameEn: 'Ivo Zimbilev',
      role: 'Chief Executive Officer @ Cloud Office',
      roleBg: 'Изпълнителен директор @ Cloud Office',
      roleEn: 'Chief Executive Officer @ Cloud Office',
      topicBg: 'От стратегия към изпълнение: ефективни политики за дигиталната трансформация на европейските региони',
      topicEn: 'From strategy to delivery: Effective policymaking for digital transformation of Europe’s regions',
      bioEn: [
        'Ivo Zimbilev is an entrepreneur and business leader in cloud technologies. As Co-founder and CEO of Cloud Office, he has scaled the organization into one of the fastest-growing cloud transformation companies in Central and Eastern Europe. Over the past few years the company has successfully completed more than 400 complex cloud transformations, and is the digital innovation partner of more than 800 companies in Europe. Ivo has led Cloud Office’s market expansion into Greece, Cyprus and the United Kingdom, and is the driving force behind Cloud Office’s successful partnerships with global leaders such as Google, Amazon Web Services, JumpCloud, GitLab, and others.'
      ],
      bioBg: [
        'Иво Зимбилев е предприемач и бизнес лидер в областта на облачните технологии. Като съосновател и изпълнителен директор на Cloud Office, той превръща организацията в една от най-бързо развиващите се компании за облачна трансформация в Централна и Източна Европа. През последните пет години Cloud Office успешно завършва над 400 комплексни облачни трансформации и е партньор в дигиталните иновации на над 800 компании в Европа. Иво Зимбилев ръководи пазарното разширяване на Cloud Office в Гърция, Кипър и Обединеното кралство и е движещата сила зад успешните партньорства с глобални лидери като Google, Amazon Web Services, JumpCloud, GitLab и други.'
      ],
      sessionDescBg: 'Иво Зимбилев участва в два панела: „От стратегия към изпълнение: ефективни политики за дигиталната трансформация на европейските региони“ (5 октомври) и „Киберустойчивост в спорните морски региони“ (6 октомври).',
      sessionDescEn: 'Ivo Zimbilev takes part in two panels: "From strategy to delivery: Effective policymaking for digital transformation of Europe’s regions" (5 October) and "Cyber resilience in contested maritime regions" (6 October).'
    },
    {
      id: 'tatyana-ivanova', track: 'regional-innovation-policy',
      img: '/images/speakers/tatyana-ivanova.jpg?v=20260925', alt: 'Tatyana Ivanova',
      objectPosition: 'center top',
      name: 'Татяна Иванова',
      nameEn: 'Tatyana Ivanova',
      role: 'Country Innovation Leader @ KBC Bulgaria | Member of the Management Board @ UBB',
      roleBg: 'Лидер по иновациите за България @ KBC Group | Член на Управителния съвет @ ОББ',
      roleEn: 'Country Innovation Leader @ KBC Bulgaria | Member of the Management Board @ UBB',
      topicBg: 'Ускоряване на черноморската иновационна екосистема: технологичен трансфер и възможности за мащабиране',
      topicEn: 'Supercharging the Black Sea innovation ecosystem: Technology transfer and scale-up opportunities',
      bioEn: [
        'Member of the Country Team of KBC Group for Bulgaria, Member of the Management Board of UBB, Innovation Leader of KBC Group in Bulgaria, Executive Director Digital Channels, Data and Operations of UBB.',
        'Tatyana Ivanova started her career 20 years ago in Société Generale and built since then a broad and international career in various subsidiaries of the Group. She was, amongst others, Retail Director in the Republic of Macedonia, worked several years as Head of Sales promotion in Russia, as Marketing manager in the HQs Paris, as well as Head of Marketing and Digital banking in Société Generale, Bulgaria.',
        'She joined UBB at the beginning of November 2018 as Director of the Retail Banking and Digital Sales Directorate. At the beginning of 2020 she was appointed Management Board Member and Executive Officer Marketing and Distribution – Retail banking. In November 2022 she was elected Executive Director for Digitization, Data and Operations of UBB, and in April 2023 she assumed the role of Innovation Leader of KBC Group in Bulgaria.',
        'Member of the Board of Directors of CSC AD. Tatyana holds an EMBA from HEC Paris.'
      ],
      bioBg: [
        'Член на Country Team на KBC Group за България, член на Управителния съвет на ОББ, лидер по иновациите на KBC Group в България и изпълнителен директор „Дигитални канали, данни и операции“ на ОББ.',
        'Татяна Иванова започва кариерата си преди 20 години в Société Générale и оттогава изгражда широка международна кариера в различни дъщерни дружества на групата. Сред позициите ѝ са директор „Банкиране на дребно“ в Република Македония, няколко години ръководител „Промоция на продажбите“ в Русия, маркетинг мениджър в централата в Париж, както и ръководител „Маркетинг и дигитално банкиране“ в Société Générale Експресбанк, България.',
        'Присъединява се към ОББ в началото на ноември 2018 г. като директор на дирекция „Банкиране на дребно и дигитални продажби“. В началото на 2020 г. е назначена за член на Управителния съвет и изпълнителен директор „Маркетинг и дистрибуция - банкиране на дребно“. През ноември 2022 г. е избрана за изпълнителен директор „Дигитализация, данни и операции“ на ОББ, а през април 2023 г. поема ролята на лидер по иновациите на KBC Group в България.',
        'Член на Съвета на директорите на „Сис Си“ АД (CSC AD). Притежава EMBA от HEC Paris.'
      ]
    },
    {
      id: 'marie-dumoulin', track: 'regional-innovation-policy',
      img: '/images/speakers/marie-dumoulin.jpg?v=20260929', alt: 'Marie Dumoulin',
      objectPosition: 'center top',
      name: 'Marie Dumoulin',
      role: 'Ambassador of France to Bulgaria',
      roleBg: 'Посланик на Франция в България',
      roleEn: 'Ambassador of France to Bulgaria',
      topicBg: 'Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион',
      topicEn: "The European Union's innovation and geoeconomic power in the Black Sea region",
      bioEn: [
        'Marie Dumoulin has been Ambassador of France to Bulgaria since September 2025.',
        'Previous positions: Wider Europe Programme Director, European Council on Foreign Relations (November 2021 – August 2025); Deputy Director for Russia and Eastern Europe, Directorate for Continental Europe (2018–2021); Analyst at the Centre for Strategy, Analysis and Policy Planning, French Ministry for Europe and Foreign Affairs (2016–2018); exchange diplomat seconded to the German Ministry of Foreign Affairs (2015–2016); Political Counsellor at the French Embassy in Berlin (2013–2015); Second Counsellor at the French Embassy in Algiers (2009–2013); Desk Officer, Directorate for Continental Europe (2004–2007).',
        'Education: PhD in Political Science, Paris School of Political Science; degree in Russian language and civilization, INALCO, Paris; postgraduate degree in Comparative Politics with a specialization in “Post-communist Europe”, Paris School of Political Science; Franco-German MSc in Political and Social Sciences, Free University of Berlin; BSc in Political Science, Paris School of Political Science.'
      ],
      bioBg: [
        'Marie Dumoulin е посланик на Франция в България от септември 2025 г.',
        'Предишни позиции: директор на програма „Wider Europe“ в Европейския съвет за външна политика (ноември 2021 – август 2025 г.); заместник-директор за Русия и Източна Европа в дирекция „Континентална Европа“ (2018–2021 г.); анализатор в Центъра за стратегия, анализ и планиране на политиките към Министерството на Европа и външните работи на Франция (2016–2018 г.); дипломат по обмен, командирован в Министерството на външните работи на Германия (2015–2016 г.); политически съветник в посолството на Франция в Берлин (2013–2015 г.); втори съветник в посолството на Франция в Алжир (2009–2013 г.); служител в дирекция „Континентална Европа“ (2004–2007 г.).',
        'Образование: доктор по политически науки, Институт за политически науки в Париж; диплома по руски език и цивилизация, INALCO, Париж; следдипломна степен по сравнителна политология със специализация „Посткомунистическа Европа“, Институт за политически науки в Париж; френско-германска магистърска степен по политически и социални науки, Свободен университет в Берлин; бакалавърска степен по политически науки, Институт за политически науки в Париж.'
      ]
    },
    {
      id: 'anton-todorov', track: 'regional-innovation-policy',
      img: '/images/speakers/anton-todorov.jpg?v=20260929', alt: 'Anton Todorov',
      objectPosition: 'center top',
      name: 'Антон Тодоров',
      nameEn: 'Anton Todorov',
      role: 'Chairman of the Executive Board @ National Innovation Fund',
      roleBg: 'Председател на Изпълнителния съвет @ Национален иновационен фонд',
      roleEn: 'Chairman of the Executive Board @ National Innovation Fund',
      topicBg: 'Възможности за финансиране чрез Националния иновационен фонд',
      topicEn: 'Funding Opportunities via the National Innovation Fund',
      bioBg: [
        'Антон Тодоров е председател на Изпълнителния съвет на Националния иновационен фонд.',
        'Има над 25 години професионален опит в разработването и реализацията на иновативни бизнес проекти за стартиращи и утвърдени предприятия, финансирани чрез частни рискови инвестиции и европейски програми.',
        'Като изпълнителен директор на „Ню Ай“ ЕАД осигурява финансиране за иновативни проекти по национални и централизирани европейски програми, сред които EIC Accelerator, Horizon Europe, LIFE и други. Съосновател е на няколко европейски цифрови иновационни хъба. Управляващ партньор е в първата българска мрежа на бизнес ангели за рисково финансиране на стартиращи предприятия и създател на венчър студио за технологични и информационни компании.'
      ],
      bioEn: [
        'Anton Todorov is Chairman of the Executive Board of the National Innovation Fund.',
        'He has over 25 years of professional experience in developing and delivering innovative business projects for start-ups and established companies, financed through private venture investment and European programmes.',
        'As Executive Director of New-I, he secures funding for innovative projects under national and centrally managed European programmes, including EIC Accelerator, Horizon Europe, LIFE and others. He is a co-founder of several European Digital Innovation Hubs, a managing partner in the first Bulgarian business angels network for venture financing of start-ups, and the creator of a venture studio for technology and information companies.'
      ],
      sessionDescBg: 'Източници за финансиране на иновации и ролята на Националния иновационен фонд като стратегически инструмент на иновационната политика. Текущи и очаквани конкурсни сесии. Стратегически инициативи и очаквания.',
      sessionDescEn: 'Innovation funding and the role of the National Innovation Fund as a strategic innovation policy tool. Current and forthcoming calls for proposals. Strategic initiatives.',
      takeawaysBg: 'Какви са текущите инструменти за финансиране на иновации през актуалните конкурсни сесии на НИФ, през Eurostars и през EIC Accelerator. Какви са приоритетите на НИФ и как можем да се подготвим по-добре като потенциални бенефициенти.',
      takeawaysEn: 'What innovation funding sources exist today, and which are the immediate opportunities under open calls, Eurostars or the EIC Accelerator. What the Fund\'s priorities are and how to be better prepared as a potential beneficiary.'
    },
    {
      id: 'dochka-vasileva', track: 'regional-innovation-policy',
      img: '/images/speakers/dochka-vasileva.jpg?v=20260929', alt: 'Dochka Vasileva',
      objectPosition: 'center top',
      name: 'д-р инж. Дочка Василева',
      nameEn: 'Dr. Eng. Dochka Vasileva',
      role: 'Head of Project Planning and Institutional Cooperation @ Fund of Funds',
      roleBg: 'Ръководител отдел „Проектно планиране и институционално сътрудничество“ @ Фонд на фондовете',
      roleEn: 'Head of Project Planning and Institutional Cooperation @ Fund of Funds',
      topicBg: 'Финансиране, износ, нови пазари и рискови фондове',
      topicEn: 'Financing, Exports, New Markets and Venture Funds',
      bioBg: [
        'Д-р инж. Дочка Василева е ръководител отдел „Проектно планиране и институционално сътрудничество“ във Фонда на фондовете от 8 години. Има професионален опит в европейските политики в Белгия, както и в управлението на проекти в Германия и Великобритания. Тя е лектор в Софийския университет, УАСГ и Института за публична администрация. Подпомага младежкото предприемачество и е организатор на националния конкурс „Най-добър младежки стартъп в България“.'
      ],
      bioEn: [
        'Dr. Eng. Dochka Vasileva has headed the Project Planning and Institutional Cooperation department at the Fund of Funds for 8 years. She has professional experience in European policy in Belgium, as well as in project management in Germany and the United Kingdom. She lectures at Sofia University, the University of Architecture, Civil Engineering and Geodesy (UACEG) and the Institute of Public Administration. She supports youth entrepreneurship and organises the national competition "Best Youth Start-up in Bulgaria".'
      ],
      sessionDescBg: 'Ще бъдат представени финансовите инструменти на Фонда на фондовете, насочени към стартъпи и компании с фокус върху иновации, дигитализация, стратегически технологии и технологичен трансфер.',
      sessionDescEn: 'A presentation of the Fund of Funds\' financial instruments aimed at start-ups and companies focused on innovation, digitalisation, strategic technologies and technology transfer.',
      takeawaysBg: 'Участниците във форума ще се запознаят с възможностите за финансиране на иновативни технологии в България.',
      takeawaysEn: 'Participants will learn about the opportunities for financing innovative technologies in Bulgaria.'
    },
    {
      id: 'philip-balkanski', track: 'regional-innovation-policy',
      img: '/images/speakers/philip-balkanski.jpg?v=20260930', alt: 'Philip Balkanski',
      objectPosition: 'center top',
      name: 'Филип Балкански',
      nameEn: 'Philip Balkanski',
      role: 'Chief Executive Officer @ Codery',
      roleBg: 'Изпълнителен директор @ Codery',
      roleEn: 'Chief Executive Officer @ Codery',
      topicBg: 'Дигитална и AI трансформация за индустриален растеж: сигурни европейски вериги за доставки',
      topicEn: 'Digital & AI Transformation for Industrial Growth: Secure European Supply Chains',
      bioBg: [
        'Филип Балкански има над 17 години ръководен опит във финансовия и технологичния сектор на Обединеното кралство. Започва кариерата си в сливания и придобивания (нефт и газ) в J.P. Morgan, където изгражда строга аналитична рамка за оценка на сложни активи и работа със сложни корпоративни структури с висок залог.',
        'След прехода си от финансите към технологиите основава Printt - потребителски технологичен стартъп, който достига над 2 милиона клиенти. Като изпълнителен директор той води компанията през етапи на бързо мащабиране, промени в посоката за постигане на product-market fit и в крайна сметка до успешен екзит чрез придобиване от голяма американска корпорация.',
        'Днес, като изпълнителен директор на Codery, той съчетава дисциплината на инвестиционното банкиране с гъвкавостта на стартъпите, за да помага на големи компании да разширяват инженерния си капацитет. Фокусът му е стратегическият растеж и това екипите „Talent Pods“ на Codery да носят измерима възвръщаемост за партньорите.'
      ],
      bioEn: [
        'Philip Balkanski brings over 17 years of leadership experience in the UK\'s financial and technology sectors. Beginning his career in Mergers & Acquisitions (Oil & Gas) at J.P. Morgan, Philip developed a rigorous analytical framework for valuing complex assets and navigating high-stakes corporate structures.',
        'Transitioning from finance to technology, Philip founded Printt, a consumer-tech startup that grew to serve over 2 million customers. As CEO, he steered the company through rapid scaling phases, product-market fit pivots, and ultimately a successful exit to a major US corporation.',
        'Today, as CEO of Codery, Philip leverages this unique blend of investment banking discipline and startup agility to help enterprise clients scale their engineering capabilities. He focuses on strategic growth, ensuring Codery\'s "Talent Pods" deliver measurable ROI for partners.'
      ],
      sessionDescBg: 'Панелна дискусия - „Дигитална и AI трансформация за индустриален растеж: сигурни европейски вериги за доставки“ (5 октомври, 16:10 - 16:40) - с участието на Jeroen van Hertum, член на УС на Нидерландско-българската търговска камара, Peter Statev, председател на Петаскейл суперкомпютър „Дискавъри“, и Филип Балкански, изпълнителен директор на Codery. Модератор: Георги Добрев, анализатор, Фондация „Приложни изследвания и комуникации“.',
      sessionDescEn: 'Panel discussion - "Digital & AI Transformation for Industrial Growth: Secure European Supply Chains" (5 October, 16:10 - 16:40) - with Jeroen van Hertum, Board Member, Dutch Bulgarian Chamber of Commerce, Peter Statev, Chairman, PetaScale Supercomputer "Discoverer", and Philip Balkanski, Chief Executive Officer, Codery. Moderated by Georgi Dobrev, Analyst, Applied Research and Communications Fund.'
    },

    // ── AgriTech ──
    {
      id: 'ilia-iordanov', track: 'agritech',
      img: '/images/speakers/ilia-iordanov.jpg?v=20260821', alt: 'Ilia Iordanov',
      objectPosition: 'center 8%',
      name: 'Илия Йорданов',
      nameEn: 'Ilia Iordanov',
      role: 'Co-founder @ ONDO',
      topicBg: 'Технологии в земеделието - внедряване на AI',
      topicEn: 'Technology in agriculture - implementing AI',
      bioEn: [
        'Ilia Iordanov is co-founder of ONDO - a Bulgarian technology company for irrigation, fertigation and climate control automation. He works towards more efficient and sustainable agriculture through innovative solutions deployed in more than 8 countries across Europe and Africa.'
      ],
      bioBg: [
        'Илия Йорданов е съосновател на ONDO – българска технологична компания за автоматизация на напояването, торенето и климатичния контрол. Работи за по-ефективно и устойчиво земеделие чрез иновативни решения, внедрени в над 8 държави в Европа и Африка.'
      ],
      sessionDescBg: 'Как изкуственият интелект и автоматизацията променят съвременното земеделие – от събирането и анализа на данни до прецизното управление на напояването, торенето и климата. Темата представя практическия опит на ONDO и ползите за по-ефективно, устойчиво и рентабилно производство.',
      sessionDescEn: "How artificial intelligence and automation are transforming modern agriculture - from data collection and analysis to precision management of irrigation, fertigation and climate. The talk presents ONDO's practical experience and the benefits for more efficient, sustainable and profitable production.",
      takeawaysBg: 'Как AI и автоматизацията подпомагат решенията за напояване, торене и климатичен контрол. Практически стъпки за внедряване на нови технологии в реално земеделско стопанство. Как технологиите намаляват разходите и използваните ресурси и повишават добивите.',
      takeawaysEn: 'How AI and automation support decisions on irrigation, fertigation and climate control. Practical steps for implementing new technologies on a real farm. How technology reduces costs and resource use while increasing yields.'
    },

    // ── Future of Transport ──
    {
      id: 'hristo-hristov', track: 'transport',
      img: '/images/speakers/hristo-hristov.jpg?v=20260827', alt: 'Hristo Hristov',
      objectPosition: 'center top',
      name: 'Христо Христов',
      nameEn: 'Hristo Hristov',
      role: 'Commercial and Operational Manager @ TopMobility',
      roleBg: 'Търговски и оперативен мениджър @ TopMobility',
      roleEn: 'Commercial and Operational Manager @ TopMobility',
      topicBg: 'Бъдещето на мобилността: от притежанието към достъпа',
      topicEn: 'The Future of Mobility: From Ownership to Access',
      bioBg: [
        'Христо Христов е търговски и оперативен мениджър в TopMobility с над 7 години опит във велосипедния сектор и микромобилността. Отговаря за търговското развитие, стратегическите партньорства, дигиталната услуга и изграждането на устойчив модел за градска мобилност в България.'
      ],
      bioEn: [
        'Hristo Hristov is Commercial and Operational Manager at TopMobility with over 7 years of experience in the bicycle sector and micromobility. He oversees commercial development, strategic partnerships, digital services, and the building of a sustainable urban mobility model in Bulgaria.'
      ],
      sessionDescBg: 'Темата разглежда как се променя начинът, по който хората възприемат и използват транспорта. Все по-често фокусът се измества от притежанието на конкретно превозно средство към достъпа до различни форми на мобилност според нуждите. Ще бъдат засегнати ролята на технологиите, споделените модели, устойчивото придвижване и променящите се потребителски навици. Темата поставя въпроса как ще изглежда мобилността в бъдеще и дали достъпът постепенно ще се превърне в по-важен от собствеността.',
      sessionDescEn: 'The talk explores how the way people perceive and use transport is changing. Increasingly, the focus is shifting from owning a specific vehicle to accessing various forms of mobility based on needs. The role of technology, shared models, sustainable mobility, and changing consumer habits will be addressed. The session raises the question of what mobility will look like in the future and whether access will gradually become more important than ownership.',
      takeawaysBg: 'Аудиторията ще получи по-ясна представа за това как и защо се променят моделите на мобилност и какво стои зад прехода от притежание към достъп. Ще разгледаме как технологиите, устойчивостта и новите потребителски навици влияят върху избора ни на транспорт. Участниците ще научат за предимствата на различните модели на придвижване и ще могат да преценят кога притежанието е необходимо и как достъпът до мобилността може да бъде по-гъвкав и ефективен избор.',
      takeawaysEn: 'Attendees will gain a clearer understanding of how and why mobility models are changing and what drives the transition from ownership to access. We will explore how technology, sustainability, and new consumer habits influence our transport choices. Participants will learn about the advantages of different mobility models and be able to assess when ownership is necessary and how access to mobility can be a more flexible and effective choice.'
    }
  ];

  global.BSTF_TRACKS = TRACKS;
  global.BSTF_SPEAKERS = SPEAKERS;

  global.bstfGetTrack = function (id) {
    for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i];
    return null;
  };
  global.bstfGetSpeaker = function (id) {
    for (var i = 0; i < SPEAKERS.length; i++) if (SPEAKERS[i].id === id) return SPEAKERS[i];
    return null;
  };
  global.bstfSpeakersByTrack = function (trackId) {
    return SPEAKERS.filter(function (s) { return s.track === trackId; });
  };
})(window);
