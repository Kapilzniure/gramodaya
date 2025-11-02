
import React, { createContext, useContext, useState, useCallback } from 'react';
import { translateText, detectLanguage, getAvailableLanguages } from '@/lib/translationService';

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  translate: (text: string) => Promise<string>;
  availableLanguages: { code: string; name: string }[];
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'en'
  );
  const [isTranslating, setIsTranslating] = useState(false);

  const setLanguage = useCallback((language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  }, []);

  const translate = useCallback(
    async (text: string) => {
      if (currentLanguage === 'en') return text;

      setIsTranslating(true);
      try {
        const detectedLang = await detectLanguage(text);
        if (detectedLang === currentLanguage) return text;

        const translation = await translateText(text, currentLanguage);
        return translation.text;
      } catch (error) {
        console.error('Translation error:', error);
        return text;
      } finally {
        setIsTranslating(false);
      }
    },
    [currentLanguage]
  );

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translate,
        availableLanguages: getAvailableLanguages(),
        isTranslating,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};