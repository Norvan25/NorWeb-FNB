import { useState } from 'react';
import { X, CreditCard, Banknote, Wallet, CheckCircle, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  image?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSuccess: () => void;
}

const CheckoutModal = ({
  isOpen, onClose, cartItems, onSuccess
}: CheckoutModalProps) => {

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [orderNumber] = useState(() => `NOR-${Math.floor(1000 + Math.random() * 9000)}`);

  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.06;
  const deliveryFee = 8.00;

  const finalDeliveryFee = deliveryType === 'pickup' ? 0 : deliveryFee;
  const finalTotal = subtotal + tax + finalDeliveryFee;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  const handleClose = () => {
    if (isSuccess) {
      onSuccess();
      setIsSuccess(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-neutral-900 border border-amber-900/30 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] md:max-h-[90vh] flex flex-col"
        >

          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-neutral-900/50">
            <h2 className="text-2xl font-serif text-amber-500">
              {isSuccess ? 'Order Confirmed' : 'Complete Your Order'}
            </h2>
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition">
              <X size={24} />
            </button>
          </div>

          <div className="overflow-y-auto p-6 flex-1">

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-32 h-32 bg-green-900/20 rounded-full flex items-center justify-center border border-green-500/50"
                >
                  <CheckCircle size={64} className="text-green-500" />
                </motion.div>

                <div className="space-y-4 max-w-lg mx-auto">
                  <h3 className="text-3xl font-serif text-white">Order Placed Successfully!</h3>

                  <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-left space-y-4">
                    <p className="text-gray-300">
                      Thank you. Your order for <span className="text-amber-400 font-bold">Rimba</span> has been received.
                    </p>
                    <p className="text-gray-300">
                      It is scheduled for <span className="text-white font-bold">{deliveryDate || 'Today'}</span> at <span className="text-white font-bold">{deliveryTime || 'ASAP'}</span>.
                    </p>
                    <p className="text-gray-400 text-sm italic">
                      Our delivery team will contact you once the order is ready to be delivered.
                    </p>
                    <div className="pt-2 border-t border-white/10">
                      <p className="text-amber-500 text-sm font-semibold">
                        For order tracking, you can contact our WhatsApp number: +60 12-345 6789
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="mt-4 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition"
                >
                  Return to Home
                </button>
              </div>
            ) : (

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-amber-500/80 uppercase tracking-widest">Your Order</h3>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-200">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-amber-400">RM {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-neutral-950/50 p-6 rounded-xl border border-white/5 space-y-3">
                    <h3 className="text-lg font-serif text-amber-500 mb-4">Bill Breakdown</h3>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Subtotal</span>
                      <span>RM {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>SST (6%)</span>
                      <span>RM {tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Delivery Fee</span>
                      <span className={finalDeliveryFee === 0 ? "text-green-500" : ""}>
                        {finalDeliveryFee === 0 ? 'Free' : `RM ${finalDeliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between text-white text-xl font-bold">
                      <span>TOTAL</span>
                      <span className="text-amber-400">RM {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                     <h3 className="text-lg font-bold text-amber-500/80 uppercase tracking-widest">Customer Details</h3>
                     <div className="flex bg-neutral-800 rounded-lg p-1 border border-white/10">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('delivery')}
                          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${deliveryType === 'delivery' ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                          Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType('pickup')}
                          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${deliveryType === 'pickup' ? 'bg-amber-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                          Pickup
                        </button>
                     </div>
                  </div>

                  <div className="space-y-4">

                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Contact Info</label>
                      <input required type="text" placeholder="Full Name" className="w-full bg-neutral-800/50 border-b border-amber-900/50 focus:border-amber-500 px-4 py-3 text-white placeholder-stone-500 outline-none transition rounded-t-md mb-2" />
                      <input required type="tel" placeholder="WhatsApp Number (+60...)" className="w-full bg-neutral-800/50 border-b border-amber-900/50 focus:border-amber-500 px-4 py-3 text-white placeholder-stone-500 outline-none transition rounded-t-md" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">
                        {deliveryType === 'delivery' ? 'Delivery Time' : 'Pickup Time'}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            required
                            type="date"
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            className="w-full bg-neutral-800/50 border-b border-amber-900/50 focus:border-amber-500 px-4 py-3 text-white outline-none transition rounded-t-md appearance-none"
                          />
                          <Calendar size={16} className="absolute right-3 top-3.5 text-amber-500/50 pointer-events-none" />
                        </div>
                        <div className="relative">
                          <input
                            required
                            type="time"
                            onChange={(e) => setDeliveryTime(e.target.value)}
                            className="w-full bg-neutral-800/50 border-b border-amber-900/50 focus:border-amber-500 px-4 py-3 text-white outline-none transition rounded-t-md appearance-none"
                          />
                          <Clock size={16} className="absolute right-3 top-3.5 text-amber-500/50 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {deliveryType === 'delivery' && (
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Delivery Address</label>
                        <textarea required rows={2} placeholder="Unit, Floor, Building, Street..." className="w-full bg-neutral-800/50 border-b border-amber-900/50 focus:border-amber-500 px-4 py-3 text-white placeholder-stone-500 outline-none transition rounded-t-md resize-none" />
                        <div className="grid grid-cols-2 gap-4">
                           <input required type="text" placeholder="City" className="w-full bg-neutral-800/50 border-b border-amber-900/50 focus:border-amber-500 px-4 py-3 text-white placeholder-stone-500 outline-none transition rounded-t-md" />
                           <input required type="text" placeholder="Postcode" className="w-full bg-neutral-800/50 border-b border-amber-900/50 focus:border-amber-500 px-4 py-3 text-white placeholder-stone-500 outline-none transition rounded-t-md" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                     <label className="text-xs text-gray-500 uppercase tracking-wider">Payment Method</label>
                     <div className="grid grid-cols-3 gap-3">
                        <div className="border border-amber-500/50 bg-amber-900/10 p-3 rounded-lg flex flex-col items-center justify-center text-amber-500 cursor-pointer">
                           <CreditCard size={20} className="mb-2" />
                           <span className="text-xs font-bold">Card</span>
                        </div>
                        <div className="border border-white/10 hover:border-amber-500/50 bg-neutral-800 p-3 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-amber-500 transition cursor-pointer">
                           <Banknote size={20} className="mb-2" />
                           <span className="text-xs font-bold">FPX</span>
                        </div>
                        <div className="border border-white/10 hover:border-amber-500/50 bg-neutral-800 p-3 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-amber-500 transition cursor-pointer">
                           <Wallet size={20} className="mb-2" />
                           <span className="text-xs font-bold">GrabPay</span>
                        </div>
                     </div>
                  </div>

                  <div className="pt-4 pb-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg shadow-lg shadow-amber-900/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm & Pay</span>
                          <span className="bg-black/20 px-2 py-0.5 rounded text-sm">RM {finalTotal.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-600 mt-3 flex items-center justify-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Secure 256-bit SSL Encrypted Payment
                    </p>
                  </div>

                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
