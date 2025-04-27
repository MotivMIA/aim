(function () {
    window.VibeApp = window.VibeApp || {};

    const BACKEND_URL = "https://aimpact-backend.onrender.com";
    const FEE_PERCENTAGE = 0.01;
    const FEE_WALLET = "rNewFeeWallet1234567890";  // Replace with your generated fee wallet address

    VibeApp.connectWallet = async function (containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error("Container not found:", containerId);
            return;
        }

        container.innerHTML = `
            <button id="vibe-connect-wallet" class="btn">Connect Wallet</button>
            <div id="vibe-wallet-info" style="display: none;">
                <p>Wallet Address: <span id="vibe-wallet-address"></span></p>
                <p>SVIP Balance: <span id="vibe-token-balance">0</span></p>
            </div>
        `;

        document.getElementById("vibe-connect-wallet").addEventListener("click", async () => {
            try {
                const account = prompt("Enter your XRPL wallet address for testing:");
                if (!account) throw new Error("No wallet address provided");
                const response = await fetch(`${BACKEND_URL}/api/account_info?account=${account}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Failed to fetch account info');
                const balanceResponse = await fetch(`${BACKEND_URL}/api/account_lines?account=${account}`);
                const balanceData = await balanceResponse.json();
                if (!balanceResponse.ok) throw new Error(balanceData.error || 'Failed to fetch account lines');
                const vibeBalance = balanceData.lines.find(line => line.currency === "VIP")?.balance || "0";
                document.getElementById("vibe-wallet-address").textContent = account;
                document.getElementById("vibe-token-balance").textContent = vibeBalance;
                document.getElementById("vibe-wallet-info").style.display = "block";
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

        container.innerHTML = `
            <button id="vibe-buy-tokens" class="btn">Buy SVIP Tokens</button>
            <div id="vibe-presale-info" style="display: none;">
                <p>Tokens Purchased: <span id="vibe-token-amount">0</span> SVIP</p>
            </div>
        `;

        document.getElementById("vibe-buy-tokens").addEventListener("click", async () => {
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

    console.log("VibeApp loaded successfully");
})();
