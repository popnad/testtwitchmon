import React from 'react';
import { useStreamChannel } from '../hooks/useStreamChannel';

interface TwitchPlayerProps {
  channel: string;
}

export const TwitchPlayer: React.FC<TwitchPlayerProps> = ({ channel }) => {
  const { isLoading } = useStreamChannel();

  return (
    <div className="aspect-video relative w-full overflow-hidden rounded-lg">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-t-transparent border-brand-500 rounded-full animate-spin"></div>
            <p className="text-gray-400">Loading stream...</p>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}&muted=false`}
          height="100%"
          width="100%"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      )}
    </div>
  );
};