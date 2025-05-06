import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ethers } from "ethers";
const NormalWallet = () => {
    const [wallet, setWallet] = useState(null);
    const createWallet = () => {
        const newWallet = ethers.Wallet.createRandom();
        setWallet({
            address: newWallet.address,
            privateKey: newWallet.privateKey,
        });
        alert("Save your private key securely. It will not be stored.");
    };
    return (_jsxs("div", { className: "max-w-md mx-auto mt-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Your Wallet" }), _jsx("button", { onClick: createWallet, className: "p-2 bg-blue-600 text-white rounded", children: "Create Wallet" }), wallet && (_jsxs("div", { className: "mt-4", children: [_jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " ", wallet.address] }), _jsxs("p", { children: [_jsx("strong", { children: "Private Key:" }), " ", wallet.privateKey] }), _jsx("p", { className: "text-red-500", children: "Warning: Save your private key securely!" })] }))] }));
};
export default NormalWallet;
