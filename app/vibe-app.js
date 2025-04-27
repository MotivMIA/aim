VibeApp.connectWallet = async function (containerId) {
    console.log("Starting connectWallet for container:", containerId);
    const container = document.getElementById(containerId);
    if (!container) {
        console.error("Container not found:", containerId);
        return;
    }
    console.log("Container found:", container);

    container.innerHTML = `
        <button id="vibe-connect-wallet" class="btn">Connect Wallet</button>
        <div id="vibe-wallet-info" style="display: none;">
            <p>Wallet Address: <span id="vibe-wallet-address"></span></p>
            <p>SVIP Balance: <span id="vibe-token-balance">0</span></p>
        </div>
    `;
    console.log("HTML updated for container");

    const connectButton = document.getElementById("vibe-connect-wallet");
    if (!connectButton) {
        console.error("Connect Wallet button not found");
        return;
    }
    console.log("Connect Wallet button found:", connectButton);

    connectButton.addEventListener("click", async () => {
        console.log("Connect Wallet button clicked");
        try {
            const account = prompt("Enter your XRPL wallet address for testing:");
            console.log("User entered wallet address:", account);
            if (!account) throw new Error("No wallet address provided");

            console.log("Fetching account info...");
            const response = await fetch(`${BACKEND_URL}/api/account_info?account=${account}`);
            const data = await response.json();
            console.log("Account info response:", data);
            if (!response.ok) throw new Error(data.error || 'Failed to fetch account info');

            console.log("Fetching account lines...");
            const balanceResponse = await fetch(`${BACKEND_URL}/api/account_lines?account=${account}`);
            const balanceData = await balanceResponse.json();
            console.log("Account lines response:", balanceData);
            if (!balanceResponse.ok) throw new Error(balanceData.error || 'Failed to fetch account lines');

            const vibeBalance = balanceData.lines.find(line => line.currency === "VIP")?.balance || "0";
            console.log("SVIP balance:", vibeBalance);

            const walletAddressElement = document.getElementById("vibe-wallet-address");
            const tokenBalanceElement = document.getElementById("vibe-token-balance");
            const walletInfoElement = document.getElementById("vibe-wallet-info");

            if (!walletAddressElement || !tokenBalanceElement || !walletInfoElement) {
                console.error("Wallet info elements not found");
                return;
            }

            walletAddressElement.textContent = account;
            tokenBalanceElement.textContent = vibeBalance;
            walletInfoElement.style.display = "block";
            console.log("Wallet info displayed");
        } catch (error) {
            console.error("Wallet connection error:", error);
            alert("Failed to connect wallet: " + error.message);
        }
    });
};