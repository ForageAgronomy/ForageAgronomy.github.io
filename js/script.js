/* =====================================================
   FORAGE AGRONOMY LAB
   js/script.js
   Navigation is handled by components.js.
   This file handles page-level utilities only.
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* Footer year fallback */
    var yr = document.getElementById("year");
    if (yr && !yr.textContent.trim()) {
        yr.textContent = new Date().getFullYear();
    }

});
