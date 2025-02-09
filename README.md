# FED_S10269471A_S10270371F_assignment2

# MokeSell

Tired of clutter? Looking for unique finds? MokeSell is the ultimate online marketplace where you can buy and resell both new and pre-owned items with ease! Whether you're upgrading your wardrobe or hunting for the best deals, MokeSell connects you with a vibrant community of buyers and sellers.

With features like favorites, shopping cart, chatbot support, user followings, and trusted reviews, MokeSell isn't just another shopping site—it’s a social shopping revolution! Sell what you no longer need, shop for what you love, and connect with like-minded shoppers—all in one seamless platform. Ready to turn your closet into cash? Join MokeSell today! 
 
## Design Process
### Who Is This Website For?

MokeSell is designed for buyers and sellers who want a seamless and engaging online shopping experience. Whether someone is looking to purchase trendy fashion items, resell pre-owned goods, or connect with other shoppers, our platform provides the perfect space to browse, buy, sell, and interact with others.
## What Users Want to Achieve & How MokeSell Helps

Our users seek a convenient, secure, and community-driven marketplace where they can:  
✅ Easily list and sell both new and second-hand products.  
✅ Find and purchase unique fashion items at great prices.  
✅ Save favorites and manage their shopping carts.  
✅ Follow their favorite sellers and stay updated on their listings.  
✅ Engage in reviews to ensure trust and quality.  
✅ Get instant support through a chatbot for a smooth shopping experience.  

MokeSell delivers all these features in a visually appealing, user-friendly, and socially engaging platform.

- As a teenager who is always wanting to up to date to trends, I want to browse a variety of products, so that I can find and purchase items that match my style and budget.
* As someone who is trying to make money from clothes that I don't wear anymore, I want to list my products easily, so that I can reach potential buyers and make sales.
+ As someone who always love to shop and check things online whenever I am free, I want to add items to my favorites, so that I can revisit and purchase them later.
- As someone who is indecisive and take too long while choosing, I want to add items to my cart, so that I can quickly check out when ready.
- As an online shopper who loves checking online shopping websites, I want to follow other users, so that I can stay updated on their new listings.
- As a shopper, I want to leave reviews for sellers, so that I can share my experience and help others make informed decisions and other people's reviews will make me trust the seller too!
- As a start-up seller, I want to receive ratings and reviews, so that I can build credibility, gain more trust and attract more buyers.
- As a user who don't know how to use new websites that much, I want chatbot assistance, so that I can get instant help whenever I need it.
  
We followed a user-centric design approach, creating wireframes and mockups to ensure a smooth and intuitive experience.
wireframe: https://www.figma.com/design/eViDzYXrPIrbA10eegyMGR/FED_S10270371F_S10269471A_Assignment2_wireframe?node-id=0-1&t=ngMwH2Frax0UMLze-1  
These wireframes helped us structure the website for optimal usability and visual appeal, ensuring MokeSell meets the needs of both buyers and sellers effortlessly


## Features

### 1. User Authentication

    Login/Sign-up:
        Login: Users log in using their email and password.
        Sign-up: Users create an account with a username, email, and password.
        Google reCAPTCHA: Both login and sign-up pages feature Google reCAPTCHA to authenticate users.
        Input Validation: All form fields are validated (e.g., proper email format, strong password).

### 2. Navigation Bar

The top navigation bar across all main pages and includes the following sections:

    Logo: Clicking the logo redirects to the homepage (index).
    Women: Navigates to the women's fashion product page.
    Men: Navigates to the men's fashion product page.
    Kids: Navigates to the kids' fashion product page.
    Profile: Displays the logged-in user’s name with options to:
        Login (if the user is not logged in).
        Log out (if the user is logged in).
        View and edit the user’s profile.
    Favorite: Leads to the user’s “Favorites” page to view liked items.
    Cart: Leads to the cart page to view items added to the cart.
    Notifications: Displays any active discount codes or promotions.
    Sell: Navigates to the product listing page where users can sell their own items.
    Chatbot: Provides a FAQ chatbot to answer common user queries.

