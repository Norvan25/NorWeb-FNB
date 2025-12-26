import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { supportedLanguages, type SupportedLanguage } from '../i18n';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'footer';
}

export const LanguageSwitcher = ({ variant = 'navbar' }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = supportedLanguages.find(
    (lang) => lang.code === i18n.language
  ) || supportedLanguages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const isNavbar = variant === 'navbar';

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 transition-all ${
          isNavbar
            ? 'px-3 py-2 rounded-full border border-gray-200 hover:border-[#F28500] hover:bg-orange-50 text-[#4B5563]'
            : 'px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300'
        }`}
        aria-label="Select language"
      >
        <Globe size={16} />
        <span className="text-sm font-medium hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
        <span className="text-sm font-medium sm:hidden">{currentLang.flag}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-50 ${
              isNavbar
                ? 'bg-white border-gray-200'
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  i18n.language === lang.code
                    ? isNavbar
                      ? 'bg-orange-50 text-[#F28500]'
                      : 'bg-gray-700 text-[#F28500]'
                    : isNavbar
                    ? 'text-gray-700 hover:bg-gray-50'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className="ml-auto text-[#F28500]">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;

