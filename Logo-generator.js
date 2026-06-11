/**
 * Usemee Logo Generator — v2
 * 6 professional SVG logo styles, 20 industry-specific icons
 * 100% client-side — works on GitHub Pages
 */

const LOGO_CONFIGS = {
    clothing:    { colors: ['#1a1a2e','#e94560'], accent: '#fff', icon: 'tshirt',    label: 'Clothing & Fashion' },
    fashion:     { colors: ['#2d132c','#ee4540'], accent: '#fff', icon: 'tshirt',    label: 'Fashion' },
    apparel:     { colors: ['#1b262c','#0f3460'], accent: '#fff', icon: 'tshirt',    label: 'Apparel' },
    food:        { colors: ['#d62828','#f77f00'], accent: '#fff', icon: 'fork',      label: 'Food & Beverage' },
    restaurant:  { colors: ['#c1121f','#e63946'], accent: '#fff', icon: 'fork',      label: 'Restaurant' },
    cafe:        { colors: ['#4a235a','#7b2d8b'], accent: '#fff', icon: 'coffee',    label: 'Café' },
    coffee:      { colors: ['#3b1f0e','#7b4226'], accent: '#fff', icon: 'coffee',    label: 'Coffee' },
    tech:        { colors: ['#0052cc','#0099ff'], accent: '#fff', icon: 'chip',      label: 'Technology' },
    technology:  { colors: ['#0d1117','#1f6feb'], accent: '#fff', icon: 'chip',      label: 'Technology' },
    software:    { colors: ['#141414','#6f42c1'], accent: '#fff', icon: 'chip',      label: 'Software' },
    saas:        { colors: ['#0033a0','#0066ff'], accent: '#fff', icon: 'chip',      label: 'SaaS' },
    app:         { colors: ['#007aff','#5ac8fa'], accent: '#fff', icon: 'rocket',    label: 'App' },
    startup:     { colors: ['#6f42c1','#fd7e14'], accent: '#fff', icon: 'rocket',    label: 'Startup' },
    health:      { colors: ['#00897b','#43a047'], accent: '#fff', icon: 'cross',     label: 'Healthcare' },
    medical:     { colors: ['#1565c0','#0288d1'], accent: '#fff', icon: 'cross',     label: 'Medical' },
    pharmacy:    { colors: ['#2e7d32','#43a047'], accent: '#fff', icon: 'cross',     label: 'Pharmacy' },
    fitness:     { colors: ['#b71c1c','#ef5350'], accent: '#fff', icon: 'dumbbell',  label: 'Fitness' },
    gym:         { colors: ['#37474f','#e53935'], accent: '#fff', icon: 'dumbbell',  label: 'Gym' },
    sport:       { colors: ['#1a237e','#e53935'], accent: '#fff', icon: 'dumbbell',  label: 'Sports' },
    beauty:      { colors: ['#880e4f','#e91e63'], accent: '#fff', icon: 'diamond',   label: 'Beauty' },
    salon:       { colors: ['#4a148c','#9c27b0'], accent: '#fff', icon: 'scissors',  label: 'Salon' },
    barber:      { colors: ['#1a237e','#c62828'], accent: '#fff', icon: 'scissors',  label: 'Barber' },
    spa:         { colors: ['#1b5e20','#66bb6a'], accent: '#fff', icon: 'leaf',      label: 'Spa & Wellness' },
    finance:     { colors: ['#1a237e','#283593'], accent: '#fff', icon: 'building',  label: 'Finance' },
    banking:     { colors: ['#0d47a1','#1565c0'], accent: '#fff', icon: 'building',  label: 'Banking' },
    accounting:  { colors: ['#263238','#37474f'], accent: '#fff', icon: 'building',  label: 'Accounting' },
    consulting:  { colors: ['#1a237e','#0d47a1'], accent: '#fff', icon: 'scale',     label: 'Consulting' },
    education:   { colors: ['#4527a0','#7b1fa2'], accent: '#fff', icon: 'gradcap',   label: 'Education' },
    school:      { colors: ['#1a237e','#283593'], accent: '#fff', icon: 'gradcap',   label: 'School' },
    training:    { colors: ['#01579b','#0277bd'], accent: '#fff', icon: 'pencil',    label: 'Training' },
    real_estate: { colors: ['#1b5e20','#2e7d32'], accent: '#fff', icon: 'house',     label: 'Real Estate' },
    property:    { colors: ['#004d40','#00695c'], accent: '#fff', icon: 'house',     label: 'Property' },
    travel:      { colors: ['#01579b','#039be5'], accent: '#fff', icon: 'plane',     label: 'Travel' },
    tourism:     { colors: ['#e65100','#f57c00'], accent: '#fff', icon: 'globe',     label: 'Tourism' },
    marketing:   { colors: ['#bf360c','#e64a19'], accent: '#fff', icon: 'megaphone', label: 'Marketing' },
    advertising: { colors: ['#4a148c','#6a1b9a'], accent: '#fff', icon: 'megaphone', label: 'Advertising' },
    retail:      { colors: ['#6a1b9a','#8e24aa'], accent: '#fff', icon: 'bag',       label: 'Retail' },
    ecommerce:   { colors: ['#e65100','#ff6d00'], accent: '#fff', icon: 'bag',       label: 'E-commerce' },
    shop:        { colors: ['#4527a0','#512da8'], accent: '#fff', icon: 'bag',       label: 'Shop' },
    legal:       { colors: ['#263238','#37474f'], accent: '#fff', icon: 'scale',     label: 'Legal' },
    law:         { colors: ['#1a237e','#283593'], accent: '#fff', icon: 'scale',     label: 'Law' },
    agriculture: { colors: ['#1b5e20','#388e3c'], accent: '#fff', icon: 'leaf',      label: 'Agriculture' },
    farm:        { colors: ['#33691e','#558b2f'], accent: '#fff', icon: 'leaf',      label: 'Farm' },
    organic:     { colors: ['#2e7d32','#43a047'], accent: '#fff', icon: 'leaf',      label: 'Organic' },
    automotive:  { colors: ['#212121','#e53935'], accent: '#fff', icon: 'wheel',     label: 'Automotive' },
    auto:        { colors: ['#263238','#37474f'], accent: '#fff', icon: 'wheel',     label: 'Auto' },
    luxury:      { colors: ['#212121','#c9a84c'], accent: '#c9a84c', icon: 'crown',  label: 'Luxury' },
    premium:     { colors: ['#1a1a1a','#b8860b'], accent: '#c9a84c', icon: 'crown',  label: 'Premium' },
    photography: { colors: ['#1a1a2e','#6f42c1'], accent: '#fff', icon: 'camera',   label: 'Photography' },
    creative:    { colors: ['#6f42c1','#fd7e14'], accent: '#fff', icon: 'pencil',    label: 'Creative' },
    design:      { colors: ['#e91e63','#ff5722'], accent: '#fff', icon: 'pencil',    label: 'Design' },
    global:      { colors: ['#1565c0','#0288d1'], accent: '#fff', icon: 'globe',     label: 'Global' },
    security:    { colors: ['#263238','#37474f'], accent: '#fff', icon: 'shield',    label: 'Security' },
    general:     { colors: ['#1565c0','#0288d1'], accent: '#fff', icon: 'star',      label: 'Business' }
};

