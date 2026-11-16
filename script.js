```javascript
/* =========================================
   AUTOVAULT — MAIN JAVASCRIPT
   Stage 03: Homepage Interactions
========================================= */

"use strict";

/* =========================================
   01. DOM ELEMENTS
========================================= */

const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("mainNavigation");
const navigationLinks = document.getElementById("navigationLinks");
const currentYear = document.getElementById("currentYear");


/* =========================================
   02. MOBILE NAVIGATION
========================================= */

function openNavigation() {
    if (!menuToggle || !mainNavigation) return;

    menuToggle.classList.add("active");
    mainNavigation.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
}

function closeNavigation() {
    if (!menuToggle || !mainNavigation) return;

    menuToggle.classList.remove("active");
    mainNavigation.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

function toggleNavigation() {
    if (!menuToggle || !mainNavigation) return;

    const isOpen = mainNavigation.classList.contains("active");

    if (isOpen) {
        closeNavigation();
    } else {
        openNavigation();
    }
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleNavigation);
}


/* =========================================
   03. CLOSE MENU AFTER NAVIGATION
========================================= */

if (navigationLinks) {
    navigationLinks.addEventListener("click", function (event) {
        const clickedLink = event.target.closest("a");

        if (clickedLink) {
            closeNavigation();
        }
    });
}


/* =========================================
   04. CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function (event) {
    if (!mainNavigation || !menuToggle) return;

    const clickedInsideNavigation =
        mainNavigation.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);

    if (
        mainNavigation.classList.contains("active") &&
        !clickedInsideNavigation &&
        !clickedToggle
    ) {
        closeNavigation();
    }
});


/* =========================================
   05. CLOSE MENU WITH ESCAPE KEY
========================================= */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        const menuIsOpen =
            mainNavigation &&
            mainNavigation.classList.contains("active");

        if (menuIsOpen) {
            closeNavigation();
            menuToggle?.focus();
        }
    }
});


/* =========================================
   06. RESPONSIVE NAVIGATION RESET
========================================= */

const desktopBreakpoint = window.matchMedia("(min-width: 769px)");

function handleNavigationResize(event) {
    if (event.matches) {
        closeNavigation();
    }
}

desktopBreakpoint.addEventListener(
    "change",
    handleNavigationResize
);


/* =========================================
   07. STICKY HEADER ON SCROLL
========================================= */

let scrollScheduled = false;

function updateHeaderOnScroll() {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

    scrollScheduled = false;
}

window.addEventListener(
    "scroll",
    function () {
        if (!scrollScheduled) {
            window.requestAnimationFrame(updateHeaderOnScroll);
            scrollScheduled = true;
        }
    },
    { passive: true }
);

// Set the correct header state on page load.
updateHeaderOnScroll();


/* =========================================
   08. DYNAMIC FOOTER YEAR
========================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   09. VEHICLE ENQUIRY LINK VALIDATION
========================================= */

function validateVehicleCards() {
    const vehicleCards = document.querySelectorAll(
        ".vehicle-card[data-vehicle]"
    );

    vehicleCards.forEach(function (card) {
        const vehicleId = card.dataset.vehicle;

        if (!vehicleId) return;

        const enquiryLink = card.querySelector(
            ".vehicle-enquiry-link"
        );

        const viewingLink = card.querySelector(
            ".vehicle-viewing-link"
        );

        if (enquiryLink) {
            const enquiryURL = new URL(
                enquiryLink.href,
                window.location.href
            );

            enquiryURL.searchParams.set("vehicle", vehicleId);
            enquiryLink.href = enquiryURL.href;
        }

        if (viewingLink) {
            const viewingURL = new URL(
                viewingLink.href,
                window.location.href
            );

            viewingURL.searchParams.set("vehicle", vehicleId);
            viewingURL.searchParams.set("intent", "viewing");

            viewingLink.href = viewingURL.href;
        }
    });
}

validateVehicleCards();


/* =========================================
   10. SMOOTH INTERNAL NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();

        targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Keep the URL in sync with the destination.
        if (history.replaceState) {
            history.replaceState(null, "", targetId);
        }
    });
});


/* =========================================
   11. INITIAL PAGE SETUP
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    closeNavigation();

    updateHeaderOnScroll();

    validateVehicleCards();

    console.log("AUTOVAULT homepage initialized successfully.");
});
```
