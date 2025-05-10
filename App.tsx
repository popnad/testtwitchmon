import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Layout } from './components/Layout';
import { StreamView } from './components/StreamView';
import { LoginScreen } from './components/LoginScreen';
import { BlockchainProvider } from './contexts/BlockchainContext';

function App() {
  const { ready, authenticated } = usePrivy();

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-dark-400 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl">Initializing...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login screen
  if (!authenticated) {
    return <LoginScreen />;
  }

  // Main app view when authenticated
  return (
    <BlockchainProvider>
      <Layout>
        <StreamView />
      </Layout>
    </BlockchainProvider>
  );
}

export default App;