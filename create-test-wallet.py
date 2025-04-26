from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet

client = JsonRpcClient("https://s.altnet.rippletest.net:51234")
test_wallet = generate_faucet_wallet(client, debug=True)
print(f"Test Wallet Address: {test_wallet.classic_address}")
print(f"Test Wallet Seed: {test_wallet.seed}")
print(f"Funded with 10,000 testnet XRP")
