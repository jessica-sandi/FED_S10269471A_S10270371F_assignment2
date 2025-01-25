    // Redirect users if not authenticated
    document.addEventListener('click', function(event) {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated && !event.target.closest('.container')) {
            alert('You must be logged in to perform this action.');
            window.location.href = 'loginsignup.html';
        }
    });

    // Update profile text on the main page
    function updateProfileText() {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const profileText = document.getElementById('profile-text');

        if (isAuthenticated) {
            const userName = localStorage.getItem('userName');
            profileText.textContent = `Welcome, ${userName}!`;
            profileText.parentElement.href = '#'; // disable login link
        }
    }

    updateProfileText();