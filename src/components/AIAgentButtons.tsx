import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MessageSquare, Bot } from 'lucide-react';

interface AIAgentButtonsProps {
  waiterName: string;
  themeColor: string;
}

export const AIAgentButtons = ({ waiterName, themeColor }: AIAgentButtonsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; hover: string; border: string } } = {
      'amber': { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', border: 'border-amber-500' },
      'emerald': { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', border: 'border-emerald-500' },
      'gold': { bg: 'bg-yellow-600', hover: 'hover:bg-yellow-700', border: 'border-yellow-500' },
      'red': { bg: 'bg-red-600', hover: 'hover:bg-red-700', border: 'border-red-500' },
      'saffron': { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', border: 'border-orange-400' },
      'teal': { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', border: 'border-teal-500' },
      'terracotta': { bg: 'bg-orange-700', hover: 'hover:bg-orange-800', border: 'border-orange-600' },
      'olive': { bg: 'bg-green-700', hover: 'hover:bg-green-800', border: 'border-green-600' }
    };

    return colorMap[color] || colorMap['amber'];
  };

  const colors = getColorClasses(themeColor);

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex flex-col-reverse items-end gap-3"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className={`${colors.bg} ${colors.hover} text-white px-6 py-4 rounded-full font-bold flex items-center gap-3 shadow-2xl border-2 ${colors.border} transition-all`}
              onClick={() => alert(`Initiating voice call with ${waiterName}...`)}
            >
              <Mic size={24} strokeWidth={2.5} />
              <span className="whitespace-nowrap">Talk to {waiterName}</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`${colors.bg} ${colors.hover} text-white px-6 py-4 rounded-full font-bold flex items-center gap-3 shadow-2xl border-2 ${colors.border} transition-all`}
              onClick={() => alert(`Opening chat with ${waiterName}...`)}
            >
              <MessageSquare size={24} strokeWidth={2.5} />
              <span className="whitespace-nowrap">Chat to {waiterName}</span>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        className={`${colors.bg} ${colors.hover} text-white p-5 rounded-full shadow-2xl border-2 ${colors.border} transition-all ${
          isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot size={32} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
};
