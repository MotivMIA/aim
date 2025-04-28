import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import TwoFactorSetup from "./pages/TwoFactorSetup";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import NormalWallet from "./pages/Wallet";
import Transactions from "./pages/Transactions";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/2fa" element={<TwoFactorAuth />} />
      <Route path="/2fa/setup" element={<TwoFactorSetup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/wallet" element={<NormalWallet />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
