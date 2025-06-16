'use client';

import { useTranslation } from 'react-i18next';
import i18n from '../../lib/i18n';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <div className="flex gap-2">
      {['mn', 'en', 'ru'].map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={`text-white text-sm px-2 py-1 rounded border ${
            i18n.language === lng ? 'bg-[#F95F19]' : 'border-[#F95F19]'
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
