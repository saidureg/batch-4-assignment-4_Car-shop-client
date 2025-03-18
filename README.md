# _Car Order Management System_

Car Shop is an e-commerce platform for buying and managing car products. It provides role-based authentication, secure checkout with payment integration, and a user-friendly dashboard for both customers and admins.

## _🚀 Live Demo_

Access the live API [Here](https://batch-4-assignment-4-car-shop-client.vercel.app/)

## Features

1.  **Features**

- User Registration with secure password hashing
- Login and Logout functionality
- JWT-based authentication for session management
- Role-based access (User/Admin)
- Search & Filter (by brand, model, category, price, and availability)
- Checkout Page: Place orders, quantity validation, total price calculation, and payment integration
- Admin Dashboard: Manage users, products (CRUD), and orders (CRUD)
- User Dashboard: View orders, manage profile settings, and update password

## Tech Stack

- Frontend: React, Redux Toolkit, Ant Design, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT, bcrypt
- Validation: Zod for schema validation
- Payment Integration: SurjoPay
- State Management: Redux Toolkit

## _Project Setup Guide_

Follow the instructions below to set up the project on your local development environment.

## Prerequisites

Before starting, ensure the following are installed on your system:

- React.js
  -Ant Design
- `yarn` or `npm` installed globally on your system.
- MongoDB and Mongoose (running locally or a connection string for a cloud database like MongoDB Atlas)
- Visual Studio Code
- TypeScript (installed globally via npm install -g typescript)

## Steps to Set Up the Project

1. **Clone the Repository:**

   - Open your terminal and navigate to the desired folder.
   - Clone the repository using the command:
     ```bash
     git clone https://github.com/saidureg/batch-4-assignment-4_Car-shop-client.git
     ```

2. **Open the Project in Visual Studio Code:**

   - Open the cloned project folder in VS Code.

3. **Install Dependencies:**

   - Install project dependencies using npm or Yarn:
     ```bash
     yarn
     ```

4. **Start the Development Server:**

   - To start the development server, use one of the following commands:
     ```bash
     yarn run dev
     ```
     or
     ```bash
     yarn dev
     ```

5. **Build the Project:**
   - Compile TypeScript files to JavaScript using:
     ```bash
     yarn run build
     ```
   - This will run the `tsc` command to transpile TypeScript files into JavaScript.
