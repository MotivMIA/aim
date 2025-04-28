import { useState } from "react";
import { ethers } from "ethers";

const NormalWallet: React.FC = () => {
  const [wallet, setWallet] = useState<{ address: string; privateKey: string } | null>(null);

  const createWallet = () => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet({
      address: newWallet.address,
      privateKey: newWallet.privateKey,
    });
    alert("Save your private key securely. It will not be stored.");
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Wallet</h1>
      <button onClick={createWallet} className="p-2 bg-blue-600 text-white rounded">
        Create Wallet
      </button>
      {wallet && (
        <div className="mt-4">
          <p><strong>Address:</strong> {wallet.address}</p>
          <p><strong>Private Key:</strong> {wallet.privateKey}</p>
          <p className="text-red-500">Warning: Save your private key securely!</p>
        </div>
      )}
    </div>
  );
};

export default NormalWallet;
