(function () {
        "use strict";
    // ----------   L O W   C O D E   ----------
    // 1) grab exactly 2 elements
    const btn = document.getElementById('actionButton');
    const display = document.getElementById('counterValue');

    // 2) single source of truth — the counter state
    let clicks = 0;

    // 3) update function — 1 line of logic, 1 line of DOM update
    function updateDisplay() {
        display.textContent = clicks;
            }

    // 4) primary behaviour: increment + soundless joy
    function handleClick() {
        clicks += 1;
    updateDisplay();

    // tiny easter egg — when count hits 10, playful text glow (still low code)
    if (clicks === 10) {
        display.style.textShadow = "0 0 14px #ffb86b";
    display.style.transition = "0.1s";
                } else if (clicks > 10) {
        // keep the glow — it's cute
    }
            }

    // 5) secondary behaviour: double-click resets
    function handleReset(e) {
        e.stopPropagation();   // avoid any weirdness, but clean
    clicks = 0;
    updateDisplay();
    display.style.textShadow = "none"; // remove glow
    // micro feedback — button flash (CSS class not needed)
    btn.style.background = "#ffdb7c";
    btn.style.transition = "0.07s";
                setTimeout(() => {
        btn.style.background = "#f5c542"; // back to original
                }, 120);
            }

    // 6) attach listeners — clean, readable, no inline
    btn.addEventListener('click', handleClick);
    btn.addEventListener('dblclick', handleReset);

})();