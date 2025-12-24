import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, Building2, FileText } from 'lucide-react';

interface ContactNumberProps {
  number: string;
  label?: string;
  whatsappNumber?: string;
}

const ContactNumber = ({ number, label, whatsappNumber }: ContactNumberProps) => {
  const cleanNumber = number.replace(/\s/g, '');
  const waNumber = whatsappNumber ? whatsappNumber.replace(/\s/g, '') : cleanNumber;
  
  return (
    <div className="flex items-center gap-3 group">
      <span className="text-gray-300 group-hover:text-white transition-colors">
        {number}
        {label && <span className="text-gray-500 text-sm ml-2">({label})</span>}
      </span>
      <div className="flex items-center gap-2">
        {/* Call Button */}
        <motion.a
          href={`tel:${cleanNumber}`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 hover:border-cyan-400 hover:from-cyan-500/30 hover:to-blue-600/30 transition-all group/btn"
          title="Call"
        >
          <Phone className="w-4 h-4 text-cyan-400 group-hover/btn:text-cyan-300" />
        </motion.a>
        
        {/* WhatsApp Button */}
        <motion.a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 hover:border-green-400 hover:from-green-500/30 hover:to-emerald-600/30 transition-all group/btn"
          title="WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-green-400 group-hover/btn:text-green-300" />
        </motion.a>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-black to-black border-t border-gray-800/50">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/norvan_logo_only.svg"
                alt="Norvan Logo"
                className="w-12 h-12"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                NORVAN
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Dimensional intelligence architecture for businesses that refuse to stay ordinary.
            </p>
            <a
              href="mailto:info@norvan.io"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <Mail className="w-5 h-5" />
              <span className="border-b border-cyan-400/30 group-hover:border-cyan-300">info@norvan.io</span>
            </a>
          </motion.div>

          {/* Dubai Office */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-purple-400" />
              <h4 className="text-lg font-bold text-white">Dubai Office</h4>
            </div>
            
            <div className="space-y-3 text-gray-400 mb-6">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Norvan L.L.C-FZ</p>
                  <p className="text-sm">Limited Liability Company</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <p className="text-sm">Registration No: 2532568</p>
              </div>
              
              <p className="text-sm leading-relaxed">
                Meydan Grandstand, 6th floor,<br />
                Meydan Road, Nad Al Sheba,<br />
                Dubai, U.A.E.
              </p>
            </div>
            
            <ContactNumber number="+60 19 606 9033" />
          </motion.div>

          {/* Malaysia Office */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-bold text-white">Malaysia Office</h4>
            </div>
            
            <div className="space-y-3 text-gray-400 mb-6">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">Local Partner:</p>
                  <p className="text-white font-medium">Sentels Sdn Bhd</p>
                  <p className="text-xs text-gray-500">(1004499-K)</p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed">
                T2-LG-E Boulevard Subang Jaya,<br />
                Jalan SS12, Subang Jaya,<br />
                47650, Selangor, Malaysia
              </p>
            </div>
            
            <div className="space-y-3">
              <ContactNumber 
                number="+60 11 1634 3646" 
                label="NORVAN NOUS"
                whatsappNumber="601116343646"
              />
              <ContactNumber 
                number="+60 19 606 9033" 
                label="CEO"
              />
            </div>
          </motion.div>

          {/* Quick Links / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <h4 className="text-lg font-bold text-white mb-4">Get Started</h4>
            <p className="text-gray-400 text-sm mb-6">
              Ready to transform your business with dimensional intelligence?
            </p>
            <div className="space-y-3">
              <motion.a
                href="mailto:info@norvan.io"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/20"
              >
                Contact Us
              </motion.a>
              <motion.a
                href="https://wa.me/601116343646"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/40 text-green-400 font-semibold rounded-full hover:from-green-500/30 hover:to-emerald-600/30 hover:border-green-400 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 <span className="text-gray-400 font-medium">NORVAN INTELLIGENCE</span>. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Norvan Product
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

