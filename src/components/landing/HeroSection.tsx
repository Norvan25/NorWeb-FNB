import { motion } from 'framer-motion';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
}

export const HeroSection = ({ onScrollTo }: HeroSectionProps) => {
  return (
    <section className="pt-20 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              <span>🇲🇾</span>
              <span>First in Malaysia</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Finally. An AI Team That Has{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                Soul.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-xl text-gray-600 leading-relaxed">
              Stop hiring for "staff" that quit in 3 months. Meet Malaysia's first AI workforce—
              <span className="font-semibold text-gray-800">Aiman, Dev, and Marco</span>.
              They answer every call, charm every customer, and fill your tables 24/7.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onScrollTo('demo')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Meet Your New Team
                <span>→</span>
              </button>
              <button
                onClick={() => onScrollTo('demo')}
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-orange-300 hover:bg-orange-50 transition-all"
              >
                <span>▶️</span>
                Watch Demo
              </button>
            </div>

            {/* Micro-copy */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span>💬</span> Fluent in BM & English
              </span>
              <span className="flex items-center gap-2">
                <span>✓</span> 0% Sick Days
              </span>
              <span className="flex items-center gap-2">
                <span>🇲🇾</span> 100% Malaysian Hospitality
              </span>
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <HeroPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function HeroPhoneMockup() {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative z-10 w-72 bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        <div className="bg-white rounded-[2.5rem] overflow-hidden">
          {/* Phone Screen Content */}
          <div className="h-[500px] bg-gradient-to-b from-orange-50 to-white flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-4 text-center">
              <h3 className="font-bold">Your AI Team</h3>
              <p className="text-sm opacity-90">Ready to serve</p>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-3">
              {/* Aiman's bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-green-100 rounded-2xl rounded-bl-sm p-3 max-w-[85%]"
              >
                <p className="text-sm text-green-800 font-medium">
                  "Boss, our Nasi Lemak is <em>gila</em>! 🔥"
                </p>
                <p className="text-xs text-green-600 mt-1">— Aiman</p>
              </motion.div>

              {/* Dev's bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-orange-100 rounded-2xl rounded-bl-sm p-3 max-w-[85%] ml-auto"
              >
                <p className="text-sm text-orange-800 font-medium">
                  "Best Chapati in KL, guaranteed! 🙏"
                </p>
                <p className="text-xs text-orange-600 mt-1">— Dev</p>
              </motion.div>

              {/* Marco's bubble */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-red-100 rounded-2xl rounded-bl-sm p-3 max-w-[85%]"
              >
                <p className="text-sm text-red-800 font-medium">
                  "Ciao! Fresh pasta, made with amore! 🤌"
                </p>
                <p className="text-xs text-red-600 mt-1">— Marco</p>
              </motion.div>
            </div>

            {/* Characters at Bottom */}
            <div className="h-24 relative bg-gradient-to-t from-white to-transparent">
              <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-4">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-2xl">
                  👨‍🍳
                </div>
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center text-2xl">
                  👨‍🍳
                </div>
                <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center text-2xl">
                  👨‍🍳
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-4">
              <button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2">
                Talk to us! 👋
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-8 bg-gradient-to-r from-orange-300/30 to-rose-300/30 rounded-full blur-3xl -z-10" />
    </div>
  );
}

export default HeroSection;

