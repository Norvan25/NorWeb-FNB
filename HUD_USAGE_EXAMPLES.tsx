/**
 * Voice AI HUD - Usage Examples
 *
 * This file contains practical examples of how to integrate and use
 * the CommunicationHUD in various scenarios.
 */

import { useCommunication } from './context/CommunicationContext';
import { Phone, MessageCircle, Headphones } from 'lucide-react';

// ============================================
// EXAMPLE 1: Simple Call Button
// ============================================

export const SimpleCallButton = () => {
  const { openHUD } = useCommunication();

  return (
    <button
      onClick={() => openHUD('HUB')}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all"
    >
      <Phone size={20} />
      Talk to AI
    </button>
  );
};

// ============================================
// EXAMPLE 2: Floating Action Button (FAB)
// ============================================

export const FloatingAIButton = () => {
  const { openHUD } = useCommunication();

  return (
    <button
      onClick={() => openHUD('HUB')}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-50"
      aria-label="Open AI Assistant"
    >
      <MessageCircle size={28} className="text-white" />
    </button>
  );
};

// ============================================
// EXAMPLE 3: Context-Aware Support Button
// ============================================

export const SupportButton = ({ context }: { context: string }) => {
  const { openHUD } = useCommunication();

  return (
    <button
      onClick={() => openHUD('HUB', `CONTEXT: ${context}`)}
      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
    >
      <Headphones size={18} />
      <span>Get Help</span>
    </button>
  );
};

// ============================================
// EXAMPLE 4: Product Page Integration
// ============================================

export const ProductInquiryButton = ({ productName, productId }: {
  productName: string;
  productId: string;
}) => {
  const { openHUD } = useCommunication();

  return (
    <button
      onClick={() => openHUD('HUB', `CONTEXT: USER_VIEWING_PRODUCT_${productId}_${productName}`)}
      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
    >
      Ask Questions About This Product
    </button>
  );
};

// ============================================
// EXAMPLE 5: Navigation Bar Integration
// ============================================

