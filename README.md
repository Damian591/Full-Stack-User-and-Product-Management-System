# Full-Stack User and Product Management System

## Brief Project Description

This project is designed to manage users and products using Node.js, MongoDB Atlas, and React. It allows easy management of data through a user-friendly web interface.

## About the Project

The backend is built using Node.js and MongoDB Atlas for cloud database storage, while the frontend is developed using React. Users can easily create, edit, and delete information via a web interface.

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- React.js
- Axios
- Thunder Client


### Prerequisites

Make sure you have the following installed:
- Node.js
- MongoDB (local or cloud, such as MongoDB Atlas)
- npm (Node Package Manager): 
- React.js: The frontend of the project is built using React.
- Axios
  
## Installation

1. Download or clone the project to your local machine.
2. Install dependencies for both the server and client sides.
3. Configure the MongoDB Atlas connection information.
4. Run the server and React application locally.

### Steps to Connect to MongoDB

1. In your `index.js` file (server side) , replace the connection string in the `mongoose.connect()` function with your actual MongoDB connection string.
   **Note:** If you're using MongoDB Atlas or any other cloud database, you will get a connection string from their web interface.

### Running the Project

1. Start the backend server:
    ```bash
    npm start
    ```

2. Run the React frontend by navigating to the client directory and starting the React app:
    ```bash
    npm start
    ```

## Usage

- Visit `http://localhost:3000` in your browser.
- Users can:
  - Create, edit, view, and delete users.
  - Create, edit, view, and delete products.
- All data changes are saved in the MongoDB Atlas cloud database.
