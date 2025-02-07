window.onload = () => {
    // Check if user is logged in and if the showWheel flag is set
    const isUserLoggedIn = sessionStorage.getItem('isAuthenticated') === 'true';  // Check sessionStorage for logged-in state
    const showWheelFlag = sessionStorage.getItem('showWheel'); // Flag to show the wheel

    if (isUserLoggedIn && showWheelFlag === 'true') {
        showWheelPopup();  // Show the wheel popup
        sessionStorage.removeItem('showWheel'); // Remove the flag to prevent future popups during this session
    }
};

// Show the wheel popup
function showWheelPopup() {
    const wheelPopup = document.getElementById("wheelPopup");
    const spinButton = document.getElementById("spinButton");
    const closeButton = document.getElementById("closeWheel");

    // Ensure the popup is visible
    wheelPopup.style.display = "flex"; // Show the popup

    // Set up the wheel
    const canvas = document.getElementById("wheel");
    const ctx = canvas.getContext("2d");
    const prizes = [
        { name: "10% Off", code: "DISC10" },
        { name: "FreeDelivery", code: "FreeDel" },
        { name: "15% Off", code: "DISC15" },
        { name: "5% Off", code: "DISC5" },
        { name: "1% Off", code: "DISC1" },
        { name: "20% Off", code: "DISC20" }
    ];

    const wheelRadius = 150;
    const numSegments = prizes.length;
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const spinSpeed = 0.1;

    let rotation = 0;
    let spinning = false;

    // Draw the wheel segments
    function drawWheel(rotation = 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the previous frame
        ctx.translate(wheelRadius, wheelRadius); // Move the wheel center to the middle of canvas
        ctx.rotate(rotation); // Apply rotation

        for (let i = 0; i < numSegments; i++) {
            const startAngle = i * anglePerSegment;
            const endAngle = (i + 1) * anglePerSegment;

            ctx.beginPath();
            ctx.arc(0, 0, wheelRadius, startAngle, endAngle, false); // Draw each segment
            ctx.lineTo(0, 0);
            ctx.fillStyle = i % 2 === 0 ? "#E6E6FA" : "C0C0FF"; // Alternate segment colors
            ctx.fill();

            ctx.save();
            ctx.rotate(startAngle + anglePerSegment / 2); // Rotate text to align with segments
            ctx.fillStyle = "#003366";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(prizes[i].name, wheelRadius - 60, 0); // Draw the prize text
            ctx.restore();
        }

        ctx.resetTransform(); // Reset transformation to avoid cumulative rotation
    }

    // Spin the wheel
function spinWheel() {
    if (!spinning) {
        spinning = true;
        
        // Random spin duration (between 2 and 5 seconds)
        let spinDuration = Math.random() * 3000 + 2000;
        
        // Random target rotation (between 2 and 5 full rotations)
        let targetRotation = rotation + Math.random() * 2 * Math.PI + 5 * Math.PI; 
        
        let spinSpeedFactor = 0.5; // Start with a moderate speed
        let decelerationFactor = 0.98; // Slow down over time

        const spinInterval = setInterval(() => {
            rotation += spinSpeedFactor; // Increment the rotation by the current speed

            // Slow down the speed gradually by multiplying with the deceleration factor
            if (spinSpeedFactor > 0.02) {
                spinSpeedFactor *= decelerationFactor;
            }

            // Redraw the wheel with the updated rotation
            drawWheel(rotation);

            // If we've reached or exceeded the target rotation, stop the wheel
            if (rotation >= targetRotation) {
                clearInterval(spinInterval);
                spinning = false;

                // Wait 2 seconds before showing the prize
                setTimeout(() => {
                    displayPrize(rotation); // Show the prize
                }, 2000); // 2 second delay
            }
        }, 16); // 60fps - Update wheel every 16ms
    }
}


    // Display the prize and discount code in the modal
    function displayPrize(rotation) {
        const prizeIndex = Math.floor((rotation % (2 * Math.PI)) / anglePerSegment); // Get the prize index
        const selectedPrize = prizes[prizeIndex]; // Get the prize object

        // Prepare the prize message and code
        const prizeMessage = `You won: ${selectedPrize.name}`;
        const prizeCode = `Use code: ${selectedPrize.code} to claim your discount!`;
        // Store the voucher code in sessionStorage
        sessionStorage.setItem('spinVoucher', selectedPrize.code); // Store the code in sessionStorage
        // Update the modal content
        document.getElementById("prizeMessage").innerText = prizeMessage;
        document.getElementById("prizeCode").innerText = prizeCode;

        // Show the modal with the prize message and discount code
        const modal = document.getElementById("prizeModal");
        modal.style.display = "block";
        wheelPopup.style.display = "none";

    }

    // Close the wheel popup when the close button is clicked
    closeButton.addEventListener("click", () => {
        wheelPopup.style.display = "none"; // Hide the wheel popup when the close button is clicked
    });

    // Spin the wheel when clicked
    spinButton.addEventListener("click", spinWheel);
    document.getElementById("closeModal").addEventListener("click", function() {
        const modal = document.getElementById("prizeModal");
        modal.style.display = "none"; // Hide the modal
    });
}
