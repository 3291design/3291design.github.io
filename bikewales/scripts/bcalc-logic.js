/* =========================================================
   Gear Calculator v.3.1 "Gold Master" - TechLab Edition
   Cascading Dropdowns, Compatibility Guard, Compare Bay & Print Suite
   ========================================================= */


/*============================================================== */
/* --- 1. GLOBAL MODAL CONTROLS --- */
/*============================================================== */

window.openModal = function(modalId) { 
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "block"; 
};

window.closeModal = function(modalId) { 
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "none"; 
};

// Oakdale-style backdrop click-to-close handler
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('bcalc-modal')) {
        event.target.style.display = "none";
    }
});

/*============================================================== */
/* --- 2. COMPREHENSIVE CRANKSET & CASSETTE PRESET LIBRARIES --- */
/*============================================================== */

const CRANKSET_PRESETS = {
    "1x": [
        // Mountain / Heavy Climbing
        { label: "28T Enduro / Steep Climbing MTB (Universal)", rings: [28], ecosystems: ["standard"] },
        { label: "30T Trail MTB / microSHIFT Advent X (Universal)", rings: [30], ecosystems: ["standard", "advent"] },
        { label: "32T Modern 1x MTB Standard (Shimano CUES)", rings: [32], ecosystems: ["standard", "cues", "advent"] },
        { label: "34T Modern 1x MTB Wide / XC Pace (Universal)", rings: [34], ecosystems: ["standard", "cues", "advent"] },
        { label: "36T XC Race / Bikepacking (Universal)", rings: [36], ecosystems: ["standard"] },
        
        // Gravel / Adventure / Urban
        { label: "38T Rugged Gravel / Climbing (Universal)", rings: [38], ecosystems: ["standard", "grx", "cues"] },
        { label: "40T Gravel Standard (Universal)", rings: [40], ecosystems: ["standard", "grx", "sword", "advent"] },
        { label: "42T Modern 1x Gravel & Urban (Universal)", rings: [42], ecosystems: ["standard", "grx", "cues", "sword", "acolyte"] },
        { label: "44T Fast Gravel / Cyclocross (Universal)", rings: [44], ecosystems: ["standard", "grx"] },
        { label: "46T Gravel Race / 1x All-Road (Universal)", rings: [46], ecosystems: ["standard"] },
        
        // Road / Time Trial / Aero
        { label: "48T Fast 1x Road / Commuter (Universal)", rings: [48], ecosystems: ["standard"] },
        { label: "50T Aero Road 1x (Universal)", rings: [50], ecosystems: ["standard"] },
        { label: "52T Criterium / Time Trial 1x (Universal)", rings: [52], ecosystems: ["standard"] },
        { label: "54T Professional Aero Road 1x (Universal)", rings: [54], ecosystems: ["standard"] },
        { label: "56T Elite Time Trial 1x (Universal)", rings: [56], ecosystems: ["standard"] }
    ],
   "2x": [
        // Mountain / Off-Road / Heavy Trail
        { label: "36/22T MTB Double (Shimano CUES)", rings: [36, 22], ecosystems: ["cues"] },
        { label: "36/26T Double MTB (Traditional)", rings: [36, 26], ecosystems: ["standard"] },
        { label: "40/26T Trail Double (Shimano CUES)", rings: [40, 26], ecosystems: ["cues"] },
        
        // Gravel / Adventure / Sub-Compact
        { label: "43/30T Wide / Gravel (SRAM AXS)", rings: [43, 30], ecosystems: ["standard"] },
        { label: "46/29T Adventure Double (microSHIFT Sword)", rings: [46, 29], ecosystems: ["sword"] },
        { label: "46/30T Sub-Compact Gravel (Universal)", rings: [46, 30], ecosystems: ["standard", "grx", "cues", "sword"] },
        { label: "48/31T Sub-Compact Gravel (Shimano GRX)", rings: [48, 31], ecosystems: ["grx"] },
        { label: "48/34T Adventure / Vintage Touring (Universal)", rings: [48, 34], ecosystems: ["standard"] },
        
        // Modern & Traditional Mechanical Road
        { label: "50/34T Compact Road Standard (Universal)", rings: [50, 34], ecosystems: ["standard"] },
        { label: "52/36T Semi-Compact Road / Mid-Compact (Universal)", rings: [52, 36], ecosystems: ["standard"] },
        { label: "52/39T Classic Road Double / 90s-00s Standard (Universal)", rings: [52, 39], ecosystems: ["standard"] },
        { label: "53/39T Traditional Racing Standard Double (Universal)", rings: [53, 39], ecosystems: ["standard"] },
        { label: "54/40T Modern Pro Peloton Standard (Universal)", rings: [54, 40], ecosystems: ["standard"] }
    ],
    "3x": [
        // Triples
        { label: "42/32/22T Retro Compact MTB / 90s-00s (Shimano)", rings: [42, 32, 22], ecosystems: ["standard"] },
        { label: "44/32/22T Classic MTB Triple Standard (Universal)", rings: [44, 32, 22], ecosystems: ["standard"] },
        { label: "46/36/26T Vintage 110/74mm BCD MTB / Touring (Universal)", rings: [46, 36, 26], ecosystems: ["standard"] },
        { label: "46/34/24T Classic Trekking Triple (Universal)", rings: [46, 34, 24], ecosystems: ["standard"] },
        { label: "48/36/26T Modern HollowTech Touring Triple (Universal)", rings: [48, 36, 26], ecosystems: ["standard"] },
        { label: "48/38/28T Classic Touring / Hybrid Triple (Universal)", rings: [48, 38, 28], ecosystems: ["standard"] },
        { label: "50/39/30T Modern Road Triple / 9-10 Speed (Shimano)", rings: [50, 39, 30], ecosystems: ["standard"] },
        { label: "50/40/30T Vintage Sport Triple (Universal)", rings: [50, 40, 30], ecosystems: ["standard"] },
        { label: "52/42/30T Classic Road Triple / 8-9 Speed Era (Universal)", rings: [52, 42, 30], ecosystems: ["standard"] }
    ]
};

