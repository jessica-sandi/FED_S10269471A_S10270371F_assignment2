const carouselImages = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images a"); // Select anchor tags wrapping images
const prevButton = document.querySelector(".prevSlide"); // Previous button
const nextButton = document.querySelector(".nextSlide"); // Next button

let currentIndex = 0;

// Function to update the carousel position (only 1 image per view)
const updateCarousel = () => {
    const imageWidth = images[0].clientWidth; // Get the width of one image
    carouselImages.style.transform = `translateX(${-currentIndex * imageWidth}px)`; // Move by 1 image
};

// Show the previous image
prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateCarousel();
});

// Show the next image
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

// Auto-slide the carousel every 3 seconds
setInterval(() => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
}, 3000);

// Adjust the carousel on window resize
window.addEventListener("resize", updateCarousel);

// Call updateCarousel once initially to adjust it on page load
updateCarousel();
