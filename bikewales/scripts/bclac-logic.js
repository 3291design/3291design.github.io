/* =========================================================
   Gear Calculator v.19.9.2 - "2026 Factory Restoration"
   Preset Library + Dynamic Preset/Custom Toggle Engine
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
const CASSETTE_PRESETS = {
    "5": [
        { label: "14-28T Standard Tour", cogs: [14, 16, 18, 21, 28] },
        { label: "14-32T Wide Range", cogs: [14, 17, 20, 24, 32] },
        { label: "13-24T Close Ratio", cogs: [13, 15, 17, 20, 24] }
    ],
    "6": [
        { label: "14-28T Standard 6-Speed", cogs: [14, 16, 18, 21, 24, 28] },
        { label: "13-26T Sport", cogs: [13, 15, 17, 20, 23, 26] },
        { label: "14-34T MegaRange", cogs: [14, 17, 20, 24, 28, 34] }
    ],
    "7": [
        { label: "12-28T Road/Tour", cogs: [12, 14, 16, 18, 21, 24, 28] },
        { label: "13-32T Wide Range", cogs: [13, 15, 18, 21, 24, 28, 32] },
        { label: "11-28T Sport", cogs: [11, 13, 15, 18, 21, 24, 28] }
    ],
    "8": [
        { label: "11-28T Standard 8-Speed", cogs: [11, 13, 15, 18, 21, 24, 28] },
        { label: "12-32T Touring", cogs: [12, 14, 16, 18, 21, 24, 28, 32] },
        { label: "11-34T MegaRange", cogs: [11, 13, 15, 18, 21, 24, 28, 34] }
    ],
    "9": [
        { label: "12-36T Touring / Trekking (Your Setup)", cogs: [12, 14, 16, 18, 21, 24, 28, 32, 36] },
        { label: "11-32T Shimano Deore", cogs: [11, 12, 14, 16, 18, 21, 24, 28, 32] },
        { label: "12-25T Road Standard", cogs: [12, 13, 14, 15, 17, 19, 21, 23, 25] },
        { label: "11-34T Wide Range", cogs: [11, 13, 15, 17, 20, 23, 26, 30, 34] }
    ],
    "10": [
        { label: "11-36T Classic MTB / Touring", cogs: [11, 13, 15, 17, 19, 21, 24, 28, 32, 36] },
        { label: "11-32T Road / Gravel", cogs: [11, 12, 14, 16, 18, 20, 22, 25, 28, 32] },
        { label: "11-42T Wide 1x Off-Road", cogs: [11, 13, 15, 18, 21, 24, 28, 32, 37, 42] },
        { label: "12-25T Tight Road", cogs: [12, 13, 14, 15, 16, 17, 19, 21, 23, 25] }
    ],
    "11": [
        { label: "11-34T Gravel / Touring", cogs: [11, 13, 15, 17, 19, 21, 24, 27, 30, 34] },
        { label: "11-32T Road Performance", cogs: [11, 12, 13, 14, 16, 18, 20, 22, 25, 28, 32] },
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
          cadWrap = document.getElementById('bcalc-cadence-wrap');
          
    // Create secondary Preset dropdown wrapper matching existing styling
    let presetWrap = document.createElement('div');
    presetWrap.id = 'bcalc-preset-wrap';
    presetWrap.style.cssText = "display: none; margin-top: 10px;";
    presetWrap.innerHTML = `
        <label class="bcalc-label" style="margin-top: 6px;">Preset Cassette</label>
        <select id="bcalc-preset-select" class="bcalc-select"></select>
    `;
    speedSel.parentNode.insertBefore(presetWrap, speedSel.nextSibling);
    const presetSel = document.getElementById('bcalc-preset-select');

    let hasCalculated = false;

    function triggerStale() { 
        if(hasCalculated) { 
            runBtn.innerText = "Recalculate Gear Chart"; 
            runBtn.classList.add('bcalc-btn-stale'); 
        } 
    }

    const liveUpdate = function() { triggerStale(); };
    if(wheelSel) wheelSel.onchange = liveUpdate;
    if(cadVal) cadVal.oninput = liveUpdate;
    if(presetSel) presetSel.onchange = liveUpdate;

    Array.from(radioModes).forEach(r => {
        r.onchange = function() {
            cadWrap.style.display = (this.value === 'speed') ? 'flex' : 'none';
            if(hasCalculated) runBtn.click();
        };
    });

    speedSel.onchange = function() {
        const val = this.value; 
        cogCont.innerHTML = '';
        presetWrap.style.display = 'none';

        if (!val) {
            liveUpdate();
            return;
        }

        if (val === 'custom') {
            let customCount = prompt("How many cogs/speeds on your custom cassette?", "9");
            customCount = parseInt(customCount) || 9;
            
            presetWrap.style.display = 'none';
            cogCont.style.display = 'grid'; // Uses your .bcalc-input-grid layout
            
            for(let i=0; i<customCount; i++) {
                const wrapper = document.createElement('div'); wrapper.style.position = 'relative';
                if(i === 0) wrapper.innerHTML = '<div class="bcalc-mini-label">Smallest</div>';
                if(i === customCount-1) wrapper.innerHTML = '<div class="bcalc-mini-label">Largest</div>';
                const input = document.createElement('input'); input.type='number'; input.className='bcalc-val-input bcalc-cog-item';
                input.value = (i===0)?11:(i===customCount-1)?32:Math.round(11 + (i * 2)); 
                input.oninput = liveUpdate; wrapper.appendChild(input); cogCont.appendChild(wrapper);
            }
        } else if (CASSETTE_PRESETS[val]) {
            presetSel.innerHTML = '';
            CASSETTE_PRESETS[val].forEach((p, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.text = p.label;
                presetSel.appendChild(opt);
            });
            presetWrap.style.display = 'block';
            cogCont.style.display = 'none';
        }
        liveUpdate();
    };

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
        
        const mode = Array.from(radioModes).find(r => r.checked).value;
        const rings = Array.from(document.querySelectorAll('.bcalc-ring-item')).map(n => parseFloat(n.value)).sort((a,b)=>a-b);
        const wheel = parseFloat(wheelSel.value);

        let cogs = [];
        if (speedSel.value === 'custom') {
            cogs = Array.from(document.querySelectorAll('.bcalc-cog-item')).map(n => parseFloat(n.value)).sort((a,b)=>b-a);
        } else {
            const presetIndex = parseInt(presetSel.value);
            const selectedPreset = CASSETTE_PRESETS[speedSel.value][presetIndex];
            cogs = [...selectedPreset.cogs].sort((a,b)=>b-a);
        }

        document.getElementById('snap-wheel').innerText = wheelSel.options[wheelSel.selectedIndex].text;
        document.getElementById('snap-rings').innerText = rings.join('/') + 'T';
        
        let cassetteDescription = speedSel.options[speedSel.selectedIndex].text;
        if (speedSel.value !== 'custom') {
            const presetIndex = parseInt(presetSel.value);
            cassetteDescription = CASSETTE_PRESETS[speedSel.value][presetIndex].label;
        }
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
    };

    /* --- PRINT ENGINE --- */
    document.getElementById('bcalc-print').onclick = function() {
        const oldTitle = document.title;
        document.title = "Bike-Wales-Gear-Chart";
        const allChildren = Array.from(document.body.children);
        allChildren.forEach(child => { 
            child.setAttribute('data-old-display', child.style.display); 
            child.style.display = 'none'; 
        });

        const printWrap = document.createElement('div');
        printWrap.id = 'temp-print-wrap';
        printWrap.style.cssText = "max-width:700px; margin:0 auto; padding:30px; background:white; font-family:sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact;";

        const today = new Date().toLocaleDateString('en-GB', { 
            day: 'numeric', month: 'long', year: 'numeric' 
        });

        printWrap.innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <img id="print-logo" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCu6zOjq3G4wcuX8aomv7gPZIOKafIPj3OqQQE5MnIeCOx7O-rXc87qLL5SWxfWycB67twJgnFjDdHbGIHhUcpsDNHXbrp3IU5SWWoxZb-6DeQMFbhm8o0YsR2HGZgcP_2GJV5qklYMcH-pwsEz2HWQjMZur2TL5VRcxrobCRq2xO84FKhwQl6baFY8lc/s1600/bikewales_NEW-master-logo_02%28text-only%29.png" style="width:340px;">
                <div style="font-size:14px; color:#485175; margin-top:10px; font-weight:bold;">${today}</div>
                <div style="margin-top:20px; font-size:16px; font-weight:bold; color:#4a5568;">
                    Bike: _____________________________________
                </div>
            </div>
            <div style="border-top: 2px solid #edf2f7; margin-top:20px; padding-top:20px;"></div>
        `;

        printWrap.appendChild(document.querySelector('.bcalc-snapshot').cloneNode(true));
        printWrap.appendChild(document.getElementById('bcalc-result-area').cloneNode(true));
        printWrap.appendChild(document.querySelector('.bcalc-legend').cloneNode(true));

        const footer = document.createElement('div');
        footer.style.cssText = "text-align:center; margin-top:40px; font-size:11px; color:#718096; border-top:1px solid #edf2f7; padding-top:20px;";
        footer.innerText = "© Copyright 2012 - 2026 Muse Kidd & Bike Wales. All Rights Reserved.";
        printWrap.appendChild(footer);

        document.body.appendChild(printWrap);
        const img = document.getElementById('print-logo');
        const finalPrint = () => { 
            window.print(); 
            document.body.removeChild(printWrap); 
            allChildren.forEach(child => child.style.display = child.getAttribute('data-old-display') || ''); 
            document.title = oldTitle; 
        };
        if(img.complete) finalPrint(); else img.onload = finalPrint;
    };

    document.getElementById('bcalc-reset-all').onclick = () => window.location.reload();
    document.getElementById('bcalc-reset-table').onclick = () => window.location.reload();
})();

/* --- 4. BULLETPROOF GHOST TIP ENGINE --- */
(function() {
    const ghost = document.createElement('div'); 
    ghost.className = 'bcalc-ghost-tip'; 
    
    if (document.body) {
        document.body.appendChild(ghost);
    } else {
        window.addEventListener('DOMContentLoaded', () => document.body.appendChild(ghost));
    }

    document.addEventListener('mousemove', (e) => {
        const t = e.target.closest('.help-term');
        if (t) {
            ghost.innerHTML = t.getAttribute('data-ghost-tip'); 
            ghost.style.display = 'block';
            let x = e.clientX + 20;
            let y = e.clientY + 20;
            if (x + ghost.offsetWidth > window.innerWidth) x = e.clientX - ghost.offsetWidth - 20;
            if (y + ghost.offsetHeight > window.innerHeight) y = e.clientY - ghost.offsetHeight - 20;
            ghost.style.left = x + 'px'; 
            ghost.style.top = y + 'px';
        } else {
            ghost.style.display = 'none';
        }
    });
})();
