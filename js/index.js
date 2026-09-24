/* =========================================================
   FORAGE AGRONOMY LAB
   HOME PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements =
        document.querySelectorAll(".reveal");


    if (!revealElements.length) {
        return;
    }


    /*
     * Respect reduced-motion preferences.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

        return;
    }


    /*
     * Intersection Observer
     */

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });

});
