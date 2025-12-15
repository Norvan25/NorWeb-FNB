import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CommunicationProvider } from './context/CommunicationContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommunicationProvider>
      <App />
    </CommunicationProvider>
  </StrictMode>
);
