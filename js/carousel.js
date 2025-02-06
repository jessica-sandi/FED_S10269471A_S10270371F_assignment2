const carouselImages = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const prevButton = document.querySelector(".carousel-buttons button:nth-child(1)"); // Previous button
const nextButton = document.querySelector(".carousel-buttons button:nth-child(2)"); // Next button

if (carouselImages && images.length > 0 && prevButton && nextButton) {
    let currentIndex = 0;

    // Function to update the carousel position
    const updateCarousel = () => {
        const imageWidth = images[0].clientWidth; // Get the width of one image
        carouselImages.style.transform = `translateX(${-currentIndex * imageWidth * 2}px)`; // Move by 2 images
    };

    // Show the previous set of images
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex === 0) ? Math.floor(images.length / 2) - 1 : currentIndex - 1;
        updateCarousel();
    });

    // Show the next set of images
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex === Math.floor(images.length / 2) - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Auto-slide the carousel every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex === Math.floor(images.length / 2) - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }, 3000);

    // Adjust the carousel on window resize
    window.addEventListener("resize", updateCarousel);
}
