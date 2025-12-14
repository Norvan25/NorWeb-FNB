import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LandingHub } from './pages/LandingHub';
import { RestaurantPage } from './pages/RestaurantPage';
import { Rimba } from './pages/Rimba';
import { Rouge } from './pages/Rouge';
import { Veda } from './pages/Veda';
import { Gusto } from './pages/Gusto';
import { ElevenLabsWidget } from './components/ElevenLabsWidget';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingHub />} />
          <Route path="/restaurant/rimba" element={<Rimba />} />
          <Route path="/restaurant/rouge" element={<Rouge />} />
          <Route path="/restaurant/veda" element={<Veda />} />
          <Route path="/restaurant/gusto" element={<Gusto />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
        <ElevenLabsWidget />
      </Router>
    </CartProvider>
  );
}

export default App;
