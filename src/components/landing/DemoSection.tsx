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
  color: string;
  gradientFrom: string;
  gradientTo: string;
  bgLight: string;
  textDark: string;
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
    color: '#22C55E',
    gradientFrom: '#22C55E',
    gradientTo: '#16A34A',
    bgLight: 'bg-green-50',
    textDark: 'text-green-800',
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
    color: '#F97316',
    gradientFrom: '#F97316',
    gradientTo: '#EA580C',
    bgLight: 'bg-orange-50',
    textDark: 'text-orange-800',
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
    color: '#EF4444',
    gradientFrom: '#EF4444',
    gradientTo: '#DC2626',
    bgLight: 'bg-red-50',
    textDark: 'text-red-800',
    role: 'You want a romantic dinner. See how Marco handles it.',
    prompts: [
      'I need a quiet table for two tonight.',
      "What's your signature pasta?",
      'Do you have wine pairing?',
    ],
    route: '/restaurant/gusto',
    whatsappNumber: '601116343646',
    emoji: '👨‍🍳',
  },
];

export const DemoSection = () => {
  const { triggerCall } = useVoice();

  return (
    <section id="demo" className="py-20 px-4 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
            Don't Trust Us.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
              Test Us.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563]">
            For the next 60 seconds,{' '}
            <span className="font-semibold text-[#0A1628]">forget you're a business owner</span>.
            Pretend you're hungry. Pick a restaurant.{' '}
            <span className="font-semibold text-[#0A1628]">Be the customer.</span>
          </p>
        </motion.div>

        {/* Character Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {specialists.map((specialist, index) => (
            <SpecialistCard key={specialist.id} specialist={specialist} index={index} />
          ))}
        </div>

        {/* Nova - The Boss */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => triggerCall()}
            className="inline-flex items-center gap-4 bg-white border-2 border-[#0A1628]/10 rounded-2xl p-4 pr-6 hover:border-[#F28500]/50 hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F28500]/10 to-[#FF9A1F]/20 flex items-center justify-center text-3xl border-2 border-[#F28500]/30">
              👩‍💼
            </div>
            <div className="text-left">
              <p className="font-bold text-[#0A1628]">I'm Nova.</p>
              <p className="text-sm text-[#4B5563]">
                I manage the backend. Want to see how I handle the data?
              </p>
            </div>
            <div className="ml-4 bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-5 py-2.5 rounded-full text-sm font-semibold group-hover:shadow-lg transition-all">
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
      `https://wa.me/${specialist.whatsappNumber}?text=Hi%20${specialist.name}!%20I%20want%20to%20test%20NorWeb`,
      '_blank'
    );
  };

  const handleVoiceCall = () => {
    navigate(specialist.route);
    setTimeout(() => triggerCall(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-100"
    >
      {/* Restaurant Header */}
      <div
        className="text-white p-4"
        style={{
          background: `linear-gradient(135deg, ${specialist.gradientFrom}, ${specialist.gradientTo})`,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 font-medium">{specialist.cuisine}</p>
            <h3 className="text-xl font-bold">{specialist.restaurant}</h3>
          </div>
          <span className="text-3xl">{specialist.flag}</span>
        </div>
      </div>

      {/* Character */}
      <div className="relative h-36 flex items-center justify-center pt-4 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-xl border-4"
          style={{
            background: `linear-gradient(135deg, ${specialist.gradientFrom}20, ${specialist.gradientTo}40)`,
            borderColor: `${specialist.color}50`,
          }}
        >
          {specialist.emoji}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name & Title */}
        <div className="text-center">
          <h4 className="text-xl font-bold text-[#0A1628]">Meet {specialist.name}</h4>
          <p className="text-[#4B5563] italic">"{specialist.title}"</p>
        </div>

        {/* Role Play Prompt */}
        <div className={`${specialist.bgLight} rounded-xl p-4 space-y-3`}>
          <div className="flex items-start gap-2">
            <span className="text-lg">🎭</span>
            <p className={`text-sm ${specialist.textDark} font-medium`}>
              <span className="font-bold">YOUR ROLE:</span> {specialist.role}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1">
              💬 TRY ASKING:
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
        <div className="space-y-3">
          <button
            onClick={handleVisitWebsite}
            className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all"
            style={{
              background: `linear-gradient(135deg, ${specialist.gradientFrom}, ${specialist.gradientTo})`,
            }}
          >
            <Globe size={18} />
            Chat with {specialist.name}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </button>
            <button
              onClick={handleVoiceCall}
              className="flex items-center justify-center gap-2 bg-[#0A1628] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#132238] transition-colors"
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
