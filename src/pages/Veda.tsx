import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Flame, X, Minus, Plus, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { vedaMenu, categories, MenuItem } from '../data/veda-menu';
import CheckoutModal from '../components/CheckoutModal';

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

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-purple-800/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Home size={28} />
              <span className="text-sm font-semibold tracking-wider hidden sm:block">HUB</span>
            </motion.button>

            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-400">VEDA</span>
              </h1>
              <p className="text-[10px] text-purple-300 tracking-widest uppercase">The Art of Spice</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-xl transition-all flex items-center gap-3"
          >
            <ShoppingCart size={24} />
            <span className="hidden sm:inline">CART</span>
            {cartItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-amber-500 text-purple-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              >
                {cartItems.length}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.header>

      <section className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950">
        <div className="text-center max-w-4xl relative z-10 pt-20">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-9xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              VEDA
            </span>
          </motion.h1>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6" />
            <p
              className="text-2xl md:text-3xl text-amber-200 tracking-widest font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Art of Spice
            </p>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed"
          >
            Journey through ancient culinary traditions where aromatic spices dance with mystical flavors
          </motion.p>
        </div>
      </section>

      <section className="relative py-24 px-6 min-h-screen bg-purple-950">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ color: '#a78bfa' }}
              whileInView={{ color: '#fbbf24' }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-7xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Royal Menu
            </motion.h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6" />
            <p className="text-purple-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Crafted with centuries-old recipes and the finest spices from across the subcontinent
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-purple-900 shadow-lg'
                    : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/70 border border-purple-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-amber-600/30 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform" />

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-teal-900 rounded-lg overflow-hidden border-2 border-amber-500/40 group-hover:border-amber-400 shadow-2xl transition-all"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-teal-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>

                  <div className="p-6 bg-gradient-to-b from-teal-900 to-teal-950">
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-xl font-bold text-amber-300 leading-tight flex-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.name}
                      </h3>
                      {item.spiceLevel && item.spiceLevel > 0 && (
                        <div className="flex gap-1 flex-shrink-0 ml-2">
                          {[...Array(item.spiceLevel)].map((_, i) => (
                            <Flame key={i} size={14} className="text-orange-500" />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-purple-200 text-sm leading-relaxed mb-5 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-teal-700">
                      <span
                        className="text-3xl font-bold text-amber-400"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        RM {item.price}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(item)}
                        className={`px-5 py-2 font-semibold tracking-wider transition-all duration-300 rounded ${
                          addedItems.has(item.id)
                            ? 'bg-green-600 text-white border-2 border-green-600'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-purple-900 hover:from-amber-400 hover:to-amber-500 shadow-lg'
                        }`}
                      >
                        {addedItems.has(item.id) ? 'ADDED' : 'ADD'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden border-2 border-amber-500/30"
            >
              <div className="p-6 border-b border-purple-700 flex items-center justify-between bg-purple-800/50">
                <h2 className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {cartItems.length === 0 ? (
                  <p className="text-center text-purple-300 py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="bg-purple-800/40 rounded-lg p-4 border border-purple-700">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-amber-300 text-lg">{item.name}</h3>
                            <p className="text-purple-300 text-sm">RM {item.price.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-purple-900/50 rounded-full p-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="w-8 h-8 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors flex items-center justify-center"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-bold text-amber-400">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-purple-700 hover:bg-purple-600 transition-colors flex items-center justify-center"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-bold text-amber-400 text-lg">
                            RM {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-purple-700 bg-purple-800/50">
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-purple-200">
                      <span>Subtotal</span>
                      <span>RM {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-purple-200">
                      <span>SST (6%)</span>
                      <span>RM {sst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-purple-200">
                      <span>Delivery</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `RM ${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-amber-400 pt-2 border-t border-purple-700">
                      <span>Total</span>
                      <span>RM {total.toFixed(2)}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-purple-900 py-4 rounded-lg font-bold text-lg shadow-xl transition-all"
                  >
                    PROCEED TO CHECKOUT
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        restaurantId="veda"
      />
    </div>
  );
};
