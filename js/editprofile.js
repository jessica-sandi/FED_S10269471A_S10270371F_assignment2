document.addEventListener('DOMContentLoaded', async () => {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const updateButton = document.getElementById('update-btn');

    // const apiBaseURL = "https://assignment2db-2aad.restdb.io/rest/user-collection";
    // const apiKey = "678c8feb6f2ec083b7ee6d9c";
    // fetch('https://mokesell-af7d.restdb.io/rest/fashion', {
    //     headers: { 'x-apikey': '67a7a6a193d83b27dc23521b' }
    // })
    let recordId = null;

    async function fetchProfile() {
        try {
            const response = await fetch(apiBaseURL, {
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": apiKey
                }
            });

            const profiles = await response.json();
            if (profiles.length > 0) {
                const profile = profiles[0]; // Fetch the first profile found
                recordId = profile._id;
                nameField.value = profile.name || '';
                emailField.value = profile.email || '';
                passwordField.value = profile.password || '';
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    await fetchProfile();

    updateButton.addEventListener('click', async () => {
        if (!recordId) {
            alert('No record found to update.');
            return;
        }

        const updatedUserName = nameField.value;
        const updatedEmail = emailField.value;
        const updatedPassword = passwordField.value;

        try {
            const response = await fetch(`${apiBaseURL}/${recordId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": apiKey
                },
                body: JSON.stringify({
                    name: updatedUserName,
                    email: updatedEmail,
                    password: updatedPassword
                })
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                await fetchProfile(); // Refresh UI after update
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    });
});
