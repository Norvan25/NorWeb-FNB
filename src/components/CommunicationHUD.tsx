import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, ArrowLeft, Leaf, Flame, Sparkles as SparkleIcon } from 'lucide-react';
import { useCommunication } from '../context/CommunicationContext';
import { useElevenLabs } from '../hooks/useElevenLabs';

const RESTAURANT_THEMES = {
  RIMBA: {
    icon: Leaf,
    color: 'from-green-600 to-emerald-700',
    border: 'border-green-500',
    glow: 'shadow-green-500/50',
    name: 'Rimba Malaysian Kitchen',
    context: 'CONTEXT: USER_SELECTED_RIMBA',
  },
  ROUGE: {
    icon: Flame,
    color: 'from-red-600 to-rose-700',
    border: 'border-red-500',
    glow: 'shadow-red-500/50',
    name: 'Rouge Chinese Fine Dining',
    context: 'CONTEXT: USER_SELECTED_ROUGE',
  },
  VEDA: {
    icon: SparkleIcon,
    color: 'from-orange-600 to-amber-700',
    border: 'border-orange-500',
    glow: 'shadow-orange-500/50',
    name: 'Veda North Indian Cuisine',
    context: 'CONTEXT: USER_SELECTED_VEDA',
  },
  GUSTO: {
    icon: SparkleIcon,
    color: 'from-yellow-600 to-amber-700',
    border: 'border-yellow-500',
    glow: 'shadow-yellow-500/50',
    name: 'Gusto Italian Trattoria',
    context: 'CONTEXT: USER_SELECTED_GUSTO',
  },
};

const AudioVisualizer = ({ volume, isActive }: { volume: number; isActive: boolean }) => {
  const bars = 32;

  return (
    <div className="flex items-center justify-center gap-1 h-32">
      {Array.from({ length: bars }).map((_, i) => {
        const height = isActive ? Math.random() * volume * 100 + 10 : 5;

        return (
          <motion.div
            key={i}
            className="w-1.5 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-full"
            animate={{
              height: isActive ? `${height}%` : '20%',
              opacity: isActive ? 0.8 + Math.random() * 0.2 : 0.3,
            }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

export const CommunicationHUD = () => {
  const { isOpen, mode, activeContext, activeRestaurant, closeHUD, switchMode } = useCommunication();

  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

  const { status, isSpeaking, volume, connect, disconnect, sendContext } = useElevenLabs({
    agentId,
    onConnect: () => {
      if (activeContext) {
        setTimeout(() => {
          sendContext(activeContext);
        }, 500);
      }
    },
  });

  useEffect(() => {
    if (isOpen && status === 'disconnected') {
      connect();
    } else if (!isOpen && status === 'connected') {
      disconnect();
    }
  }, [isOpen]);

  const handleClose = () => {
    disconnect();
    closeHUD();
  };

  const handleRestaurantSelect = (restaurant: keyof typeof RESTAURANT_THEMES) => {
    const theme = RESTAURANT_THEMES[restaurant];
    switchMode('RESTAURANT', theme.context, restaurant);
    sendContext(theme.context);
  };

  const handleBackToHub = () => {
    switchMode('HUB');
  };

  const toggleMic = () => {
    if (status === 'connected') {
      disconnect();
    } else {
      connect();
    }
  };

  const currentTheme = activeRestaurant ? RESTAURANT_THEMES[activeRestaurant] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 md:bottom-8 md:right-8 w-full md:w-[480px] z-[91]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`bg-[#0D1326] border-2 ${
                currentTheme ? currentTheme.border : 'border-cyan-500'
              } rounded-t-3xl md:rounded-3xl shadow-2xl ${
                currentTheme ? currentTheme.glow : 'shadow-cyan-500/50'
              } overflow-hidden`}
            >
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>

                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-2xl font-bold mb-1">
                    {mode === 'HUB' ? 'NorWeb Command Center' : currentTheme?.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {status === 'connected'
                      ? isSpeaking
                        ? 'Listening...'
                        : 'Ready to chat'
                      : status === 'connecting'
                      ? 'Connecting...'
                      : 'Click mic to start'}
                  </p>
                </div>

                <div className="p-6">
                  <AudioVisualizer volume={volume} isActive={status === 'connected'} />

                  <div className="mt-6 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMic}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                        status === 'connected'
                          ? currentTheme
                            ? `bg-gradient-to-br ${currentTheme.color} shadow-lg ${currentTheme.glow}`
                            : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50'
                          : 'bg-gray-800 border-2 border-gray-700'
                      }`}
                      disabled={status === 'connecting'}
                    >
                      {status === 'connected' ? (
                        <Mic className="text-white" size={32} />
                      ) : (
                        <MicOff className="text-gray-400" size={32} />
                      )}
                    </motion.button>
                  </div>
                </div>

                {mode === 'HUB' && (
                  <div className="p-6 pt-0">
                    <p className="text-sm text-gray-400 mb-4 text-center">
                      Select a restaurant to explore:
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {(Object.keys(RESTAURANT_THEMES) as Array<keyof typeof RESTAURANT_THEMES>).map((key) => {
                        const theme = RESTAURANT_THEMES[key];
                        const Icon = theme.icon;

                        return (
                          <motion.button
                            key={key}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleRestaurantSelect(key)}
                            className={`p-4 bg-gradient-to-br ${theme.color} rounded-xl border ${theme.border} shadow-lg ${theme.glow} flex items-center justify-center gap-2 font-semibold text-white transition-all`}
                          >
                            <Icon size={20} />
                            {key}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {mode === 'RESTAURANT' && (
                  <div className="p-6 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBackToHub}
                      className="w-full py-3 bg-gray-800 border border-gray-700 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
                    >
                      <ArrowLeft size={20} />
                      Back to Command Center
                    </motion.button>
                  </div>
                )}

                <div className="px-6 pb-6">
                  <p className="text-xs text-gray-500 text-center">
                    Powered by ElevenLabs Voice AI
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
