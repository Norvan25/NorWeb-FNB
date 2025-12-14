import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, X, Minus, Plus, Flame, ArrowLeft, MessageCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { rougeMenu } from '../data/rouge-menu';
import CheckoutModal from '../components/CheckoutModal';
import { CherryBlossomFall } from '../components/Rouge/CherryBlossomFall';
import { ImagePreloader } from '../components/ImagePreloader';
import { OptimizedImage } from '../components/OptimizedImage';

export const Rouge = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addToCart, getCartByRestaurant, updateQuantity, removeFromCart, clearCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const cartItems = getCartByRestaurant('rouge');
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item: typeof rougeMenu[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: 'rouge',
      quantity: 1,
      image: item.image
    });

    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-stone-50">
      <ImagePreloader images={['/images/rouge/rouge-exterior.png']} />
      <CherryBlossomFall />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-red-950/90 backdrop-blur-xl border-b border-amber-700/30 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-amber-100 hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="font-semibold tracking-wide">BACK</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 bg-clip-text text-transparent" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
            ROUGE
          </h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 border-2 border-amber-600 text-amber-100 hover:bg-amber-600 hover:text-white transition-all duration-300 rounded-none font-semibold tracking-wider"
          >
            <ShoppingCart size={20} className="inline mr-2" />
            CART
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </motion.button>
        </div>
      </motion.header>

      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/rouge/rouge-exterior.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-radial from-black/70 via-black/40 to-transparent blur-2xl" />

            <h1
              className="relative text-8xl md:text-[10rem] font-bold bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 bg-clip-text text-transparent"
              style={{
                fontFamily: "'ZCOOL XiaoWei', serif",
                textShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.6)',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.9))'
              }}
            >
              ROUGE
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-amber-200 tracking-widest mt-6 bg-black/50 backdrop-blur-sm py-3 px-8 inline-block"
            style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}
          >
            Contemporary Chinese Cuisine
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        >
          <ChevronDown className="text-amber-400 drop-shadow-lg" size={40} />
        </motion.div>
      </section>

      <section
        className="relative py-24 px-6"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url('/images/rouge/rouge-wall-2.png')",
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold text-amber-400 mb-4" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
              Imperial Menu
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6" />
            <p className="text-amber-200/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Exquisite dishes crafted with precision, honoring centuries of culinary tradition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rougeMenu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="bg-stone-100/85 backdrop-blur-sm border border-amber-400/20 shadow-2xl shadow-black/30 overflow-hidden group hover:border-amber-500 hover:shadow-amber-500/20 transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                  <OptimizedImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={false}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>

                <div className="p-6 bg-white/90">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-red-900 leading-tight flex-1" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                      {item.name}
                    </h3>
                    {item.spiceLevel && (
                      <div className="flex gap-1 flex-shrink-0 ml-2">
                        {[...Array(item.spiceLevel)].map((_, i) => (
                          <Flame key={i} size={14} className="text-red-600" />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mb-5 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                    <span className="text-3xl font-bold text-amber-700" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                      RM {item.price.toFixed(0)}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(item)}
                      className={`px-5 py-2 font-semibold tracking-wider transition-all duration-300 ${
                        addedItems.has(item.id)
                          ? 'bg-green-600 text-white border-2 border-green-600'
                          : 'border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white'
                      }`}
                    >
                      {addedItems.has(item.id) ? 'ADDED' : 'ADD'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(20, 10, 0, 0.85), rgba(0, 0, 0, 0.90)), url('/images/rouge/rouge-wall-2.png')",
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.15, x: 0 }}
          viewport={{ once: true }}
          className="absolute left-10 top-20 text-[200px] font-bold text-amber-500/10 pointer-events-none"
          style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}
        >
          龍
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 0.15, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="absolute right-10 bottom-20 text-[200px] font-bold text-amber-500/10 pointer-events-none"
          style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}
        >
          福
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-4 text-amber-400" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
              The <span className="text-amber-300">Gallery</span>
            </h2>
            <p className="text-amber-200/90 text-lg">
              A glimpse into our imperial dining experience
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                { src: '/images/rouge/rouge-gallery-private.png', label: 'Private Dining Room', subtitle: '雅座 - Elegant Seating' },
                { src: '/images/rouge/rouge-gallery-bar.png', label: 'Imperial Bar', subtitle: '酒吧 - Spirits & Cocktails' },
                { src: '/images/rouge/rouge-gallery-setting.png', label: 'Table Setting', subtitle: '摆设 - Fine Details' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="relative flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] aspect-[16/9] overflow-hidden border-4 border-amber-500/30 hover:border-amber-400 transition-all shadow-2xl shadow-black/60 snap-center"
                >
                  <OptimizedImage
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    priority={false}
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'%3E%3Crect width='1200' height='675' fill='%23991b1b'/%3E%3Ctext x='50%25' y='45%25' font-family='serif' font-size='36' fill='%23fbbf24' text-anchor='middle' dominant-baseline='middle'%3E${item.label}%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='serif' font-size='24' fill='%23fcd34d' text-anchor='middle' dominant-baseline='middle'%3E${item.subtitle}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                      {item.label}
                    </h3>
                    <p className="text-amber-200 text-lg" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="absolute top-6 right-6 bg-amber-500/20 backdrop-blur-sm border border-amber-400/50 px-4 py-2">
                    <span className="text-amber-200 font-bold text-sm tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-4 text-amber-200/60 text-sm tracking-wider">
              ← Scroll to explore →
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{
          backgroundImage: "url('/images/rouge/rouge-wall-3.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75" />

        <div className="max-w-4xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-6xl md:text-7xl font-bold text-amber-400 mb-6" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
              About Rouge
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-20 space-y-6 text-amber-100 text-lg leading-relaxed"
          >
            <p className="text-xl md:text-2xl text-center font-light text-amber-200">
              Where tradition meets contemporary excellence
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/30 p-8">
                <h3 className="text-2xl font-bold text-amber-400 mb-4" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                  Our Heritage
                </h3>
                <p className="text-amber-200/90 leading-relaxed">
                  Rouge draws inspiration from imperial Chinese dining traditions, reimagined for the modern palate. Each dish is a harmonious balance of time-honored techniques and innovative culinary artistry.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-amber-500/30 p-8">
                <h3 className="text-2xl font-bold text-amber-400 mb-4" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                  Our Philosophy
                </h3>
                <p className="text-amber-200/90 leading-relaxed">
                  We believe in the power of exceptional ingredients, meticulous preparation, and the creation of memorable dining experiences that honor the rich tapestry of Chinese gastronomy.
                </p>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-amber-500/30 p-8 mt-8">
              <h3 className="text-2xl font-bold text-amber-400 mb-4 text-center" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                Award-Winning Excellence
              </h3>
              <p className="text-amber-200/90 leading-relaxed text-center">
                Recognized with multiple culinary accolades, Rouge continues to set the standard for contemporary Chinese cuisine in Malaysia. Our commitment to quality and innovation has earned us a place among the nation's most celebrated dining destinations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <section className="relative py-24 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/rouge/rouge-wall-1.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            y: backgroundY
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/75" />

        <div className="max-w-2xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-stone-950/80 backdrop-blur-md border-2 border-amber-500/30 p-8 md:p-12 shadow-2xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-5xl md:text-6xl font-bold text-amber-400 mb-4" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                Reserve Your Seat
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
              <p className="text-amber-200 text-lg">
                Secure your table in our private dining room
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-300 mb-2 text-sm font-semibold tracking-wider">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 px-2 py-3 text-white outline-none transition-colors placeholder-amber-200/30"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-2 text-sm font-semibold tracking-wider">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 px-2 py-3 text-white outline-none transition-colors placeholder-amber-200/30"
                    placeholder="+60 12-345 6789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-amber-300 mb-2 text-sm font-semibold tracking-wider">
                    DATE
                  </label>
                  <input
                    type="date"
                    className="w-full bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 px-2 py-3 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-2 text-sm font-semibold tracking-wider">
                    TIME
                  </label>
                  <input
                    type="time"
                    className="w-full bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 px-2 py-3 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-2 text-sm font-semibold tracking-wider">
                    GUESTS
                  </label>
                  <select className="w-full bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 px-2 py-3 text-white outline-none transition-colors">
                    <option className="bg-stone-900">1 Guest</option>
                    <option className="bg-stone-900">2 Guests</option>
                    <option className="bg-stone-900">3 Guests</option>
                    <option className="bg-stone-900">4 Guests</option>
                    <option className="bg-stone-900">5+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-amber-300 mb-2 text-sm font-semibold tracking-wider">
                  SPECIAL REQUESTS
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 px-2 py-3 text-white outline-none transition-colors resize-none placeholder-amber-200/30"
                  placeholder="Dietary requirements or special occasions"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold py-4 tracking-widest transition-all duration-300 text-lg border-2 border-amber-500 shadow-lg shadow-amber-600/20"
              >
                CONFIRM RESERVATION
              </motion.button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-10 border-t-2 border-amber-500/20">
              <div className="text-center">
                <h3 className="text-xs font-bold text-amber-400 mb-2 tracking-wider">LOCATION</h3>
                <p className="text-amber-200 text-sm">Pavilion KL, Level 6</p>
              </div>
              <div className="text-center">
                <h3 className="text-xs font-bold text-amber-400 mb-2 tracking-wider">HOURS</h3>
                <p className="text-amber-200 text-sm">11:30 AM - 11:00 PM</p>
              </div>
              <div className="text-center">
                <h3 className="text-xs font-bold text-amber-400 mb-2 tracking-wider">CONTACT</h3>
                <p className="text-amber-200 text-sm">+60 3-2118 8822</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-gradient-to-br from-amber-600 to-amber-700 rounded-full p-4 shadow-2xl border-2 border-amber-400">
            <MessageCircle size={28} className="text-white" />
          </div>
        </motion.button>
        <div className="absolute -top-2 -left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
          AI
        </div>
        <p className="text-center text-xs text-stone-700 font-semibold mt-2 whitespace-nowrap">
          NorWeb Intelligence
        </p>
      </motion.div>

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
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-stone-50 border-l-4 border-amber-700 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b-2 border-amber-700/30 flex items-center justify-between bg-red-950">
                <h3 className="text-2xl font-bold text-amber-100" style={{ fontFamily: "'ZCOOL XiaoWei', serif" }}>
                  Your Order
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-amber-100"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={48} className="mx-auto text-stone-400 mb-4" />
                    <p className="text-stone-600">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border-2 border-stone-200 p-4 flex items-center gap-4 shadow-sm"
                      >
                        {item.image && (
                          <OptimizedImage
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover"
                            priority={false}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}

                        <div className="flex-1">
                          <h4 className="font-bold text-red-900 mb-1">{item.name}</h4>
                          <p className="text-amber-700 font-bold">RM {item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition-colors"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-8 text-center font-bold text-red-900">{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t-2 border-amber-700/30 p-6 bg-white">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>RM {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>SST (6%)</span>
                      <span>RM {(subtotal * 0.06).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery</span>
                      <span>RM 8.00</span>
                    </div>
                    <div className="pt-2 border-t-2 border-stone-300 flex justify-between text-red-900 text-xl font-bold">
                      <span>TOTAL</span>
                      <span className="text-amber-700">RM {(subtotal * 1.06 + 8).toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-bold text-lg tracking-wider transition-colors shadow-lg"
                  >
                    PROCEED TO CHECKOUT
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems.map(item => {
          const menuItem = rougeMenu.find(m => m.id === item.id);
          return {
            ...item,
            image: menuItem?.image
          };
        })}
        onSuccess={() => {
          clearCart('rouge');
          setIsCheckoutOpen(false);
        }}
      />
    </div>
  );
};
