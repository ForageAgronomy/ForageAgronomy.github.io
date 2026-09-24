/* =========================================================
   FORAGE AGRONOMY & BREEDING LAB
   UNIVERSITY OF WYOMING
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       FADE-IN ANIMATIONS
    ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".research-card, " +
        ".person-card, " +
        ".publication, " +
        ".opportunity-grid > div, " +
        ".course"
    );

    const animationObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    animationObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.08
        }
    );

    animatedElements.forEach(function (element) {

        element.classList.add("fade-in");

        animationObserver.observe(element);

    });


    /* =====================================================
       SMOOTH SCROLLING
       Excludes the Extension dropdown toggle
    ===================================================== */

    const navigationLinks = document.querySelectorAll(
        '.navbar nav a[href^="#"]:not(.dropdown-toggle)'
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(
        '.navbar nav a[href^="#"]:not(.dropdown-toggle)'
    );

    const navigationObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");

                    navLinks.forEach(function (link) {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + currentId
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach(function (section) {

        navigationObserver.observe(section);

    });


    /* =====================================================
       PUBLICATION LINKS
    ===================================================== */

    const publicationLinks =
        document.querySelectorAll(".publication h3 a");

    publicationLinks.forEach(function (link) {

        link.setAttribute(
            "aria-label",
            "Open publication in journal"
        );

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    const externalLinks =
        document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       EXTENSION DROPDOWN
       CSS handles hover and keyboard focus.
       No JavaScript is needed here.
    ===================================================== */


});
