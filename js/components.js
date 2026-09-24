/* =====================================================
   SHARED HEADER AND FOOTER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOAD HEADER
    ===================================================== */

    fetch("components/header.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Could not load header.html"
                );
            }

            return response.text();

        })
        .then(function (data) {

            const header =
                document.getElementById(
                    "header-placeholder"
                );

            if (header) {
                header.innerHTML = data;
            }

            /* Initialize site navigation */
            initializeNavigation();

        })
        .catch(function (error) {

            console.error(
                "Header loading error:",
                error
            );

        });


    /* =====================================================
       LOAD FOOTER
    ===================================================== */

    fetch("components/footer.html")
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Could not load footer.html"
                );
            }

            return response.text();

        })
        .then(function (data) {

            const footer =
                document.getElementById(
                    "footer-placeholder"
                );

            if (footer) {
                footer.innerHTML = data;
            }

            /* Set current year */
            const year =
                document.getElementById("year");

            if (year) {

                year.textContent =
                    new Date().getFullYear();

            }

        })
        .catch(function (error) {

            console.error(
                "Footer loading error:",
                error
            );

        });

});


/* =====================================================
   NAVIGATION
===================================================== */

function initializeNavigation() {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    mainNav.classList.toggle("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );

            }
        );

    }


    /* =====================================================
       EXTENSION DROPDOWN
    ===================================================== */

    const extensionButton =
        document.getElementById(
            "extensionButton"
        );

    const extensionDropdown =
        document.querySelector(
            ".nav-dropdown"
        );

    if (
        extensionButton &&
        extensionDropdown
    ) {

        extensionButton.addEventListener(
            "click",
            function () {

                if (window.innerWidth <= 950) {

                    extensionDropdown.classList.toggle(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       CURRENT PAGE
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

}
