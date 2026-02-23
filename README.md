# 🚀 PromptPulse (Backend)

PromptPulse is a backend-centric system designed to securely store, manage, and analyze user-generated content, with AI integration built through a controlled, backend-driven architecture.

This project emphasizes **backend engineering**, **system design**, **security**, and **scalable API architecture**, rather than frontend complexity.

---

## 🎯 Project Goals

- ✨ Design secure and production-ready REST APIs
- 🔑 Implement full authentication lifecycle (access + refresh tokens)
- 👥 Enforce real-world data ownership rules
- 📊 Support scalable data access with indexing & pagination
- 🤖 Integrate AI safely through backend-controlled workflows
- 🏆 Build an interview-ready backend system with explainable design decisions

---

## 🔐 Authentication System (Complete Lifecycle)

- **User signup and login**
- **Password hashing** using bcrypt
- **JWT-based stateless authentication**
- **Short-lived Access Tokens** (15m)
- **Long-lived Refresh Tokens** (7d)
- **Refresh token stored in database** for revocation
- **Secure token renewal endpoint**
- **Logout with refresh token invalidation**
- **Protected routes** via authentication middleware

### This design ensures:

- Limited exposure if access token is compromised
- Controlled session renewal
- Proper logout and session revocation

---

## 📄 Content Management

- **Create, read, update content** with structured endpoints
- **Ownership enforced** using `userId` extracted from JWT
- **Soft delete** using lifecycle-aware design
- **Structured and consistent API responses**
- **Clean RESTful routing**

---

## 🔍 Data Access & Scalability

- **Keyword-based search** across user content
- **Type-based filtering** for granular queries
- **Limit–offset pagination** for large datasets
- **Compound indexing** for optimized queries:
  - `{ userId, isDeleted }`
  - `{ createdAt }`
- **Designed to avoid full collection scans**
- Ensures efficient performance as data grows

---

## 🛡️ Backend Robustness

- ✅ **Centralized error handling middleware**
- ✅ **Structured JSON response format**
- ✅ **Rate limiting** (auth and sensitive endpoints)
- ✅ **Request logging** for debugging and observability

---

## 🤖 AI Integration (Architecture Ready)

- 🔧 **Service-layer abstraction** for AI calls
- 🛡️ **Backend-controlled prompt construction**
- 🔐 **Ownership validation** before AI execution
- 📚 **Designed for Retrieval-Augmented Generation (RAG)**
- 💾 **Embeddings treated as derived, rebuildable data**
- 🚫 AI never bypasses backend authorization rules

---

## 🏗️ Tech Stack

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Minimalist web framework
- **MongoDB** – NoSQL database (Mongoose ODM)
- **JWT** – Stateless authentication
- **bcrypt** – Password hashing
- **Docker** – Containerization

### AI Layer (Planned Integration)
- **OpenAI / Gemini API** – LLM provider
- **Embeddings API** – Vector generation
- **Vector Store** – FAISS or similar

### Frontend (Minimal Demo Only)
- **React** – API consumption only

---

## 📦 Current Feature Status

| Feature | Status |
|---------|--------|
| Authentication (Access + Refresh) | ✅ Completed |
| Refresh Token DB Validation | ✅ Completed |
| Logout & Token Revocation | ✅ Completed |
| Content CRUD | ✅ Completed |
| Ownership Enforcement | ✅ Completed |
| Soft Delete Lifecycle | ✅ Completed |
| Search & Filtering | ✅ Completed |
| Pagination | ✅ Completed |
| Compound Indexing | ✅ Completed |
| Rate Limiting | ✅ Completed |
| Centralized Error Handling | ✅ Completed |
| AI Summarization | ⏳ In Progress |
| AI Q&A (RAG) | ⏳ In Progress |

---

## 📌 Interview Positioning

PromptPulse demonstrates:

- 🔐 **Secure authentication design** – Token lifecycle management
- 👑 **Data ownership enforcement** – Query-level security
- ⚡ **Query optimization** – Compound indexing strategies
- 📈 **Scalable REST API design** – Pagination & search patterns
- 🤖 **Controlled AI integration** – Backend-first architecture

