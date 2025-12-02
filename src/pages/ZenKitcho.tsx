import { useState, useEffect } from 'react';
import { ShoppingCart, X, Minus, Plus, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';
import { zenMenu, categories, MenuItem } from '../data/zen-menu';
import { AIAgentButtons } from '../components/AIAgentButtons';

export const ZenKitcho = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const cartItemsForRestaurant = cartItems.filter(item => item.restaurantId === 'zenkitcho');
  const cartTotal = cartItemsForRestaurant.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredMenu = selectedCategory === 'all'
    ? zenMenu
    : zenMenu.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: 'zenkitcho'
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

  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItemsForRestaurant.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="sticky top-0 z-40 bg-gray-50 border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <Home size={20} />
            <span className="font-light tracking-wider text-sm">HOME</span>
          </button>

          <h1 className="text-2xl font-light tracking-[0.3em] text-gray-900">
            ZEN KITCHO
          </h1>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <ShoppingCart size={24} strokeWidth={1.5} />
            {cartItemsForRestaurant.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {cartItemsForRestaurant.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <section className="relative h-screen flex items-end justify-center pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/zen/zen-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-3xl px-8">
          <h2 className="text-6xl font-extralight tracking-[0.5em] mb-6">
            和
          </h2>
          <p className="text-xl font-light tracking-[0.2em] leading-relaxed">
            PRECISION IN EVERY BITE
          </p>
        </div>
      </section>

      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="mb-24">
          <h3 className="text-sm font-light tracking-[0.3em] text-gray-400 mb-3">
            01 / PHILOSOPHY
          </h3>
          <p className="text-4xl font-light text-gray-900 leading-relaxed max-w-4xl">
            In the quiet discipline of Japanese cuisine, we find balance between tradition and innovation,
            simplicity and complexity, restraint and indulgence.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex gap-6 mb-16 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-8 py-3 rounded-sm font-light tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-900'
              }`}
            >
              ALL
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-8 py-3 rounded-sm font-light tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-900'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredMenu.map((item, index) => {
            const quantity = getItemQuantity(item.id);
            const isAdded = addedItems.has(item.id);

            return (
              <div
                key={item.id}
                className="group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative mb-6 overflow-hidden bg-gray-100 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-light tracking-wide text-gray-900 mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-light text-gray-900">
                      RM {item.price}
                    </span>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-sm">
                        <button
                          onClick={() => {
                            if (quantity === 1) {
                              removeFromCart(item.id, 'zenkitcho');
                            } else {
                              updateQuantity(item.id, quantity - 1, 'zenkitcho');
                            }
                          }}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} strokeWidth={1.5} />
                        </button>
                        <span className="font-light text-sm w-8 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, quantity + 1, 'zenkitcho')}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className={`px-6 py-2 rounded-sm font-light tracking-wider text-sm transition-all ${
                          isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {isAdded ? 'ADDED' : 'ADD'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-light tracking-[0.3em] text-gray-400 mb-8">
            02 / LOCATION
          </h3>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-xl font-light text-gray-900 leading-relaxed mb-8">
                Experience the essence of Japanese dining in our minimalist sanctuary.
                Every detail crafted with intention, every moment designed for contemplation.
              </p>
              <div className="space-y-4 text-gray-600 font-light">
                <p>Level 5, Pavilion KL</p>
                <p>168 Jalan Bukit Bintang</p>
                <p>55100 Kuala Lumpur</p>
                <p className="pt-4">+60 3 2142 8000</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-600 font-light">
              <div>
                <h4 className="text-gray-900 mb-2 tracking-wide">OPENING HOURS</h4>
                <p>Monday - Sunday</p>
                <p>12:00 PM - 3:00 PM</p>
                <p>6:00 PM - 10:30 PM</p>
              </div>
              <div className="pt-6">
                <h4 className="text-gray-900 mb-2 tracking-wide">RESERVATIONS</h4>
                <p>Highly recommended</p>
                <p>Walk-ins subject to availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-xl font-light tracking-wider">YOUR ORDER</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6">
              {cartItemsForRestaurant.length === 0 ? (
                <p className="text-center text-gray-500 py-8 font-light">
                  Your cart is empty
                </p>
              ) : (
                <>
                  <div className="space-y-6 mb-8">
                    {cartItemsForRestaurant.map(item => {
                      const menuItem = zenMenu.find(m => m.id === item.id);
                      return (
                        <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200">
                          {menuItem?.image && (
                            <img
                              src={menuItem.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-light text-gray-900 mb-1">{item.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">RM {item.price}</p>
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-sm w-fit">
                              <button
                                onClick={() => {
                                  if (item.quantity === 1) {
                                    removeFromCart(item.id, 'zenkitcho');
                                  } else {
                                    updateQuantity(item.id, item.quantity - 1, 'zenkitcho');
                                  }
                                }}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Minus size={14} strokeWidth={1.5} />
                              </button>
                              <span className="font-light text-sm w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1, 'zenkitcho')}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus size={14} strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-light text-gray-900">
                              RM {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4 mb-6 pt-6 border-t-2 border-gray-900">
                    <div className="flex justify-between text-lg">
                      <span className="font-light tracking-wide">TOTAL</span>
                      <span className="font-light">RM {cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full bg-gray-900 text-white py-4 rounded-sm font-light tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    CHECKOUT
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItemsForRestaurant.map(item => {
          const menuItem = zenMenu.find(m => m.id === item.id);
          return {
            ...item,
            image: menuItem?.image
          };
        })}
        onSuccess={() => {
          clearCart('zenkitcho');
          setIsCheckoutOpen(false);
          navigate('/');
        }}
      />

      <AIAgentButtons waiterName="Master Kenji" themeColor="red" />
    </div>
  );
};
