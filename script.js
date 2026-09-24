```javascript
/* =========================================================
   FORAGE AGRONOMY LAB
   JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("active");

        });

    }


    /* ================= MOBILE DROPDOWN ================= */

    const dropdownButton =
        document.querySelector(".dropdown-button");

    const dropdown =
        document.querySelector(".dropdown");

    if (dropdownButton && dropdown) {

        dropdownButton.addEventListener("click", function () {

            if (window.innerWidth <= 900) {

                dropdown.classList.toggle("active");

            }

        });

    }


    /* ================= COPYRIGHT YEAR ================= */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});
```
