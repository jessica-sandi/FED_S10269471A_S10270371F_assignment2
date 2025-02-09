import 'js/alert.js';
    //SELL PAGE HANDLING 
    //custom alert
    function showAlert(message) {
    // Create the custom alert modal structure
    const alertModal = document.createElement('div');
    alertModal.id = 'custom-alert';
    alertModal.classList.add('custom-alert');
    
    const alertContent = document.createElement('div');
    alertContent.classList.add('alert-content');
    
    const alertMessage = document.createElement('p');
    alertMessage.id = 'alert-message';
    alertMessage.textContent = message; // Set the message dynamically
    
    const closeButton = document.createElement('button');
    closeButton.id = 'close-alert';
    closeButton.classList.add('close-alert');
    closeButton.textContent = 'OK';
    
    // Append the content to the modal
    alertContent.appendChild(alertMessage);
    alertContent.appendChild(closeButton);
    alertModal.appendChild(alertContent);
    
    // Append the modal to the body
    document.body.appendChild(alertModal);
    
    // Add the event listener to close the alert when the button is clicked
    closeButton.addEventListener('click', function () {
        alertModal.remove(); // Remove the modal from the DOM when closed
    });
    
    const style = document.createElement('style');
        style.innerHTML = `
            .custom-alert {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
                z-index: 9999; /* Ensure it appears above everything else */
            }
            
            .alert-content {
                background: #E6E6FA;
                padding: 20px;
                border-radius: 25px;
                max-width: 400px;
                width: 80%;
                text-align: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            }
            
            #alert-message {
                font-size: 16px;
                color: #003366;
                margin-bottom: 20px;
            }
            
            .close-alert {
                background-color: #003366;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 14px;
            }
            
            .close-alert:hover {
                background-color: #005093;
            }
        `;
        document.head.appendChild(style);
    }
// Toggle visibility based on deal method selection (Meet Up or Delivery)
function toggleDealMethod() {
    const isMeetUp = document.getElementById('meetup').checked;
    const meetupOptions = document.getElementById('meetup-options');
    const deliveryOptions = document.getElementById('delivery-options');

    if (isMeetUp) {
        // Show Meet Up options, hide Delivery options
        meetupOptions.style.display = 'block';
        deliveryOptions.style.display = 'none';
    } else {
        // Show Delivery options, hide Meet Up options
        meetupOptions.style.display = 'none';
        deliveryOptions.style.display = 'block';
    }
}
//LOCATION HANDLING
let map;
let marker;
let geocoder;
let autocomplete;

// Initialize the map
function initMap() {
    const singapore = { lat: 1.3521, lng: 103.8198 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: singapore,
        zoom: 12
    });
    geocoder = new google.maps.Geocoder();
    marker = new google.maps.Marker({
        map: map,
        position: singapore,
        draggable: true
    });

    // Update location when marker is dragged
    google.maps.event.addListener(marker, 'dragend', function() {
        const position = marker.getPosition();
        updateLocationField(position.lat(), position.lng());
    });

    // Autocomplete for location search
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('search-location'),
        { types: ['geocode'] }
    );
    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            map.setCenter(place.geometry.location);
            marker.setPosition(place.geometry.location);
            updateLocationField(place.geometry.location.lat(), place.geometry.location.lng());
        }
    });
}

// Get user's current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(userLocation);
                marker.setPosition(userLocation);
                updateLocationField(userLocation.lat, userLocation.lng);
                // Clear the search location field when the user's location is updated
                document.getElementById('search-location').value = '';
            },
            function(error) {
                showAlert('Error fetching location: ' + error.message);
            }
        );
    } else {
        showAlert("Geolocation is not supported by this browser.");
    }
}

