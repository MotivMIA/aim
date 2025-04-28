import NavItem from "./NavItem";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="text-xl font-bold">AimCrypto</div>
        <div className="space-x-4">
          <NavItem to="/" label="Home" />
          <NavItem to="/dashboard" label="Dashboard" requiresAuth />
          <NavItem to="/wallet" label="Wallet" requiresAuth />
          <NavItem to="/transactions" label="Transactions" requiresAuth />
          <NavItem to="/profile" label="Profile" requiresAuth />
          <NavItem to="/settings" label="Settings" requiresAuth />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
