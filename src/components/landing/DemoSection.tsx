import { motion } from 'framer-motion';
import { Globe, MessageCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useVoice } from '../../context/VoiceContext';

interface Specialist {
  id: string;
  name: string;
  titleKey: string;
  restaurant: string;
  cuisineKey: string;
  flag: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  bgLight: string;
  textDark: string;
  roleKey: string;
  promptKeys: string[];
  route: string;
  whatsappNumber: string;
  image: string;
}

const specialists: Specialist[] = [
  {
    id: 'aiman',
    name: 'AIMAN',
    titleKey: 'demo.aiman_title',
    restaurant: 'RIMBA Kitchen',
    cuisineKey: 'demo.malay_cuisine',
    flag: '🇲🇾',
    color: '#22C55E',
    gradientFrom: '#22C55E',
    gradientTo: '#16A34A',
    bgLight: 'bg-green-50',
    textDark: 'text-green-800',
    roleKey: 'demo.aiman_role',
    promptKeys: ['demo.aiman_prompt1', 'demo.aiman_prompt2', 'demo.aiman_prompt3'],
    route: '/restaurant/rimba',
    whatsappNumber: '601116343646',
    image: '/images/AIMAN.png',
  },
  {
    id: 'dev',
    name: 'DEV',
    titleKey: 'demo.dev_title',
    restaurant: 'VEDA Spice',
    cuisineKey: 'demo.indian_cuisine',
    flag: '🇮🇳',
    color: '#F97316',
    gradientFrom: '#F97316',
    gradientTo: '#EA580C',
    bgLight: 'bg-orange-50',
    textDark: 'text-orange-800',
    roleKey: 'demo.dev_role',
    promptKeys: ['demo.dev_prompt1', 'demo.dev_prompt2', 'demo.dev_prompt3'],
    route: '/restaurant/veda',
    whatsappNumber: '601116343646',
    image: '/images/DEV.png',
  },
  {
    id: 'marco',
    name: 'MARCO',
    titleKey: 'demo.marco_title',
    restaurant: 'GUSTO Italiano',
    cuisineKey: 'demo.italian_cuisine',
    flag: '🇮🇹',
    color: '#EF4444',
    gradientFrom: '#EF4444',
    gradientTo: '#DC2626',
    bgLight: 'bg-red-50',
    textDark: 'text-red-800',
    roleKey: 'demo.marco_role',
    promptKeys: ['demo.marco_prompt1', 'demo.marco_prompt2', 'demo.marco_prompt3'],
    route: '/restaurant/gusto',
    whatsappNumber: '601116343646',
    image: '/images/MARCO.png',
  },
];

export const DemoSection = () => {
  const { t } = useTranslation();
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
            {t('demo.headline')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
              {t('demo.headline_highlight')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563]">
            {t('demo.subheadline_start')}{' '}
            <span className="font-semibold text-[#0A1628]">{t('demo.subheadline_bold1')}</span>
            {t('demo.subheadline_mid')}{' '}
            <span className="font-semibold text-[#0A1628]">{t('demo.subheadline_bold2')}</span>
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
          className="mt-12 flex justify-center px-4"
        >
          <button
            onClick={() => triggerCall()}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white border-2 border-[#0A1628]/10 rounded-2xl p-4 sm:pr-6 hover:border-[#F28500]/50 hover:shadow-xl transition-all cursor-pointer group w-full sm:w-auto max-w-md sm:max-w-none"
          >
            <div className="w-16 h-20 flex items-end justify-center flex-shrink-0">
              <img
                src="/images/NOVA.png"
                alt="Nova"
                className="h-16 w-auto object-contain object-bottom"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-[#0A1628]">{t('demo.nova_intro')}</p>
              <p className="text-sm text-[#4B5563]">
                {t('demo.nova_description')}
              </p>
            </div>
            <div className="sm:ml-4 bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-5 py-2.5 rounded-full text-sm font-semibold group-hover:shadow-lg transition-all w-full sm:w-auto text-center">
              {t('demo.talk_to_nova')}
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

function SpecialistCard({ specialist, index }: { specialist: Specialist; index: number }) {
  const { t } = useTranslation();
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
            <p className="text-sm opacity-90 font-medium">{t(specialist.cuisineKey)}</p>
            <h3 className="text-xl font-bold">{specialist.restaurant}</h3>
          </div>
          <span className="text-3xl">{specialist.flag}</span>
        </div>
      </div>

      {/* Character - Large and prominent */}
      <div className="relative h-56 flex items-end justify-center bg-gradient-to-b from-gray-50 via-gray-50/50 to-white overflow-visible">
        <motion.img
          whileHover={{ scale: 1.08, y: -8 }}
          src={specialist.image}
          alt={specialist.name}
          className="h-52 w-auto object-contain object-bottom -mt-4 drop-shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name & Title */}
        <div className="text-center">
          <h4 className="text-xl font-bold text-[#0A1628]">{t('demo.meet')} {specialist.name}</h4>
          <p className="text-[#4B5563] italic">"{t(specialist.titleKey)}"</p>
        </div>

        {/* Role Play Prompt */}
        <div className={`${specialist.bgLight} rounded-xl p-4 space-y-3`}>
          <div className="flex items-start gap-2">
            <span className="text-lg">🎭</span>
            <p className={`text-sm ${specialist.textDark} font-medium`}>
              <span className="font-bold">{t('demo.your_role')}</span> {t(specialist.roleKey)}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1">
              💬 {t('demo.try_asking')}
            </p>
            <ul className="space-y-1">
              {specialist.promptKeys.map((promptKey, i) => (
                <li key={i} className="text-sm text-gray-600 pl-4">
                  • "{t(promptKey)}"
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleVisitWebsite}
            className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all chat-button-pulse"
            style={{
              background: `linear-gradient(135deg, ${specialist.gradientFrom}, ${specialist.gradientTo})`,
              ['--button-glow' as string]: specialist.gradientFrom,
            }}
          >
            <Globe size={18} />
            {t('demo.chat_with')} {specialist.name}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={16} />
              {t('demo.whatsapp')}
            </button>
            <button
              onClick={handleVoiceCall}
              className="flex items-center justify-center gap-2 bg-[#0A1628] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#132238] transition-colors"
            >
              <Phone size={16} />
              {t('demo.call')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DemoSection;
