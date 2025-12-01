import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LandingHub } from './pages/LandingHub';
import { RestaurantPage } from './pages/RestaurantPage';
import { Rimba } from './pages/Rimba';
import { Rouge } from './pages/Rouge';
import VedaDebug from './pages/VedaDebug';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingHub />} />
          <Route path="/restaurant/rimba" element={<Rimba />} />
          <Route path="/restaurant/rouge" element={<Rouge />} />
          <Route path="/restaurant/veda" element={<VedaDebug />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
