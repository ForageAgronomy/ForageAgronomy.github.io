/* =====================================================
   FORAGE AGRONOMY LAB — PEOPLE PAGE
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

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


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
       RESET MOBILE MENU ON RESIZE
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
       HANDLE MISSING PI IMAGE
    ================================================= */

    const piImage =
        document.querySelector(
            ".pi-image img"
        );


    if (piImage) {

        piImage.addEventListener(
            "error",
            function () {

                piImage.style.display =
                    "none";

                const parent =
                    piImage.closest(
                        ".pi-image"
                    );


                if (parent) {

                    parent.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    }


    /* =================================================
       HANDLE MISSING LAB MEMBER IMAGES
    ================================================= */

    const memberImages =
        document.querySelectorAll(
            ".person-image img"
        );


    memberImages.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                image.style.display =
                    "none";


                const parent =
                    image.closest(
                        ".person-image"
                    );


                if (parent) {

                    parent.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    });

});
