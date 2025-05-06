import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/2fa", element: _jsx(TwoFactorAuth, {}) }), _jsx(Route, { path: "/2fa/setup", element: _jsx(TwoFactorSetup, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/wallet", element: _jsx(NormalWallet, {}) }), _jsx(Route, { path: "/transactions", element: _jsx(Transactions, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) })] }));
};
export default App;
