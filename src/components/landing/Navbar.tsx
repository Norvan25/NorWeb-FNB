import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useVoice } from '../../context/VoiceContext';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
}

export const Navbar = ({ onScrollTo }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { triggerCall } = useVoice();

  const navLinks = [
    { label: 'Meet The Team', sectionId: 'demo' },
    { label: 'Features', sectionId: 'features' },
    { label: 'Pricing', sectionId: 'pricing' },
    { label: 'FAQ', sectionId: 'faq' },
  ];

  const handleNavClick = (sectionId: string) => {
    onScrollTo(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-11 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="text-xl font-bold text-gray-900">NorWeb</span>
        </div>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => handleNavClick(link.sectionId)}
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Nova CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerCall()}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-5 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            <Phone size={16} />
            <span className="hidden sm:inline">Talk to Nova</span>
            <span className="sm:hidden">Nova</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => handleNavClick(link.sectionId)}
              className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

