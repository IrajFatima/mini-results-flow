![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=flat-square&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-316192?style=flat-square&logo=postgresql)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-4CAF50?style=flat-square)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?style=flat-square&logo=google)
![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=flat-square&logo=react)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

# 🔐 Authentication & Role-Based Access Control System

**Current PR:** [#5 - Authentication and role based access implemented](https://github.com/IrajFatima/mini-results-flow/pull/5)

**Status:** ✅ Open | **Changes:** +2433 | **Files:** 46 files modified/created

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [User Flows](#user-flows)
- [Technology Stack](#technology-stack)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication Flows](#authentication-flows)
- [Authorization & Roles](#authorization--roles)
- [Environment Configuration](#environment-configuration)
- [Security Considerations](#security-considerations)
- [Deployment](#deployment)

---

## 🎯 Overview

This document provides comprehensive documentation for the **Authentication & Role-Based Access Control (RBAC)** system integrated into the mini-results-flow application.

**Key Features Implemented:**
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing using bcrypt
- ✅ Role-based access control (Admin/User)
- ✅ Anonymous guest submissions (single form per session)
- ✅ Protected API endpoints with middleware
- ✅ Form data isolation by user/session
- ✅ Admin dashboard for reviewing all submissions
- ✅ User dashboard for personal submissions

---

## 🏗️ System Architecture

### Authentication & Authorization Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Frontend: React 19 + AuthContext + Axios                │   │
│  │  ├─ Login Page (Email/Password)                          │   │
│  │  ├─ Signup Page (Name/Email/Password)                    │   │
│  │  ├─ Dashboard (View/Delete Submissions)                  │   │
│  │  └─ Guest Mode (Anonymous Session)                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│              ↓ JWT Token (Authorization Header)                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express.js Server (Node.js + TypeScript)                │   │
│  │  Port: 3000                                              │   │
│  │  CORS Enabled: Frontend Origin                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   MIDDLEWARE LAYER                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Authenticate (Required)                                 │   │
│  │  ├─ Verify JWT token                                    │   │
│  │  ├─ Extract user data                                    │   │
│  │  └─ Return 401 if missing/invalid                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  OptionalAuthenticate                                    │   │
│  │  ├─ Allow anonymous access                               │   │
│  │  ├─ Attach user if token provided                        │   │
│  │  └─ Return 401 only if token invalid                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Authorize (Role-Based)                                  │   │
│  │  ├─ Check user.role against required roles               │   │
│  │  └─ Return 403 if unauthorized                           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Route Handlers                                          │   │
│  │  ├─ POST /api/auth/signup         → Register            │   │
│  │  ├─ POST /api/auth/login          → Login               │   │
│  │  ├─ GET  /api/auth/me             → Current User        │   │
│  │  ├─ POST /api/form                → Submit              │   │
│  │  ├─ GET  /api/form/:id            → Get Form            │   │
│  │  ├─ GET  /api/form/all/user       → User's Forms        │   │
│  │  ├─ GET  /api/form/all/admin      → All Forms (Admin)   │   │
│  │  └─ DELETE /api/form/:id          → Delete Form         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   DATA PERSISTENCE LAYER                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  PostgreSQL (via Supabase)                               │   │
│  │                                                           │   │
│  │  users Table:                                            │   │
│  │  ├─ id (UUID, Primary Key)                              │   │
│  │  ├─ name (VARCHAR)                                       │   │
│  │  ├─ email (VARCHAR, UNIQUE)                              │   │
│  │  ├─ password_hash (TEXT)                                 │   │
│  │  ├─ role (VARCHAR: 'admin' | 'user')                     │   │
│  │  └─ created_at (TIMESTAMP)                               │   │
│  │                                                           │   │
│  │  form_data Table (Enhanced):                             │   │
│  │  ├─ id (UUID)                                            │   │
│  │  ├─ user_id (UUID, FK → users.id)                       │   │
│  │  ├─ is_anonymous (BOOLEAN)                               │   │
│  │  ├─ anonymous_session_id (UUID)                          │   │
│  │  ├─ [health metrics...]                                  │   │
│  │  └─ created_at (TIMESTAMP)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👥 User Flows

### 1️⃣ User Registration Flow

```
┌────────────────────────────────┐
│ USER VISITS SIGNUP PAGE        │
└──────────────┬─────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ FILL REGISTRATION FORM                         │
│ ├─ Name (3-100 chars)                          │
│ ├─ Email (valid format, unique)                │
│ └─ Password (8+ chars, uppercase, lowercase,   │
│    number required)                            │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ FRONTEND VALIDATION                            │
│ ├─ Check all fields filled                     │
│ ├─ Validate email format                       │
│ └─ Validate password strength                  │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ POST /api/auth/signup                          │
│ └─ Send: { name, email, password }             │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ BACKEND: AUTH VALIDATION (express-validator)   │
│ ├─ Name: 3-100 chars, required                │
│ ├─ Email: valid format, unique check           │
│ └─ Password: strength requirements             │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ HASH PASSWORD (bcrypt, 10 rounds)              │
│ └─ bcrypt.hash(password, SALT_ROUNDS)         │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ CREATE USER IN DATABASE                        │
│ INSERT INTO users (name, email, password_hash) │
│ VALUES (...)                                   │
│ RETURNING id, name, email, role, created_at    │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ RESPONSE: 201 Created                          │
│ {                                              │
│   "success": true,                             │
│   "message": "Account created successfully.",  │
│   "user": {                                    │
│     "id": "uuid",                              │
│     "name": "John Doe",                        │
│     "email": "john@example.com",               │
│     "role": "user",                            │
│     "created_at": "2026-07-07T..."             │
│   }                                            │
│ }                                              │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ REDIRECT TO LOGIN PAGE                         │
│ User prompted to sign in                       │
└────────────────────────────────────────────────┘
```

### 2️⃣ User Login Flow

```
┌────────────────────────────────┐
│ USER VISITS LOGIN PAGE         │
└──────────────┬─────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ ENTER CREDENTIALS                              │
│ ├─ Email                                       │
│ └─ Password                                    │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ FRONTEND VALIDATION                            │
│ ├─ Email format valid                          │
│ └─ Password not empty                          │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ POST /api/auth/login                           │
│ └─ Send: { email, password }                   │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ BACKEND: FIND USER BY EMAIL                    │
│ SELECT * FROM users WHERE email = $1           │
└──────────────┬─────────────────────────────────┘
               ↓
     ┌─────────┴──────────┐
     ↓                    ↓
┌─────────────┐   ┌───────────────┐
│ User Found  │   │ User Not Found│
└──────┬──────┘   └───────┬───────┘
       ↓                  ↓
    CONTINUE         Return 401
                   "Invalid email
                    or password"
       ↓
┌────────────────────────────────────────────────┐
│ COMPARE PASSWORD (bcrypt)                      │
│ bcrypt.compare(password, user.password_hash)   │
└──────────────┬─────────────────────────────────┘
               ↓
     ┌─────────┴──────────┐
     ↓                    ↓
┌──────────────┐  ┌───────────────┐
│ Match ✓      │  │ No Match ✗    │
└──────┬───────┘  └───────┬───────┘
       ↓                  ↓
    CONTINUE         Return 401
                   "Invalid email
                    or password"
       ↓
┌────────────────────────────────────────────────┐
│ GENERATE JWT TOKEN                             │
│ jwt.sign({                                     │
│   id: user.id,                                 │
│   email: user.email,                           │
│   role: user.role                              │
│ }, JWT_SECRET, {                               │
│   expiresIn: "7d"                              │
│ })                                             │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ RESPONSE: 200 OK                               │
│ {                                              │
│   "success": true,                             │
│   "message": "Login successful.",              │
│   "token": "eyJhbGc...",                       │
│   "user": {                                    │
│     "id": "uuid",                              │
│     "name": "John",                            │
│     "email": "john@example.com",               │
│     "role": "user"                             │
│   }                                            │
│ }                                              │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ FRONTEND: STORE AUTH DATA                      │
│ ├─ Save JWT in localStorage                    │
│ ├─ Save user data in AuthContext               │
│ └─ Save user data in localStorage              │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ REDIRECT TO DASHBOARD                          │
│ User can access protected routes               │
└────────────────────────────────────────────────┘
```

### 3️⃣ Protected API Request Flow

```
┌────────────────────────────────┐
│ CLIENT MAKES REQUEST            │
│ (Dashboard, Form Submission)    │
└──────────────┬─────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ ADD JWT TO REQUEST HEADER                      │
│ GET /api/form/all/user                         │
│ Authorization: Bearer <JWT_TOKEN>              │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ MIDDLEWARE: AUTHENTICATE                       │
│ ├─ Extract token from header                   │
│ ├─ Verify JWT signature & expiration           │
│ ├─ Decode payload                              │
│ └─ Attach user to req.user                     │
└──────────────┬─────────────────────────────────┘
               ↓
     ┌─────────┴──────────────┐
     ↓                        ↓
┌──────────────┐      ┌───────────────┐
│ Valid Token  │      │ Invalid/Expired
└──────┬───────┘      └───────┬───────┘
       ↓                      ↓
    CONTINUE             Return 401
    to next              "Invalid or
    middleware           expired token"
       ↓
┌────────────────────────────────────────────────┐
│ MIDDLEWARE: AUTHORIZE (if needed)              │
│ ├─ Check if user role in required roles        │
│ ├─ Admin endpoints require role="admin"        │
│ └─ User endpoints require role="user"|"admin"  │
└──────────────┬─────────────────────────────────┘
               ↓
     ┌─────────┴──────────────┐
     ↓                        ↓
┌──────────────┐      ┌───────────────┐
│ Authorized   │      │ Not Authorized│
└──────┬───────┘      └───────┬───────┘
       ↓                      ↓
    CONTINUE             Return 403
    to handler           "Not authorized"
       ↓
┌────────────────────────────────────────────────┐
│ EXECUTE HANDLER                                │
│ req.user available in controller               │
│ Access control by user_id or admin check       │
└────────────────────────────────────────────────┘
```

### 4️⃣ Anonymous/Guest Submission Flow

```
┌────────────────────────────────┐
│ GUEST VISITS APPLICATION       │
│ (No login required)            │
└──────────────┬─────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ GENERATE ANONYMOUS SESSION ID                  │
│ uuid() → anonymousSessionId (localStorage)     │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ COMPLETE FORM                                  │
│ └─ Health metrics input                        │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ POST /api/form (NO AUTH REQUIRED)              │
│ ├─ anonymousSessionId from body                │
│ ├─ is_anonymous = true                         │
│ └─ user_id = null                              │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ BACKEND: CHECK SUBMISSION LIMIT                │
│ SELECT EXISTS (                                │
│   SELECT 1 FROM form_data                      │
│   WHERE anonymous_session_id = $1              │
│ )                                              │
└──────────────┬─────────────────────────────────┘
               ↓
     ┌─────────┴──────────────┐
     ↓                        ↓
┌──────────────┐      ┌──────────────────┐
│ No Prior     │      │ Already Submitted│
│ Submission   │      │ Once             │
└──────┬───────┘      └──────┬───────────┘
       ↓                     ↓
    CONTINUE           Return 403
    with INSERT        "Guests can only
                       submit once..."
       ↓
┌────────────────────────────────────────────────┐
│ INSERT FORM DATA                               │
│ INSERT INTO form_data (                        │
│   user_id=NULL,                                │
│   is_anonymous=true,                           │
│   anonymous_session_id=uuid,                   │
│   ...metrics                                   │
│ ) RETURNING id                                 │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ RESPONSE: 201 Created                          │
│ └─ Return form ID (formId)                     │
└──────────────┬─────────────────────────────────┘
               ↓
┌────────────────────────────────────────────────┐
│ NAVIGATE TO RESULTS PAGE                       │
│ ├─ Send anonymousSessionId as header           │
│ │  X-Anonymous-Session: <sessionId>            │
│ └─ Backend validates ownership via header      │
└────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 19.2.7 | UI Framework |
| | TypeScript | 6.0.2 | Type Safety |
| | Vite | 8.1.0 | Build Tool |
| | React Router | 7.18.0 | Client Navigation |
| | Axios | 1.18.1 | HTTP Client |
| | React Toastify | 11.1.0 | Notifications |
| | Framer Motion | 12.42.0 | Animations |
| **Backend** | Express.js | 5.2.1 | API Framework |
| | TypeScript | 6.0.3 | Type Safety |
| | Node.js | 18+ | Runtime |
| | **JWT** | **9.0.3** | **Token Auth** |
| | **bcrypt** | **6.0.0** | **Password Hash** |
| | **express-validator** | **7.3.2** | **Input Validation** |
| **Database** | PostgreSQL | Latest | Relational DB |
| | Supabase | - | Hosting |
| | pg | 8.22.0 | SQL Client |
| **AI Service** | Google Gemini | 2.5 Flash | Recommendations |
| **Deployment** | Vercel | - | Cloud Platform |

---

## 🔧 Backend Implementation

### New Authentication Files Created (PR #5)

#### 1. Controllers

**`backend/controllers/authController.ts`** (63 lines added)
```typescript
- signup(req, res) → Creates new user account
- login(req, res) → Authenticates user, returns JWT
```

**Modified `backend/controllers/formController.ts`** (+99 lines)
```typescript
- NEW: getAllFormDataForUser() → Get user's submissions
- NEW: getAllFormDataForAdmin() → Get all submissions (admin only)
- ENHANCED: submitForm() → Now accepts userId, anonymous mode
- ENHANCED: getFormData() → Access control checks
- ENHANCED: deleteFormData() → Access control checks
```

#### 2. Services

**`backend/services/authService.ts`** (90 lines added)
```typescript
export const signupUser = async (data) → Register new user
export const loginUser = async (data) → Authenticate & return token
```

#### 3. Middleware

**`backend/middleware/authenticate.ts`** (33 lines)
- Extracts JWT from Authorization header
- Verifies token signature
- Attaches user to req.user
- Returns 401 if missing/invalid

**`backend/middleware/authorize.ts`** (29 lines)
- Checks user role against required roles
- Returns 403 if unauthorized
- Supports multiple role parameters

**`backend/middleware/optionalAuthenticate.ts`** (55 lines)
- Allows anonymous access
- Validates token if provided
- Returns 401 only for invalid tokens

**`backend/middleware/validateRequest.ts`** (19 lines)
- Validates request using express-validator
- Returns 400 with error details

#### 4. Utilities

**`backend/utils/jwt.ts`** (25 lines)
```typescript
export interface JwtPayload {
  id: string;
  email: string;
  role: "admin" | "user";
}

export const generateToken(payload) → Creates JWT
export const verifyToken(token) → Validates JWT
```

**`backend/utils/password.ts`** (14 lines)
```typescript
export const hashPassword(password) → Bcrypt hash
export const comparePassword(password, hash) → Verify password
```

#### 5. Validators

**`backend/validators/authValidator.ts`** (52 lines)
```typescript
export const signupValidator = [...]  → Name, email, password rules
export const loginValidator = [...] → Email, password rules
```

#### 6. Types

**`backend/types/express.d.ts`** (12 lines)
```typescript
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
```

#### 7. Routes

**`backend/routes/authRoutes.ts`** (46 lines added)
```typescript
POST   /api/auth/signup  → signupValidator → signup
POST   /api/auth/login   → loginValidator → login
GET    /api/auth/me      → authenticate → authorize("admin", "user")
```

**Modified `backend/routes/formRoutes.ts`**
```typescript
POST   /api/form                → optionalAuthenticate
GET    /api/form/all/user       → authenticate → authorize("user")
GET    /api/form/all/admin      → authenticate → authorize("admin")
GET    /api/form/:id            → optionalAuthenticate
DELETE /api/form/:id            → optionalAuthenticate
```

#### 8. Repositories

**Modified `backend/repositories/formRepository.ts`** (+187 lines)
```typescript
NEW: getFormByUser(id, userId)
NEW: getFormByAnonymousSession(id, sessionId)
NEW: deleteFormByUser(id, userId)
NEW: deleteFormByAnonymousSession(id, sessionId)
NEW: anonymousSubmissionExists(sessionId)
NEW: getAllFormDataForUser(userId)
NEW: getAllFormDataForAdmin()
```

**Modified `backend/repositories/resultRepository.ts`** (+63 lines)
```typescript
NEW: getResultById(id)                    → Admin access
NEW: getResultByUser(id, userId)          → Authenticated user
NEW: getResultByAnonymousSession(id, sid) → Guest access
REFACTORED: buildResultCards() → Extracted common logic
```

#### 9. Dependencies Added (package.json)

```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",                    // Password hashing
    "jsonwebtoken": "^9.0.3",              // JWT generation/verification
    "express-validator": "^7.3.2"          // Input validation
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/jsonwebtoken": "^9.0.10"
  }
}
```

---

## 💻 Frontend Implementation

### New Authentication Features (PR #5)

#### 1. New Pages

**`frontend/src/features/login/LoginPage.tsx`** (270 lines)
- Email & password input with icons
- Form validation with error messages
- "Forgot Password?" link (placeholder)
- "Continue as Guest" button
- Link to signup page
- Loading state management

**`frontend/src/features/dashboard/DashboardPage.tsx`** (64 lines)
- Displays user's submissions (or all if admin)
- Shows "Admin Dashboard" or "My Submissions"
- Integrates FormSubmissionList component
- Handles loading state

#### 2. New Components

**`frontend/src/components/FormSubmissionCard.tsx`** (188 lines)
- Expandable card showing submission details
- Quick metrics: BMI, Body Fat, Calories
- Full metrics when expanded
- View Results button → navigates to results
- Delete button with confirmation
- Dark mode support
- Framer Motion animations

**`frontend/src/components/FormSubmissionList.tsx`** (64 lines)
- Maps through submissions array
- Renders FormSubmissionCard for each
- Handles delete action
- Handles view results navigation
- Shows "No submissions" message

#### 3. New Context & Hooks

**`frontend/src/context/AuthContext.tsx`** (74 lines)
```typescript
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login(token, user): void;
  logout(): void;
}

- Loads auth from localStorage on mount
- Provides user, token, loading, login, logout
```

#### 4. Types

**`frontend/src/types/formDataDisplay.ts`** (NEW)
```typescript
interface FormDataDisplay {
  id: string;
  userId: string | null;
  isAnonymous: boolean;
  anonymousSessionId: string | null;
  gender: "male" | "female";
  bodyFatPercent: number;
  bmi: number;
  calorieTarget: number;
  waterIntake: number;
  weightLossRate: number;
  seeResultsDays: number;
  createdAt: string;
}
```

**`frontend/src/types/auth.ts`** (NEW)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType { ... }
```

#### 5. Services

**`frontend/src/services/auth.ts`** (NEW)
```typescript
export const signup = async (data) → POST /api/auth/signup
export const login = async (data) → POST /api/auth/login
```

**Modified `frontend/src/services/form.ts`**
```typescript
NEW: getAllFormData(role) → GET /api/form/all/user or /admin
ENHANCED: submitForm() → Now supports anonymous submissions
ENHANCED: deleteFormData() → Now uses auth headers
```

#### 6. Utilities

**`frontend/src/utils/token.ts`** (NEW)
```typescript
export const saveAuth(token, user) → localStorage
export const getToken() → Get JWT from storage
export const getUser() → Get user data from storage
export const clearAuth() → Clear on logout
```

#### 7. Hooks

**`frontend/src/hooks/useAuth.ts`** (NEW)
```typescript
export const useAuth = () → Returns AuthContext value
```

#### 8. Modified Features

**`frontend/src/features/form/FormPage.tsx`** (Modified)
- Simplified: removed auto-load from storage
- Now uses context/auth for user data
- Better error handling with axios
- Supports both authenticated and guest submissions

---

## 📊 Database Schema

### Users Table (NEW)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    name VARCHAR(100) NOT NULL,
    
    email VARCHAR(255) UNIQUE NOT NULL,
    
    password_hash TEXT NOT NULL,
    
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('admin', 'user'))
        DEFAULT 'user',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Constraints:**
- ✅ UUID auto-generation
- ✅ Email uniqueness (prevents duplicate accounts)
- ✅ Role enum constraint (only 'admin' or 'user')
- ✅ Password hash stored (never plain text)
- ✅ Timestamp tracking

### Form Data Table (Enhanced)

```sql
CREATE TABLE form_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    user_id UUID NULL
        REFERENCES users(id)
        ON DELETE SET NULL,
    
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    
    anonymous_session_id UUID NULL,
    
    gender VARCHAR(10) NOT NULL
        CHECK (gender IN ('male', 'female')),
    
    body_fat_percent NUMERIC NOT NULL,
    bmi NUMERIC NOT NULL,
    calorie_target NUMERIC NOT NULL,
    water_intake NUMERIC NOT NULL,
    weight_loss_rate NUMERIC NOT NULL,
    see_results_days NUMERIC NOT NULL,
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**New Columns:**
- `user_id` - Foreign key to users (NULL for guests)
- `is_anonymous` - Boolean flag for guest submissions
- `anonymous_session_id` - UUID for guest session tracking

---

## 🔌 API Endpoints

### Authentication Endpoints

#### 1. Sign Up

```http
POST /api/auth/signup HTTP/1.1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully.",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2026-07-07T10:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Email already exists.",
      "param": "email"
    }
  ]
}
```

#### 2. Login

```http
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

