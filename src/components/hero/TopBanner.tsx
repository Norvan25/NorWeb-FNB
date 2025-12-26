import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCommunication } from '../../context/CommunicationContext';

const BANNER_STORAGE_KEY = 'norweb-banner-dismissed';

export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openLeadCapture } = useCommunication();

  useEffect(() => {
    // Check localStorage on mount
    const dismissed = localStorage.getItem(BANNER_STORAGE_KEY);
    setIsVisible(dismissed !== 'true');
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(BANNER_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  const handleClaimOffer = () => {
    openLeadCapture('Early Bird');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-rose-500 text-white overflow-hidden"
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            {/* Left: Offer text - ACCURATE offer */}
            <p className="text-sm font-medium flex-1 text-center md:text-left">
              <span className="hidden sm:inline">🎉 EARLY BIRD — First 50 restaurants get 15% off setup + 3 months free</span>
              <span className="sm:hidden">🎉 15% off + 3 mo free!</span>
            </p>

            {/* Right: CTA + Close */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleClaimOffer}
                className="hidden sm:flex items-center gap-1 px-3 py-1 border border-white/50 hover:border-white hover:bg-white/10 rounded-full text-sm font-medium transition-all"
              >
                Claim Offer
              </button>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Dismiss banner"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopBanner;

