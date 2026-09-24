/* =========================================================
   LINKS PAGE JAVASCRIPT
   Forage Agronomy Lab
========================================================= */


/* =========================================================
   FOOTER YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNav.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


/* =========================================================
   EXTENSION DROPDOWN
========================================================= */

const extensionButton =
    document.getElementById("extensionButton");

const extensionMenu =
    document.getElementById("extensionMenu");


if (extensionButton && extensionMenu) {

    extensionButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const isOpen =
                extensionMenu.classList.toggle("show");

            extensionButton.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );

        }
    );


    /* Close dropdown when clicking outside */

    document.addEventListener(
        "click",
        function () {

            extensionMenu.classList.remove("show");

            extensionButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

}
