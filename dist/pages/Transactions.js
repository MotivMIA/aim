import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ethers } from 'ethers';
const Transactions = () => {
    const [provider, setProvider] = useState(null);
    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider);
        }
    };
    return (_jsxs("div", { children: [_jsx("button", { onClick: connectWallet, children: "Connect Wallet" }), provider && _jsx("div", { children: "Wallet Connected" })] }));
};
export default Transactions;
