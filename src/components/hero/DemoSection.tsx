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
    cuisine: 'Malay Cuisine',
    flag: '🇲🇾',
    image: '/images/rimba/rimba-hero.png',
    route: '/restaurant/rimba',
    whatsappNumber: '601116343646',
  },
  {
    id: 'veda',
    name: 'VEDA',
    cuisine: 'Indian Cuisine',
    flag: '🇮🇳',
    image: '/images/veda/veda-hero.png',
    route: '/restaurant/veda',
    whatsappNumber: '601116343646',
  },
  {
    id: 'gusto',
    name: 'GUSTO',
    cuisine: 'Italian Cuisine',
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/images/norvan_logo_only.svg';
            e.currentTarget.className = 'w-full h-full object-contain p-8 opacity-30';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name + Flag */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <span className="text-2xl">{flag}</span>
        </div>

        {/* Cuisine type */}
        <p className="text-gray-400 text-sm mb-4">{cuisine}</p>

        {/* Action Buttons - Stacked with full labels */}
        <div className="space-y-2">
          <button
            onClick={handleVisitWebsite}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-lg transition-colors font-medium"
          >
            <Globe className="w-4 h-4" />
            Visit Website
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-2.5 rounded-lg transition-colors font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </button>

          <button
            onClick={handleVoiceCall}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2.5 rounded-lg transition-colors font-medium"
          >
            <Phone className="w-4 h-4" />
            Call AI Agent
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const DemoSection = () => {
  return (
    <section id="demos" className="py-16 lg:py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            TRY IT NOW
          </h2>
          <p className="text-gray-400 text-lg">
            Pick a restaurant. Be the customer. Experience it yourself.
          </p>
        </motion.div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {restaurants.map((restaurant, index) => (
            <DemoCard key={restaurant.id} {...restaurant} index={index} />
          ))}
        </div>

        {/* Helper Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          💡 These are real working demos. Order food, book a table, or call the AI agent.
        </motion.p>
      </div>
    </section>
  );
};

export default DemoSection;

