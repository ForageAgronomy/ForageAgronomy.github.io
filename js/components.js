/* =====================================================
   FORAGE AGRONOMY LAB
   Shared Header and Footer Loader
   js/components.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       LOAD HEADER
    ===================================================== */

    fetch("components/header.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Could not load header.html");
            }

            return response.text();

        })
        .then(function (data) {

            var header = document.getElementById("header-placeholder");

            if (header) {
                header.innerHTML = data;
            }

            initializeNavigation();

        })
        .catch(function (error) {
            console.error("Header loading error:", error);
        });


    /* =====================================================
       LOAD FOOTER
    ===================================================== */

    fetch("components/footer.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Could not load footer.html");
            }

            return response.text();

        })
        .then(function (data) {

            var footer = document.getElementById("footer-placeholder");

            if (footer) {
                footer.innerHTML = data;
            }

            var year = document.getElementById("year");

            if (year) {
                year.textContent = new Date().getFullYear();
            }

        })
        .catch(function (error) {
            console.error("Footer loading error:", error);
        });

});


/* =====================================================
   NAVIGATION
===================================================== */

function initializeNavigation() {


    /* =====================================================
       MOBILE MENU TOGGLE
       The hamburger lives in .header-brand-bar.
       On mobile, .header-nav-bar is hidden so we move
       the nav into a popup below the brand bar instead.
    ===================================================== */

    var menuToggle = document.getElementById("menuToggle");
    var mainNav    = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            var isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            /* Keep hamburger icon as X when open */
            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        /* Close menu when clicking outside */
        document.addEventListener("click", function (e) {

            if (
                mainNav.classList.contains("open") &&
                !mainNav.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }

        });

    }


    /* =====================================================
       EXTENSION DROPDOWN  (mobile tap)
    ===================================================== */

    var extensionButton   = document.getElementById("extensionButton");
    var extensionDropdown = document.querySelector(".nav-dropdown");

    if (extensionButton && extensionDropdown) {

        extensionButton.addEventListener("click", function (e) {

            /* On mobile, toggle; on desktop CSS hover handles it */
            if (window.innerWidth <= 700) {
                e.stopPropagation();
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

}
