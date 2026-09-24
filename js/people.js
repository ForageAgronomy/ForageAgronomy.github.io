/* =====================================================
   FORAGE AGRONOMY LAB — PEOPLE PAGE
   Page-specific JavaScript only
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       HANDLE MISSING PI IMAGE
    ================================================= */

    const piImage = document.querySelector(".pi-image img");

    if (piImage) {

        piImage.addEventListener("error", function () {

            piImage.style.display = "none";

            const parent = piImage.closest(".pi-image");

            if (parent) {
                parent.classList.add("image-missing");
            }

        });

    }


    /* =================================================
       HANDLE MISSING LAB MEMBER IMAGES
    ================================================= */

    const memberImages =
        document.querySelectorAll(".person-image img");

    memberImages.forEach(function (image) {

        image.addEventListener("error", function () {

            image.style.display = "none";

            const parent =
                image.closest(".person-image");

            if (parent) {
                parent.classList.add("image-missing");
            }

        });

    });

});
