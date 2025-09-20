SweetShop 🍬

A full-stack Sweet and Dessert Shop web application where users can browse, search, and purchase sweets while admins can manage inventory. This project demonstrates React, Node.js/Express, MongoDB, and TailwindCSS integration for a complete e-commerce-like experience.

Features:

User Features
1. Browse a variety of sweets and desserts.
2. Search sweets by name, category, and price range.
3. View sweet details with description and stock availability.
4. Purchase sweets (stock decreases after purchase).

Admin Features
1. Add, update, or delete sweets.
2. Restock sweets to manage inventory.
3. Admin dashboard to view all sweets in a grid format.

Other Features
1. Responsive UI using TailwindCSS.
2. stored images for visual appeal.
3. Token-based authentication with JWT.

Tech Stack:

1. Frontend: React, TailwindCSS, React Router DOM
2. Backend: Node.js, Express
3. Database: MongoDB
4. Authentication: JWT
5. HTTP Requests: Axios
6. Image Upload: Cloudinary


Setup Instructions:

Backend:
1. Navigate to the backend folder:
   
   cd SweetShop/backend
3. Install dependencies:
   
   npm install
5. Create a .env file with the following variables:
   
      MONGO=<your_mongodb_connection_string>
      
      JWT_SECRET=<your_jwt_secret>
      
      JWT_EXPIRES_IN=7d
   
      PORT=4000

7. Start the server:
   
   npm run dev
9. Backend runs at: http://localhost:4000

Frontend:
1. Navigate to the frontend folder:
   
   cd SweetShop/frontend
3. Install dependencies:
   
   npm install
5. Start the development server:
   
   npm run dev


ScreenShots:

1. Home Page
   <img width="947" height="424" alt="home" src="https://github.com/user-attachments/assets/8516e8e7-8d9c-4d7e-a663-7d70f79b39f0" />

2. Login/Signup Page
   <img width="948" height="435" alt="login22" src="https://github.com/user-attachments/assets/6a0719e0-7bd0-4685-bfc8-8d49d857924a" /> <img width="947" height="431" alt="signup2" src="https://github.com/user-attachments/assets/d2e8aad7-f280-40b9-b820-ace5d4e7e3d4" />

3. Sweet Detail Page
   <img width="959" height="431" alt="sd" src="https://github.com/user-attachments/assets/5e70bc08-41be-4388-8a5c-d637302ee07b" />

4. Admin Dashboard
   <img width="947" height="374" alt="ad" src="https://github.com/user-attachments/assets/86217c1e-0124-4ff4-af99-e8520fb87224" /><img width="947" height="470" alt="ad2" src="https://github.com/user-attachments/assets/fd0b2702-6fd0-4762-95ec-da980ddd6c86" />


My AI Usage:

I used ChatGPT (GPT-5) as a coding partner during different stages of building SweetShop.

Here’s how it actually helped:

Initial Setup:

I asked for guidance on structuring the project—setting up the Express backend with MongoDB, configuring React with Vite, and organizing the folder layout.
This saved time in the early scaffolding phase but I wrote all the files myself.

Feature Development & Debugging

1. Search Functionality: I discussed how to design a flexible API that could filter sweets by name, category, and price range, then adapted the code to my needs.

2. Update/Delete Flows: When the update route was throwing errors, I shared the controller code and used ChatGPT’s feedback to fix the route parameters and error handling.

3. Admin Dashboard: I leaned on ChatGPT for advice on form handling and connecting the Cloudinary upload flow to the backend, while customizing the final logic and UI.

Testing

For backend Jest tests (authentication and sweet routes), I asked ChatGPT for example test structures and assertions.
I then modified the suggested tests to fit my exact schema and middleware.

Reflection

ChatGPT acted more like a senior developer I could bounce ideas off of than a code generator.
It sped up problem-solving and gave me confidence when writing tests, but every implementation detail and final decision remained in my hands.

Thankyou, have a good day :)
   






