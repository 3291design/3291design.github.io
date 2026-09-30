// zz-scripts/icons.js

export function loadSVGSprites() {
    // 1. Store the entire SVG block as a template string using backticks
    const svgString = `
    <svg style="display: none;">
        <!-- Bike Wales -->
        <symbol id="icon-bw" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M6.34 6.34l1.42 1.42M16.24 16.24l1.42 1.42M6.34 16.24l1.42-1.42M16.24 6.34l1.42-1.42" />
        </symbol>

        <!-- War Memorial -->
        <symbol id="icon-wm" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="12" y1="6" x2="12" y2="16" />
            <line x1="9" y1="9" x2="15" y2="9" />
        </symbol>

        <!-- Family Tree -->
        <symbol id="icon-ft" viewBox="0 0 24 24">
            <path d="M12 2v6M12 8H5v6M12 8h7v6M5 14v4M19 14v4" />
            <circle cx="12" cy="2" r="1" fill="currentColor"/>
            <circle cx="5" cy="16" r="2" />
            <circle cx="19" cy="16" r="2" />
        </symbol>

        <!-- The Studio -->
        <symbol id="icon-studio" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="1" />
            <line x1="3" y1="12" x2="21" y2="12" stroke-dasharray="2 2" />
            <line x1="12" y1="3" x2="12" y2="21" stroke-dasharray="2 2" />
            <circle cx="12" cy="12" r="3" />
        </symbol>

        <!-- Photo Lab -->
        <symbol id="icon-photo" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="3" x2="18" y2="12" />
            <line x1="18" y1="12" x2="9" y2="20" />
            <line x1="9" y1="20" x2="4" y2="10" />
            <line x1="4" y1="10" x2="15" y2="4" />
        </symbol>

        <!-- Tech Lab -->
        <symbol id="icon-tech" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 9l3 3-3 3M11 15h7" />
        </symbol>

        <!-- Meta: Timer -->
        <symbol id="icon-timer" viewBox="0 0 24 24">
            <circle cx="12" cy="13" r="8"></circle>
            <path d="M10 3h4"></path>
            <path d="M12 3v2"></path>
            <!-- The animated hand -->
            <line x1="12" y1="13" x2="12" y2="8" class="stopwatch-hand"></line>
        </symbol>

        <!-- Meta: Calendar -->
        <symbol id="icon-calendar" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M16 2v4M8 2v4M3 10h18"></path>
            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path>
        </symbol>
    </svg>
    `;

    // 2. Prevent injecting it twice if you accidentally call it multiple times
    if (document.getElementById('master-svg-sprites')) return;

    // 3. Create a div, dump the string into it, and shove it to the top of the body
    const div = document.createElement('div');
    div.id = 'master-svg-sprites';
    div.innerHTML = svgString;
    document.body.insertBefore(div, document.body.childNodes[0]);
}
