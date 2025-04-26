from xrpl.clients import JsonRpcClient
from xrpl.wallet import Wallet
from xrpl.models.transactions import Payment
from xrpl.transaction import submit_and_wait

client = JsonRpcClient("https://s.altnet.rippletest.net:51234")
issuer_seed = "sEd7ahMHwHhigKGDaVStMs6eoL86i4z"  # Replace with issuer seed
issuer_wallet = Wallet.from_seed(issuer_seed)
user_address = "rB8Ay3PoAF1tkMJE3gVv2PTPhwAvabxaux"  # Replace with test wallet address

payment = Payment(
    account=issuer_wallet.classic_address,
    destination=user_address,
    amount={
        "currency": "MNX",
        "value": "1000000000",
        "issuer": issuer_wallet.classic_address
    }
)
response = submit_and_wait(payment, client, issuer_wallet)
print(f"Issued 1,000,000,000 MNX to {user_address}: {response.result}")
