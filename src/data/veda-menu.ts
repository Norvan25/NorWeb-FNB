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
    name: 'Royal Butter Chicken',
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
    image: '/images/veda/lamb-biryani.png'
  },
  {
    id: 'veda-3',
    name: 'Chicken Tikka Masala',
    description: 'Charcoal-grilled chicken pieces in a spiced tomato and cream sauce with aromatic herbs',
    price: 36,
    category: 'Mains',
    spiceLevel: 2,
    image: '/images/veda/chicken-tikka.png'
  },
  {
    id: 'veda-4',
    name: 'Malai Kofta',
    description: 'Cottage cheese and potato dumplings in a rich cashew and cream gravy',
    price: 34,
    category: 'Vegetarian',
    spiceLevel: 1,
    image: '/images/veda/paneer-tikka.png'
  },
  {
    id: 'veda-5',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes marinated in yogurt and spices, served with mint chutney',
    price: 32,
    category: 'Tandoor',
    spiceLevel: 2,
    image: '/images/veda/paneer-tikka.png'
  },
  {
    id: 'veda-6',
    name: 'Tandoori Prawns',
    description: 'Succulent prawns marinated in yogurt and spices, cooked in a clay tandoor',
    price: 55,
    category: 'Tandoor',
    spiceLevel: 3,
    image: '/images/veda/tandoori-prawns..png'
  },
  {
    id: 'veda-7',
    name: 'Samosa Platter',
    description: 'Crispy pastries filled with spiced potatoes, peas, and aromatic herbs',
    price: 20,
    category: 'Appetizers',
    spiceLevel: 2,
    image: '/images/veda/samosa-platter.png'
  },
  {
    id: 'veda-8',
    name: 'Onion Bhaji',
    description: 'Crispy fried onion fritters spiced with gram flour, cumin, and coriander',
    price: 18,
    category: 'Appetizers',
    spiceLevel: 2,
    image: '/images/veda/onion-bhaji.png'
  },
  {
    id: 'veda-9',
    name: 'Aloo Tikki Chaat',
    description: 'Crispy potato patties topped with yogurt, chutneys, and aromatic spices',
    price: 22,
    category: 'Appetizers',
    spiceLevel: 2,
    image: '/images/veda/chaat-reshoot.png'
  },
  {
    id: 'veda-10',
    name: 'Garlic Naan',
    description: 'Fresh-baked flatbread infused with roasted garlic and brushed with ghee',
    price: 10,
    category: 'Naan',
    spiceLevel: 0,
    image: '/images/veda/plain-naan.png'
  },
  {
    id: 'veda-11',
    name: 'Cheese Naan',
    description: 'Fluffy naan bread stuffed with melted cheese and aromatic spices',
    price: 12,
    category: 'Naan',
    spiceLevel: 0,
    image: '/images/veda/cheese-naan.png'
  },
  {
    id: 'veda-12',
    name: 'Plain Naan',
    description: 'Traditional clay oven-baked flatbread, light and fluffy',
    price: 8,
    category: 'Naan',
    spiceLevel: 0,
    image: '/images/veda/plain-naan.png'
  },
  {
    id: 'veda-13',
    name: 'Rasgulla',
    description: 'Soft cottage cheese dumplings soaked in sweet syrup with cardamom',
    price: 16,
    category: 'Dessert',
    spiceLevel: 0,
    image: '/images/veda/rasgulla.png'
  },
  {
    id: 'veda-14',
    name: 'Kulfi',
    description: 'Traditional Indian ice cream with pistachios, cardamom, and saffron',
    price: 18,
    category: 'Dessert',
    spiceLevel: 0,
    image: '/images/veda/kulfi.png'
  },
  {
    id: 'veda-15',
    name: 'Mango Lassi',
    description: 'Creamy yogurt drink blended with fresh mango pulp and a hint of cardamom',
    price: 12,
    category: 'Beverages',
    spiceLevel: 0,
    image: '/images/veda/mango-lassi.png'
  },
  {
    id: 'veda-16',
    name: 'Masala Chai',
    description: 'Traditional spiced tea brewed with cardamom, ginger, cinnamon, and milk',
    price: 10,
    category: 'Beverages',
    spiceLevel: 0,
    image: '/images/veda/masala-chai.png'
  },
  {
    id: 'veda-17',
    name: 'Nimbu Pani',
    description: 'Refreshing lemonade with cumin, black salt, and fresh mint',
    price: 10,
    category: 'Beverages',
    spiceLevel: 0,
    image: '/images/veda/nimbu-pani.png'
  }
];

export const categories = ['All', 'Mains', 'Tandoor', 'Vegetarian', 'Naan', 'Appetizers', 'Dessert', 'Beverages'];
