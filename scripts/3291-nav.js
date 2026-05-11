/* 3291design Master Navigation - The 'Find Me' Version */

#master-nav-2026 {
    /* POSITIONING */
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 60px !important;
    z-index: 999999 !important; /* Extremely high to beat any other layer */
    
    /* VISIBILITY */
    background-color: #1a1a1a !important; /* Dark Black/Grey */
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 20px !important;
    
    /* TEMP DEBUG BORDER - Remove this once you see the bar */
    border-bottom: 2px solid yellow !important; 
}

#master-nav-2026 a {
    color: #ffffff !important;
    text-decoration: none !important;
    font-family: sans-serif !important;
    font-size: 14px !important;
    padding: 10px !important;
}

#master-nav-2026 a.active {
    color: #0078d4 !important;
    font-weight: bold !important;
}

/* Push the page content down so it doesn't overlap */
body {
    margin: 0 !important;
    padding-top: 80px !important;
}
