import { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus, Home, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';
import { gustoMenu, categories, MenuItem } from '../data/gusto-menu';

export const Gusto = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart, getCartByRestaurant, updateQuantity, removeFromCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const cartItems = getCartByRestaurant('gusto');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequest: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: 'gusto'
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
    ? gustoMenu
    : gustoMenu.filter(item => item.category === selectedCategory);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const sst = subtotal * 0.06;
  const deliveryFee = subtotal > 150 ? 0 : 8;
  const total = subtotal + sst + deliveryFee;

  return (
    <div className="min-h-screen text-stone-800 bg-stone-50">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <Home size={24} />
              <span className="text-sm font-semibold tracking-wider">HUB</span>
            </button>

            <div>
              <h1 className="text-4xl font-serif font-bold text-stone-700 tracking-wide">GUSTO</h1>
              <p className="text-xs text-stone-500 tracking-widest">La Dolce Vita</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-stone-700 hover:bg-stone-800 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-3 transition-all shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={24} />
            <span>CART</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/gusto/gusto-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-white mb-6 drop-shadow-2xl tracking-wider">
            GUSTO
          </h1>
          <p className="text-3xl md:text-4xl font-serif text-stone-100 drop-shadow-xl tracking-wide">
            La Dolce Vita
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown size={48} className="text-white drop-shadow-2xl" strokeWidth={2.5} />
        </div>
      </section>

      <section
        className="relative py-24 px-6"
        style={{
          backgroundImage: "url('/images/gusto/gusto-bg-about.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl font-serif font-bold text-stone-800 mb-8">About GUSTO</h2>
          <p className="text-xl text-stone-700 leading-relaxed">
            At GUSTO, we celebrate the rustic elegance of authentic Italian cuisine. Each dish is crafted
            with passion, honoring centuries-old traditions while embracing the simple beauty of fresh,
            seasonal ingredients. Experience the warmth of Italian hospitality in every bite.
          </p>
        </div>
      </section>

      <section
        className="relative py-24 px-6"
        style={{
          backgroundImage: "url('/images/gusto/gusto-texture.png')",
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: '400px',
          backgroundColor: '#f9f6f1'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-bold text-stone-700 mb-6">Our Menu</h2>
            <p className="text-xl text-stone-600">
              Authentic flavors from the heart of Italy
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-7 py-3 rounded-lg font-bold text-sm tracking-wider transition-all shadow-md ${
                  selectedCategory === category
                    ? 'bg-stone-700 text-white scale-105 shadow-lg'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-stone-400 transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(181, 101, 29, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div className="aspect-[16/9] bg-stone-100 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-serif font-bold text-stone-800 flex-1">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                    <span className="text-3xl font-serif font-bold text-stone-700">
                      RM {item.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`px-6 py-2.5 font-bold rounded-lg transition-all duration-300 ${
                        addedItems.has(item.id)
                          ? 'bg-green-600 text-white scale-105'
                          : 'bg-stone-700 text-white hover:bg-stone-800 shadow-md hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {addedItems.has(item.id) ? 'ADDED' : 'ADD'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-bold text-stone-700 mb-4">Gallery</h2>
            <p className="text-xl text-stone-600">Rustic charm meets Italian elegance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: '/images/gusto/gusto-gallery-exterior.png', label: 'Tuscan Villa' },
              { src: '/images/gusto/gusto-gallery-wine.png', label: 'Wine Cellar' },
              { src: '/images/gusto/gusto-gallery-dining.png', label: 'Dining Hall' }
            ].map((item, i) => (
              <div
                key={i}
                className="aspect-square bg-stone-200 rounded-xl overflow-hidden border border-stone-300 hover:border-stone-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-2 group"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-24 px-6"
        style={{
          backgroundImage: "url('/images/gusto/gusto-bg-booking.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
              Reserve Your Table
            </h2>
            <p className="text-white text-xl drop-shadow-lg">
              Experience authentic Italian hospitality
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm border border-stone-200 rounded-2xl p-12 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone-700 mb-2 font-bold text-sm tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-2 border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:border-green-700 focus:outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-2 font-bold text-sm tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-2 border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:border-green-700 focus:outline-none transition-all"
                    placeholder="+60 12-345 6789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 mb-2 font-bold text-sm tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white border-2 border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:border-green-700 focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-stone-700 mb-2 font-bold text-sm tracking-wider">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-2 border-stone-300 rounded-lg text-stone-800 focus:border-green-700 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-2 font-bold text-sm tracking-wider">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-2 border-stone-300 rounded-lg text-stone-800 focus:border-green-700 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-2 font-bold text-sm tracking-wider">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-6 py-4 bg-white border-2 border-stone-300 rounded-lg text-stone-800 focus:border-green-700 focus:outline-none transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 mb-2 font-bold text-sm tracking-wider">
                  Special Request
                </label>
                <textarea
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  rows={4}
                  className="w-full px-6 py-4 bg-white border-2 border-stone-300 rounded-lg text-stone-800 placeholder-stone-400 focus:border-green-700 focus:outline-none transition-all resize-y"
                  placeholder="Any dietary preferences or special occasion?"
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: '#55704a' }}
                className="w-full py-5 text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#55704a' }} className="py-20 px-6 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-6xl font-serif font-bold mb-8">Contact Us</h2>
          <div className="space-y-3 text-lg">
            <p>456 Mediterranean Avenue, Kuala Lumpur</p>
            <p>Phone: +60 3-2345-6789</p>
            <p>Email: info@gusto.my</p>
            <p>Hours: Daily 12PM - 10PM</p>
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
            className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden border border-stone-200 shadow-2xl"
          >
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h2 className="text-2xl font-bold text-stone-800">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-stone-600 hover:text-stone-800 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {cartItems.length === 0 ? (
                <p className="text-center text-stone-600 py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-stone-800">{item.name}</h3>
                          <p className="text-stone-600 text-sm">RM {item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white border border-stone-300 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold text-stone-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-stone-800">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-stone-50">
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-stone-700">
                    <span>Subtotal</span>
                    <span>RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>SST (6%)</span>
                    <span>RM {sst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `RM ${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-stone-800 pt-2 border-t border-stone-300">
                    <span>Total</span>
                    <span>RM {total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-stone-700 hover:bg-stone-800 text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
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
          const menuItem = gustoMenu.find(m => m.id === item.id);
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
