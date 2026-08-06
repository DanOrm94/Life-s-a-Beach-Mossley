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
    /*
=========================================
PART 2
FAQ
Testimonials
Gallery Lightbox
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    =====================================
    FAQ ACCORDION
    =====================================
    */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const button = item.querySelector(".faq-toggle");
        const answer = item.querySelector(".faq-content");
        const icon = button.lastElementChild;

        answer.style.display = "none";

        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");

            faqItems.forEach(faq => {

                faq.classList.remove("open");

                const content = faq.querySelector(".faq-content");
                const plus = faq.querySelector(".faq-toggle span:last-child");

                content.style.display = "none";
                plus.textContent = "+";

            });

            if (!isOpen) {

                item.classList.add("open");

                answer.style.display = "block";

                icon.textContent = "−";

            }

        });

    });

    /*
    =====================================
    TESTIMONIAL CAROUSEL
    =====================================
    */

    const slides = document.querySelectorAll(".testimonial-slide");

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach((slide, i) => {

            slide.style.display = i === index
                ? "block"
                : "none";

            slide.style.opacity = i === index
                ? "1"
                : "0";

        });

    }

    if (slides.length > 0) {

        showSlide(0);

        setInterval(() => {

            currentSlide++;

            if (currentSlide >= slides.length) {

                currentSlide = 0;

            }

            showSlide(currentSlide);

        }, 5000);

    }

    /*
    =====================================
    GALLERY LIGHTBOX
    =====================================
    */

    const galleryImages = document.querySelectorAll(".gallery-item img");

    if (galleryImages.length > 0) {

        const overlay = document.createElement("div");

        overlay.id = "lightbox";

        overlay.innerHTML = `

            <button class="lightbox-close">&times;</button>

            <button class="lightbox-prev">&#10094;</button>

            <img>

            <button class="lightbox-next">&#10095;</button>

        `;

        document.body.appendChild(overlay);

        const lightboxImage = overlay.querySelector("img");

        const closeBtn = overlay.querySelector(".lightbox-close");

        const nextBtn = overlay.querySelector(".lightbox-next");

        const prevBtn = overlay.querySelector(".lightbox-prev");

        let currentImage = 0;

        function openLightbox(index) {

            currentImage = index;

            lightboxImage.src = galleryImages[index].src;
            lightboxImage.alt = galleryImages[index].alt;

            overlay.classList.add("open");

            document.body.style.overflow = "hidden";

        }

        function closeLightbox() {

            overlay.classList.remove("open");

            document.body.style.overflow = "";

        }

        function nextImage() {

            currentImage++;

            if (currentImage >= galleryImages.length) {

                currentImage = 0;

            }

            openLightbox(currentImage);

        }

        function previousImage() {

            currentImage--;

            if (currentImage < 0) {

                currentImage = galleryImages.length - 1;

            }

            openLightbox(currentImage);

        }

        galleryImages.forEach((img, index) => {

            img.style.cursor = "zoom-in";

            img.addEventListener("click", () => {

                openLightbox(index);

            });

        });

        closeBtn.addEventListener("click", closeLightbox);

        nextBtn.addEventListener("click", nextImage);

        prevBtn.addEventListener("click", previousImage);

        overlay.addEventListener("click", e => {

            if (e.target === overlay) {

                closeLightbox();

            }

        });

        document.addEventListener("keydown", e => {

            if (!overlay.classList.contains("open")) return;

            if (e.key === "Escape") {

                closeLightbox();

            }

            if (e.key === "ArrowRight") {

                nextImage();

            }

            if (e.key === "ArrowLeft") {

                previousImage();

            }
/*
=========================================
PART 3
Forms
Utilities
Accessibility
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    =====================================
    BOOKING FORM
    =====================================
    */

    const bookingForm = document.querySelector(".form-card");

    if (bookingForm && bookingForm.tagName === "FORM") {

        bookingForm.addEventListener("submit", e => {

            e.preventDefault();

            const name =
                bookingForm.querySelector("#name");

            const email =
                bookingForm.querySelector("#email");

            const phone =
                bookingForm.querySelector("#phone");

            const service =
                bookingForm.querySelector("#service");

            let valid = true;

            bookingForm
                .querySelectorAll(".error")
                .forEach(error => error.remove());

            function showError(input, message) {

                valid = false;

                const error =
                    document.createElement("small");

                error.className = "error";

                error.textContent = message;

                error.style.color = "#d33";

                error.style.display = "block";

                error.style.marginTop = ".35rem";

                input.parentNode.appendChild(error);

                input.style.borderColor = "#d33";

            }

            bookingForm
                .querySelectorAll("input,select,textarea")
                .forEach(el => {

                    el.style.borderColor = "";

                });

            if (!name.value.trim())
                showError(name, "Please enter your name.");

            if (!email.value.trim())
                showError(email, "Email is required.");

            else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
            )
                showError(email, "Enter a valid email.");

            if (!phone.value.trim())
                showError(phone, "Phone number required.");

            if (!service.value)
                showError(service, "Choose a service.");

            if (!valid) return;

            const button =
                bookingForm.querySelector(
                    "button[type='submit']"
                );

            const original = button.textContent;

            button.disabled = true;

            button.textContent = "Booking...";

            setTimeout(() => {

                button.textContent = "✓ Request Sent";

                showToast(
                    "Thank you! We'll contact you shortly."
                );

                bookingForm.reset();

                setTimeout(() => {

                    button.disabled = false;

                    button.textContent = original;

                }, 2500);

            }, 1200);

        });

    }

    /*
    =====================================
    NEWSLETTER
    =====================================
    */

    const newsletter =
        document.querySelector("footer form");

    if (newsletter) {

        newsletter.addEventListener("submit", e => {

            e.preventDefault();

            const input =
                newsletter.querySelector("input");

            if (!input.value.trim()) {

                showToast("Please enter an email.");

                return;

            }

            showToast("Thanks for subscribing!");

            input.value = "";

        });

    }

    /*
    =====================================
    DATE PICKER
    =====================================
    */

    const date =
        document.querySelector("#date");

    if (date) {

        const today = new Date();

        today.setDate(today.getDate());

        date.min =
            today.toISOString().split("T")[0];

    }

    /*
    =====================================
    TOAST
    =====================================
    */

    function showToast(message) {

        let toast =
            document.querySelector(".toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

    }

    /*
    =====================================
    BUTTON RIPPLE
    =====================================
    */

    document
        .querySelectorAll(".btn")
        .forEach(button => {

            button.addEventListener("click", e => {

                const circle =
                    document.createElement("span");

                const size =
                    Math.max(
                        button.clientWidth,
                        button.clientHeight
                    );

                circle.style.width =
                    circle.style.height =
                    size + "px";

                circle.style.left =
                    e.offsetX - size / 2 + "px";

                circle.style.top =
                    e.offsetY - size / 2 + "px";

                circle.className = "ripple";

                button.appendChild(circle);

                setTimeout(() => {

                    circle.remove();

                }, 600);

            });

        });

    /*
    =====================================
    REDUCED MOTION
    =====================================
    */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document
            .querySelectorAll("*")
            .forEach(el => {

                el.style.animation = "none";

                el.style.transition = "none";

            });

    }

});
            

        });

    }


});
