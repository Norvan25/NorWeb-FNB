import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Phone, Mic, MicOff, X, Minus, ChevronUp } from 'lucide-react';
import { useElevenLabsConversation } from '../../hooks/useElevenLabsConversation';
import { getAgentForPath, AgentConfig } from '../../config/agents';
import { useVoice } from '../../context/VoiceContext';

type HUDState = 'idle' | 'compact' | 'minimized' | 'expanded';

interface VoiceHUDProps {
  visitorContext?: {
    source?: string;
    email?: string;
    phone?: string;
    name?: string;
  };
}

// Waveform visualization component
const VoiceWaveform = ({ isActive, isSpeaking, color }: { isActive: boolean; isSpeaking: boolean; color: string }) => {
  const barCount = 5;
  
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: isActive 
              ? isSpeaking 
                ? [12, 32, 20, 40, 16][i % 5] 
                : [8, 12, 8, 12, 8][i % 5]
              : 4,
            opacity: isActive ? 1 : 0.4,
          }}
          transition={{
            duration: isSpeaking ? 0.15 : 0.3,
            repeat: isActive ? Infinity : 0,
            repeatType: 'reverse',
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

// Compact panel during call
const CompactPanel = ({
  agent,
  isAgentSpeaking,
  isUserSpeaking,
  isMuted,
  error,
  onMinimize,
  onMute,
  onEnd,
}: {
  agent: AgentConfig;
  isAgentSpeaking: boolean;
  isUserSpeaking: boolean;
  isMuted: boolean;
  error: string | null;
  onMinimize: () => void;
  onMute: () => void;
  onEnd: () => void;
}) => {
  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 50) {
      onMinimize();
    }
  };

  return (
    <motion.div
      className="w-[300px] max-w-[calc(100vw-32px)] rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(19, 34, 56, 0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${agent.themeColor}30`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${agent.themeColor}20`,
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing">
        <div className="w-10 h-1 rounded-full bg-white/20" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 pb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: agent.themeColor }}
          />
          <span className="text-sm font-semibold" style={{ color: agent.themeColor }}>
            {agent.agentName}
          </span>
          <span className="text-xs text-gray-400">• {agent.agentRole}</span>
        </div>
        <button
          onClick={onMinimize}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ color: 'white' }}
        >
          <Minus size={16} />
        </button>
      </div>

      {/* Waveform */}
      <div className="px-4 py-4">
        <VoiceWaveform 
          isActive={true} 
          isSpeaking={isAgentSpeaking} 
          color={agent.themeColor} 
        />
        <p className="text-center text-xs text-gray-400 mt-2">
          {error ? (
            <span className="text-red-400">{error}</span>
          ) : isAgentSpeaking ? (
            `${agent.agentName} is speaking...`
          ) : isUserSpeaking ? (
            'Listening...'
          ) : (
            'Connected'
          )}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 px-4 pb-4">
        <button
          onClick={onMute}
          className={`flex-1 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            isMuted 
              ? 'bg-orange-500 text-white' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button
          onClick={onEnd}
          className="flex-1 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600 transition-all"
        >
          <X size={16} />
          End
        </button>
      </div>
    </motion.div>
  );
};

// Minimized bubble
const MiniBubble = ({
  agent,
  isAgentSpeaking,
  onClick,
}: {
  agent: AgentConfig;
  isAgentSpeaking: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
    style={{
      background: `linear-gradient(135deg, ${agent.themeColor} 0%, ${agent.secondaryColor} 100%)`,
      boxShadow: `0 4px 20px ${agent.themeColor}40`,
    }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ 
      opacity: 1, 
      scale: isAgentSpeaking ? [1, 1.1, 1] : 1,
    }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{
      scale: { duration: 0.5, repeat: isAgentSpeaking ? Infinity : 0 }
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <ChevronUp size={24} className="text-white" />
    
    {/* Active call indicator */}
    <motion.div
      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2"
      style={{ borderColor: agent.themeColor }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </motion.button>
);

// Main VoiceHUD component
export const VoiceHUD = ({ visitorContext: _visitorContext }: VoiceHUDProps) => {
  const location = useLocation();
  const [hudState, setHudState] = useState<HUDState>('idle');
  const { shouldStartCall, resetCallTrigger } = useVoice();
  
  // Get current agent based on route
  const agent = getAgentForPath(location.pathname);

  const {
    isConnected,
    isConnecting,
    isMuted,
    isAgentSpeaking,
    error,
    startCall,
    endCall,
    toggleMute,
  } = useElevenLabsConversation({
    agentId: agent.agentId,
    callbacks: {
      onConnect: () => setHudState('compact'),
      onDisconnect: () => setHudState('idle'),
      onError: (err) => console.error('Voice error:', err),
    },
  });

  // Handle external trigger to start call (from buttons on pages)
  useEffect(() => {
    if (shouldStartCall && hudState === 'idle' && !isConnecting) {
      startCall();
      resetCallTrigger();
    }
  }, [shouldStartCall, hudState, isConnecting, startCall, resetCallTrigger]);

  // Handle agent change when route changes
  useEffect(() => {
    if (isConnected) {
      // End call if route changes
      endCall();
    }
  }, [location.pathname]);

  const handleEndCall = useCallback(async () => {
    await endCall();
    setHudState('idle');
  }, [endCall]);

  // Don't render button if no agent ID configured, but don't break the app
  if (!agent.agentId) {
    console.warn('No agent ID configured for path:', location.pathname);
    return <></>;
  }

  // Don't render anything in idle state - NovaFloatingBubble handles that now
  // Only show HUD during active calls (compact/minimized states)
  if (hudState === 'idle' && !isConnecting) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence mode="wait">
        {/* Show connecting state */}
        {hudState === 'idle' && isConnecting && (
          <motion.div
            className="flex items-center gap-3 px-5 py-3 rounded-full text-white font-semibold text-sm shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${agent.themeColor} 0%, ${agent.secondaryColor} 100%)`,
              boxShadow: `0 4px 20px ${agent.themeColor}40`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Phone size={18} />
            </motion.div>
            <span>Connecting...</span>
          </motion.div>
        )}

        {hudState === 'compact' && (
          <CompactPanel
            agent={agent}
            isAgentSpeaking={isAgentSpeaking}
            isUserSpeaking={false}
            isMuted={isMuted}
            error={error}
            onMinimize={() => setHudState('minimized')}
            onMute={toggleMute}
            onEnd={handleEndCall}
          />
        )}

        {hudState === 'minimized' && (
          <MiniBubble
            agent={agent}
            isAgentSpeaking={isAgentSpeaking}
            onClick={() => setHudState('compact')}
          />
        )}
      </AnimatePresence>

      {/* Mobile: Bottom sheet safe area */}
      <div className="h-safe-bottom md:hidden" />
    </div>
  );
};

export default VoiceHUD;

