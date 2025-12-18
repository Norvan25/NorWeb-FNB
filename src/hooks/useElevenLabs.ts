import { useState, useEffect, useRef } from 'react';
import { Conversation } from '@elevenlabs/client';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface UseElevenLabsOptions {
  agentId: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (message: string) => void;
  onError?: (error: Error) => void;
}

export const useElevenLabs = ({
  agentId,
  onConnect,
  onDisconnect,
  onMessage,
  onError,
}: UseElevenLabsOptions) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const conversationRef = useRef<Conversation | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const setupAudioAnalyser = async (stream: MediaStream) => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setVolume(average / 255);
          setIsSpeaking(average > 10);
        }
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (error) {
      console.error('Failed to setup audio analyser:', error);
    }
  };

  const connect = async () => {
    if (conversationRef.current || status === 'connecting' || status === 'connected') {
      return;
    }

    setStatus('connecting');

    try {
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      if (!apiKey) {
        throw new Error('ElevenLabs API key not found');
      }

      const conversation = await Conversation.startSession({
        agentId,
        apiKey,
        onConnect: () => {
          setStatus('connected');
          onConnect?.();
        },
        onDisconnect: () => {
          setStatus('disconnected');
          cleanup();
          onDisconnect?.();
        },
        onMessage: (message) => {
          onMessage?.(message.message);
        },
        onError: (error) => {
          setStatus('error');
          onError?.(error);
          console.error('ElevenLabs error:', error);
        },
      });

      conversationRef.current = conversation;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      await setupAudioAnalyser(stream);

    } catch (error) {
      setStatus('error');
      const err = error instanceof Error ? error : new Error('Connection failed');
      onError?.(err);
      console.error('Failed to connect:', error);
    }
  };

  const disconnect = async () => {
    if (conversationRef.current) {
      try {
        await conversationRef.current.endSession();
      } catch (error) {
        console.error('Error disconnecting:', error);
      }
      conversationRef.current = null;
    }
    cleanup();
  };

  const sendContext = async (text: string) => {
    if (conversationRef.current && status === 'connected') {
      try {
        await conversationRef.current.sendUserMessage(text);
      } catch (error) {
        console.error('Failed to send context:', error);
      }
    }
  };

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setVolume(0);
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    status,
    isSpeaking,
    volume,
    connect,
    disconnect,
    sendContext,
  };
};
