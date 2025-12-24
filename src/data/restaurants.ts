import { Restaurant } from '../types/restaurant';

export const restaurants: Restaurant[] = [
  {
    id: 'rimba',
    name: 'RIMBA',
    cuisine: 'Malay Cuisine',
    tagline: 'Taste the Wild',
    description: 'Immerse yourself in the heart of the jungle with authentic Malay flavors that awaken your primal senses.',
    theme: {
      primary: '#1a4d2e',
      secondary: '#d4af37',
      accent: '#2d5f3f',
      gradient: 'from-emerald-950 via-green-900 to-green-950'
    },
    icon: '🌿'
  },
  {
    id: 'veda',
    name: 'VEDA',
    cuisine: 'Indian Cuisine',
    tagline: 'Sacred Spices',
    description: 'A spiritual journey through ancient recipes, where every dish is a meditation on flavor.',
    theme: {
      primary: '#ff6b35',
      secondary: '#7b2cbf',
      accent: '#ffa500',
      gradient: 'from-orange-600 via-purple-700 to-pink-600'
    },
    icon: '🕉️'
  },
  {
    id: 'gusto',
    name: 'GUSTO',
    cuisine: 'Italian Cuisine',
    tagline: 'La Dolce Vita',
    description: 'Rustic Italian traditions meet modern elegance in a celebration of authentic Mediterranean soul.',
    theme: {
      primary: '#228b22',
      secondary: '#dc143c',
      accent: '#f5f5dc',
      gradient: 'from-green-700 via-red-600 to-amber-50'
    },
    icon: '🍝'
  }
];
