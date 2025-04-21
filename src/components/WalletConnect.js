import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('No MetaMask detected. Please install MetaMask to continue.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletConnected(true);
      setAccount(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet.');
    }
  };

  return (
    <div>
      {walletConnected ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
