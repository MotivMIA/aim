document.getElementById("presale-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const usdAmount = parseFloat(document.getElementById("usd-amount").value);
    const email = document.getElementById("email").value;
    const wallet = document.getElementById("wallet").value;
    const statusDiv = document.getElementById("status");

    if (usdAmount < 10) {
        statusDiv.textContent = "Minimum purchase is $10.";
        statusDiv.style.display = "block";
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount_usd: usdAmount, email, user_wallet: wallet })
        });
        const result = await response.json();

        if (result.status === "success") {
            statusDiv.textContent = `Success! Paid $${result.usd_amount}, received ${result.mnx_amount} MNX, bonus $${result.reward_usd}.`;
            statusDiv.style.color = "green";
        } else {
            statusDiv.textContent = `Error: ${result.message}`;
            statusDiv.style.color = "red";
        }
        statusDiv.style.display = "block";
    } catch (error) {
        statusDiv.textContent = `Error: Failed to process payment.`;
        statusDiv.style.color = "red";
        statusDiv.style.display = "block";
    }
});