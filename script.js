document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       FADE-IN ANIMATION
    ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".research-card, " +
        ".person-card, " +
        ".publication, " +
        ".extension-grid > div, " +
        ".opportunity-grid > div, " +
        ".course"
    );


    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },

        {
            threshold: 0.08
        }

    );


    animatedElements.forEach(function (element) {

        element.classList.add("fade-in");

        observer.observe(element);

    });



    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const navigationLinks = document.querySelectorAll(
        '.navbar nav a[href^="#"]'
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

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        '.navbar nav a[href^="#"]'
    );


    const sectionObserver = new IntersectionObserver(

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

        sectionObserver.observe(section);

    });



    /* =====================================================
       PUBLICATION LINKS
       
       Publication titles already contain their DOI/journal
       links in index.html. This section adds a small
       accessibility enhancement.
    ===================================================== */

    const publicationLinks = document.querySelectorAll(
        ".publication h3 a"
    );


    publicationLinks.forEach(function (link) {

        link.setAttribute(
            "aria-label",
            "Open publication in journal"
        );

    });



    /* =====================================================
       CURRENT YEAR
       
       If an element with class .footer-year is added later,
       it will automatically display the current year.
    ===================================================== */

    const footerYear = document.querySelector(
        ".footer-year"
    );


    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }

});
