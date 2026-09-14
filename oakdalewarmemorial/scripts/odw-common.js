/* ==========================================================================
   OAKDALE WAR MEMORIAL - UNIFIED INJECTION ENGINE (v4.9.0)
   Purpose: Centralized orchestrator using ES6 Modules.
   Note: Integrates routing, injection, lightbox, and responsive hamburger menu.
   ========================================================================== */

import { initRouter } from './odw-router.js';

document.addEventListener("DOMContentLoaded", () => {
    const eraType = document.body.getAttribute("data-era");

    // === 1. NAVIGATION ENGINE ===
    // Fire the imported router and pass the era context
    if (eraType) {
        initRouter(eraType);
    }

    // === 2. FOOTER INJECTION ENGINE ===
    const footerSocket = document.getElementById("footer-placeholder");
    if (footerSocket) {
        fetch("/snippets/odw-footer-snippet.html")
            .then(res => res.text())
            .then(html => footerSocket.innerHTML = html)
            .catch(err => console.error("Footer Injection Error:", err));
    }

    // === 3. CAROUSEL/FACTORY ENGINE (Profile Navigation) ===
    if (eraType === "ww1-profile" || eraType === "ww2-profile") {
        const navSocket = document.getElementById("profile-nav-engine");
        
        if (navSocket) {
            // Note: Currently populated with WWI roster.
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
                
                // Determine correct back link based on era
                const backLink = eraType.includes("ww1") ? "/ww1/ww1-fallen.html" : "/ww2/ww2-fallen.html";

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
   GLOBAL EVENT DELEGATION (Clicks outside of DOMContentLoaded)
   ========================================================================== */
document.addEventListener('click', (e) => {
    
    // === 4. UNIVERSAL LIGHTBOX ENGINE ===
    const modal = document.getElementById('odw-lightbox-modal');
    if (modal) {
        // Open Modal Trigger
        const trigger = e.target.closest('a[data-lightbox]');
        if (trigger) {
            e.preventDefault();
            const targetImg = document.getElementById('modal-target-img');
            const caption = document.getElementById('modal-caption-text');
            
            if (targetImg) targetImg.src = trigger.getAttribute('href');
            if (caption) caption.textContent = trigger.getAttribute('data-caption') || '';
            
            document.body.style.overflow = 'hidden';
            modal.classList.add('modal-active');
        }

        // Close Modal Trigger (Clicking 'X' or the background overlay)
        if (e.target.closest('.modal-close-btn') || e.target.id === 'odw-lightbox-modal') {
            modal.classList.remove('modal-active');
            document.body.style.overflow = ''; // Restore page scrolling
        }
    }

    // === 5. HAMBURGER MENU ENGINE ===
    const hamburgerBtn = e.target.closest('.hamburger-toggle');
    if (hamburgerBtn) {
        const menu = document.getElementById('subnav-menu-links');
        if (menu) {
            menu.classList.toggle('menu-active');
            hamburgerBtn.classList.toggle('menu-active');
        }
    }
});