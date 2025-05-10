import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { usePrivy, useWallets } from '@privy-io/react-auth';

export const useWallet = () => {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [balance, setBalance] = useState<string>('0');
  const [showLowBalanceAlert, setShowLowBalanceAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!ready || !authenticated || wallets.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const embeddedWallet = wallets[0];
        const ethersProvider = await embeddedWallet.getEthersProvider();
        const provider = new ethers.providers.Web3Provider(ethersProvider);
        const address = await provider.getSigner().getAddress();
        
        const balanceInWei = await provider.getBalance(address);
        const balanceInEther = ethers.utils.formatEther(balanceInWei);
        
        setBalance(balanceInEther);
        setShowLowBalanceAlert(parseFloat(balanceInEther) < 1);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
        setIsLoading(false);
      }
    };

    fetchBalance();

    // Set up interval to check balance periodically
    const intervalId = setInterval(fetchBalance, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [ready, authenticated, wallets]);

  return {
    balance,
    showLowBalanceAlert,
    isLoading
  };
};