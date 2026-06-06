# Social Media Backend Project

## Project Overview
This is a Node.js and Express-based backend for a social media application. It uses MongoDB for data storage and includes features like user authentication, post management, and AI-powered services.

## Tech Stack
- **Backend:** Node.js, Express (v5)
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens) and bcryptjs
- **File Uploads:** Multer
- **AI Integration:** Google Generative AI (`@google/genai`)
- **Environment Management:** dotenv

## Architecture & File Structure
The project follows a modular structure:
- `server.js`: Application entry point.
- `src/app.js`: Express application configuration and route registration.
- `src/controllers/`: Logic for handling API requests and responses.
- `src/models/`: Mongoose schemas and models for data structure.
- `src/routes/`: Definition of API endpoints.
- `src/middleware/`: Custom Express middleware (e.g., authentication).
- `src/service/`: Integration with external services like AI.
- `src/db/`: Database connection configuration.

## Coding Conventions
- **Module System:** Uses CommonJS (`require` and `module.exports`).
- **Naming Conventions:** 
  - Controller functions: `[action]Controller` (e.g., `registerController`).
  - Model files: `[name].model.js`.
  - Route files: `[name].routes.js`.
- **Error Handling:** Currently uses try-catch blocks in controllers.
- **Authentication:**
  - Tokens are stored in HTTP-only cookies named `token`.
  - Use `authmiddleware.js` to protect private routes. It attaches the user object to `req.user`.

## Environment Variables
Ensure the following variables are defined in your `.env` file:
- `MONGODB_URL`: Connection string for MongoDB.
- `JWT_SECRET`: Secret key for signing JWTs.
- `GEMINI_API_KEY`: API key for Google Generative AI services.

## API Endpoints
### Auth Routes (`/auth`)
- `POST /register`: Create a new user account.
- `POST /login`: Authenticate a user and receive a cookie.
- `GET /user`: Fetch the current user's profile (requires authentication).
- `GET /logout`: Clear the authentication cookie.

### Post Routes (`/api/posts`)
- `POST /`: Create a new post with an image (requires authentication).
- `GET /`: Get all posts for the logged-in user (requires authentication).
- `POST /extract-tags`: Extract tags from an image using AI (public).
