import { createContext, useContext, useState, ReactNode } from 'react';

interface NovaChatContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

const NovaChatContext = createContext<NovaChatContextType | undefined>(undefined);

export function NovaChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <NovaChatContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}
    </NovaChatContext.Provider>
  );
}

export function useNovaChat() {
  const context = useContext(NovaChatContext);
  if (!context) {
    throw new Error('useNovaChat must be used within NovaChatProvider');
  }
  return context;
}
