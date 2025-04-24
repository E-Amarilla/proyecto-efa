import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esTrad from '../../../public/locales/es/es.json';
import enTrad from '../../../public/locales/en/en.json';

const resources = {
    es: { 
        trad: esTrad
    },
    en: { 
        trad: enTrad
    },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    ns: ['trad'],
    interpolation: { 
        escapeValue: false,
        skipOnVariables: false,
    },
  });

export default i18n;