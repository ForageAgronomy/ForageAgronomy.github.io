/* =====================================================
   FORAGE AGRONOMY LAB
   Main Site JavaScript
   js/script.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU TOGGLE
       (fallback — primary logic is in components.js
        after the header loads; this covers pages that
        inline the header directly)
    ===================================================== */

    var menuToggle = document.getElementById("menuToggle");
    var mainNav    = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            var isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

    }


    /* =====================================================
       EXTENSION DROPDOWN  (mobile)
    ===================================================== */

    var extensionButton   = document.getElementById("extensionButton");
    var extensionDropdown = document.querySelector(".nav-dropdown");

    if (extensionButton && extensionDropdown) {

        extensionButton.addEventListener("click", function () {

            if (window.innerWidth <= 700) {
                extensionDropdown.classList.toggle("open");
            }

        });

    }


    /* =====================================================
       ACTIVE PAGE HIGHLIGHT
    ===================================================== */

    var currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    var navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(function (link) {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       CURRENT YEAR IN FOOTER
    ===================================================== */

    var year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
