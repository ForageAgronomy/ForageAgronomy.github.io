/* =====================================================
   FORAGE AGRONOMY LAB
   HOMEPAGE SLIDESHOW
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const slideshow = document.getElementById("labSlideshow");

    if (!slideshow) {
        return;
    }

    const slides =
        slideshow.querySelectorAll(".slide");

    const dots =
        slideshow.querySelectorAll(".slide-dot");

    const previousButton =
        slideshow.querySelector(".slide-prev");

    const nextButton =
        slideshow.querySelector(".slide-next");


    if (slides.length === 0) {
        return;
    }


    let currentSlide = 0;

    let slideTimer;


    /* =================================================
       SHOW SLIDE
    ================================================= */

    function showSlide(index) {

        if (index >= slides.length) {
            currentSlide = 0;
        }

        else if (index < 0) {
            currentSlide = slides.length - 1;
        }

        else {
            currentSlide = index;
        }


        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    /* =================================================
       NEXT SLIDE
    ================================================= */

    function nextSlide() {

        showSlide(currentSlide + 1);

        restartTimer();

    }


    /* =================================================
       PREVIOUS SLIDE
    ================================================= */

    function previousSlide() {

        showSlide(currentSlide - 1);

        restartTimer();

    }


    /* =================================================
       AUTOMATIC SLIDESHOW
       10 SECONDS
    ================================================= */

    function startTimer() {

        slideTimer = setInterval(function () {

            showSlide(currentSlide + 1);

        }, 10000);

    }


    function restartTimer() {

        clearInterval(slideTimer);

        startTimer();

    }


    /* =================================================
       BUTTONS
    ================================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSlide
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousSlide
        );

    }


    /* =================================================
       DOT NAVIGATION
    ================================================= */

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                showSlide(index);

                restartTimer();

            }
        );

    });


    /* =================================================
       INITIALIZE
    ================================================= */

    showSlide(0);

    startTimer();

});
