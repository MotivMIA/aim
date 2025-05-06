import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import QRCode from "qrcode.react";
import { apiClient } from "../api";
const TwoFactorSetup = () => {
    const [qrCode, setQrCode] = useState(null);
    const setup2FA = async () => {
        try {
            const response = await apiClient.post("/auth/setup-2fa");
            setQrCode(response.data.qrCode);
        }
        catch (error) {
            console.error("2FA setup failed:", error);
        }
    };
    return (_jsxs("div", { className: "max-w-md mx-auto mt-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Enable Two-Factor Authentication" }), _jsx("button", { onClick: setup2FA, className: "p-2 bg-blue-600 text-white rounded", children: "Enable 2FA" }), qrCode && (_jsxs("div", { className: "mt-4", children: [_jsx("p", { children: "Scan this QR code with your authenticator app:" }), _jsx(QRCode, { value: qrCode })] }))] }));
};
export default TwoFactorSetup;
