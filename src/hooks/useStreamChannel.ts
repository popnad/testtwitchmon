import { useState, useEffect } from 'react';
import create from 'zustand';

interface StreamChannelStore {
  channel: string;
  setChannel: (channel: string) => void;
}

// Create a global store for channel state
const useStreamChannelStore = create<StreamChannelStore>((set) => ({
  channel: 'ninja', // Default channel
  setChannel: (channel) => set({ channel }),
}));

export const useStreamChannel = () => {
  const { channel, setChannel } = useStreamChannelStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle channel changes with loading state
  useEffect(() => {
    const loadChannel = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call to validate channel or load channel data
        // In production, you might want to verify the channel exists
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For mock implementation, we'd set up WebSocket connection
        // to fetch Twitch chat for the selected channel
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load channel data');
        setIsLoading(false);
      }
    };
    
    loadChannel();
  }, [channel]);

  return {
    channel,
    setChannel,
    isLoading,
    error
  };
};