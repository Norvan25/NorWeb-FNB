import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type CommunicationMode = 'HUB' | 'RESTAURANT';
export type RestaurantName = 'RIMBA' | 'ROUGE' | 'VEDA' | 'GUSTO';

interface CommunicationContextType {
  isOpen: boolean;
  isAgentActive: boolean;
  mode: CommunicationMode;
  activeContext: string | null;
  activeRestaurant: RestaurantName | null;
  showLeadCapture: boolean;
  selectedPlan: string | null;
  openHUD: (mode: CommunicationMode, context?: string, restaurant?: RestaurantName) => boolean;
  closeHUD: () => void;
  switchMode: (mode: CommunicationMode, context?: string, restaurant?: RestaurantName) => void;
  openLeadCapture: (plan?: string) => void;
  closeLeadCapture: () => void;
  setAgentActive: (active: boolean) => void;
}

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined);

export const CommunicationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [mode, setMode] = useState<CommunicationMode>('HUB');
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const [activeRestaurant, setActiveRestaurant] = useState<RestaurantName | null>(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const openHUD = useCallback((newMode: CommunicationMode, context?: string, restaurant?: RestaurantName): boolean => {
    // Prevent opening if HUD is already open or an agent is active
    if (isOpen || isAgentActive) {
      console.log('Cannot open HUD: already open or agent active', { isOpen, isAgentActive });
      return false;
    }
    setMode(newMode);
    setActiveContext(context || null);
    setActiveRestaurant(restaurant || null);
    setIsOpen(true);
    return true;
  }, [isOpen, isAgentActive]);

  const closeHUD = useCallback(() => {
    setIsOpen(false);
    setIsAgentActive(false);
    setTimeout(() => {
      setMode('HUB');
      setActiveContext(null);
      setActiveRestaurant(null);
    }, 300);
  }, []);

  const switchMode = useCallback((newMode: CommunicationMode, context?: string, restaurant?: RestaurantName) => {
    setMode(newMode);
    setActiveContext(context || null);
    setActiveRestaurant(restaurant || null);
  }, []);

  const openLeadCapture = useCallback((plan?: string) => {
    setSelectedPlan(plan || null);
    setShowLeadCapture(true);
  }, []);

  const closeLeadCapture = useCallback(() => {
    setShowLeadCapture(false);
    setSelectedPlan(null);
  }, []);

  const setAgentActive = useCallback((active: boolean) => {
    setIsAgentActive(active);
  }, []);

  return (
    <CommunicationContext.Provider
      value={{
        isOpen,
        isAgentActive,
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
        setAgentActive,
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