#### 3. Get Current User (Protected)

```http
GET /api/auth/me HTTP/1.1
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### Form Endpoints (Enhanced)

#### 1. Submit Form (Optional Auth)

```http
POST /api/form HTTP/1.1
Content-Type: application/json
[Authorization: Bearer <TOKEN>]  // Optional

{
  "gender": "male",
  "bodyFatPercent": 25,
  "BMI": 24,
  "calorieTarget": 2000,
  "waterIntake": 8,
  "weightLossRate": 1.5,
  "seeResultsDays": 14,
  "anonymousSessionId": "550e8400-..." // If guest
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Form submitted successfully.",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### 2. Get User's Forms (Protected - User Role)

```http
GET /api/form/all/user HTTP/1.1
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "user-uuid",
      "isAnonymous": false,
      "gender": "male",
      "bodyFatPercent": 25,
      "bmi": 24,
      "calorieTarget": 2000,
      "waterIntake": 8,
      "weightLossRate": 1.5,
      "seeResultsDays": 14,
      "createdAt": "2026-07-07T10:30:00Z"
    }
  ]
}
```

#### 3. Get All Forms (Protected - Admin Only)

```http
GET /api/form/all/admin HTTP/1.1
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    // All forms from all users and anonymous
  ]
}
```

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "You are not authorized to access this resource."
}
```

#### 4. Get Single Form (Optional Auth)

```http
GET /api/form/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
[Authorization: Bearer <TOKEN>]  // Optional for guests

