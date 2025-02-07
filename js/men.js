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
                <div class="product-price">$${product.price}</div>
                <div class="favorite">&hearts;</div>
            `;

            productsGrid.appendChild(productCard);
        }
    });
})
.catch(error => console.error('Error loading JSON:', error));