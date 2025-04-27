(function () {
    try {
        window.VibeApp = window.VibeApp || {};

        const BACKEND_URL = "https://aimpact-backend.onrender.com";
        const FEE_PERCENTAGE = 0.01;
        const FEE_WALLET = "rNewFeeWallet1234567890";

        VibeApp.connectWallet = async function (containerId) {
            console.log("Starting connectWallet for container:", containerId);
            const container = document.getElementById(containerId);
            if (!container) {
                console.error("Container not found:", containerId);
                return;
            }
            console.log("Container found:", container);

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            const connectButton = document.createElement("button");
            connectButton.id = "vibe-connect-wallet";
            connectButton.className = "btn";
            connectButton.textContent = "Connect Wallet";
            container.appendChild(connectButton);

            const walletInfo = document.createElement("div");
            walletInfo.id = "vibe-wallet-info";
            walletInfo.style.display = "none";

            const addressP = document.createElement("p");
            addressP.textContent = "Wallet Address: ";
            const addressSpan = document.createElement("span");
            addressSpan.id = "vibe-wallet-address";
            addressP.appendChild(addressSpan);
            walletInfo.appendChild(addressP);

            const balanceP = document.createElement("p");
            balanceP.textContent = "SVIP Balance: ";
            const balanceSpan = document.createElement("span");
            balanceSpan.id = "vibe-token-balance";
            balanceSpan.textContent = "0";
            balanceP.appendChild(balanceSpan);
            walletInfo.appendChild(balanceP);

            container.appendChild(walletInfo);
            console.log("HTML updated for container");

            console.log("Connect Wallet button created:", connectButton);

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

        VibeApp.buyTokens = async function (containerId, amount) {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error("Container not found:", containerId);
                return;
            }

            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            const buyButton = document.createElement("button");
            buyButton.id = "vibe-buy-tokens";
            buyButton.className = "btn";
            buyButton.textContent = "Buy SVIP Tokens";
            container.appendChild(buyButton);

            const presaleInfo = document.createElement("div");
            presaleInfo.id = "vibe-presale-info";
            presaleInfo.style.display = "none";

            const purchasedP = document.createElement("p");
            purchasedP.textContent = "Tokens Purchased: ";
            const amountSpan = document.createElement("span");
            amountSpan.id = "vibe-token-amount";
            amountSpan.textContent = "0";
            purchasedP.appendChild(amountSpan);
            purchasedP.appendChild(document.createTextNode(" SVIP"));
            presaleInfo.appendChild(purchasedP);

            container.appendChild(presaleInfo);

            buyButton.addEventListener("click", async () => {
                try {
                    const account = prompt("Enter your XRPL wallet address for purchase:");
                    if (!account) throw new Error("No wallet address provided");
                    const fee = amount * FEE_PERCENTAGE;
                    const totalAmount = amount + fee;
                    console.log(`Processing transaction: ${amount} SVIP + ${fee} SVIP fee = ${totalAmount} SVIP`);
                    console.log(`Sending ${fee} SVIP fee to ${FEE_WALLET}`);
                    const response = await fetch(`${BACKEND_URL}/api/process_payment`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ account, amount, fee, feeWallet: FEE_WALLET })
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.error || 'Failed to process payment');
                    document.getElementById("vibe-token-amount").textContent = amount;
                    document.getElementById("vibe-presale-info").style.display = "block";
                } catch (error) {
                    console.error("Token purchase error:", error);
                    alert("Failed to buy tokens: " + error.message);
                }
            });
        };

        // Initialize wallet button in header on page load
        document.addEventListener('DOMContentLoaded', () => {
            VibeApp.connectWallet('header-wallet');
        });

        console.log("VibeApp loaded successfully");
    } catch (error) {
        console.error("Error in vibe-app.js IIFE:", error);
    }
})();