import React, { createContext, useState, useContext, ReactNode } from 'react';

// Load translation files
import en from './locales/en.json';
// import es from './locales/es.json';
// import fr from './locales/fr.json';

const translations: { [key: string]: { [key: string]: string } } = {
  en,
  // es,
  // fr,
};

type TranslationContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string) => {
    return translations[language][key] || key; // Fallback to the key if translation is missing
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);