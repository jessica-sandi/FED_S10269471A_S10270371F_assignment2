const fetchAndStoreData = () => {
    return Promise.all([
        // Fetch local data from product.json
        fetch('products.json')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching product.json:', error);
                return []; // Return empty array if fetching from product.json fails
            }),

        // Fetch data from RESTdb API
        fetch('https://mokesell-af7d.restdb.io/rest/product', {
            headers: { 'x-apikey': '67a7a6a193d83b27dc23521b' }
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching from RESTdb API:', error);
                return []; // Return empty array if fetching from API fails
            }),
        // Uncomment below APIs if needed
        /*
        fetch('https://assignment2db-2aad.restdb.io/rest/fashion', {
            headers: { 'x-apikey': '678c8feb6f2ec083b7ee6d9c' } 
        }).then(response => response.json()),
        
        fetch('https://assignment2-a8de.restdb.io/rest/fashion', {
            headers: { 'x-apikey': '67a7456d4d87445754828017' }  
        }).then(response => response.json()),
        
        fetch('https://mokesell-a998.restdb.io/rest/product', {
            headers: { 'x-apikey': '67a77d8c4d87445a4b828040' }  
        }).then(response => response.json())
        */
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
// Load liked products from localStorage
const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || {};

// Function to render products
const renderProducts = (allProducts) => {
    const productsGrid = document.getElementById('products-grid');

    allProducts.filter(product => product.category === 'kids' && product.active)
        .forEach(product => {
            const productLink = document.createElement('a');
            productLink.href = `productdetail.html?id=${product.productID}`;
            productLink.className = 'product-card';

            productLink.innerHTML = ` 
                <img src="${product.photosurl}" alt="${product.name}" class="product-image" />
                <div class="product-name">${product.name}</div>
                <div class="product-price">S$${product.price.toFixed(2)}</div>
                <div class="product-condition">${product.condition}</div>
                <div class="favorite">
                    <span class="material-icons-outlined ${likedProducts[product.productID] ? 'hearted' : ''}">favorite</span>
                </div>
            `;

            const favoriteButton = productLink.querySelector(".favorite");

            // Handle favorite button click
            favoriteButton.addEventListener("click", (event) => {
                event.preventDefault();

                if (favoriteButton.classList.contains("hearted")) {
                    // Unlike and remove from favorites
                    favoriteButton.classList.remove("hearted");

                    // Remove from likedProducts in localStorage
                    delete likedProducts[product.productID];

                    // Update localStorage
                    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));

                    // Remove from the favoriteProducts list in localStorage if it's there
                    let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
                    favoriteProducts = favoriteProducts.filter(p => p.productID !== product.productID);
                    localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
                } else {
                    // Like and add to favorites
                    favoriteButton.classList.add("hearted");

                    // Add to likedProducts in localStorage
                    likedProducts[product.productID] = true;
                    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));

                    // Optionally add to the favoriteProducts list
                    let favoriteProducts = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
                    if (!favoriteProducts.find(p => p.productID === product.productID)) {
                        favoriteProducts.push(product);
                        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
                    }
                }
            });

            productsGrid.appendChild(productLink);
        });
};

// Load data from localStorage or fetch if not available
const allProducts = [
    ...JSON.parse(localStorage.getItem('localProducts') || '[]'),
    ...JSON.parse(localStorage.getItem('restdbProducts') || '[]')
];

if (allProducts.length) {
    renderProducts(allProducts);
} else {
    fetchAndStoreData().then(renderProducts);
}
