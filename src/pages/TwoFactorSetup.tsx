import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const TwoFactorSetup: React.FC = () => {
  const [qrCode] = useState<string>('otpauth://totp/AIM:user@example.com?secret=SECRET');

  return (
    <div>
      <QRCode value={qrCode} />
    </div>
  );
};

export default TwoFactorSetup;
