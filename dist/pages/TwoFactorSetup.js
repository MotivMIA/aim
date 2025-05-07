import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import QRCode from 'qrcode.react';
const TwoFactorSetup = () => {
    const [qrCode] = useState('otpauth://totp/AIM:user@example.com?secret=SECRET');
    return (_jsx("div", { children: _jsx(QRCode, { value: qrCode }) }));
};
export default TwoFactorSetup;
