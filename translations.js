// Translation configuration for multi-language support
var translations = {
  en: {
    menu: "Menu", chat: "Chat", reports: "Reports", calculator: "Calculator",
    planner: "Planner", home: "Home", about: "About", settings: "Settings",
    suggestions: "Suggestions", sendBtn: "Send", chatPlaceholder: "Message Usemee...",
    newChat: "New Chat", recents: "Recents",
    // About
    aboutTitle: "About Usemee",
    aboutCreator: "Created by Fares — a passionate developer.",
    aboutPurpose: "Usemee is an AI-powered business assistant that helps you answer business questions, create reports, generate presentations, calculate financials, and plan your business — all in one place.",
    // Settings
    sectionAppearance: "Appearance",
    labelTheme: "Theme", themeDesc: "Light or dark interface",
    optLight: "☀️ Light", optDark: "🌙 Dark",
    sectionText: "Text & Display",
    labelZoom: "Page Zoom", zoomDesc: "Scales the entire interface across all pages",
    zSmall: "Small", zDefault: "Default", zLarge: "Large", zLargest: "Largest",
    sectionLang: "Language",
    labelLang: "Interface Language", langDesc: "Applies instantly across all pages",
    sectionNotif: "Notifications & Chat",
    labelBrowserNotif: "Browser Notifications", browserNotifDesc: "Get alerted when Usemee replies",
    labelSound: "Sound on New Message", soundDesc: "Play a chime when the bot responds",
    saveBtn: "Save Settings",
    notifEnabled: "Notifications enabled",
    notifDenied: "Permission denied — check browser settings"
  },
  es: {
    menu: "Menú", chat: "Chat", reports: "Informes", calculator: "Calculadora",
    planner: "Planificador", home: "Inicio", about: "Acerca de", settings: "Ajustes",
    suggestions: "Sugerencias", sendBtn: "Enviar", chatPlaceholder: "Escribe a Usemee...",
    newChat: "Nueva Conversación", recents: "Recientes",
    aboutTitle: "Acerca de Usemee",
    aboutCreator: "Creado por Fares — un desarrollador apasionado.",
    aboutPurpose: "Usemee es un asistente empresarial con IA que te ayuda a responder preguntas de negocios, crear informes, generar presentaciones, calcular finanzas y planificar tu empresa — todo en un solo lugar.",
    sectionAppearance: "Apariencia",
    labelTheme: "Tema", themeDesc: "Interfaz clara u oscura",
    optLight: "☀️ Claro", optDark: "🌙 Oscuro",
    sectionText: "Texto y Pantalla",
    labelZoom: "Zoom de Página", zoomDesc: "Escala toda la interfaz en todas las páginas",
    zSmall: "Pequeño", zDefault: "Por defecto", zLarge: "Grande", zLargest: "Más grande",
    sectionLang: "Idioma",
    labelLang: "Idioma de la Interfaz", langDesc: "Se aplica instantáneamente en todas las páginas",
    sectionNotif: "Notificaciones y Chat",
    labelBrowserNotif: "Notificaciones del Navegador", browserNotifDesc: "Recibe alertas cuando Usemee responde",
    labelSound: "Sonido en Nuevo Mensaje", soundDesc: "Reproduce un sonido cuando el bot responde",
    saveBtn: "Guardar Ajustes",
    notifEnabled: "Notificaciones activadas",
    notifDenied: "Permiso denegado — revisa la configuración del navegador"
  },
  fr: {
    menu: "Menu", chat: "Discussion", reports: "Rapports", calculator: "Calculatrice",
    planner: "Planificateur", home: "Accueil", about: "À propos", settings: "Paramètres",
    suggestions: "Suggestions", sendBtn: "Envoyer", chatPlaceholder: "Écrivez à Usemee...",
    newChat: "Nouvelle Discussion", recents: "Récents",
    aboutTitle: "À propos d'Usemee",
    aboutCreator: "Créé par Fares — un développeur passionné.",
    aboutPurpose: "Usemee est un assistant commercial IA qui vous aide à répondre aux questions d'entreprise, créer des rapports, générer des présentations, calculer les finances et planifier votre activité — tout en un seul endroit.",
    sectionAppearance: "Apparence",
    labelTheme: "Thème", themeDesc: "Interface claire ou sombre",
    optLight: "☀️ Clair", optDark: "🌙 Sombre",
    sectionText: "Texte et Affichage",
    labelZoom: "Zoom de la Page", zoomDesc: "Redimensionne toute l'interface sur toutes les pages",
    zSmall: "Petit", zDefault: "Par défaut", zLarge: "Grand", zLargest: "Plus grand",
    sectionLang: "Langue",
    labelLang: "Langue de l'Interface", langDesc: "S'applique instantanément sur toutes les pages",
    sectionNotif: "Notifications et Chat",
    labelBrowserNotif: "Notifications du Navigateur", browserNotifDesc: "Soyez alerté quand Usemee répond",
    labelSound: "Son sur Nouveau Message", soundDesc: "Jouer un son quand le bot répond",
    saveBtn: "Enregistrer les Paramètres",
    notifEnabled: "Notifications activées",
    notifDenied: "Permission refusée — vérifiez les paramètres du navigateur"
  },
  de: {
    menu: "Menü", chat: "Chat", reports: "Berichte", calculator: "Rechner",
    planner: "Planer", home: "Startseite", about: "Über uns", settings: "Einstellungen",
    suggestions: "Vorschläge", sendBtn: "Senden", chatPlaceholder: "Nachricht an Usemee...",
    newChat: "Neuer Chat", recents: "Zuletzt",
    aboutTitle: "Über Usemee",
    aboutCreator: "Erstellt von Fares — ein leidenschaftlicher Entwickler.",
    aboutPurpose: "Usemee ist ein KI-gestützter Geschäftsassistent, der Ihnen hilft, Geschäftsfragen zu beantworten, Berichte zu erstellen, Präsentationen zu generieren, Finanzen zu berechnen und Ihr Unternehmen zu planen — alles an einem Ort.",
    sectionAppearance: "Erscheinungsbild",
    labelTheme: "Design", themeDesc: "Helles oder dunkles Interface",
    optLight: "☀️ Hell", optDark: "🌙 Dunkel",
    sectionText: "Text & Anzeige",
    labelZoom: "Seitenzoom", zoomDesc: "Skaliert die gesamte Oberfläche auf allen Seiten",
    zSmall: "Klein", zDefault: "Standard", zLarge: "Groß", zLargest: "Am größten",
    sectionLang: "Sprache",
    labelLang: "Oberflächensprache", langDesc: "Gilt sofort auf allen Seiten",
    sectionNotif: "Benachrichtigungen & Chat",
    labelBrowserNotif: "Browser-Benachrichtigungen", browserNotifDesc: "Benachrichtigt werden, wenn Usemee antwortet",
    labelSound: "Ton bei neuer Nachricht", soundDesc: "Ton abspielen, wenn der Bot antwortet",
    saveBtn: "Einstellungen speichern",
    notifEnabled: "Benachrichtigungen aktiviert",
    notifDenied: "Berechtigung verweigert — Browsereinstellungen prüfen"
  },
  ar: {
    menu: "القائمة", chat: "المحادثة", reports: "التقارير", calculator: "الآلة الحاسبة",
    planner: "المخطط", home: "الرئيسية", about: "عن التطبيق", settings: "الإعدادات",
    suggestions: "اقتراحات", sendBtn: "إرسال", chatPlaceholder: "اكتب لـ Usemee...",
    newChat: "محادثة جديدة", recents: "الأخيرة",
    aboutTitle: "عن Usemee",
    aboutCreator: "تم إنشاؤه بواسطة فارس — مطوّر متحمس.",
    aboutPurpose: "Usemee هو مساعد أعمال مدعوم بالذكاء الاصطناعي يساعدك على الإجابة على أسئلة الأعمال، وإنشاء التقارير، وتوليد العروض التقديمية، وحساب الشؤون المالية، والتخطيط لعملك — كل ذلك في مكان واحد.",
    sectionAppearance: "المظهر",
    labelTheme: "السمة", themeDesc: "واجهة فاتحة أو داكنة",
    optLight: "☀️ فاتح", optDark: "🌙 داكن",
    sectionText: "النص والعرض",
    labelZoom: "تكبير الصفحة", zoomDesc: "يقوم بتغيير حجم الواجهة بأكملها عبر جميع الصفحات",
    zSmall: "صغير", zDefault: "افتراضي", zLarge: "كبير", zLargest: "الأكبر",
    sectionLang: "اللغة",
    labelLang: "لغة الواجهة", langDesc: "يُطبَّق فوراً على جميع الصفحات",
    sectionNotif: "الإشعارات والمحادثة",
    labelBrowserNotif: "إشعارات المتصفح", browserNotifDesc: "تلقّ تنبيهات عند رد Usemee",
    labelSound: "صوت عند رسالة جديدة", soundDesc: "تشغيل رنّة عند رد الروبوت",
    saveBtn: "حفظ الإعدادات",
    notifEnabled: "الإشعارات مفعّلة",
    notifDenied: "تم رفض الإذن — تحقق من إعدادات المتصفح"
  }
};

