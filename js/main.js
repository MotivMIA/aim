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
          const vibeBalance = balanceData.lines.find(line => line.currency === "VIBE")?.balance || "0";
          document.getElementById("wallet-address").textContent = account;
          document.getElementById("token-balance").textContent = vibeBalance;
          document.getElementById("wallet-info").style.display = "block";
      } catch (error) {
          console.error("Wallet connection error:", error);
          alert("Failed to connect wallet: " + error.message);
      }
  }

  function loadSection(section) {
      const container = document.getElementById('content-container');
      container.classList.remove('loaded');
      container.innerHTML = '<p>Loading...</p>';

      fetch(`sections/_${section}.html`)
          .then(response => {
              if (!response.ok) throw new Error(`Failed to load ${section} section: ${response.statusText}`);
              return response.text();
          })
          .then(html => {
              container.innerHTML = html;
              container.classList.add('loaded');
              if (section === 'home') {
                  const connectButton = document.getElementById('connect-wallet');
                  if (connectButton) {
                      connectButton.addEventListener('click', connectWallet);
                  }
              }
          })
          .catch(error => {
              console.error("Fetch error:", error);
              container.innerHTML = `<p>Error loading section: ${error.message}</p>`;
          });
  }

  document.addEventListener('DOMContentLoaded', () => {
      const section = window.location.hash.replace('#', '') || 'home';
      loadSection(section);
  });

  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const section = e.target.getAttribute('data-section');
          if (section) {
              loadSection(section);
              window.history.pushState(null, null, `#${section}`);
          }
      });
  });
