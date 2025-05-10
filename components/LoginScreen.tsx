import React from 'react';
import { motion } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';
import { TwitchIcon, Mail, ShieldCheck, Wallet } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = usePrivy();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dark-400">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 space-y-8"
        >
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex items-center space-x-2">
              <TwitchIcon className="h-10 w-10 text-brand-500" />
              <h1 className="text-3xl font-bold">
                <span className="text-white">Twitch</span>
                <span className="text-brand-500">Chain</span>
              </h1>
            </div>
            <p className="text-gray-400">
              Watch Twitch streams with blockchain-powered interactions
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-brand-500/20 p-2 rounded-full mt-0.5">
                  <Wallet size={16} className="text-brand-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Embedded Wallet</h3>
                  <p className="text-sm text-gray-400">
                    Automatically creates a blockchain wallet for you
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-monad-500/20 p-2 rounded-full mt-0.5">
                  <ShieldCheck size={16} className="text-monad-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Secure Authentication</h3>
                  <p className="text-sm text-gray-400">
                    Login with your email or social accounts
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-full mt-0.5">
                  <Mail size={16} className="text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium text-white">On-Chain Interactions</h3>
                  <p className="text-sm text-gray-400">
                    Your comments and reactions are recorded on the Monad blockchain
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={login}
                className="w-full py-3 bg-gradient-to-r from-brand-500 to-monad-500 rounded-lg font-medium text-white hover:opacity-90 transition-opacity"
              >
                Get Started
              </button>
              <p className="mt-2 text-xs text-center text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Built with Monad Testnet & Privy</p>
        </div>
      </div>
    </div>
  );
};