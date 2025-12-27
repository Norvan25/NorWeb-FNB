import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CommunicationProvider, useCommunication } from './context/CommunicationContext';
import { VoiceProvider } from './context/VoiceContext';
import { LandingHub } from './pages/LandingHub';
import { RestaurantPage } from './pages/RestaurantPage';
import { Rimba } from './pages/Rimba';
import { Rouge } from './pages/Rouge';
import { Veda } from './pages/Veda';
import { Gusto } from './pages/Gusto';
import { VoiceHUD } from './components/voice/VoiceHUD';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { StructuredData } from './components/StructuredData';
import { ScrollTracker } from './components/ScrollTracker';
import { NovaFloatingBubble } from './components/NovaFloatingBubble';
import { initializeTracking } from './lib/tracking';
import './components/voice/voice-hud.css';

// Inner component that has access to router context
function AppRoutes() {
  const location = useLocation();
  const { showLeadCapture, closeLeadCapture, selectedPlan } = useCommunication();
  
  // Initialize tracking on mount
  useEffect(() => {
    initializeTracking();
  }, []);
  
  // Only show Nova bubble on landing page
  const isLandingPage = location.pathname === '/';
  
  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData />
      
      {/* Analytics Scroll Tracker */}
      <ScrollTracker />
      
      {/* Main content */}
      <main className="content-scrollable">
        <Routes>
          <Route path="/" element={<LandingHub />} />
          <Route path="/restaurant/rimba" element={<Rimba />} />
          <Route path="/restaurant/rouge" element={<Rouge />} />
          <Route path="/restaurant/veda" element={<Veda />} />
          <Route path="/restaurant/gusto" element={<Gusto />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
      </main>
      
      {/* Production Voice HUD - route-aware agent selection */}
      <VoiceHUD />
      
      {/* Fixed Nova Bubble - Only on landing page */}
      {isLandingPage && <NovaFloatingBubble />}
      
      {/* Global Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={showLeadCapture} 
        onClose={closeLeadCapture}
        selectedPlan={selectedPlan}
      />
    </>
  );
}

function AppContent() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function App() {
  return (
    <CartProvider>
      <CommunicationProvider>
        <VoiceProvider>
          <AppContent />
        </VoiceProvider>
      </CommunicationProvider>
    </CartProvider>
  );
}

export default App;
