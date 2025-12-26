import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onScrollTo: (sectionId: string) => void;
}

export const ScrollIndicator = ({ onScrollTo }: ScrollIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-center py-4 cursor-pointer"
      onClick={() => onScrollTo('features')}
    >
      <p className="text-gray-500 text-sm mb-2">Scroll for Pricing & Details</p>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6 text-gray-500 mx-auto" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;

