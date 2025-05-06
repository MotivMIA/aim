import { jsx as _jsx } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const NavItem = ({ label, requiresAuth, ...props }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (requiresAuth && !isAuthenticated)
        return null;
    return (_jsx(NavLink, { ...props, className: ({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-600", children: label }));
};
export default NavItem;
