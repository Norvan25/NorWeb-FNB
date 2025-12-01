export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const gustoMenu: MenuItem[] = [
  {
    id: 'gusto-1',
    name: 'Margherita Classica',
    description: 'San Marzano tomatoes, fresh mozzarella di bufala, basil, extra virgin olive oil',
    price: 28,
    category: 'Pizza',
    image: '/images/gusto/gusto-pizza.png'
  },
  {
    id: 'gusto-2',
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmigiano, fontina with black truffle oil',
    price: 35,
    category: 'Pizza',
    image: '/images/gusto/gusto-pizza.png'
  },
  {
    id: 'gusto-3',
    name: 'Prosciutto e Rucola',
    description: 'Parma ham, wild arugula, shaved parmesan, balsamic reduction',
    price: 38,
    category: 'Pizza',
    image: '/images/gusto/gusto-pizza.png'
  },
  {
    id: 'gusto-4',
    name: 'Tagliatelle al Tartufo',
    description: 'Fresh egg pasta with black truffle cream sauce and parmigiano',
    price: 48,
    category: 'Pasta',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-5',
    name: 'Spaghetti Carbonara',
    description: 'Guanciale, pecorino romano, egg yolk, black pepper',
    price: 32,
    category: 'Pasta',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-6',
    name: 'Pappardelle al Ragù',
    description: 'Wide ribbon pasta with slow-braised Tuscan beef and pork ragù',
    price: 42,
    category: 'Pasta',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-7',
    name: 'Osso Buco Milanese',
    description: 'Braised veal shanks with saffron risotto and gremolata',
    price: 68,
    category: 'Mains',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-8',
    name: 'Branzino al Forno',
    description: 'Oven-roasted Mediterranean sea bass with lemon, capers, and herbs',
    price: 58,
    category: 'Mains',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-9',
    name: 'Bistecca alla Fiorentina',
    description: 'Grilled T-bone steak with rosemary, garlic, and Tuscan olive oil',
    price: 88,
    category: 'Mains',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-10',
    name: 'Tiramisu Classico',
    description: 'Espresso-soaked ladyfingers, mascarpone cream, cocoa powder',
    price: 18,
    category: 'Dessert',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-11',
    name: 'Panna Cotta',
    description: 'Vanilla cream with berry compote and amaretti crumble',
    price: 16,
    category: 'Dessert',
    image: '/images/gusto/gusto-hero.png'
  },
  {
    id: 'gusto-12',
    name: 'Affogato al Caffè',
    description: 'Vanilla gelato drowned in hot espresso with amaretto',
    price: 14,
    category: 'Dessert',
    image: '/images/gusto/gusto-hero.png'
  }
];

export const categories = ['All', 'Pizza', 'Pasta', 'Mains', 'Dessert'];
