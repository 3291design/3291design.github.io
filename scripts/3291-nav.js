// 3291design Master Navigation Logic with Auto-Highlight
const masterNavContainer = document.getElementById('master-nav-anchor');

const navHTML = `
<nav id="master-nav-2026">
    <a href="https://3291design.github.io/" id="nav-home">Home</a>
    <a href="https://3291design.github.io/ourfamilytree/" id="nav-family">Our Family Tree</a>
    <a href="https://3291design.github.io/oakdalewarmemorial/" id="nav-memorial">Oakdale War Memorial</a>
    <a href="https://3291design.github.io/bikewales/" id="nav-bikewales">Bike Wales</a>
    <a href="https://3291design.github.io/curtisfieldsdesign/" id="nav-studio">Architect's Studio</a>
    <a href="https://3291design.github.io/techlab/" id="nav-techlab">Tech Lab</a>
</nav>
`;

if (masterNavContainer) {
    masterNavContainer.innerHTML = navHTML;
    
    // The "Brain": This part finds where you are and adds the 'active' class
    const currentUrl = window.location.href;
    if (currentUrl.includes('ourfamilytree')) { document.getElementById('nav-family').classList.add('active'); }
    else if (currentUrl.includes('oakdalewarmemorial')) { document.getElementById('nav-memorial').classList.add('active'); }
    else if (currentUrl.includes('bikewales')) { document.getElementById('nav-bikewales').classList.add('active'); }
    else if (currentUrl.includes('curtisfieldsdesign')) { document.getElementById('nav-studio').classList.add('active'); }
    else if (currentUrl.includes('techlab')) { document.getElementById('nav-techlab').classList.add('active'); }
    else { document.getElementById('nav-home').classList.add('active'); }
}
