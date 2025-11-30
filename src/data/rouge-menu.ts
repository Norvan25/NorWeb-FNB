export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'special' | 'dimsum' | 'main' | 'dessert' | 'beverage';
  image: string;
  spiceLevel?: number;
  featured?: boolean;
}

export const rougeMenu: MenuItem[] = [
  {
    id: 'rouge-peking-duck',
    name: 'Peking Duck Royal',
    description: 'Crispy skin, tender meat, served with traditional pancakes and hoisin sauce.',
    price: 128.00,
    category: 'special',
    image: '/images/rouge/peking-duck.png',
    featured: true
  },
  {
    id: 'rouge-xiao-long-bao',
    name: 'Dragon Xiao Long Bao',
    description: 'Soup dumplings filled with pork and rich broth, steamed to perfection.',
    price: 26.00,
    category: 'dimsum',
    image: '/images/rouge/dimsum.png',
    featured: true
  },
  {
    id: 'rouge-mapo-tofu',
    name: 'Sichuan Mapo Tofu',
    description: 'Silky tofu in spicy chili oil sauce with minced pork and Sichuan peppercorns.',
    price: 32.00,
    category: 'main',
    image: '/images/rouge/mapo-tofu.png',
    spiceLevel: 3,
    featured: true
  },
  {
    id: 'rouge-tiger-prawns',
    name: 'Kung Pao Tiger Prawns',
    description: 'Wok-fried jumbo prawns with roasted peanuts, dried chilies, and Sichuan peppercorns.',
    price: 68.00,
    category: 'main',
    image: '/images/rouge/prawns.png',
    spiceLevel: 2,
    featured: true
  },
  {
    id: 'rouge-roast-pork',
    name: 'Crispy Skin Roast Pork',
    description: 'Succulent pork belly with crackling skin, glazed with honey and five-spice.',
    price: 45.00,
    category: 'main',
    image: '/images/rouge/roast-pork.png',
    featured: true
  },
  {
    id: 'rouge-abalone',
    name: 'Braised Whole Abalone',
    description: 'Premium abalone braised in oyster sauce with shiitake mushrooms and bok choy.',
    price: 188.00,
    category: 'special',
    image: '/images/rouge/abalone.png',
    featured: true
  },
  {
    id: 'rouge-black-pepper-beef',
    name: 'Sizzling Black Pepper Beef',
    description: 'Tender beef strips wok-tossed in aromatic black pepper sauce, served sizzling hot.',
    price: 55.00,
    category: 'main',
    image: '/images/rouge/roast-pork.png',
    spiceLevel: 2,
    featured: true
  },
  {
    id: 'rouge-steamed-garoupa',
    name: 'Steamed Garoupa Fillet',
    description: 'Fresh garoupa steamed with ginger, scallions, and premium soy sauce.',
    price: 88.00,
    category: 'main',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 'rouge-bok-choy',
    name: 'Garlic Bok Choy',
    description: 'Baby bok choy stir-fried with fragrant garlic and finished with oyster sauce.',
    price: 22.00,
    category: 'main',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 'rouge-fried-rice',
    name: 'Yang Zhou Fried Rice',
    description: 'Classic Yangzhou-style fried rice with prawns, char siu, and mixed vegetables.',
    price: 28.00,
    category: 'main',
    image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 'rouge-mango-sago',
    name: 'Mango Sago Pomelo',
    description: 'Fresh mango with sago pearls in sweet coconut milk, garnished with pomelo.',
    price: 18.00,
    category: 'dessert',
    image: '/images/rouge/mango-sago.png',
    featured: true
  },
  {
    id: 'rouge-osmanthus-jelly',
    name: 'Osmanthus Flower Jelly',
    description: 'Delicate jelly infused with osmanthus flowers, served with wolfberry syrup.',
    price: 16.00,
    category: 'dessert',
    image: '/images/rouge/jelly.png',
    featured: true
  }
];

export const categories = [
  { id: 'special', name: "Chef's Specials", icon: '🔥' },
  { id: 'dimsum', name: 'Dim Sum', icon: '🥟' },
  { id: 'main', name: 'Main Courses', icon: '🍜' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
  { id: 'beverage', name: 'Beverages', icon: '🍵' }
];
