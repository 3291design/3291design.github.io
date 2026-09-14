// ==========================================================================
// ODW ROUTER ENGINE (v4.8.1 - PROFILE PARENTING LOGIC)
// ==========================================================================

export function initRouter(eraType) {
    const headerSocket = document.getElementById("header-socket");
    if (!headerSocket) return; // Silent fail if socket missing

    // Fetch the SINGLE unified snippet
    fetch("/snippets/odw-subnav-snippet.html")
        .then(res => res.text())
        .then(html => {
            // 1. Inject the entire menu structure
            headerSocket.innerHTML = html;
            
            // 2. Flexi-Zone Toggling Logic
            let targetZone = "zone-master"; // Default fallback
            if (eraType.includes("ww1")) targetZone = "zone-ww1";
            if (eraType.includes("ww2")) targetZone = "zone-ww2";
            
            const activeZone = document.getElementById(targetZone);
            if (activeZone) {
                activeZone.style.display = "flex"; // Keep the row layout
            }
            
            // 3. Title Promotion & Pruning Logic
            const titleSocket = document.getElementById("dynamic-title-link");
            let currentPath = window.location.pathname;

            // --- THE FIX: Profile Parenting Override ---
            // If on a profile page, hijack the currentPath to match the roster page
            if (eraType === "ww1-profile") {
                currentPath = "/ww1/ww1-fallen.html";
            } else if (eraType === "ww2-profile") {
                currentPath = "/ww2/ww2-fallen.html";
            }
            // -------------------------------------------

            const menuLinks = headerSocket.querySelectorAll(".subnav-menu a");
            
            menuLinks.forEach(link => {
                const linkHref = link.getAttribute("href");
                
                // If it matches our current (or hijacked) path, update title and prune
                if (linkHref === currentPath || link.href.endsWith(currentPath)) {
                    if (titleSocket) {
                        titleSocket.textContent = link.textContent; // E.g., "WWI - The Fallen"
                        titleSocket.setAttribute("href", currentPath); // Links back to roster
                    }
                    // Cleanly remove the redundant link from the active menu
                    const parentItem = link.closest(".subnav-item");
                    if (parentItem) parentItem.remove();
                }
            });
        })
        .catch(err => console.error("Navigation Engine Error:", err));
}