// If guest, also send:
X-Anonymous-Session: 550e8400-e29b-41d4-a716-446655440001
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    // form data...
  }
}
```

---

## 🔐 Authentication Flows

### JWT Token Structure

```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "role": "user",
  "iat": 1688745000,
  "exp": 1689350000  // 7 days later
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  JWT_SECRET
)
```

### Token Flow

```
1. User logs in
   ↓
2. Backend generates JWT with payload
   ↓
3. JWT sent to client
   ↓
4. Client stores JWT in localStorage
   ↓
5. Client includes JWT in Authorization header: "Bearer <token>"
   ↓
6. Backend extracts token from header
   ↓
7. Backend verifies JWT signature with JWT_SECRET
   ↓
8. If valid, decode payload and attach to req.user
   ↓
9. Continue to next middleware/handler
```

### Password Hashing

```
User enters password "SecurePass123"
          ↓
bcrypt.hash(password, SALT_ROUNDS)
  └─ SALT_ROUNDS = 10
  └─ Generates random salt
  └─ Hashes password with salt 10 times
          ↓
Returns hash: "$2b$10$N9qo8uLOickgx..."
          ↓
Store in password_hash column
```

**On Login:**
```
User enters password "SecurePass123"
          ↓
Retrieve stored hash from database
          ↓
