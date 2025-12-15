import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CommunicationProvider } from './context/CommunicationContext';
import { LandingHub } from './pages/LandingHub';
import { RestaurantPage } from './pages/RestaurantPage';
import { Rimba } from './pages/Rimba';
import { Rouge } from './pages/Rouge';
import { Veda } from './pages/Veda';
import { Gusto } from './pages/Gusto';

function App() {
  return (
    <CartProvider>
      <CommunicationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingHub />} />
            <Route path="/restaurant/rimba" element={<Rimba />} />
            <Route path="/restaurant/rouge" element={<Rouge />} />
            <Route path="/restaurant/veda" element={<Veda />} />
            <Route path="/restaurant/gusto" element={<Gusto />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
          </Routes>
        </Router>
      </CommunicationProvider>
    </CartProvider>
  );
}

export default App;
