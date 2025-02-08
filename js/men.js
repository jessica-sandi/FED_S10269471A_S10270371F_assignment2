// Function to fetch and store data in localStorage
const fetchAndStoreData = () => {
    return Promise.all([
        // Fetch data from local JSON file
        fetch('products.json').then(response => response.json()), 
        
        // Fetch data from RESTdb API
        /*fetch('https://assignment2db-2aad.restdb.io/rest/fashion', {
            headers: { 'x-apikey': '678c8feb6f2ec083b7ee6d9c' } 
        })
        fetch('https://assignment2-a8de.restdb.io/rest/fashion', {
            headers: { 'x-apikey': '67a7456d4d87445754828017' }  
        })
        fetch('https://mokesell-a998.restdb.io/rest/product', {
            headers: { 'x-apikey': '67a77d8c4d87445a4b828040' }  
        }).then(response => response.json())
        */
        fetch('https://mokesell-af7d.restdb.io/rest/product', {
            headers: { 'x-apikey': '67a7a6a193d83b27dc23521b' }  
        }).then(response => response.json())
    ])
    .then(([localData, restdbData]) => {
        // Store both local data and RESTdb data in localStorage
        localStorage.setItem('localProducts', JSON.stringify(localData));
        localStorage.setItem('restdbProducts', JSON.stringify(restdbData));
        
        // Combine both local and RESTdb products data
        return [...localData, ...restdbData];
    })
    .catch(error => console.error('Error loading data from both sources:', error));
};

// Function to render products
const renderProducts = (allProducts) => {
    const productsGrid = document.getElementById('products-grid');
    
    // Loop through men products from both data sources
    allProducts.filter(product => product.category === 'men' && product.active)
        .forEach(product => {
            // Create a link to the product detail page with the productID in the URL
            const productLink = document.createElement('a');
            productLink.href = `productdetail.html?id=${product.productID}`;  // Using productID as the unique identifier
            productLink.className = 'product-card'; // Add a class to style the card
            
            // Add the product card content inside the <a> tag
            productLink.innerHTML = `
                <img src="${product.photosurl}" alt="${product.name}" class="product-image" />
                <div class="product-name">${product.name}</div>
                <div class="product-price">S$${product.price.toFixed(2)}</div>
                <div class="product-condition">${product.condition}</div>
                <div class="favorite">
                    <span class="material-icons-outlined">favorite</span>
                    <span class="like-count">0</span>
                </div>
            `;
            
            // Handle favorite button click
            const favoriteButton = productLink.querySelector(".favorite");
            const likeCount = productLink.querySelector(".like-count");

            favoriteButton.addEventListener("click", (event) => {
                // Prevent the link click from triggering when the heart icon is clicked
                event.stopPropagation(); // This ensures only the heart button is affected
                favoriteButton.classList.toggle("hearted");
                
                // Increment or decrement the like count based on heart toggle state
                likeCount.textContent = parseInt(likeCount.textContent) + (favoriteButton.classList.contains("hearted") ? 1 : -1);
            });

            // Append the productLink to the productsGrid
            productsGrid.appendChild(productLink);
        });
};

// Load data from localStorage or fetch if not available
const allProducts = [
    ...JSON.parse(localStorage.getItem('localProducts') || '[]'), 
    ...JSON.parse(localStorage.getItem('restdbProducts') || '[]')
];

// If products are available in localStorage, render them. Otherwise, fetch and render
if (allProducts.length) {
    renderProducts(allProducts);
} else {
    fetchAndStoreData().then(renderProducts);
}
