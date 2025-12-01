import { useState, useEffect } from 'react';
import { ShoppingCart, Flame, X, Minus, Plus, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';
import { FloatingMandala } from '../components/Veda/FloatingMandala';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  spiceLevel?: number;
  image: string;
}

const vedaMenu: MenuItem[] = [
  {
    id: 'veda-1',
    name: 'Royal Butter Chicken',
    description: 'Tender chicken in a rich, creamy tomato-based sauce with aromatic spices',
    price: 35.00,
    category: 'Mains',
    spiceLevel: 2,
    image: '/images/veda/butter-chicken.png'
  },
  {
    id: 'veda-2',
    name: 'Mutton Biryani',
    description: 'Fragrant basmati rice layered with saffron, spiced mutton, and caramelized onions',
    price: 48.00,
    category: 'Mains',
    spiceLevel: 3,
    image: '/images/veda/lamb-biryani.png'
  },
  {
    id: 'veda-3',
    name: 'Tandoori Prawns',
    description: 'Succulent prawns marinated in yogurt and spices, cooked in a clay tandoor',
    price: 55.00,
    category: 'Tandoor',
    spiceLevel: 3,
    image: 'https://images.pexels.com/photos/1510682/pexels-photo-1510682.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-4',
    name: 'Aloo Tikki Chaat',
    description: 'Crispy potato patties topped with yogurt, chutneys, and aromatic spices',
    price: 22.00,
    category: 'Appetizers',
    spiceLevel: 2,
    image: 'https://images.pexels.com/photos/6135418/pexels-photo-6135418.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-5',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings soaked in cardamom-rose syrup, served warm',
    price: 18.00,
    category: 'Desserts',
    spiceLevel: 0,
    image: 'https://images.pexels.com/photos/14737/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-6',
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in a creamy spinach curry with garlic and ginger',
    price: 32.00,
    category: 'Vegetarian',
    spiceLevel: 2,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-7',
    name: 'Garlic Naan',
    description: 'Fresh-baked flatbread infused with roasted garlic and brushed with ghee',
    price: 10.00,
    category: 'Breads',
    spiceLevel: 0,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-8',
    name: 'Lassi (Mango or Rose)',
    description: 'Creamy yogurt drink blended with fresh mango pulp or rose essence',
    price: 15.00,
    category: 'Beverages',
    spiceLevel: 0,
    image: 'https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-9',
    name: 'Lamb Rogan Josh',
    description: 'Slow-cooked lamb in a fragrant curry with cardamom, cloves, and Kashmiri chilies',
    price: 45.00,
    category: 'Mains',
    spiceLevel: 3,
    image: '/images/veda/lamb-biryani.png'
  },
  {
    id: 'veda-10',
    name: 'Samosa Platter',
    description: 'Crispy pastries filled with spiced potatoes, peas, and aromatic herbs',
    price: 20.00,
    category: 'Appetizers',
    spiceLevel: 2,
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-11',
    name: 'Malai Kofta',
    description: 'Cottage cheese and potato dumplings in a rich cashew and cream gravy',
    price: 36.00,
    category: 'Vegetarian',
    spiceLevel: 1,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'veda-12',
    name: 'Masala Chai',
    description: 'Traditional spiced tea brewed with cardamom, ginger, cinnamon, and milk',
    price: 12.00,
    category: 'Beverages',
    spiceLevel: 0,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const categories = ['All', 'Mains', 'Tandoor', 'Vegetarian', 'Breads', 'Appetizers', 'Desserts', 'Beverages'];

export const Veda = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart, getCartByRestaurant, updateQuantity, removeFromCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const cartItems = getCartByRestaurant('veda');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: 'veda'
    });

    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  const filteredMenu = selectedCategory === 'All'
    ? vedaMenu
    : vedaMenu.filter(item => item.category === selectedCategory);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const sst = subtotal * 0.06;
  const deliveryFee = subtotal > 150 ? 0 : 8;
  const total = subtotal + sst + deliveryFee;

  const bodyBackgroundStyle = {
    backgroundImage: 'linear-gradient(rgba(91, 33, 182, 0.75), rgba(76, 29, 149, 0.85)), url(/images/veda/veda-pattern.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };

  return (
    <div className="min-h-screen text-white relative" style={bodyBackgroundStyle}>
      <FloatingMandala />
      <header className="sticky top-0 z-40 bg-purple-800 border-b border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300"
            >
              <Home size={28} />
              <span className="text-sm font-semibold">HUB</span>
            </button>

            <div>
              <h1 className="text-3xl font-bold text-yellow-400">VEDA</h1>
              <p className="text-xs text-yellow-200">The Art of Spice</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-3"
          >
            <ShoppingCart size={24} />
            <span>CART</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/veda/veda-hero_1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/60 to-purple-900/80" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mb-4 drop-shadow-2xl">
            VEDA
          </h1>
          <p className="text-2xl md:text-3xl text-yellow-200 mb-6 drop-shadow-lg">
            The Art of Spice
          </p>
          <p className="text-lg md:text-xl text-white drop-shadow-lg max-w-2xl mx-auto">
            Journey through ancient culinary traditions where aromatic spices dance with mystical flavors
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-yellow-400 mb-4">About VEDA</h2>
            <p className="text-lg text-white max-w-3xl mx-auto">
              Experience authentic Indian cuisine crafted with traditional recipes and the finest spices.
              Each dish tells a story of centuries-old culinary heritage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-purple-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-yellow-400 mb-4">Royal Menu</h2>
            <p className="text-lg text-white">
              Crafted with centuries-old recipes and the finest spices
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white'
                    : 'bg-purple-700 text-white hover:bg-purple-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item, index) => (
              <div key={item.id} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform" />

                <div
                  className="relative bg-teal-900/80 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-amber-500/40 group-hover:border-amber-400 shadow-2xl transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-amber-500/20"
                  style={{ transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)` }}
                >
                  <div className="aspect-[4/3] bg-teal-950 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 bg-gradient-to-b from-teal-900 to-teal-950">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-yellow-500 flex-1">
                        {item.name}
                      </h3>
                    {item.spiceLevel && item.spiceLevel > 0 && (
                      <div className="flex gap-1 ml-2">
                        {[...Array(item.spiceLevel)].map((_, i) => (
                          <Flame key={i} size={14} className="text-orange-500" />
                        ))}
                      </div>
                    )}
                  </div>

                    <p className="text-purple-200 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-teal-700">
                      <span className="text-3xl font-bold text-amber-400">
                        RM {item.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`px-5 py-2 font-semibold rounded transition-all duration-300 ${
                          addedItems.has(item.id)
                            ? 'bg-green-600 text-white border-2 border-green-600'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-purple-900 hover:from-amber-400 hover:to-amber-500 shadow-lg'
                        }`}
                      >
                        {addedItems.has(item.id) ? 'ADDED' : 'ADD'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-yellow-400 mb-4">Gallery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-square bg-purple-700 rounded-lg overflow-hidden">
              <img
                src="/images/veda/veda-hero.png"
                alt="VEDA Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-purple-700 rounded-lg overflow-hidden">
              <img
                src="/images/veda/butter-chicken.png"
                alt="Butter Chicken"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-purple-700 rounded-lg overflow-hidden">
              <img
                src="/images/veda/lamb-biryani.png"
                alt="Lamb Biryani"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-purple-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-yellow-400 mb-4">Book a Table</h2>
          <p className="text-lg text-white mb-8">
            Reserve your table for an unforgettable dining experience
          </p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg">
            MAKE RESERVATION
          </button>
        </div>
      </section>

      <section className="py-16 px-6 bg-purple-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-yellow-400 mb-4">Contact Us</h2>
          <div className="text-white space-y-2">
            <p className="text-lg">123 Spice Street, Kuala Lumpur</p>
            <p className="text-lg">Phone: +60 3-1234-5678</p>
            <p className="text-lg">Email: info@veda.my</p>
            <p className="text-lg">Hours: Daily 11AM - 11PM</p>
          </div>
        </div>
      </section>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-purple-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden border-2 border-yellow-400"
          >
            <div className="p-6 border-b border-purple-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-yellow-400">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-yellow-400"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {cartItems.length === 0 ? (
                <p className="text-center text-white py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-purple-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-yellow-400">{item.name}</h3>
                          <p className="text-white text-sm">RM {item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-purple-600 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 rounded bg-purple-500 hover:bg-purple-400 flex items-center justify-center"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold text-yellow-400">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-purple-500 hover:bg-purple-400 flex items-center justify-center"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-yellow-400">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-purple-700">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-white">
                    <span>Subtotal</span>
                    <span>RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>SST (6%)</span>
                    <span>RM {sst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `RM ${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-yellow-400 pt-2 border-t border-purple-700">
                    <span>Total</span>
                    <span>RM {total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-lg font-bold text-lg"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems.map(item => {
          const menuItem = vedaMenu.find(m => m.id === item.id);
          return {
            ...item,
            image: menuItem?.image
          };
        })}
        onSuccess={() => {
          setIsCheckoutOpen(false);
          navigate('/');
        }}
      />
    </div>
  );
};
