// 3291design V5 Responsive Blueprint Navbar & Universal Footer

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. NAVBAR INJECTION & LOGIC ---
    const navContainer = document.querySelector('.studio-nav') || document.body;
    
    const navHTML = `
        <div class="nav-wrapper">
            <a href="/index.html" class="nav-logo-block">
                <span class="nav-smooch-3291">3291</span><span class="nav-orbitron-design">design</span>
            </a>
            
            <button class="menu-toggle" aria-label="Toggle Navigation Menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <div class="nav-links">
                <a href="/bikewales/" class="nav-item" data-route="bikewales">Bike Wales</a>
                <a href="/oakdalewarmemorial/" class="nav-item" data-route="oakdalewarmemorial">War Memorial</a>
                <a href="/ourfamilytree/" class="nav-item" data-route="ourfamilytree">Family Tree</a>
                <a href="/thestudio/" class="nav-item" data-route="thestudio">Studio</a>
                <a href="/photolab/" class="nav-item" data-route="photolab">PhotoLab</a>
                <a href="/techlab/" class="nav-item" data-route="techlab">TechLab</a>
            </div>
        </div>
        <div class="nav-accent-line"></div>
    `;
    
    if (document.querySelector('.studio-nav')) {
        document.querySelector('.studio-nav').innerHTML = navHTML;
    } else {
        const header = document.createElement('nav');
        header.className = 'studio-nav';
        header.innerHTML = navHTML;
        document.body.insertBefore(header, document.body.firstChild);
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('is-active');
        navLinks.classList.toggle('open');
    });

    const currentHost = window.location.hostname;
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const route = item.getAttribute('data-route');
        if (currentHost.startsWith(route + '.') || currentPath.includes('/' + route + '/')) {
            item.classList.add('active');
        }
    });

    // --- 2. FOOTER FETCH & INJECTION ---
    fetch('/footer-snippet.html')
        .then(response => {
            if (!response.ok) throw new Error('Footer snippet not found');
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) {
                // outerHTML completely replaces the placeholder div with your snippet's HTML
                placeholder.outerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading the 3291 Design footer:', error);
        });
});