### 3. Login/Sign-up Pages

    Login: Users enter their email and password.
    Sign-up: Users enter a username, email, and password.
    Google reCAPTCHA: A Google reCAPTCHA is implemented for both login and sign-up to prevent bot activity.
    Input Validation: Ensures the correct format for emails and passwords.

### 4. Homepage (Index Page)

    Carousel: Features a rotating set of promotional items with links to the respective category/product pages.
    Category Cards: Displays clickable cards for easy navigation based on product categories (e.g., women, men, kids) and subcategories.

### 5. Product Pages

    Categories: Separate pages for Women, Men, and Kids’ fashion products.
    Product Display: Items are displayed in card format showing:
       - Search funtion
       - Product image.
        -Price.
        -Condition (new or used).
    Favorite: Users can click a "like" button to add items to their favorites.
    Product Details: Clicking on a product card opens a detailed view, including the item’s location and an option to add it to the cart.
    Quantity Control: Maximum of 3 items per product, unless the stock falls below 3.
    Product Ratings: Display average ratings for products, if available.

### 6. Cart Page

    Cart Overview: Shows all items added to the cart.
    Item Removal: Users can remove items from the cart.
    Total Price: Displays the total price, including GST.
    Discount Codes: Users can apply discount codes to update the cart price.
    Checkout: Users can proceed to checkout or continue shopping.

### 7. Checkout & Payment Page

    Shipping Options: Users can choose between:
        Meet-up: Payment is made via cash on delivery.
        Delivery: Payment is made via credit card.
    Card Payment: For delivery, users can enter credit card details, with validation for card number, expiry date, and security code.
    Order Placement: Once payment details are confirmed, users can place their order.

### 8. Sell Page

    Product Listing: Users can list products they want to sell.
    Location: Users can add their location using the Google Maps API to provide a meetup location for buyers.
    Successful Listings: Successfully listed products appear in the appropriate category (women, men, kids, etc.).

### 9. Profile Page

    View Profile: Displays user profile information.
    Edit Profile: Allows users to edit their profile details (e.g., username, password).
    Sign Out: Option to sign out of the account.

### 10. Notifications

    Discounts and Promotions: Displays active discount codes and promotional offers for the user.
    Spin Wheel discount codes will appear here also

### 11. Chatbot

    FAQ Chatbot: Provides instant answers to frequently asked questions about the site and services.
    
### 12. Spin Wheel

    To get discount codes
    
### 13. Footer
      leads to useful links
### 14. Others

    We added appropriate styling and validations for each codes
 
### Features Left to Implement
 - Subcategories for each products
 - Enable product search by locations
 - Allow buyer to write reviews
 - User-Seller communications
 - Detailed view of user profiles with following/followers feature
 - Edit profile
 - About us
 
## Technologies Used

