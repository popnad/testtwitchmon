import { useState, useEffect } from 'react';
import { Reaction } from '../types';
import { useBlockchain } from '../contexts/BlockchainContext';

export const useReactions = (channel: string) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const { sendTransaction, isInitialized } = useBlockchain();
  
  // Clean up old reactions
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setReactions(prev => prev.filter(reaction => {
        // Keep reactions that are less than 5 seconds old
        return now - reaction.timestamp < 5000;
      }));
    }, 1000);
    
    return () => clearInterval(cleanupInterval);
  }, []);
  
  // Reset reactions when channel changes
  useEffect(() => {
    setReactions([]);
  }, [channel]);
  
  const addReaction = async (type: string) => {
    if (!isInitialized) {
      console.error('Blockchain not initialized');
      return;
    }
    
    const id = Date.now().toString();
    
    // Add reaction to local state first
    const newReaction: Reaction = {
      id,
      type,
      timestamp: Date.now(),
      txHash: null
    };
    
    setReactions(prev => [...prev, newReaction]);
    
    // Send transaction to blockchain
    try {
      const txHash = await sendTransaction('addReaction', [type, channel]);
      
      // Update reaction with transaction hash
      // Note: The reaction might already be filtered out by cleanup
      setReactions(prev => 
        prev.map(reaction => 
          reaction.id === id 
            ? { ...reaction, txHash } 
            : reaction
        )
      );
    } catch (error) {
      console.error('Failed to add reaction to blockchain:', error);
    }
  };
  
  return {
    reactions,
    addReaction
  };
};