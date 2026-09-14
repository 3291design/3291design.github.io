    /* =======================================================
   THE UNIVERSAL MAP ZOOM & PAN ENGINE (v7.1 - Clean Engine)
   =======================================================
   We wrap it in a window object so odw-common.js can trigger it later
   ======================================================= */
window.initMapZoomEngine = function() {
    document.querySelectorAll('.map-interactive-wrapper').forEach(wrapper => {
        if (wrapper.dataset.engineActive === 'true') return;
        wrapper.dataset.engineActive = 'true';
        
        const mapTarget = wrapper.querySelector('.map-target');
        const panContainer = wrapper.querySelector('.pan-container');
        const btnIn = wrapper.querySelector('.zoom-in-btn');
        const btnOut = wrapper.querySelector('.zoom-out-btn');
        
        if (!mapTarget || !panContainer) return;

        const initialZoom = parseInt(wrapper.getAttribute('data-start-zoom'), 10) || 100;
        let currentZoom = initialZoom;
        const minZoom = 100;
        const maxZoom = 400; 
        const zoomStep = 50;

        mapTarget.style.width = currentZoom + '%';

        function updateButtonStates() {
            if (btnOut) btnOut.disabled = (currentZoom <= minZoom);
            if (btnIn) btnIn.disabled = (currentZoom >= maxZoom);
        }
        updateButtonStates();

        // --- ROBUST STARTING POSITION LOGIC ---
        const startX = wrapper.getAttribute('data-start-x');
        const startY = wrapper.getAttribute('data-start-y');

        const applyInitialPosition = () => {
            if (startX !== null && startY !== null) {
                const targetScrollX = (mapTarget.scrollWidth * (parseFloat(startX) / 100)) - (panContainer.clientWidth / 2);
                const targetScrollY = (mapTarget.scrollHeight * (parseFloat(startY) / 100)) - (panContainer.clientHeight / 2);
                
                panContainer.scrollLeft = targetScrollX;
                panContainer.scrollTop = targetScrollY;
            } else {
                panContainer.scrollLeft = (mapTarget.scrollWidth - panContainer.clientWidth) / 2;
                panContainer.scrollTop = (mapTarget.scrollHeight - panContainer.clientHeight) / 2;
            }
        };

        const mapImg = mapTarget.querySelector('img');
        if (mapImg && !mapImg.complete) {
            mapImg.addEventListener('load', applyInitialPosition);
        } else {
            setTimeout(applyInitialPosition, 50);
        }

        // --- PURE V3 MATH + V6 HARD LIMITS ---
        function applyZoom(newZoom, mouseEvent = null) {
            if (newZoom < minZoom) newZoom = minZoom;
            if (newZoom > maxZoom) newZoom = maxZoom;
            if (newZoom === currentZoom) return;

            const rect = panContainer.getBoundingClientRect();
            let pointerX, pointerY;

            if (mouseEvent) {
                pointerX = mouseEvent.clientX - rect.left;
                pointerY = mouseEvent.clientY - rect.top;
            } else {
                pointerX = rect.width / 2;
                pointerY = rect.height / 2;
            }

            const targetPixelX = panContainer.scrollLeft + pointerX;
            const targetPixelY = panContainer.scrollTop + pointerY;

            const oldZoom = currentZoom;
            currentZoom = newZoom;
            const ratio = currentZoom / oldZoom;

            mapTarget.style.width = currentZoom + '%';
            updateButtonStates();

            panContainer.scrollLeft = (targetPixelX * ratio) - pointerX;
            panContainer.scrollTop = (targetPixelY * ratio) - pointerY;
        }

        if (btnIn) btnIn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            applyZoom(currentZoom + zoomStep);
        });
        
        if (btnOut) btnOut.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            applyZoom(currentZoom - zoomStep);
        });

        let isDown = false;
        let hasDragged = false;
        let startXCoord, startYCoord, scrollLeft, scrollTop;

        panContainer.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; 
            isDown = true;
            hasDragged = false;
            startXCoord = e.pageX - panContainer.offsetLeft;
            startYCoord = e.pageY - panContainer.offsetTop;
            scrollLeft = panContainer.scrollLeft;
            scrollTop = panContainer.scrollTop;
        });

        panContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const x = e.pageX - panContainer.offsetLeft;
            const y = e.pageY - panContainer.offsetTop;
            const walkX = (x - startXCoord);
            const walkY = (y - startYCoord);

            if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
                hasDragged = true;
                panContainer.classList.add('is-dragging');
            }

            if (hasDragged) {
                e.preventDefault();
                panContainer.scrollLeft = scrollLeft - (walkX * 1.5);
                panContainer.scrollTop = scrollTop - (walkY * 1.5);
            }
        });

        panContainer.addEventListener('mouseup', (e) => {
            if (!isDown) return;
            isDown = false;
            panContainer.classList.remove('is-dragging');
            
            if (!hasDragged && e.button === 0) {
                applyZoom(currentZoom + zoomStep, e);
            }
        });

        panContainer.addEventListener('mouseleave', () => {
            isDown = false;
            panContainer.classList.remove('is-dragging');
        });

        panContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault(); 
            applyZoom(currentZoom - zoomStep, e);          
        });
    });
};