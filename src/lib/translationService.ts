// This is a mock translation service
// In a real application, you would use a proper translation API

interface Translation {
  text: string;
  detectedLanguage: string;
}

const mockTranslations: Record<string, Record<string, string>> = {
  'en': {
    'Hello! How can I help you today?': 'Hello! How can I help you today?',
    'Hi, I\'m interested in the wireless headphones': 'Hi, I\'m interested in the wireless headphones',
  },
  'es': {
    'Hello! How can I help you today?': '¡Hola! ¿Cómo puedo ayudarte hoy?',
    'Hi, I\'m interested in the wireless headphones': 'Hola, estoy interesado en los auriculares inalámbricos',
  },
  'fr': {
    'Hello! How can I help you today?': 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
    'Hi, I\'m interested in the wireless headphones': 'Bonjour, je suis intéressé par les écouteurs sans fil',
  },
  'ne': {
    'Hello! How can I help you today?': 'नमस्ते! म तपाईंलाई कसरी मद्दत गर्न सक्छु?',
    'Hi, I\'m interested in the wireless headphones': 'नमस्ते, म वायरलेस हेडफोनमा रुचि राख्छु',
    'my': 'मेरो',
    'wishlist': 'इच्छासूची',
    'item': 'वस्तु',
    'items': 'वस्तुहरू',
    'saved_for_later': 'पछि सुरक्षित',
    'wishlist_empty': 'तपाईंको इच्छासूची खाली छ',
    'start_adding_products': 'आफ्नो इच्छासूचीमा उत्पादनहरू थप्न सुरु गर्नुहोस्!',
    'browse_products': 'उत्पादनहरू ब्राउज गर्नुहोस्',
    'new': 'नयाँ',
    'almost_new': 'लगभग नयाँ',
    'used': 'प्रयोग भएको',
    'add_to_cart': 'कार्टमा थप्नुहोस्',
    'removed_from_wishlist': 'इच्छासूचीबाट हटाइयो',
    'added_to_cart': 'कार्टमा थपियो! 🛒',
    'continue_shopping': 'किन्न जारी राख्नुहोस्',
  },
};

export const translateText = async (
  text: string,
  targetLanguage: string = 'en'
): Promise<Translation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate translation delay
      const translated = mockTranslations[targetLanguage]?.[text] || text;
      resolve({
        text: translated,
        detectedLanguage: 'en', // Mock detected language
      });
    }, 500);
  });
};

export const detectLanguage = async (text: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock language detection
      resolve('en');
    }, 200);
  });
};

export const getAvailableLanguages = () => {
  return [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ne', name: 'Nepali' },
  ];
};