#!/bin/bash

cd ~/Documents/AIM

if [ ! -d backend/venv ]; then
  python3 -m venv backend/venv
fi

source backend/venv/bin/activate

pip install --upgrade xrpl-py

if [ ! -f backend/.env ]; then
  echo "Creating .env file. Please fill in your Stripe and Transak API keys."
  cat > backend/.env << 'INNER'
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_KEY
TRANSAK_API_KEY=YOUR_TRANSAK_API_KEY
ISSUER_SEED=sEd7ahMHwHhigKGDaVStMs6eoL86i4z
INNER
fi

python3 scripts/create-issuer-wallet.py
echo "Please update configure-issuer.py, create-trust-line.py, and issue-mnx-token.py with the issuer seed and test wallet address."
read -p "Press Enter to continue after updating scripts..."

python3 scripts/configure-issuer.py
python3 scripts/create-trust-line.py
python3 scripts/issue-mnx-token.py

deactivate

echo "MNX Coin token issuance completed
