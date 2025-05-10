import React from 'react';
import { createRoot } from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App';
import './index.css';

const MONAD_TESTNET = {
  id: 49089,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz']
    }
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com'
    }
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="clpispdty00ycl80fpueukbhl"
      config={{
        loginMethods: ['email', 'google', 'twitter'],
        appearance: {
          theme: 'dark',
          accentColor: '#FF4D4F',
          logo: 'https://i.imgur.com/XrZGHUO.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          noPromptOnSignature: true,
        },
        defaultChain: MONAD_TESTNET,
        supportedChains: [MONAD_TESTNET],
        allowedOrigins: ['https://localhost:5173']
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);