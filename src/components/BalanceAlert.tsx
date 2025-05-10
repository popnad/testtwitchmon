import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BalanceAlert: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-6 overflow-hidden rounded-lg bg-amber-950 border border-amber-600 text-amber-200"
      >
        <div className="flex items-start justify-between space-x-4 p-4">
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-amber-700/20 p-2">
              <AlertTriangle size={18} className="text-amber-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Low Balance Warning</h3>
              <p className="text-sm opacity-80">
                Your wallet balance is below 1 MON. On-chain interactions may fail without sufficient funds.
              </p>
              <div className="pt-2">
                <a
                  href="https://testnet.monad.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-amber-700/20 px-3 py-1 text-sm font-medium text-amber-300 hover:bg-amber-700/30 transition-colors"
                >
                  Get Testnet MON
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-full p-1 transition-colors hover:bg-amber-700/20"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};