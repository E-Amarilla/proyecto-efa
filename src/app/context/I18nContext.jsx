import { createContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sincronizar idioma al cargar la app
    const lang = localStorage.getItem('selectedLanguage') || 
                document.cookie.split(';').find(c => c.trim().startsWith('selectedLanguage='))?.split('=')[1];
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  return (
    <I18nContext.Provider value={{ i18n }}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;