function getLogoConfig(industry) {
    const il = (industry || 'general').toLowerCase().trim();
    for (const [key, cfg] of Object.entries(LOGO_CONFIGS)) {
        if (il.includes(key) || key.includes(il)) return { ...cfg, key };
    }
    return { ...LOGO_CONFIGS.general, key: 'general' };
}

// ── SVG Icon Library (100×100 viewBox) ────────────────────────────────────────
const ICONS = {
    tshirt: (c) => `
        <path d="M16,26 L2,50 L22,58 L22,90 L78,90 L78,58 L98,50 L84,26
            C70,40 58,45 50,44 C42,43 30,39 16,26 Z" fill="${c}"/>
        <path d="M30,26 Q40,34 50,33 Q60,34 70,26" stroke="rgba(255,255,255,0.25)" stroke-width="2.5" fill="none"/>`,

    fork: (c) => `
        <line x1="33" y1="14" x2="33" y2="86" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
        <line x1="20" y1="14" x2="20" y2="44" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
        <line x1="46" y1="14" x2="46" y2="44" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
        <path d="M20,44 Q20,56 33,56 Q46,56 46,44" stroke="${c}" stroke-width="6" fill="none"/>
        <line x1="67" y1="14" x2="67" y2="86" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
        <path d="M67,14 Q84,28 84,48 L67,55" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`,

    coffee: (c) => `
        <path d="M20,42 L30,90 L70,90 L80,42 Z" fill="${c}"/>
        <path d="M74,54 Q92,54 92,68 Q92,82 74,82" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M36,30 Q32,18 40,13 Q48,8 44,22" stroke="${c}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
        <path d="M56,30 Q52,18 60,13 Q68,8 64,22" stroke="${c}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`,

    chip: (c) => `
        <rect x="22" y="22" width="56" height="56" rx="7" fill="${c}"/>
        <rect x="31" y="31" width="38" height="38" rx="4" fill="rgba(0,0,0,0.28)"/>
        <circle cx="50" cy="50" r="10" fill="rgba(255,255,255,0.9)"/>
        <rect x="6" y="33" width="16" height="6" rx="3" fill="${c}"/>
        <rect x="6" y="47" width="16" height="6" rx="3" fill="${c}"/>
        <rect x="6" y="61" width="16" height="6" rx="3" fill="${c}"/>
        <rect x="78" y="33" width="16" height="6" rx="3" fill="${c}"/>
        <rect x="78" y="47" width="16" height="6" rx="3" fill="${c}"/>
        <rect x="78" y="61" width="16" height="6" rx="3" fill="${c}"/>
        <rect x="33" y="6" width="6" height="16" rx="3" fill="${c}"/>
        <rect x="47" y="6" width="6" height="16" rx="3" fill="${c}"/>
        <rect x="61" y="6" width="6" height="16" rx="3" fill="${c}"/>
        <rect x="33" y="78" width="6" height="16" rx="3" fill="${c}"/>
        <rect x="47" y="78" width="6" height="16" rx="3" fill="${c}"/>
        <rect x="61" y="78" width="6" height="16" rx="3" fill="${c}"/>`,

    cross: (c) => `
        <path d="M35,10 L35,35 L10,35 L10,65 L35,65 L35,90 L65,90 L65,65 L90,65 L90,35 L65,35 L65,10 Z" fill="${c}"/>`,

    dumbbell: (c) => `
        <rect x="14" y="43" width="72" height="14" rx="6" fill="${c}"/>
        <rect x="5" y="30" width="25" height="40" rx="10" fill="${c}"/>
        <rect x="70" y="30" width="25" height="40" rx="10" fill="${c}"/>`,

    scissors: (c) => `
        <circle cx="28" cy="72" r="14" fill="none" stroke="${c}" stroke-width="8"/>
        <circle cx="72" cy="72" r="14" fill="none" stroke="${c}" stroke-width="8"/>
        <line x1="40" y1="62" x2="58" y2="42" stroke="${c}" stroke-width="8" stroke-linecap="round"/>
        <line x1="60" y1="62" x2="42" y2="42" stroke="${c}" stroke-width="8" stroke-linecap="round"/>
        <line x1="50" y1="28" x2="50" y2="10" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,

    building: (c) => `
        <rect x="10" y="86" width="80" height="8" rx="3" fill="${c}"/>
        <rect x="10" y="10" width="80" height="15" rx="3" fill="${c}"/>
        <rect x="16" y="25" width="14" height="61" fill="${c}"/>
        <rect x="35" y="25" width="14" height="61" fill="${c}"/>
        <rect x="54" y="25" width="14" height="61" fill="${c}"/>
        <rect x="72" y="25" width="14" height="61" fill="${c}"/>`,

    gradcap: (c) => `
        <polygon points="50,12 92,38 50,64 8,38" fill="${c}"/>
        <path d="M50,64 Q50,82 70,88 Q50,94 30,88 Q50,82 50,64" fill="${c}"/>
        <line x1="92" y1="38" x2="92" y2="66" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
        <circle cx="92" cy="72" r="7" fill="${c}"/>`,

    house: (c) => `
        <path d="M50,10 L90,48 L76,48 L76,90 L24,90 L24,48 L10,48 Z" fill="${c}"/>
        <rect x="39" y="62" width="22" height="28" rx="3" fill="rgba(0,0,0,0.22)"/>`,

    plane: (c) => `
        <path d="M50,8 L94,62 L70,56 L64,84 L50,76 L36,84 L30,56 L6,62 Z" fill="${c}"/>
        <rect x="29" y="68" width="42" height="9" rx="4" fill="${c}" opacity="0.65"/>`,

    megaphone: (c) => `
        <path d="M10,38 L10,62 L36,62 L82,84 L82,16 L36,38 Z" fill="${c}"/>
        <path d="M90,34 Q100,52 90,70" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <rect x="10" y="62" width="16" height="22" rx="5" fill="${c}" opacity="0.65"/>`,

    bag: (c) => `
        <path d="M18,40 L12,88 L88,88 L82,40 Z" fill="${c}"/>
        <path d="M34,40 Q34,14 50,14 Q66,14 66,40" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>
        <rect x="36" y="56" width="8" height="8" rx="4" fill="rgba(255,255,255,0.55)"/>
        <rect x="56" y="56" width="8" height="8" rx="4" fill="rgba(255,255,255,0.55)"/>`,

    scale: (c) => `
        <line x1="50" y1="12" x2="50" y2="88" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
        <line x1="12" y1="34" x2="88" y2="34" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
        <path d="M12,34 L2,66 L34,66 Z" fill="${c}"/>
        <path d="M88,34 L66,66 L98,66 Z" fill="${c}"/>
        <rect x="31" y="82" width="38" height="7" rx="3" fill="${c}"/>`,

    leaf: (c) => `
        <path d="M50,88 Q12,62 16,26 Q28,4 62,12 Q88,20 84,54 Q74,78 50,88 Z" fill="${c}"/>
        <line x1="50" y1="88" x2="50" y2="36" stroke="rgba(0,0,0,0.25)" stroke-width="5" stroke-linecap="round"/>`,

    wheel: (c) => `
        <circle cx="50" cy="50" r="42" stroke="${c}" stroke-width="9" fill="none"/>
        <circle cx="50" cy="50" r="13" stroke="${c}" stroke-width="7" fill="none"/>
        <line x1="50" y1="37" x2="50" y2="21" stroke="${c}" stroke-width="6.5" stroke-linecap="round"/>
        <line x1="37" y1="43" x2="24" y2="36" stroke="${c}" stroke-width="6.5" stroke-linecap="round"/>
        <line x1="63" y1="43" x2="76" y2="36" stroke="${c}" stroke-width="6.5" stroke-linecap="round"/>`,

    star: (c) => `
        <polygon points="50,8 61,36 92,36 68,56 76,84 50,66 24,84 32,56 8,36 39,36" fill="${c}"/>`,

    rocket: (c) => `
        <path d="M50,8 C50,8 72,20 72,52 L72,68 L50,78 L28,68 L28,52 C28,20 50,8 50,8 Z" fill="${c}"/>
        <ellipse cx="50" cy="52" rx="10" ry="12" fill="rgba(255,255,255,0.85)"/>
        <path d="M28,62 L12,80 L28,76 Z" fill="${c}" opacity="0.75"/>
        <path d="M72,62 L88,80 L72,76 Z" fill="${c}" opacity="0.75"/>
        <ellipse cx="50" cy="72" rx="8" ry="5" fill="rgba(255,200,0,0.8)"/>`,

    diamond: (c) => `
        <polygon points="50,10 88,42 50,92 12,42" fill="${c}"/>
        <polygon points="50,10 88,42 50,42 12,42" fill="rgba(255,255,255,0.2)"/>
        <line x1="12" y1="42" x2="88" y2="42" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>`,

    pencil: (c) => `
        <rect x="42" y="12" width="16" height="68" rx="4" fill="${c}" transform="rotate(-15 50 50)"/>
        <polygon points="36,76 64,76 50,96" fill="${c}" transform="rotate(-15 50 50)"/>
        <rect x="42" y="12" width="16" height="12" rx="4" fill="rgba(255,255,255,0.5)" transform="rotate(-15 50 50)"/>`,

    globe: (c) => `
        <circle cx="50" cy="50" r="40" stroke="${c}" stroke-width="7" fill="none"/>
        <ellipse cx="50" cy="50" rx="20" ry="40" stroke="${c}" stroke-width="5" fill="none"/>
        <line x1="10" y1="50" x2="90" y2="50" stroke="${c}" stroke-width="5"/>
        <path d="M14,30 Q50,38 86,30" stroke="${c}" stroke-width="4" fill="none"/>
        <path d="M14,70 Q50,62 86,70" stroke="${c}" stroke-width="4" fill="none"/>`,

    shield: (c) => `
        <path d="M50,10 L88,28 L88,54 Q88,76 50,92 Q12,76 12,54 L12,28 Z" fill="${c}"/>
        <path d="M50,22 L78,36 L78,54 Q78,70 50,82 Q22,70 22,54 L22,36 Z" fill="rgba(255,255,255,0.15)"/>`,

    crown: (c) => `
        <path d="M6,80 L18,40 L38,62 L50,20 L62,62 L82,40 L94,80 Z" fill="${c}"/>
        <rect x="6" y="80" width="88" height="12" rx="5" fill="${c}"/>
        <circle cx="18" cy="40" r="7" fill="rgba(255,255,255,0.7)"/>
        <circle cx="50" cy="20" r="7" fill="rgba(255,255,255,0.7)"/>
        <circle cx="82" cy="40" r="7" fill="rgba(255,255,255,0.7)"/>`,

    camera: (c) => `
        <rect x="8" y="30" width="84" height="58" rx="10" fill="${c}"/>
        <circle cx="50" cy="58" r="20" fill="rgba(0,0,0,0.3)"/>
        <circle cx="50" cy="58" r="13" fill="rgba(255,255,255,0.85)"/>
        <circle cx="50" cy="58" r="6" fill="${c}"/>
        <rect x="30" y="16" width="22" height="14" rx="5" fill="${c}"/>
        <circle cx="74" cy="40" r="4" fill="rgba(255,255,255,0.5)"/>`
};

function getIcon(type, color) {
    const fn = ICONS[type] || ICONS.star;
    return fn(color);
}

// ── LOGO STYLE 1 — Circle Badge (Spotify / Duolingo style) ────────────────
function svgCircleBadge(name, config, uid) {
    const short = name.length > 13 ? name.substring(0, 13) + '…' : name;
    const icon = getIcon(config.icon, 'rgba(255,255,255,0.93)');
    const fs = short.length > 10 ? 16 : short.length > 7 ? 20 : 24;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 270" width="220" height="270">
  <defs>
    <linearGradient id="g${uid}a" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.colors[0]}"/>
      <stop offset="100%" stop-color="${config.colors[1]}"/>
    </linearGradient>
    <filter id="sh${uid}a"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.18"/></filter>
  </defs>
  <circle cx="110" cy="108" r="100" fill="url(#g${uid}a)" filter="url(#sh${uid}a)"/>
  <circle cx="110" cy="108" r="100" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2.5"/>
  <g transform="translate(57,54) scale(1.06)" opacity="0.95">${icon}</g>
  <text x="110" y="234" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="${fs}" font-weight="800" fill="${config.colors[0]}" letter-spacing="1">${short.toUpperCase()}</text>
  <text x="110" y="255" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="10.5" fill="#999" letter-spacing="1.5">${config.label.toUpperCase()}</text>
</svg>`;
}