bcrypt.compare(password, hash)
  └─ Returns boolean
  └─ True if password matches hash
  └─ False if mismatch
          ↓
If true: Generate JWT and allow login
If false: Return 401 "Invalid credentials"
```

---

## 👥 Authorization & Roles

### Role-Based Access Control (RBAC)

**Two Roles Implemented:**

| Role | Permissions | Endpoints |
|------|-------------|-----------|
| **user** | View/delete own forms | GET /api/form/all/user, DELETE /api/form/:id |
| **admin** | View all forms, manage system | GET /api/form/all/admin, GET /api/auth/me |

### Authorization Middleware Pattern

```typescript
// Usage:
router.get(
  "/admin-only",
  authenticate,           // Checks JWT validity
  authorize("admin"),     // Checks user.role === "admin"
  handler
);

// Multiple roles:
router.get(
  "/protected",
  authenticate,
  authorize("admin", "user"),
  handler
);
```

### Access Control Examples

**Form Submission:**
- ✅ Authenticated users: Submit with user_id
- ✅ Anonymous guests: Submit with anonymous_session_id
- ⚠️ Guests limited to 1 submission per session

**View Submissions:**
- ✅ Users: See only their own
- ✅ Admins: See all submissions

**View Results:**
- ✅ Authenticated: Via user_id check
- ✅ Guest: Via X-Anonymous-Session header

---

## ⚙️ Environment Configuration

### Backend Environment Variables

Create `.env` file in `backend/` directory:

```env
# Server
PORT=3000