export const NavBarAIButton = () => {
  const { openHUD, isOpen } = useCommunication();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">Your Brand</div>

      <button
        onClick={() => openHUD('HUB')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full transition-all
          ${isOpen
            ? 'bg-red-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }
        `}
      >
        {isOpen ? (
          <>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            AI Active
          </>
        ) : (
          <>
            <MessageCircle size={18} />
            Talk to AI
          </>
        )}
      </button>
    </nav>
  );
};

// ============================================
// EXAMPLE 6: Multi-Agent Selector
// ============================================

export const MultiAgentSelector = () => {
  const { openHUD } = useCommunication();

  const agents = [
    { id: 'SALES', name: 'Sales', color: 'bg-blue-500', icon: '💼' },
    { id: 'SUPPORT', name: 'Support', color: 'bg-green-500', icon: '🎧' },
    { id: 'BILLING', name: 'Billing', color: 'bg-purple-500', icon: '💳' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => openHUD('RESTAURANT', `CONTEXT: USER_SELECTED_${agent.id}`, agent.id as any)}
          className={`${agent.color} text-white p-6 rounded-xl hover:scale-105 transition-transform flex flex-col items-center gap-2`}
        >
          <span className="text-4xl">{agent.icon}</span>
          <span className="font-medium">{agent.name}</span>
        </button>
      ))}
    </div>
  );
};

// ============================================
// EXAMPLE 7: Hero Section with AI CTA
// ============================================

export const HeroWithAI = () => {
  const { openHUD } = useCommunication();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-6xl font-bold">
          Welcome to the Future
        </h1>
        <p className="text-xl text-white/90">
          Chat with our AI assistant for instant answers
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => openHUD('HUB')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
          >
            Start Talking
          </button>

          <button
            onClick={() => openHUD('HUB', 'CONTEXT: USER_WANTS_DEMO')}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
          >
            Request Demo
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================
// EXAMPLE 8: Booking/Reservation Integration
// ============================================

export const BookingButton = ({ restaurantName }: { restaurantName: string }) => {
  const { openHUD } = useCommunication();

  return (
    <button
      onClick={() => openHUD(
        'RESTAURANT',
        `CONTEXT: USER_WANTS_RESERVATION_${restaurantName.toUpperCase()}`,
        restaurantName.toUpperCase() as any
      )}
      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-2xl transition-shadow"
    >
      Make a Reservation via Voice
    </button>
  );
};

// ============================================
// EXAMPLE 9: Help Widget
// ============================================

export const HelpWidget = () => {
  const { openHUD, isOpen } = useCommunication();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4 w-80 animate-in slide-in-from-bottom">
          <h3 className="font-bold text-lg mb-2">Need Help?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Our AI assistant is here to help you 24/7
          </p>
          <button
            onClick={() => openHUD('HUB')}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Start Conversation
          </button>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-blue-500 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        {isExpanded ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>
    </div>
  );
};

// ============================================
// EXAMPLE 10: Page-Specific Context
// ============================================

export const usePageContext = () => {
  const { openHUD } = useCommunication();

  const openWithPageContext = () => {
    const pathname = window.location.pathname;
    const context = `CONTEXT: USER_ON_PAGE_${pathname.replace(/\//g, '_').toUpperCase()}`;
    openHUD('HUB', context);
  };

  return { openWithPageContext };
};

// Usage:
export const PageContextButton = () => {
  const { openWithPageContext } = usePageContext();

  return (
    <button onClick={openWithPageContext}>
      Get Help on This Page
    </button>
  );
};

// ============================================
// EXAMPLE 11: Emergency/Urgent Contact
// ============================================

export const UrgentContactButton = () => {
  const { openHUD } = useCommunication();

  return (
    <button
      onClick={() => openHUD('HUB', 'CONTEXT: URGENT_ASSISTANCE_NEEDED')}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 animate-pulse"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      Urgent Help
    </button>
  );
};

// ============================================
// EXAMPLE 12: Programmatic Trigger
// ============================================

export const AutoTriggerExample = () => {
  const { openHUD } = useCommunication();

  useEffect(() => {
    // Auto-open after 10 seconds on page
    const timer = setTimeout(() => {
      openHUD('HUB', 'CONTEXT: AUTO_TRIGGERED_WELCOME');
    }, 10000);

    return () => clearTimeout(timer);
  }, [openHUD]);

  return null; // No UI, just logic
};

// ============================================
// Full App Example
// ============================================

import { CommunicationProvider } from './context/CommunicationContext';
import { CommunicationHUD } from './components/CommunicationHUD';

export function AppWithAI() {
  return (
    <CommunicationProvider>
      <div className="min-h-screen">
        {/* Your app content */}
        <HeroWithAI />
        <FloatingAIButton />

        {/* The HUD component */}
        <CommunicationHUD />
      </div>
    </CommunicationProvider>
  );
}

/**
 * CUSTOMIZATION TIPS:
 *
 * 1. Theme Colors:
 *    - Update the AGENT_THEMES object in CommunicationHUD.tsx
 *    - Match your brand colors: primary, secondary
 *
 * 2. Icons:
 *    - Import from lucide-react or use custom SVGs
 *    - Replace the icon property in AGENT_THEMES
 *
 * 3. Context Strings:
 *    - Pass meaningful context to help the AI understand user intent
 *    - Format: 'CONTEXT: USER_ACTION_DETAIL'
 *
 * 4. Multi-Agent Setup:
 *    - Create separate agents in ElevenLabs dashboard
 *    - Add agent IDs to .env
 *    - Add to AGENT_THEMES configuration
 *
 * 5. Styling:
 *    - All components use Tailwind CSS
 *    - Customize classes to match your design system
 *    - Update animations, shadows, and transitions
 */
