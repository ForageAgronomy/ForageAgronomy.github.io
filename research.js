/* =====================================================
   FORAGE AGRONOMY LAB — RESEARCH PAGE
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
                    isOpen
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
       CLOSE MOBILE MENU AFTER NAV LINK CLICK
    ================================================= */

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (window.innerWidth <= 700) {

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

            if (!mainNav || !menuToggle) {
                return;
            }


            if (window.innerWidth > 700) {
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
       RESET MOBILE MENU WHEN WINDOW IS RESIZED
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
       HANDLE MISSING RESEARCH IMAGES
    ================================================= */

    const researchImages =
        document.querySelectorAll(
            ".research-image img"
        );


    researchImages.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                image.style.display = "none";

                const parent =
                    image.closest(
                        ".research-image"
                    );

                if (parent) {

                    parent.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    });


    /* =================================================
       HANDLE MISSING FUNDING LOGOS
    ================================================= */

    const fundingLogos =
        document.querySelectorAll(
            ".funding-logo img"
        );


    fundingLogos.forEach(function (logo) {

        logo.addEventListener(
            "error",
            function () {

                logo.style.display = "none";

                const parent =
                    logo.closest(
                        ".funding-logo"
                    );

                if (parent) {

                    parent.classList.add(
                        "logo-missing"
                    );

                }

            }
        );

    });

});