var currentLanguage = localStorage.getItem('language') || 'en';

function getCurrentLanguage() { return currentLanguage; }

function setCurrentLanguage(lang) {
    currentLanguage = lang;
}

function t(key) {
    var lang = currentLanguage;
    var dict = translations[lang] || translations['en'];
    return dict[key] || translations['en'][key] || key;
}

function updatePageTranslations() {
    var lang = currentLanguage;
    var dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        var val = dict[key] || translations['en'][key];
        if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-placeholder');
        var val = dict[key] || translations['en'][key];
        if (val) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-value]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-value');
        var val = dict[key] || translations['en'][key];
        if (val) el.value = val;
    });
    // Update select option text for theme if present
    var appSelect = document.getElementById('appearance');
    if (appSelect) {
        var opts = appSelect.querySelectorAll('option');
        if (opts[0]) opts[0].textContent = dict['optLight'] || '☀️ Light';
        if (opts[1]) opts[1].textContent = dict['optDark']  || '🌙 Dark';
    }
    // Update zoom btn labels
    document.querySelectorAll('.zoom-btn').forEach(function(btn) {
        var size = btn.dataset.size;
        var keyMap = { small: 'zSmall', default: 'zDefault', large: 'zLarge', xlarge: 'zLargest' };
        var lbl = btn.querySelector('.z-lbl');
        if (lbl && keyMap[size]) lbl.textContent = dict[keyMap[size]] || lbl.textContent;
    });
}
