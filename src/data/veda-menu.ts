export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  spiceLevel?: number;
  image: string;
}

export const vedaMenu: MenuItem[] = [
  {
    id: 'veda-1',
    name: 'Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato-based sauce with aromatic spices and a hint of sweetness',
    price: 38,
    category: 'Mains',
    spiceLevel: 2,
    image: '/images/veda/butter-chicken.png'
  },
  {
    id: 'veda-2',
    name: 'Lamb Rogan Josh',
    description: 'Slow-cooked lamb in a fragrant curry with cardamom, cloves, and Kashmiri chilies',
    price: 45,
    category: 'Mains',
    spiceLevel: 3,
    image: '/images/veda/lamb-rogan-josh.png'
  },
  {
    id: 'veda-3',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese cubes in a spiced tomato and cream sauce with bell peppers',
    price: 32,
    category: 'Mains',
    spiceLevel: 2,
    image: '/images/veda/paneer-tikka.png'
  },
  {
    id: 'veda-4',
    name: 'Biryani Royale',
    description: 'Fragrant basmati rice layered with saffron, spiced meat, and caramelized onions',
    price: 42,
    category: 'Rice',
    spiceLevel: 2,
    image: '/images/veda/biryani.png'
  },
  {
    id: 'veda-5',
    name: 'Tandoori Chicken',
    description: 'Marinated chicken cooked in a clay oven with yogurt, ginger, garlic, and spices',
    price: 36,
    category: 'Tandoor',
    spiceLevel: 3,
    image: '/images/veda/tandoori-chicken.png'
  },
  {
    id: 'veda-6',
    name: 'Dal Makhani',
    description: 'Black lentils simmered overnight with butter, cream, and aromatic spices',
    price: 28,
    category: 'Vegetarian',
    spiceLevel: 1,
    image: '/images/veda/dal-makhani.png'
  },
  {
    id: 'veda-7',
    name: 'Garlic Naan',
    description: 'Fresh-baked flatbread infused with roasted garlic and brushed with ghee',
    price: 8,
    category: 'Breads',
    spiceLevel: 0,
    image: '/images/veda/garlic-naan.png'
  },
  {
    id: 'veda-8',
    name: 'Samosa Platter',
    description: 'Crispy pastries filled with spiced potatoes, peas, and aromatic herbs',
    price: 18,
    category: 'Appetizers',
    spiceLevel: 2,
    image: '/images/veda/samosa.png'
  },
  {
    id: 'veda-9',
    name: 'Malai Kofta',
    description: 'Cottage cheese and potato dumplings in a rich cashew and cream gravy',
    price: 34,
    category: 'Vegetarian',
    spiceLevel: 1,
    image: '/images/veda/malai-kofta.png'
  },
  {
    id: 'veda-10',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings soaked in cardamom-rose syrup, served warm',
    price: 15,
    category: 'Desserts',
    spiceLevel: 0,
    image: '/images/veda/gulab-jamun.png'
  },
  {
    id: 'veda-11',
    name: 'Mango Lassi',
    description: 'Creamy yogurt drink blended with fresh mango pulp and a hint of cardamom',
    price: 12,
    category: 'Beverages',
    spiceLevel: 0,
    image: '/images/veda/mango-lassi.png'
  },
  {
    id: 'veda-12',
    name: 'Masala Chai',
    description: 'Traditional spiced tea brewed with cardamom, ginger, cinnamon, and milk',
    price: 10,
    category: 'Beverages',
    spiceLevel: 0,
    image: '/images/veda/masala-chai.png'
  }
];

export const categories = ['All', 'Mains', 'Tandoor', 'Vegetarian', 'Rice', 'Breads', 'Appetizers', 'Desserts', 'Beverages'];
