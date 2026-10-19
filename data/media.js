/* Media coverage, one entry per forum edition (key = year).
 *
 * Source: the organizers' sheet "BlackSeaTech - статии" (tabs "Статии след
 * форума" -> after, "Статии преди събитие" -> before). The sheet only has
 * outlet + link; title and date were taken from each article itself.
 *
 * Rules (from the organizers, 2026-10-19):
 *  - article + the Facebook post that shares it -> list the article only
 *  - a stand-alone Facebook interview/video/report is its own item
 *  - rows marked "чакаме" (no live link yet) are left out until they have one
 *  - order is newest first; shared/media.js sorts by `date`, so entries can be
 *    appended in any order. `date` may carry a time to order same-day items.
 *  - type: 'article' -> "Прочети", 'video' -> "Гледай"
 *  - titles stay in the original language on both the BG and the EN page.
 */
window.CONNEXUS_MEDIA = {
  2026: {
    featured: {
      media: 'Bloomberg TV Bulgaria',
      site: 'https://www.bloombergtv.bg/',
      title: 'Технологичното бъдеще на Варна: Между синята икономика и иновациите',
      date: '2026-10-15T10:15',
      url: 'https://www.bloombergtv.bg/a/16-biznes-start/165487-tehnologichnoto-badeshte-na-varna-mezhdu-sinyata-ikonomika-i-inovatsiite',
      video: 'videos/media-2026-bloombergtv-stamenov.mp4?v=20261019',
      poster: 'images/media/2026-bloombergtv-stamenov.jpg?v=20261019'
    },
    after: [
      { media: 'bloombergtv.bg', type: 'video', date: '2026-10-15T10:15', title: 'Технологичното бъдеще на Варна: Между синята икономика и иновациите', url: 'https://www.bloombergtv.bg/a/16-biznes-start/165487-tehnologichnoto-badeshte-na-varna-mezhdu-sinyata-ikonomika-i-inovatsiite' },
      { media: 'manager.bg', type: 'article', date: '2026-10-14T17:25', title: 'CONNEXUS 2026 във Варна събра бизнеса, науката и институциите около изкуствения интелект и технологиите', url: 'https://manager.bg/%D0%BF%D1%80-%D0%B8-%D1%81%D1%8A%D0%B1%D0%B8%D1%82%D0%B8%D1%8F/connexus-2026-vav-varna-sabra-biznesa-naukata-i-instituciite-okolo-izkustvenia-intelekt-i-tehnologiite' },
      { media: 'faktor.bg', type: 'article', date: '2026-10-14T14:53', title: 'Варна беше домакин на CONNEXUS 2026 - форум за технологиите на Черноморския регион', url: 'https://faktor.bg/varna-beshe-domakin-na-connexus-2026-forum-za-tehnologiite-na-chernomorskiq-region' },
      { media: 'sinor.bg', type: 'article', date: '2026-10-14T09:31', title: 'AI, роботика и умно земеделие: какво показа CONNEXUS 2026 във Варна', url: 'https://sinor.bg/79283-AI-robotika-i-umno-zemedelie-kakvo-pokaza-CONNEXUS-2026-vav-varna' },
      { media: 'budnavarna.com', type: 'article', date: '2026-10-14T09:16', title: 'Варна беше сцена на технологиите: CONNEXUS „Черноморски технологичен форум Варна“ 2026 приключи', url: 'https://www.budnavarna.com/2026/10/14/varna-beshe-sczena-na-tehnologiite-connexus-chernomorski-tehnologichen-forum-varna-2026-priklyuchi/' },
      { media: 'lider.bg', type: 'article', date: '2026-10-14T06:26', title: 'CONNEXUS 2026: бизнесът, науката и институциите се срещнаха във Варна около технологиите', url: 'https://lider.bg/connexus-2026-biznesat-naukata-i-institucziite-se-sresthnaha-vav-varna-okolo-tehnologiite/' },
      { media: 'lifeonline.bg', type: 'article', date: '2026-10-13T16:04', title: 'Три дни технологии във Варна: CONNEXUS 2026 събра бизнеса, науката и институциите', url: 'https://lifeonline.bg/bg/tehnologii-varna-connexus-2026-biznesa-naukata-institucii' },
      { media: 'liderite.com', type: 'article', date: '2026-10-13T16:28', title: 'CONNEXUS 2026: бизнес лидери, учени и институции около технологиите на Черноморския регион', url: 'https://liderite.com/connexus-2026-biznes-lideri-ucheni-i-instituczii-okolo-tehnologiite-na-chernomorskiya-region/' },
      { media: 'poligraff.net', type: 'article', date: '2026-10-13T16:29', title: 'Технологичен форум във Варна събра бизнеса, науката и институциите около технологиите на региона', url: 'https://poligraff.net/news/texnologicen-forum-vv-varna-sbra-biznesa-naukata-i-instituciite-okolo-texnologiite-na-regiona/102618' },
      { media: 'zovnews.com', type: 'article', date: '2026-10-13T15:57', title: 'Международен технологичен форум във Варна събра бизнеса, науката и институциите', url: 'https://zovnews.com/%d0%b1%d1%8a%d0%bb%d0%b3%d0%b0%d1%80%d0%b8%d1%8f/%d0%bc%d0%b5%d0%b6%d0%b4%d1%83%d0%bd%d0%b0%d1%80%d0%be%d0%b4%d0%b5%d0%bd-%d1%82%d0%b5%d1%85%d0%bd%d0%be%d0%bb%d0%be%d0%b3%d0%b8%d1%87%d0%b5%d0%bd-%d1%84%d0%be%d1%80%d1%83%d0%bc-%d0%b2%d1%8a%d0%b2/' },
      { media: 'trud.bg', type: 'article', date: '2026-10-13T15:02', title: 'CONNEXUS 2026 във Варна: бизнес, наука и институции в разговор за технологиите', url: 'https://trud.bg/a/articles/connexus-2026-vav-varna-biznes-nauka-i-institutsii-v-razgovor-za-tehnologiite' },
      { media: 'standartnews.com', type: 'article', date: '2026-10-13T15:01', title: 'CONNEXUS 2026 във Варна обедини бизнеса, науката и институциите', url: 'https://www.standartnews.com/biznes/connexus-2026-vav-varna-obedini-biznesa-naukata-i-instituciite-649894.html' },
      { media: 'spisanie8.bg', platform: 'Facebook', type: 'article', date: '2026-10-13T16:57', title: 'Три дни във Варна: CONNEXUS 2026 свърза бизнеса, науката и институциите', url: 'https://www.facebook.com/Spisanie8/posts/1516605520498031/' },
      { media: 'varnanews.net', type: 'article', date: '2026-10-13T15:42', title: 'CONNEXUS 2026 приключи във Варна: бизнес, наука и институции около технологиите на региона', url: 'https://varnanews.net/2026/10/13/connexus-2026-priklyuchi-vav-varna-biznes-nauka-i-institutsii-okolo-tehnologiite-na-regiona' },
      { media: 'fakti.bg', type: 'article', date: '2026-10-13T12:48', title: 'CONNEXUS 2026 събра във Варна бизнеса, науката и институциите около технологиите на Черноморския регион', url: 'https://fakti.bg/technozone/1089637-connexus-2026-sabra-vav-varna-biznesa-naukata-i-instituciite-okolo-tehnologiite-na-chernomorskia-region' },
      { media: 'entrepreneur.bg', type: 'article', date: '2026-10-13T12:24', title: 'CONNEXUS 2026 във Варна: среща на бизнеса, науката и институциите около технологиите на региона', url: 'https://www.entrepreneur.bg/19637/connexus-2026-%d0%b2%d1%8a%d0%b2-%d0%b2%d0%b0%d1%80%d0%bd%d0%b0-%d1%81%d1%80%d0%b5%d1%89%d0%b0-%d0%bd%d0%b0-%d0%b1%d0%b8%d0%b7%d0%bd%d0%b5%d1%81%d0%b0-%d0%bd%d0%b0%d1%83%d0%ba%d0%b0%d1%82%d0%b0/' },
      { media: 'offnews.bg', type: 'article', date: '2026-10-13T12:16', title: '„Черноморски технологичен форум Варна“ 2026 събра във Варна бизнеса, науката и институциите', url: 'https://offnews.bg/obshtestvo/chernomorski-tehnologichen-forum-varna-2026-sabra-vav-varna-biznes-876354.html' },
      { media: 'mignews.info', type: 'article', date: '2026-10-13T12:16', title: 'CONNEXUS 2026: Варна събра бизнеса, науката и институциите около технологиите на Черноморския регион', url: 'https://www.mignews.info/connexus-2026-varna-sabra-biznesa-naukata-i-institutsiite-okolo-tehnologiite-na-chernomorskiya-region/' },
      { media: 'glasove.com', type: 'article', date: '2026-10-13T12:05', title: 'Бизнесът, науката и институциите се събраха във Варна на CONNEXUS „Черноморски технологичен форум Варна“ 2026', url: 'https://glasove.com/tehnologii/biznesat-naukata-i-institutsiite-se-sabraha-vav-varna-na-connexus-chernomorski-tehnologichen-forum-varna-2026' },
      { media: 'novinite.bg', type: 'article', date: '2026-10-13T11:56', title: 'Форумът CONNEXUS 2026 събра във Варна бизнеса, науката и институциите', url: 'https://www.novinite.bg/articles/291581/Forumat-CONNEXUS-202-sabra-vav-Varna-biznesa-naukata-i-instituciite' },
      { media: 'agro.bg', type: 'article', date: '2026-10-13T11:48', title: 'CONNEXUS 2026 във Варна: изкуствен интелект, автоматизация и умно земеделие в центъра на форума', url: 'https://agro.bg/novini/investitsii/connexus-2026-vav-varna-izkustven-intelekt-avtomatizatsiya-i-umno-zemedelie-v-tsentara-na-foruma/' },
      { media: 'novavarna.net', type: 'article', date: '2026-10-13T11:35', title: 'Варна приключи три дни технологичен разговор: CONNEXUS „Черноморски технологичен форум Варна“ 2026', url: 'https://novavarna.net/2026/10/13/%d0%b2%d0%b0%d1%80%d0%bd%d0%b0-%d0%bf%d1%80%d0%b8%d0%ba%d0%bb%d1%8e%d1%87%d0%b8-%d1%82%d1%80%d0%b8-%d0%b4%d0%bd%d0%b8-%d1%82%d0%b5%d1%85%d0%bd%d0%be%d0%bb%d0%be%d0%b3%d0%b8%d1%87%d0%b5%d0%bd-%d1%80/' },
      { media: 'novinata.bg', type: 'article', date: '2026-10-13T11:55', title: 'Варна събра технологични лидери от цял свят на CONNEXUS 2026: Изкуствен интелект, иновации и бъдещето на бизнеса', url: 'https://novinata.bg/biznes/varna-sabra-tehnologichni-lideri-ot-cql-svqt-na-connexus-2026-izkustven-intelekt-inovacii-i-badestheto-na-biznesa/' },
      { media: 'agrotv.bg', type: 'article', date: '2026-10-13T12:31', title: 'Умно земеделие, AI и автоматизация на CONNEXUS 2026 във Варна', url: 'https://agrotv.bg/2026/10/13/%d1%83%d0%bc%d0%bd%d0%be-%d0%b7%d0%b5%d0%bc%d0%b5%d0%b4%d0%b5%d0%bb%d0%b8%d0%b5-ai-%d0%b8-%d0%b0%d0%b2%d1%82%d0%be%d0%bc%d0%b0%d1%82%d0%b8%d0%b7%d0%b0%d1%86%d0%b8%d1%8f-%d0%bd%d0%b0-connexus-2026/' },
      { media: 'varnautre.bg', type: 'article', date: '2026-10-13', title: 'Варна събра бизнеса, науката и институциите на CONNEXUS „Черноморски технологичен форум Варна“ 2026', url: 'https://varnautre.bg/2026/10/13/653602-varna_subra_biznesa_naukata_i_institutsiite_na_connexus_chernomorski_tehnologichen_forum_varna_2026' },
      { media: 'vnews.bg', type: 'article', date: '2026-10-13', title: 'CONNEXUS 2026 във Варна: три дни среща между бизнес, наука и институции', url: 'https://vnews.bg/news/245004' },
      { media: 'stroitelbg.bg', type: 'article', date: '2026-10-13', title: 'Умни градове и дигитална трансформация на CONNEXUS 2026 във Варна', url: 'https://zhilishtno.stroitelbg.bg/na-fokus/umni-gradove-i-digitalna-transformatsiya-na-connexus-2026-vav-varna/' }
    ],
    before: [
      { media: 'sinor.bg', type: 'article', date: '2026-09-15T15:54', title: 'CONNEXUS 2026: приносът на AI и автоматизация за земеделските производители', url: 'https://sinor.bg/78939-CONNEXUS-2026-prinosat-na-AI-i-avtomatizaciya-za-zemedelskite-proizvoditeli' },
      { media: 'budnavarna.com', type: 'article', date: '2026-09-15T15:42', title: 'От 5 до 7 октомври: Варна е в центъра на черноморските технологии', url: 'https://www.budnavarna.com/2026/09/15/ot-5-do-7-oktomvri-varna-e-v-czentara-na-chernomorskite-tehnologii/' },
      { media: 'entrepreneur.bg', type: 'article', date: '2026-09-15T11:57', title: 'За стартиращи предприемачи: CONNEXUS 2026 – Черноморски технологичен форум във Варна през месец октомври', url: 'https://www.entrepreneur.bg/19450/%d0%b7%d0%b0-%d1%81%d1%82%d0%b0%d1%80%d1%82%d0%b8%d1%80%d0%b0%d1%89%d0%b8-%d0%bf%d1%80%d0%b5%d0%b4%d0%bf%d1%80%d0%b8%d0%b5%d0%bc%d0%b0%d1%87%d0%b8-connexus-2026-%d1%87%d0%b5%d1%80%d0%bd%d0%be%d0%bc/' },
      { media: 'faktor.bg', type: 'article', date: '2026-09-15T11:18', title: 'CONNEXUS 2026: технологиченият форум с международно участие, който ще се проведе през октомври във Варна', url: 'https://faktor.bg/connexus-2026-tehnologicheniqt-forum-s-mejdunarodno-uchastie-koyto-shte-se-provede-prez-oktomvri-vav-varna' },
      { media: 'glasove.com', type: 'article', date: '2026-09-15T10:33', title: 'От 5 до 7 октомври: международен технологичен форум събира лидери във Варна', url: 'https://glasove.com/tehnologii/ot-5-do-7-oktomvri-mezhdunaroden-tehnologichen-forum-sabira-lideri-vav-varna' },
      { media: 'novavarna.net', type: 'article', date: '2026-09-15T10:22', title: 'CONNEXUS 2026: три дни, в които Варна е в центъра на технологичния свят', url: 'https://novavarna.net/2026/09/15/connexus-2026-%d1%82%d1%80%d0%b8-%d0%b4%d0%bd%d0%b8-%d0%b2-%d0%ba%d0%be%d0%b8%d1%82%d0%be-%d0%b2%d0%b0%d1%80%d0%bd%d0%b0-%d0%b5-%d0%b2-%d1%86%d0%b5%d0%bd%d1%82%d1%8a%d1%80%d0%b0-%d0%bd%d0%b0-%d1%82/' },
      { media: 'vnews.bg', type: 'article', date: '2026-09-15', title: 'Варна се готви да приеме международен технологичен форум от най-висок ранг', url: 'https://vnews.bg/news/243989' },
      { media: 'agrotv.bg', type: 'article', date: '2026-09-14T18:28', title: 'CONNEXUS 2026: черноморски технологичен форум с акцент върху умното земеделие', url: 'https://agrotv.bg/2026/09/14/connexus-2026-%d1%87%d0%b5%d1%80%d0%bd%d0%be%d0%bc%d0%be%d1%80%d1%81%d0%ba%d0%b8-%d1%82%d0%b5%d1%85%d0%bd%d0%be%d0%bb%d0%be%d0%b3%d0%b8%d1%87%d0%b5%d0%bd-%d1%84%d0%be%d1%80%d1%83%d0%bc-%d1%81-%d0%b0/' },
      { media: 'agro.bg', type: 'article', date: '2026-09-14T18:03', title: 'Изкуствен интелект и умно земеделие: темите на технологичния форум CONNEXUS 2026', url: 'https://agro.bg/novini/rastenievadstvo-38/izkustven-intelekt-i-umno-zemedelie-temite-na-tehnologichniya-forum-connexus-2026/' },
      { media: 'standartnews.com', type: 'article', date: '2026-09-14T17:58', title: 'CONNEXUS 2026 събира технологичния свят във Варна през октомври', url: 'https://www.standartnews.com/tekhnologii/connexus-2026-sabira-tehnologichniya-svyat-vav-varna-prez-oktomvri-646932.html' },
      { media: 'varnanews.net', type: 'article', date: '2026-09-14T17:45', title: 'CONNEXUS 2026: Варна отваря врати за технологичния свят на 5 октомври', url: 'https://varnanews.net/2026/09/14/connexus-2026-varna-otvarya-vrati-za-tehnologichniya-svyat-na-5-oktomvri' },
      { media: 'fakti.bg', type: 'article', date: '2026-09-14T17:38', title: 'Варна се превръща в сцена за следващата технологична вълна в Черноморския регион', url: 'https://fakti.bg/technozone/1080914-varna-se-prevrashta-v-scena-za-sledvashtata-tehnologichna-valna-v-chernomorskia-region' },
      { media: 'poligraff.net', type: 'article', date: '2026-09-14T17:29', title: 'Варна ще бъде домакин на международен технологичен форум през октомври', url: 'https://poligraff.net/news/varna-shhe-bde-domakin-na-mezdunaroden-texnologicen-forum-prez-oktomvri/102105' },
      { media: 'moreto.net', type: 'article', date: '2026-09-14T17:18', title: '„Черно море“ посреща лидери на технологиите: CONNEXUS идва във Варна', url: 'https://www.moreto.net/novini.php?n=535393' },
      { media: 'mignews.info', type: 'article', date: '2026-09-14T17:16', title: 'CONNEXUS 2026: международен форум за технологии и иновации във Варна', url: 'https://www.mignews.info/connexus-2026-mezhdunaroden-forum-za-tehnologii-i-inovatsii-vav-varna/' },
      { media: 'briag.bg', type: 'article', date: '2026-09-14T17:09', title: 'Варна с международен технологичен форум CONNEXUS 2026', url: 'https://www.briag.bg/varna-s-mejdunaroden-tehnologichen-forum-connexus-2026' },
      { media: 'offnews.bg', type: 'article', date: '2026-09-14T17:05', title: 'Технологичният свят поглежда към Варна с международен форум през октомври', url: 'https://offnews.bg/tehnologii/tehnologichniat-sviat-poglezhda-kam-varna-s-mezhdunaroden-forum-prez-o-874648.html' },
      { media: 'lider.bg', type: 'article', date: '2026-09-14T16:56', title: 'Инвестиции, иновации и нови пазари: какво предлага CONNEXUS 2026 на бизнеса', url: 'https://lider.bg/investiczii-inovaczii-i-novi-pazari-kakvo-predlaga-connexus-2026-na-biznesa/' },
      { media: 'novinite.bg', type: 'article', date: '2026-09-14T16:26', title: 'Варна ще бъде домакин на международен технологичен форум CONNEXUS 2026', url: 'https://www.novinite.bg/articles/290371/Varna-shte-bade-domakin-na-mejdunaroden-tehnologichen-forum-CONNEXUS-202-' },
      { media: 'varnautre.bg', type: 'article', date: '2026-09-14', title: 'Варна - домакин на най-мащабния технологичен форум в Черноморския регион', url: 'https://varnautre.bg/2026/09/14/653084-varna_domakin_na_nay_mashtabnia_tehnologichen_forum_v_chernomorskia_region' },
      { media: 'stroitelbg.bg', type: 'article', date: '2026-09-14', title: 'Умни градове и дигитална инфраструктура: строителният ъгъл на CONNEXUS 2026', url: 'https://infrastruktura.stroitelbg.bg/na-fokus/umni-gradove-i-digitalna-infrastruktura-stroitelniyat-agal-na-connexus-2026/' }
    ]
  }
};

