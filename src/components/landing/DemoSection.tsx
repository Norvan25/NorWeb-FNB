import { motion } from 'framer-motion';
import { Globe, MessageCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../../context/VoiceContext';

interface Specialist {
  id: string;
  name: string;
  title: string;
  restaurant: string;
  cuisine: string;
  flag: string;
  gradient: string;
  bgLight: string;
  borderColor: string;
  role: string;
  prompts: string[];
  route: string;
  whatsappNumber: string;
  emoji: string;
}

const specialists: Specialist[] = [
  {
    id: 'aiman',
    name: 'AIMAN',
    title: 'The Friendly Mamak Legend',
    restaurant: 'RIMBA Kitchen',
    cuisine: 'Malay Cuisine',
    flag: '🇲🇾',
    gradient: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    role: "You're craving Nasi Lemak. Challenge Aiman.",
    prompts: ['Is the Sambal spicy?', 'Do you deliver to Damansara?', "What's your best seller?"],
    route: '/restaurant/rimba',
    whatsappNumber: '601116343646',
    emoji: '👨‍🍳',
  },
  {
    id: 'dev',
    name: 'DEV',
    title: 'The Spice Master',
    restaurant: 'VEDA Spice',
    cuisine: 'Indian Cuisine',
    flag: '🇮🇳',
    gradient: 'from-orange-500 to-amber-600',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    role: "You have dietary restrictions. Test Dev's knowledge.",
    prompts: ['Is the Paneer vegetarian?', 'What do you recommend for kids?', 'How spicy is the Vindaloo?'],
    route: '/restaurant/veda',
    whatsappNumber: '601116343646',
    emoji: '👨‍🍳',
  },
  {
    id: 'marco',
    name: 'MARCO',
    title: 'The Italian Purist',
    restaurant: 'GUSTO Italiano',
    cuisine: 'Italian Cuisine',
    flag: '🇮🇹',
    gradient: 'from-red-500 to-rose-600',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-200',
    role: 'You want a romantic table. See how Marco handles it.',
    prompts: ['I need a quiet table for two tonight.', 'What is your signature pasta?', 'Do you have wine pairing?'],
    route: '/restaurant/gusto',
    whatsappNumber: '601116343646',
    emoji: '👨‍🍳',
  },
];

export const DemoSection = () => {
  const { triggerCall } = useVoice();

  return (
    <section id="demo" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - THE HAT SWITCH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Don't Trust Us.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              Test Us.
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            For the next 60 seconds,{' '}
            <span className="font-semibold text-gray-800">forget you are a business owner</span>. Pretend
            you are hungry. Pick a restaurant below.{' '}
            <span className="font-semibold text-gray-800">Be the customer.</span>
          </p>
        </motion.div>

        {/* Character Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {specialists.map((specialist, index) => (
            <SpecialistCard key={specialist.id} specialist={specialist} index={index} />
          ))}
        </div>

        {/* Nova - The Boss Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => triggerCall()}
            className="inline-flex items-center gap-4 bg-white border-2 border-gray-200 rounded-2xl p-4 pr-6 hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
              👩‍💼
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">I'm Nova.</p>
              <p className="text-sm text-gray-600">I manage the backend. Want to see how I handle the data?</p>
            </div>
            <div className="ml-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              Talk to Nova
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

function SpecialistCard({ specialist, index }: { specialist: Specialist; index: number }) {
  const navigate = useNavigate();
  const { triggerCall } = useVoice();

  const handleVisitWebsite = () => {
    navigate(specialist.route);
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${specialist.whatsappNumber}?text=Hi ${specialist.name}! I'd like to make a reservation.`,
      '_blank'
    );
  };

  const handleVoiceCall = () => {
    navigate(specialist.route);
    setTimeout(() => triggerCall(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`${specialist.bgLight} ${specialist.borderColor} border-2 rounded-3xl overflow-hidden hover:shadow-xl transition-all group`}
    >
      {/* Restaurant Header */}
      <div className={`bg-gradient-to-r ${specialist.gradient} text-white p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">{specialist.cuisine}</p>
            <h3 className="text-xl font-bold">{specialist.restaurant}</h3>
          </div>
          <span className="text-3xl">{specialist.flag}</span>
        </div>
      </div>

      {/* Character */}
      <div className="relative h-32 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
          {specialist.emoji}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name & Title */}
        <div className="text-center">
          <h4 className="text-xl font-bold text-gray-900">Meet {specialist.name}</h4>
          <p className="text-gray-600">"{specialist.title}"</p>
        </div>

        {/* Role Play Prompt */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">🎭</span>
            <p className="text-sm text-gray-700 font-medium">{specialist.role}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1">
              <span>💬</span> Try asking:
            </p>
            <ul className="space-y-1">
              {specialist.prompts.map((prompt, i) => (
                <li key={i} className="text-sm text-gray-600 pl-4">
                  • "{prompt}"
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleVisitWebsite}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${specialist.gradient} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
          >
            <Globe size={18} />
            Chat with {specialist.name}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </button>
            <button
              onClick={handleVoiceCall}
              className="flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              <Phone size={16} />
              Call
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DemoSection;