1. Vanilla JavaScript
- Why Used? The script relies on standard JavaScript for handling data fetching, DOM manipulation, event handling, and local/session storage management.
- Official Site: https://www.javascript.com/
2. Session Storage API
- Why Used? Session storage is used to temporarily store user-specific data (e.g., authentication status, user preferences) that persists only for the duration of the session and is cleared when the browser tab is closed.
-	Official Site: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
3. Lottie Animations
- Why Used? Lottie are used for displaying alerts, improving the user experience with engaging visual feedback.
- Official Site: [Lottie](https://lottiefiles.com/)
4. RESTdb API
- Why Used? RESTdb API is used to store, retrieve, and manage product and user data in a cloud-based NoSQL database for seamless web application functionality.
- Official Site: https://restdb.io/
  5. Fetch API
-	Why Used? Used to send HTTP requests to retrieve product data from local JSON files and RESTdb API.
-	Official Site: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
6. Local Storage API
-	Why Used? Stores fetched product data locally to improve performance and provide offline capabilities./ Stores and retrieves users' favorite products, ensuring persistence across sessions without a backend database.
-	Official Site: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
7. Event Listeners (DOMContentLoaded, Click Events)
-	Why Used? The script listens for page load and user interactions like search input changes and favorite button clicks.
8. DOM Manipulation (document.createElement, appendChild, remove)
-	Why Used? The script dynamically creates and inserts HTML elements (div, p, button, style) into the DOM, ensuring that the alert modal appears when needed and disappears when dismissed.
-	Official Site: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
9. Event Handling (addEventListener)
-	Why Used? The script listens for user interaction (button click) to close the alert modal when the "OK" button is clicked.
- Official Site: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
10. CSS-in-JS (Dynamic Styling via <style> Tag)
-	Why Used? The script injects a <style> block into the <head> to define custom styles for the alert modal, ensuring consistent appearance without modifying external stylesheets.
-	Official Site: CSS-in-JS (https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement)
11. CSS Transforms (translateX)
-	Why Used? The script uses CSS transformations to smoothly slide images horizontally, creating a seamless carousel effect.
-	Official Site: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
12. Interval-Based Auto-Sliding (setInterval)
-	Why Used? The carousel automatically transitions images every 3 seconds for a better user experience.
-	Official Site: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval

## Assistive AI

In this section you should document the process of using AI tools eg, ChatGPT, Gemini etc to help you with the development of features/functionalities of your web application. (Failure to document your use of AI tools will result in loss of marks.) Example below:

- We don't really have screeshots off usage of AI
- But in term of AI usage we mainly use ChatGpt to resolve issues especially when API is going crazy which cause our code too go haywire too. At some point some of the codes just doesn't   work anymore even with slight field different in database(e.g the field type / requirements)
  
- summarisation of what i ask from chatgpt (asyira)
<img width="652" alt="image" src="https://github.com/user-attachments/assets/7cf27059-7c5a-4f33-92d2-32c558177fb3" />

- the spinwheel format is generated by chatgpt
 ![image](https://github.com/user-attachments/assets/d0e3b533-e342-4f8d-bea2-6d67a2ad5888)



## Testing

### 1. Index Page (Homepage)

#### Testing Scenarios:

##### **1. Not Logged In:**
- **Valid Action:**
  - If the user is **not logged in** (i.e., session or authentication check fails), the homepage will display a **Lottie animation**.
  - **Expected Outcome**: The Lottie animation plays and encourages the user to log in or sign up to access website. 
- **Invalid Action:**
  - If the user is logged in, the Lottie animation will **not** appear.

##### **2. Logged In:**
- **Valid Action:**
  - If the user is **logged in** (i.e., the session is active), no Lottie animation is shown, and the user will see the homepage content as usual (e.g., carousel, categories, etc.).
  - **Expected Outcome**: The page loads normally without any Lottie animation.

---

### 2. Login/Sign-up Page

#### Testing Scenarios:

##### **1. Login:**
- **Valid Input:**
  - Enter a valid email and password.
  - Click the "Login" button.
  - **Expected Outcome**: User is logged in and redirected to the homepage.

- **Invalid Input:**
  - Enter an invalid email or incorrect password.
  - Click the "Login" button.
  - **Expected Outcome**: An error message is shown.

- **Empty Fields:**
  - Leave the email or password field blank.
  - **Expected Outcome**: An error message appears indicating the missing fields.

- **Google reCAPTCHA:**
  - Attempt to submit without completing reCAPTCHA.
  - **Expected Outcome**: reCAPTCHA is required to proceed with login.

##### **2. Sign-up:**
- **Valid Input:**
  - Enter a valid username, email, and password.
  - **Expected Outcome**: User account is created, and the user is logged in and redirected to the homepage.

- **Invalid Input:**
  - Enter an email without "@" or a weak password (less than 8 characters).
  - **Expected Outcome**: An error message appears (e.g., "Please enter a valid email").

- **Empty Fields:**
  - Leave one or more fields empty.
  - **Expected Outcome**: Error message shows which field is missing.

- **Google reCAPTCHA:**
  - Attempt to submit without completing reCAPTCHA.
  - **Expected Outcome**: reCAPTCHA validation triggers an error message.

---

### 3. Product details Page

#### Testing Scenarios:

##### **1. Add Item to Cart:**
- **Valid Action:**
  - Click on the "Add to Cart" button from a productdetails.
  - **Expected Outcome**: Product is added to the cart, and the total price is updated.
  - **Lottie Animation**: A **"Add to Cart"** animation plays

##### **2. Item Removal:**
- **Valid Action:**
  - Click on the "bin" icon below the quantity in the cart.
  - **Expected Outcome**: The item is removed from the cart, and the total price is updated.
##### **2. Quantity:**
- **Valid Action:**
- max 3 item / cannot go beyond stock.
- **Expected Outcome**: dont update to local database
- 
##### **3. Cart Checkout:**
- **Valid Action:**
  - Proceed to checkout.
  - **Expected Outcome**: User is redirected to the checkout page.

##### **4. Cart Total:**
- **Valid Action:**
  - Ensure that the total price displayed includes the correct GST and any applied discounts.
  - **Expected Outcome**: The total price is correctly calculated

---

### 4. Checkout & Payment Page

#### Testing Scenarios:

##### **1. Shipping Option Selection:**
- **Valid Action:**
  - Select "Meet-up" or "Delivery" for shipping options.
  - **Expected Outcome**: The appropriate payment method is displayed (Cash on delivery or Credit card).

##### **2. Credit Card Input Validation:**
- **Valid Input:**
  - Enter valid credit card details (Card number, Expiry date, and CVV).
  - **Expected Outcome**: The payment is processed and the order is placed.

- **Invalid Input:**
  - Enter an invalid credit card number or incomplete details.
  - **Expected Outcome**: An error message appears indicating invalid input (e.g., "Invalid card number").

##### **3. Order Placement:**
- **Valid Action:**
  - Complete the checkout process.
  - **Expected Outcome**: Order confirmation is displayed, and the user is shown a success message with a **Lottie animation**

---

### 5. Profile Page

#### Testing Scenarios:

##### **1. View Profile:**
- **Valid Action:**
  - Click "View Profile" when logged in.
  - **Expected Outcome**: User profile details are shown (e.g., username, email).

##### **2. Edit Profile:**
- **Valid Action:**
  - Edit username, email, or password.
  - **Expected Outcome**: Changes are saved successfully and updated on the profile page.

- **Invalid Action:**
  - Enter an invalid email or weak password.
  - **Expected Outcome**: An error message prompts the user to correct the input.

##### **3. Log Out:**
- **Valid Action:**
  - Click "Log Out."
  - **Expected Outcome**: The user is logged out and redirected to the homepage.

---

### 6. Sell Page

#### Testing Scenarios:

##### **1. Add Sell Product Listing:**
- **Valid Action:**
  - Upload Image
  - **Expected Outcome**: Image Preview Shown
  - 
- **Valid Action:**
  - Input valid product information (name, price, description, location).
  - **Expected Outcome**: Product is successfully listed, and the listing appears under the correct category.

- **Invalid Action**: 
  - Leave a required field empty (e.g., no price or product name).
  - **Expected Outcome**: Error message prompts to fill in the missing fields.

##### **2. Location Input Validation:**
- **Valid Action:**
  - Use Google Maps API to input a location for the meetup.
  - **Expected Outcome**: Location is correctly added to the product listing.

- **Invalid Action:**
  - Enter a non-existent or invalid location.
  - **Expected Outcome**: A warning message prompts the user to provide a valid location.

---

### 7. Spin Wheel (Discount Code)

#### Testing Scenarios:

##### **1. Spin Wheel Interaction:**
- **Valid Action:**
  - User spins the wheel to get a discount code.
  - **Expected Outcome**: Discount code is displayed, and the user can apply it to the cart.

##### **2. Invalid Discount Code:**
- **Valid Action:**
  - Enter a discount code in the "Apply Discount" field.
  - **Expected Outcome**: The discount is applied if valid.
  
- **Invalid Code**: 
  - Enter an invalid or expired discount code.
  - **Expected Outcome**: An error message is displayed (e.g., "Invalid discount code").
### Product Page
- **Valid Action:**
  - Search product
  - **Expected Outcome**: Show the product search
  - **Valid Action:**
  - Click on the product card
  - **Expected Outcome**: Go to product details
---

### 8. Chatbot

#### Testing Scenarios:

##### **1. FAQ Chatbot:**
- **Valid Action:**
  - User clicks on the chatbot and asks a question (e.g., "What are the delivery options").
  - **Expected Outcome**: The chatbot responds with a valid answer based on predefined FAQs.

---

### 8. Notication Icon

#### Testing Scenarios:

##### **1. FAQ Chatbot:**
- **Valid Action:**
  - User clicks on the notification icon
  - **Expected Outcome**: Show list off available discounts.

---

### 9. Lottie Animations

#### Testing Scenarios:

##### **1. Homepage Animation (if user is not logged in):**
- **Valid Action:**
  - If the user is **not logged in** (i.e., session or authentication check fails), a **Lottie animation** will appear on the homepage (index.html) to encourage the user to log in or sign up.
  - **Expected Outcome**: The animation plays to inform and encourage the user to log in/sign up to proceed with their actions.

##### **2. Add to Cart Animation:**
- **Valid Action:**
  - When an item is successfully added to the cart, a **Lottie animation**

##### **3. Order Success Animation:**
- **Valid Action:**
  - Once the order is placed successfully, a **Lottie animation** 

---

### Notes:
- Test across different browsers (Chrome, Firefox, Safari) to ensure cross-browser compatibility.
- Test responsiveness for mobile and tablet devices.
- Ensure that any Lottie animations do not interfere with usability and load times.

## Individual Contributions
### Le Wun Sandi Kyaw
1. Added product.json data
2. Pictures for all fashion products
3. women.html
4. men.html
5. kids.html
6. favorite.html
7. like buttons to add to fav html
8. remove option inside favorite.html
9. Search button across women, men,kids htmls
10. Dropdown page when you click profile icon
11. edit profile
12. log out
13. footer
14. Created own background picture for women, men, kids hero picture (behind search bar)
### Nur Asyira Fitri Binte Razali
1.Created initial VS code
2.Created the initial restdb database 
2.User Authentications
3.Navigation bar including the username showing dynamically beside profile
4.all of index.html
5.all cart.html
6.all payment.html
7.all productdetail.html
8.all sell.html
9.all loginsignup.html (other api manage to create account/ the current api have issue posting UserID)
    	if account creation fails,
    	use: 
    	asdfghjkl@gmail.com
    	asdfghjkl12345
    ------*all includes .js and .css and validations for that html------	
10.notification function
11.chatbot function
12.spinwheel functions
13.Fix API code issues (try to make it work with existing code)
     by changing keys and api links in codes
     by fetching from both api and json (api fetch is for sell listed items it works in some of the commented api)
     by storing it to localstorage
     by storing specific things to sessionstorage(will be remove aft rerunning the codes)
14.Implement Gooogle reCAPTCHA, Google Map Api and the Lottie Animations
15.Allowing user to click from *products pages(men/women/kids htmls)* following product details
 


## Credits

### Media
- The photos used in this site were obtained from https://www.pinterest.com.
- The Lottie used in the site were obtained from https://lottiefiles.com/0sor8b76s8z4y38x.
- The captcha used in the site was obtained from https://cloud.google.com/security/products/recaptcha?hl=en.
- The fonts and icons used in this site were obtained from https://fonts.google.com/icons?selected=Material+Icons+Outlined:favorite:&icon.size=24&icon.color=%23e8eaed&icon.set=Material+Icons.
- The map used in this site were obtained from https://developers.google.com/maps.


### Acknowledgements

- I received inspiration for this project from carousell https://www.carousell.sg/,
- h&m https://www2.hm.com/en_sg/index.html?srsltid=AfmBOopTU1TPc8h9oSbMxenoIzBfGEt7fM4PZcz3xU8s7eELyXkBGApR,
- mango 	https://shop.mango.com/sg/en/h/kids
- Special Acknowledgement to ChatGPT for helping me find ways to fix the the huge amount off API issues that affects many off my codes. API issue cost some my code to run anymore even after trying to fix it:')
