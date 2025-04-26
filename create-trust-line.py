from xrpl.clients import JsonRpcClient
from xrpl.wallet import Wallet
from xrpl.models.transactions import TrustSet
from xrpl.transaction import submit_and_wait

client = JsonRpcClient("https://s.altnet.rippletest.net:51234")
user_seed = "sEdTxYqTkMrTZGczJAwkFBxL9mt76wk"  # Replace with test wallet seed
user_wallet = Wallet.from_seed(user_seed)
issuer_address = "rQDmTszDNPZB2Bec8vELb9uGgYiBsdDkHS"  # Issuer address

trust_set = TrustSet(
    account=user_wallet.classic_address,
    limit_amount={
        "currency": "MNX",
        "value": "1000000000",
        "issuer": issuer_address
    }
)
response = submit_and_wait(trust_set, client, user_wallet)
print(f"Trust Line Created: {response.result}")
