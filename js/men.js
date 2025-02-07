// Fetching the local JSON data file
fetch('products.json')
.then(response => response.json())
.then(data => {
    const productsGrid = document.getElementById('products-grid');

    data.forEach(product => {
        // Only display products in the "Women" category and are active
        if (product.category === 'men' && product.active) {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
            <img src="${product.photosurl}" alt="${product.name}" class="product-image" />
            <div class="product-name">${product.name}</div>
            <div class="product-price">S$${product.price.toFixed(2)}</div>
            <div class="product-condition">${product.condition}</div>
            <div class="favorite">
                <span class="material-icons-outlined">favorite</span>
                <span class="like-count">0</span>
            </div>
        `;
        const favoriteButton = productCard.querySelector(".favorite");
        const likeCount = productCard.querySelector(".like-count");

        // Add click event to toggle heart color and increment like count
        favoriteButton.addEventListener("click", () => {
            favoriteButton.classList.toggle("hearted");
            const currentLikes = parseInt(likeCount.textContent, 10);
            if (favoriteButton.classList.contains("hearted")) {
                likeCount.textContent = currentLikes + 1;
            } else {
                likeCount.textContent = currentLikes - 1;
            }
        });
            productsGrid.appendChild(productCard);
        }
    });
})
.catch(error => console.error('Error loading JSON:', error));