
# GoRest User CRUD Operations

This project demonstrates basic user CRUD operations for the GoRest API using Supertest and Mocha for testing. It includes tests for creating, fetching, updating, and deleting users, as well as handling various negative scenarios.

## Project Structure
- **crudOperations/**: Contains functions for performing CRUD operations (create, read, update, delete).
- **tests/**: Contains Mocha tests for validating user CRUD operations.
- **utils/**: Contains utility functions like token management.
  
## Installation

1. Clone this repository:

    ```
    git clone https://github.com/yourusername/api-testing-project
    cd api-testing-project
    ```

2. Install dependencies:

    ```
    npm install
    ```

## Test Execution

Run the tests using Mocha:

```
npm test
```
## Generate Reports
To generate reports, use libraries like mochawesome: 

```
npm install mochawesome --save-dev 
npx mocha src/tests --reporter mochawesome 
```

## Technologies Used
- **SuperTest**: API Testing Library in JavaScript 
- **Mocha**: Test framework for JavaScript.
- **Chai**: Assertion library for Mocha.
- **Faker.js**: Library for generating fake data for testing.


