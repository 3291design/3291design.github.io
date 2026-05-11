/* 3291design Master Navigation Styles - 2026 Edition */

#master-nav-2026 {
    /* Layout */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px; /* Space between links */
    
    /* Position */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw; /* Force to full screen width */
    z-index: 9999; /* Stay on top of all other content */
    
    /* Styling */
    background-color: #1a1a1a; /* Professional Dark Grey/Black */
    padding: 20px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    box-sizing: border-box;
}

#master-nav-2026 a {
    color: #ffffff;
    text-decoration: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    padding: 5px 0;
    border-bottom: 2px solid transparent; /* Prepare for the highlight */
}

/* Hover State */
#master-nav-2026 a:hover {
    color: #0078d4; /* Studio Blue */
    letter-spacing: 1.5px; /* Subtle expansion effect */
}

/* THE BRAIN: The Active Page Highlight */
#master-nav-2026 a.active {
    color: #0078d4 !important;
    border-bottom: 2px solid #0078d4;
    font-weight: 700;
}

/* Ensure body doesn't hide under the fixed navbar */
body {
    padding-top: 70px; 
}
