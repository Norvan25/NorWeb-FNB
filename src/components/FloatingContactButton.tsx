import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, Headphones } from 'lucide-react';
import { useCommunication } from '../context/CommunicationContext';

const NORVAN_NOUS_WHATSAPP = '601116343646';

export const FloatingContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { openHUD, isAgentActive, isOpen } = useCommunication();

  const handleCallAI = () => {
    // Don't allow if an agent is already active
    if (isAgentActive || isOpen) {
      console.log('Cannot open HUD: agent already active or HUD open');
      setIsExpanded(false);
      return;
    }
    setIsExpanded(false);
    openHUD('HUB');
  };

  const handleWhatsApp = () => {
    setIsExpanded(false);
    window.open(`https://wa.me/${NORVAN_NOUS_WHATSAPP}`, '_blank');
  };

  // Hide the button when HUD is open or agent is active
  if (isOpen || isAgentActive) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* WhatsApp Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              onClick={handleWhatsApp}
              className="group relative flex items-center gap-3"
            >
              {/* Label */}
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.15 }}
                className="px-4 py-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-full text-sm font-medium text-white shadow-xl whitespace-nowrap"
              >
                Chat on WhatsApp
              </motion.span>
              
              {/* Icon Button */}
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 group-hover:shadow-green-500/50 transition-all group-hover:scale-105">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.button>

            {/* Call AI Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={handleCallAI}
              className="group relative flex items-center gap-3"
            >
              {/* Label */}
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.05 }}
                className="px-4 py-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-full text-sm font-medium text-white shadow-xl whitespace-nowrap"
              >
                Talk to AI Agent
              </motion.span>
              
              {/* Icon Button */}
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all group-hover:scale-105">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* Animated pulse ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #F28500, #FF6B35)' }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
          style={{ background: 'linear-gradient(135deg, #F28500, #FF6B35)' }}
        />
        
        {/* Button */}
        <div 
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all"
          style={{ 
            background: 'linear-gradient(135deg, #F28500, #FF6B35)',
            boxShadow: '0 10px 40px rgba(242, 133, 0, 0.4)'
          }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="contact"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Phone className="w-7 h-7 text-white" />
                {/* Notification dot */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-orange-500">
                  <span className="absolute inset-0 bg-cyan-400 rounded-full animate-ping" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Hint text when collapsed */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-gray-500 font-medium pr-2"
          >
            Contact Us
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

