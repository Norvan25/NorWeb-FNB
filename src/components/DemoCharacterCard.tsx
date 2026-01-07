/**
 * DemoCharacterCard Component
 * Simple character card with ONE button that opens the restaurant page
 * Used in the main page Demo Section
 */

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { trackDemoClick } from '../lib/tracking';

interface DemoCharacterCardProps {
  character: 'aiman' | 'dev' | 'marco';
}

const config = {
  aiman: {
    name: 'Aiman',
    restaurantName: 'Warung Rimba',
    cuisineType: 'Malay Cuisine',
    image: '/images/AIMAN.png',
    demoUrl: '/restaurant/rimba',
    buttonText: 'Demo Rimba Site',
    gradient: 'from-green-500 to-emerald-600',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    sampleQuestions: [
      '"What\'s your best seller?"',
      '"Do you deliver to Damansara?"',
    ],
  },
  dev: {
    name: 'Dev',
    restaurantName: 'Veda Kitchen',
    cuisineType: 'Indian Cuisine',
    image: '/images/DEV.png',
    demoUrl: '/restaurant/veda',
    buttonText: 'Demo Veda Site',
    gradient: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    sampleQuestions: [
      '"How spicy is the Vindaloo?"',
      '"Do you have vegan options?"',
    ],
  },
  marco: {
    name: 'Marco',
    restaurantName: 'Gusto Trattoria',
    cuisineType: 'Italian Cuisine',
    image: '/images/MARCO.png',
    demoUrl: '/restaurant/gusto',
    buttonText: 'Demo Gusto Site',
    gradient: 'from-red-500 to-rose-600',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    sampleQuestions: [
      '"What\'s your signature pasta?"',
      '"Do you have wine pairing?"',
    ],
  },
};

export function DemoCharacterCard({ character }: DemoCharacterCardProps) {
  const c = config[character];
  const navigate = useNavigate();

  const handleClick = () => {
    trackDemoClick(character);
    navigate(c.demoUrl);
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Character Image with Glow */}
      <motion.div
        className="relative mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-50"
          style={{ background: c.glowColor }}
        />
        
        {/* Character Image with Float Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={c.image}
            alt={c.name}
            className="relative z-10 w-36 h-36 md:w-40 md:h-40 object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Restaurant Info */}
      <h3 className="text-xl font-bold text-white mb-1">{c.restaurantName}</h3>
      <p className="text-slate-400 text-sm mb-5">{c.cuisineType}</p>

      {/* Single CTA Button - Opens Restaurant Page */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-gradient-to-r ${c.gradient} text-white font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow w-auto sm:w-[200px]`}
      >
        {c.buttonText}
      </motion.button>

      {/* Sample Questions */}
      <div className="mt-5 space-y-1">
        {c.sampleQuestions.map((q, i) => (
          <p key={i} className="text-slate-500 text-xs italic">{q}</p>
        ))}
      </div>
    </div>
  );
}

