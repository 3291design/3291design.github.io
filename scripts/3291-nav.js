// 3291design Master Navigation Logic - 2026 Edition
document.addEventListener("DOMContentLoaded", function() {
    const navAnchor = document.getElementById('master-nav-anchor');
    
    if (navAnchor) {
        // 1. Define the Responsive Navigation HTML Structure
        const navHTML = `
            <header class="uber-header">
                <div class="navbar-container">
                    <a href="/" class="nav-logo" id="nav-logo">3291<span>DESIGN</span></a>
                    <nav class="nav-menu" id="nav-menu">
                        <a href="/" class="nav-link" id="nav-home">Home</a>
                        <a href="/bikewales" class="nav-link" id="nav-bikewales">Bike Wales</a>
                        <a href="/curtisfieldsdesign" class="nav-link" id="nav-studio">The Studio</a>
                        <a href="/oakdalewarmemorial" class="nav-link" id="nav-memorial">Oakdale War Memorial</a>
                        <a href="/ourfamilytree" class="nav-link" id="nav-family">Our Family Tree</a>
                        <a href="/techlab" class="nav-link" id="nav-techlab">Tech Lab</a>
                    </nav>
                    <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>
                </div>
            </header>
        `;

        // 2. Inject the Navbar into the target anchor
        navAnchor.innerHTML = navHTML;

        // 3. THE BRAIN: Context-Aware Highlighting Logic
        const currentPath = window.location.pathname.toLowerCase();
        
        // Map paths directly to element IDs for instant matching
        const routeMap = {
            'bikewales': 'nav-bikewales',
            'curtisfieldsdesign': 'nav-studio',
            'oakdalewarmemorial': 'nav-memorial',
            'ourfamilytree': 'nav-family',
            'techlab': 'nav-techlab'
        };

        let matched = false;

        // Dynamic route scanning
        for (const [key, id] of Object.entries(routeMap)) {
            if (currentPath.includes(key)) {
                document.getElementById(id).classList.add('active');
                matched = true;
                break;
            }
        }

        // Default fallback to Home if no subfolder matches and we are at the root
        if (!matched) {
            const homeLink = document.getElementById('nav-home');
            if (homeLink) homeLink.classList.add('active');
        }

        // 4. INTERACTION: Mobile Hamburger Toggle Panel
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                
                // Toggle accessibility attributes and visual classes
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                menuToggle.classList.toggle('open');
                navMenu.classList.toggle('open');
            });
        }
    }
});
