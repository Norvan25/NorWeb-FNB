import { useRef, useCallback, useState } from 'react';
import { Conversation } from '@elevenlabs/client';

export interface ConversationCallbacks {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onAgentSpeaking?: (speaking: boolean) => void;
  onUserSpeaking?: (speaking: boolean) => void;
  onMessage?: (message: { role: 'user' | 'agent'; text: string }) => void;
  onError?: (error: Error) => void;
}

export interface UseElevenLabsConversationProps {
  agentId: string;
  callbacks?: ConversationCallbacks;
}

export interface UseElevenLabsConversationReturn {
  isConnected: boolean;
  isConnecting: boolean;
  isMuted: boolean;
  isAgentSpeaking: boolean;
  isUserSpeaking: boolean;
  error: string | null;
  startCall: () => Promise<void>;
  endCall: () => Promise<void>;
  toggleMute: () => void;
}

export function useElevenLabsConversation({
  agentId,
  callbacks,
}: UseElevenLabsConversationProps): UseElevenLabsConversationReturn {
  const conversationRef = useRef<any>(null);
  const isConnectingRef = useRef(false);

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCall = useCallback(async () => {
    if (isConnectingRef.current || conversationRef.current) {
      console.log('Already connecting or connected');
      return;
    }

    if (!agentId) {
      setError('Agent ID not configured');
      callbacks?.onError?.(new Error('Agent ID not configured'));
      return;
    }

    isConnectingRef.current = true;
    setIsConnecting(true);
    setError(null);

    try {
      // Get signed URL from Supabase edge function
      console.log('Fetching signed URL for agent:', agentId);
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

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start ElevenLabs conversation
      conversationRef.current = await Conversation.startSession({
        signedUrl,
        onConnect: () => {
          console.log('ElevenLabs connected');
          isConnectingRef.current = false;
          setIsConnecting(false);
          setIsConnected(true);
          callbacks?.onConnect?.();
        },
        onDisconnect: () => {
          console.log('ElevenLabs disconnected');
          setIsConnected(false);
          setIsAgentSpeaking(false);
          setIsUserSpeaking(false);
          setIsMuted(false);
          callbacks?.onDisconnect?.();
        },
        onMessage: (message: any) => {
          if (message.type === 'user_transcript') {
            callbacks?.onMessage?.({ role: 'user', text: message.message });
          } else if (message.type === 'agent_response') {
            callbacks?.onMessage?.({ role: 'agent', text: message.message });
          }
        },
        onModeChange: (mode: any) => {
          const speaking = mode.mode === 'speaking';
          const listening = mode.mode === 'listening';
          
          setIsAgentSpeaking(speaking);
          setIsUserSpeaking(listening);
          
          callbacks?.onAgentSpeaking?.(speaking);
          callbacks?.onUserSpeaking?.(listening);
        },
        onError: (err: any) => {
          console.error('ElevenLabs error:', err);
          const errorMessage = err?.message || 'Connection error';
          setError(errorMessage);
          callbacks?.onError?.(new Error(errorMessage));
        },
      });
    } catch (err) {
      console.error('Failed to start conversation:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      setIsConnecting(false);
      isConnectingRef.current = false;
      conversationRef.current = null;
      callbacks?.onError?.(new Error(errorMessage));
    }
  }, [agentId, callbacks]);

  const endCall = useCallback(async () => {
    console.log('Ending call...');
    if (conversationRef.current) {
      try {
        await conversationRef.current.endSession();
      } catch (err) {
        console.error('Error ending conversation:', err);
      }
      conversationRef.current = null;
    }
    isConnectingRef.current = false;
    setIsConnected(false);
    setIsConnecting(false);
    setIsAgentSpeaking(false);
    setIsUserSpeaking(false);
    setIsMuted(false);
    setError(null);
  }, []);

  const toggleMute = useCallback(() => {
    if (conversationRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      // ElevenLabs SDK mute functionality
      // Note: The actual mute implementation depends on the SDK version
      // For now, we toggle local state - audio stream muting would need to be implemented
      console.log('Mute toggled:', newMutedState);
    }
  }, [isMuted]);

  return {
    isConnected,
    isConnecting,
    isMuted,
    isAgentSpeaking,
    isUserSpeaking,
    error,
    startCall,
    endCall,
    toggleMute,
  };
}

