// 3291design Master Navigation Logic - 2026 Edition
document.addEventListener("DOMContentLoaded", function() {
    const navAnchor = document.getElementById('master-nav-anchor');
    
    if (navAnchor) {
        // 1. Define the Navigation HTML
        const navHTML = `
            <nav id="master-nav-2026">
                <a href="https://3291design.github.io/" id="nav-home">Home</a>
                <a href="https://3291design.github.io/bikewales/" id="nav-bikewales">Bike Wales</a>
                <a href="https://3291design.github.io/ourfamilytree/" id="nav-family">Our Family Tree</a>
                <a href="https://3291design.github.io/curtisfieldsdesign/" id="nav-studio">Architect's Studio</a>
                <a href="https://3291design.github.io/oakdalewarmemorial/" id="nav-memorial">Oakdale War Memorial</a>
                <a href="https://3291design.github.io/techlab/" id="nav-techlab">Tech Lab</a>
            </nav>
        `;

        // 2. Inject the Navbar into the anchor
        navAnchor.innerHTML = navHTML;

        // 3. THE BRAIN: Context-Aware Highlighting Logic
        const currentUrl = window.location.href.toLowerCase();
        
        // Remove 'active' from all first (Safety first)
        const allLinks = document.querySelectorAll('#master-nav-2026 a');
        allLinks.forEach(link => link.classList.remove('active'));

        // Check URL paths to assign the 'active' class
        if (currentUrl.includes('bikewales')) {
            document.getElementById('nav-bikewales').classList.add('active');
        } 
        else if (currentUrl.includes('ourfamilytree')) {
            document.getElementById('nav-family').classList.add('active');
        } 
        else if (currentUrl.includes('curtisfieldsdesign')) {
            document.getElementById('nav-studio').classList.add('active');
        } 
        else if (currentUrl.includes('oakdalewarmemorial')) {
            document.getElementById('nav-memorial').classList.add('active');
        } 
        else if (currentUrl.includes('techlab')) {
            document.getElementById('nav-techlab').classList.add('active');
        } 
        else {
            // Default to Home if none of the above are found
            document.getElementById('nav-home').classList.add('active');
        }
    }
});
