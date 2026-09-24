/* =====================================================
   FORAGE AGRONOMY LAB — RESEARCH PAGE
   Page-specific JavaScript only
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       HANDLE MISSING RESEARCH IMAGES
    ================================================= */

    const researchImages =
        document.querySelectorAll(".research-image img");

    researchImages.forEach(function (image) {

        image.addEventListener("error", function () {

            image.style.display = "none";

            const parent =
                image.closest(".research-image");

            if (parent) {
                parent.classList.add("image-missing");
            }

        });

    });


    /* =================================================
       HANDLE MISSING FUNDING LOGOS
    ================================================= */

    const fundingLogos =
        document.querySelectorAll(".funding-logo img");

    fundingLogos.forEach(function (logo) {

        logo.addEventListener("error", function () {

            logo.style.display = "none";

            const parent =
                logo.closest(".funding-logo");

            if (parent) {
                parent.classList.add("logo-missing");
            }

        });

    });

});
