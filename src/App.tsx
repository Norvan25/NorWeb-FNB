import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import './components/voice/voice-hud.css';

function AppContent() {
  const { showLeadCapture, closeLeadCapture, selectedPlan } = useCommunication();
  
  return (
    <Router>
      {/* Global Announcement Banner - top of all pages */}
      <AnnouncementBanner />
      
      {/* Main content with scroll support */}
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
      
      {/* Global Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={showLeadCapture} 
        onClose={closeLeadCapture}
        selectedPlan={selectedPlan}
      />
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
