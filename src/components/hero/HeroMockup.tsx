import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const HeroMockup = () => {
  const chatMessages = [
    { type: 'user', text: 'Hi! Table for 2 tonight at 7pm?' },
    { type: 'bot', text: "Perfect! I've reserved a table for 2 at 7pm. See you tonight! 🎉" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center"
    >
      {/* Phone Mockup */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-cyan-500/20 blur-3xl rounded-full" />
        
        {/* Phone frame */}
        <div className="relative w-64 sm:w-72 bg-slate-800 rounded-[2.5rem] border-4 border-slate-700 p-3 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-full" />
          
          {/* Screen */}
          <div className="w-full h-[380px] sm:h-[420px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-[2rem] overflow-hidden">
            {/* Chat header */}
            <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🍽️</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">RIMBA Kitchen</p>
                <p className="text-green-200 text-xs">Online • AI Agent</p>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.3 }}
                  className={`${
                    msg.type === 'user'
                      ? 'bg-green-600 rounded-2xl rounded-br-sm ml-auto'
                      : 'bg-slate-700 rounded-2xl rounded-bl-sm'
                  } text-white p-3 max-w-[85%] text-sm`}
                >
                  {msg.text}
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-slate-700 rounded-2xl rounded-bl-sm p-3 w-16"
              >
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center"
      >
        <div className="flex justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-gray-300 italic text-sm">"Game changer for my restaurant"</p>
        <p className="text-gray-500 text-xs mt-1">— Chef Rizal, Nasi Kandar Pelita</p>
      </motion.div>
    </motion.div>
  );
};

export default HeroMockup;

