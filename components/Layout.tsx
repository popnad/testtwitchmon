import React, { ReactNode } from 'react';
import { Header } from './Header';
import { BalanceAlert } from './BalanceAlert';
import { useWallet } from '../hooks/useWallet';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { balance, showLowBalanceAlert } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      <Header balance={balance} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {showLowBalanceAlert && <BalanceAlert />}
        {children}
      </main>
      
      <footer className="py-6 px-4 bg-dark-300 border-t border-dark-100">
        <div className="container mx-auto text-center text-sm text-gray-400">
          <p>TwitchChain - Blockchain-Enhanced Streaming Experience</p>
          <p className="mt-2">
            Built on <span className="text-monad-400">Monad Testnet</span> with{' '}
            <span className="text-brand-500">Privy</span> authentication
          </p>
        </div>
      </footer>
    </div>
  );
};