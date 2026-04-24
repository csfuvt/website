import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * i18n rămâne disponibil fără fișiere JSON (traducerea conținutului = Google Translate din navbar).
 */
i18n.use(initReactI18next).init({
  lng: 'ro',
  fallbackLng: 'ro',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ro: { translation: {} },
  },
});

export default i18n;
