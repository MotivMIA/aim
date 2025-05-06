import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NavItem from "./NavItem";
const Sidebar = () => {
    return (_jsxs("div", { className: "w-64 bg-gray-100 h-screen p-4", children: [_jsx("div", { className: "text-xl font-bold mb-4", children: "AimCrypto" }), _jsxs("div", { className: "space-y-2", children: [_jsx(NavItem, { to: "/dashboard", label: "Dashboard", requiresAuth: true }), _jsx(NavItem, { to: "/wallet", label: "Wallet", requiresAuth: true }), _jsx(NavItem, { to: "/transactions", label: "Transactions", requiresAuth: true }), _jsx(NavItem, { to: "/profile", label: "Profile", requiresAuth: true }), _jsx(NavItem, { to: "/settings", label: "Settings", requiresAuth: true })] })] }));
};
export default Sidebar;
