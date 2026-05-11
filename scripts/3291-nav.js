// 3291design Master Navigation Logic
const masterNavContainer = document.getElementById('master-nav-anchor');

const navHTML = `
<nav id="master-nav-2026">
    <a href="https://3291design.github.io/">Home</a>
    <a href="https://3291design.github.io/ourfamilytree/">Our Family Tree</a>
    <a href="https://3291design.github.io/oakdalewarmemorial/">Oakdale War Memorial</a>
    <a href="https://3291design.github.io/bikewales/">Bike Wales</a>
    <a href="https://3291design.github.io/curtisfieldsdesign/">Architect's Studio</a>
    <a href="https://3291design.github.io/techlab/">Tech Lab</a>
</nav>
`;

if (masterNavContainer) {
    masterNavContainer.innerHTML = navHTML;
}
