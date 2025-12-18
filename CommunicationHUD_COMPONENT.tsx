/**
 * CommunicationHUD Component
 *
 * A reusable Voice AI HUD component with ElevenLabs integration
 * Customizable theme colors and multi-agent support
 *
 * DEPENDENCIES:
 * - @elevenlabs/client
 * - framer-motion
 * - lucide-react (for icons)
 * - CommunicationContext (see integration guide)
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Bot } from 'lucide-react'; // Add more icons as needed
import { useCommunication } from '../context/CommunicationContext';
import { Conversation } from '@elevenlabs/client';

// ============================================
// CUSTOMIZE THIS SECTION FOR YOUR PROJECT
// ============================================

/**
 * Define your agents/themes here
 * Replace with your own agent IDs and theme colors
 */
const AGENT_THEMES = {
  MAIN: {
    icon: Bot,                    // Replace with your icon
    primary: '#00D4AA',           // Your primary color
    secondary: '#00A888',         // Your secondary color
    name: 'Main Assistant',       // Agent display name
    agentId: import.meta.env.VITE_ELEVENLABS_HUB_AGENT_ID || 'your_agent_id_here',
  },
  // Add more agents as needed:
  // SUPPORT: {
  //   icon: HeadphonesIcon,
  //   primary: '#3B82F6',
  //   secondary: '#2563EB',
  //   name: 'Support Agent',
  //   agentId: import.meta.env.VITE_ELEVENLABS_SUPPORT_AGENT_ID,
  // },
};

// ============================================
// COMPONENT CODE (Minimal changes needed below)
// ============================================

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const NovaOrb = ({ isActive, isListening, isSpeaking, color }: {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  color: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 140;
    canvas.width = size;
    canvas.height = size;

    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 55, 0, Math.PI * 2);
      ctx.strokeStyle = isActive ? `${color}40` : `${color}20`;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isActive) {
        const waveCount = isSpeaking ? 5 : 3;
        const amplitude = isSpeaking ? 15 : (isListening ? 10 : 5);

        for (let i = 0; i < waveCount; i++) {
          const radius = 30 + i * 6 + Math.sin(phase + i * 0.5) * amplitude;
          const alpha = (0.4 - i * 0.06).toString(16).padStart(2, '0');

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `${color}${alpha}`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? color : `${color}99`;
      ctx.fill();

      if (isActive) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      phase += isActive ? 0.08 : 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isListening, isSpeaking, color]);

  return <canvas ref={canvasRef} style={{ width: '140px', height: '140px' }} />;
};

