/* 3291design Master Navigation - High Visibility Version */

#master-nav-2026 {
    /* Critical Positioning */
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important; /* Changed from 100vw to 100% for better compatibility */
    height: 60px; /* Fixed height makes it easier to predict */
    z-index: 99999 !important; /* Force it to the very front */
    
    /* Layout */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    
    /* Aesthetics */
    background-color: #1a1a1a !important;
    margin: 0;
    padding: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

#master-nav-2026 a {
    color: #ffffff !important;
    text-decoration: none;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 5px;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
}

#master-nav-2026 a:hover {
    color: #0078d4 !important;
}

#master-nav-2026 a.active {
    color: #0078d4 !important;
    border-bottom: 2px solid #0078d4 !important;
}

/* Push the rest of the page down so it doesn't hide under the bar */
body {
    padding-top: 80px !important;
}
