import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useCryptoPrices = () => {
    return useQuery({
        queryKey: ["cryptoPrices"],
        queryFn: async () => {
            const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    vs_currency: "usd",
                    ids: "bitcoin,ethereum",
                },
            });
            return response.data.map((coin) => ({
                id: coin.id,
                symbol: coin.symbol,
                price: coin.current_price,
            }));
        },
        refetchInterval: 60000,
    });
};
export default useCryptoPrices;
