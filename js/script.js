//ACCOUNT HANDLING ON SESSION STORAGE
// redirect users if not authenticated
document.addEventListener('click', function(event) {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        event.preventDefault(); // Prevent default behavior like following links
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

// Auto log out after a certain time
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SELL BUTTON HANDLING - check user role
// SELL BUTTON HANDLING - check user role
function handleSellClick() {
    // Retrieve the user's username and ID from sessionStorage
    const userName = sessionStorage.getItem('userName');
    const userID = sessionStorage.getItem('userID');

    if (!userName) {
        return;
    }

    // Check if the user data is already available in sessionStorage
    const storedUserData = sessionStorage.getItem(`userID_${userName}`);
    if (storedUserData) {
        const user = JSON.parse(storedUserData);
        processUserRole(user, userID);
    } else {
        // Fetch the user's data from RESTdb if not found in sessionStorage
        /*fetch(`https://assignment2db-2aad.restdb.io/rest/user-collection?q={"name":"${userName}"}`, {
            method: 'GET',
            headers: {
                'x-apikey': '678c8feb6f2ec083b7ee6d9c'  
            }
        })
         
        fetch(`https://assignment2-a8de.restdb.io/rest/user-collection?q={"name":"${userName}"}`, {
            method: 'GET',
            headers: {
                'x-apikey': '67a7456d4d87445754828017'  
            }
        })
        fetch(`https://mokesell-a998.restdb.io/rest/user-collection?q={"name":"${userName}"}`, {
            method: 'GET',
            headers: {
                'x-apikey': '67a77d8c4d87445a4b828040'  
            }
        })
        */
        fetch(`https://mokesell-af7d.restdb.io/rest/user-collection?q={"name":"${userName}"}`, {
            method: 'GET',
            headers: {
                'x-apikey': '67a7a6a193d83b27dc23521b' 
            }
        })
        .then(response => response.json())
        .then(users => {
            // Find the user by their username
            const user = users.find(u => u.name === userName);
            if (!user) {
                alert('User not found.');
                return;
            }

            // Store the fetched user data in sessionStorage for future use
            sessionStorage.setItem(`user_${userName}`, JSON.stringify(user));

            // Process the user role
            processUserRole(user, userID);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('An error occurred. Please try again.');
        });
    }
}

// Function to process the user role
function processUserRole(user, userID) {
    if (user.role && user.role.includes('buyer') && !user.role.includes('seller')) {
        // If the user is a buyer, prompt them to become a seller
        const userWantsToSell = confirm("You are currently a buyer. Do you want to become a seller?");
        if (userWantsToSell) {
            // Add 'seller' role if the user wants to become a seller
            const newRoles = user.role + ',seller'; // Keep 'buyer' role and add 'seller'
            updateUserRole(user._id, newRoles, userID) // Update the user role
                .then(() => {
                    // Reload the user data after role update
                    alert("You are now a seller! Redirecting...");
                    sessionStorage.setItem('isAuthenticated', 'true'); // Ensure session is marked as authenticated
                    window.location.href = 'sell.html'; // Redirect to sell page after role update
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
        alert('Unknown role or invalid user data.');
    }
}

//UPDATE USER ROLE FROM BUYER TO BUYER,SELLER
function updateUserRole(userId, newRoles,userID) {
    // Log the userId and roles to make sure they are correct
    console.log(`Updating user role for userId: ${userId} to roles: ${newRoles}`);

    /*return fetch(`https://assignment2db-2aad.restdb.io/rest/user-collection/${userId}`, {
        method: 'PUT',
        headers: {
            'x-apikey': '678c8feb6f2ec083b7ee6d9c',
            'Content-Type': 'application/json'
        },
       
    return fetch(`https://assignment2-a8de.restdb.io/rest/user-collection/${userId}`, {
        method: 'PUT',
        headers: {
            'x-apikey': '67a7456d4d87445754828017',
            'Content-Type': 'application/json'
        },
        
    return fetch(`https://mokesell-a998.restdb.io/rest/user-collection/${userId}`, {
        method: 'PUT',
        headers: {
            'x-apikey': '667a77d8c4d87445a4b828040',
            'Content-Type': 'application/json'
        },
        */
        return fetch(`https://mokesell-af7d.restdb.io/rest/user-collection/${userId}`, {
            method: 'PUT',
            headers: {
                'x-apikey': '67a7a6a193d83b27dc23521b',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                role: newRoles, // Update roles dynamically
                sellerID: userID  
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user role');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log('User role updated successfully:', data);
            return data;
        })
        .catch(error => {
            console.error('Error updating role:', error);
            throw error; // Propagate error to be handled by calling function
        });
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CHATBOT MESSAGE
const chatIcon = document.getElementById("chatbox-container");
const chatbotPopup = document.getElementById("chatbot-popup");
const closeChatBtn = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatboxBody = document.getElementById("chatbox-body");

const botResponses = {
    "delivery": "We offer a delivery service but buyer have to pay for it or meet up with the seller",
    "returns": "You can return items within 30 days. For pre-owned items, they must be in original condition. If seller don't allow return, they must put in product description.",
    "payment": "We accept all major credit cards and PayNow. Your payment is secured through encryption. For meet-up Cash-On-Delivery should be accepted unless otherwise stated",
    "brand new": "We have a wide selection of brand new fashion items. Check them out on our homepage!",
    "pre-owned": "We sell authenticated pre-owned fashion items. Each product has its condition clearly listed in the description.",
    "size": "Seller would state it on product description",
    "account": "Edit account info by pressing on you username",
    "sell": "Want to start selling? Press the Sell button and start uploading item to sell!",
    "help": "I can help you with orders, shipping, returns, product info, account, start selling? and more. Just ask me anything!",
};

function addMessageToChat(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatboxBody.appendChild(messageDiv);
    chatboxBody.scrollTop = chatboxBody.scrollHeight;
}

function handleUserInput(input) {
    let response = "Sorry, I didn't understand that. Please try asking something else.";
    
    for (const key in botResponses) {
        if (input.toLowerCase().includes(key)) {
            response = botResponses[key];
            break;
        }
    }
    
    return response;
}

// Open Chatbot when clicking the chat icon
chatIcon.addEventListener("click", function() {
    chatbotPopup.style.display = 'flex';  // Show the popup
});

// Close the chatbot when clicking the close button
closeChatBtn.addEventListener("click", function() {
    chatbotPopup.style.display = 'none';  // Hide the popup
});

// Handle user input and send response
sendBtn.addEventListener("click", function() {
    const userQuestion = userInput.value.trim();
    if (userQuestion) {
        addMessageToChat(userQuestion, "user");
        const botAnswer = handleUserInput(userQuestion);
        setTimeout(() => addMessageToChat(botAnswer, "bot"), 1000);
        userInput.value = "";
    }
});

// Handle pressing Enter to send the message
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//NOTIFICATION HANDLING
// Variable to store the fetched notifications
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTIFICATION HANDLING
// Variable to store the fetched notifications
let notifications = []; 

// Fetch notifications data from external JSON file
function fetchNotifications() {
    fetch('json/notifications.json')
        .then(response => response.json())
        .then(data => {
            notifications = data;  // Assign JSON data to notifications variable
            storeDiscountCodesFromNotifications();  // Store discount codes directly in sessionStorage
            addSpinVoucherNotification();  // Add spin voucher notification (if any)
            updateNotificationCount();  // Update notification count
        })
        .catch(error => console.error('Error loading notifications:', error));
}

// Add the Spin Voucher notification to the notifications list
function addSpinVoucherNotification() {
    // Retrieve the spinVoucher from sessionStorage
    const spinVoucher = sessionStorage.getItem('spinVoucher'); 

    if (spinVoucher) {
        // Create a new notification for the spin voucher
        const spinVoucherNotification = {
            id: notifications.length + 1,
            title: 'Spin the Wheel Voucher!',
            message: 'You\'ve received a discount code from spinning the wheel.',
            discountCode: spinVoucher // This is the spinVoucher stored in sessionStorage
        };
        
        // Add the spin voucher notification to the notifications array
        notifications.unshift(spinVoucherNotification);

        // Save the spin voucher code to sessionStorage
        saveDiscountCodesToSession(spinVoucher);
    }
}

// Save discount codes to sessionStorage (when retrieved from notifications)
function saveDiscountCodesToSession(discountCode) {
    // Retrieve existing discount codes from sessionStorage
    let existingDiscountCodes = JSON.parse(sessionStorage.getItem('discountCodes')) || [];

    // Add the new discount code to the list if it's not already there
    if (!existingDiscountCodes.includes(discountCode)) {
        existingDiscountCodes.push(discountCode);
    }

    // Save the updated list of discount codes back to sessionStorage
    sessionStorage.setItem('discountCodes', JSON.stringify(existingDiscountCodes));
}

// Store all discount codes from notifications into sessionStorage
function storeDiscountCodesFromNotifications() {
    // Loop through all notifications to extract the discountCode and store them
    notifications.forEach(notification => {
        if (notification.discountCode) {
            // Store the discount code only if it's not already stored
            saveDiscountCodesToSession(notification.discountCode);
        }
    });
}

// Update the notification count
function updateNotificationCount() {
    const countElement = document.getElementById('notification-count');
    
    // Check if there are any notifications
    const unreadNotifications = notifications.length;

    if (unreadNotifications > 0) {
        // If there are unread notifications, show the count
        countElement.style.display = 'flex';
        countElement.textContent = unreadNotifications;
    } else {
        // Hide the count if no notifications
        countElement.style.display = 'none';
    }
}

// Toggle popup visibility
function togglePopup() {
    const popup = document.getElementById('discountPopup');
    
    // If the popup exists, toggle visibility
    if (popup) {
        popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
    } else {
        // If the popup doesn't exist, create and display it
        createNotificationPopup();
    }
}

// Create the notification popup with data from JSON
function createNotificationPopup() {
    if (notifications.length === 0) {
        console.log("No notifications available.");
        return;  // Do not create a popup if there are no notifications
    }

    // Create the popup container (only if it doesn't already exist)
    const existingPopup = document.getElementById('discountPopup');
    if (existingPopup) {
        // If the popup already exists, just toggle its visibility
        existingPopup.style.display = 'block';
        return;
    }

    const popupContainer = document.createElement('div');
    popupContainer.id = 'discountPopup';
    popupContainer.className = 'discount-popup';
    
    // Loop through notifications and add each one to the popup
    notifications.forEach(notification => {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'notification-item';

        notificationDiv.innerHTML = `
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <p><strong>Discount Code:</strong> ${notification.discountCode}</p>
        `;
        
        popupContainer.appendChild(notificationDiv);
    });

    // Append to the body (or a specific container)
    document.body.appendChild(popupContainer);

    // Add event listener to close the popup if clicking outside
    document.addEventListener('click', function(event) {
        const popup = document.getElementById('discountPopup');
        const notificationContainer = document.querySelector('.notification-container');

        // Close popup if clicked outside of both the popup and the notification icon
        if (popup && !popup.contains(event.target) && !notificationContainer.contains(event.target)) {
            popup.style.display = 'none';
        }
    });
}

// Call this function when the page loads
fetchNotifications();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CART ICON HANDLING
// Function to update the cart item count in the cart icon
// Navigate to the cart page when the cart icon is clicked
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the cart icon after the DOM is fully loaded
        document.getElementById('cart-container').addEventListener('click', function() {
            window.location.href = 'cart.html';  // Redirect to the cart page
        });

        // Assuming userID is stored in sessionStorage
        const userID = sessionStorage.getItem('userID');
        if (userID) {
            updateCartItemCount(userID);
        }
    });

function updateCartItemCount(userID) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter items by the logged-in user
    const userCartItems = cart.filter(item => item.userID === userID);

    // Calculate the total number of items in the cart
    let totalItemCount = 0;
    userCartItems.forEach(item => {
        totalItemCount += parseInt(item.quantity, 10); 
    });

    // Get the cart icon element
    const cartIcon = document.getElementById('cart-container');
    let cartCount = cartIcon.querySelector('.cart-item-count');

    if (!cartCount) {
        // If the count element doesn't exist, create it
        cartCount = document.createElement('span');
        cartCount.className = 'cart-item-count';
        cartIcon.appendChild(cartCount);
    }

    // Update the count displayed on the cart icon
    cartCount.textContent = totalItemCount > 0 ? totalItemCount : '';
}