// Update the location input field
function updateLocationField(lat, lng) {
    document.getElementById('location').value = `${lat}, ${lng}`;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//IMAGE HANDLING
// Upload image to ImgBB and return URL
function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);

    const imgBB_API_KEY = 'ff8c998f52b599180a08523f236288b0';

    return fetch(`https://api.imgbb.com/1/upload?key=${imgBB_API_KEY}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data.data.url; // Return image URL
        } else {
            throw new Error('Failed to upload image to ImgBB');
        }
    })
    .catch(error => {
        console.error('Error uploading image to ImgBB:', error);
        throw error;
    });
}

// Handle image preview and upload
document.getElementById('photos').addEventListener('change', function(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('image-preview-container');
    const existingImages = document.querySelectorAll('.image-preview');

    // Limit to 4 images
    if (existingImages.length >= 4) {
        showAlert('You can only upload up to 4 images. Please delete one to upload more.');
        return;
    }

    for (let i = 0; i < files.length; i++) {
        if (existingImages.length + i < 4) {
            const file = files[i];
            uploadToImgBB(file).then(imageURL => {
                console.log("Image URL:", imageURL);
                // Add image preview with ImgBB URL
                addImagePreview(imageURL);
            }).catch(error => {
                showAlert('Error uploading image: ' + error);
            });
        } else {
            showAlert('You can only upload a total of 4 images.');
            break;
        }
    }
});

// Add image preview
function addImagePreview(imageURL) {
    const previewContainer = document.getElementById('image-preview-container');
    const previewDiv = document.createElement('div');
    previewDiv.classList.add('image-preview');

    previewDiv.innerHTML = `
        <img src="${imageURL}" alt="Uploaded Image">
        <button class="delete-btn" onclick="removeImage(this)">X</button>
    `;

    previewContainer.appendChild(previewDiv);
}

// Remove image preview
function removeImage(button) {
    const previewDiv = button.closest('.image-preview');
    previewDiv.remove();
}

// Get the latest productID from the collection (or P100 if no products exist)
/*function getLatestProductId() {
    return fetch('https://assignment2db-2aad.restdb.io/rest/fashion', {
        method: 'GET',
        headers: {
            'x-apikey': '678c8feb6f2ec083b7ee6d9c'
        }

function getLatestProductId() {
    return fetch('https://assignment2-a8de.restdb.io/rest/fashion', {
        method: 'GET',
        headers: {
            'x-apikey': '67a7456d4d87445754828017'
        }   
function getLatestProductId() {
    return fetch('https://mokesell-a998.restdb.io/rest/product', {
        method: 'GET',
        headers: {
            'x-apikey': '67a77d8c4d87445a4b828040'
        }        
        */
function getLatestProductId() {
    return fetch('https://mokesell-af7d.restdb.io/rest/fashion', {
        method: 'GET',
        headers: {
            'x-apikey': '67a7a6a193d83b27dc23521b'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            // Extract the numeric part of the productID and increment it
            const lastProductId = data[0].productID;
            const numericPart = parseInt(lastProductId.replace('P', ''));
            return 'P' + (numericPart + 1);  // Increment and return the new productID
        } else {
            // If no products exist, return P100
            return 'P100';
        }
    })
    .catch(error => {
        console.error("Error fetching the latest productID:", error);
        return 'P100';  // If an error occurs, start with P100
    });
}
// Validate fields before submission
function validateFields(itemData) {
    const requiredFields = ['name', 'description', 'price', 'category', 'groups', 'condition', 'location', 'stock'];
    for (let field of requiredFields) {
        if (!itemData[field] || itemData[field].trim() === '') {
            showAlert(`Please fill in the ${field} field.`);
            return false;
        }
    }
    return true;
}


// Store data in RESTDB when form is submitted
document.getElementById('sellItem').addEventListener('click', () => {
    // Retrieve userID from session storage
    const userID = sessionStorage.getItem('userID');
    
    // Get the latest product ID (e.g., P100, P101, etc.)
    getLatestProductId().then(latestProductId => {
        const itemData = {
            productID: latestProductId, // Assign the generated product ID
            sellerID: userID,
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            photosurl: [], // Array to store image URLs
            price: document.getElementById('price').value,
            category: document.getElementById('category').value,
            groups: document.getElementById('groups').value,
            condition: document.getElementById('condition').value,
            active: true,
            location: document.getElementById('location').value,
            stock: document.getElementById('stock').value,
            listingcreatedAt: new Date().toISOString(),
            listingexpiredAt: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()
        };
        // Validate the form fields before proceeding
        if (!validateFields(itemData)) {
            return;  // Stop further execution if validation fails
        }   

        console.log("Item Data being sent:", itemData);

        // Collect image URLs
        const images = document.querySelectorAll('.image-preview img');
        images.forEach(img => {
            itemData.photosurl.push(img.src);
        });

        // Submit item data to RESTDB
        /*fetch('https://assignment2db-2aad.restdb.io/rest/fashion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '678c8feb6f2ec083b7ee6d9c'
            },

         fetch('https://assignment2-a8de.restdb.io/rest/fashion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '67a7456d4d87445754828017'
            },
         fetch('https://mokesell-a998.restdb.io/rest/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '667a77d8c4d87445a4b828040'
            },
            */
        fetch('https://mokesell-af7d.restdb.io/rest/fashion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '67a7a6a193d83b27dc23521b'
            },
            body: JSON.stringify(itemData)
        })
        .then(response => response.json())
        .then(() => {
            console.log('Item successfully added:', itemData);
            // Prompt user to add more items or return to index
            const action = confirm('Item listed successfully! Would you like to add another item? Click "Cancel" to return to the homepage.');
            if (action) {
                // If user chooses to add another item, reset the form
                document.getElementById('sellItemForm').reset(); 
                // Optionally clear images preview
                document.getElementById('image-preview-container').innerHTML = '';
            } else {
                // If user clicks "Cancel", redirect to index.html
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            showAlert('Error listing item: ' + error.message);
        });
    }).catch(error => {
        console.error('Error fetching the latest product ID:', error);
        showAlertalert('Failed to generate product ID. Please try again.');
    });
});
