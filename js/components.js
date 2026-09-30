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

            var placeholder = document.getElementById("header-placeholder");
            if (placeholder) {
                placeholder.innerHTML = data;
            }

            /* Nav must init AFTER header HTML is in the DOM */
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

            var placeholder = document.getElementById("footer-placeholder");
            if (placeholder) {
                placeholder.innerHTML = data;
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
   NAVIGATION  —  called after header is injected
===================================================== */

function initializeNavigation() {

    var menuToggle = document.getElementById("menuToggle");
    var mainNav    = document.getElementById("mainNav");
    var siteHeader = document.querySelector(".site-header");

    /* ── Mobile menu toggle ── */
    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function (e) {
            e.stopPropagation();

            var isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        /* Close when clicking outside the header */
        document.addEventListener("click", function (e) {
            if (
                mainNav.classList.contains("open") &&
                siteHeader &&
                !siteHeader.contains(e.target)
            ) {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }
        });

    }


    /* ── Extension dropdown (mobile tap) ── */

    var extensionBtn      = document.getElementById("extensionButton");
    var extensionDropdown = document.querySelector(".nav-dropdown");

    if (extensionBtn && extensionDropdown) {

        extensionBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            extensionDropdown.classList.toggle("open");
        });

        /* Close dropdown when clicking elsewhere inside the nav */
        document.addEventListener("click", function (e) {
            if (
                extensionDropdown.classList.contains("open") &&
                !extensionDropdown.contains(e.target)
            ) {
                extensionDropdown.classList.remove("open");
            }
        });

    }


    /* ── Highlight active page ── */

    var currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

}
