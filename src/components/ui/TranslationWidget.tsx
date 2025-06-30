import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Volume2, Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface TranslationWidgetProps {
  text: string;
  onTranslate?: (translatedText: string, language: string) => void;
}

export const TranslationWidget: React.FC<TranslationWidgetProps> = ({ text, onTranslate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const languages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' }
  ];

  const mockTranslations = {
    es: {
      "Hello! How are you?": "¡Hola! ¿Cómo estás?",
      "I would like to learn JavaScript": "Me gustaría aprender JavaScript",
      "Thank you for your help": "Gracias por tu ayuda",
      "When can we schedule our session?": "¿Cuándo podemos programar nuestra sesión?",
      "Great! Looking forward to our JavaScript session tomorrow.": "¡Genial! Espero con ansias nuestra sesión de JavaScript mañana."
    },
    fr: {
      "Hello! How are you?": "Salut! Comment allez-vous?",
      "I would like to learn JavaScript": "J'aimerais apprendre JavaScript",
      "Thank you for your help": "Merci pour votre aide",
      "When can we schedule our session?": "Quand pouvons-nous programmer notre session?",
      "Great! Looking forward to our JavaScript session tomorrow.": "Génial! J'ai hâte de notre session JavaScript demain."
    },
    de: {
      "Hello! How are you?": "Hallo! Wie geht es dir?",
      "I would like to learn JavaScript": "Ich möchte JavaScript lernen",
      "Thank you for your help": "Danke für deine Hilfe",
      "When can we schedule our session?": "Wann können wir unsere Sitzung planen?",
      "Great! Looking forward to our JavaScript session tomorrow.": "Großartig! Ich freue mich auf unsere JavaScript-Sitzung morgen."
    }
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock translation
    const translations = mockTranslations[selectedLanguage] || {};
    const translated = translations[text] || `[${selectedLanguage.toUpperCase()}] ${text}`;
    
    setTranslatedText(translated);
    setIsTranslating(false);
    
    if (onTranslate) {
      onTranslate(translated, selectedLanguage);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = selectedLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Languages size={18} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50"
        >
          <div className="mb-3">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Translate Message
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
              "{text}"
            </p>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Translate to:
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleTranslate}
            loading={isTranslating}
            className="mb-3"
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </Button>

          {translatedText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                  Translation:
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={handleSpeak}
                    className="p-1 text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    <Volume2 size={14} />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1 text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <p className="text-sm text-primary-800 dark:text-primary-200">
                {translatedText}
              </p>
            </motion.div>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
};