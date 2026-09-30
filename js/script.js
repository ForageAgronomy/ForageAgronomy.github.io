/* =====================================================
   FORAGE AGRONOMY LAB
   Main Site JavaScript
   js/script.js

   NOTE: Header/footer loading and all navigation
   logic is handled entirely by components.js.
   This file handles only page-level utilities.
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CURRENT YEAR IN FOOTER
       Fallback in case footer loads before components.js
       sets it.
    ===================================================== */

    var year = document.getElementById("year");
    if (year && !year.textContent) {
        year.textContent = new Date().getFullYear();
    }

});
