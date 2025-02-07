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
fetch('products.json')
.then(response => response.json())
.then(data => {
    const productsGrid = document.getElementById('products-grid');

    data.forEach(product => {
        // Only display products in the "Women" category and are active
        if (product.category === 'women' && product.active) {
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
