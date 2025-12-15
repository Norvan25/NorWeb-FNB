import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Flame, X, Minus, Plus, ChevronDown, Home, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { rimbaMenu, categories, MenuItem } from '../data/rimba-menu';
import CheckoutModal from '../components/CheckoutModal';
import { FireflyField } from '../components/Rimba/FireflyField';
import { FloatingFNBIcons } from '../components/FloatingFNBIcons';
import { CommunicationHUD } from '../components/CommunicationHUD';
import { useCommunication } from '../context/CommunicationContext';
import { ImagePreloader } from '../components/ImagePreloader';
import { OptimizedImage } from '../components/OptimizedImage';

export const Rimba = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart, getCartByRestaurant, updateQuantity, removeFromCart, clearCart } = useCart();
  const { openHUD } = useCommunication();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const cartItems = getCartByRestaurant('rimba');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: 'rimba'
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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const sst = subtotal * 0.06;
  const deliveryFee = subtotal > 150 ? 0 : 8;
  const total = subtotal + sst + deliveryFee;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'menu', 'gallery', 'reservations', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequest: ''
  });

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ImagePreloader images={[
        '/images/rimba/rimba-hero.png',
        '/images/rimba/rimba-pattern.png'
      ]} />
      <FireflyField />
      <FloatingFNBIcons />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <img
          src="/images/norvan_logo_only.svg"
          alt="Norvan Logo"
          className="w-12 h-12 md:w-16 md:h-16 opacity-80 hover:opacity-100 transition-opacity"
        />
      </motion.div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f0a]/95 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors group"
            >
              <Home size={28} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold tracking-wider hidden sm:block">HUB</span>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <h1 className="text-3xl font-serif font-bold tracking-tight">
                <span className="text-[#D4AF37]">RIMBA</span>
              </h1>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Warisan Malay</p>
            </motion.div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Menu' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'reservations', label: 'Reservations' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium tracking-wide transition-colors ${
                  activeSection === item.id ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D4AF37]"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#D4AF37]/20 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-[#D4AF37] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              >
                {cartItems.length}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/rimba/rimba-hero.png"
            alt="Rimba Restaurant Interior"
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-neutral-900" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl mb-6"
            >
              🌿
            </motion.div>

            <h1 className="text-7xl md:text-9xl font-serif font-bold mb-6 tracking-tight leading-none">
              Warisan <span className="text-[#D4AF37]">Rimba</span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px w-64 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"
            />

            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light tracking-wide">
              Authentic Malay Fine Dining
            </p>

            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
              Where ancient rainforest traditions meet contemporary culinary artistry.
              Experience the heritage of Malaysian cuisine in every bite.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('menu')}
                className="bg-[#D4AF37] text-[#0a0f0a] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#c4a02f] transition-colors"
              >
                Explore Menu
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openHUD('RESTAURANT', 'CONTEXT: USER_SELECTED_RIMBA', 'RIMBA')}
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-green-500/40"
              >
                <Leaf size={20} />
                Talk to Aiman
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
          onClick={() => scrollToSection('menu')}
        >
          <ChevronDown className="text-[#D4AF37] drop-shadow-lg" size={40} />
        </motion.div>
      </section>

      <section
        id="menu"
        className="py-24 px-6 bg-fixed bg-cover relative"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(5, 20, 10, 0.80), rgba(0, 0, 0, 0.90)), url("/images/rimba/rimba-pattern.png")'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20 relative z-10"
          >
            <h2 className="text-6xl font-serif font-bold mb-4 text-amber-400">
              Our <span className="text-[#D4AF37]">Menu</span>
            </h2>
            <p className="text-gray-200 text-lg">
              A journey through traditional Malay gastronomy
            </p>
          </motion.div>

          {(['main', 'dessert', 'beverage'] as const).map((category) => {
            const categoryItems = rimbaMenu.filter(item => item.category === category);

            return (
              <div key={category} className="mb-20 relative z-10">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-10 relative z-10"
                >
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-amber-400 mb-2">
                    {categories[category].name}
                  </h3>
                  <p className="text-gray-400 text-sm font-serif tracking-wide">
                    {categories[category].malay}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {categoryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className={`group bg-gradient-to-br from-[#064e3b]/30 to-[#292524]/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all shadow-xl relative z-10 ${
                        index % 3 === 1 ? 'md:mt-8' : ''
                      } ${index % 3 === 2 ? 'md:mt-16' : ''}`}
                    >
                      <div className="relative h-48 overflow-hidden bg-stone-900/50">
                        <OptimizedImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          priority={false}
                          onError={(e) => {
                            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23292524'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='24' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle'%3E${item.name}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {item.spiceLevel && (
                          <div className="absolute top-3 right-3 flex gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                            {Array.from({ length: item.spiceLevel }).map((_, i) => (
                              <Flame key={i} size={14} className="text-red-500" />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h4 className="text-2xl font-serif font-bold mb-2 text-white">
                          {item.name}
                        </h4>

                        <p className="text-gray-200 text-sm mb-4 leading-relaxed font-light">
                          {item.description}
                        </p>

                        <div className="flex justify-between items-center pt-4 border-t border-[#D4AF37]/10">
                          <span className="text-3xl font-bold text-[#D4AF37]">
                            RM {item.price.toFixed(2)}
                          </span>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(item)}
                            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                              addedItems.has(item.id)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#D4AF37] text-[#0a0f0a] hover:bg-[#c4a02f]'
                            }`}
                          >
                            {addedItems.has(item.id) ? (
                              <>
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  ✓
                                </motion.div>
                                Added
                              </>
                            ) : (
                              <>
                                <Plus size={16} />
                                Add to Cart
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="gallery"
        className="py-24 px-6 bg-fixed bg-cover relative"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(5, 20, 10, 0.90)), url("/images/rimba/rimba-pattern.png")'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-serif font-bold mb-4 text-amber-400">
              The <span className="text-[#D4AF37]">Experience</span>
            </h2>
            <p className="text-gray-200 text-lg">
              Immerse yourself in our jungle-inspired ambiance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { src: '/images/rimba/rimba-gallery-hall.png', label: 'Main Dining Hall' },
              { src: '/images/rimba/rimba-gallery-kitchen.png', label: 'Open Kitchen' },
              { src: '/images/rimba/rimba-gallery-balcony.png', label: 'Private Balcony' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-[#064e3b]/30 to-[#292524]/30 backdrop-blur-md border-2 border-white/10 hover:border-[#D4AF37]/70 transition-all shadow-2xl ${
                  i === 2 ? 'md:col-span-2 md:aspect-[21/9]' : ''
                }`}
              >
                <OptimizedImage
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  priority={false}
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='800' height='500' fill='%23064e3b'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='28' fill='%23D4AF37' text-anchor='middle' dominant-baseline='middle'%3E${item.label}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-serif font-bold text-[#D4AF37]">{item.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="reservations"
        className="py-24 px-6 bg-fixed bg-cover relative"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(5, 20, 10, 0.80), rgba(0, 0, 0, 0.90)), url("/images/rimba/rimba-pattern.png")'
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-amber-400">
              Reserve Your <span className="text-[#D4AF37]">Table</span>
            </h2>
            <p className="text-gray-200 text-lg">
              Experience the luxury of Malaysian heritage cuisine
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#064e3b]/30 to-[#292524]/30 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative z-10"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-200 mb-2 font-semibold text-sm tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-stone-900/80 border-2 border-amber-900/30 rounded-xl text-amber-100 placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-200 mb-2 font-semibold text-sm tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-stone-900/80 border-2 border-amber-900/30 rounded-xl text-amber-100 placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                    placeholder="+60 12-345 6789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-200 mb-2 font-semibold text-sm tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-stone-900/80 border-2 border-amber-900/30 rounded-xl text-amber-100 placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-200 mb-2 font-semibold text-sm tracking-wide">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-6 py-4 bg-stone-900/80 border-2 border-amber-900/30 rounded-xl text-amber-100 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-200 mb-2 font-semibold text-sm tracking-wide">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-6 py-4 bg-stone-900/80 border-2 border-amber-900/30 rounded-xl text-amber-100 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-200 mb-2 font-semibold text-sm tracking-wide">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-6 py-4 bg-stone-900/80 border-2 border-amber-900/30 rounded-xl text-amber-100 focus:border-amber-500 focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-200 mb-2 font-semibold text-sm tracking-wide">
                  Special Request
                </label>
                <textarea
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  rows={3}
                  className="w-full px-6 py-4 bg-stone-900/80 border-2 border-amber-900/30 rounded-xl text-amber-100 placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors resize-y"
                  placeholder="Any allergies, dietary restrictions, or special occasion?"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-[#D4AF37] text-[#0a0f0a] font-bold text-lg rounded-xl hover:bg-[#c4a02f] transition-colors"
              >
                Confirm Reservation
              </motion.button>
            </form>
          </motion.div>

          <p className="text-center text-gray-400 text-sm mt-6 relative z-10">
            For groups of 10 or more, please contact us at <span className="text-[#D4AF37]">reservations@rimba.my</span>
          </p>
        </div>
      </section>

      <section
        id="contact"
        className="py-24 px-6 bg-fixed bg-cover relative"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.98)), url("/images/rimba/rimba-pattern.png")'
        }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-6">🌿</div>
            <h3 className="text-4xl font-serif font-bold mb-4 text-amber-400">RIMBA</h3>
            <p className="text-gray-200 mb-8">
              Warisan Rimba &mdash; Authentic Malay Fine Dining
            </p>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>123 Heritage Lane, Kuala Lumpur, Malaysia</p>
              <p>+60 3-2345 6789 | info@rimba.my</p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-600 text-xs">
                Part of NorWeb Universal F&B Platform &copy; 2025
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0f0a] border-l border-[#D4AF37]/20 z-50 flex flex-col"
            >
              <div className="p-6 shrink-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-serif font-bold">Your Order</h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-20">🛒</div>
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-6">
                    <div className="space-y-4 pb-6">
                      {cartItems.map(item => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-gradient-to-br from-[#064e3b]/30 to-[#292524]/30 border border-white/10 rounded-xl p-4 backdrop-blur-md"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-serif font-bold text-white mb-1">{item.name}</h4>
                              <p className="text-[#D4AF37] font-bold">RM {item.price.toFixed(2)}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <X size={16} />
                            </motion.button>
                          </div>

                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37]/30"
                            >
                              <Minus size={14} />
                            </motion.button>

                            <span className="w-8 text-center font-bold">{item.quantity}</span>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37]/30"
                            >
                              <Plus size={14} />
                            </motion.button>

                            <span className="ml-auto text-gray-400">
                              RM {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 border-t border-[#D4AF37]/20 bg-[#0a0f0a] shrink-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span>RM {subtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-gray-400">
                        <span>SST (6%)</span>
                        <span>RM {sst.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-gray-400">
                        <span>Delivery</span>
                        <span className={deliveryFee === 0 ? 'text-emerald-500 font-semibold' : ''}>
                          {deliveryFee === 0 ? 'FREE' : `RM ${deliveryFee.toFixed(2)}`}
                        </span>
                      </div>

                      {subtotal > 0 && subtotal <= 150 && (
                        <p className="text-xs text-[#D4AF37]">
                          Add RM {(150 - subtotal).toFixed(2)} more for free delivery!
                        </p>
                      )}

                      <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-[#D4AF37]/20">
                        <span>Total</span>
                        <span className="text-[#D4AF37]">RM {total.toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full py-4 bg-[#D4AF37] text-[#0a0f0a] font-bold text-lg rounded-xl hover:bg-[#c4a02f] transition-colors"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems.map(item => {
          const menuItem = rimbaMenu.find(m => m.id === item.id);
          return {
            ...item,
            image: menuItem?.image
          };
        })}
        onSuccess={() => {
          clearCart('rimba');
          setIsCheckoutOpen(false);
        }}
      />

      <CommunicationHUD />
    </div>
  );
};
