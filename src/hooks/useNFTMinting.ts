import { useState, RefObject } from 'react';
import html2canvas from 'html2canvas';
import { useBlockchain } from '../contexts/BlockchainContext';
import { useStreamChannel } from './useStreamChannel';

export const useNFTMinting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { channel } = useStreamChannel();
  const { sendTransaction, isInitialized } = useBlockchain();
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const mintNFT = async (streamRef: RefObject<HTMLDivElement>) => {
    if (!isInitialized) {
      throw new Error('Blockchain not initialized');
    }
    
    if (!streamRef.current) {
      throw new Error('Stream reference not available');
    }
    
    try {
      // Capture screenshot
      const canvas = await html2canvas(streamRef.current);
      const imageData = canvas.toDataURL('image/png');
      
      // For simplicity, use the image data directly
      // In production, you'd upload to IPFS and use the resulting hash
      const metadata = JSON.stringify({
        name: `${channel} Stream Moment`,
        description: `A moment from ${channel}'s stream`,
        image: imageData,
        timestamp: Date.now(),
        channel
      });
      
      // Mint NFT on blockchain
      const txHash = await sendTransaction(
        'mintStreamMoment', 
        [metadata, channel],
        { gasLimit: 500000 }
      );
      
      return txHash;
    } catch (error) {
      console.error('Failed to mint NFT:', error);
      throw error;
    }
  };
  
  return {
    isModalOpen,
    openModal,
    closeModal,
    mintNFT
  };
};