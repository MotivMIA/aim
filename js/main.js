async function connectWallet() {
    try {
        const account = prompt("Enter your XRPL wallet address for testing:");
        if (!account) throw new Error("No wallet address provided");
        const response = await fetch(`https://aimpact-backend.onrender.com/api/account_info?account=${account}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch account info');
        const balanceResponse = await fetch(`https://aimpact-backend.onrender.com/api/account_lines?account=${account}`);
        const balanceData = await balanceResponse.json();
        if (!balanceResponse.ok) throw new Error(balanceData.error || 'Failed to fetch account lines');
        const vibeBalance = balanceData.lines.find(line => line.currency === "VIP")?.balance || "0";
        document.getElementById("wallet-address").textContent = account;
        document.getElementById("token-balance").textContent = vibeBalance;
        document.getElementById("wallet-info").style.display = "block";
    } catch (error) {
        console.error("Wallet connection error:", error);
        alert("Failed to connect wallet: " + error.message);
    }
}

function loadSection(section) {
    console.log("Loading section:", section);
    const container = document.getElementById('content-container');
    if (!container) {
        console.error("Content container not found");
        return;
    }
    console.log("Content container found:", container);

    // Fade out the current content
    container.classList.remove('fade-in');
    container.classList.add('fade-out');

    // Wait for the fade-out animation to complete (0.5s) before proceeding
    setTimeout(async () => {
        // Clear the content and show a loading message (no fade for loading message)
        container.innerHTML = '<p>Loading...</p>';

        const sectionUrl = `sections/_${section}.html`;
        console.log("Fetching section from URL:", sectionUrl);

        try {
            const response = await fetch(sectionUrl);
            console.log("Fetch response status:", response.status, response.statusText);
            console.log("Fetch response URL:", response.url);
            if (!response.ok) throw new Error(`Failed to load ${section} section: ${response.status} ${response.statusText}`);
            const html = await response.text();
            console.log("Section HTML loaded:", html);

            // Update the content and fade in
            container.innerHTML = html;
            container.classList.remove('fade-out');
            container.classList.add('fade-in');

            if (section === 'home') {
                console.log("Home section loaded, initializing wallet...");
                VibeApp.connectWallet('wallet-connect');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            container.innerHTML = `<p>Error loading ${section} section: ${error.message}. Please check if the file exists at ${sectionUrl}.</p>`;
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
        }
    }, 500); // Match the fade-out duration (0.5s)
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");
    const section = window.location.hash.replace('#', '') || 'home';
    console.log("Initial section to load:", section);
    loadSection(section);
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        if (section) {
            console.log("Nav link clicked, loading section:", section);
            loadSection(section);
            window.history.pushState(null, null, `#${section}`);
        }
    });
});