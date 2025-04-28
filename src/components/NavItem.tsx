import { NavLink, NavLinkProps } from "react-router-dom";

interface NavItemProps extends NavLinkProps {
  label: string;
  requiresAuth?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, requiresAuth, ...props }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (requiresAuth && !isAuthenticated) return null;

  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive ? "text-blue-600 font-bold" : "text-gray-600"
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;
