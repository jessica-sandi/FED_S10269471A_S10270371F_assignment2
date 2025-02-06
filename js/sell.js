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
                alert('Error fetching location: ' + error.message);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Update the location input field
function updateLocationField(lat, lng) {
    document.getElementById('location').value = `${lat}, ${lng}`;
}

// Upload image to ImgBB and return URL
function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append('image', file);

    // Replace with your ImgBB API Key
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
        alert('You can only upload up to 4 images. Please delete one to upload more.');
        return;
    }

    for (let i = 0; i < files.length; i++) {
        if (existingImages.length + i < 4) {
            uploadToImgBB(files[i]).then(imageURL => {
                // Add image preview with ImgBB URL
                addImagePreview(imageURL);
            }).catch(error => {
                alert('Error uploading image: ' + error);
            });
        } else {
            alert('You can only upload a total of 4 images.');
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

// Store data in RESTDB when form is submitted
document.getElementById('sellItem').addEventListener('click', () => {
    const itemData = {
        sellerID: "12345",
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        photosurl: [], // Array to store image URLs
        price: document.getElementById('price').value,
        subcategory: document.getElementById('subcategory').value,
        condition: document.getElementById('condition').value,
        active: true,
        location: document.getElementById('location').value,
        stock: document.getElementById('stock').value,
        listing_createdAt: new Date().toISOString(),
        listing_expiredAt: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()
    };
    console.log("Item Data being sent:", itemData);

    // Collect image URLs
    const images = document.querySelectorAll('.image-preview img');
    images.forEach(img => {
        itemData.photosurl.push(img.src);
    });

    // Submit item data to RESTDB
    fetch('https://assignment2db-2aad.restdb.io/rest/fashion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '678c8feb6f2ec083b7ee6d9c'
        },
        body: JSON.stringify(itemData)
    })
    .then(response => response.json())
    .then(() => {
        alert('Item listed successfully!');
        console.log('Item successfully added:', itemData);
    })
    .catch(error => {
        alert('Error listing item: ' + error.message);
    });
});
