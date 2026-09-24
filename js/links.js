/* =====================================================
   FORAGE AGRONOMY LAB — LINKS PAGE
===================================================== */


/* =====================================================
   FOOTER YEAR
===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


/* =====================================================
   EXTENSION DROPDOWN
===================================================== */

const extensionButton =
    document.getElementById("extensionButton");

const extensionMenu =
    document.getElementById("extensionMenu");


if (extensionButton && extensionMenu) {

    extensionButton.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            extensionMenu.classList.toggle("show");

        extensionButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /* Close dropdown when clicking elsewhere */

    document.addEventListener("click", () => {

        extensionMenu.classList.remove("show");

        extensionButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

}


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
===================================================== */

if (mainNav) {

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("show");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    });

}
