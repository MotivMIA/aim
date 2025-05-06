import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import useCryptoPrices from "../hooks/useCryptoPrices";
const Dashboard = () => {
    const { data: prices, isLoading, error } = useCryptoPrices();
    if (isLoading)
        return _jsx("p", { children: "Loading prices..." });
    if (error)
        return _jsx("p", { children: "Error fetching prices" });
    return (_jsxs("div", { className: "max-w-4xl mx-auto mt-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Cryptocurrency Prices" }), _jsx("ul", { children: prices?.map((coin) => (_jsxs("li", { className: "mb-2", children: [coin.symbol.toUpperCase(), ": $", coin.price] }, coin.id))) })] }));
};
export default Dashboard;
