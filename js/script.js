```javascript
document.addEventListener("DOMContentLoaded", function () {


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

                mainNav.classList.toggle("active");

            }
        );

    }



    /* =====================================================
       EXTENSION DROPDOWN ON MOBILE
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

                if (window.innerWidth <= 950) {

                    extensionDropdown.classList.toggle(
                        "active"
                    );

                }

            }
        );

    }



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
```
