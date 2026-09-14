/* ==========================================================================
   OAKDALE WAR MEMORIAL - UNIFIED INJECTION ENGINE (v5.2)
   Purpose: Centralized orchestrator using ES6 Modules.
   Features: Universal Lightbox, Navigation Injection, Hybrid Fetch, Dynamic Path Routing, Interactive Maps, Bookmark Routing
   Notes: v5.2 Migrates map modals to standalone physical files fetched via 
          Hybrid Fetch, integrating the external v7 map zoom engine.
   ========================================================================== */

import { initRouter } from './odw-router.js';

// === 1. CROSS-PAGE BOOKMARK JUMP ENGINE ===
if (window.location.hash) {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'; 
    }
    const targetHash = window.location.hash;
    history.replaceState(null, null, window.location.pathname + window.location.search);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const target = document.querySelector(targetHash);
            if (target) {
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                history.replaceState(null, null, window.location.pathname + window.location.search + targetHash);
            }
        }, 600);
    });
}

// ==========================================================================
// DOM LOADED EVENT
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const eraType = document.body.getAttribute("data-era");
    const rootPrefix = document.body.getAttribute("data-root") || "./"; 

    if (eraType) {
        initRouter(eraType, rootPrefix); 
    }

    const bodyId = document.body.id;
    if (bodyId) {
        document.body.classList.add(`is-${bodyId}`);
    }

    const footerSocket = document.getElementById("footer-placeholder");
    if (footerSocket) {
        fetch(rootPrefix + "snippets/odw-footer-snippet.html")
            .then(res => res.text())
            .then(html => {
                footerSocket.innerHTML = html.replace(/\{ROOT\}/g, rootPrefix);
            })
            .catch(err => console.error("Footer Injection Error:", err));
    }

    const storyNavSocket = document.getElementById("story-nav-socket");
    if (storyNavSocket) {
        fetch(rootPrefix + "snippets/odw-story-nav-snippet.html")
            .then(res => res.text())
            .then(html => {
                storyNavSocket.innerHTML = html.replace(/\{ROOT\}/g, rootPrefix);
            })
            .catch(err => console.error("Story Nav Injection Error:", err));
    }
    
    if (eraType === "ww1-profile" || eraType === "ww2-profile") {
        const navSocket = document.getElementById("profile-nav-engine");
        if (navSocket) {
            const roster = [
                "coombs_t_g.html", "daniels_j.html", "davies_t.html", "dyer_a_e.html", 
                "ellway_m.html", "evans_d_j.html", "farrell_m.html", "fisher_s.html", 
                "goodman_f_g.html", "harvey_r_h.html", "havard_e.html", "havard_t_b.html", 
                "howard_f_h.html", "john_j_r.html", "john_w_c.html", "lloyd_w_a.html", 
                "lovell_g.html", "nelmes_i_j.html", "onions_w_j.html", "owens_a.html", 
                "paulk_w_j.html", "phillips_g.html", "price_a_s.html", "prosser_e.html", 
                "rees_d_j.html", "rowlands_e_s.html", "shaw_f.html", "symons_f_j.html",
                "watkins_e.html", "williams_j_t.html", "williams_p_a.html", "wiltshire_g.html", 
                "workman_w.html", "young_a.html"
            ];
            const currentFile = window.location.pathname.split("/").pop();
            const index = roster.indexOf(currentFile);

            if (index !== -1) {
                const prev = index > 0 ? roster[index - 1] : null;
                const next = index < roster.length - 1 ? roster[index + 1] : null;
                const backLink = eraType.includes("ww1") ? "ww1-fallen.html" : "ww2-fallen.html";

                navSocket.innerHTML = `
                    <div class="nav-btn-box left">${prev ? `<a href="${prev}" class="profile-nav-btn">&larr; Prev</a>` : ''}</div>
                    <div class="nav-btn-box center"><a href="${backLink}" class="profile-nav-btn">Back to List</a></div>
                    <div class="nav-btn-box right">${next ? `<a href="${next}" class="profile-nav-btn">Next &rarr;</a>` : ''}</div>
                `;
            }
        }
    }
});

/* ==========================================================================
   GLOBAL EVENT DELEGATION
   ========================================================================== */
