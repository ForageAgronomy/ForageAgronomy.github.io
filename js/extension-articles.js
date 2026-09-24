/* =====================================================
   FORAGE AGRONOMY LAB — EXTENSION ARTICLES
   Page-specific JavaScript only
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /*
     * PDF links
     *
     * Warn in the browser console if an article
     * does not have a valid PDF path.
     */

    const pdfLinks = document.querySelectorAll(
        'a[href$=".pdf"]'
    );

    pdfLinks.forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href || href.trim() === "") {

            console.warn(
                "Extension article PDF link is missing."
            );

        }

    });

});