# Database (Supabase)
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# AI (Google Gemini)
AI_API_KEY=your_google_ai_key
AI_MODEL=gemini-2.5-flash

# CORS
FRONTEND_URL=http://localhost:5173
```

**How to Get:**

1. **DATABASE_URL** (Supabase)
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select project → Settings → Database
   - Copy connection string (PostgreSQL)
   - Format: `postgresql://user:password@host:5432/db`

2. **JWT_SECRET**
   - Generate: `openssl rand -base64 32`
   - Must be 32+ characters
   - Keep secret, never commit to Git

3. **AI_API_KEY**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Copy and paste

### Frontend Environment Variables

Create `.env` file in `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

**Production:**
```env
VITE_API_URL=https://mini-results-flow-backend.vercel.app/api
```

---

## 🔐 Security Considerations

### ✅ Implemented

1. **Password Security**
   - ✅ Hashed with bcrypt (10 rounds)
   - ✅ Never stored in plain text
   - ✅ Strong password requirements enforced

2. **Token Security**
   - ✅ JWT signed with HS256
   - ✅ Token expiration (7 days)
   - ✅ Sent via Authorization header (not cookie)

3. **Data Isolation**
   - ✅ Users can only view/delete own forms
   - ✅ Admins can view all (no delete needed yet)
   - ✅ Anonymous sessions tracked separately

4. **Input Validation**
   - ✅ express-validator middleware
   - ✅ Email format validation
   - ✅ Password strength validation
   - ✅ Type checking on all inputs

5. **SQL Injection Prevention**
   - ✅ Parameterized queries ($1, $2, etc.)
   - ✅ No string interpolation in SQL
   - ✅ pg library handles escaping

6. **Error Handling**
   - ✅ No sensitive info in error messages
   - ✅ Generic "Invalid credentials" for auth
   - ✅ Structured error responses

### ⚠️ Recommendations for Production

1. **HTTPS Only**
   - Force HTTPS in production
   - Verify SSL certificates

2. **Rate Limiting**
   - Implement on /api/auth/login
   - Prevent brute force attacks
   - Limit to 5 attempts per 15 minutes

3. **CORS Restriction**
   ```typescript
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true
   }));
   ```

4. **Secrets Management**
   - Use environment variables only
   - Never commit .env files
   - Rotate secrets periodically
   - Use Vercel Secrets for production

5. **Logging & Monitoring**
   - Log auth attempts
   - Monitor failed logins
   - Alert on admin actions

6. **Data Retention**
   - Implement data deletion policies
   - GDPR compliance
   - User data export functionality

7. **Additional Features**
   - Email verification on signup
   - Password reset flow
   - Two-factor authentication (2FA)
   - Session management
   - Account lockout after failed attempts

---

## 🚀 Deployment

### Vercel Deployment (Backend)

1. **Connect GitHub repo**
   - Vercel Dashboard → Add Project
   - Select IrajFatima/mini-results-flow
   - Set root directory to `backend`

2. **Configure Environment**
   - Settings → Environment Variables
   - Add all variables from .env
   ```
   DATABASE_URL
   JWT_SECRET
   JWT_EXPIRES_IN
   AI_API_KEY
   AI_MODEL
   ```

3. **Deploy**
   - Push to main branch
   - Vercel auto-deploys
   - Live at: https://mini-results-flow-backend.vercel.app

### Vercel Deployment (Frontend)

1. **Connect GitHub repo**
   - Vercel Dashboard → Add Project
   - Select IrajFatima/mini-results-flow
   - Set root directory to `frontend`

2. **Configure Environment**
   - Settings → Environment Variables
   ```
   VITE_API_URL=https://mini-results-flow-backend.vercel.app/api
   ```

3. **Deploy**
   - Push to main branch
   - Vercel auto-deploys
   - Live at: https://mini-results-flow-pi.vercel.app

---

## 📊 PR Summary

**Pull Request:** [#5 - Authentication and role based access implemented](https://github.com/IrajFatima/mini-results-flow/pull/5)

**Statistics:**
- 📝 **Commits:** 1
- 📁 **Files Changed:** 46
- ➕ **Additions:** 2,433 lines
- ➖ **Deletions:** 110 lines
- 💾 **State:** Open
- ⏱️ **Created:** 3 minutes ago

**Key Changes:**
- ✅ Complete authentication system
- ✅ JWT token generation & verification
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Anonymous guest submissions
- ✅ Admin & user dashboards
- ✅ Input validation middleware
- ✅ Protected API endpoints

---

## 📱 Live Deployment Links

| Service | URL |
|---------|-----|
| **Frontend** | [https://mini-results-flow-pi.vercel.app](https://mini-results-flow-pi.vercel.app) |
| **Backend API** | [https://mini-results-flow-backend.vercel.app](https://mini-results-flow-backend.vercel.app) |
| **GitHub Repo** | [IrajFatima/mini-results-flow](https://github.com/IrajFatima/mini-results-flow) |
| **PR #5** | [Authentication PR](https://github.com/IrajFatima/mini-results-flow/pull/5) |

---

## 🤝 Contributing

To contribute to this authentication system:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/auth-enhancement`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/auth-enhancement`
5. Open a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

<div align="center">

**Made with ❤️ for Secure Health & Wellness Applications**

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)](https://mini-results-flow-pi.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-IrajFatima-181717?style=flat&logo=github)](https://github.com/IrajFatima)
[![TypeScript](https://img.shields.io/badge/Built_with-TypeScript-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

</div>
