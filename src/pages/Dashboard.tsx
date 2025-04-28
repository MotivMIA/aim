import useCryptoPrices from "../hooks/useCryptoPrices";

const Dashboard: React.FC = () => {
  const { data: prices, isLoading, error } = useCryptoPrices();

  if (isLoading) return <p>Loading prices...</p>;
  if (error) return <p>Error fetching prices</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Prices</h1>
      <ul>
        {prices?.map((coin) => (
          <li key={coin.id} className="mb-2">
            {coin.symbol.toUpperCase()}: ${coin.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
