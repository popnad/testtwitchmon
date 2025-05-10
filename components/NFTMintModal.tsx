import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, ExternalLink } from 'lucide-react';

interface NFTMintModalProps {
  onClose: () => void;
  onMint: () => Promise<string | null>;
}

export const NFTMintModal: React.FC<NFTMintModalProps> = ({ onClose, onMint }) => {
  const [description, setDescription] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTxHash, setMintedTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMint = async () => {
    setIsMinting(true);
    setError(null);
    
    try {
      const txHash = await onMint();
      setMintedTxHash(txHash);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint NFT');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-500/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-md glass-panel overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-dark-200 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Mint Stream Moment as NFT</h2>
            <p className="text-gray-400 text-sm mt-1">
              Capture this moment and store it on-chain forever
            </p>
          </div>

          {mintedTxHash ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-400 text-center">
                <p className="font-medium">NFT Minted Successfully!</p>
                <p className="text-sm mt-1">Your stream moment has been preserved on the blockchain</p>
              </div>
              
              <a
                href={`https://testnet.monadexplorer.com/tx/${mintedTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full p-3 bg-monad-600 hover:bg-monad-700 rounded-lg text-white transition-colors"
              >
                <span>View on Monad Explorer</span>
                <ExternalLink size={16} />
              </a>
              
              <button
                onClick={onClose}
                className="w-full p-3 bg-dark-200 hover:bg-dark-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-dark-300 border border-dashed border-dark-100 rounded-lg p-6 flex flex-col items-center justify-center">
                <Camera size={32} className="text-brand-500 mb-2" />
                <p className="text-sm text-center">
                  We'll take a screenshot of the current stream view and mint it as an NFT on the Monad Testnet
                </p>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's happening in this moment?"
                  className="w-full bg-dark-200 border border-dark-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 p-3 bg-dark-200 hover:bg-dark-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMint}
                  disabled={isMinting}
                  className="flex-1 p-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:hover:bg-brand-500 rounded-lg text-white transition-colors"
                >
                  {isMinting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span>Minting...</span>
                    </div>
                  ) : (
                    <span>Mint NFT</span>
                  )}
                </button>
              </div>
              
              <p className="text-xs text-center text-gray-500">
                This will require a blockchain transaction with gas fees
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};