export const CommunicationHUD = () => {
  const { isOpen, mode, activeContext, activeRestaurant, closeHUD, switchMode } = useCommunication();

  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('en');

  const conversationRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isConnectingRef = useRef(false);
  const isConversationReadyRef = useRef(false);

  // Determine which agent to use
  const currentTheme = activeRestaurant && AGENT_THEMES[activeRestaurant as keyof typeof AGENT_THEMES]
    ? AGENT_THEMES[activeRestaurant as keyof typeof AGENT_THEMES]
    : AGENT_THEMES.MAIN;

  const themeColor = currentTheme.primary;
  const agentId = currentTheme.agentId;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isConnected && !isConnectingRef.current) {
      startConversation();
    } else if (!isOpen && isConnected) {
      endConversation();
      setMessages([]);
    }
  }, [isOpen]);

  const startConversation = async () => {
    if (isConnectingRef.current || conversationRef.current) {
      return;
    }

    isConnectingRef.current = true;
    try {
      console.log('Fetching signed URL from backend for agent:', agentId);
      const signedUrlResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-auth?agent_id=${agentId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!signedUrlResponse.ok) {
        const errorData = await signedUrlResponse.json();
        throw new Error(errorData.error || 'Failed to get signed URL');
      }

      const { signedUrl } = await signedUrlResponse.json();
      console.log('Got signed URL, starting conversation...');

      conversationRef.current = await Conversation.startSession({
        signedUrl,
        overrides: {
          agent: {
            language: language,
          },
        },
        onConnect: () => {
          console.log('ElevenLabs connected successfully to agent:', agentId);
          isConnectingRef.current = false;
          isConversationReadyRef.current = true;
          setIsConnected(true);
        },
        onDisconnect: () => {
          console.log('ElevenLabs disconnected');
          isConversationReadyRef.current = false;
          setIsConnected(false);
          setIsListening(false);
          setIsSpeaking(false);
        },
        onMessage: (message: any) => {
          console.log('ElevenLabs message:', message);
          if (message.type === 'user_transcript') {
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1];
              if (lastMessage?.role === 'user' && lastMessage.text === message.message) {
                return prev;
              }
              return [...prev, { role: 'user', text: message.message }];
            });
          } else if (message.type === 'agent_response') {
            setMessages(prev => [...prev, { role: 'assistant', text: message.message }]);
          }
        },
        onModeChange: (mode: any) => {
          setIsListening(mode.mode === 'listening');
          setIsSpeaking(mode.mode === 'speaking');
        },
        onError: (error: any) => {
          console.error('ElevenLabs error:', error);
        },
      });

      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      isConnectingRef.current = false;
      conversationRef.current = null;
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]);
    }
  };

  const endConversation = async () => {
    if (conversationRef.current) {
      try {
        await conversationRef.current.endSession();
      } catch (error) {
        console.error('Error ending conversation:', error);
      }
      conversationRef.current = null;
    }
    isConnectingRef.current = false;
    isConversationReadyRef.current = false;
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
  };

  const handleCallToggle = async () => {
    if (isConnected) {
      await endConversation();
    } else {
      await startConversation();
    }
  };

  const sendTextMessage = async (text: string) => {
    if (!conversationRef.current || !isConversationReadyRef.current || !text.trim()) {
      return;
    }

    try {
      await conversationRef.current.sendUserMessage(text);
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const handleSendText = async () => {
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText('');

    if (!isConversationReadyRef.current) {
      setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
      await startConversation();

      const maxWaitTime = 10000;
      const startTime = Date.now();

      while (!isConversationReadyRef.current && Date.now() - startTime < maxWaitTime) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      if (isConversationReadyRef.current) {
        try {
          await sendTextMessage(textToSend);
        } catch (error) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }]);
        }
      }
    } else {
      setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
      try {
        await sendTextMessage(textToSend);
      } catch (error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }]);
      }
    }
  };

  const handleClose = () => {
    endConversation();
    closeHUD();
  };

  const handleBackToHub = () => {
    switchMode('HUB');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[91] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-[90%] max-w-[380px] md:max-w-[420px] max-h-[85vh] md:max-h-[90vh] pointer-events-auto"
            >
            <div
              className="bg-[#0A0A0F] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              style={{
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: themeColor,
                boxShadow: `0 0 40px ${themeColor}40`
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 md:p-5 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <span className="text-2xl md:text-3xl flex-shrink-0">
                    <currentTheme.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: themeColor }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold text-sm md:text-base truncate">
                      {currentTheme.name}
                    </h3>
                    <span className="text-xs text-gray-400 truncate block">
                      {isConnected ? (isSpeaking ? '🗣️ Speaking' : isListening ? '👂 Listening' : '✓ Connected') : 'Tap to talk'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    disabled={isConnected}
                    className="bg-white/10 border border-white/20 rounded-lg px-1.5 md:px-2 py-1 text-xs md:text-sm text-white outline-none disabled:opacity-40"
                  >
                    <option value="en">🇺🇸</option>
                    <option value="es">🇪🇸</option>
                    <option value="fr">🇫🇷</option>
                    {/* Add more languages as needed */}
                  </select>
                  <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Orb & Call Button */}
              <div className="flex flex-col items-center py-4 md:py-6 px-4 md:px-6">
                <NovaOrb
                  isActive={isConnected}
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  color={themeColor}
                />

                <div className="flex flex-col items-center gap-2 mt-3 md:mt-4">
                  <button
                    onClick={handleCallToggle}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-lg"
                    style={{
                      background: isConnected
                        ? 'linear-gradient(135deg, #FF6B6B, #EE5A5A)'
                        : `linear-gradient(135deg, ${themeColor}, ${currentTheme.secondary})`,
                      boxShadow: `0 0 30px ${isConnected ? '#FF6B6B' : themeColor}60`
                    }}
                  >
                    {isConnected ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <rect x="6" y="6" width="12" height="12" rx="2"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    )}
                  </button>
                  {!isConnected && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-medium"
                      style={{ color: themeColor }}
                    >
                      Talk to {currentTheme.name}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Messages */}
              {messages.length > 0 && (
                <div className="flex-1 overflow-y-auto px-3 md:px-6 pb-3 md:pb-4 max-h-[200px] space-y-2 md:space-y-3">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-1.5 md:gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <span className="text-base md:text-lg flex-shrink-0">
                        {msg.role === 'assistant' ? '🤖' : '👤'}
                      </span>
                      <div
                        className="px-3 md:px-4 py-2 rounded-2xl max-w-[80%] md:max-w-[75%] text-xs md:text-sm break-words"
                        style={{
                          background: msg.role === 'user' ? `${themeColor}20` : '#141419',
                          border: msg.role === 'user' ? `1px solid ${themeColor}40` : '1px solid rgba(255,255,255,0.06)',
                          color: '#fff'
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}

              <div className="h-16" />

              {/* Footer */}
              <div className="text-center py-2 text-[10px] md:text-xs text-gray-500 border-t border-white/5">
                Powered by Your Brand
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Text Input */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[9999]" style={{ pointerEvents: 'auto' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputText.trim()) handleSendText();
            }}
            className="flex items-center gap-2 bg-black/80 backdrop-blur-xl rounded-full p-2 shadow-2xl w-full"
            style={{
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: themeColor,
              boxShadow: `0 0 40px ${themeColor}40`
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              autoComplete="off"
              className="flex-1 bg-transparent border-none px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${themeColor}, ${currentTheme.secondary})`
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </AnimatePresence>
  );
};
