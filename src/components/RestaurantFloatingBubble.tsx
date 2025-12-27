/**
 * RestaurantFloatingBubble Component
 * Character-specific floating bubble for restaurant demo pages
 * Shows character image behind a round bubble with expand options
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { trackWhatsAppClick, trackVoiceStart, trackBubbleClick } from '../lib/tracking';
import { useVoice } from '../context/VoiceContext';

interface RestaurantFloatingBubbleProps {
  character: 'aiman' | 'dev' | 'marco';
}

const config = {
  aiman: {
    name: 'Aiman',
    image: '/images/AIMAN.png',
    bubbleGradient: 'from-green-400 to-emerald-500',
    ringColor: 'border-green-400',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    whatsappNumber: '601116343646',
    whatsappMessage: "Hi Aiman, I'm exploring the Warung Rimba demo and have a question",
  },
  dev: {
    name: 'Dev',
    image: '/images/DEV.png',
    bubbleGradient: 'from-amber-400 to-orange-500',
    ringColor: 'border-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    whatsappNumber: '601116343646',
    whatsappMessage: "Hi Dev, I'm exploring the Veda Kitchen demo and have a question",
  },
  marco: {
    name: 'Marco',
    image: '/images/MARCO.png',
    bubbleGradient: 'from-red-400 to-rose-500',
    ringColor: 'border-red-400',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    whatsappNumber: '601116343646',
    whatsappMessage: "Hi Marco, I'm exploring the Gusto Trattoria demo and have a question",
  },
};

export function RestaurantFloatingBubble({ character }: RestaurantFloatingBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const c = config[character];
  const { triggerCall } = useVoice();

  const handleBubbleClick = () => {
    setIsExpanded(!isExpanded);
    trackBubbleClick(`${character}_bubble_${isExpanded ? 'close' : 'open'}`);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackWhatsAppClick(character, 'restaurant_bubble');
    const url = `https://wa.me/${c.whatsappNumber}?text=${encodeURIComponent(c.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleTalkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackVoiceStart(character);
    triggerCall();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-24 flex flex-col gap-3 items-end"
          >
            {/* WhatsApp Option */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg transition-colors font-medium whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </motion.button>

            {/* Talk to Character Option */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTalkClick}
              className={`flex items-center gap-2 bg-gradient-to-r ${c.bubbleGradient} text-white px-5 py-3 rounded-full shadow-lg transition-colors font-medium whitespace-nowrap`}
            >
              <Phone size={20} />
              Talk to {c.name}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bubble with Character Behind */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleBubbleClick}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: c.glowColor }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Character Image - Behind/Above Bubble */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={c.image}
            alt={c.name}
            className="w-20 h-20 object-contain"
            style={{ filter: `drop-shadow(0 8px 16px ${c.glowColor})` }}
          />
        </motion.div>

        {/* Round Bubble Button */}
        <motion.div
          className={`relative z-20 -mt-3 mx-auto w-14 h-14 rounded-full bg-gradient-to-br ${c.bubbleGradient} shadow-xl flex items-center justify-center`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
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
        </motion.div>

        {/* Pulsing Ring */}
        <motion.div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 ${c.ringColor}`}
          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Character Name Label - Shows on Desktop */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium shadow-lg pointer-events-none"
        >
          <span className="font-bold">{c.name}</span>
          <span className="text-slate-400 ml-1">• Your Host</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-slate-800" />
        </motion.div>
      </div>
    </div>
  );
}

