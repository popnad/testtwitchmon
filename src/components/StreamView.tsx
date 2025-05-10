import React, { useRef } from 'react';
import { TwitchPlayer } from './TwitchPlayer';
import { CommentsSection } from './CommentsSection';
import { ReactionsPanel } from './ReactionsPanel';
import { NFTMintModal } from './NFTMintModal';
import { useStreamChannel } from '../hooks/useStreamChannel';
import { useNFTMinting } from '../hooks/useNFTMinting';

export const StreamView: React.FC = () => {
  const { channel } = useStreamChannel();
  const { isModalOpen, openModal, closeModal, mintNFT } = useNFTMinting();
  const streamRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative" ref={streamRef}>
        <div className="glass-panel overflow-hidden">
          <TwitchPlayer channel={channel} />
          <button
            onClick={openModal}
            className="absolute bottom-6 right-6 px-4 py-2 bg-brand-500 hover:bg-brand-600 transition-colors rounded-lg text-white flex items-center space-x-2 shadow-lg"
          >
            <span>Mint Moment</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <ReactionsPanel />
        <CommentsSection channel={channel} />
      </div>

      {isModalOpen && (
        <NFTMintModal 
          onClose={closeModal} 
          onMint={() => mintNFT(streamRef)}
        />
      )}
    </div>
  );
};