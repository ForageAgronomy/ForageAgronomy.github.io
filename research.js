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

                mainNav.classList.toggle("open");

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

                if (window.innerWidth <= 700) {

                    mainNav.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


    /* =================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (!mainNav || !menuToggle) {
                return;
            }


            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenuButton &&
                window.innerWidth <= 700
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
       IMAGE FALLBACK
       Prevents broken-image appearance if an image
       has not yet been uploaded.
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

            }
        );

    });


});
