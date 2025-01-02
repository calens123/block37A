# block37A

COUPLE OF NOTES:
1. Apologies for the issues with formatting in the API documentation at the bottom of this README, I've been trying to get it to show up perfectly but this is about as good as I can get it.
2. I was able to get through everything and complete all my testing up to doing PUT and DELETE on reviews belonging to specific users. I changed my reviews.js and server.js files dozens of times trying to get the Postman tests to work, with no luck. So eager to hear about how I can update those. 

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

Entity-Relationship Diagram (Text Representation)

    User
        Attributes: id, username, email, passwordHash
        Relationships:
            Has Many Review
            Has Many Comment

    Item
        Attributes: id, name, description, averageScore
        Relationships:
            Has Many Review

    Review
        Attributes: id, text, score, itemId, userId, createdAt

---

# API Documentation

## Authentication Endpoints

### Register a User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
- **201 Created:** Returns the created user (excluding password).
- **400 Bad Request:** User already exists.

---

### Login a User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
- **200 OK:** Returns a JWT token.
- **401 Unauthorized:** Invalid email or password.

---

### Get Current User
**GET** `/api/auth/me` (🔒 Requires Authorization)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
- **200 OK:** Returns the authenticated user's information.
- **401 Unauthorized:** Missing or invalid token.

---

## Item Endpoints

### Get All Items
**GET** `/api/items`

**Response:**
- **200 OK:** Returns an array of items.

---

### Get Specific Item
**GET** `/api/items/:id`

**Response:**
- **200 OK:** Returns the requested item.
- **404 Not Found:** Item not found.

---

### Create an Item
**POST** `/api/items`

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
- **201 Created:** Returns the created item.
- **400 Bad Request:** Missing required fields.

---

### Update an Item
**PUT** `/api/items/:id`

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
- **200 OK:** Returns the updated item.
- **404 Not Found:** Item not found.

---

### Delete an Item
**DELETE** `/api/items/:id`

**Response:**
- **204 No Content:** Successfully deleted.
- **404 Not Found:** Item not found.

---

## Review Endpoints

### Get All Reviews for an Item
**GET** `/api/items/:itemId/reviews`

**Response:**
- **200 OK:** Returns all reviews for the specified item.

---

### Get User Reviews
**GET** `/api/reviews/me` (🔒 Requires Authorization)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
- **200 OK:** Returns all reviews by the authenticated user.

---

### Add a Review
**POST** `/api/items/:id/reviews` (🔒 Requires Authorization)

**Request Body:**
```json
{
  "text": "string",
  "score": "integer",
  "userId": "integer"
}
```

**Response:**
- **201 Created:** Returns the created review.
- **400 Bad Request:** Missing required fields.

---

## Comment Endpoints

### Add a Comment
**POST** `/api/items/:itemId/reviews/:reviewId/comments` (🔒 Requires Authorization)

**Request Body:**
```json
{
  "text": "string",
  "userId": "integer"
}
```

**Response:**
- **201 Created:** Returns the created comment.
- **400 Bad Request:** Missing required fields.

---

### Get User Comments
**GET** `/api/comments/me` (🔒 Requires Authorization)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
- **200 OK:** Returns all comments by the authenticated user.

---

### Update a Comment
**PUT** `/api/users/:userId/comments/:id` (🔒 Requires Authorization)

**Request Body:**
```json
{
  "text": "string"
}
```

**Response:**
- **200 OK:** Returns the updated comment.
- **404 Not Found:** Comment not found.

---

### Delete a Comment
**DELETE** `/api/users/:userId/comments/:id` (🔒 Requires Authorization)

**Response:**
- **204 No Content:** Successfully deleted.
- **404 Not Found:** Comment not found.

