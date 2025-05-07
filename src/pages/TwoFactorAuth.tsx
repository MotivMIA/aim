import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: string;
}

const TwoFactorAuth: React.FC = () => {
  const [token] = useState<string | null>(null);

  if (token) {
    const payload = jwtDecode<JwtPayload>(token);
    console.log(payload.userId);
  }

  return <div>Two-Factor Auth</div>;
};

export default TwoFactorAuth;
