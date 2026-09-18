// ==========================================================================
// ODW ROUTER ENGINE (v5.4 - FOLDER-PATH ROUTING & CLEAN TITLES)
// ==========================================================================

export function initRouter(eraType, rootPrefix = "./") {
    const headerSocket = document.getElementById("header-socket");
    if (!headerSocket) return; // Silent fail if socket missing

    // Fetch the sub-nav snippet using the dynamic prefix!
    fetch(rootPrefix + "snippets/odw-subnav-snippet.html")
        .then(res => res.text())
        .then(html => {
            // Dynamically swap any {ROOT} placeholders in the sub-nav snippet first!
            const dynamicHtml = html.replace(/\{ROOT\}/g, rootPrefix);

            // 1. Inject the entire menu structure
            headerSocket.innerHTML = dynamicHtml;
            
            // 2. Contextual Flexi-Zone Toggling Logic (Folder-Path Priority)
            let targetZone = "zone-master"; // Default fallback for root & footer pages
            const currentPath = window.location.pathname;

            if (currentPath.includes("/ww1/")) {
                targetZone = "zone-ww1";
            } else if (currentPath.includes("/ww2/")) {
                targetZone = "zone-ww2";
            }
            
            // Explicitly wipe out all flexi-zones first so they never overlap or linger
            const allZones = headerSocket.querySelectorAll(".flexi-zone");
            allZones.forEach(zone => zone.style.display = "none");

            const activeZone = document.getElementById(targetZone);
            if (activeZone) {
                activeZone.style.display = "flex"; // Turn on ONLY the relevant era flexi-zone
            }
            
            // 3. Title Promotion, Pruning, & PATH FIXING Logic
            const titleSocket = document.getElementById("dynamic-title-link");
            let currentFile = currentPath.split("/").pop();

            // Profile & Sub-story Parenting Override
            if (eraType === "ww1-profile" || (currentPath.includes("/ww1/") && currentFile !== "ww1-overview.html" && currentFile !== "ww1-fallen.html" && currentFile !== "ww1-stories.html" && currentFile !== "ww1-timeline.html" && currentFile !== "ww1-map-master.html" && !currentFile.includes("western") && !currentFile.includes("prisoners") && !currentFile.includes("beyond") && !currentFile.includes("return"))) {
                // If it's a individual soldier profile inside ww1, parent it back to Fallen list
                currentFile = "ww1-fallen.html";
            } else if (eraType === "ww2-profile") {
                currentFile = "ww2-fallen.html";
            } else if (
                currentFile === "ww1-western-front.html" ||
                currentFile === "ww1-beyond-western.html" ||
                currentFile === "ww1-prisoners-missing.html" ||
                currentFile === "ww1-return-home.html"
            ) {
                currentFile = "ww1-stories.html";
            }

            const menuLinks = headerSocket.querySelectorAll(".subnav-menu a");
            let matchFound = false;
            
            menuLinks.forEach(link => {
                const updatedHref = link.getAttribute("href");

                // Compare just the filenames so path differences don't break pruning
                if (updatedHref && updatedHref.split("/").pop() === currentFile) {
                    matchFound = true;
                    if (titleSocket) {
                        titleSocket.textContent = link.textContent; 
                        titleSocket.setAttribute("href", updatedHref); 
                    }
                    // Cleanly remove the redundant link from the active menu
                    const parentItem = link.closest(".subnav-item");
                    if (parentItem) parentItem.remove();
                }
            });

            // 4. MANUAL FALLBACK FOR ROOT / FOOTER PAGES
            // Only fires if a match wasn't found in the active flexi-zone (meaning we are on a root-level or footer utility page)
            if (!matchFound && titleSocket) {
                if (currentFile === "ww1-map-master.html") {
                    titleSocket.textContent = "WWI: Map";
                    titleSocket.setAttribute("href", rootPrefix + "ww1/ww1-map-master.html");
                } else if (currentFile === "odw-links.html") {
                    titleSocket.textContent = "Links";
                } else if (currentFile === "odw-bibliography.html") {
                    titleSocket.textContent = "Bibliography";
                } else if (currentFile === "odw-copyright.html") {
                    titleSocket.textContent = "Copyright";
                } else if (currentFile === "odw-credits.html") {
                    titleSocket.textContent = "Credits";
                } else if (currentFile === "odw-sitemap.html") {
                    titleSocket.textContent = "Site Map";
                } else if (currentFile === "odw-contact.html") {
                    titleSocket.textContent = "Contact";
                } else if (currentFile === "odw-memorial.html") {
                    titleSocket.textContent = "The Memorial";
                    titleSocket.setAttribute("href", rootPrefix + "odw-memorial.html");
                 } else if (currentFile === "odw-about.html") {
                    titleSocket.textContent = "About Oakdale";
                    titleSocket.setAttribute("href", rootPrefix + "odw-about.html");
                } else {
                    titleSocket.textContent = "Oakdale War Memorial";
                    titleSocket.setAttribute("href", rootPrefix + "index.html");
                }
            }
        })
        .catch(err => console.error("Navigation Engine Error:", err));
}
