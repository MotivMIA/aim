import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import { apiClient } from "../api";
import { useQuery } from "@tanstack/react-query";

interface TransactionForm {
  to: string;
  amount: string;
}

interface Transaction {
  txHash: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  status: string;
}

const Transactions: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionForm>();
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await apiClient.get("/transactions");
      return response.data;
    },
  });

  const onSubmit = async (data: TransactionForm) => {
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
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Send Transaction</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="mb-4">
          <label htmlFor="to" className="block text-gray-700">Recipient Address</label>
          <input
            id="to"
            {...register("to", { required: "Recipient address is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.to && <p className="text-red-500">{errors.to.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">Amount (ETH)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            {...register("amount", { required: "Amount is required", min: 0 })}
            className="w-full p-2 border rounded"
          />
          {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
        </div>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Send Transaction
        </button>
      </form>
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {isLoading ? (
        <p>Loading transactions...</p>
      ) : (
        <ul>
          {transactions?.map((tx) => (
            <li key={tx.txHash} className="mb-2">
              <a
                href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {tx.txHash}
              </a>
              : {tx.amount} {tx.currency} from {tx.from} to {tx.to} ({tx.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