// ── LOGO STYLE 2 — Horizontal Pill (Talabat / Uber Eats style) ────────────
function svgHorizontalPill(name, config, uid) {
    const disp = name.length > 15 ? name.substring(0, 15) : name;
    const icon = getIcon(config.icon, 'rgba(255,255,255,0.96)');
    const fs = disp.length > 11 ? 28 : disp.length > 8 ? 34 : 40;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 116" width="420" height="116">
  <defs>
    <linearGradient id="g${uid}b" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${config.colors[0]}"/>
      <stop offset="100%" stop-color="${config.colors[1]}"/>
    </linearGradient>
    <filter id="sh${uid}b"><feDropShadow dx="0" dy="3" stdDeviation="8" flood-opacity="0.2"/></filter>
  </defs>
  <rect x="0" y="0" width="420" height="116" rx="58" fill="url(#g${uid}b)" filter="url(#sh${uid}b)"/>
  <circle cx="60" cy="58" r="38" fill="rgba(255,255,255,0.14)"/>
  <g transform="translate(18,9) scale(0.49)" opacity="0.96">${icon}</g>
  <text x="240" y="50" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="${fs}" font-weight="900" fill="white" letter-spacing="0.5">${disp}</text>
  <text x="240" y="77" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="13.5" fill="rgba(255,255,255,0.72)" letter-spacing="2.5">${config.label.toUpperCase()}</text>
</svg>`;
}

// ── LOGO STYLE 3 — Icon + Wordmark (Amazon / Nike style) ──────────────────
function svgIconWordmark(name, config, uid) {
    const disp = name.length > 14 ? name.substring(0, 14) : name;
    const icon = getIcon(config.icon, 'white');
    const fs = disp.length > 11 ? 22 : disp.length > 8 ? 27 : 32;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 210" width="310" height="210">
  <defs>
    <linearGradient id="g${uid}c" x1="0%" y1="0%" x2="120%" y2="120%">
      <stop offset="0%" stop-color="${config.colors[0]}"/>
      <stop offset="100%" stop-color="${config.colors[1]}"/>
    </linearGradient>
    <filter id="sh${uid}c"><feDropShadow dx="0" dy="3" stdDeviation="8" flood-opacity="0.12"/></filter>
  </defs>
  <rect x="0" y="0" width="310" height="210" rx="20" fill="#fafafa" filter="url(#sh${uid}c)"/>
  <rect x="0" y="0" width="310" height="210" rx="20" fill="none" stroke="#ebebeb" stroke-width="1.5"/>
  <circle cx="155" cy="86" r="62" fill="url(#g${uid}c)"/>
  <g transform="translate(102,33) scale(1.06)" opacity="0.96">${icon}</g>
  <text x="155" y="165" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="${fs}" font-weight="800" fill="${config.colors[0]}">${disp}</text>
  <text x="155" y="188" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="10.5" fill="#aaa" letter-spacing="2.5">${config.label.toUpperCase()}</text>
</svg>`;
}

