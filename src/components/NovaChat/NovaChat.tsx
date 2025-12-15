import { useState, useRef, useEffect } from 'react';
import { useNovaChat } from '../../context/NovaChatContext';
import { NovaOrb } from './NovaOrb';
import { LanguageSelect } from './LanguageSelect';
import './NovaChat.css';

const AGENT_ID = 'agent_6101kcewd8mvfh0tecwefhth3vwx';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export function NovaChat() {
  const { isOpen, closeChat } = useNovaChat();
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState('en');
  const [inputText, setInputText] = useState('');

  const conversationRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isOpen && isConnected) {
      endConversation();
      setMessages([]);
    }
  }, [isOpen]);

  const startConversation = async () => {
    try {
      const { Conversation } = await import('@elevenlabs/client');

      conversationRef.current = await Conversation.startSession({
        agentId: AGENT_ID,
        overrides: {
          agent: {
            language: language,
          },
        },
        onConnect: () => {
          console.log('Connected to Nova');
          setIsConnected(true);
        },
        onDisconnect: () => {
          console.log('Disconnected from Nova');
          setIsConnected(false);
          setIsListening(false);
          setIsSpeaking(false);
        },
        onMessage: (message: any) => {
          if (message.type === 'user_transcript') {
            setMessages(prev => [...prev, { role: 'user', text: message.message }]);
          } else if (message.type === 'agent_response') {
            setMessages(prev => [...prev, { role: 'assistant', text: message.message }]);
          }
        },
        onModeChange: (mode: any) => {
          setIsListening(mode.mode === 'listening');
          setIsSpeaking(mode.mode === 'speaking');
        },
        onError: (error: any) => {
          console.error('Nova error:', error);
        },
      });

      await navigator.mediaDevices.getUserMedia({ audio: true });

    } catch (error) {
      console.error('Failed to start conversation:', error);
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
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
  };

  const sendTextMessage = async (text: string) => {
    if (conversationRef.current && text.trim()) {
      setMessages(prev => [...prev, { role: 'user', text }]);

      try {
        await conversationRef.current.sendText(text);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleCallToggle = async () => {
    if (isConnected) {
      await endConversation();
    } else {
      await startConversation();
    }
  };

  const handleSendText = () => {
    if (inputText.trim()) {
      sendTextMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="nova-chat-overlay" onClick={closeChat}>
      <div className="nova-chat-modal" onClick={e => e.stopPropagation()}>
        <div className="nova-chat-header">
          <div className="nova-chat-title">
            <span className="nova-avatar">🤖</span>
            <div>
              <h3>Nova</h3>
              <span className="nova-subtitle">AI Restaurant Assistant</span>
            </div>
          </div>
          <div className="nova-chat-header-actions">
            <LanguageSelect value={language} onChange={setLanguage} disabled={isConnected} />
            <button className="nova-chat-close" onClick={closeChat}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="nova-chat-orb-container">
          <NovaOrb isActive={isConnected} isListening={isListening} isSpeaking={isSpeaking} />
        </div>

        <button
          className={`nova-chat-call-btn ${isConnected ? 'active' : ''}`}
          onClick={handleCallToggle}
        >
          {isConnected ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          )}
        </button>

        <div className={`nova-chat-status ${isConnected ? 'active' : ''}`}>
          {isConnected
            ? (isSpeaking ? '🗣️ Nova is speaking...' : isListening ? '👂 Listening...' : '✓ Connected')
            : 'Tap to talk with Nova'
          }
        </div>

        {!isConnected && messages.length === 0 && (
          <div className="nova-chat-hints">
            <span>Try asking:</span>
            <button onClick={() => sendTextMessage("What's on the menu?")}>
              "What's on the menu?"
            </button>
            <button onClick={() => sendTextMessage("I'd like to make a reservation")}>
              "Make a reservation"
            </button>
          </div>
        )}

        {messages.length > 0 && (
          <div className="nova-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`nova-chat-message ${msg.role}`}>
                <span className="nova-chat-message-avatar">
                  {msg.role === 'assistant' ? '🤖' : '👤'}
                </span>
                <span className="nova-chat-message-text">{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="nova-chat-input-container">
          <input
            type="text"
            className="nova-chat-input"
            placeholder="Type a message..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="nova-chat-send-btn"
            onClick={handleSendText}
            disabled={!inputText.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

        <div className="nova-chat-footer">
          Powered by NorWeb FnB
        </div>
      </div>
    </div>
  );
}
