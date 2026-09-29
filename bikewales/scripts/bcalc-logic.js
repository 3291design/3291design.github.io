/* =========================================================
   Gear Calculator v.3.0 - "2026 Factory Restoration"
   Cascading Dropdowns & Compare Garage Engine
   ========================================================= */

/* --- 1. GLOBAL MODAL CONTROLS --- */
window.openModal = function() { 
    const modal = document.getElementById("infoLabModal");
    if (modal) modal.style.display = "block"; 
};

window.closeModal = function() { 
    const modal = document.getElementById("infoLabModal");
    if (modal) modal.style.display = "none"; 
};

/* --- 2. COMPREHENSIVE CASSETTE PRESET LIBRARY --- */
const GEARING_PRESETS = {
    "5": [
        { label: "13-24T Close Ratio", cogs: [13, 15, 17, 20, 24] },
        { label: "14-28T Standard Tour", cogs: [14, 16, 18, 21, 28] },
        { label: "14-32T Wide Range", cogs: [14, 17, 20, 24, 32] }
    ],
    "6": [
        { label: "13-26T Sport", cogs: [13, 15, 17, 20, 23, 26] },
        { label: "14-28T Standard 6-Speed", cogs: [14, 16, 18, 21, 24, 28] },
        { label: "14-34T MegaRange", cogs: [14, 17, 20, 24, 28, 34] }
    ],
    "7": [
        { label: "11-28T Sport", cogs: [11, 13, 15, 18, 21, 24, 28] },
        { label: "12-28T Road/Tour", cogs: [12, 14, 16, 18, 21, 24, 28] },
        { label: "13-32T Wide Range", cogs: [13, 15, 18, 21, 24, 28, 32] }
    ],
    "8": [
        { label: "11-28T Standard 8-Speed", cogs: [11, 13, 15, 18, 21, 24, 28] },
        { label: "12-32T Touring", cogs: [12, 14, 16, 18, 21, 24, 28, 32] },
        { label: "11-34T MegaRange", cogs: [11, 13, 15, 18, 21, 24, 28, 34] }
    ],
    "9": [
        { label: "12-25T Road Standard", cogs: [12, 13, 14, 15, 17, 19, 21, 23, 25] },
        { label: "11-32T Shimano Deore", cogs: [11, 12, 14, 16, 18, 21, 24, 28, 32] },
        { label: "11-34T Wide Range", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 34] },
        { label: "12-36T Touring / Trekking", cogs: [12, 14, 16, 18, 21, 24, 28, 32, 36] }
    ],
    "10": [
        { label: "12-25T Tight Road", cogs: [12, 13, 14, 15, 16, 17, 19, 21, 23, 25] },
        { label: "11-32T Road / Gravel", cogs: [11, 12, 14, 16, 18, 20, 22, 25, 28, 32] },
        { label: "11-36T Classic MTB / Touring", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 36] },
        { label: "11-42T Wide 1x Off-Road", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 37, 42] }
    ],
    "11": [
        { label: "11-32T Road Performance", cogs: [11, 12, 13, 14, 16, 18, 20, 22, 25, 28, 32] },
        { label: "11-34T Gravel / Touring", cogs: [11, 13, 15, 17, 19, 21, 24, 27, 30, 34] },
        { label: "11-42T Wide Adventure", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 37, 42] },
        { label: "11-46T Extreme Climbing", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 37, 42, 46] }
    ],
    "12": [
        { label: "11-34T Road / Gravel 12-Speed", cogs: [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34] },
        { label: "10-36T SRAM Force / Rival XPLR", cogs: [10, 11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 36] },
        { label: "10-50T MTB Wide Range", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 50] },
        { label: "10-52T SRAM Eagle", cogs: [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 52] }
    ]
};

