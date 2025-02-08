// Fetch both local JSON data and RESTdb API data concurrently
Promise.all([
    // Fetch data from local JSON file
    fetch('products.json').then(response => response.json()), 
    
    // Fetch data from RESTdb API
    fetch('https://assignment2db-2aad.restdb.io/rest/fashion', {
        headers: {
            'x-apikey': '678c8feb6f2ec083b7ee6d9c'  // Your API key for RESTdb
        }
    }).then(response => response.json())
])
.then(([localData, restdbData]) => {
    // Combine both local data and RESTdb data
    const allProducts = [...localData, ...restdbData];

    const productsGrid = document.getElementById('products-grid');

    // Loop through all products from both data sources
    allProducts.forEach(product => {
        // Only display products in the "mens" category and are active
        if (product.category === 'men' && product.active) {
            // Create a link to the product detail page with the productID in the URL
            const productLink = document.createElement('a');
            productLink.href = `productdetail.html?id=${product.productID}`;  // Using productID as the unique identifier
            productLink.className = 'product-card'; // Add a class to style the card

            // Add the product card content inside the <a> tag
            productLink.innerHTML = `
                <img src="${product.photosurl}" alt="${product.name}" class="product-image" />
                <div class="product-name">${product.name}</div>
                <div class="product-price">S$${product.price}</div>
                <div class="product-condition">${product.condition}</div>
                <div class="favorite">
                    <span class="material-icons-outlined">favorite</span>
                    <span class="like-count">0</span>
                </div>
            `;

            const favoriteButton = productLink.querySelector(".favorite");
            const likeCount = productLink.querySelector(".like-count");

            // Add click event to toggle heart color and increment like count
            favoriteButton.addEventListener("click", (event) => {
                // Prevent the link click from triggering when the heart icon is clicked
                event.stopPropagation(); // This ensures only the heart button is affected
                event.preventDefault();
                favoriteButton.classList.toggle("hearted");
                const currentLikes = parseInt(likeCount.textContent, 10);
                if (favoriteButton.classList.contains("hearted")) {
                    likeCount.textContent = currentLikes + 1;
                } else {
                    likeCount.textContent = currentLikes - 1;
                }
            });
            // Prevent the default anchor click behavior only when the heart button is not clicked
            productLink.addEventListener("click", (event) => {
                // If the event target is not the heart button, allow the link to be followed
                if (!favoriteButton.contains(event.target)) {
                    return;
                }
                event.preventDefault(); // Prevent navigation if heart button is clicked
            });
            // Append the productLink to the productsGrid
            productsGrid.appendChild(productLink);
        }
    });
})
.catch(error => {
    console.error('Error loading data from both sources:', error);
});