// ── LOGO STYLE 4 — Letter Badge / App Icon (Google Maps / WhatsApp style) ──
function svgLetterBadge(name, config, uid) {
    const initial = name.charAt(0).toUpperCase();
    const short = name.length > 11 ? name.substring(0, 11) : name;
    const icon = getIcon(config.icon, 'rgba(255,255,255,0.45)');
    const fs = short.length > 9 ? 15 : short.length > 6 ? 19 : 22;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 270" width="220" height="270">
  <defs>
    <linearGradient id="g${uid}d" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.colors[0]}"/>
      <stop offset="100%" stop-color="${config.colors[1]}"/>
    </linearGradient>
    <filter id="sh${uid}d"><feDropShadow dx="0" dy="4" stdDeviation="9" flood-opacity="0.16"/></filter>
  </defs>
  <rect x="10" y="10" width="200" height="200" rx="46" fill="url(#g${uid}d)" filter="url(#sh${uid}d)"/>
  <rect x="10" y="10" width="200" height="200" rx="46" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
  <g transform="translate(58,20) scale(0.44)" opacity="0.38">${icon}</g>
  <text x="110" y="162" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="100" font-weight="900" fill="white" opacity="0.96">${initial}</text>
  <text x="110" y="232" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="${fs}" font-weight="700" fill="${config.colors[0]}">${short.toUpperCase()}</text>
  <text x="110" y="252" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="10.5" fill="#999" letter-spacing="1.5">${config.label}</text>
