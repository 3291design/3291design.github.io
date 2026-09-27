/* =========================================================
   Gear Calculator v.19.8.3 - "2026 Factory Restoration"
   Host: 3291design / Bike Wales Repository Engine
   ========================================================= */

/* --- 1. GLOBAL MODAL CONTROLS --- 
   Attached to 'window' so HTML buttons can find them immediately. */
window.openModal = function() { 
    const modal = document.getElementById("infoLabModal");
    if (modal) modal.style.display = "block"; 
};

window.closeModal = function() { 
    const modal = document.getElementById("infoLabModal");
    if (modal) modal.style.display = "none"; 
};

/* --- 2. MAIN CALCULATOR ENGINE --- */
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

    Array.from(radioModes).forEach(r => {
        r.onchange = function() {
            cadWrap.style.display = (this.value === 'speed') ? 'flex' : 'none';
            if(hasCalculated) runBtn.click();
        };
    });

    speedSel.onchange = function() {
        const s = parseInt(this.value); cogCont.innerHTML = '';
        if(!isNaN(s)) {
            for(let i=0; i<s; i++) {
                const wrapper = document.createElement('div'); wrapper.style.position = 'relative';
                if(i === 0) wrapper.innerHTML = '<div class="bcalc-mini-label">Smallest</div>';
                if(i === s-1) wrapper.innerHTML = '<div class="bcalc-mini-label">Largest</div>';
                const input = document.createElement('input'); input.type='number'; input.className='bcalc-val-input bcalc-cog-item';
                input.value = (i===0)?11:(i===s-1)?32:Math.round(11 + (i * 2)); 
                input.oninput = liveUpdate; wrapper.appendChild(input); cogCont.appendChild(wrapper);
            }
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
        const cogs = Array.from(document.querySelectorAll('.bcalc-cog-item')).map(n => parseFloat(n.value)).sort((a,b)=>b-a);
        const rings = Array.from(document.querySelectorAll('.bcalc-ring-item')).map(n => parseFloat(n.value)).sort((a,b)=>a-b);
        const wheel = parseFloat(wheelSel.value);

        document.getElementById('snap-wheel').innerText = wheelSel.options[wheelSel.selectedIndex].text;
        document.getElementById('snap-rings').innerText = rings.join('/') + 'T';
        document.getElementById('snap-cogs').innerText = speedSel.options[speedSel.selectedIndex].text + ' ' + cogs[cogs.length-1] + '-' + cogs[0] + 'T';
        
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

/* --- 3. BULLETPROOF GHOST TIP ENGINE --- */
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
