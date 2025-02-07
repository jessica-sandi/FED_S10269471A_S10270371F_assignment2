const apiKey = "YOUR_RESTDB_API_KEY";
        const userCollection = "user-collection";
        const userId = "CURRENT_USER_ID"; // Replace with logic to fetch the logged-in user's ID.

        // Fetch user data from RestDB
        async function fetchUserData() {
            try {
                const response = await axios.get(
                    `https://YOUR_DATABASE_ID.restdb.io/rest/${userCollection}/${userId}`,
                    { headers: { "x-apikey": apiKey } }
                );
                const userData = response.data;

                // Populate the form with the user's data
                document.getElementById("name").value = userData.name || "";
                document.getElementById("email").value = userData.email || "";
                document.getElementById("password").value = userData.password || "";
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        // Update user data in RestDB
        async function updateUserData() {
            const updatedData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            };

            try {
                await axios.put(
                    `https://YOUR_DATABASE_ID.restdb.io/rest/${userCollection}/${userId}`,
                    updatedData,
                    { headers: { "x-apikey": apiKey } }
                );
                alert("Profile updated successfully!");
            } catch (error) {
                console.error("Error updating user data:", error);
                alert("Failed to update profile. Please try again.");
            }
        }

        // Event listener for the update button
        document.getElementById("update-btn").addEventListener("click", updateUserData);

        // Load the user's data when the page loads
        window.onload = fetchUserData;