import { useState } from "react";
import QRCode from "qrcode.react";
import { apiClient } from "../api";

const TwoFactorSetup: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  const setup2FA = async () => {
    try {
      const response = await apiClient.post("/auth/setup-2fa");
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error("2FA setup failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Enable Two-Factor Authentication</h1>
      <button onClick={setup2FA} className="p-2 bg-blue-600 text-white rounded">
        Enable 2FA
      </button>
      {qrCode && (
        <div className="mt-4">
          <p>Scan this QR code with your authenticator app:</p>
          <QRCode value={qrCode} />
        </div>
      )}
    </div>
  );
};

export default TwoFactorSetup;
