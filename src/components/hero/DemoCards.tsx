import { motion } from 'framer-motion';
import { Globe, MessageCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../../context/VoiceContext';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  flag: string;
  image: string;
  route: string;
  whatsappNumber: string;
}

const restaurants: Restaurant[] = [
  {
    id: 'rimba',
    name: 'RIMBA',
    cuisine: 'Malay',
    flag: '🇲🇾',
    image: '/images/rimba/rimba-hero.png',
    route: '/restaurant/rimba',
    whatsappNumber: '601116343646',
  },
  {
    id: 'veda',
    name: 'VEDA',
    cuisine: 'Indian',
    flag: '🇮🇳',
    image: '/images/veda/veda-hero.png',
    route: '/restaurant/veda',
    whatsappNumber: '601116343646',
  },
  {
    id: 'gusto',
    name: 'GUSTO',
    cuisine: 'Italian',
    flag: '🇮🇹',
    image: '/images/gusto/gusto-hero.png',
    route: '/restaurant/gusto',
    whatsappNumber: '601116343646',
  },
];

interface DemoCardProps extends Restaurant {
  index: number;
}

const DemoCard = ({ name, cuisine, flag, image, route, whatsappNumber, index }: DemoCardProps) => {
  const navigate = useNavigate();
  const { triggerCall } = useVoice();

  const handleVisitWebsite = () => {
    navigate(route);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Hi! I'd like to make a reservation at ${name}.`, '_blank');
  };

  const handleVoiceCall = () => {
    // Navigate to the restaurant page first, then trigger call
    navigate(route);
    setTimeout(() => triggerCall(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all group"
    >
      {/* Restaurant image - SHORT */}
      <div className="h-16 sm:h-20 bg-slate-800 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/images/norvan_logo_only.svg';
            e.currentTarget.className = 'w-full h-full object-contain p-3 opacity-30';
          }}
        />
      </div>

      {/* Restaurant info - COMPACT */}
      <div className="p-2 sm:p-3">
        {/* Name + Flag row */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">{name}</h3>
            <p className="text-gray-400 text-[10px] sm:text-xs">{cuisine}</p>
          </div>
          <span className="text-lg sm:text-xl">{flag}</span>
        </div>

        {/* Action buttons - HORIZONTAL ROW */}
        <div className="flex gap-1.5">
          <button
            onClick={handleVisitWebsite}
            className="flex-1 flex items-center justify-center gap-1 bg-slate-700 hover:bg-slate-600 text-white py-1.5 sm:py-2 rounded-lg transition-colors text-[10px] sm:text-xs font-medium"
          >
            <Globe className="w-3 h-3" />
            <span className="hidden sm:inline">Visit</span>
            <span className="sm:hidden">🌐</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-500 text-white py-1.5 sm:py-2 rounded-lg transition-colors text-[10px] sm:text-xs font-medium"
          >
            <MessageCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Chat</span>
            <span className="sm:hidden">💬</span>
          </button>

          <button
            onClick={handleVoiceCall}
            className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-1.5 sm:py-2 rounded-lg transition-colors text-[10px] sm:text-xs font-medium"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">Call</span>
            <span className="sm:hidden">📞</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const DemoCards = () => {
  return (
    <section id="demos" className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-center text-lg sm:text-xl font-semibold text-white mb-1">
          TRY IT NOW
        </h2>
        <p className="text-center text-gray-400 text-xs sm:text-sm mb-4">
          Pick a Restaurant, Be the Customer
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {restaurants.map((restaurant, index) => (
            <DemoCard key={restaurant.id} {...restaurant} index={index} />
          ))}
        </div>

        <p className="text-center text-gray-500 text-[10px] sm:text-xs mt-3">
          💡 These are REAL demos. Order food. Book a table. Call the agent.
        </p>
      </motion.div>
    </section>
  );
};

export default DemoCards;