/* --- CUES 1X LINKGLIDE ECOSYSTEM MATRIX --- */
const CUES_1X_CASSETTE_MATRIX = {
    "9": [
        { label: "11-41T CUES LINKGLIDE (Mid Budget 1x)", cogs: [11, 13, 15, 17, 20, 23, 28, 34, 41] },
        { label: "11-46T CUES LINKGLIDE (Wide Budget 1x)", cogs: [11, 13, 15, 17, 20, 23, 28, 36, 46] }
    ],
    "10": [
        { label: "11-43T CUES LINKGLIDE (Sport/Urban 1x)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 36, 43] },
        { label: "11-48T CUES LINKGLIDE (Standard Trail 1x)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 38, 48] }
    ],
    "11": [
        { label: "11-45T CUES LINKGLIDE (Gravel/Trek 1x)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 34, 39, 45] },
        { label: "11-50T CUES LINKGLIDE (Deep Range MTB 1x)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 36, 43, 50] }
    ]
};

/* --- CUES 2X LINKGLIDE ECOSYSTEM MATRIX (Mechanically Corrected) --- */
const CUES_2X_CASSETTE_MATRIX = {
    "9": [
        { label: "11-36T CUES LINKGLIDE (2x9 Standard)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 36] }
    ],
    "10": [
        { label: "11-39T CUES LINKGLIDE (2x10 Close Ratio)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 34, 39] }
    ],
    "11": [
        { label: "11-45T CUES LINKGLIDE (2x11 Gravel/Trek Max)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 34, 39, 45] }
    ]
};

/* --- GRX 1X ECOSYSTEM MATRIX (Standardized) --- */
const GRX_1X_CASSETTE_MATRIX = {
    "10": [
        { label: "11-42T Shimano Deore (Standard GRX 1x10)", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 37, 42] }
    ],
    "11": [
        { label: "11-40T Shimano SLX/XT (Tight Step 1x11)", cogs: [11, 13, 15, 17, 19, 21, 24, 27, 31, 35, 40] },
        { label: "11-42T Shimano Deore/XT (Standard GRX 1x11)", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 37, 42] }
    ],
    "12": [
        { label: "10-45T Shimano XT/Ultegra (Gravel Race 1x12)", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 40, 45] },
        { label: "10-51T Shimano Deore/XT (Deep Range 1x12)", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 33, 39, 45, 51] }
    ]
};

/* --- GRX 2X ECOSYSTEM MATRIX (Standardized) --- */
const GRX_2X_CASSETTE_MATRIX = {
    "10": [
        { label: "11-32T Shimano Tiagra/HG500 (Standard 2x10)", cogs: [11, 12, 14, 16, 18, 20, 22, 25, 28, 32] },
        { label: "11-34T Shimano HG500 (Wide 2x10)", cogs: [11, 13, 15, 17, 19, 21, 23, 26, 30, 34] }
    ],
    "11": [
        { label: "11-30T Shimano 105/Ultegra (Tight 2x11)", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30] },
        { label: "11-32T Shimano 105/Ultegra (Mid 2x11)", cogs: [11, 12, 13, 14, 16, 18, 20, 22, 25, 28, 32] },
        { label: "11-34T Shimano 105/Ultegra (Standard GRX 2x11)", cogs: [11, 13, 15, 17, 19, 21, 23, 25, 27, 30, 34] }
    ],
    "12": [
        { label: "11-34T Shimano 105/Ultegra (Standard GRX 2x12)", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34] },
        { label: "11-36T Shimano 105 (Wide Range 2x12)", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 32, 36] }
    ]
};

/* --- MICROSHIFT ADVENT & ADVENT X Drivetrains (MTB/Trail) --- */
const MICROSHIFT_ADVENT_1X_MATRIX = {
    "9": [
        { label: "11-42T microSHIFT Advent (1x9 Standard)", cogs: [11, 13, 15, 18, 21, 24, 28, 34, 42] },
        { label: "11-46T microSHIFT Advent (1x9 Wide)", cogs: [11, 13, 15, 18, 21, 24, 30, 37, 46] }
    ],
    "10": [
        { label: "11-48T microSHIFT Advent X (1x10 Wide)", cogs: [11, 13, 15, 18, 21, 24, 28, 34, 40, 48] }
    ],
    "11": [
        // Advent MX brings 11-speed capabilities to the ecosystem
        { label: "11-50T microSHIFT Advent MX (1x11 Max)", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 36, 42, 50] }
    ]
};

const MICROSHIFT_ADVENT_2X_MATRIX = {
    "9": [
        // Corrected from 11-42T down to the mechanically safe 11-38T limit
        { label: "11-38T microSHIFT Advent (2x9 Standard)", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 38] }
    ]
};

/* --- MICROSHIFT SWORD FAMILY (Gravel Drivetrains) --- */
const MICROSHIFT_SWORD_1X_MATRIX = {
    "9": [
        // Sword Black is the dedicated 9-speed ecosystem tier
        { label: "11-46T microSHIFT Sword Black (1x9 Gravel Wide)", cogs: [11, 13, 15, 18, 21, 24, 30, 37, 46] }
    ],
    "10": [
        // The flagship 10-speed Sword pulls from the robust Advent X sprocket stack
        { label: "11-48T microSHIFT Sword (1x10 Gravel Max)", cogs: [11, 13, 15, 18, 21, 24, 28, 34, 40, 48] }
    ]
};

const MICROSHIFT_SWORD_2X_MATRIX = {
    "9": [
        { label: "11-38T microSHIFT Sword Black (2x9 Gravel)", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 38] }
    ],
    "10": [
        { label: "11-38T microSHIFT Sword (2x10 Gravel Standard)", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 38] }
    ]
};

/* --- MICROSHIFT URBAN (Acolyte Kids/Fitness Tier) --- */
const MICROSHIFT_URBAN_1X_MATRIX = {
    "8": [
        { label: "12-42T microSHIFT Acolyte (1x8 Urban Standard)", cogs: [12, 15, 18, 21, 24, 28, 34, 42] },
        { label: "12-46T microSHIFT Acolyte (1x8 Urban Wide)", cogs: [12, 15, 18, 21, 24, 30, 37, 46] }
    ]
};

/* ================================================ */

