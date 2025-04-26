async function connectWallet() {
    try {
        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
        await client.connect();
        const account = prompt("Enter your XRPL wallet address for testing:");
        if (!account) throw new Error("No wallet address provided");
        const response = await client.request({
            command: "account_info",
            account: account
        });
        const balance = await client.request({
            command: "account_lines",
            account: account,
            ledger_index: "validated"
        });
        const aimBalance = balance.result.lines.find(line => line.currency === "AIM")?.balance || "0";
        document.getElementById("wallet-address").textContent = account;
        document.getElementById("token-balance").textContent = aimBalance;
        document.getElementById("wallet-info").style.display = "block";
        await client.disconnect();
    } catch (error) {
        console.error("Wallet connection error:", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

// Event listener for connect wallet button
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connect-wallet');
    if (connectButton) {
        connectButton.addEventListener('click', connectWallet);
    }
});