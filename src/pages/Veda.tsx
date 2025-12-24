import { useState, useEffect } from 'react';
import { ShoppingCart, Flame, X, Minus, Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';
import { FloatingMandala } from '../components/Veda/FloatingMandala';
import { FloatingFNBIcons } from '../components/FloatingFNBIcons';
import { CommunicationHUD } from '../components/CommunicationHUD';
import { useCommunication } from '../context/CommunicationContext';
import { vedaMenu, categories, MenuItem } from '../data/veda-menu';
import { ImagePreloader } from '../components/ImagePreloader';
import { OptimizedImage } from '../components/OptimizedImage';
import { motion } from 'framer-motion';

export const Veda = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart, getCartByRestaurant, updateQuantity, removeFromCart } = useCart();
  const { openHUD } = useCommunication();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const cartItems = getCartByRestaurant('veda');
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

  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: "url('/images/veda/veda-pattern_1.png')",
        backgroundSize: '500px',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#4c1d95'
      }}
    >
      <ImagePreloader images={[
        '/images/veda/veda-hero.png',
        '/images/veda/veda-pattern_1.png'
      ]} />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-900/50 to-purple-900/60" style={{ pointerEvents: 'none' }} />

      <FloatingMandala />
      <FloatingFNBIcons />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-16 right-6 z-50"
      >
        <img
          src="/images/norvan_logo_only.svg"
          alt="Norvan Logo"
          className="w-12 h-12 md:w-16 md:h-16 opacity-80 hover:opacity-100 transition-opacity"
        />
      </motion.div>

      <header className="sticky top-0 z-40 bg-purple-900/95 backdrop-blur-xl border-b-2 border-yellow-400/40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white text-xs sm:text-sm font-medium transition-colors hover:underline"
            >
              ← Back to NorWeb
            </button>

            <div>
              <h1 className="text-4xl font-serif font-bold text-yellow-400 tracking-wide">VEDA</h1>
              <p className="text-xs text-yellow-200 tracking-widest">The Art of Spice</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openHUD('RESTAURANT', 'CONTEXT: USER_SELECTED_VEDA', 'VEDA')}
              className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:via-amber-400 hover:to-orange-500 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(251,146,60,0.6),0_0_40px_rgba(251,146,60,0.4),0_0_60px_rgba(251,146,60,0.2)] hover:shadow-[0_0_30px_rgba(251,146,60,0.8),0_0_60px_rgba(251,146,60,0.6),0_0_90px_rgba(251,146,60,0.4)] animate-pulse"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <Sparkles size={20} />
              <span className="hidden md:inline">Activate Free Demo</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-amber-500 hover:bg-amber-600 text-purple-950 px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all shadow-xl hover:shadow-amber-500/30"
            >
              <ShoppingCart size={24} />
              <span>CART</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/veda/veda-hero.png"
            alt="Veda Restaurant Interior"
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-purple-900/50 to-purple-900/70" />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <h1 className="text-7xl md:text-9xl font-serif font-bold text-yellow-400 mb-6 drop-shadow-2xl tracking-wider">
            VEDA
          </h1>
          <p className="text-3xl md:text-4xl font-serif text-amber-300 mb-8 drop-shadow-xl tracking-wide">
            The Art of Spice
          </p>
          <p className="text-xl md:text-2xl text-white drop-shadow-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Journey through ancient culinary traditions where aromatic spices dance with mystical flavors
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: document.getElementById('menu')?.offsetTop || window.innerHeight, behavior: 'smooth' })}
              className="bg-amber-500 hover:bg-amber-600 text-purple-950 px-10 py-4 rounded-xl font-bold text-lg transition-colors shadow-xl hover:shadow-amber-500/30"
            >
              Explore Menu
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openHUD('RESTAURANT', 'CONTEXT: USER_SELECTED_VEDA', 'VEDA')}
              className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:via-amber-400 hover:to-orange-500 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(251,146,60,0.6),0_0_40px_rgba(251,146,60,0.4),0_0_60px_rgba(251,146,60,0.2)] hover:shadow-[0_0_30px_rgba(251,146,60,0.8),0_0_60px_rgba(251,146,60,0.6),0_0_90px_rgba(251,146,60,0.4)] animate-pulse"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              <Sparkles size={20} />
              Activate Free Demo
            </motion.button>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/veda/veda-bg-about.png"
            alt="Background"
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-purple-950/40" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-serif font-bold text-yellow-400 mb-6 drop-shadow-xl">About VEDA</h2>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
              Experience authentic Indian cuisine crafted with traditional recipes passed down through generations.
              Each dish tells a story of centuries-old culinary heritage, where every spice is carefully selected
              to create a symphony of flavors that transport you to the royal courts of ancient India.
            </p>
          </div>
        </div>
      </section>

      <section
        id="menu"
        className="relative py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: "url('/images/veda/veda-pattern_1.png')",
          backgroundSize: '500px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/45 via-purple-900/40 to-purple-900/45" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-bold text-yellow-400 mb-6 drop-shadow-xl">Royal Menu</h2>
            <p className="text-xl text-white drop-shadow-lg">
              Crafted with centuries-old recipes and the finest spices
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-7 py-3 rounded-xl font-bold text-sm tracking-wider transition-all shadow-lg ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-purple-950 scale-105 shadow-amber-500/40'
                    : 'bg-purple-800/80 text-yellow-200 hover:bg-purple-700 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredMenu.map((item, index) => (
              <div key={item.id} className="relative group">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-2xl transform group-hover:rotate-3 transition-all duration-300"
                  style={{ transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)` }}
                />

                <div
                  className="relative bg-gradient-to-br from-teal-900/90 to-teal-950/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-amber-500/40 group-hover:border-amber-400 shadow-2xl transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-amber-500/30"
                  style={{
                    transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)`,
                  }}
                >
                  <div className="aspect-[4/5] bg-purple-950/80 overflow-hidden relative flex items-center justify-center">
                    <OptimizedImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                      objectPosition="center"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 bg-gradient-to-b from-teal-900/95 to-teal-950/95">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-yellow-400 flex-1 tracking-wide">
                        {item.name}
                      </h3>
                      {item.spiceLevel && item.spiceLevel > 0 && (
                        <div className="flex gap-1 ml-2">
                          {[...Array(item.spiceLevel)].map((_, i) => (
                            <Flame key={i} size={16} className="text-orange-500" />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-purple-200 text-sm mb-5 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-teal-800/50">
                      <span className="text-3xl font-bold text-amber-400">
                        RM {item.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`px-6 py-2.5 font-bold rounded-lg transition-all duration-300 ${
                          addedItems.has(item.id)
                            ? 'bg-green-600 text-white border-2 border-green-600 scale-105'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-purple-950 hover:from-amber-400 hover:to-amber-500 shadow-lg hover:shadow-amber-500/30 hover:scale-105'
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

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/veda/veda-bg-gallery.png"
            alt="Background"
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-teal-900/60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-bold text-yellow-400 mb-4 drop-shadow-xl">Gallery</h2>
            <p className="text-xl text-white drop-shadow-lg">Glimpses of our royal heritage and culinary artistry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: '/images/veda/veda-hero.png', label: 'Royal Dining Hall' },
              { src: '/images/veda/veda-gallery-arch.png', label: 'Mughal Archway' },
              { src: '/images/veda/veda-gallery-brass.png', label: 'Brass Artifacts' },
              { src: '/images/veda/butter-chicken.png', label: 'Signature Butter Chicken' },
              { src: '/images/veda/lamb-biryani.png', label: 'Royal Lamb Biryani' }
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-purple-900/40 rounded-2xl overflow-hidden border-2 border-amber-500/40 hover:border-amber-400 transition-all shadow-2xl hover:shadow-amber-500/30 hover:-translate-y-2 group ${
                  i < 3 ? 'aspect-square' : 'aspect-[4/3]'
                }`}
              >
                <OptimizedImage
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-xl font-bold text-yellow-400 drop-shadow-lg">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/veda/veda-bg-contact.png"
            alt="Background"
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-purple-900/80" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-bold text-yellow-400 mb-6 drop-shadow-xl">
              Reserve Your <span className="text-amber-400">Table</span>
            </h2>
            <p className="text-white text-xl drop-shadow-lg">
              Experience the luxury of ancient Indian culinary traditions
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-900/50 to-purple-900/50 backdrop-blur-2xl border-2 border-yellow-400/40 rounded-3xl p-12 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-yellow-200 mb-2 font-bold text-sm tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-purple-950/90 border-2 border-amber-600/40 rounded-xl text-yellow-100 placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-yellow-200 mb-2 font-bold text-sm tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-purple-950/90 border-2 border-amber-600/40 rounded-xl text-yellow-100 placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                    placeholder="+60 12-345 6789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-yellow-200 mb-2 font-bold text-sm tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-purple-950/90 border-2 border-amber-600/40 rounded-xl text-yellow-100 placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-yellow-200 mb-2 font-bold text-sm tracking-wider">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-6 py-4 bg-purple-950/90 border-2 border-amber-600/40 rounded-xl text-yellow-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-yellow-200 mb-2 font-bold text-sm tracking-wider">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-6 py-4 bg-purple-950/90 border-2 border-amber-600/40 rounded-xl text-yellow-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                  />
                </div>

                <div>
                  <label className="block text-yellow-200 mb-2 font-bold text-sm tracking-wider">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-6 py-4 bg-purple-950/90 border-2 border-amber-600/40 rounded-xl text-yellow-100 focus:border-amber-400 focus:outline-none transition-all focus:shadow-lg focus:shadow-amber-500/20"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-yellow-200 mb-2 font-bold text-sm tracking-wider">
                  Special Request
                </label>
                <textarea
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  rows={4}
                  className="w-full px-6 py-4 bg-purple-950/90 border-2 border-amber-600/40 rounded-xl text-yellow-100 placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-all resize-y focus:shadow-lg focus:shadow-amber-500/20"
                  placeholder="Any allergies, dietary restrictions, or special occasion?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-purple-950 font-bold text-lg rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl hover:shadow-amber-500/40 hover:scale-[1.02]"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-purple-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-6xl font-serif font-bold text-yellow-400 mb-8">Contact Us</h2>
          <div className="text-white space-y-3 text-lg">
            <p>123 Spice Street, Kuala Lumpur</p>
            <p>Phone: +60 3-1234-5678</p>
            <p>Email: info@veda.my</p>
            <p>Hours: Daily 11AM - 11PM</p>
          </div>
        </div>
      </section>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-purple-900 rounded-t-2xl md:rounded-2xl max-w-md w-full max-h-[90vh] md:max-h-[80vh] flex flex-col border-2 border-yellow-400 shadow-2xl"
          >
            <div className="p-6 border-b border-purple-800 flex items-center justify-between bg-purple-800 shrink-0">
              <h2 className="text-2xl font-bold text-yellow-400">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {cartItems.length === 0 ? (
                <p className="text-center text-white py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-purple-800 rounded-xl p-4 border border-yellow-400/20">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-yellow-400">{item.name}</h3>
                          <p className="text-white text-sm">RM {item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-purple-700 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 rounded bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold text-yellow-400">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors"
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
              <div className="p-6 border-t border-purple-800 bg-purple-800 shrink-0">
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
                  className="w-full bg-amber-500 hover:bg-amber-600 text-purple-950 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-amber-500/40"
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

      <CommunicationHUD />
    </div>
  );
};
