import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface VoiceContextType {
  shouldStartCall: boolean;
  triggerCall: () => void;
  resetCallTrigger: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [shouldStartCall, setShouldStartCall] = useState(false);

  const triggerCall = useCallback(() => {
    setShouldStartCall(true);
  }, []);

  const resetCallTrigger = useCallback(() => {
    setShouldStartCall(false);
  }, []);

  return (
    <VoiceContext.Provider value={{ shouldStartCall, triggerCall, resetCallTrigger }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}

