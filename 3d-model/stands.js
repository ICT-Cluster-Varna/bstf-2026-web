// Edit this file to update stand data. Reload the browser to see changes.

const _li = (t) => `<li><span class="pb-check">&#x2713;</span>${t}</li>`;
const _ul = (...items) => `<ul class="popup-benefits">${items.map(_li).join('')}</ul>`;

// Popup benefit lists — Tier-1 (visitor-facing) bilingual text. window.LANG is
// set by the tiny inline script in floorplan3d_v2.html (from the ?lang= param
// the parent page passes into the iframe src) before this file loads.
const _EN = window.LANG === 'en';

const DESC_STAGE  = _EN
  ? _ul('Main stage branding', 'Stage naming', 'VIP hall branding', 'Branded panel / company session', '5-minute slot', '1 ULTRA VIP + 2 VIP + 4 Full Event')
  : _ul('Брандиране на основната сцена', 'Именуване на сцена', 'Брандиране във VIP зала', 'Брандиран панел / фирмена сесия', '5 мин. слот', '1 ULTRA VIP + 2 VIP + 4 Full Event');
const DESC_GOLD   = _EN
  ? _ul('Premium booth', 'Panel participation', 'Startup / Recruitment stage', 'Logo in program & materials', '1 VIP + 4 Full Event tickets')
  : _ul('Premium щанд', 'Панелно участие', 'Startup / Recruitment сцена', 'Лого в програма и материали', '1 VIP + 4 Full Event билети');
const DESC_SILVER = _EN
  ? _ul('Expo booth', 'Startup / Recruitment stage', 'Logo on website & materials', '1 VIP + 3 Full Event tickets')
  : _ul('Expo щанд', 'Startup / Recruitment сцена', 'Лого в сайта и материали', '1 VIP + 3 Full Event билети');
const DESC_EXPO   = _EN
  ? _ul('Expo booth (3×3 m)', 'Logo on event website', 'Matchmaking app', '1 Full Event ticket')
  : _ul('Expo щанд (3×3 м)', 'Лого в сайта на събитието', 'Matchmaking апликация', '1 Full Event билет');

window.STANDS_DATA = {
  exhibitors: {
    2:  { company: _EN ? 'Reserved for Gold Partner package' : 'Резервиран за пакет Gold Partner',   logo: '',                                    status: 'reserved', website: '', description: '' },
    4:  { company: _EN ? 'Reserved for Silver Partner package' : 'Резервиран за пакет Silver Partner', logo: '',                                    status: 'reserved', website: '', description: '' },
    6:  { company: 'Top-Rent-A-Car',                     logo: 'Logos/toprentacar.png',               status: 'partner',  website: '', description: '' },
    7:  { company: 'ResearchMetrics',                    logo: 'Logos/ResearchMetrics.png',           status: 'occupied', website: '', description: '' },
    8:  { company: 'ITRM Consult',                       logo: 'Logos/ITR Management Consult.png',    status: 'occupied', website: '', description: '' },
    12: { company: 'Netpeak & PR Market',                logo: 'Logos/Netpeak_logo.svg',              status: 'occupied', website: '', description: '' },
    13: { company: 'Electrohold',                        logo: 'Logos/ElectroHold_Logo_Sales.svg',    status: 'occupied', website: '', description: '' },
    11: { company: 'Omnilinx',                           logo: 'Logos/omnilinx.svg',                  status: 'occupied', website: 'https://omnilinx.com/en/', description: '' }
  },
  stand_info: {
    1:  { tier: 'Stage Partner',  tierHex: '#8064A2', description: DESC_STAGE,  price: 18000, premium: true  },
    2:  { tier: 'Gold Partner',   tierHex: '#BF9000', description: DESC_GOLD,   price: 12000, premium: true  },
    3:  { tier: 'Gold Partner',   tierHex: '#BF9000', description: DESC_GOLD,   price: 12000, premium: true  },
    4:  { tier: 'Silver Partner', tierHex: '#7F7F7F', description: DESC_SILVER, price: 7500,  premium: false },
    5:  { tier: 'Silver Partner', tierHex: '#7F7F7F', description: DESC_SILVER, price: 7500,  premium: false },
    6:  { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    7:  { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    8:  { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    9:  { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    10: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    11: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    12: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    13: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    14: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    15: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    16: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    17: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    18: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    19: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    20: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    21: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    22: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    23: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    24: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    25: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    26: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    27: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    28: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    29: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    30: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    31: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    32: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    33: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    34: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false },
    35: { tier: 'Expo',           tierHex: '#548235', description: DESC_EXPO,   price: 1700,  premium: false }
  }
};
