// Edit this file to update stand data. Reload the browser to see changes.

const _li = (t) => `<li><span class="pb-check">&#x2713;</span>${t}</li>`;
const _ul = (...items) => `<ul class="popup-benefits">${items.map(_li).join('')}</ul>`;

const DESC_STAGE  = _ul('Брандиране на основната сцена', 'Именуване на сцена', 'Брандиране във VIP зала', 'Брандиран панел / фирмена сесия', '5 мин. слот', '1 ULTRA VIP + 2 VIP + 4 Full Event');
const DESC_GOLD   = _ul('Premium щанд', 'Панелно участие', 'Startup / Recruitment сцена', 'Лого в програма и материали', '1 VIP + 4 Full Event билети');
const DESC_SILVER = _ul('Expo щанд', 'Startup / Recruitment сцена', 'Лого в сайта и материали', '1 VIP + 3 Full Event билети');
const DESC_EXPO   = _ul('Expo щанд (3×3 м)', 'Лого в сайта на събитието', 'Matchmaking апликация', '1 Full Event билет');

window.STANDS_DATA = {
  exhibitors: {
    6:  { company: 'Top-Rent-A-Car', logo: 'Logos/toprentacar.webp', status: 'partner',  website: '', description: '' },
    12: { company: 'Девиа България', logo: 'Logos/deviaLogoBG.png',  status: 'occupied', website: '', description: '' }
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
