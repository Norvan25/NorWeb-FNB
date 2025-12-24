import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const BANNER_STORAGE_KEY = 'norvan_banner_dismissed';

export const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const isDismissed = sessionStorage.getItem(BANNER_STORAGE_KEY);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(BANNER_STORAGE_KEY, 'true');
  };

  const handleClaimOffer = () => {
    // Find the pricing section by looking for the pricing cards
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      if (section.textContent?.includes('RM 799') || section.textContent?.includes('THE DIGITAL HOST')) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    
    // Fallback: scroll down a significant amount to pricing area
    window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-[100] h-12"
          style={{
            background: 'linear-gradient(90deg, #F28500 0%, #FF6B35 100%)',
          }}
        >
          <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
            {/* Desktop Text */}
            <div className="hidden md:flex items-center gap-2 flex-1 justify-center">
              <span className="text-white font-medium text-sm lg:text-base">
                🚀 EARLY BIRD OFFER — Be the first restaurant in your area with AI | Up to 6 months FREE + 15% off setup
              </span>
            </div>

            {/* Mobile Text */}
            <div className="flex md:hidden items-center gap-2 flex-1">
              <span className="text-white font-medium text-sm">
                🚀 Early Bird: 6 months FREE
              </span>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClaimOffer}
              className="px-4 py-1.5 bg-white text-orange-600 font-bold text-xs md:text-sm rounded-full hover:bg-orange-50 transition-colors shadow-md whitespace-nowrap"
            >
              Claim Offer
            </motion.button>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="ml-3 p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

