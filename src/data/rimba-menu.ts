export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'main' | 'dessert' | 'beverage';
  image: string;
  spiceLevel?: number;
}

export const rimbaMenu: MenuItem[] = [
  {
    id: 'rimba-nasi-lemak',
    name: 'Nasi Lemak Royal',
    description: 'Basmati rice, lobster sambal, berempah chicken.',
    price: 28.00,
    category: 'main',
    image: '/images/rimba/nasi-lemak.png',
    spiceLevel: 2
  },
  {
    id: 'rimba-rendang',
    name: 'Beef Rendang Tok',
    description: 'Slow-cooked Angus beef, toasted coconut kerisik.',
    price: 42.00,
    category: 'main',
    image: '/images/rimba/rendang.png',
    spiceLevel: 3
  },
  {
    id: 'rimba-satay',
    name: 'Satay Platter',
    description: 'Wagyu beef & chicken skewers, peanut sauce.',
    price: 35.00,
    category: 'main',
    image: '/images/rimba/satay.png',
    spiceLevel: 1
  },
  {
    id: 'rimba-ikan-bakar',
    name: 'Ikan Bakar Petai',
    description: 'Grilled stingray with stink bean sambal.',
    price: 55.00,
    category: 'main',
    image: '/images/rimba/fish-bakar.png',
    spiceLevel: 3
  },
  {
    id: 'rimba-ayam-merah',
    name: 'Ayam Masak Merah',
    description: 'Chicken in spicy tomato reduction.',
    price: 26.00,
    category: 'main',
    image: '/images/rimba/ayam-merah.png',
    spiceLevel: 2
  },
  {
    id: 'rimba-sago',
    name: 'Sago Gula Melaka',
    description: 'Pearl sago pudding with palm sugar syrup and coconut cream.',
    price: 18.00,
    category: 'dessert',
    image: '/images/rimba/sago.png'
  },
  {
    id: 'rimba-cendol',
    name: 'Royal Cendol',
    description: 'Shaved ice with pandan jelly, palm sugar, coconut milk.',
    price: 16.00,
    category: 'dessert',
    image: '/images/rimba/dessert-cendol.png'
  },
  {
    id: 'rimba-kuih',
    name: 'Nyonya Kuih Trio',
    description: 'Assorted traditional cakes: ondeh-ondeh, kuih lapis, seri muka.',
    price: 22.00,
    category: 'dessert',
    image: '/images/rimba/dessert-kuih.png'
  },
  {
    id: 'rimba-bandung',
    name: 'Bandung Rose Selasih',
    description: 'Rose syrup milk with basil seeds.',
    price: 12.00,
    category: 'beverage',
    image: '/images/rimba/drink-bandung.png'
  },
  {
    id: 'rimba-teh-tarik',
    name: 'Teh Tarik Foam',
    description: 'Pulled tea with silky foam top.',
    price: 10.00,
    category: 'beverage',
    image: '/images/rimba/drink-teh-tarik.png'
  },
  {
    id: 'rimba-limau',
    name: 'Limau Asam Boi',
    description: 'Lime juice with preserved plum.',
    price: 12.00,
    category: 'beverage',
    image: '/images/rimba/drink-limau.png'
  }
];

export const categories = {
  main: { name: 'Hidangan Utama', malay: 'هيداڠن اوتام' },
  dessert: { name: 'Pemanis Mulut', malay: 'ڤمانيس مولوت' },
  beverage: { name: 'Penyegar', malay: 'ڤڽݢر' }
};
