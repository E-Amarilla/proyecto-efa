"use client";

import { useTranslation } from "react-i18next";
import DropdownBanderas from "../components/traduccion/dropdownBanderas.jsx";

function Test() {
    const { t } = useTranslation('trad');

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4 text-white">{t('test')}</h1>
            <DropdownBanderas />
        </div>
    );
}

export default Test;