</svg>`;
}

// ── LOGO STYLE 5 — Hexagon Badge (Discord / Steam style) ──────────────────
function svgHexBadge(name, config, uid) {
    const short = name.length > 11 ? name.substring(0, 11) + '…' : name;
    const icon = getIcon(config.icon, 'rgba(255,255,255,0.95)');
    const fs = short.length > 9 ? 15 : short.length > 7 ? 18 : 22;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 270" width="220" height="270">
  <defs>
    <linearGradient id="g${uid}e" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.colors[0]}"/>
      <stop offset="100%" stop-color="${config.colors[1]}"/>
    </linearGradient>
    <filter id="sh${uid}e"><feDropShadow dx="0" dy="5" stdDeviation="10" flood-opacity="0.18"/></filter>
  </defs>
  <polygon points="110,8 204,58 204,158 110,208 16,158 16,58" fill="url(#g${uid}e)" filter="url(#sh${uid}e)"/>
  <polygon points="110,22 192,68 192,148 110,194 28,148 28,68" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <g transform="translate(57,54) scale(1.06)" opacity="0.95">${icon}</g>
  <text x="110" y="236" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="${fs}" font-weight="800" fill="${config.colors[0]}">${short.toUpperCase()}</text>
  <text x="110" y="256" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="10.5" fill="#999" letter-spacing="1.5">${config.label}</text>
</svg>`;
}

// ── LOGO STYLE 6 — Gradient Card / Split (Stripe / Linear style) ──────────
function svgGradientCard(name, config, uid) {
    const disp = name.length > 14 ? name.substring(0, 14) : name;
    const icon = getIcon(config.icon, 'rgba(255,255,255,0.95)');
    const fs = disp.length > 11 ? 22 : disp.length > 8 ? 27 : 33;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 210" width="310" height="210">
  <defs>
    <linearGradient id="g${uid}f" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${config.colors[0]}"/>
      <stop offset="100%" stop-color="${config.colors[1]}"/>
    </linearGradient>
    <filter id="sh${uid}f"><feDropShadow dx="0" dy="5" stdDeviation="12" flood-opacity="0.22"/></filter>
  </defs>
  <rect x="0" y="0" width="310" height="210" rx="20" fill="url(#g${uid}f)" filter="url(#sh${uid}f)"/>
  <circle cx="260" cy="170" r="90" fill="rgba(255,255,255,0.07)"/>
  <circle cx="50" cy="40" r="60" fill="rgba(255,255,255,0.06)"/>
  <g transform="translate(20,20) scale(0.85)" opacity="0.92">${icon}</g>
  <text x="186" y="95" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="${fs}" font-weight="900" fill="white">${disp}</text>
  <text x="186" y="123" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="13" fill="rgba(255,255,255,0.7)" letter-spacing="2">${config.label.toUpperCase()}</text>
  <rect x="20" y="155" width="270" height="1.5" fill="rgba(255,255,255,0.15)"/>
  <text x="186" y="180" text-anchor="middle" font-family="'Segoe UI',system-ui,Arial,sans-serif" font-size="11" fill="rgba(255,255,255,0.55)" letter-spacing="1">${name.toLowerCase()}.com</text>
</svg>`;
}

// ── Main display function ─────────────────────────────────────────────────
function displayLogoCard(businessName, industry) {
    const chat = document.getElementById('chat-box');
    if (!chat) return;

    const config = getLogoConfig(industry);
    const uid = Date.now();
    const name = (businessName && businessName !== 'Your Brand') ? businessName : (industry ? industry.charAt(0).toUpperCase() + industry.slice(1) + 'Co' : 'YourBrand');

    const logos = [
        { title: 'Circle Badge', subtitle: 'Spotify · Duolingo', fn: svgCircleBadge },
        { title: 'Horizontal Pill', subtitle: 'Talabat · Uber Eats', fn: svgHorizontalPill },
        { title: 'Icon + Wordmark', subtitle: 'Amazon · Nike', fn: svgIconWordmark },
        { title: 'Letter Badge', subtitle: 'WhatsApp · Google Maps', fn: svgLetterBadge },
        { title: 'Hex Badge', subtitle: 'Discord · Steam', fn: svgHexBadge },
        { title: 'Gradient Card', subtitle: 'Stripe · Linear', fn: svgGradientCard }
    ];

    const wrap = document.createElement('div');
    wrap.className = 'message bot';
    wrap.style.cssText = 'max-width:99%;width:99%;padding:0;background:none;float:left;margin-right:auto;margin-bottom:8px;';

    const logoCards = logos.map((logo, i) => {
        const svg = logo.fn(name, config, uid + i + 1);
        const svgB64 = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        const isWide = i === 1 || i === 5;
        return `
        <div style="background:#fff;border-radius:14px;border:1.5px solid #e9ecef;padding:14px 12px;display:flex;flex-direction:column;align-items:center;gap:8px;transition:box-shadow 0.2s,transform 0.15s;${isWide ? 'grid-column:1/-1;' : ''}"
             onmouseover="this.style.boxShadow='0 6px 24px rgba(0,0,0,0.13)';this.style.transform='translateY(-2px)'"
             onmouseout="this.style.boxShadow='none';this.style.transform=''">
            <div style="font-size:11.5px;font-weight:700;color:#343a40;letter-spacing:0.5px;">${logo.title}</div>
            <div style="font-size:10px;color:#adb5bd;margin-top:-4px;">${logo.subtitle}</div>
            <div style="display:flex;justify-content:center;align-items:center;min-height:90px;width:100%;overflow:hidden;">${svg}</div>
            <a href="${svgB64}" download="${name.replace(/\s+/g,'-').toLowerCase()}-${logo.title.replace(/\s+/g,'-').toLowerCase()}.svg"
               style="display:inline-block;padding:6px 16px;background:${config.colors[0]};color:white;border-radius:20px;font-size:11px;font-weight:600;text-decoration:none;transition:opacity 0.2s;"
               onmouseover="this.style.opacity='0.82'" onmouseout="this.style.opacity='1'">⬇ Download SVG</a>
        </div>`;
    }).join('');

    wrap.innerHTML = `
    <div style="background:#fff;border-radius:18px;padding:18px;border:1.5px solid #e9ecef;box-shadow:0 2px 20px rgba(0,0,0,0.07);font-family:'Segoe UI',system-ui,Arial,sans-serif;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${config.colors[0]},${config.colors[1]});display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg viewBox="0 0 100 100" width="20" height="20">${getIcon(config.icon,'white')}</svg>
            </div>
            <div>
                <div style="font-size:15px;font-weight:800;color:#0d1117;">🎨 ${name} — Logo Designs</div>
                <div style="font-size:11.5px;color:#868e96;">${config.label} · 6 professional styles</div>
            </div>
        </div>
        <div style="font-size:11.5px;color:#6c757d;margin-bottom:14px;padding-left:46px;">All logos are SVG — scale to any size without quality loss</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            ${logoCards}
        </div>
        <div style="margin-top:14px;padding:11px 14px;background:linear-gradient(135deg,#f8f9fa,#fff);border:1px solid #e9ecef;border-radius:12px;font-size:11.5px;color:#495057;line-height:1.6;">
            💡 <strong>Tip:</strong> Download any SVG and edit colours/text in Figma, Canva, or Adobe Illustrator for free.<br>
            Want a different colour scheme? Say <em>"Make a red logo for ${name}"</em> or <em>"Logo for ${name} in green"</em>
        </div>
    </div>`;

    chat.appendChild(wrap);
    chat.scrollTop = chat.scrollHeight;
}

// ── Business Name Card ────────────────────────────────────────────────────
function displayNameCard(industry) {
    const chat = document.getElementById('chat-box');
    if (!chat) return;

    const config = getLogoConfig(industry);
    const enhancements = typeof ChatbotEnhancements !== 'undefined' ? new ChatbotEnhancements() : null;
    const names = enhancements ? enhancements.generateBusinessNames(industry || 'general', 12) : _fallbackNames();

    const palette = ['#0052cc','#28a745','#6f42c1','#fd7e14','#20c997','#dc3545','#0dcaf0','#e83e8c','#ffc107','#198754','#d63384','#0d6efd'];
    const namePills = names.map((n, i) => {
        const bg = palette[i % palette.length];
        return `<div style="background:${bg};color:white;padding:8px 18px;border-radius:24px;font-size:13px;font-weight:700;cursor:pointer;transition:transform 0.15s,opacity 0.15s;"
            onclick="processQuestion('Create a logo for ${n}');"
            title="Click to generate a logo for ${n}"
            onmouseover="this.style.transform='translateY(-2px)';this.style.opacity='0.88'"
            onmouseout="this.style.transform='';this.style.opacity='1'">${n}</div>`;
    }).join('');

    const styleRows = [
        { icon: '🔗', title: 'Compound', desc: 'Two words merged — QuickHub, BrightFlow' },
        { icon: '🚀', title: 'Modern Suffix', desc: 'fashionify, clothiq, stylio' },
        { icon: '👑', title: 'Premium', desc: 'Peak Style, Pure Edge, Apex Works' },
        { icon: '🌀', title: 'Portmanteau', desc: 'Novakova, Vernexa, Zylora' },
        { icon: '🌿', title: 'Nature', desc: 'Cedar, Ember, Atlas, Haven' },
        { icon: '⚡', title: 'Abstract', desc: 'Lumis, Vortex, Helix, Nexum' }
    ];

    const styleGrid = styleRows.map(r => `
        <div style="background:#f8f9fa;padding:10px 12px;border-radius:10px;border:1px solid #e9ecef;">
            <div style="font-size:12px;font-weight:700;color:#343a40;margin-bottom:2px;">${r.icon} ${r.title}</div>
            <div style="font-size:11px;color:#868e96;">${r.desc}</div>
        </div>`).join('');

    const wrap = document.createElement('div');
    wrap.className = 'message bot';
    wrap.style.cssText = 'max-width:99%;width:99%;padding:0;background:none;float:left;margin-right:auto;margin-bottom:8px;';

    wrap.innerHTML = `
    <div style="background:#fff;border-radius:18px;padding:18px;border:1.5px solid #e9ecef;box-shadow:0 2px 20px rgba(0,0,0,0.07);font-family:'Segoe UI',system-ui,Arial,sans-serif;">
        <div style="font-size:15px;font-weight:800;color:#0d1117;margin-bottom:3px;">✨ Business Name Ideas — ${config.label}</div>
        <div style="font-size:11.5px;color:#868e96;margin-bottom:16px;">Click any name → instantly generates a full logo for it</div>
        <div style="display:flex;flex-wrap:wrap;gap:9px;margin-bottom:16px;">${namePills}</div>
        <div style="font-size:12px;font-weight:600;color:#495057;margin-bottom:8px;">6 Naming Styles Used:</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">${styleGrid}</div>
        <div style="font-size:11.5px;color:#868e96;border-top:1px solid #f0f0f0;padding-top:10px;">
            💡 Want 12 more options? Say <em>"More name ideas for my ${industry || 'business'}"</em>
        </div>
    </div>`;

    chat.appendChild(wrap);
    chat.scrollTop = chat.scrollHeight;
}

function _fallbackNames() {
    const b = ['Pro','Neo','Ultra','Smart','Swift','Bold','Spark','Peak','Prime','Pure','Apex','Flash'];
    const s = ['Hub','Flow','Lab','Co','Works','Base','Core','Edge','Craft','Forge','Link','Path'];
    const out = new Set();
    while (out.size < 12) out.add(b[Math.floor(Math.random()*b.length)] + s[Math.floor(Math.random()*s.length)]);
    return [...out];
}

// ── Intent Extraction ─────────────────────────────────────────────────────

function extractLogoIntent(msg) {
    const m = msg.toLowerCase().trim();

    const triggers = [
        'logo','brand design','brand identity','visual identity','company logo','brand logo',
        'make a logo','create logo','design logo','generate logo','logo ideas','logo concept',
        'logo for my','design me a logo','make me a logo','brand mark','create a brand',
        'design a brand','brand image','business logo','build a logo','i need a logo',
        'can you make a logo','can you design','draw a logo','show me a logo','brand me'
    ];
    if (!triggers.some(t => m.includes(t))) return null;

    let name = '';
    const namePatterns = [
        /(?:for|called|named|name[d]? is|brand[:\s]+|company[:\s]+|business[:\s]+|startup[:\s]+)\s+["']?([A-Za-z][A-Za-z0-9 &'.-]{1,28})["']?/i,
        /logo for\s+["']?([A-Za-z][A-Za-z0-9 &'.-]{1,28})["']?/i,
        /["']([A-Za-z][A-Za-z0-9 &'.-]{1,28})["']/,
        /logo[:\s]+([A-Za-z][A-Za-z0-9 &'.-]{2,28})(?:\s|$)/i
    ];
    for (const p of namePatterns) {
        const match = msg.match(p);
        if (match && match[1] && match[1].trim().length > 1) {
            name = match[1].trim();
            break;
        }
    }

    const industry = _extractIndustry(m);
    return { name: name || 'Your Brand', industry };
}

function extractNameGenIntent(msg) {
    const m = msg.toLowerCase().trim();
    const triggers = [
        'business name','company name','brand name','startup name','name ideas','name suggestion',
        'name my business','name my company','name my startup','generate name','generate names',
        'create name','what should i name','help me name','good name for','suggest a name',
        'name for my business','name for my company','give me names','business names',
        'suggest names','more names','more name ideas','name ideas for'
    ];
    if (!triggers.some(t => m.includes(t))) return null;
    return { industry: _extractIndustry(m) };
}

function _extractIndustry(m) {
    const map = [
        ['clothing','clothing'],['fashion','fashion'],['apparel','apparel'],
        ['tech','tech'],['technology','technology'],['software','software'],
        ['saas','saas'],['startup','startup'],['app ','app'],
        ['food','food'],['restaurant','restaurant'],['cafe','cafe'],
        ['coffee','coffee'],['health','health'],['medical','medical'],
        ['pharmacy','pharmacy'],['fitness','fitness'],['gym','gym'],
        ['sport','sport'],['beauty','beauty'],['salon','salon'],
        ['barber','barber'],['spa','spa'],['finance','finance'],
        ['banking','banking'],['accounting','accounting'],['consulting','consulting'],
        ['education','education'],['school','school'],['training','training'],
        ['real estate','real_estate'],['property','property'],['travel','travel'],
        ['tourism','tourism'],['marketing','marketing'],['advertising','advertising'],
        ['retail','retail'],['ecommerce','ecommerce'],['shop','shop'],
        ['legal','legal'],['law','law'],['agriculture','agriculture'],
        ['farm','farm'],['organic','organic'],['automotive','automotive'],
        ['auto','auto'],['luxury','luxury'],['premium','premium'],
        ['photography','photography'],['creative','creative'],['design','design'],
        ['global','global'],['security','security']
    ];
    for (const [kw, val] of map) {
        if (m.includes(kw)) return val;
    }
    return 'general';
}

function getBusinessTaskResponse(msg) {
    if (typeof ChatbotEnhancements === 'undefined') return null;
    const enhancements = new ChatbotEnhancements();
    return enhancements.getBusinessTaskResponse(msg);
}
