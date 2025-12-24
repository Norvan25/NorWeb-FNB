import { motion } from 'framer-motion';
import { Globe, Clock, Rocket, Building2, MapPin } from 'lucide-react';

const stats = [
  {
    icon: Globe,
    value: '6+',
    label: 'Countries',
    sublabel: 'AI deployments worldwide',
    color: '#06b6d4', // cyan
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Always-On',
    sublabel: 'AI availability',
    color: '#10b981', // green
  },
  {
    icon: Rocket,
    value: '2025',
    label: 'Launch',
    sublabel: 'Official Malaysia launch',
    color: '#F28500', // orange
  },
];

const trustBadges = [
  { emoji: '🔒', text: 'Enterprise-Grade Security' },
  { emoji: '💰', text: '3-Month ROI Guarantee' },
  { emoji: '🇲🇾', text: 'Local Support Team' },
  { emoji: '📊', text: 'You Own Your Data' },
];

export const SocialProofSection = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="px-6 py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Global Technology. Now in Malaysia.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Norvan powers AI systems across industries worldwide. We're bringing restaurant intelligence to Malaysian F&B.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 text-center hover:border-gray-700 transition-colors"
            >
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white mb-1">
                {stat.value}
              </p>
              <p className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </p>
              <p className="text-gray-500 text-sm">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Credibility Block */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-lg mb-12"
        >
          Headquartered in Dubai. Local support in Malaysia.
        </motion.p>

        {/* Office Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Dubai HQ */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🇦🇪</span>
              <div>
                <h4 className="text-white font-bold text-lg">Dubai HQ</h4>
                <p className="text-gray-500 text-sm">International Operations</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Norvan L.L.C-FZ</p>
                  <p>Registration No: 2532568</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <p>Meydan Grandstand, 6th floor, Dubai, U.A.E.</p>
              </div>
            </div>
          </div>

          {/* Malaysia Operations */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🇲🇾</span>
              <div>
                <h4 className="text-white font-bold text-lg">Malaysia Operations</h4>
                <p className="text-gray-500 text-sm">Local Partner</p>
              </div>
            </div>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Sentels Sdn Bhd</p>
                  <p>(1004499-K)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <p>T2-LG-E Boulevard Subang Jaya, Selangor</p>
              </div>
              <p className="text-cyan-400 font-medium pt-1">
                ✓ On-ground support in Bahasa & English
              </p>
            </div>
          </div>
        </motion.div>

        {/* Early Adopter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-orange-950/20 to-gray-900/50 border border-orange-500/20 text-center mb-12"
        >
          <p className="text-2xl md:text-3xl font-bold text-white mb-3">
            🚀 Be Among Malaysia's First AI-Powered Restaurants
          </p>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Early adopters get founding member pricing + priority support
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToPricing}
            className="px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg shadow-orange-500/30"
            style={{ background: 'linear-gradient(90deg, #F28500, #FF6B35)' }}
          >
            Claim Early Bird Spot
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-6"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900/50 border border-gray-800"
            >
              <span className="text-xl">{badge.emoji}</span>
              <span className="text-white font-medium text-sm">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

