/*
=========================================
Life's A Beach
script.js
Part 1
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll("nav a[href^='#']");
    const sections = document.querySelectorAll("section[id]");
    const floatingButton = document.querySelector(".floating-book");
    const backToTop = document.querySelector(".back-to-top a");

    /*
    ===========================
    Smooth Scrolling
    ===========================
    */

    navLinks.forEach(link => {

        link.addEventListener("click", e => {

            const targetID = link.getAttribute("href");

            if (!targetID.startsWith("#")) return;

            const target = document.querySelector(targetID);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header.offsetHeight;

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });


    /*
    ===========================
    Sticky Header
    ===========================
    */

    function updateHeader() {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.08)";

            header.style.background =
                "rgba(251,247,240,.95)";

        } else {

            header.style.boxShadow = "";
            header.style.background = "";

        }

    }


    /*
    ===========================
    Active Navigation
    ===========================
    */

    function updateActiveNav() {

        const scrollPosition = window.scrollY + header.offsetHeight + 120;

        sections.forEach(section => {

            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + id) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }


    /*
    ===========================
    Floating Button
    ===========================
    */

    function updateFloatingButton() {

        if (!floatingButton) return;

        if (window.scrollY > 350) {

            floatingButton.style.opacity = "1";
            floatingButton.style.transform = "translateY(0)";
            floatingButton.style.pointerEvents = "auto";

        } else {

            floatingButton.style.opacity = "0";
            floatingButton.style.transform = "translateY(30px)";
            floatingButton.style.pointerEvents = "none";

        }

    }


    /*
    ===========================
    Back To Top
    ===========================
    */

    if (backToTop) {

        backToTop.addEventListener("click", e => {

            e.preventDefault();

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }


    /*
    ===========================
    Reveal Animations
    ===========================
    */

    const revealElements = document.querySelectorAll(
        ".section, .service-card, .membership-card, .why-item, .gallery-item, .testimonial-slide"
    );

    revealElements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition =
            "opacity .8s ease, transform .8s ease";

    });


    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    revealElements.forEach(el => {

        observer.observe(el);

    });


    /*
    ===========================
    Utility
    ===========================
    */

    function onScroll() {

        updateHeader();
        updateActiveNav();
        updateFloatingButton();

    }

    window.addEventListener("scroll", onScroll);

    onScroll();

});
