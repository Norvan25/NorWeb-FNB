import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
}

export const Navbar = ({ onScrollTo }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { triggerCall } = useVoice();

  const navLinks = [
    { label: 'Features', sectionId: 'features' },
    { label: 'Pricing', sectionId: 'pricing' },
    { label: 'FAQ', sectionId: 'faq' },
  ];

  const handleNavClick = (sectionId: string) => {
    onScrollTo(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/images/norvan_logo_only.svg" 
              alt="NorWeb" 
              className="w-8 h-8"
            />
            <div>
              <span className="text-white font-bold text-xl">NorWeb</span>
              <span className="hidden sm:inline text-gray-400 text-xs ml-2">AI for F&B</span>
            </div>
          </div>

          {/* Center: Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => handleNavClick(link.sectionId)}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Nova Button + Mobile Menu */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => triggerCall()}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-4 py-2 rounded-full transition-all text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone size={16} />
              <span className="hidden sm:inline">Talk to Nova</span>
              <span className="sm:hidden">Nova</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-900 border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="block w-full text-left text-gray-300 hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

