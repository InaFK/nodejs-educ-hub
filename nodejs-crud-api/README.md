# Node.js CRUD API
A simple CRUD API built with Node.js and TypeScript using an in-memory database for managing users.

## Features
- RESTful endpoints for user management (GET, POST, PUT, DELETE)
- In-memory database (no external dependencies)
- Horizontal scaling with Node.js Cluster API and a load balancer
- Developed with TypeScript and minimal dependencies
- Development and production modes
- Error handling for invalid UUIDs, non-existing users, and server-side errors
- API tests with at least three scenarios

## Prerequisites
Make sure you have the following installed on your machine:

Node.js v22.9.0 or higher
npm or yarn

## Installation
1. Clone the repository:

```console
git clone https://github.com/InaFK/nodejs-educ-hub.git
```
2. Navigate to the project folder:
cd nodejs-crud-api

3. Install the required dependencies:
npm install

4. Create a .env file in the root folder and specify the port for your server:
PORT=4000

## Scripts
You can use the following npm scripts for different purposes:

- Development mode (with hot reload):
npm run start:dev

This uses nodemon or ts-node-dev to automatically restart the server on file changes.

- Production mode (bundled with Webpack):
npm run start:prod

This script first compiles the TypeScript code with Webpack and then starts the server.

- Run multiple instances with a load balancer:
npm run start:multi

This will start multiple instances of the application using Node.js Cluster API and a load balancer (with a round-robin strategy).

## API Endpoints
The API provides CRUD functionality for managing users. Each user has the following properties:

- id (UUID, auto-generated)
- username (string, required)
- age (number, required)
- hobbies (array of strings or empty array, required)

### 1. Get All Users
- GET /api/users
- Response: 200 OK with an array of users

### 2. Get User by ID
- GET /api/users/{userId}
- Response:
200 OK with the user object if found

400 Bad Request if the userId is invalid

404 Not Found if the user doesn't exist

### 3. Create a New User
- POST /api/users

- Request body:
```code
{
  "username": "JohnDoe",
  "age": 25,
  "hobbies": ["reading", "coding"]
}

```
- Response:

201 Created with the newly created user

400 Bad Request if the required fields are missing

### 4. Update an Existing User
- PUT /api/users/{userId}

- Request body:
```code
{
  "username": "JohnDoe",
  "age": 26,
  "hobbies": ["gaming", "traveling"]
}
```

- Response:
-- 200 OK with the updated user
-- 400 Bad Request if the userId is invalid
-- 404 Not Found if the user doesn't exist

### 5. Delete a User
- DELETE /api/users/{userId}
- Response:
204 No Content if the user is successfully deleted

400 Bad Request if the userId is invalid

404 Not Found if the user doesn't exist

### 6. Handle Non-existing Endpoints
- Any other route will return 404 Not Found.

## Error Handling
The API will return appropriate error messages and HTTP status codes for invalid UUIDs, missing or incorrect data, and server errors.

## Running Tests
You can run tests for the API (at least 3 test scenarios are included):

```console
npm test
```

## Horizontal Scaling
You can horizontally scale the application by using the Cluster API. The load balancer distributes requests across multiple worker instances running on different ports.

For example, if PORT=4000, the application will be accessible on:

- Load Balancer: localhost:4000
- Worker 1: localhost:4001
- Worker 2: localhost:4002
- Worker 3: localhost:4003

## License
This project is licensed under the MIT License.
