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
