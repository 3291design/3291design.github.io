/* --- BIKE WALES NAVBAR 6.0 GLOBAL STYLES --- */

/* 1. Table Reset */
.navbar2 {
    border-collapse: collapse;
    table-layout: fixed; /* Ensures all 8 columns are equal width */
    width: 100%;
}

/* 2. The Navigation Item (The Cell) */
.nav-item {
    background-color: #ffffff; /* Default is white */
    height: 40px; 
    transition: background-color 0.25s ease;
    vertical-align: middle;
}

/* 3. The Link (The Clickable Area) */
.nav-item a {
    color: #485175; /* Your signature Blue-Grey */
    text-decoration: none;
    display: block;
    width: 100%;
    line-height: 40px; /* Centers text vertically */
    font-family: Arial, sans-serif; /* Or your preferred font */
    font-size: 14px;
}

/* 4. The "Gold" Hover State */
/* This replaces all your onmouseover/onmouseout logic! */
.nav-item:hover {
    background-color: #9c8461 !important;
}

.nav-item:hover a {
    color: #ffffff !important;
}

/* 5. Dropdown Basics (Keep your existing CSS logic for visibility here) */
.dropdown {
    position: relative;
    display: table-cell;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 999;
    text-align: left;
}

.dropdown:hover .dropdown-content {
    display: block;
}
