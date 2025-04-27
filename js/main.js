function adjustMainMargin() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    if (header && main) {
        const headerHeight = header.offsetHeight;
        main.style.marginTop = `${headerHeight}px`;
    }
}

function toggleNavMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function closeNavMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.remove('active');
}

function loadSection(section) {
    console.log("Loading section:", section);
    const container = document.getElementById('content-container');
    if (!container) {
        console.error("Content container not found");
        return;
    }
    console.log("Content container found:", container);

    container.classList.remove('fade-in');
    container.classList.add('fade-out');

    setTimeout(async () => {
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

            container.innerHTML = html;
            container.classList.remove('fade-out');
            container.classList.add('fade-in');

            // Adjust margin after loading new content
            adjustMainMargin();
        } catch (error) {
            console.error("Fetch error:", error);
            container.innerHTML = `<p>Error loading ${section} section: ${error.message}. Please check if the file exists atMuseum ${sectionUrl}.</p>`;
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
        }
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded event fired");
    adjustMainMargin();
    window.addEventListener('resize', adjustMainMargin);

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleNavMenu);
    }

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
            closeNavMenu();
        }
    });
});