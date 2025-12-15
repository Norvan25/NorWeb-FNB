import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Send, ArrowLeft } from 'lucide-react';
import { useCommunication } from '../context/CommunicationContext';
import { useElevenLabs } from '../hooks/useElevenLabs';

const CircularVisualizer = ({ volume, isActive }: { volume: number; isActive: boolean }) => {
  const dots = 12;
  const radius = 100;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {Array.from({ length: dots }).map((_, i) => {
        const angle = (i / dots) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const scale = isActive ? 1 + (Math.random() * volume * 0.5) : 0.5;

        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-amber-600"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
            animate={{
              scale: isActive ? scale : 0.5,
              opacity: isActive ? 0.8 + Math.random() * 0.2 : 0.4,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};

export const CommunicationHUD = () => {
  const { isOpen, activeContext, activeRestaurant, closeHUD } = useCommunication();
  const [messageText, setMessageText] = useState('');

  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

  const { status, volume, connect, disconnect, sendContext, sendMessage } = useElevenLabs({
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

  const toggleCall = () => {
    if (status === 'connected') {
      disconnect();
    } else {
      connect();
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && status === 'connected') {
      sendMessage(messageText.trim());
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'System Ready';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
      default:
        return 'Disconnected';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-cyan-400';
      case 'connecting':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg z-[91]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#1a2332] border-2 border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:from-amber-700 hover:to-orange-700 transition-all"
                  >
                    <ArrowLeft size={18} />
                    Back to site
                  </motion.button>

                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700 text-sm text-gray-300">
                      us EN
                    </div>
                    <div className={`flex items-center gap-2 ${getStatusColor()}`}>
                      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      <span className="text-sm font-medium">{getStatusText()}</span>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center my-12">
                  <CircularVisualizer volume={volume} isActive={status === 'connected'} />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleCall}
                    className={`absolute w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      status === 'connected'
                        ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/50'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/50'
                    }`}
                    disabled={status === 'connecting'}
                  >
                    {status === 'connected' ? (
                      <PhoneOff className="text-white" size={32} />
                    ) : (
                      <Phone className="text-white" size={32} />
                    )}
                  </motion.button>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-white">
                    {activeRestaurant ? `Talk to ${activeRestaurant}` : 'Talk To Nova'}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Send a message..."
                    disabled={status !== 'connected'}
                    className="flex-1 px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!messageText.trim() || status !== 'connected'}
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <Send className="text-white" size={20} />
                  </motion.button>
                </div>

                <p className="text-center text-gray-500 text-sm mt-4">
                  Click the call button to start your conversation
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
