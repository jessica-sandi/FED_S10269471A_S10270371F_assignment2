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

The top navigation bar is consistent across all main pages and includes the following sections:

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
 
### Features Left to Implement
 - Subcategories for each products
 - Enable product search by locations
 - Allow buyer to write reviews
 - User-Seller communications
 - Detailed view of user profiles with following/followers feature
 
## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.


## Assistive AI

In this section you should document the process of using AI tools eg, ChatGPT, Gemini etc to help you with the development of features/functionalities of your web application. (Failure to document your use of AI tools will result in loss of marks.) Example below:

1. Spotify API:
ChatGPT was used to help with the implementation of the Spotify API (include screenshots of generated AI codes.)


![sample img](readme_img/sample.JPG)

## Testing

1. Login/Sign-up page
- 1.Try to log in with an account that have not signed in yet, an error msg or alert pop up will appear.
- 2.After that if you try to sign up, you cannot just put anyhow you want, you must put our password validations (like 8 charaters limitand other validations), if not error message about the field will appear.
- 3.After validations, if you successfully log in, the successful message will appear.
- 3. We also have captcha, so if you never do captcha properly, the error message will show to try captcha again.
2. Cart
- 1. If you try to add item into cart more than the available stock, it will not work.  
  2. So you can just put inside the cart only available stocks.
  3.  The max per transaction is 3 so if you maximise more than 3, you will not be able to process.  
3. Sell Page
4. Location
- 1. If location is not found in sell page, the alert/error message will show.
  

We added media in css so it works on different browsers and screen sizes and will make the user easy to use on different platforms.

We don't have any bugs but we sometimes have api error for some part.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from pintrest.
- The icon 

### Acknowledgements

- I received inspiration for this project from carousell, h&m, mango
