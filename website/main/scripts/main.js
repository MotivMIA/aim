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
        const aimBalance = balance.result.lines.find(line => line.currency === "{token_symbol}")?.balance || "0";
        document.getElementById("wallet-address").textContent = account;
        document.getElementById("token-balance").textContent = aimBalance;
        document.getElementById("wallet-info").style.display = "block";
        await client.disconnect();
    } catch (error) {
        console.error("Wallet connection error:", error);
        alert("Failed to connect wallet. Please try again.");
    }
}

// Function to load section content dynamically
function loadSection(section) {
    const container = document.getElementById('content-container');
    container.innerHTML = '<p>Loading...</p>'; // Show loading message
    fetch(`sections/${section}.html`)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${section} section: ${response.statusText}`);
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            // Attach event listeners specific to each section
            if (section === 'home') {
                const connectButton = document.getElementById('connect-wallet');
                if (connectButton) {
                    connectButton.addEventListener('click', connectWallet);
                }
            }
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = `<p>Error loading section: ${error.message}</p>`;
        });
}

// Load section based on URL hash or default to home
document.addEventListener('DOMContentLoaded', () => {
    const section = window.location.hash.replace('#', '') || 'home';
    loadSection(section);
});

// Handle navigation clicks
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        const section = e.target.getAttribute('data-section');
        if (section) {
            loadSection(section);
            // Update URL hash without reloading
            window.history.pushState(null, null, `#${section}`);
        }
    });
});