document.addEventListener('click', (e) => {
    const modal = document.getElementById('odw-lightbox-modal');
    
    if (modal) {
        // === 8. UNIVERSAL LIGHTBOX ENGINE ===
        const trigger = e.target.closest('a[data-lightbox]');
        if (trigger) {
            e.preventDefault();
            const targetImg = document.getElementById('modal-target-img');
            const caption = document.getElementById('modal-caption-text');
            const htmlTarget = document.getElementById('modal-target-html'); 
            const type = trigger.getAttribute('data-lightbox'); 
            
            if (type === 'artifact') {
                modal.setAttribute('data-theme', 'bare-bones'); 
                if (targetImg) {
                    targetImg.style.display = 'block';
                    targetImg.src = trigger.getAttribute('href');
                }
                if (caption) {
                    caption.style.display = 'block';
                    caption.innerHTML = trigger.getAttribute('data-caption') || '';
                }
                if (htmlTarget) htmlTarget.style.display = 'none';
            } 
            else if (type === 'bio') {
                modal.setAttribute('data-theme', 'paneled'); 
                if (targetImg) targetImg.style.display = 'none'; 
                if (caption) caption.style.display = 'none';     
                if (htmlTarget) {
                    htmlTarget.style.display = 'block'; 
                    const bioId = trigger.getAttribute('data-target');
                    const bioContent = document.getElementById(bioId);
                    htmlTarget.innerHTML = bioContent ? bioContent.innerHTML : 'Bio data not found.';
                }
            }
            
            document.body.style.overflow = 'hidden';
            modal.classList.add('modal-active');
        }

        // === 9. HYBRID FETCH ENGINE ===
        const fetchTrigger = e.target.closest('.hybrid-fetch-trigger');
        if (fetchTrigger) {
            e.preventDefault();
            
            const targetImg = document.getElementById('modal-target-img');
            const caption = document.getElementById('modal-caption-text');
            const htmlTarget = document.getElementById('modal-target-html');
            const mapInstructions = document.getElementById('modal-map-instructions');

            if (targetImg) targetImg.style.display = 'none';
            if (caption) caption.style.display = 'none';
            if (mapInstructions) mapInstructions.style.display = 'none'; 
            
            // ROBUST MAP DETECTOR
            const targetUrl = fetchTrigger.getAttribute('href') || '';
            if (targetUrl.includes('/maps/') || targetUrl.includes('-map')) {
                modal.setAttribute('data-theme', 'map-ui'); 
                if (mapInstructions) mapInstructions.style.display = 'block'; 
            } else {
                modal.setAttribute('data-theme', 'paneled'); 
            }

            if (htmlTarget) {
                htmlTarget.style.display = 'block';
                htmlTarget.innerHTML = '<div style="padding: 40px 20px; text-align: center; font-style: italic; opacity: 0.7;">Retrieving archive data...</div>';
            }

            document.body.style.overflow = 'hidden';
            modal.classList.add('modal-active');

            const targetType = fetchTrigger.getAttribute('data-target');
            if (targetType === 'modal') {
                const selector = fetchTrigger.getAttribute('href'); 
                const localTemplate = document.querySelector(selector);
                if (localTemplate && htmlTarget) {
                    htmlTarget.innerHTML = '';
                    htmlTarget.appendChild(localTemplate.content.cloneNode(true));
                }
            } else {
                executeHybridFetch(targetUrl, htmlTarget);
            }
        }

        // CLOSE MODAL LOGIC
        if (e.target.closest('.modal-close-btn') || e.target.id === 'odw-lightbox-modal') {
            
            if (history.state && history.state.isHybridModal) {
                history.back(); 
            } else {
                modal.classList.remove('modal-active');
                modal.removeAttribute('data-theme'); 
                document.body.style.overflow = ''; 
                
                const mapInstructions = document.getElementById('modal-map-instructions');
                if (mapInstructions) mapInstructions.style.display = 'none';

                setTimeout(() => {
                    const htmlTarget = document.getElementById('modal-target-html');
                    if (htmlTarget) htmlTarget.innerHTML = '';
                }, 300);
            }
        }
    }

    // === 10. HAMBURGER MENU ENGINE ===
    const hamburgerBtn = e.target.closest('.hamburger-toggle');
    if (hamburgerBtn) {
        const menu = document.getElementById('subnav-menu-links');
        if (menu) {
            menu.classList.toggle('menu-active');
            hamburgerBtn.classList.toggle('menu-active');
        }
    }
});

/* ==========================================================================
   === 11. HYBRID FETCH UTILITY FUNCTION ===
   ========================================================================== */
async function executeHybridFetch(url, container) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const htmlString = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const template = doc.querySelector('#hybrid-summary-payload');
        
        if (template) {
            container.innerHTML = ''; 
            container.appendChild(template.content.cloneNode(true));
            history.pushState({ isHybridModal: true }, '', url);

            setTimeout(() => {
                if (typeof window.initMapZoomEngine === 'function') {
                    window.initMapZoomEngine();
                }
            }, 50);

        } else {
            console.warn('Target page is missing the #hybrid-summary-payload template.');
            window.location.href = url; 
        }
    } catch (error) {
        console.error('Fetch failed, executing fallback navigation:', error);
        window.location.href = url; 
    }
}

/* ==========================================================================
   === 12. BROWSER HISTORY MANAGER ===
   ========================================================================== */
window.addEventListener('popstate', (e) => {
    const modal = document.getElementById('odw-lightbox-modal');
    if (modal && modal.classList.contains('modal-active')) {
        modal.classList.remove('modal-active');
        modal.removeAttribute('data-theme'); 
        document.body.style.overflow = '';
        
        setTimeout(() => {
            const htmlTarget = document.getElementById('modal-target-html');
            if (htmlTarget) htmlTarget.innerHTML = '';
        }, 300);
    }
});