/* --- 3. MAIN CALCULATOR ENGINE --- */
(function() {
    const wheelSel = document.getElementById('bcalc-wheel-size'), 
          speedSel = document.getElementById('bcalc-speed-select'), 
          ringSel = document.getElementById('bcalc-ring-count'), 
          cogCont = document.getElementById('bcalc-cog-container'), 
          ringCont = document.getElementById('bcalc-ring-container'), 
          runBtn = document.getElementById('bcalc-run'), 
          radioModes = document.getElementsByName('bcalc-mode'), 
          cadVal = document.getElementById('bcalc-cadence-val'),
          cadWrap = document.getElementById('bcalc-cadence-wrap'),
          presetWrap = document.getElementById('bcalc-preset-wrap'),
          presetSel = document.getElementById('bcalc-preset-select'),
          progressionText = document.getElementById('bcalc-progression-text');

    let hasCalculated = false;

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

    Array.from(radioModes).forEach(r => {
        r.onchange = function() {
            cadWrap.style.display = (this.value === 'speed') ? 'flex' : 'none';
            if(hasCalculated) runBtn.click();
        };
    });

    if(speedSel) {
        speedSel.onchange = function() {
            const val = this.value; 
            cogCont.innerHTML = '';
            progressionText.style.display = 'none';
            cogCont.style.display = 'none';

            if (!val) { 
                presetSel.innerHTML = '<option value="" selected>Select speeds first...</option>';
                presetSel.disabled = true;
                liveUpdate(); 
                return; 
            }

            presetSel.disabled = false;
            presetSel.innerHTML = '';
            
            GEARING_PRESETS[val].forEach((p, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.text = p.label;
                presetSel.appendChild(opt);
            });
            
            const customOpt = document.createElement('option');
            customOpt.value = 'custom';
            customOpt.text = 'Custom Setup...';
            presetSel.appendChild(customOpt);

            presetSel.onchange(); 
            liveUpdate();
        };
    }

    if(presetSel) {
        presetSel.onchange = function() {
            const val = this.value;
            const speedCount = parseInt(speedSel.value);

            if (val === 'custom') {
                progressionText.style.display = 'none';
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
            } else {
                cogCont.style.display = 'none';
                const idx = parseInt(val);
                const preset = GEARING_PRESETS[speedSel.value][idx];
                if (preset) {
                    progressionText.innerText = "Cogs: [" + preset.cogs.join(', ') + "]T";
                    progressionText.style.display = 'block';
                }
            }
            liveUpdate();
        };
    }

    if(ringSel) {
        ringSel.onchange = function() {
            const r = parseInt(this.value); ringCont.innerHTML = '';
            if(!isNaN(r)) {
                let d = (r===1)?[40]:(r===2)?[34,50]:[26,36,48];
                let labels = (r===1)?['Ring']:(r===2)?['Inner','Outer']:['Inner','Middle','Outer'];
                for(let i=0; i<r; i++) {
                    const wrapper = document.createElement('div'); wrapper.style.position = 'relative';
                    wrapper.innerHTML = `<div class="bcalc-mini-label">${labels[i]}</div>`;
                    const input = document.createElement('input'); input.type='number'; input.className='bcalc-val-input bcalc-ring-item';
                    input.value = d[i]; input.oninput = liveUpdate; wrapper.appendChild(input); ringCont.appendChild(wrapper);
                }
            }
            liveUpdate();
        };
    }

    if(runBtn) {
        runBtn.onclick = function() {
            let missing = [];
            if (!wheelSel.value || wheelSel.value === "") missing.push("Wheel & Tyre Size");
            if (!ringSel.value) missing.push("Crankset Type");
            if (!speedSel.value) missing.push("Cassette Speeds");

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
            const rings = Array.from(document.querySelectorAll('.bcalc-ring-item')).map(n => parseFloat(n.value)).sort((a,b)=>a-b);
            const wheel = parseFloat(wheelSel.value);

            let cogs = [];
            let cassetteDescription = "";

            if (presetSel.value === 'custom') {
                cogs = Array.from(document.querySelectorAll('.bcalc-cog-item')).map(n => parseFloat(n.value)).sort((a,b)=>b-a);
                cassetteDescription = speedSel.options[speedSel.selectedIndex].text + " Custom";
            } else {
                const presetIndex = parseInt(presetSel.value);
                const selectedPreset = GEARING_PRESETS[speedSel.value][presetIndex];
                cogs = [...selectedPreset.cogs].sort((a,b)=>b-a);
                cassetteDescription = selectedPreset.label;
            }

            document.getElementById('snap-wheel').innerText = wheelSel.options[wheelSel.selectedIndex].text;
            document.getElementById('snap-rings').innerText = rings.join('/') + 'T';
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

            const snapshotEl = document.querySelector('.bcalc-snapshot');
            if (snapshotEl) {
                snapshotEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }

    /* --- 4. PRINT ENGINE --- */
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

            // Step 1. Build the Header 
            printWrap.innerHTML = `
                <div style="text-align:center; margin-bottom:20px;">
                    <img id="print-logo" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCu6zOjq3G4wcuX8aomv7gPZIOKafIPj3OqQQE5MnIeCOx7O-rXc87qLL5SWxfWycB67twJgnFjDdHbGIHhUcpsDNHXbrp3IU5SWWoxZb-6DeQMFbhm8o0YsR2HGZgcP_2GJV5qklYMcH-pwsEz2HWQjMZur2TL5VRcxrobCRq2xO84FKhwQl6baFY8lc/s1600/bikewales_NEW-master-logo_02%28text-only%29.png" style="width:340px;">
                    <div style="font-size:14px; color:#485175; margin-top:10px; font-weight:bold;">${today}</div>
                    <div style="margin: 15px auto 0; width: 340px; font-size:15px; font-weight:bold; color:#4a5568; text-align: center;">
                        Project / Bike: ___________________________
                    </div>
                </div>
                
                <!-- Flex container to center the single card -->
                <div id="print-grid-container" style="display: flex; justify-content: center; flex-direction: column; align-items: center;"></div>
            `;

            const gridContainer = printWrap.querySelector('#print-grid-container');

            // Step 2. Grab current live values from the DOM
            const wheel = document.getElementById('snap-wheel').innerText;
            const rings = document.getElementById('snap-rings').innerText;
            const cogs = document.getElementById('snap-cogs').innerText;
            const capacity = document.getElementById('res-cap').innerText;
            const range = document.getElementById('res-range').innerText;
            const tableHtml = document.getElementById('bcalc-result-area').innerHTML;

            // Step 3. Build the card matching the exact CSS from the Comparison Bay
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

            // Step 4. Clone and center the Legend directly beneath the card
            const legendClone = document.querySelector('.bcalc-legend').cloneNode(true);
            legendClone.style.display = 'block'; 
            legendClone.style.marginTop = '20px';
            legendClone.style.maxWidth = '360px'; 
            legendClone.style.lineHeight = '2.0em';
            
            gridContainer.appendChild(legendClone);

           // --- Step 5: Footer ---
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
                
                // --- NEW: Scroll back to Gearing Results ---
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

/* --- 5. BULLETPROOF GHOST TIP ENGINE --- */
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

/* --- 6. COMPARISON BAY ENGINE --- */
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

            // --- NEW: Grab current values for the duplicate check ---
            const currentWheel = document.getElementById('snap-wheel').innerText;
            const currentRings = document.getElementById('snap-rings').innerText;
            const currentCogs = document.getElementById('snap-cogs').innerText;

            // --- NEW: Check if this exact setup already exists in the array ---
            const isDuplicate = compareGarage.some(setup => 
                setup.wheel === currentWheel && 
                setup.rings === currentRings && 
                setup.cogs === currentCogs
            );

            if (isDuplicate) {
                alert("This exact gearing setup is already in your Comparison Bay!");
                return;
            }
            
            // Proceed with saving if it's not a duplicate
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
            
            // Action 1: Remove Individual Card
            if (e.target.classList.contains('bcalc-remove-compare')) {
                const idToRemove = parseInt(e.target.getAttribute('data-id'));
                compareGarage = compareGarage.filter(item => item.id !== idToRemove);
                renderCompareGarage();
            }
            
            // Action 2: Master "Add Another Setup"
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

            // Action 3: "Remove All" Wipe & Reset
            if (e.target.id === 'bcalc-bay-remove-all') {
                // A full page reload handles the array wipe, UI reset, and scroll to top all at once
                window.location.reload();
            }
            
            // Action 4: Print Selected
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

        // --- NEW: Dynamically choose layout based on number of selected items ---
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
            
            // --- NEW: Restrict width if it's the only item so it doesn't stretch ---
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
            
            // --- NEW: Scroll back to Comparison Bay ---
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
        
        // --- UPDATED: Removed inline pink styles so it inherits .bcalc-btn-sec purely ---
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
