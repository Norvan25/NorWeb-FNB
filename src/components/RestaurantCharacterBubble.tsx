/**
 * RestaurantCharacterBubble Component
 * Unified character bubble pattern for restaurant AI assistants
 * Character image behind/above a round bubble button
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { trackWhatsAppClick, trackVoiceStart, trackDemoClick } from '../lib/tracking';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../context/VoiceContext';

interface CharacterConfig {
  id: string;
  name: string;
  restaurantName: string;
  cuisineType: string;
  image: string;
  gradient: string;
  bubbleColor: string;
  borderColor: string;
  whatsappNumber: string;
  whatsappMessage: string;
  sampleQuestions: string[];
  route: string;
}

const characters: Record<string, CharacterConfig> = {
  aiman: {
    id: 'aiman',
    name: 'Aiman',
    restaurantName: 'Warung Rimba',
    cuisineType: 'Malay Cuisine',
    image: '/images/AIMAN.png',
    gradient: 'from-amber-400 to-orange-500',
    bubbleColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
    borderColor: 'border-amber-400',
    whatsappNumber: '601116343646',
    whatsappMessage: 'Hi Aiman, I want to try the Warung Rimba demo',
    sampleQuestions: [
      '"Do you deliver to Damansara?"',
      '"What\'s your best seller?"',
      '"Is the rendang spicy?"',
    ],
    route: '/restaurant/rimba',
  },
  dev: {
    id: 'dev',
    name: 'Dev',
    restaurantName: 'Veda Kitchen',
    cuisineType: 'Indian Cuisine',
    image: '/images/DEV.png',
    gradient: 'from-red-400 to-pink-500',
    bubbleColor: 'bg-gradient-to-br from-red-400 to-pink-500',
    borderColor: 'border-red-400',
    whatsappNumber: '601116343646',
    whatsappMessage: 'Hi Dev, I want to try the Veda Kitchen demo',
    sampleQuestions: [
      '"What do you recommend for kids?"',
      '"How spicy is the Vindaloo?"',
      '"Do you have vegan options?"',
    ],
    route: '/restaurant/veda',
  },
  marco: {
    id: 'marco',
    name: 'Marco',
    restaurantName: 'Gusto Trattoria',
    cuisineType: 'Italian Cuisine',
    image: '/images/MARCO.png',
    gradient: 'from-green-400 to-emerald-500',
    bubbleColor: 'bg-gradient-to-br from-green-400 to-emerald-500',
    borderColor: 'border-green-400',
    whatsappNumber: '601116343646',
    whatsappMessage: 'Hi Marco, I want to try the Gusto Trattoria demo',
    sampleQuestions: [
      '"What\'s your signature pasta?"',
      '"Do you have wine pairing?"',
      '"Can I book for 10 people?"',
    ],
    route: '/restaurant/gusto',
  },
};

interface RestaurantCharacterBubbleProps {
  characterId: 'aiman' | 'dev' | 'marco';
  showSampleQuestions?: boolean;
}

export function RestaurantCharacterBubble({ 
  characterId,
  showSampleQuestions = true,
}: RestaurantCharacterBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = characters[characterId];
  const navigate = useNavigate();
  const { triggerCall } = useVoice();

  const handleBubbleClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      trackDemoClick(characterId);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackWhatsAppClick(characterId, 'demo_bubble');
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleTalkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackVoiceStart(characterId);
    navigate(config.route);
    setTimeout(() => triggerCall(), 500);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Main Bubble Container */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleBubbleClick}
        whileHover={{ scale: 1.03 }}
      >
        {/* Background Glow */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient} opacity-30 blur-2xl`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.15, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Character Image - Behind/Above */}
        <motion.div
          className="relative z-10"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src={config.image}
            alt={config.name}
            className="w-32 h-32 object-contain drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.4))',
            }}
          />
        </motion.div>

        {/* Round Bubble Button - Overlapping Character */}
        <motion.div
          className="relative z-20 -mt-5 flex justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`${config.bubbleColor} w-14 h-14 rounded-full shadow-xl flex items-center justify-center`}>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? (
                <X size={24} className="text-white" />
              ) : (
                <MessageCircle size={24} className="text-white" />
              )}
            </motion.div>
          </div>

          {/* Pulsing Ring */}
          <motion.div
            className={`absolute inset-0 w-14 h-14 rounded-full border-2 ${config.borderColor}`}
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Restaurant Label */}
      <div className="mt-4 text-center">
        <h3 className="text-white font-bold text-lg">{config.restaurantName}</h3>
        <p className="text-slate-400 text-sm">{config.cuisineType}</p>
      </div>

      {/* Expanded Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex flex-col gap-2 w-full max-w-[200px]"
          >
            {/* WhatsApp Option */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-full shadow-lg transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.button>

            {/* Talk to Character Option */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleTalkClick}
              className={`flex items-center justify-center gap-2 ${config.bubbleColor} text-white px-4 py-2.5 rounded-full shadow-lg transition-colors font-medium text-sm`}
            >
              <Phone size={16} />
              Talk to {config.name}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sample Questions - Show below when not expanded */}
      {!isExpanded && showSampleQuestions && (
        <motion.div 
          className="mt-4 space-y-1 text-center max-w-[180px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {config.sampleQuestions.slice(0, 2).map((q, i) => (
            <p key={i} className="text-slate-500 text-xs italic truncate">{q}</p>
          ))}
        </motion.div>
      )}
    </div>
  );
}

