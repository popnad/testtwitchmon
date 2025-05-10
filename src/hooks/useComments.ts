import { useState, useEffect } from 'react';
import { Comment } from '../types';
import { useBlockchain } from '../contexts/BlockchainContext';
import { usePrivy } from '@privy-io/react-auth';

// Simulate a WebSocket for fetching Twitch chat
const mockComments: Comment[] = [
  {
    id: '1',
    username: 'viewer123',
    message: 'Great play!',
    timestamp: Date.now() - 60000,
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    status: 'confirmed'
  },
  {
    id: '2',
    username: 'gamer456',
    message: 'How did you do that move?',
    timestamp: Date.now() - 30000,
    txHash: '0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef',
    status: 'confirmed'
  }
];

export const useComments = (channel: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { sendTransaction, isInitialized } = useBlockchain();
  const { user } = usePrivy();

  // Load initial comments and simulate new ones
  useEffect(() => {
    // Reset comments when channel changes
    setComments([...mockComments]);
    
    // Simulate incoming comments
    const interval = setInterval(() => {
      const username = ['streamer_fan', 'crypto_enthusiast', 'viewer_' + Math.floor(Math.random() * 1000)][
        Math.floor(Math.random() * 3)
      ];
      
      const messages = [
        'Great stream!',
        'This is awesome',
        'Love the blockchain integration',
        'How do I mint an NFT?',
        'What\'s your highest score?',
        'When\'s the next tournament?'
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      const newComment: Comment = {
        id: Date.now().toString(),
        username,
        message: randomMessage,
        timestamp: Date.now(),
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        status: 'confirmed'
      };
      
      setComments(prevComments => [...prevComments, newComment]);
    }, 90000); // Every 90 seconds

    return () => clearInterval(interval);
  }, [channel]);
  
  const addComment = async (message: string) => {
    if (!isInitialized) {
      console.error('Blockchain not initialized');
      return;
    }
    
    const username = user?.email?.address?.split('@')[0] || 'anonymous';
    const id = Date.now().toString();
    
    // Add comment to local state first with pending status
    const newComment: Comment = {
      id,
      username,
      message,
      timestamp: Date.now(),
      txHash: null,
      status: 'pending'
    };
    
    setComments(prevComments => [...prevComments, newComment]);
    
    // Send transaction to blockchain
    try {
      const txHash = await sendTransaction('addComment', [username, message]);
      
      // Update comment with transaction hash
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === id 
            ? { ...comment, txHash, status: 'confirmed' } 
            : comment
        )
      );
    } catch (error) {
      console.error('Failed to add comment to blockchain:', error);
      
      // Update comment as failed
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === id 
            ? { ...comment, status: 'failed' } 
            : comment
        )
      );
    }
  };

  return {
    comments,
    addComment
  };
};