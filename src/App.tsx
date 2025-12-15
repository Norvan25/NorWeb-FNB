import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { NovaChatProvider } from './context/NovaChatContext';
import { LandingHub } from './pages/LandingHub';
import { RestaurantPage } from './pages/RestaurantPage';
import { Rimba } from './pages/Rimba';
import { Rouge } from './pages/Rouge';
import { Veda } from './pages/Veda';
import { Gusto } from './pages/Gusto';
import { NovaChat } from './components/NovaChat/NovaChat';
import { NovaFloatingButton } from './components/NovaChat/NovaFloatingButton';

function App() {
  return (
    <CartProvider>
      <NovaChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingHub />} />
            <Route path="/restaurant/rimba" element={<Rimba />} />
            <Route path="/restaurant/rouge" element={<Rouge />} />
            <Route path="/restaurant/veda" element={<Veda />} />
            <Route path="/restaurant/gusto" element={<Gusto />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
          </Routes>
          <NovaChat />
          <NovaFloatingButton />
        </Router>
      </NovaChatProvider>
    </CartProvider>
  );
}

export default App;
