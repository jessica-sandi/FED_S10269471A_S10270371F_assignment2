document.addEventListener("DOMContentLoaded", () => {
    const favoriteContainer = document.getElementById("favorite-products");
    const removeSelectedButton = document.getElementById("remove-selected");
    let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || {};

    // Function to render the favorites list
    const renderFavorites = () => {
        favoriteContainer.innerHTML = ''; // Clear previous content

        if (favoriteProducts.length === 0) {
            favoriteContainer.innerHTML = "<p>No favorite items yet.</p>";
            removeSelectedButton.style.display = "none"; // Hide the button if no favorites
            return;
        }

        removeSelectedButton.style.display = "block"; // Show the button if there are favorites

        // Render each favorite product
        favoriteProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";

            productCard.innerHTML = `
                <input type="checkbox" class="favorite-checkbox" data-id="${product.productID}">
                <img src="${product.photosurl}" alt="${product.name}" class="product-image" />
                <div class="product-name">${product.name}</div>
                <div class="product-price">S$${product.price.toFixed(2)}</div>
                <div class="product-condition">${product.condition}</div>
            `;

            // Append the product card to the container
            favoriteContainer.appendChild(productCard);
        });
    };

    // Function to handle "Remove Selected" button click
    removeSelectedButton.addEventListener("click", () => {
        const selectedCheckboxes = document.querySelectorAll(".favorite-checkbox:checked");

        // Collect the product IDs of the selected checkboxes
        const selectedIDs = Array.from(selectedCheckboxes).map(checkbox => checkbox.dataset.id);

        if (selectedIDs.length === 0) {
            alert("Please select items to remove.");
            return;
        }

        // Filter out the selected products from the favoriteProducts array
        favoriteProducts = favoriteProducts.filter(p => !selectedIDs.includes(p.productID));

        // Also remove the selected items from likedProducts in localStorage
        selectedIDs.forEach(id => delete likedProducts[id]);

        // Update localStorage with the new list
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
        localStorage.setItem("likedProducts", JSON.stringify(likedProducts));

        // Re-render the favorites list
        renderFavorites();
        
        // Trigger update of "like" buttons in other pages (e.g., women.html)
        selectedIDs.forEach(id => updateLikeButtonStatus(id, false));
    });

    // Render favorites when the page loads
    renderFavorites();
});
