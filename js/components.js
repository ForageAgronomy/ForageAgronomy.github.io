/* =====================================================
   FORAGE AGRONOMY LAB
   js/components.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* Load header */
    fetch("components/header.html")
        .then(function (r) {
            if (!r.ok) throw new Error("header load failed");
            return r.text();
        })
        .then(function (html) {
            var el = document.getElementById("header-placeholder");
            if (el) el.innerHTML = html;
            initNav();
        })
        .catch(function (e) { console.error(e); });

    /* Load footer */
    fetch("components/footer.html")
        .then(function (r) {
            if (!r.ok) throw new Error("footer load failed");
            return r.text();
        })
        .then(function (html) {
            var el = document.getElementById("footer-placeholder");
            if (el) el.innerHTML = html;
            var yr = document.getElementById("year");
            if (yr) yr.textContent = new Date().getFullYear();
        })
        .catch(function (e) { console.error(e); });

});


function initNav() {

    var toggle  = document.getElementById("menuToggle");
    var mobileNav = document.getElementById("mainNav");

    /* ── Mobile hamburger ── */
    if (toggle && mobileNav) {

        toggle.addEventListener("click", function (e) {
            e.stopPropagation();
            var open = mobileNav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.textContent = open ? "✕" : "☰";
        });

        /* Tap outside → close */
        document.addEventListener("click", function (e) {
            if (
                mobileNav.classList.contains("open") &&
                !mobileNav.contains(e.target) &&
                e.target !== toggle
            ) {
                mobileNav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "☰";
            }
        });
    }

    /* ── Mobile Extension dropdown ── */
    var extBtn  = document.getElementById("extensionButton");
    var extDrop = extBtn
        ? extBtn.closest(".nav-dropdown")
        : null;

    if (extBtn && extDrop) {
        extBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            extDrop.classList.toggle("open");
        });
    }

    /* ── Active page highlight (desktop nav) ── */
    var page = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".desktop-nav a").forEach(function (a) {
        if (a.getAttribute("href") === page) {
            a.classList.add("active");
        }
    });
}
