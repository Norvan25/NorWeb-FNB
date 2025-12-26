import { motion } from 'framer-motion';
import { Star, Wifi, Battery } from 'lucide-react';

export const HeroMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      {/* Phone Frame - LARGER, more realistic */}
      <div className="relative w-[280px] sm:w-[320px] lg:w-[340px]">
        
        {/* Phone outer shell */}
        <div className="relative bg-slate-800 rounded-[3rem] p-3 shadow-2xl shadow-black/50 border border-slate-700">
          
          {/* Phone notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-full z-10" />
          
          {/* Phone screen */}
          <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19' }}>
            
            {/* Status bar */}
            <div className="flex justify-between items-center px-6 pt-8 pb-2 text-white text-xs">
              <span className="font-medium">9:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-4 h-4" />
                <Battery className="w-5 h-5" />
              </div>
            </div>
            
            {/* Chat header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 mx-3 rounded-t-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🍽️</span>
                </div>
                <div>
                  <p className="text-white font-semibold">RIMBA Kitchen</p>
                  <p className="text-green-100 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    Online • AI Agent
                  </p>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="bg-slate-800 mx-3 rounded-b-2xl px-4 py-4 space-y-3 min-h-[200px]">
              
              {/* User message */}
              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-green-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">
                  <p className="text-sm">Hi! Table for 2 tonight at 7pm?</p>
                </div>
              </motion.div>
              
              {/* AI response */}
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-slate-700 text-white px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[85%]">
                  <p className="text-sm">Perfect! I've reserved a table for 2 at 7pm. See you tonight! 🎉</p>
                </div>
              </motion.div>
              
              {/* Typing indicator */}
              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <motion.span
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
              
            </div>
            
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
          
        </div>
        
      </div>
      
      {/* Testimonial below phone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
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
      
      {/* Decorative glow */}
      <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/20 to-green-500/20 rounded-full blur-3xl -z-10" />
      
    </motion.div>
  );
};

export default HeroMockup;
