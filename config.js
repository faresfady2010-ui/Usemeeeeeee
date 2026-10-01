// Backend configuration for the JavaScript app
const BACKEND_URL = localStorage.getItem('backendUrl') || 'http://localhost:5000';

// Local Node development server
const USE_LOCAL_BACKEND = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const LOCAL_BACKEND_URL = 'http://localhost:5000';

const ACTIVE_BACKEND = USE_LOCAL_BACKEND ? LOCAL_BACKEND_URL : BACKEND_URL;

console.log('Backend URL:', BACKEND_URL);
console.log('Local development:', USE_LOCAL_BACKEND);
console.log('Active backend:', ACTIVE_BACKEND);
