import React, { useState } from 'react';
import { ethers } from 'ethers';

const Transactions: React.FC = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {provider && <div>Wallet Connected</div>}
    </div>
  );
};

export default Transactions;