This project is built as an **interview anchor** to showcase backend and system design thinking.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 16+
- MongoDB instance
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Navigate to project directory
cd PromptPulse

# Install dependencies
npm install

# Start development server
npm run dev
```

The server will start at `http://localhost:5000`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

### Server Configuration

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Port number for the server | ✅ Yes | `5000` |

### Database Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | ✅ Yes | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |

### JWT Configuration

| Variable | Description | Required | Notes |
|----------|-------------|----------|-------|
| `ACCESS_TOKEN_SECRET` | Secret key for signing access tokens | ✅ Yes | Use a strong random string (min 32 chars) |
| `REFRESH_TOKEN_SECRET` | Secret key for signing refresh tokens | ✅ Yes | Use a different strong random string |

### AI Integration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `LLM_API_KEY` | API key for OpenAI or Gemini | ⏳ No* | `sk-...` or `AIza...` |

**Note:** `LLM_API_KEY` is optional until AI features are enabled.

### Sample `.env` File

```env
# ═══════════════════════════════════════════════════════════
# 🖥️  SERVER CONFIGURATION
# ═══════════════════════════════════════════════════════════
PORT=5000


# ═══════════════════════════════════════════════════════════
# 🗄️  DATABASE CONFIGURATION
# ═══════════════════════════════════════════════════════════
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/promptpulse?retryWrites=true&w=majority


# ═══════════════════════════════════════════════════════════
# 🔐 JWT SECRETS
# ═══════════════════════════════════════════════════════════
# Generate strong random strings using:
# Linux/Mac: openssl rand -base64 32
# Windows: Use online generator
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_min_32_chars
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_min_32_chars


# ═══════════════════════════════════════════════════════════
# 🤖 AI INTEGRATION
# ═══════════════════════════════════════════════════════════
# Optional: Enable when integrating AI features
LLM_API_KEY=your_openai_or_gemini_api_key_here
```

## 🧱 Architecture Philosophy

- 🎯 **Backend is the single source of truth**
- 🔑 **Authentication is stateless but revocable**
- 🤖 **AI is treated as a controlled service layer**
- 📊 **Data lifecycle is intentional and recoverable**
- 💡 **Design decisions prioritize explainability over overengineering**

---

## 📚 Project Structure

```
src/
├── controllers/        # Route handlers and business logic
│   ├── aiController.js
│   ├── authController.js
│   └── contentController.js
├── middleware/         # Express middleware
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── rateLimiter.js
├── models/            # Mongoose schemas
│   ├── User.js
│   ├── Content.js
│   └── Embedding.js
├── routes/            # API route definitions
│   ├── authRoute.js
│   ├── contentRoutes.js
│   ├── airRoutes.js
│   └── testRoutes.js
├── services/          # Business logic and integrations
│   └── aiService.js
├── app.js             # Express app configuration
└── server.js          # Server entry point
```

---

## 🚀 API Overview

### Authentication
- `POST /auth/signup` – Register new user
- `POST /auth/login` – User login
- `POST /auth/refresh` – Refresh access token
- `POST /auth/logout` – Logout and revoke token

### Content
- `POST /content` – Create new content
- `GET /content` – Retrieve user's content (paginated)
- `GET /content/:id` – Get specific content
- `PUT /content/:id` – Update content
- `DELETE /content/:id` – Soft delete content

### AI Services
- `POST /ai/summarize` – Generate content summary
- `POST /ai/qa` – Q&A over content

---

## 🛠️ Development

```bash
# Run tests
npm test

# Check linting
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

---

## 💬 Key Design Decisions

1. **Token-Based Auth** – Stateless, scalable authentication with revocable refresh tokens
2. **Ownership at Query Level** – Every database query filters by `userId`
3. **Soft Deletes** – Data recovery and auditability through `deletedAt` timestamps
4. **Compound Indexes** – Performance optimization for common query patterns
5. **Service Layer** – Abstraction between controllers and external APIs
6. **Centralized Error Handling** – Consistent error responses across all endpoints

---

## 👨‍💻 Author

Built as a production-ready backend system for learning and interview preparation.

---

**Happy coding! 🎉**