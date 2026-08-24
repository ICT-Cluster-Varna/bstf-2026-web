/*
 * BSTF 2026 - single source of truth for speaker & track data.
 * Consumed by speakers.html (listing) and speaker.html (detail page).
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
      id: 'stanislav-simeonov', track: 'cybersecurity',
      img: '/images/speakers/stanislav-simeonov.jpg?v=20260730', alt: 'Stanislav Simeonov',
      objectPosition: 'center 15%',
      name: 'Станислав Симеонов',
      nameEn: 'Stanislav Simeonov',
      role: 'Product Manager, Cloud, IT Services & Cybersecurity @ Neterra',
      topicBg: 'Киберсигурност (съвместна лекция с Александър Минчев)',
      topicEn: 'Cybersecurity (joint talk with Alexander Minchev)',
      bioEn: [
        'Stanislav Simeonov is a Product Manager for "Cloud, IT Services, and Cybersecurity" at Neterra. His previous experience as a Cloud Infrastructure Engineer and Cloud Specialist, focused on AWS services, helps him turn complex data protection and cloud environment requirements into easy-to-implement, scalable products for Neterra customers.',
        'He holds a master\'s degree in engineering with specializations in "Cyber Investigation" and "Communication Networks," which makes him a skilled analyst of cyber incidents beyond the firewalls.'
      ],
      bioBg: [
        'Станислав Симеонов е Product Manager за „Cloud, IT Services and Cybersecurity“ в Нетера. Предишният му опит като Cloud Infrastructure Engineer и Cloud Specialist, фокусиран върху AWS услуги, му помага да превръща сложните изисквания за защита на данните и облачна инфраструктура в лесни за внедряване, мащабируеми продукти за клиентите на Нетера.',
        'Той притежава магистърска степен по инженерство със специализации „Разследване на кибер престъпления“ (Cyber Investigation) и „Комуникационни мрежи“, което го прави опитен анализатор на кибер инциденти отвъд защитните стени.'
      ]
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
        'At CONNEXUS 2026, Ambassador Lambert joins the panel "The European Union\'s innovation attraction power in the Black Sea region", together with Michael Roux, Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.'
      ],
      bioBg: [
        'Пол Ламбърт съчетава над 25 години дипломатически опит. Най-скоро, от лятото на 2020 г. до лятото на 2024 г., като заместник генерален директор „ИКТ“, г-н Ламбърт ръководи отдела по киберсигурност в белгийското Министерство на външните работи. Той работи за високо ниво на приемане от потребителите на широкообхватни мерки за киберсигурност с цел постигане на трайни промени (масово внедряване на съвременни крайни устройства, въвеждане на платформа срещу фишинг, DLP схема, извеждане от употреба на политиката „донеси своето устройство“ (BYOD)) и подкрепя пилотен проект за използване на AI за по-лесен достъп до официални данни.',
        'През предходния си мандат, от 2016 до 2020 г., г-н Ламбърт е бил генерален консул на Белгия в Шанхай, където допринася за успеха на голяма търговска мисия, довела до нови търговски начинания в областта на спорта, по-специално във футбола.',
        'На CONNEXUS 2026 посланик Ламбърт се присъединява към панела „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“, заедно с Michael Roux, посланик за Източното партньорство и Черноморския регион в Министерството на Европа и външните работи на Франция. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
      ],
      sessionDescEn: 'Panel discussion - "The European Union\'s innovation attraction power in the Black Sea region" - with Michael Roux, Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France, and Paul Lambert, Ambassador of Belgium to Bulgaria. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.',
      sessionDescBg: 'Панелна дискусия - „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“ - с участието на Michael Roux, посланик за Източното партньорство и Черноморския регион в Министерството на Европа и външните работи на Франция, и Пол Ламбърт, посланик на Белгия в България. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
    },
    {
      id: 'michael-roux', track: 'regional-innovation-policy',
      img: '/images/speakers/michael-roux.jpg?v=20260824', alt: 'Michaël Roux',
      objectPosition: 'center 12%',
      name: 'Michaël Roux',
      role: 'Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France',
      topicBg: 'Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион',
      topicEn: "The European Union's innovation and geoeconomic power in the Black Sea region",
      bioEn: [
        'Michaël Roux, born in 1966, is a career French diplomat and a graduate of the National School of Statistics and Economic Administration (France). Before joining the French Ministry for Europe and Foreign Affairs in 2002, he worked as a consultant, notably for the European Commission and the World Bank, on projects including the pre-accession of Bulgaria and Romania and various TACIS programmes across Europe, Africa and Asia.',
        'As a career diplomat since 2002, he served as desk officer for the directorate for Africa and the Indian Ocean in Paris, Deputy Head of Mission in Mauritius (2005-2008) and in Ukraine (2008-2012), and Deputy Director for Southern Africa and the Indian Ocean (2012-2016). He was Ambassador of France to the Kyrgyz Republic (2016-2020) and to the Republic of Liberia (2020-2023), and has served as Ambassador for the Eastern Partnership and the Black Sea since 2023.',
        'At CONNEXUS 2026, Ambassador Roux joins the panel "The European Union\'s innovation attraction power in the Black Sea region", together with Paul Lambert, Ambassador of the Kingdom of Belgium to the Republic of Bulgaria. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.'
      ],
      bioBg: [
        'Michaël Roux, роден през 1966 г., е кариерен френски дипломат и завършва Националното училище по статистика и икономическа администрация на Франция. Преди да се присъедини към френското Министерство на Европа и външните работи през 2002 г., той работи като консултант, включително за Европейската комисия и Световната банка, по проекти, свързани с предприсъединяването на България и Румъния, както и различни програми TACIS в Европа, Африка и Азия.',
        'Като кариерен дипломат от 2002 г. насам, той е служител в дирекция „Африка и Индийски океан“ в Париж, заместник-ръководител на мисията в Мавриций (2005-2008 г.) и в Украйна (2008-2012 г.), както и заместник-директор за Южна Африка и Индийски океан (2012-2016 г.). Бил е посланик на Франция в Киргизката република (2016-2020 г.) и в Република Либерия (2020-2023 г.), а от 2023 г. е посланик за Източното партньорство и Черноморския регион.',
        'На CONNEXUS 2026 посланик Roux се присъединява към панела „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“, заедно с Пол Ламбърт, посланик на Кралство Белгия в Република България. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
      ],
      sessionDescEn: 'Panel discussion - "The European Union\'s innovation attraction power in the Black Sea region" - with Michael Roux, Ambassador for the Eastern Partnership and the Black Sea, Ministry for Europe and Foreign Affairs of France, and Paul Lambert, Ambassador of Belgium to Bulgaria. Moderated by Emil Tsankov, Chairman of the Board, ICT Cluster Varna.',
      sessionDescBg: 'Панелна дискусия - „Иновационната и геоикономическа мощ на Европейския съюз в Черноморския регион“ - с участието на Michael Roux, посланик за Източното партньорство и Черноморския регион в Министерството на Европа и външните работи на Франция, и Пол Ламбърт, посланик на Белгия в България. Модератор: Емил Цанков, председател на Управителния съвет на ICT Cluster Varna.'
    },
    {
      id: 'lars-frolund', track: 'regional-innovation-policy',
      img: '/images/speakers/lars-frolund.jpg?v=20260824', alt: 'Dr. Lars Frølund',
      objectPosition: 'center 15%',
      name: 'Dr. Lars Frølund',
      role: 'Lecturer @ MIT | Strategic Advisor @ NATO Innovation Fund',
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
