/* =====================================================
   FORAGE AGRONOMY LAB — EXTENSION ARTICLES
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    mainNav.classList.toggle("open");


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation"
                        : "Open navigation"
                );

            }
        );

    }


    /* =================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ================================================= */

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 700 &&
                    mainNav
                ) {

                    mainNav.classList.remove(
                        "open"
                    );


                    if (menuToggle) {

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation"
                        );

                    }

                }

            }
        );

    });


    /* =================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !mainNav ||
                !menuToggle ||
                window.innerWidth > 700
            ) {

                return;

            }


            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenuButton
            ) {

                mainNav.classList.remove(
                    "open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        }
    );


    /* =================================================
       RESET NAVIGATION AFTER RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 700 &&
                mainNav
            ) {

                mainNav.classList.remove(
                    "open"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation"
                    );

                }

            }

        }
    );


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       PDF LINK CHECK
       Logs a helpful message if a PDF link is empty.
    ================================================= */

    const pdfLinks =
        document.querySelectorAll(
            'a[href$=".pdf"]'
        );


    pdfLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (
            !href ||
            href.trim() === ""
        ) {

            console.warn(
                "Extension article PDF link is missing."
            );

        }

    });

});
