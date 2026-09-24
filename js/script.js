/* =====================================================
   FORAGE AGRONOMY LAB
   Main Site JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }


    /* =====================================================
       EXTENSION DROPDOWN
    ===================================================== */

    const extensionButton =
        document.getElementById("extensionButton");

    const extensionDropdown =
        document.querySelector(".nav-dropdown");

    if (
        extensionButton &&
        extensionDropdown
    ) {

        extensionButton.addEventListener(
            "click",
            function () {

                /* Mobile only */

                if (window.innerWidth <= 950) {

                    extensionDropdown.classList.toggle(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       CURRENT PAGE NAVIGATION
       Automatically highlights the current page
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});
