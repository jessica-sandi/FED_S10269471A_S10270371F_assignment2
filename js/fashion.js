// document.addEventListener("DOMContentLoaded", async () => {
//     const restdbAPIKey = "678c8feb6f2ec083b7ee6d9c"; // Replace with your RestDB API Key
//     const restdbCollectionURL = "https://assignment2db-2aad.restdb.io/rest/fashion"; // Replace with your RestDB Collection URL

//     // Function to send products to RestDB
//     async function uploadProducts(products) {
//         try {
//             const response = await fetch(restdbCollectionURL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-apikey": restdbAPIKey
//                 },
//                 body: JSON.stringify(products) // Send multiple products at once
//             });
    
//             const responseData = await response.json();
//             console.log("Upload Response:", responseData);
    
//             if (!response.ok) {
//                 console.error("Failed to upload products", responseData);
//             }
//         } catch (error) {
//             console.error("Error uploading products:", error);
//         }
//     }
    
//     // Function to fetch products from RestDB
//     async function fetchProducts() {
//         try {
//             const response = await fetch(restdbCollectionURL, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-apikey": restdbAPIKey
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to fetch products");
//             }

//             return await response.json();
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     }

//     // Function to display products in the correct placeholders
//     async function displayProducts() {
//         const products = await fetchProducts();
//         const container = document.querySelector(".category .products");

//         if (!container) {
//             console.error("Product container not found");
//             return;
//         }

//         container.innerHTML = ""; // Clear existing content

//         products.forEach((product) => {
//             const productHTML = `
//                 <div class="product">
//                     <img src="${product.photosurl}" alt="${product.name}">
//                     <h2>${product.name}</h2>
//                     <p>${product.description || "No description available"}</p>
//                     <p>$${product.price}</p>
//                     <span class="favorite">❤️</span>
//                 </div>
//             `;
//             container.innerHTML += productHTML;
//         });
//     }

//     // Fetch local JSON and upload to RestDB
//     async function processLocalJSON() {
//         try {
//             const response = await fetch("products.json");
//             const localProducts = await response.json();
//             await uploadProducts(localProducts);
//             await displayProducts();
//         } catch (error) {
//             console.error("Error processing local JSON:", error);
//         }
//     }

//     // Initial processing and display
//     processLocalJSON();
// });
// Fetching the local JSON data file
// Fetch both local JSON data and RESTdb API data concurrently
// Function to fetch and store data in localStorage
const fetchAndStoreData = () => {
    return Promise.all([
        // Fetch data from local JSON file
        fetch('products.json').then(response => response.json()), 
        
        // Fetch data from RESTdb API
        /*fetch('https://assignment2db-2aad.restdb.io/rest/fashion', {
            headers: { 'x-apikey': '678c8feb6f2ec083b7ee6d9c' } 

        fetch('https://assignment2-a8de.restdb.io/rest/fashion', {
            headers: { 'x-apikey': '67a7456d4d87445754828017' }  
        })
        })*/
        fetch('https://mokesell-a998.restdb.io/rest/product', {
            headers: { 'x-apikey': '67a77d8c4d87445a4b828040' }  
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
    
    // Loop through women products from both data sources
    allProducts.filter(product => product.category === 'women' && product.active)
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
