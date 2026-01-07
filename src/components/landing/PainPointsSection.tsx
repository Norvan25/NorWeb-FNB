import { motion } from 'framer-motion';
import { Facebook, Phone, MessageCircle, Globe, TrendingDown, Clock } from 'lucide-react';

const painCards = [
  {
    icon: Facebook,
    title: 'Posting into the void',
    description: '73 likes. Zero customers.',
    lossIndicator: '❌ No ROI tracking',
    delay: 0,
  },
  {
    icon: Phone,
    title: 'Missed calls = missed money',
    description: 'Phone rang 6 times at lunch rush. All went to voicemail.',
    lossIndicator: '💸 RM200/day walking out',
    delay: 0.1,
  },
  {
    icon: MessageCircle,
    title: '9pm WhatsApp. Midnight reply.',
    description: 'They asked about your menu. They booked somewhere else.',
    lossIndicator: '❌ Customer gone forever',
    delay: 0.2,
  },
  {
    icon: Globe,
    title: 'RM3,000 website. Zero leads.',
    description: 'Looks pretty. Does nothing.',
    lossIndicator: '💸 Dead investment',
    delay: 0.3,
  },
];

export const PainPointsSection = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            You Didn't Open a Restaurant to Become a Digital Marketer.
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            But somehow, you're stuck doing all of this:
          </p>
        </motion.div>

        {/* Pain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 mt-12">
          {painCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative p-6 rounded-2xl bg-[#1A2332] border border-gray-700 hover:border-[#00D9FF]/50 transition-all cursor-pointer"
              >
                {/* Icon */}
                <div className="mb-4">
                  <IconComponent 
                    className="w-10 h-10 text-[#00D9FF]" 
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4">
                  {card.description}
                </p>

                {/* Loss Indicator */}
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                  className="text-sm font-semibold text-[#F28500]"
                >
                  {card.lossIndicator}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Transition Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          >
            <TrendingDown className="w-8 h-8 text-gray-600" />
          </motion.div>
        </motion.div>

        {/* Meanwhile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Meanwhile, the restaurant two streets down is always packed.
          </p>
          <p className="text-lg text-gray-400">
            Same food quality. Same prices.
          </p>
        </motion.div>

        {/* Punch Line */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-2xl md:text-3xl font-bold text-[#F28500]">
            What are they doing that you're not?
          </p>
        </motion.div>

        {/* Operator Trap Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1A2332] to-[#0F1720] border-2 border-gray-700">
            {/* Clock Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: 'linear' 
                }}
              >
                <Clock className="w-16 h-16 text-[#F28500]" />
              </motion.div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
              You're Stuck in the Operator Trap
            </h3>

            {/* Text */}
            <p className="text-lg md:text-xl text-gray-300 text-center leading-relaxed">
              Working 14 hours a day <span className="font-semibold text-white">IN</span> the business. 
              Zero time to work <span className="font-semibold text-[#00D9FF]">ON</span> the business.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSection;