const GEARING_PRESETS = {
    "5": [
        { label: "14-24T Vintage Road Close-Ratio", cogs: [14, 16, 18, 21, 24] },
        { label: "14-28T Vintage All-Rounder (Shimano/SunRace)", cogs: [14, 17, 20, 24, 28] },
        { label: "14-32T Vintage Touring Wide-Range", cogs: [14, 17, 21, 26, 32] },
        { label: "14-34T Vintage Alpine / Megarange", cogs: [14, 17, 22, 28, 34] },
        { label: "11-28T Modern Specialist Folding", cogs: [11, 13, 17, 22, 28] }
    ],
    "6": [
        { label: "13-24T Vintage Road Tight-Ratio", cogs: [13, 15, 17, 19, 21, 24] },
        { label: "13-28T Vintage Touring (Sachs Maillard)", cogs: [13, 15, 18, 21, 24, 28] },
        { label: "14-24T Vintage Criterium Standard", cogs: [14, 16, 18, 20, 22, 24] },
        { label: "14-28T Everyday Hybrid / MTB (Shimano TZ500)", cogs: [14, 16, 18, 21, 24, 28] },
        { label: "14-34T Utility MegaRange (Super Climbing Gear)", cogs: [14, 16, 18, 21, 24, 34] }
    ],
    "7": [
        { label: "13-21T Vintage 7-Speed Corncob (Shimano J)", cogs: [13, 14, 15, 16, 17, 19, 21] },
        { label: "12-28T Hybrid / Urban (Shimano HG200-7)", cogs: [12, 14, 16, 18, 21, 24, 28] },
        { label: "11-28T Wide Road (Shimano Acera)", cogs: [11, 13, 15, 18, 21, 24, 28] },
        { label: "12-32T All-Terrain (SRAM PG-730 / Shimano)", cogs: [12, 14, 16, 18, 21, 26, 32] },
        { label: "14-34T Utility MegaRange (Freewheel Standard)", cogs: [14, 16, 18, 20, 22, 24, 34] }
    ],
    "8": [
        { label: "12-23T Smooth Cadence Road", cogs: [12, 13, 14, 15, 17, 19, 21, 23] },
        { label: "12-25T Flatland Criterium", cogs: [12, 13, 15, 17, 19, 21, 23, 25] },
        { label: "11-28T Road All-Rounder", cogs: [11, 13, 15, 17, 19, 21, 24, 28] },
        { label: "11-30T Hilly Road (Shimano HG50)", cogs: [11, 13, 15, 17, 20, 23, 26, 30] },
        { label: "11-32T MTB Light Trail (Shimano HG41)", cogs: [11, 13, 15, 18, 21, 24, 28, 32] },
        { label: "11-34T MTB Alpine Climbing", cogs: [11, 13, 15, 17, 20, 23, 26, 34] },
        { label: "12-32T Everyday Hybrid (Shimano HG200-8)", cogs: [12, 14, 16, 18, 21, 24, 28, 32] }
    ],
    "9": [
        { label: "11-25T Smooth Cadence Road", cogs: [11, 12, 13, 15, 17, 19, 21, 23, 25] },
        { label: "11-28T Road All-Rounder (Shimano HG50)", cogs: [11, 12, 13, 14, 16, 18, 21, 24, 28] },
        { label: "11-30T Hilly Road Endurance", cogs: [11, 12, 14, 16, 18, 20, 23, 26, 30] },
        { label: "11-32T Hilly Road / Gravel (Shimano HG400)", cogs: [11, 12, 14, 16, 18, 21, 24, 28, 32] },
        { label: "12-27T Classic Criterium", cogs: [12, 13, 14, 15, 17, 19, 21, 24, 27] },
        { label: "11-34T Classic MTB Standard", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 34] },
        { label: "11-36T Wide-Range Trail (Shimano HG201)", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 36] },
        { label: "12-36T Low-Gear Adventure", cogs: [12, 14, 16, 18, 21, 24, 28, 32, 36] }
    ],
    "10": [
        { label: "11-25T Road Tight-Ratio", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 23, 25] },
        { label: "11-28T Road All-Rounder", cogs: [11, 12, 13, 14, 15, 17, 19, 22, 25, 28] },
        { label: "12-28T Road Smooth Cadence", cogs: [12, 13, 14, 15, 17, 19, 21, 23, 25, 28] },
        { label: "11-32T Hilly Road Endurance", cogs: [11, 12, 14, 16, 18, 20, 22, 25, 28, 32] },
        { label: "11-34T Road Alpine / Touring", cogs: [11, 13, 15, 17, 19, 21, 23, 26, 30, 34] },
        { label: "11-38T Microshift Sword Gravel 2x10", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 38] },
        { label: "11-42T Microshift Sword Advent 2x10", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 37, 42] },
        { label: "11-36T Classic MTB Standard", cogs: [11, 13, 15, 17, 19, 22, 25, 28, 32, 36] },
        { label: "11-46T MTB Extreme Climbing", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 37, 46] }
    ],
    "11": [
        { label: "11-23T Road & Criterium", cogs: [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 23] },
        { label: "11-25T Road Standard", cogs: [11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25] },
        { label: "12-25T Road Tight Rhythm", cogs: [12, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25] },
        { label: "11-28T All-Rounder Road", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 28] },
        { label: "11-30T Hilly Road / Ultegra", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30] },
        { label: "11-32T Road Performance", cogs: [11, 12, 13, 14, 16, 18, 20, 22, 25, 28, 32] },
        { label: "11-34T Gravel / Touring", cogs: [11, 13, 15, 17, 19, 21, 23, 25, 27, 30, 34] },
        { label: "11-40T MTB / Wide Gravel", cogs: [11, 13, 15, 17, 19, 21, 24, 27, 31, 35, 40] },
        { label: "10-42T SRAM XD Gravel", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42] },
        { label: "11-42T Wide Adventure", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 37, 42] },
        { label: "11-46T Extreme Climbing", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 37, 46] },
        { label: "11-51T Ultra-Wide MTB", cogs: [11, 13, 15, 18, 21, 24, 28, 33, 39, 45, 51] }
    ],
    "12": [
        { label: "11-30T Road Race", cogs: [11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 27, 30] },
        { label: "11-34T Road Endurance", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34] },
        { label: "10-28T Aero Sprint", cogs: [10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 28] },
        { label: "10-30T All-Road", cogs: [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30] },
        { label: "10-33T Hilly Terrain", cogs: [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 33] },
        { label: "10-36T Gravel Adventure", cogs: [10, 11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 36] },
        { label: "10-44T XPLR Gravel 1x", cogs: [10, 11, 13, 15, 17, 19, 21, 24, 28, 32, 38, 44] },
        { label: "10-45T MTB Cross Country", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 40, 45] },
        { label: "10-51T MTB Trail / Enduro", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 33, 39, 45, 51] },
        { label: "10-50T Eagle Hyper-Range", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 50] },
        { label: "10-52T Eagle Extreme Range", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 52] },
        { label: "10-52T Eagle Transmission (T-Type)", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 38, 44, 52] }
    ]
};

/*============================================================== */
/* --- 3. COMPATIBILITY GUARD DIAGNOSTIC ENGINE --- */
/*============================================================== */

function runCompatibilityCheck(chainrings, cassetteCogs, speedCount) {
    const bigRing = Math.max(...chainrings);
    const smallRing = Math.min(...chainrings);
    const bigCog = Math.max(...cassetteCogs);
    const smallCog = Math.min(...cassetteCogs);

    const totalCapacity = (bigRing - smallRing) + (bigCog - smallCog);
    const isOneBy = chainrings.length === 1;
    const isDouble = chainrings.length === 2;
    const isTriple = chainrings.length === 3;

    let status = "optimal";
    let message = "🟢 Factory Spec: Setup is safely within standard drivetrain tolerances.";

    // 3.1. -- Absolute safety limit check
    if (bigCog > 52) {
        status = "warning";
        message = "🔴 Critical Warning: Max cog exceeds 52T. Verify frame clearance and hanger extensions.";
    } 
    // 3.2. -- 1x / Single Chainring Rules
    else if (isOneBy) {
        const ring = chainrings[0];
        const capacity1x = bigCog - smallCog;
        
        if (speedCount <= 8) {
            status = "warning";
            message = "🔴 Chain Width Alert: Most modern 1x chainrings use a narrow-wide profile for 9-12 speed chains. A " + speedCount + "-speed chain is too wide and will cause chain drops.";
        } else if (ring >= 46 && bigCog > 36) {
            status = "custom";
            message = "🟡 1x Wide-Range Alert: Large aero/gravel chainring paired with a wide cassette. Ensure you are using a 1x-specific Gravel or Mullet derailleur with a clutch.";
        } else if (capacity1x > 42) {
            status = "custom";
            message = "🟡 1x Extended Range: Rear capacity exceeds 42T. Requires a long-cage (SGS) or wide-range gravel derailleur.";
        }
    } 
    // 3.3. -- 2x / Double Chainring Rules
    else if (isDouble) {
        const frontJump = bigRing - smallRing;
        
        if (speedCount >= 11 && (bigRing === 52 || bigRing === 53) && frontJump >= 13) {
            status = "warning";
            message = "🔴 Cross-Era Mismatch: A narrow " + speedCount + "-speed chain on a classic road double (e.g., 52/39T) can skate over the teeth or wedge between the rings.";
        } else if (frontJump > 18) {
            status = "warning";
            message = "🔴 Front Shift Limit: The jump between chainrings is " + frontJump + "T. Standard front derailleurs max out around 16–18T difference.";
        } else if (bigRing >= 50 && bigCog > 36) {
            status = "warning";
            message = "🔴 Road Drivetrain Limit: Pairing a road double with an oversized cog (>36T) exceeds standard road rear derailleur capacity.";
        } else if (totalCapacity > 43) {
            status = "custom";
            message = "🟡 Wide Range Double: Capacity is " + totalCapacity + "T. Ensure you are using a wide-range or GRX clutch rear derailleur.";
        }
    } 
    // 3.4. -- 3x / Triple Chainring Rules
    else if (isTriple) {
        if (speedCount >= 11) {
            status = "warning";
            message = "🔴 Chain Pitch Hazard: Modern " + speedCount + "-speed chains are extremely narrow and can fall into the gaps between classic triple chainrings, causing severe jamming.";
        } else if (totalCapacity > 43) {
            status = "custom";
            message = "🟡 Touring Triple Alert: High chain wrap capacity (" + totalCapacity + "T). Watch chain length in Big-Big combos and ensure a long-cage rear mech.";
        }
    } 
    // 3.5. -- Catch-all general capacity limit
    else if (totalCapacity > 47) {
        status = "custom";
        message = "🟡 Extended Range: Capacity exceeds 47T. Requires a Long Cage (SGS) or Wide Clutch Derailleur.";
    }

    return { status, totalCapacity, bigCog, message };
}

