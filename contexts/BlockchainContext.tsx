import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/constants';

interface BlockchainContextType {
  provider: ethers.providers.Web3Provider | null;
  contract: ethers.Contract | null;
  isInitialized: boolean;
  sendTransaction: (
    method: string, 
    args: any[], 
    options?: { gasLimit?: number }
  ) => Promise<string>;
}

const BlockchainContext = createContext<BlockchainContextType | null>(null);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

interface BlockchainProviderProps {
  children: ReactNode;
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userNonce, setUserNonce] = useState<number>(0);

  // Initialize provider and contract
  useEffect(() => {
    const initializeProvider = async () => {
      if (ready && authenticated && wallets.length > 0) {
        try {
          const privyProvider = await wallets[0].getEthersProvider();
          const web3Provider = new ethers.providers.Web3Provider(privyProvider);
          
          setProvider(web3Provider);
          
          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            web3Provider.getSigner()
          );
          
          setContract(contractInstance);
          
          // Get initial nonce
          const address = await web3Provider.getSigner().getAddress();
          const nonce = await web3Provider.getTransactionCount(address, 'pending');
          setUserNonce(nonce);
          
          setIsInitialized(true);
        } catch (error) {
          console.error("Failed to initialize blockchain provider:", error);
        }
      }
    };
    
    initializeProvider();
  }, [ready, authenticated, wallets]);

  const sendTransaction = async (
    method: string, 
    args: any[], 
    options: { gasLimit?: number } = {}
  ): Promise<string> => {
    if (!provider || !contract) {
      throw new Error("Blockchain provider not initialized");
    }

    try {
      // Get the current nonce
      const currentNonce = userNonce;
      setUserNonce(prev => prev + 1);
      
      // Create transaction request
      const txRequest = await contract.populateTransaction[method](...args);
      
      // Add transaction details
      const tx = {
        ...txRequest,
        nonce: currentNonce,
        gasLimit: ethers.BigNumber.from(options.gasLimit || "300000"),
        maxFeePerGas: ethers.utils.parseUnits("50", "gwei"),
        maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
      };
      
      // Sign and send transaction
      const signedTx = await provider.getSigner().signTransaction(tx);
      const txHash = await provider.send("eth_sendRawTransaction", [signedTx]);
      
      // Wait for transaction confirmation
      await provider.waitForTransaction(txHash);
      
      return txHash;
    } catch (error) {
      console.error("Transaction failed:", error);
      
      // Reset nonce on failure
      try {
        const address = await provider.getSigner().getAddress();
        const nonce = await provider.getTransactionCount(address, "pending");
        setUserNonce(nonce);
      } catch (e) {
        console.error("Failed to reset nonce:", e);
      }
      
      throw error;
    }
  };

  const value = {
    provider,
    contract,
    isInitialized,
    sendTransaction
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};