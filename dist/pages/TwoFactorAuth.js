import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
const TwoFactorAuth = () => {
    const [token] = useState(null);
    if (token) {
        const payload = jwtDecode(token);
        console.log(payload.userId);
    }
    return _jsx("div", { children: "Two-Factor Auth" });
};
export default TwoFactorAuth;
