## Project Setup Instructions

Follow the steps below to set up and run the project on your local machine:

1. Download the Compressed File
Download the provided compressed file containing the project.

2. Extract the Compressed File
Extract the contents of the compressed file. Inside, you'll find a project folder.

3. Move the Project Folder
Cut the project folder and paste it into your desired location on the local disk.

4. Open the Project in VS Code
Right-click on the project folder.
Select Open with Code to open the project in Visual Studio Code.

5. Start the Frontend
Open a terminal in Visual Studio Code.
cd frontend
npm start

6. Install and Open XAMPP
Download and install XAMPP if you haven't already.
Open XAMPP and start Apache and MySQL.
In XAMPP, click on MySQL -> Admin to open the MySQL Admin Panel.

7. Start the Backend
Open another terminal in Visual Studio Code.
cd backend
npm start

-----------------------------------

## Database Creation

Database Name : details
table Name    : signin, new_products

-----------------------------------

## Project Definition

### Overview
The project is a clothing website with user authentication and various features, including a Sign-In page, Login page, Home page etc.. The website allows users to register, log in, view clothing products, and manage their information.

### Sign-In Page
1. **Inputs:**
   - **First Name:** Limited to 20 characters.
   - **Last Name:** Limited to 20 characters.
   - **Email:** Must be a valid email format.
   - **Password:** Minimum 4 characters, maximum 8 characters.
   - **Confirm Password:** Must match the Password field.

2. **Validation:**
   - **First Name and Last Name:** Check for a maximum of 20 characters.
   - **Email:** Validate the email format.
   - **Password:** Must be between 4 and 8 characters long.
   - **Confirm Password:** Must match the Password.

3. **Submission:**
   - After validation, clicking the **Sign In** button saves the user data to the database and redirects to the Login page.

### Login Page
1. **Inputs:**
   - **Email:** Must be registered.
   - **Password:** Must match the password associated with the email.

2. **Validation:**
   - Check if the email and password combination is correct and matches an existing user in the database.

3. **Submission:**
   - After validation, clicking the **Login** button logs the user in and redirects to the Home page.

### Home Page
- **Header:**
  - **Left Side:** Logo.
  - **Center:** Navigation links (Home, Products, About).
  - **Right Side:** Display the registered user's first name.

- **Body:**
  - **Clothing Images:** Display images of clothing items.
  - **Cards:** Show 10+ clothing cards.
  - **Clothing Details:** Clicking on an image redirects to a clothes details page.

- **Footer:**
  - **Links:** Quick Links, About Us, Contact Us, Follow Us.

- **Functionality:**
  - **Products Page:** Users can add or delete images of products.
  - **About Section:** Clicking the About link scrolls down to the About Us section.

### Additional Features
- **Navigation Links:**
  - **Home:** Takes users to the Home page.
  - **Products:** Takes users to the Products page where they can manage product images.
  - **About:** Scrolls down to the About Us section on the current page.

---

### Implementation Steps

1. **Front-End Development:**
   - **Sign-In Page:** Implement form with validation logic.
   - **Login Page:** Implement form with validation logic.
   - **Home Page:** Develop the layout with header, body, and footer. Implement clothing images and cards. Ensure navigation links work as expected.
   - **Products Page:** Allow image addition and deletion.

2. **Back-End Development:**
   - **User Authentication:** Set up endpoints for registration and login.
   - **Database Operations:** Handle data storage and retrieval.

3. **Database Setup:**
   - **Tables:** Create tables for user information and product data.

4. **Integration:**
   - Connect front-end with back-end services.
   - Ensure proper redirection and data handling.

5. **Testing:**
   - Test all forms, navigation, and functionality to ensure they work as expected.

---