/*============================================================== */
/* --- 4. MAIN CALCULATOR ENGINE --- */
/*============================================================== */

let ACTIVE_CASSETTE_MATRIX = GEARING_PRESETS;

function initCalculator() {
    const wheelSel = document.getElementById('bcalc-wheel-size'), 
          ecoSel = document.getElementById('bcalc-ecosystem-select'),
          speedSel = document.getElementById('bcalc-speed-select'), 
          crankTypeSel = document.getElementById('bcalc-crank-type-select'), 
          crankPresetSel = document.getElementById('bcalc-crank-preset-select'), 
          customCrankWrap = document.getElementById('bcalc-custom-crankset-wrap'), 
          customCrankInput = document.getElementById('bcalc-custom-crankset-input'), 
          cogCont = document.getElementById('bcalc-cog-container'), 
          runBtn = document.getElementById('bcalc-run'), 
          radioModes = document.getElementsByName('bcalc-mode'), 
          cadVal = document.getElementById('bcalc-cadence-val'),
          cadWrap = document.getElementById('bcalc-cadence-wrap'),
          presetWrap = document.getElementById('bcalc-preset-wrap'),
          presetSel = document.getElementById('bcalc-preset-select'),
          progressionText = document.getElementById('bcalc-progression-text'),
          compatToggle = document.getElementById('bcalc-compatibility-toggle');

    let hasCalculated = false;
    let isToggleRefresh = false;

    function triggerStale() { 
        if(hasCalculated) { 
            runBtn.innerText = "Recalculate Gear Chart"; 
            runBtn.classList.add('bcalc-btn-stale'); 
            
            const compareBtn = document.getElementById('bcalc-add-compare');
            if (compareBtn) {
                compareBtn.innerText = "Recalculate to Compare";
                compareBtn.style.opacity = "0.5";
                compareBtn.style.pointerEvents = "none";
                compareBtn.classList.remove('bcalc-btn-stale'); 
            }
        } 
    }

    const liveUpdate = function() { triggerStale(); };
    if(wheelSel) wheelSel.onchange = liveUpdate;
    if(cadVal) cadVal.oninput = liveUpdate;
    if(customCrankInput) customCrankInput.oninput = liveUpdate;
    
    if(compatToggle) compatToggle.onchange = () => {
        if(hasCalculated && runBtn) {
            isToggleRefresh = true; 
            runBtn.click();
            isToggleRefresh = false; 
        }
    };

    Array.from(radioModes).forEach(r => {
        r.onchange = function() {
            cadWrap.style.display = (this.value === 'speed') ? 'flex' : 'none';
            if(hasCalculated) runBtn.click();
        };
    });

    // --- STEP 1: DRIVETRAIN STYLE (1x, 2x, 3x, or Custom) ---
    if (crankTypeSel) {
        crankTypeSel.onchange = function() {
            const val = this.value;
            const crankPresetContainer = document.getElementById('bcalc-crank-preset-wrap');
            
            if (val === 'custom') {
                if (crankPresetContainer) crankPresetContainer.style.display = 'none';
                if (customCrankWrap) customCrankWrap.style.display = 'block';
                if (ecoSel) { 
                    ecoSel.innerHTML = '<option value="" selected disabled>N/A for Custom</option>'; 
                    ecoSel.disabled = true; 
                }
            } else {
                if (customCrankWrap) customCrankWrap.style.display = 'none';
                if (crankPresetContainer) crankPresetContainer.style.display = 'block';
                
                // Dynamically build Groupset options in your exact preferred order
            if (ecoSel) {
                ecoSel.disabled = false;
                ecoSel.innerHTML = '<option value="" selected disabled>choose below...</option>';
                
                const availableEcos = new Set();
                if (CRANKSET_PRESETS[val]) {
                    CRANKSET_PRESETS[val].forEach(p => {
                        if(p.ecosystems) p.ecosystems.forEach(e => availableEcos.add(e));
                    });
                }
                
                // Your exact preferred display order
                const preferredOrder = ["advent", "sword", "acolyte", "cues", "grx", "standard"];
                
                const groupLabels = {
                    "advent": "microSHIFT Advent / Advent X",
                    "sword": "microSHIFT Sword / Sword Black",
                    "acolyte": "microSHIFT Urban (Acolyte)",
                    "cues": "Shimano CUES (Linkglide)",
                    "grx": "Shimano GRX (Gravel)",
                    "standard": "Custom / Mixed Components"
                };

                // Loop through your ordered list; only add it if the current crankset type supports it
                preferredOrder.forEach(eco => {
                    if (availableEcos.has(eco)) {
                        const opt = document.createElement('option');
                        opt.value = eco;
                        opt.text = groupLabels[eco];
                        ecoSel.appendChild(opt);
                    }
                });
            }
                
                if (crankPresetSel) {
                    crankPresetSel.innerHTML = '<option value="" selected disabled>choose below...</option>';
                    crankPresetSel.disabled = true;
                }
            }
            
            // Wipe downstream selections
            if (speedSel) { speedSel.innerHTML = '<option value="" selected disabled>choose below...</option>'; speedSel.disabled = true; }
            if (presetSel) { presetSel.innerHTML = '<option value="" selected disabled>choose below...</option>'; presetSel.disabled = true; }
            
            liveUpdate();
        };
    }

    // --- STEP 2: GROUPSET ROUTING & FILTERING ---
    if (ecoSel) {
        ecoSel.onchange = function() {
            const eco = this.value;
            const crankType = crankTypeSel ? crankTypeSel.value : '1x';
            
            // Filter Crankset options using the array tags
            if (crankPresetSel && CRANKSET_PRESETS[crankType]) {
                crankPresetSel.innerHTML = '<option value="" selected disabled>choose below...</option>';
                crankPresetSel.disabled = false;
                
                CRANKSET_PRESETS[crankType].forEach((p, idx) => {
                    if (p.ecosystems && p.ecosystems.includes(eco)) {
                        const opt = document.createElement('option');
                        opt.value = idx; 
                        opt.text = p.label;
                        crankPresetSel.appendChild(opt);
                    }
                });

                // Append Custom Setup to the bottom of Chainset Gearing
                const customOpt = document.createElement('option');
                customOpt.value = 'custom';
                customOpt.text = 'Custom Setup...';
                crankPresetSel.appendChild(customOpt);
            }

            // Route the backend cassette matrix
            if (eco === 'cues') {
                ACTIVE_CASSETTE_MATRIX = (crankType === '1x') ? CUES_1X_CASSETTE_MATRIX : CUES_2X_CASSETTE_MATRIX;
            } else if (eco === 'grx') {
                ACTIVE_CASSETTE_MATRIX = (crankType === '1x') ? GRX_1X_CASSETTE_MATRIX : GRX_2X_CASSETTE_MATRIX;
            } else if (eco === 'advent') {
                ACTIVE_CASSETTE_MATRIX = (crankType === '1x') ? MICROSHIFT_ADVENT_1X_MATRIX : MICROSHIFT_ADVENT_2X_MATRIX;
            } else if (eco === 'sword') {
                 ACTIVE_CASSETTE_MATRIX = (crankType === '1x') ? MICROSHIFT_SWORD_1X_MATRIX : MICROSHIFT_SWORD_2X_MATRIX;
            } else if (eco === 'acolyte') {
                 ACTIVE_CASSETTE_MATRIX = MICROSHIFT_URBAN_1X_MATRIX;
            } else {
                ACTIVE_CASSETTE_MATRIX = GEARING_PRESETS; 
            }

            // Populate strictly available speeds for the active matrix
            if (speedSel) {
                speedSel.innerHTML = '<option value="" selected disabled>choose below...</option>';
                speedSel.disabled = false;
                Object.keys(ACTIVE_CASSETTE_MATRIX).sort((a,b) => a-b).forEach(speed => {
                    const opt = document.createElement('option');
                    opt.value = speed;
                    opt.text = speed + "-Speed";
                    speedSel.appendChild(opt);
                });
            }
            
            if (presetSel) {
                presetSel.innerHTML = '<option value="" selected disabled>choose below...</option>';
                presetSel.disabled = true;
            }
            
            // Hide custom crankset input if switching groupsets
            const customCrankWrap = document.getElementById('bcalc-custom-crankset-wrap');
            if (customCrankWrap) customCrankWrap.style.display = 'none';
            
            liveUpdate();
        };
    }

    // --- STEP 3: CHAINSET GEARING SELECTION & CUSTOM INPUT GENERATOR ---
    if (crankPresetSel) {
        crankPresetSel.onchange = function() {
            const val = this.value;
            const customCrankWrap = document.getElementById('bcalc-custom-crankset-wrap');
            const flexContainer = document.getElementById('bcalc-custom-inputs-flex');
            const crankType = crankTypeSel ? crankTypeSel.value : '2x';
            
            if (val === 'custom') {
                if (customCrankWrap) customCrankWrap.style.display = 'block';
                if (flexContainer) {
                    flexContainer.innerHTML = '';
                    
                    // Set intelligent defaults based on 2x or 3x configuration
                    const defaults = (crankType === '3x') ? [48, 38, 28] : [50, 34];
                    
                    defaults.forEach((defaultVal, idx) => {
                        const input = document.createElement('input');
                        input.type = 'number';
                        input.className = 'bcalc-custom-ring-input bcalc-input';
                        input.value = defaultVal;
                        input.min = '20';
                        input.max = '70';
                        input.step = '1';
                        input.style.cssText = 'padding: 8px; font-size: 15px; width: 100%; box-sizing: border-box; text-align: center;';
                        
                        input.oninput = function() { liveUpdate(); };
                        flexContainer.appendChild(input);
                    });
                }
            } else {
                if (customCrankWrap) customCrankWrap.style.display = 'none';
            }
            liveUpdate();
        };
    }

    // --- STEP 4: CASSETTE SPEEDS & GEARING PRESETS ---
    if (speedSel) {
        speedSel.onchange = function() {
            const val = this.value;
            
            if (cogCont) {
                cogCont.innerHTML = '';
                cogCont.style.display = 'none';
            }
            if (progressionText) {
                progressionText.style.display = 'none';
            }

            if (!val) {
                if (presetSel) {
                    presetSel.innerHTML = '<option value="" selected disabled>choose below...</option>';
                    presetSel.disabled = true;
                }
                liveUpdate();
                return;
            }

            if (presetSel) {
                presetSel.disabled = false;
                presetSel.innerHTML = '<option value="" selected disabled>choose below...</option>';

                if (ACTIVE_CASSETTE_MATRIX[val]) {
                    ACTIVE_CASSETTE_MATRIX[val].forEach((p, idx) => {
                        const opt = document.createElement('option');
                        opt.value = idx;
                        opt.text = p.label;
                        presetSel.appendChild(opt);
                    });
                }

                const customOpt = document.createElement('option');
                customOpt.value = 'custom';
                customOpt.text = 'Custom Setup...';
                presetSel.appendChild(customOpt);
            }

            liveUpdate();
        };
    }

    if(presetSel) {
        presetSel.onchange = function() {
            const val = this.value;
            const speedCount = parseInt(speedSel.value);

            if (val === 'custom') {
                if (progressionText) progressionText.style.display = 'none';
                if (cogCont) {
                    cogCont.innerHTML = '';
                    cogCont.style.display = 'grid';
                    
                    for(let i=0; i<speedCount; i++) {
                        const wrapper = document.createElement('div'); wrapper.style.position = 'relative';
                        if(i === 0) wrapper.innerHTML = '<div class="bcalc-mini-label">Smallest</div>';
                        if(i === speedCount-1) wrapper.innerHTML = '<div class="bcalc-mini-label">Largest</div>';
                        const input = document.createElement('input'); input.type='number'; input.className='bcalc-val-input bcalc-cog-item';
                        input.value = (i===0)?11:(i===speedCount-1)?32:Math.round(11 + (i * 2)); 
                        input.oninput = liveUpdate; wrapper.appendChild(input); cogCont.appendChild(wrapper);
                    }
                }
            } else {
                if (cogCont) cogCont.style.display = 'none';
                const idx = parseInt(val);
                const preset = ACTIVE_CASSETTE_MATRIX[speedSel.value] ? ACTIVE_CASSETTE_MATRIX[speedSel.value][idx] : GEARING_PRESETS[speedSel.value][idx];
                if (preset && progressionText) {
                    progressionText.innerText = "Cogs: [" + preset.cogs.join(', ') + "]T";
                    progressionText.style.display = 'block';
                }
            }
            liveUpdate();
        };
    }

    // --- STEP 5: CALCULATION & EXECUTION ENGINE ---
    if(runBtn) {
        runBtn.onclick = function() {
            let missing = [];
            if (!wheelSel || !wheelSel.value) missing.push("Wheel & Tyre Size");
            if (!crankTypeSel || !crankTypeSel.value) missing.push("Chainset Type");
            
            if (crankTypeSel && crankTypeSel.value === 'custom' && (!customCrankInput || !customCrankInput.value)) {
                missing.push("Custom Chainring Sizes");
            } else if (crankTypeSel && crankTypeSel.value !== 'custom' && (!crankPresetSel || !crankPresetSel.value)) {
                missing.push("Chainset Gearing Preset");
            }

            if (!speedSel || !speedSel.value) missing.push("Cassette Speeds");
            if (!presetSel || !presetSel.value) missing.push("Cassette Gearing Preset");

            if (missing.length > 0) {
                alert("Please select:\n\n- " + missing.join("\n- ")); 
                return;
            }

            hasCalculated = true; 
            runBtn.classList.remove('bcalc-btn-stale'); 
            runBtn.innerText = "Calculate Gear Chart";
            
            const compareBtn = document.getElementById('bcalc-add-compare');
            if (compareBtn) {
                compareBtn.innerText = "Add to Comparison Bay";
                compareBtn.style.opacity = "1";
                compareBtn.style.pointerEvents = "auto";
                compareBtn.classList.add('bcalc-btn-stale');
            }
            
            const mode = Array.from(radioModes).find(r => r.checked).value;
            const wheel = parseFloat(wheelSel.value);
            
            let rings = [];
            let ringDescription = "";
            
            if (crankPresetSel.value === 'custom') {
                const ringInputs = document.querySelectorAll('.bcalc-custom-ring-input');
                rings = Array.from(ringInputs).map(input => parseFloat(input.value)).filter(n => !isNaN(n)).sort((a,b) => a-b);
                ringDescription = rings.slice().reverse().join('/') + 'T (Custom)';
            } else {
                const presetIndex = parseInt(crankPresetSel.value);
                const preset = CRANKSET_PRESETS[crankTypeSel.value][presetIndex];
                rings = [...preset.rings].sort((a,b) => a-b);
                ringDescription = preset.label;
            }
            
            let cogs = [];
            let cassetteDescription = "";

            if (presetSel.value === 'custom') {
                cogs = Array.from(document.querySelectorAll('.bcalc-cog-item')).map(n => parseFloat(n.value)).sort((a,b)=>b-a);
                cassetteDescription = speedSel.options[speedSel.selectedIndex].text + " Custom";
            } else {
                const presetIndex = parseInt(presetSel.value);
                const matrixSource = ACTIVE_CASSETTE_MATRIX[speedSel.value] ? ACTIVE_CASSETTE_MATRIX : GEARING_PRESETS;
                const selectedPreset = matrixSource[speedSel.value][presetIndex];
                cogs = [...selectedPreset.cogs].sort((a,b)=>b-a);
                cassetteDescription = selectedPreset.label;
            }

            document.getElementById('snap-wheel').innerText = wheelSel.options[wheelSel.selectedIndex].text;
            document.getElementById('snap-rings').innerText = ringDescription;
            document.getElementById('snap-cogs').innerText = cassetteDescription + ' (' + cogs[cogs.length-1] + '-' + cogs[0] + 'T)';
            
            const ringDiff = (rings.length > 1) ? (rings[rings.length-1]-rings[0]) : 0;
            document.getElementById('res-cap').innerText = ringDiff + (cogs[0]-cogs[cogs.length-1]) + 'T';
            document.getElementById('res-range').innerText = Math.round(((rings[rings.length-1]/cogs[cogs.length-1])/(rings[0]/cogs[0]))*100) + '%';

            let h = '<table class="bcalc-table"><thead><tr><th style="width:75px;">Cog</th>'+rings.map(r=>`<th>${r}T</th>`).join('')+'</tr></thead><tbody>';
            
            cogs.forEach((c, cIndex) => {
                h += `<tr><td style="background:#edf2f7;">${c}T</td>`;
                rings.forEach((r, rIndex) => {
                    const gi = (r/c)*wheel;
                    let v = gi.toFixed(1);
                    if(mode==='speed') { v = ((gi * Math.PI * parseFloat(cadVal.value) * 60) / 63360).toFixed(1); }
                    
                    let isCrossed = false;
                    if (rings.length > 1) {
                        const isSmallRing = (rIndex === 0);
                        const isBigRing = (rIndex === rings.length - 1);
                        const isSmallestCogs = (cIndex >= cogs.length - 2); 
                        const isLargestCogs = (cIndex <= 1);               
                        
                        if (isSmallRing && isSmallestCogs) isCrossed = true;
                        if (isBigRing && isLargestCogs) isCrossed = true;
                    }

                    const col = isCrossed ? '#cbd5e0' : (gi < 30)?'#b2dafa':(gi < 55)?'#c6f0d7':(gi < 85)?'#fde6b6':'#fecaca';
                    const textWeight = isCrossed ? 'normal' : 'bold';
                    const textStyle = isCrossed ? 'italic' : 'normal';
                    const textColor = isCrossed ? 'rgba(0,0,0,0.4)' : '#000000';
                    
                    h += `<td style="background-color:${col} !important; color:${textColor}; font-weight:${textWeight}; font-style:${textStyle};">${v}${mode==='inches'?'"':''}</td>`;
                });
                h += '</tr>';
            });
            document.getElementById('bcalc-result-area').innerHTML = h + '</tbody></table>';
            document.querySelectorAll('.bcalc-snapshot, .bcalc-table-wrap, .bcalc-legend, #bcalc-actions, #bcalc-lab-launcher').forEach(e => e.style.display = 'block');
            document.getElementById('bcalc-actions').style.display = 'flex';

            let badge = document.getElementById('bcalc-diagnostic-badge');
            
            if (!badge) {
                badge = document.createElement('div');
                badge.id = 'bcalc-diagnostic-badge';
                badge.style.padding = '12px';
                badge.style.marginBottom = '20px';
                badge.style.borderRadius = '6px';
                badge.style.fontWeight = 'bold';
                badge.style.border = '1px solid #cbd5e0';
                
                const snap = document.getElementById('bcalc-snapshot');
                if (snap) snap.parentNode.insertBefore(badge, snap);
            }

            if (compatToggle && compatToggle.checked) {
                const currentSpeeds = parseInt(speedSel.value);
                const diag = runCompatibilityCheck(rings, cogs, currentSpeeds);
                badge.textContent = diag.message;
                
                if (diag.status === 'warning') {
                    badge.style.backgroundColor = '#fed7d7';
                    badge.style.color = '#742a2a';
                } else if (diag.status === 'custom') {
                    badge.style.backgroundColor = '#feebc8';
                    badge.style.color = '#7b341e';
                } else {
                    badge.style.backgroundColor = '#c6f6d5';
                    badge.style.color = '#22543d';
                }
                
                badge.style.display = 'block';
            } else if (badge) {
                badge.style.display = 'none';
            }

            if (!isToggleRefresh) {
                if (compatToggle && compatToggle.checked && badge && badge.style.display === 'block') {
                    badge.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    const snapshotEl = document.querySelector('.bcalc-snapshot');
                    if (snapshotEl) {
                        snapshotEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            }
        }; 
    }      

    if (speedSel && speedSel.value) speedSel.dispatchEvent(new Event('change'));
    if (crankTypeSel && crankTypeSel.value) crankTypeSel.dispatchEvent(new Event('change'));
}          

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}

/*============================================================== */
/* --- 5. PRINT ENGINE --- */
/*============================================================== */

(function() {
    const printBtn = document.getElementById('bcalc-print');
    if(printBtn) {
        printBtn.onclick = function() {
            const oldTitle = document.title;
            document.title = "Bike-Wales-Gear-Chart";
            const allChildren = Array.from(document.body.children);
            allChildren.forEach(child => { 
                child.setAttribute('data-old-display', child.style.display); 
                child.style.display = 'none'; 
            });

            const printWrap = document.createElement('div');
            printWrap.id = 'temp-print-wrap';
            printWrap.style.cssText = "max-width:800px; margin:0 auto; padding:30px; background:white; font-family:sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact;";

            const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

            printWrap.innerHTML = `
                <div style="text-align:center; margin-bottom:20px;">
                    <img id="print-logo" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCu6zOjq3G4wcuX8aomv7gPZIOKafIPj3OqQQE5MnIeCOx7O-rXc87qLL5SWxfWycB67twJgnFjDdHbGIHhUcpsDNHXbrp3IU5SWWoxZb-6DeQMFbhm8o0YsR2HGZgcP_2GJV5qklYMcH-pwsEz2HWQjMZur2TL5VRcxrobCRq2xO84FKhwQl6baFY8lc/s1600/bikewales_NEW-master-logo_02%28text-only%29.png" style="width:340px;">
                    <div style="font-size:14px; color:#485175; margin-top:10px; font-weight:bold;">${today}</div>
                    <div style="margin: 15px auto 0; width: 340px; font-size:15px; font-weight:bold; color:#4a5568; text-align: center;">
                        Project / Bike: ___________________________
                    </div>
                </div>
                <div id="print-grid-container" style="display: flex; justify-content: center; flex-direction: column; align-items: center;"></div>
            `;

            const gridContainer = printWrap.querySelector('#print-grid-container');

            const wheel = document.getElementById('snap-wheel').innerText;
            const rings = document.getElementById('snap-rings').innerText;
            const cogs = document.getElementById('snap-cogs').innerText;
            const capacity = document.getElementById('res-cap').innerText;
            const range = document.getElementById('res-range').innerText;
            const tableHtml = document.getElementById('bcalc-result-area').innerHTML;

            const cardBlock = document.createElement('div');
            cardBlock.style.cssText = `page-break-inside: avoid; border: 1px solid #cbd5e0; border-radius: 8px; padding: 15px; box-sizing: border-box; width: 100%; max-width: 380px;`;
            
            cardBlock.innerHTML = `
                <style>
                    .print-compact-table table { width: 100% !important; font-size: 11px !important; }
                    .print-compact-table th, .print-compact-table td { padding: 5px 4px !important; font-size: 10px !important; }
                </style>
                <h3 style="margin-top:0; color:#2b6cb0; border-bottom:1px solid #edf2f7; padding-bottom:8px; font-size: 14px;">Gearing Setup</h3>
                <div style="margin-bottom: 12px; font-size: 11px; color: #2d3748;">
                    <p><strong>Wheel:</strong> ${wheel}</p>
                    <p><strong>Crankset:</strong> ${rings} | <strong>Cassette:</strong> ${cogs}</p>
                    <p><strong>Capacity:</strong> ${capacity} | <strong>Range:</strong> ${range}</p>
                </div>
                <div class="print-compact-table">${tableHtml}</div>
            `;
            
            gridContainer.appendChild(cardBlock);

            const legendClone = document.querySelector('.bcalc-legend').cloneNode(true);
            legendClone.style.display = 'block'; 
            legendClone.style.marginTop = '20px';
            legendClone.style.maxWidth = '360px'; 
            legendClone.style.lineHeight = '2.0em';
            
            gridContainer.appendChild(legendClone);

            const footer = document.createElement('div');
            footer.style.cssText = "text-align:center; margin-top:20px; font-size:11px; color:#777;";
            footer.innerText = "© Copyright 2012 - 2026 Muse Kidd & Bike Wales. All Rights Reserved.";
            printWrap.appendChild(footer);

            document.body.appendChild(printWrap);
            
            const img = document.getElementById('print-logo');
            const finalPrint = () => { 
                window.print(); 
                document.body.removeChild(printWrap); 
                allChildren.forEach(child => child.style.display = child.getAttribute('data-old-display') || ''); 
                document.title = oldTitle; 
                
                const snapshotEl = document.querySelector('.bcalc-snapshot');
                if (snapshotEl) {
                    snapshotEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };
            
            if(img.complete) finalPrint(); else img.onload = finalPrint;
        };
    }

    const resetAllBtn = document.getElementById('bcalc-reset-all');
    if(resetAllBtn) resetAllBtn.onclick = () => window.location.reload();
    
    const resetTableBtn = document.getElementById('bcalc-reset-table');
    if(resetTableBtn) resetTableBtn.onclick = () => window.location.reload();
})();

/*============================================================== */
/* --- 6. BULLETPROOF GHOST TIP ENGINE --- */
/*============================================================== */

(function() {
    const ghost = document.createElement('div'); 
    ghost.className = 'bcalc-ghost-tip'; 
    if (document.body) { document.body.appendChild(ghost); } 
    else { window.addEventListener('DOMContentLoaded', () => document.body.appendChild(ghost)); }

    document.addEventListener('mousemove', (e) => {
        const t = e.target.closest('.help-term');
        if (t) {
            ghost.innerHTML = t.getAttribute('data-ghost-tip'); 
            ghost.style.display = 'block';
            let x = e.clientX + 20; let y = e.clientY + 20;
            if (x + ghost.offsetWidth > window.innerWidth) x = e.clientX - ghost.offsetWidth - 20;
            if (y + ghost.offsetHeight > window.innerHeight) y = e.clientY - ghost.offsetHeight - 20;
            ghost.style.left = x + 'px'; ghost.style.top = y + 'px';
        } else { ghost.style.display = 'none'; }
    });
})();

/*============================================================== */
/* --- 7. COMPARISON BAY ENGINE --- */
/*============================================================== */

(function() {
    let compareGarage = [];
    const MAX_GARAGE_SIZE = 4;
    
    const addCompareBtn = document.getElementById('bcalc-add-compare');
    const comparePanel = document.getElementById('bcalc-compare-panel');
    
    if (addCompareBtn) {
        addCompareBtn.onclick = function() {
            const resultArea = document.getElementById('bcalc-result-area');
            
            if (!resultArea.innerHTML || resultArea.innerHTML.trim() === '') {
                alert("Please calculate a gear chart first before comparing.");
                return;
            }
            
            if (compareGarage.length >= MAX_GARAGE_SIZE) {
                alert("The Comparison Bay is full! You can hold a maximum of 4 setups. Please remove one to add a new comparison.");
                return;
            }

            const currentWheel = document.getElementById('snap-wheel').innerText;
            const currentRings = document.getElementById('snap-rings').innerText;
            const currentCogs = document.getElementById('snap-cogs').innerText;

            const isDuplicate = compareGarage.some(setup => 
                setup.wheel === currentWheel && 
                setup.rings === currentRings && 
                setup.cogs === currentCogs
            );

            if (isDuplicate) {
                alert("This exact gearing setup is already in your Comparison Bay!");
                return;
            }
            
            const snapshot = {
                id: Date.now(),
                wheel: currentWheel,
                rings: currentRings,
                cogs: currentCogs,
                capacity: document.getElementById('res-cap').innerText,
                range: document.getElementById('res-range').innerText,
                tableHtml: resultArea.innerHTML,
                printSelected: true
            };
            
            compareGarage.push(snapshot);
            renderCompareGarage();
        };
    }
    
    if (comparePanel) {
        comparePanel.addEventListener('click', function(e) {
            
            if (e.target.classList.contains('bcalc-remove-compare')) {
                const idToRemove = parseInt(e.target.getAttribute('data-id'));
                compareGarage = compareGarage.filter(item => item.id !== idToRemove);
                renderCompareGarage();
            }
            
            if (e.target.id === 'bcalc-garage-add-another') {
                document.querySelectorAll('.bcalc-snapshot, .bcalc-table-wrap, .bcalc-legend, #bcalc-actions, #bcalc-lab-launcher').forEach(el => el.style.display = 'none');
                document.getElementById('bcalc-result-area').innerHTML = '';
                
                const runBtn = document.getElementById('bcalc-run');
                if (runBtn) {
                    runBtn.innerText = "Recalculate Gear Chart";
                    runBtn.classList.add('bcalc-btn-stale');
                }
                
                const mainContainer = document.getElementById('bcalc-main-container');
                if (mainContainer) {
                    mainContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }

            if (e.target.id === 'bcalc-bay-remove-all') {
                window.location.reload();
            }
            
            if (e.target.id === 'bcalc-garage-print-btn') {
                const selectedItems = compareGarage.filter(item => item.printSelected);
                
                if (selectedItems.length === 0) {
                    alert("Please select at least one setup to print using the checkboxes.");
                    return;
                }
                
                executeGaragePrint(selectedItems);
            }
        });

        comparePanel.addEventListener('change', function(e) {
            if (e.target.classList.contains('bcalc-print-cb')) {
                const idToUpdate = parseInt(e.target.getAttribute('data-id'));
                const configIndex = compareGarage.findIndex(item => item.id === idToUpdate);
                if (configIndex > -1) {
                    compareGarage[configIndex].printSelected = e.target.checked;
                }
            }
        });
    }
    
    function executeGaragePrint(itemsToPrint) {
        const oldTitle = document.title;
        document.title = "Bike-Wales-Comparison-Report";
        
        const allChildren = Array.from(document.body.children);
        allChildren.forEach(child => { 
            child.setAttribute('data-old-display', child.style.display); 
            child.style.display = 'none'; 
        });

        const printWrap = document.createElement('div');
        printWrap.id = 'temp-print-wrap';
        printWrap.style.cssText = "max-width:800px; margin:0 auto; padding:30px; background:white; font-family:sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact;";

        const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

        const containerLayout = itemsToPrint.length === 1 
            ? "display: flex; justify-content: center;" 
            : "display: grid; grid-template-columns: 1fr 1fr; gap: 20px;";

        printWrap.innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <img id="print-garage-logo" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCu6zOjq3G4wcuX8aomv7gPZIOKafIPj3OqQQE5MnIeCOx7O-rXc87qLL5SWxfWycB67twJgnFjDdHbGIHhUcpsDNHXbrp3IU5SWWoxZb-6DeQMFbhm8o0YsR2HGZgcP_2GJV5qklYMcH-pwsEz2HWQjMZur2TL5VRcxrobCRq2xO84FKhwQl6baFY8lc/s1600/bikewales_NEW-master-logo_02%28text-only%29.png" style="width:340px;">
                <div style="font-size:14px; color:#485175; margin-top:10px; font-weight:bold;">Comparison Report — ${today}</div>
                <div style="margin-top:15px; font-size:15px; font-weight:bold; color:#4a5568;">
                    Project / Bike: _____________________________________
                </div>
            </div>
            <div style="border-top: 2px solid #edf2f7; margin-top:20px; padding-bottom:20px;"></div>
            
            <div id="print-grid-container" style="${containerLayout}"></div>
        `;

        const gridContainer = printWrap.querySelector('#print-grid-container');

        itemsToPrint.forEach((item, idx) => {
            const cardBlock = document.createElement('div');
            
            const widthLimit = itemsToPrint.length === 1 ? "width: 100%; max-width: 380px;" : "width: 100%;";
            
            cardBlock.style.cssText = `page-break-inside: avoid; border: 1px solid #cbd5e0; border-radius: 8px; padding: 15px; box-sizing: border-box; ${widthLimit}`;
            
            cardBlock.innerHTML = `
                <style>
                    .print-compact-table table { width: 100% !important; font-size: 11px !important; }
                    .print-compact-table th, .print-compact-table td { padding: 5px 4px !important; font-size: 10px !important; }
                </style>
                <h3 style="margin-top:0; color:#2b6cb0; border-bottom:1px solid #edf2f7; padding-bottom:8px; font-size: 14px;">Gearing Setup #${idx + 1}</h3>
                <div style="margin-bottom: 12px; font-size: 11px; color: #2d3748;">
                    <div><strong>Wheel:</strong> ${item.wheel}</div>
                    <div><strong>Crankset:</strong> ${item.rings} | <strong>Cassette:</strong> ${item.cogs}</div>
                    <div style="margin-top:4px;"><strong>Capacity:</strong> ${item.capacity} | <strong>Range:</strong> ${item.range}</div>
                </div>
                <div class="print-compact-table">${item.tableHtml}</div>
            `;
            gridContainer.appendChild(cardBlock); 
        });

        const footer = document.createElement('div');
        footer.style.cssText = "text-align:center; margin-top:40px; font-size:11px; color:#718096; border-top:1px solid #edf2f7; padding-top:20px;";
        footer.innerText = "© Copyright 2012 - 2026 Muse Kidd & Bike Wales. All Rights Reserved.";
        printWrap.appendChild(footer);

        document.body.appendChild(printWrap);
        
        const img = document.getElementById('print-garage-logo');
        const finalPrint = () => { 
            window.print(); 
            document.body.removeChild(printWrap); 
            allChildren.forEach(child => child.style.display = child.getAttribute('data-old-display') || ''); 
            document.title = oldTitle; 
            
            const comparePanel = document.getElementById('bcalc-compare-panel');
            if (comparePanel) {
                comparePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        
        if(img.complete) finalPrint(); else img.onload = finalPrint;
    }

    function renderCompareGarage() {
        if (!comparePanel) return;
        
        if (compareGarage.length === 0) {
            comparePanel.style.display = 'none';
            return;
        }
        
        comparePanel.style.display = 'grid';
        comparePanel.innerHTML = '';
        
        const instructions = document.createElement('div');
        instructions.className = 'bcalc-garage-span bcalc-garage-instructions';
        instructions.innerHTML = `<strong>Comparison Bay:</strong> You can hold up to ${MAX_GARAGE_SIZE} drivetrains here side-by-side. Use the checkboxes to select specific charts, then use the master action bar at the bottom to add another setup or print your selection.`;
        comparePanel.appendChild(instructions);
        
        compareGarage.forEach((config, index) => {
            const card = document.createElement('div');
            card.className = 'bcalc-compare-card'; 
            
            const isChecked = config.printSelected ? 'checked' : '';
            
            card.innerHTML = `
                <div class="bcalc-compare-card-header">
                    <h4 class="bcalc-compare-card-title">Gearing Setup #${index + 1}</h4>
                    <button class="bcalc-remove-compare" data-id="${config.id}">&times; Remove</button>
                </div>
                <div class="bcalc-compare-stats">
                    <div><strong>Wheel:</strong> ${config.wheel}</div>
                    <div><strong>Crankset:</strong> ${config.rings}</div>
                    <div><strong>Cassette:</strong> ${config.cogs}</div>
                    <div><strong>Capacity:</strong> ${config.capacity} | <strong>Range:</strong> ${config.range}</div>
                </div>
                <div class="bcalc-compare-table-wrap">
                    ${config.tableHtml}
                </div>
                <div class="bcalc-compare-card-footer">
                    <label class="bcalc-print-label">
                        <input type="checkbox" class="bcalc-print-cb" data-id="${config.id}" ${isChecked}>
                        Include in Print
                    </label>
                </div>
            `;
            
            comparePanel.appendChild(card);
        });
        
        const actionRow = document.createElement('div');
        actionRow.className = 'bcalc-garage-span';
        actionRow.style.cssText = "display: flex; justify-content: center; gap: 12px; margin-top: 15px; flex-wrap: wrap;";
        
        actionRow.innerHTML = `
            <button id="bcalc-bay-remove-all" class="bcalc-btn-sec" style="flex: 1; max-width: 270px;">Remove All</button>
            <button id="bcalc-garage-add-another" class="bcalc-btn-sec" style="flex: 1; max-width: 270px;">+ Add Another Setup</button>
            <button id="bcalc-garage-print-btn" class="bcalc-btn-pri" style="flex: 1; max-width: 270px;">Print Selected Comparisons</button>
        `;
        comparePanel.appendChild(actionRow);
        
        if (compareGarage.length > 0) {
            comparePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }
})();