/* Outlet logos for the list, keyed by the `media` value (lower-case).
 * Each is the outlet's own site icon (apple-touch-icon / favicon), fetched
 * once and self-hosted as a 96x96 PNG in images/media/logos/ (2026-10-19).
 * Where the favicon is weak, a sharper mark of the same outlet is used (its
 * Facebook page picture or header logo). An outlet missing here shows its
 * first letter instead. New outlet = add its PNG + a line here. */
window.CONNEXUS_MEDIA_LOGOS = {
  'agro.bg': 'images/media/logos/agro-bg.png?v=20261019',
  'agrotv.bg': 'images/media/logos/agrotv-bg.png?v=20261019-1',
  'bloombergtv.bg': 'images/media/logos/bloombergtv-bg.png?v=20261019-1',
  'briag.bg': 'images/media/logos/briag-bg.png?v=20261019-1',
  'budnavarna.com': 'images/media/logos/budnavarna-com.png?v=20261019',
  'entrepreneur.bg': 'images/media/logos/entrepreneur-bg.png?v=20261019',
  'fakti.bg': 'images/media/logos/fakti-bg.png?v=20261019-1',
  'faktor.bg': 'images/media/logos/faktor-bg.png?v=20261019',
  'glasove.com': 'images/media/logos/glasove-com.png?v=20261019-2',
  'lider.bg': 'images/media/logos/lider-bg.png?v=20261019-1',
  'liderite.com': 'images/media/logos/liderite-com.png?v=20261019',
  'lifeonline.bg': 'images/media/logos/lifeonline-bg.png?v=20261019-1',
  'manager.bg': 'images/media/logos/manager-bg.png?v=20261019',
  'mignews.info': 'images/media/logos/mignews-info.png?v=20261019',
  'moreto.net': 'images/media/logos/moreto-net.png?v=20261019-1',
  'novavarna.net': 'images/media/logos/novavarna-net.png?v=20261019',
  'novinata.bg': 'images/media/logos/novinata-bg.png?v=20261019',
  'novinite.bg': 'images/media/logos/novinite-bg.png?v=20261019',
  'offnews.bg': 'images/media/logos/offnews-bg.png?v=20261019',
  'poligraff.net': 'images/media/logos/poligraff-net.png?v=20261019',
  'sinor.bg': 'images/media/logos/sinor-bg.png?v=20261019-1',
  'spisanie8.bg': 'images/media/logos/spisanie8-bg.png?v=20261019',
  'standartnews.com': 'images/media/logos/standartnews-com.png?v=20261019-1',
  'stroitelbg.bg': 'images/media/logos/stroitelbg-bg.png?v=20261019',
  'trud.bg': 'images/media/logos/trud-bg.png?v=20261019',
  'varnanews.net': 'images/media/logos/varnanews-net.png?v=20261019',
  'varnautre.bg': 'images/media/logos/varnautre-bg.png?v=20261019-1',
  'vnews.bg': 'images/media/logos/vnews-bg.png?v=20261019',
  'zovnews.com': 'images/media/logos/zovnews-com.png?v=20261019-1'
};
