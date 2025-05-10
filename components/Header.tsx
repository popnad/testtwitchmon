import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { SearchIcon, TwitchIcon, User, LogOut, Wallet } from 'lucide-react';
import { cn } from '../utils/cn';
import { useStreamChannel } from '../hooks/useStreamChannel';

interface HeaderProps {
  balance: string;
}

export const Header: React.FC<HeaderProps> = ({ balance }) => {
  const { user, logout } = usePrivy();
  const { channel, setChannel } = useStreamChannel();
  const [channelInput, setChannelInput] = useState(channel);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (channelInput.trim()) {
      setChannel(channelInput.trim().toLowerCase());
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-dark-100 bg-dark-400/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <TwitchIcon className="h-8 w-8 text-brand-500" />
            <span className="text-xl font-bold">
              <span className="text-white">Twitch</span>
              <span className="text-brand-500">Chain</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="hidden md:flex relative mx-auto max-w-md flex-1 px-8">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={channelInput}
                onChange={(e) => setChannelInput(e.target.value)}
                placeholder="Search Twitch channels..."
                className="w-full py-2 pl-10 pr-4 bg-dark-200 rounded-full text-sm border border-dark-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>
            <button 
              type="submit"
              className="ml-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded-full text-white text-sm font-medium transition-all"
            >
              Watch
            </button>
          </form>

          <div className="relative">
            <div 
              className="flex items-center space-x-1 cursor-pointer p-2 rounded-full hover:bg-dark-200 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-monad-500 flex items-center justify-center text-white">
                {user?.email?.address ? user.email.address[0].toUpperCase() : <User size={16} />}
              </div>
              <div className="hidden sm:block">
                <div className="font-medium text-sm">{user?.email?.address?.split('@')[0] || 'User'}</div>
                <div className="text-xs text-gray-400 flex items-center">
                  <Wallet size={10} className="mr-1" />
                  {parseFloat(balance).toFixed(2)} MON
                </div>
              </div>
            </div>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-dark-200 rounded-lg shadow-xl border border-dark-100 z-50">
                <div className="px-4 py-2 border-b border-dark-100">
                  <p className="text-sm font-medium">Wallet Balance</p>
                  <p className="text-xl font-bold text-monad-400">{parseFloat(balance).toFixed(4)} MON</p>
                  <a
                    href="https://testnet.monad.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-500 hover:text-brand-400 mt-1 inline-block"
                  >
                    Get Testnet MON
                  </a>
                </div>
                <div className="mt-2">
                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dark-100 flex items-center"
                  >
                    <LogOut size={14} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="md:hidden py-2 px-4 border-t border-dark-100">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
            placeholder="Search Twitch channels..."
            className="w-full py-2 pl-10 pr-4 bg-dark-200 rounded-full text-sm border border-dark-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>
        <button 
          type="submit"
          className="mt-2 w-full px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded-full text-white text-sm font-medium transition-all"
        >
          Watch Stream
        </button>
      </form>
    </header>
  );
};