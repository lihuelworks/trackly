# Exercise Tracker API

## Overview

This project is a full-stack API designed to manage user data and exercise logs. The API allows for user creation, exercise logging, and retrieval of exercise logs with optional filtering by date range and limit. Built with **Node.js**, **Express.js**, and **MongoDB**, this solution provides a clean, scalable architecture.

## Technologies

- **Node.js** – JavaScript runtime for server-side application development.
- **Express.js** – Minimal web framework for handling HTTP requests and routing.
- **MongoDB** – NoSQL database for storing user and exercise data.
- **Mongoose** – ODM for MongoDB, simplifying schema design and data management.
- **Body-parser** – Middleware for parsing incoming request bodies.
- **CORS** – Cross-origin resource sharing middleware for API accessibility.
- **dotenv** – For environment variable management.

## Features

- **Create and manage users** – Create unique user accounts.
- **Exercise logging** – Log exercises with a description, duration, and date.
- **Retrieve exercise logs** – Get exercise logs with optional date filtering and limit.
- **Full CRUD** – Create, read, update, and delete functionality for users and exercises.

## API Documentation

### 1. **Create a New User**
- **Endpoint**: `POST /api/users`
- **Request body**:
    ```json
    {
      "username": "example_username"
    }
    ```
- **Response**:
    ```json
    {
      "username": "example_username",
      "_id": "user_id"
    }
    ```
- **Description**: Creates a new user. If the username already exists, returns the existing user’s ID.

### 2. **Retrieve All Users**
- **Endpoint**: `GET /api/users`
- **Response**:
    ```json
    [
      {
        "_id": "user_id",
        "username": "user_name"
      }
    ]
    ```
- **Description**: Retrieves a list of all users in the system.

### 3. **Log an Exercise for a User**
- **Endpoint**: `POST /api/users/:_id/exercises`
- **Parameters**: `:_id` – User ID.
- **Request body**:
    ```json
    {
      "description": "exercise_description",
      "duration": 30,
      "date": "2025-03-11T00:00:00Z"
    }
    ```
- **Response**:
    ```json
    {
      "username": "user_name",
      "description": "exercise_description",
      "duration": 30,
      "date": "Tue Mar 11 2025",
      "_id": "user_id"
    }
    ```
- **Description**: Logs an exercise for the specified user. If no date is provided, the current date is used.

### 4. **Retrieve Exercise Logs for a User**
- **Endpoint**: `GET /api/users/:_id/logs`
- **Parameters**: `:_id` – User ID.
- **Query Parameters**:
  - `from` – Start date for filtering (optional).
  - `to` – End date for filtering (optional).
  - `limit` – Limit the number of results (optional).
- **Response**:
    ```json
    {
      "username": "user_name",
      "_id": "user_id",
      "count": 5,
      "log": [
        {
          "description": "exercise_description",
          "duration": 30,
          "date": "Tue Mar 11 2025"
        }
      ]
    }
    ```
- **Description**: Retrieves a user's exercise logs, optionally filtered by date range and limited by a maximum number of results.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/exercise-tracker-api.git
cd exercise-tracker-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file at the root of the project and add the following:

```env
MONGO_URI=your_mongo_database_connection_string
PORT=3000
```

### 4. Run the app
```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Testing the API

You can use tools like **Postman** or **Insomnia** to test the API endpoints.

### Test User Creation
Make a `POST` request to `http://localhost:3000/api/users` with a JSON body:
```json
{
  "username": "testuser"
}
```

### Test Exercise Logging
Make a `POST` request to `http://localhost:3000/api/users/:_id/exercises` with a JSON body:
```json
{
  "description": "Push-ups",
  "duration": 15,
  "date": "Mon Mar 10 2025"
}
```

### Test Exercise Logs Retrieval
Make a `GET` request to `http://localhost:3000/api/users/:_id/logs?from=Mon Mar 01 2025&to=Mon Mar 10 2025&limit=10`.

## Error Handling

- **400 Bad Request**: Invalid or missing fields in the request body.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Server errors.

## Contributions

Feel free to fork the repository, open issues, or submit pull requests. Contributions are always welcome.

## License

This project is licensed under the **MIT License**.