/* =====================================================
   FORAGE AGRONOMY LAB — PEOPLE PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------
       MOBILE MENU
    ------------------------------------------------ */

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


    /* -----------------------------------------------
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ------------------------------------------------ */

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 700
                ) {

                    mainNav.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


    /* -----------------------------------------------
       CURRENT YEAR
    ------------------------------------------------ */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});
