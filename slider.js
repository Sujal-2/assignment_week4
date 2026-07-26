const track = document.querySelector(".slider-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

// Exit if slider doesn't exist
if (track) {

    const slides = Array.from(document.querySelectorAll(".slide"));
    const totalSlides = slides.length;

    // Clone first and last slides
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll(".slide");

    let currentIndex = 1;
    let slideWidth = 100;

    // Move to first real slide
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    // -------------------------
    // Create Navigation Dots
    // -------------------------

    slides.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.classList.add("dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentIndex = index + 1;

            moveSlider();

        });

        dotsContainer.appendChild(dot);

    });

    const dots = document.querySelectorAll(".dot");

    // -------------------------
    // Update Dots
    // -------------------------

    function updateDots() {

        dots.forEach(dot => dot.classList.remove("active"));

        let activeIndex = currentIndex - 1;

        if (activeIndex < 0) {
            activeIndex = totalSlides - 1;
        }

        if (activeIndex >= totalSlides) {
            activeIndex = 0;
        }

        dots[activeIndex].classList.add("active");

    }

    // -------------------------
    // Move Slider
    // -------------------------

    function moveSlider() {

        track.style.transition = "transform 0.5s ease";

        track.style.transform =
            `translateX(-${currentIndex * slideWidth}%)`;

        updateDots();

    }

    // -------------------------
    // Next Button
    // -------------------------

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        moveSlider();

    });

    // -------------------------
    // Previous Button
    // -------------------------

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        moveSlider();

    });

    // -------------------------
    // Infinite Loop
    // -------------------------

    track.addEventListener("transitionend", () => {

        if (allSlides[currentIndex].classList.contains("clone")) {

            track.style.transition = "none";

            if (currentIndex === 0) {

                currentIndex = totalSlides;

            } else if (currentIndex === allSlides.length - 1) {

                currentIndex = 1;

            }

            track.style.transform =
                `translateX(-${currentIndex * slideWidth}%)`;

        }

        updateDots();

    });

    // -------------------------
    // Keep Position on Resize
    // -------------------------

    window.addEventListener("resize", () => {

        track.style.transition = "none";

        track.style.transform =
            `translateX(-${currentIndex * slideWidth}%)`;

    });

}
