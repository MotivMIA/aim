import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NavItem from "./NavItem";
const Navbar = () => {
    return (_jsx("nav", { className: "bg-white shadow p-4", children: _jsxs("div", { className: "max-w-7xl mx-auto flex justify-between", children: [_jsx("div", { className: "text-xl font-bold", children: "AimCrypto" }), _jsxs("div", { className: "space-x-4", children: [_jsx(NavItem, { to: "/", label: "Home" }), _jsx(NavItem, { to: "/dashboard", label: "Dashboard", requiresAuth: true }), _jsx(NavItem, { to: "/wallet", label: "Wallet", requiresAuth: true }), _jsx(NavItem, { to: "/transactions", label: "Transactions", requiresAuth: true }), _jsx(NavItem, { to: "/profile", label: "Profile", requiresAuth: true }), _jsx(NavItem, { to: "/settings", label: "Settings", requiresAuth: true })] })] }) }));
};
export default Navbar;
