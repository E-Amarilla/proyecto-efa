import { useTranslation } from 'react-i18next';

const CambioIdioma = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.cookie = `selectedLanguage=${lng}; path=/; max-age=31536000`;
        localStorage.setItem('selectedLanguage', lng);
    };

    return (
        <div className="flex gap-[2px]">
            <button onClick={() => changeLanguage('es')}>🇪🇸</button>
            <button onClick={() => changeLanguage('en')}>🇺🇸</button>
        </div>
    );
};

export default CambioIdioma;