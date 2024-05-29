# TypeScript Clean Architecture Project

This project implements a clean architecture approach for a Node.js TypeScript application. It follows the principles of separation of concerns, dependency inversion, and testability.

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The project aims to provide a robust and scalable foundation for building Node.js applications using TypeScript. It leverages clean architecture principles to separate concerns into layers: domain, application, and infrastructure. This separation allows for better maintainability, testability, and flexibility.

## Project Structure

The project structure follows a modular approach:

- `src/`
  - `app/`: Contains the application layer, including services, repositories, and routes.
  - `infrastructure/`: Houses infrastructure concerns such as server setup, database configuration, logging, and external service integration.
    - `server.ts`: Initializes the Express server and middleware configurations.
    - `database/`: Manages database connections and schemas.
      - `index.ts`: Connects to the database using Mongoose and sets up logging.
    - `logger/`: Handles logging functionality.
      - `winston.ts`: Configures and exports a Winston logger with colorized output and file transport for error logging.
    - `redis/`: Handles Redis connection and client setup.
      - `createRedisClient.ts`: Defines a function to create and configure a Redis client.
  - `app/domain/`: Defines the domain entities and business logic.
  - `app/middlewares/`: Middleware functions for request validation and authentication.
  - `app/models/`: Defines the data models used in the application.
  - `app/repositories/`: Contains interfaces and implementations of repositories for data access.
  - `app/routes/`: Defines the API routes.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   cd <project-folder>
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and define the necessary environment variables, such as `PORT`, `DB_URI`, `SECRET`, etc.

4. Run the application:

   ```bash
   npm start
   ```

## Usage

Once the application is running, you can access the API endpoints as described below.

## API Endpoints

- **POST /api/user**: Register a new user.
- **POST /api/user/login**: Login with existing user credentials and receive an access token.
- **GET /api/user/:id**: Get user details by ID.
- **GET /api/users**: Get all users.
- **PUT /api/user**: Update user details.
- **DELETE /api/user/:id**: Delete a user.
- **GET /healthcheck**: Check the health of the application.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or new features you'd like to see.

## License

This project is licensed under the [MIT License](LICENSE).
