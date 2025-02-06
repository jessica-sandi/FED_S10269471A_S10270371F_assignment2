// redirect users if not authenticated
document.addEventListener('click', function(event) {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        showLottieAlert();
    }
});
// show Lottie animation as alert
function showLottieAlert() {
    // show overlay with Lottie animation
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';  // show overlay
    //a timer for redirection 
  setTimeout(function() {
    window.location.href = 'loginsignup.html';  // redirect after 3 seconds
  }, 3000);
  }
// Update profile text on the main page
function updateProfileText() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    const profileText = document.getElementById('profile-text');

    if (isAuthenticated) {
        const userName = sessionStorage.getItem('userName');
        profileText.textContent = `Welcome, ${userName}!`;
        profileText.parentElement.href = '#'; // Disable login link after login
    } else {
        profileText.textContent = 'Sign Up / Login';
        profileText.parentElement.href = 'loginsignup.html'; // Enable login link if not authenticated
    }
}

// Log out function - clears sessionStorage data
function logOutUser() {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userName');
    alert('You have logged out.');
    window.location.href = 'loginsignup.html';  // Redirect to login page
}

// Auto log out after a certain time (for testing purposes)
function setupAutoLogout() {
    const logoutTime = 2160000; // 6 hours
    setInterval(() => {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
        if (isAuthenticated) {
            const lastLogin = sessionStorage.getItem('lastLogin');
            const currentTime = Date.now();
            if (lastLogin && currentTime - lastLogin > logoutTime) {
                logOutUser();
            }
        }
    }, 60000); // Check every minute if the user needs to be logged out
}

// Track the last login time to trigger auto logout
function updateLastLoginTime() {
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
        sessionStorage.setItem('lastLogin', Date.now().toString());
    }
}

// Update profile text on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProfileText();
    updateLastLoginTime(); // Update the last login time when the page loads
    setupAutoLogout(); // Start the auto logout check
});


function handleSellClick() {
    // Retrieve the user's username from sessionStorage
    const userName = sessionStorage.getItem('userName');

    if (!userName) {
        alert("User not logged in.");
        return;
    }

    // Fetch the user's data from the database using the username
    fetch(`https://assignment2db-2aad.restdb.io/rest/user-collection?q={"name":"${userName}"}`, {
        method: 'GET',
        headers: {
            'x-apikey': '678c8feb6f2ec083b7ee6d9c' // Your API key for authentication
        }
    })
    .then(response => response.json())
    .then(users => {
        // Assuming the response is an array, find the user by their username
        const user = users.find(u => u.name === userName);

        if (!user) {
            alert('User not found.');
            return;
        }

        // Log the user data to inspect the response
        console.log("Fetched user data:", user);

        // Check if the user has 'buyer' role
        if (user.role && user.role.includes('buyer') && !user.role.includes('seller')) {
            // If the user is a buyer, prompt them to become a seller
            const userWantsToSell = confirm("You are currently a buyer. Do you want to become a seller?");

            if (userWantsToSell) {
                // Add 'seller' role if the user wants to become a seller
                updateUserRole(user._id, 'buyer,seller') // Adding 'seller' role while keeping 'buyer'
                    .then(() => {
                        // Redirect the user to sell.html after updating their role
                        window.location.href = 'sell.html';
                    })
                    .catch(error => {
                        alert('Error updating role: ' + error.message);
                    });
            } else {
                // If user doesn't want to change their role, return to index.html
                window.location.href = 'index.html';
            }
        } else if (user.role && user.role.includes('buyer,seller')) {
            // If the user is already a seller, proceed to sell.html
            window.location.href = 'sell.html';
        } else {
            alert('Unknown role.');
        }
    })
    .catch(error => {
        console.error('Error fetching user data: ', error);
        alert('An error occurred. Please try again.');
    });
}

function updateUserRole(userId, newRoles) {
    // Log the userId and roles to make sure they are correct
    console.log(`Updating user role for userId: ${userId} to roles: ${newRoles}`);

    return fetch(`https://assignment2db-2aad.restdb.io/rest/user-collection/${userId}`, {
        method: 'PUT',
        headers: {
            'x-apikey': '678c8feb6f2ec083b7ee6d9c',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            role: newRoles })
    })
    .then(response => {
        console.log("Response status:", response.status);
        return response.text();  // Log the raw response text
    })
    .then(text => {
        console.log("Response text:", text);  // Log the response body (error or success message)
        if (text) {
            throw new Error("Failed to update role: " + text);
        }
        return JSON.parse(text);  // Parse the JSON if no errors
    })
    .then(data => {
        console.log("Role updated successfully:", data);
    })
    .catch(error => {
        console.error("Error updating role:", error);
    });
    
}