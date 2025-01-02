# block37A

**Project Plan: RESTful API with Many-to-Many Relationships**

### **Goal**
Build a RESTful API that allows users to create, read, update, and delete items, reviews, and comments. The API should also include user authentication, relationships between resources, and proper documentation.

---

### **Milestones**

#### **Milestone 1: Setup and Initialization**
1. Create a GitHub repository for version control.
2. Initialize the project with `npm init -y`.
3. Install necessary dependencies.
   - Production: `express`, `prisma`, `@prisma/client`, `bcrypt`, `jsonwebtoken`, `morgan`, `dotenv`
   - Development: `nodemon`, `jest`, `supertest`
4. Initialize Prisma with `npx prisma init`.
5. Create a `.env` file to store environment variables like `DATABASE_URL`.

---

#### **Milestone 2: Database Design**
1. Define the models in `schema.prisma`.
   - **User**:
     - `id`, `username`, `email`, `passwordHash`
   - **Item**:
     - `id`, `name`, `description`, `averageScore`
   - **Review**:
     - `id`, `text`, `score`, `itemId`, `userId`
   - **Comment**:
     - `id`, `text`, `reviewId`, `userId`
2. Establish relationships:
   - Users have many reviews and comments.
   - Items have many reviews.
   - Reviews have many comments.
3. Push the schema to the database with `npx prisma db push`.

---

#### **Milestone 3: Authentication and Middleware**
1. Create user authentication routes:
   - `POST /api/auth/register`: User registration.
   - `POST /api/auth/login`: User login.
   - `GET /api/auth/me`: Fetch logged-in user details.
2. Use `bcrypt` for password hashing and `jsonwebtoken` for token-based authentication.
3. Add middleware for protected routes to verify JWTs.

---

#### **Milestone 4: CRUD API Development**
1. **Item Routes**:
   - `GET /api/items`: Get all items.
   - `GET /api/items/:id`: Get a specific item.
   - `POST /api/items`: Create a new item.
   - `PUT /api/items/:id`: Update an item.
   - `DELETE /api/items/:id`: Delete an item.

2. **Review Routes**:
   - `GET /api/items/:id/reviews`: Get all reviews for a specific item.
   - `POST /api/items/:id/reviews`: Add a review for an item.
   - `PUT /api/reviews/:id`: Update a review.
   - `DELETE /api/reviews/:id`: Delete a review.

3. **Comment Routes**:
   - `POST /api/reviews/:id/comments`: Add a comment to a review.
   - `PUT /api/comments/:id`: Update a comment.
   - `DELETE /api/comments/:id`: Delete a comment.

---

#### **Milestone 5: Testing**
1. Set up `jest` and `supertest` for testing API endpoints.
2. Write tests for:
   - User authentication.
   - CRUD operations for items, reviews, and comments.
3. Mock Prisma client for isolated unit tests.

---

#### **Milestone 6: Documentation**
1. Document all API endpoints in the `README.md` file.
   - Include request examples, response examples, and status codes.
2. Add comments to the code for maintainability.
3. Create an ER diagram for database relationships.

---

#### **Milestone 7: Deployment**
1. Configure the project for deployment (e.g., Docker or a cloud platform like Heroku or Render).
2. Push the repository to GitHub.
3. Deploy the application and provide the live API URL.

---

### **Task Breakdown**

#### **Setup Tasks**
- [ ] Initialize GitHub repository.
- [ ] Create `package.json` and install dependencies.
- [ ] Configure Prisma and set up `.env`.

#### **Development Tasks**
- [ ] Define models in `schema.prisma`.
- [ ] Implement authentication routes.
- [ ] Implement CRUD routes for items, reviews, and comments.
- [ ] Write middleware for error handling and authentication.

#### **Testing Tasks**
- [ ] Write Jest tests for authentication.
- [ ] Test CRUD operations with `supertest`.
- [ ] Verify relationships in the database.

#### **Documentation Tasks**
- [ ] Document endpoints with examples in `README.md`.
- [ ] Add inline comments for clarity.
- [ ] Create an ER diagram.

#### **Deployment Tasks**
- [ ] Push to GitHub.
- [ ] Deploy to a hosting platform.

---

### **Tools and Resources**
1. **Tools**:
   - Prisma
   - Express.js
   - Jest and Supertest
   - Postman for manual testing
2. **References**:
   - [Prisma Docs](https://www.prisma.io/docs)
   - [Express.js Docs](https://expressjs.com/)
   - [Jest Docs](https://jestjs.io/)

---

API Documentation

---

Authentication:

POST /api/auth/register

    Description: Registers a new user.
    Request Body:

{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "securepassword"
}

Response:

    {
      "id": 1,
      "username": "exampleuser",
      "email": "user@example.com"
    }

POST /api/auth/login

    Description: Logs in an existing user.
    Request Body:

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:

    {
      "token": "your_jwt_token"
    }

GET /api/auth/me

    Description: Fetches the authenticated user's details.
    Headers:

Authorization: Bearer <token>

Response:

    {
      "id": 1,
      "username": "exampleuser",
      "email": "user@example.com"
    }

---

Items:

GET /api/items

    Description: Fetches all items.
    Response:

    [
      {
        "id": 1,
        "name": "Item 1",
        "description": "A sample item",
        "averageScore": 4.5
      }
    ]

GET /api/items/:id

    Description: Fetches a specific item.
    Response:

    {
      "id": 1,
      "name": "Item 1",
      "description": "A sample item",
      "averageScore": 4.5
    }

POST /api/items

    Description: Creates a new item.
    Request Body:

{
  "name": "New Item",
  "description": "Description of the item"
}

Response:

    {
      "id": 1,
      "name": "New Item",
      "description": "Description of the item",
      "averageScore": 0
    }

PUT /api/items/:id

    Description: Updates an item.
    Request Body:

    {
      "name": "Updated Item",
      "description": "Updated description"
    }

DELETE /api/items/:id

    Description: Deletes an item.

---

Reviews:

GET /api/items/:id/reviews

    Description: Fetches reviews for a specific item.

POST /api/items/:id/reviews

    Description: Adds a review for an item.

GET /api/reviews/me

    Description: Fetches reviews for the authenticated user.

---

Comments:

POST /api/items/:itemId/reviews/:reviewId/comments

    Description: Adds a comment to a review.

GET /api/comments/me

    Description: Fetches comments for the authenticated user.
