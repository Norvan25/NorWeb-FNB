/**
 * CharacterBubble Component
 * Floating character bubble with WhatsApp and Voice options
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mic, X, Plus } from 'lucide-react';
import { trackBubbleClick, trackWhatsAppClick, trackVoiceStart } from '../lib/tracking';

interface CharacterBubbleProps {
  character: 'nova' | 'aiman' | 'dev' | 'marco';
  position: 'fixed' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const characterConfig = {
  nova: {
    name: 'Nova',
    image: '/images/NOVA.png',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-500',
    description: 'AI Manager',
    whatsappText: 'Hi Nova, I want to learn more about NorWeb for my restaurant',
    whatsappNumber: '+60123456789', // Update with actual number
  },
  aiman: {
    name: 'Aiman',
    image: '/images/AIMAN.png',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500',
    description: 'Malay Cuisine Specialist',
    whatsappText: 'Hi, I want to see a demo for my Malay restaurant',
    whatsappNumber: '+60123456789',
  },
  dev: {
    name: 'Dev',
    image: '/images/DEV.png',
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-500',
    description: 'Indian Cuisine Specialist',
    whatsappText: 'Hi, I want to see a demo for my Indian restaurant',
    whatsappNumber: '+60123456789',
  },
  marco: {
    name: 'Marco',
    image: '/images/MARCO.png',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500',
    description: 'Italian Cuisine Specialist',
    whatsappText: 'Hi, I want to see a demo for my Italian restaurant',
    whatsappNumber: '+60123456789',
  },
};

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

export function CharacterBubble({ 
  character, 
  position, 
  size = 'lg',
  className = '',
  showLabel = false,
}: CharacterBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = characterConfig[character];

  const handleBubbleClick = () => {
    setIsExpanded(!isExpanded);
    trackBubbleClick(`${character}_bubble_${isExpanded ? 'close' : 'open'}`);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackWhatsAppClick(character, position);
    const url = `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(config.whatsappText)}`;
    window.open(url, '_blank');
  };

  const handleTalkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackVoiceStart(character);
    trackBubbleClick(`${character}_talk`);
    // Trigger voice/chat widget
    if (typeof window !== 'undefined' && window.openVoiceWidget) {
      window.openVoiceWidget(character);
    }
  };

  const positionClasses = position === 'fixed' 
    ? 'fixed bottom-6 right-6 z-50' 
    : 'relative';

  return (
    <div className={`${positionClasses} ${className}`}>
      {/* Expanded Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${position === 'fixed' ? 'bottom-full right-0 mb-4' : 'bottom-full left-1/2 -translate-x-1/2 mb-3'} flex flex-col gap-3`}
          >
            {/* WhatsApp Option */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-colors whitespace-nowrap"
            >
              <MessageCircle size={20} />
              <span className="font-medium">WhatsApp</span>
            </motion.button>

            {/* Talk/Voice Option */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTalkClick}
              className={`flex items-center gap-3 bg-gradient-to-r ${config.color} text-white px-4 py-3 rounded-full shadow-lg transition-colors whitespace-nowrap`}
            >
              <Mic size={20} />
              <span className="font-medium">Talk to {config.name}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bubble */}
      <motion.button
        onClick={handleBubbleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative ${sizeClasses[size]} rounded-full shadow-xl overflow-visible`}
        animate={{
          boxShadow: isExpanded 
            ? '0 0 0 4px rgba(102, 211, 250, 0.5)' 
            : '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated Ring */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.color}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Character Image Container */}
        <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${config.color} p-1`}>
          <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center">
            <img
              src={config.image}
              alt={config.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <motion.div
          className={`absolute -bottom-1 -right-1 w-6 h-6 ${config.bgColor} rounded-full flex items-center justify-center shadow-lg`}
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          {isExpanded ? (
            <X size={14} className="text-white" />
          ) : (
            <Plus size={14} className="text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Label (for inline display) */}
      {showLabel && (
        <div className="mt-3 text-center">
          <span className="text-white font-medium block">{config.name}</span>
          <span className="text-slate-400 text-sm">{config.description}</span>
        </div>
      )}

      {/* Tooltip on hover (when not expanded and fixed position) */}
      {!isExpanded && position === 'fixed' && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none hidden md:block"
        >
          <span className="font-medium">{config.name}</span>
          <span className="text-slate-400 text-sm ml-1">• {config.description}</span>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Fixed Nova Bubble - Use this at the app level for persistent access
 */
export function FixedNovaBubble() {
  return <CharacterBubble character="nova" position="fixed" size="lg" />;
}

/**
 * Demo Character Grid - Use this in the demo section
 */
export function DemoCharacterGrid() {
  const characters: Array<'aiman' | 'dev' | 'marco'> = ['aiman', 'dev', 'marco'];
  
  return (
    <div className="flex justify-center gap-8 md:gap-16">
      {characters.map((character) => (
        <div key={character} className="flex flex-col items-center">
          <CharacterBubble 
            character={character} 
            position="inline" 
            size="lg"
            showLabel
          />
        </div>
      ))}
    </div>
  );
}

