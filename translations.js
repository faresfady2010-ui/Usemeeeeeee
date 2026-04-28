// Translation configuration for multi-language support
const translations = {
    en: {
        // Navigation
        home: "Home",
        about: "About",
        settings: "Settings",
        
        // Index page
        chatHeader: "usemee",
        chatPlaceholder: "Type your message...",
        sendBtn: "Send",
        suggestionsBtn: "💡 Suggestions",
        welcomeMessage: "Hello! How can I help you with business questions today?",
        
        // Settings page
        settingsTitle: "Settings",
        appearance: "Appearance",
        lightMode: "Light Mode",
        darkMode: "Dark Mode",
        language: "Language",
        notifications: "Enable Notifications",
        saveBtn: "Save Settings",
        settingsSaved: "Settings saved!",
        
        // About page
        aboutTitle: "About",
        aboutContent: "Welcome to Usemee - Your Business Chatbot Assistant"
    },
    es: {
        // Navigation
        home: "Inicio",
        about: "Acerca de",
        settings: "Configuración",
        
        // Index page
        chatHeader: "usemee",
        chatPlaceholder: "Escribe tu mensaje...",
        sendBtn: "Enviar",
        suggestionsBtn: "💡 Sugerencias",
        welcomeMessage: "¡Hola! ¿Cómo puedo ayudarte con preguntas sobre negocios hoy?",
        
        // Settings page
        settingsTitle: "Configuración",
        appearance: "Apariencia",
        lightMode: "Modo Claro",
        darkMode: "Modo Oscuro",
        language: "Idioma",
        notifications: "Habilitar Notificaciones",
        saveBtn: "Guardar Configuración",
        settingsSaved: "¡Configuración guardada!",
        
        // About page
        aboutTitle: "Acerca de",
        aboutContent: "Bienvenido a Usemee - Tu Asistente Chatbot de Negocios"
    },
    fr: {
        // Navigation
        home: "Accueil",
        about: "À propos",
        settings: "Paramètres",
        
        // Index page
        chatHeader: "usemee",
        chatPlaceholder: "Tapez votre message...",
        sendBtn: "Envoyer",
        suggestionsBtn: "💡 Suggestions",
        welcomeMessage: "Bonjour! Comment puis-je vous aider avec vos questions commerciales aujourd'hui?",
        
        // Settings page
        settingsTitle: "Paramètres",
        appearance: "Apparence",
        lightMode: "Mode Clair",
        darkMode: "Mode Sombre",
        language: "Langue",
        notifications: "Activer les Notifications",
        saveBtn: "Enregistrer les Paramètres",
        settingsSaved: "Paramètres enregistrés!",
        
        // About page
        aboutTitle: "À propos",
        aboutContent: "Bienvenue à Usemee - Votre Assistant Chatbot Professionnel"
    },
    de: {
        // Navigation
        home: "Startseite",
        about: "Über uns",
        settings: "Einstellungen",
        
        // Index page
        chatHeader: "usemee",
        chatPlaceholder: "Geben Sie Ihre Nachricht ein...",
        sendBtn: "Senden",
        suggestionsBtn: "💡 Vorschläge",
        welcomeMessage: "Hallo! Wie kann ich dir heute bei Geschäftsfragen helfen?",
        
        // Settings page
        settingsTitle: "Einstellungen",
        appearance: "Erscheinungsbild",
        lightMode: "Heller Modus",
        darkMode: "Dunkler Modus",
        language: "Sprache",
        notifications: "Benachrichtigungen aktivieren",
        saveBtn: "Einstellungen Speichern",
        settingsSaved: "Einstellungen gespeichert!",
        
        // About page
        aboutTitle: "Über uns",
        aboutContent: "Willkommen bei Usemee - Dein Business-Chatbot-Assistent"
    },
    ar: {
        // Navigation
        home: "الرئيسية",
        about: "حول",
        settings: "الإعدادات",
        
        // Index page
        chatHeader: "usemee",
        chatPlaceholder: "اكتب رسالتك...",
        sendBtn: "إرسال",
        suggestionsBtn: "💡 اقتراحات",
        welcomeMessage: "مرحبا! كيف يمكنني مساعدتك في أسئلة العمل اليوم؟",
        
        // Settings page
        settingsTitle: "الإعدادات",
        appearance: "المظهر",
        lightMode: "الوضع الفاتح",
        darkMode: "الوضع الداكن",
        language: "اللغة",
        notifications: "تفعيل الإشعارات",
        saveBtn: "حفظ الإعدادات",
        settingsSaved: "تم حفظ الإعدادات!",
        
        // About page
        aboutTitle: "حول",
        aboutContent: "مرحبا بك في Usemee - مساعد الدردشة الآلية للأعمال"
    }
};

// Get current language from localStorage or default to English
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Set language in localStorage
function setLanguage(lang) {
    localStorage.setItem('language', lang);
}

// Get translated text
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations['en'][key] || key;
}

// Update page translations
function updatePageTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    // Update placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
}

// Broadcast language change to other tabs/windows
function broadcastLanguageChange(lang) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('languageChanged', new Date().getTime());
        localStorage.setItem('language', lang);
    }
}

// Listen for language changes from other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'languageChanged') {
        updatePageTranslations();
    }
});
