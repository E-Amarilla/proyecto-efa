import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useOutsideClick from '../../hooks/useOutsideClick';

const DropdownBanderas = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();
    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => {
        setIsOpen(false);
    });

    const options = [
        { value: 'es', flag: '🇪🇸' },
        { value: 'en', flag: '🇺🇸' }
    ];

    const handleLanguageChange = (value) => {
        i18n.changeLanguage(value);
        document.cookie = `selectedLanguage=${value}; path=/; max-age=31536000`;
        localStorage.setItem('selectedLanguage', value);
        setIsOpen(false);
    };

    const currentLanguage = options.find(opt => opt.value === i18n.language) || options[0];

    return (
        <div className="relative z-[1000]" ref={dropdownRef}>
            <button 
                className="flex items-center justify-between w-[100%] py-[2px] px-[4px] bg-[#BBB5] border border-[#AAA] rounded-md shadow-sm z-[1000]"
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentLanguage.flag}
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`ml-[2px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} inline-block w-[8px] h-[8px]`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            
            {isOpen && (
                <div className="absolute right-[0px] mt-[2px] w-[40px] rounded-md shadow-lg bg-[#DDD] ring-[1px] ring-black ring-opacity-[5px] transition-colors duration-300 ease-in-out hover:bg-lightGrey z-[1000]">
                    <div className="py-[1px] z-[1000]" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options
                            .filter(option => option.value !== currentLanguage.value)
                            .map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleLanguageChange(option.value)}
                                    className="block w-[100%] text-left px-[4px] py-[2px] text-sm text-gray-700 z-[999]"
                                    role="menuitem"
                                >
                                    {option.flag}
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownBanderas;