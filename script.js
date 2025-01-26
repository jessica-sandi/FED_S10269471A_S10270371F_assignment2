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
