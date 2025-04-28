import NavItem from "./NavItem";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <div className="text-xl font-bold mb-4">AimCrypto</div>
      <div className="space-y-2">
        <NavItem to="/dashboard" label="Dashboard" requiresAuth />
        <NavItem to="/wallet" label="Wallet" requiresAuth />
        <NavItem to="/transactions" label="Transactions" requiresAuth />
        <NavItem to="/profile" label="Profile" requiresAuth />
        <NavItem to="/settings" label="Settings" requiresAuth />
      </div>
    </div>
  );
};

export default Sidebar;
