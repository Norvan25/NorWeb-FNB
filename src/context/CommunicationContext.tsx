import { createContext, useContext, useState, ReactNode } from 'react';

export type CommunicationMode = 'HUB' | 'RESTAURANT';
export type RestaurantName = 'RIMBA' | 'ROUGE' | 'VEDA' | 'GUSTO';

interface CommunicationContextType {
  isOpen: boolean;
  mode: CommunicationMode;
  activeContext: string | null;
  activeRestaurant: RestaurantName | null;
  showLeadCapture: boolean;
  selectedPlan: string | null;
  openHUD: (mode: CommunicationMode, context?: string, restaurant?: RestaurantName) => void;
  closeHUD: () => void;
  switchMode: (mode: CommunicationMode, context?: string, restaurant?: RestaurantName) => void;
  openLeadCapture: (plan?: string) => void;
  closeLeadCapture: () => void;
}

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined);

export const CommunicationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CommunicationMode>('HUB');
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const [activeRestaurant, setActiveRestaurant] = useState<RestaurantName | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const openHUD = (newMode: CommunicationMode, context?: string, restaurant?: RestaurantName) => {
    if (isOpen) return;
    setMode(newMode);
    setActiveContext(context || null);
    setActiveRestaurant(restaurant || null);
    setIsOpen(true);
  };

  const closeHUD = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMode('HUB');
      setActiveContext(null);
      setActiveRestaurant(null);
    }, 300);
  };

  const switchMode = (newMode: CommunicationMode, context?: string, restaurant?: RestaurantName) => {
    setMode(newMode);
    setActiveContext(context || null);
    setActiveRestaurant(restaurant || null);
  };

  const openLeadCapture = (plan?: string) => {
    setSelectedPlan(plan || null);
    setShowLeadCapture(true);
  };

  const closeLeadCapture = () => {
    setShowLeadCapture(false);
    setSelectedPlan(null);
  };

  return (
    <CommunicationContext.Provider
      value={{
        isOpen,
        mode,
        activeContext,
        activeRestaurant,
        showLeadCapture,
        selectedPlan,
        openHUD,
        closeHUD,
        switchMode,
        openLeadCapture,
        closeLeadCapture,
      }}
    >
      {children}
    </CommunicationContext.Provider>
  );
};

export const useCommunication = () => {
  const context = useContext(CommunicationContext);
  if (context === undefined) {
    throw new Error('useCommunication must be used within a CommunicationProvider');
  }
  return context;
};
