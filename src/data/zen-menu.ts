export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spicy?: boolean;
}

export const categories = [
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'sashimi', name: 'Sashimi', icon: '🐟' },
  { id: 'noodles', name: 'Noodles', icon: '🍜' },
  { id: 'tempura', name: 'Tempura', icon: '🍤' }
];

export const zenMenu: MenuItem[] = [
  {
    id: 'zen-sushi-1',
    name: 'Omakase Nigiri Set',
    description: 'Chef selection of 10 pieces premium nigiri sushi',
    price: 128,
    category: 'sushi',
    image: '/images/zen/omakase-nigiri.jpg'
  },
  {
    id: 'zen-sushi-2',
    name: 'Salmon Aburi Roll',
    description: 'Torched salmon, avocado, cucumber with yuzu mayo',
    price: 42,
    category: 'sushi',
    image: '/images/zen/salmon-aburi.jpg'
  },
  {
    id: 'zen-sushi-3',
    name: 'Dragon Roll',
    description: 'Eel, cucumber topped with avocado and tobiko',
    price: 48,
    category: 'sushi',
    image: '/images/zen/dragon-roll.jpg'
  },
  {
    id: 'zen-sashimi-1',
    name: 'Sashimi Moriawase',
    description: 'Assorted fresh sashimi platter (18 pieces)',
    price: 98,
    category: 'sashimi',
    image: '/images/zen/sashimi-mori.jpg'
  },
  {
    id: 'zen-sashimi-2',
    name: 'Toro Sashimi',
    description: 'Premium bluefin tuna belly (6 pieces)',
    price: 88,
    category: 'sashimi',
    image: '/images/zen/toro-sashimi.jpg'
  },
  {
    id: 'zen-sashimi-3',
    name: 'Hamachi Carpaccio',
    description: 'Thinly sliced yellowtail with ponzu and jalapeño',
    price: 52,
    category: 'sashimi',
    image: '/images/zen/hamachi-carpaccio.jpg'
  },
  {
    id: 'zen-noodles-1',
    name: 'Tonkotsu Ramen',
    description: 'Rich pork bone broth with chashu, egg, and bamboo shoots',
    price: 38,
    category: 'noodles',
    image: '/images/zen/tonkotsu-ramen.jpg'
  },
  {
    id: 'zen-noodles-2',
    name: 'Zaru Soba',
    description: 'Chilled buckwheat noodles with dipping sauce',
    price: 28,
    category: 'noodles',
    image: '/images/zen/zaru-soba.jpg'
  },
  {
    id: 'zen-noodles-3',
    name: 'Nabeyaki Udon',
    description: 'Hot pot udon with tempura shrimp and vegetables',
    price: 35,
    category: 'noodles',
    image: '/images/zen/nabeyaki-udon.jpg'
  },
  {
    id: 'zen-tempura-1',
    name: 'Ebi Tempura',
    description: 'Crispy tiger prawns with tempura dipping sauce',
    price: 45,
    category: 'tempura',
    image: '/images/zen/ebi-tempura.jpg'
  },
  {
    id: 'zen-tempura-2',
    name: 'Vegetable Tempura',
    description: 'Seasonal vegetables lightly battered and fried',
    price: 28,
    category: 'tempura',
    image: '/images/zen/veg-tempura.jpg'
  },
  {
    id: 'zen-tempura-3',
    name: 'Mixed Tempura Platter',
    description: 'Combination of prawn, fish, and vegetable tempura',
    price: 58,
    category: 'tempura',
    image: '/images/zen/mixed-tempura.jpg'
  }
];
