/* =========================================
   FORAGE AGRONOMY & BREEDING LAB
   ========================================= */

// Simple fade-in animation when sections enter the screen

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.1
    }
);

sections.forEach(section => {

    observer.observe(section);

});
