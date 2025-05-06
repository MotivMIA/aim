import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { apiClient } from "../api";
import { useQuery } from "@tanstack/react-query";
const Transactions = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: transactions, isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const response = await apiClient.get("/transactions");
            return response.data;
        },
    });
    const onSubmit = async (data) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const tx = await signer.sendTransaction({
                to: data.to,
                value: ethers.parseEther(data.amount),
            });
            await apiClient.post("/transactions", {
                txHash: tx.hash,
                from: await signer.getAddress(),
                to: data.to,
                amount: parseFloat(data.amount),
                currency: "ETH",
            });
            alert("Transaction submitted!");
        }
        catch (error) {
            console.error("Transaction failed:", error);
        }
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto mt-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Send Transaction" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "mb-8", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "to", className: "block text-gray-700", children: "Recipient Address" }), _jsx("input", { id: "to", ...register("to", { required: "Recipient address is required" }), className: "w-full p-2 border rounded" }), errors.to && _jsx("p", { className: "text-red-500", children: errors.to.message })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "amount", className: "block text-gray-700", children: "Amount (ETH)" }), _jsx("input", { id: "amount", type: "number", step: "0.01", ...register("amount", { required: "Amount is required", min: 0 }), className: "w-full p-2 border rounded" }), errors.amount && _jsx("p", { className: "text-red-500", children: errors.amount.message })] }), _jsx("button", { type: "submit", className: "w-full p-2 bg-blue-600 text-white rounded", children: "Send Transaction" })] }), _jsx("h2", { className: "text-xl font-bold mb-4", children: "Transaction History" }), isLoading ? (_jsx("p", { children: "Loading transactions..." })) : (_jsx("ul", { children: transactions?.map((tx) => (_jsxs("li", { className: "mb-2", children: [_jsx("a", { href: `https://sepolia.etherscan.io/tx/${tx.txHash}`, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600", children: tx.txHash }), ": ", tx.amount, " ", tx.currency, " from ", tx.from, " to ", tx.to, " (", tx.status, ")"] }, tx.txHash))) }))] }));
};
export default Transactions;
