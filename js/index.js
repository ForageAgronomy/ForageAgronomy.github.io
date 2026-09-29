/* =====================================================
   FORAGE AGRONOMY LAB
   Home Page JavaScript
   js/index.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SCROLL REVEAL
       Fades in elements with class .reveal as they
       enter the viewport. Respects reduced-motion.
    ===================================================== */

    var revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) { return; }

    /* Skip animation for users who prefer reduced motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        revealElements.forEach(function (el) {
            el.classList.add("visible");
        });

        return;
    }

    var observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },

        {
            threshold:  0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );

    revealElements.forEach(function (el) {
        observer.observe(el);
    });

});
