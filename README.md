# mini-results-flow

![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.1.0-646CFF?style=flat-square&logo=vite)
![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-316192?style=flat-square&logo=postgresql)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-4CAF50?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.1-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.42.0-0055FF?style=flat-square&logo=framer)
![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?style=flat-square&logo=google)
![Jest](https://img.shields.io/badge/Jest-30.4.2-C21325?style=flat-square&logo=jest)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> A full-stack, multi-step conversion funnel that turns user health metrics into personalized insight cards and a high-converting sales page, backed by a JWT-based authentication system with role-based access control (Admin/User) and anonymous guest submissions.

**[🚀 Live Demo](https://mini-results-flow-pi.vercel.app/)**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [System Architecture](#️-system-architecture)
- [Form Page Features](#-form-page-features)
- [Results Page Features](#-results-page-features)
- [Sales Page Features](#-sales-page-features)
- [User Flows](#-user-flows)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Authentication Flows](#-authentication-flows)
- [Authorization & Roles](#-authorization--roles)
- [Environment Configuration](#️-environment-configuration)
- [Security Considerations](#-security-considerations)
- [Styling](#-styling)
- [Calculations & Logic](#-calculations--logic)
- [Testing](#-testing)
- [Accessibility](#-accessibility)
- [Deployment](#-deployment)
- [Browser Support](#-browser-support)
- [Persistence](#-persistence)
- [Dependencies](#-dependencies)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This application simulates a real-world health & wellness sales funnel with three distinct experiences:

1. **📋 Form Page** - Collects user health metrics (gender, body fat %, BMI, calorie target, hydration, weight loss goals)
2. **📊 Results Page** - 6-step stepper displaying personalized health insights computed from form data
3. **💳 Sales Page** - Plan comparison, benefits list, countdown timer, sticky CTA, and money-back guarantee

It ships with a complete **authentication & role-based access control (RBAC) layer**, so submissions can be tied to registered users, reviewed by admins, or completed anonymously as a guest — all backed by an Express + PostgreSQL (Supabase) API.

**Auth Layer Highlights:**
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

## ✨ Key Features

- ✅ **Multi-Step Form** with real-time validation
- ✅ **6-Card Results Stepper** with Framer Motion animations
- ✅ **Dynamic Sales Page** with:
  - 🖼️ Before/after transformation visualization
  - 💰 Plan comparison (installments vs. discount)
  - ⏱️ 10-minute countdown timer with urgency messaging
  - 📌 Sticky "Claim My Plan" button that appears/disappears on scroll
  - 🛡️ 60-day money-back guarantee section
  - 🔬 Social proof (PubMed, Mayo Clinic citations)
- 🔐 **JWT Authentication** - Signup/login with secure token-based sessions
- 👥 **Role-Based Access Control** - Separate Admin and User permissions
- 🕵️ **Guest Mode** - Anonymous, single-use submissions with no login required
- 📊 **Dashboards** - Personal submission history for users, full visibility for admins
- 📱 **Responsive Design** - Mobile-first, fully responsive layouts
- 🌙 **Dark Mode Support** - Images and components adapt to dark/light themes
- 💾 **Persistent State** - Form data survives page refreshes (localStorage) and, for authenticated users, the database
- ♿ **Accessible Forms** - Proper labels, semantic HTML, keyboard navigation

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 19.2.7 | UI Framework |
| | TypeScript | 6.0.2 | Type Safety |
| | Vite | 8.1.0 | Build Tool |
| | React Router | 7.18.0 | Client Navigation |
| | Axios | 1.18.1 | HTTP Client |
| | React Toastify | 11.1.0 | Notifications |
| | Tailwind CSS | 4.3.1 | Styling |
| | Framer Motion | 12.42.0 | Animations |
| | React Icons | 5.6.0 | Icon Components |
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
| **Testing** | Jest | 30.4.2 | Component & page tests |
| **Deployment** | Vercel | - | Cloud Platform |

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── 📂 features/
│   │   ├── form/
│   │   │   └── FormPage.tsx              # Data collection (auth + guest)
│   │   ├── results/
│   │   │   ├── ResultsPage.tsx           # 6-step stepper orchestration
│   │   │   └── ResultCardComponent.tsx   # Individual result card with animations
│   │   ├── sales/
│   │   │   └── SalesPage.tsx             # Conversion-focused pricing & benefits
│   │   ├── login/
│   │   │   └── LoginPage.tsx             # Login + "Continue as Guest"
│   │   ├── signup/
│   │   │   └── SignupPage.tsx            # Registration form
│   │   └── dashboard/
│   │       └── DashboardPage.tsx         # User/Admin submission dashboard
│   ├── 📂 components/
│   │   ├── RadioGroup.tsx                # Gender selection
│   │   ├── SliderComponent.tsx           # Body fat & BMI sliders
│   │   ├── FormSubmissionCard.tsx        # Expandable submission card
│   │   └── FormSubmissionList.tsx        # Renders list of submissions
│   ├── 📂 context/
│   │   └── AuthContext.tsx               # Auth state (user, token, login/logout)
│   ├── 📂 hooks/
│   │   └── useAuth.ts                    # Access AuthContext value
│   ├── 📂 layout/
│   │   ├── MainLayout.tsx                # Page wrapper with header
│   │   ├── Header.tsx                    # Navigation & branding
│   │   └── Sidebar.tsx                   # Dashboard navigation sidebar
│   ├── 📂 routes/
│   │   ├── AppRoutes.tsx                 # Route definitions
│   │   └── ProtectedRoute.tsx            # Guards routes by auth/role
│   ├── 📂 types/
│   │   ├── form.ts                       # FormData type definition
│   │   ├── resultCard.ts                 # ResultCard interface
│   │   ├── formDataDisplay.ts            # Submission display type
│   │   └── auth.ts                       # User / AuthContextType
│   ├── 📂 services/
│   │   ├── api.ts                        # Shared Axios instance & interceptors
│   │   ├── form.ts                       # Form API calls (auth + anonymous)
│   │   ├── result.ts                     # Result card API calls
│   │   └── auth.ts                       # Signup / login API calls
│   ├── 📂 utils/
│   │   ├── calculations.ts               # Health metric callouts & logic
│   │   ├── localStorage.ts               # Persist & retrieve form data
│   │   ├── defaultFormData.ts            # Initial form state
│   │   ├── anonymousSession.ts           # Generate/read guest session ID
│   │   └── token.ts                      # Save/get/clear JWT & user in storage
│   ├── App.tsx                           # Root component
│   └── main.tsx                          # Entry point

backend/
├── app.ts                                # Express app setup & route mounting
├── controllers/
│   ├── authController.ts                 # signup, login handlers
│   ├── formController.ts                 # submit/get/delete + admin/user listing
│   └── resultController.ts               # Result card retrieval (admin/user/guest)
├── database/
│   └── schema.sql                        # PostgreSQL schema (users, form_data)
├── services/
│   └── authService.ts                    # signupUser, loginUser
├── middleware/
│   ├── authenticate.ts                   # Required JWT auth
│   ├── optionalAuthenticate.ts           # Optional JWT auth (guest-friendly)
│   ├── authorize.ts                      # Role-based access checks
│   └── validateRequest.ts                # express-validator error handling
├── validators/
│   └── authValidator.ts                  # Signup/login field rules
├── repositories/
│   ├── aiRepository.ts                   # Gemini AI recommendation queries
│   ├── formRepository.ts                 # Form data queries (user/guest/admin)
│   └── resultRepository.ts               # Result card queries (user/guest/admin)
├── routes/
│   ├── authRoutes.ts                     # /api/auth/*
│   ├── formRoutes.ts                     # /api/form/*
│   ├── resultRoutes.ts                   # /api/result/*
│   └── aiRoutes.ts                       # /api/ai/*
├── tests/
│   └── form.test.ts                      # Form endpoint tests
├── types/
│   └── express.d.ts                      # Augments Express Request with req.user
└── utils/
    ├── jwt.ts                            # generateToken / verifyToken
    └── password.ts                       # hashPassword / comparePassword
```

---

## 🚀 Getting Started

### Prerequisites

- ✔️ Node.js 18+
- ✔️ npm or yarn
- ✔️ A Supabase (PostgreSQL) project for the backend

### Installation

```bash
# Clone the repository
git clone https://github.com/IrajFatima/mini-results-flow.git
cd mini-results-flow

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running Locally

```bash
# Terminal 1 - backend
cd backend
npm run dev        # Starts Express server on http://localhost:3000

# Terminal 2 - frontend
cd frontend
npm run dev         # Starts Vite dev server on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📝 Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | 🔄 Start dev server (Vite for frontend, ts-node/nodemon for backend) with hot reload |
| `npm run build` | 📦 Build TypeScript & optimize with Vite (frontend) / compile TS (backend) |
| `npm run lint` | 🔍 Run ESLint on all files |
| `npm run preview` | 👁️ Preview production build locally |
| `npm run test` | ✅ Run Jest test suite once |
| `npm run test:watch` | 👀 Run Jest in watch mode for development |

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
│  │  form_data Table:                                         │   │
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

## 📋 Form Page Features

Collects the following metrics with validation:

| Field | Type | Validation | Purpose |
|-------|------|-----------|---------|
| 👤 Gender | Radio (Male/Female) | Required | Determines body fat percentage callouts |
| ⚖️ Body Fat % | Slider | 0-100, Required | Health metric visualization |
| 📊 BMI | Slider | 0-40, Required | Body composition indicator |
| 🔥 Daily Calorie Target | Number Input | > 0, Required | Dietary guidance |
| 💧 Water Intake | Dropdown | 1/2/4/6 cups, Required | Hydration awareness |
| 📉 Weekly Weight Loss Rate | Number Input | > 0, Required | Goal setting |
| ⏳ Days to See Results | Number Input | > 0, Required | Expectation management |

**✅ Submit Button** is disabled until all fields are valid and filled. The form supports both authenticated submissions (tied to `user_id`) and anonymous guest submissions (tied to `anonymous_session_id`).

---

## 🎴 Results Page Features

Displays 6 sequential insight cards:

| # | Card | Description |
|---|------|-------------|
| 1️⃣ | **⚖️ Body Fat %** | Contextualizes body composition with gender-specific guidance |
| 2️⃣ | **📊 BMI** | Explains metabolic impact and energy balance |
| 3️⃣ | **🔥 Calorie Intake** | Discusses calorie quality vs. quantity |
| 4️⃣ | **💧 Hydration** | Highlights water's role in fat-burning and metabolism |
| 5️⃣ | **📉 Weight Loss Rate** | Manages expectations for weekly progress |
| 6️⃣ | **⏳ See Results Timeline** | Motivates with realistic timeframes |

**Each Card Includes:**
- 😊 Emoji header + main metric highlight
- 📝 2 paragraph body copy
- 💬 Dynamic callout message based on user inputs
- 🖼️ Contextual image (with dark mode variants)

**Navigation:**
- ⬅️ Previous button (hidden on first card)
- ➡️ Next button (becomes "Continue" on last card → navigates to sales page)
- 📍 Progress indicator (6 dots showing current step)
- ✨ Framer Motion slide animations between cards

Access to a saved result is validated either via the authenticated `user_id` or an `X-Anonymous-Session` header for guests.

---

## 💳 Sales Page Features

### 💰 Plan Options

**🔄 3 Payments of $29**
- $29 today + 2 future payments
- Flexible payment schedule

**⚡ 1 Payment of $67 (23% OFF)**
- 💰 Save $20 instantly
- 🌟 Marked as "Most Popular"
- 👍 Recommended option

### 🎯 Key Sections

**🖼️ Transformation Visualization**
- Before/after images with arrow graphic
- Metrics showing 6-month potential improvement

**✅ Benefits Grid**
- 🍽️ Daily custom meal plans
- 🛒 Done-for-you grocery lists
- 👨‍🍳 Overwhelm-free recipes
- 📚 Weekly tips & guidance

**🔬 Social Proof**
- 📖 PubMed citations on ketogenic diet efficacy
- 🏥 Mayo Clinic research on keto benefits

**⏱️ Countdown Timer**
- 🕐 10-minute urgency timer (MM:SS format)
- ⚠️ "Discount expires in" message
- 🎯 Drives conversion psychology

**📌 Sticky CTA Button**
- 🚀 "Claim My Plan" button
- 👀 Appears when user scrolls away from plan options
- 🙈 Disappears when plan section is in view
- ✨ Smooth animations (Framer Motion)

**🛡️ Money-Back Guarantee**
- ✅ 60-day risk-free offer
- 💯 Full refund terms
- 📋 Subscription details & cancellation policy
- 📞 Support contact information

---

## 👥 User Flows

### 1️⃣ User Registration Flow

```
USER VISITS SIGNUP PAGE
        ↓
FILL REGISTRATION FORM
├─ Name (3-100 chars)
├─ Email (valid format, unique)
└─ Password (8+ chars, uppercase, lowercase, number required)
        ↓
FRONTEND VALIDATION
        ↓
POST /api/auth/signup  { name, email, password }
        ↓
BACKEND: AUTH VALIDATION (express-validator)
        ↓
HASH PASSWORD (bcrypt, 10 rounds)
        ↓
CREATE USER IN DATABASE
INSERT INTO users (name, email, password_hash) RETURNING id, name, email, role, created_at
        ↓
RESPONSE: 201 Created  { success, message, user }
        ↓
REDIRECT TO LOGIN PAGE
```

### 2️⃣ User Login Flow

```
USER VISITS LOGIN PAGE
        ↓
ENTER CREDENTIALS (email, password)
        ↓
FRONTEND VALIDATION
        ↓
POST /api/auth/login  { email, password }
        ↓
BACKEND: FIND USER BY EMAIL
        ↓
   Found? ──No──→ Return 401 "Invalid email or password"
   │Yes
   ↓
COMPARE PASSWORD (bcrypt.compare)
        ↓
   Match? ──No──→ Return 401 "Invalid email or password"
   │Yes
   ↓
GENERATE JWT TOKEN (id, email, role → signed, expires 7d)
        ↓
RESPONSE: 200 OK  { success, message, token, user }
        ↓
FRONTEND: STORE AUTH DATA
├─ Save JWT in localStorage
├─ Save user data in AuthContext
└─ Save user data in localStorage
        ↓
REDIRECT TO DASHBOARD
```

### 3️⃣ Protected API Request Flow

```
CLIENT MAKES REQUEST (Dashboard, Form Submission)
        ↓
ADD JWT TO REQUEST HEADER
GET /api/form/all/user
Authorization: Bearer <JWT_TOKEN>
        ↓
MIDDLEWARE: AUTHENTICATE
├─ Extract token from header
├─ Verify JWT signature & expiration
├─ Decode payload
└─ Attach user to req.user
        ↓
   Valid? ──No──→ Return 401 "Invalid or expired token"
   │Yes
   ↓
MIDDLEWARE: AUTHORIZE (if needed)
├─ Check if user role in required roles
├─ Admin endpoints require role="admin"
└─ User endpoints require role="user"|"admin"
        ↓
   Authorized? ──No──→ Return 403 "Not authorized"
   │Yes
   ↓
EXECUTE HANDLER
req.user available in controller; access control by user_id or admin check
```

### 4️⃣ Anonymous/Guest Submission Flow

```
GUEST VISITS APPLICATION (no login required)
        ↓
GENERATE ANONYMOUS SESSION ID
uuid() → anonymousSessionId (localStorage)
        ↓
COMPLETE FORM (health metrics)
        ↓
POST /api/form (NO AUTH REQUIRED)
├─ anonymousSessionId from body
├─ is_anonymous = true
└─ user_id = null
        ↓
BACKEND: CHECK SUBMISSION LIMIT
SELECT EXISTS (SELECT 1 FROM form_data WHERE anonymous_session_id = $1)
        ↓
   Already submitted? ──Yes──→ Return 403 "Guests can only submit once..."
   │No
   ↓
INSERT FORM DATA (user_id=NULL, is_anonymous=true, anonymous_session_id=uuid, ...metrics)
        ↓
RESPONSE: 201 Created  { formId }
        ↓
NAVIGATE TO RESULTS PAGE
├─ Send anonymousSessionId as header: X-Anonymous-Session
└─ Backend validates ownership via header
```

---

## 📊 Database Schema

### Users Table

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

### Form Data Table

```sql
CREATE TABLE form_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    anonymous_session_id UUID NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
    body_fat_percent NUMERIC NOT NULL,
    bmi NUMERIC NOT NULL,
    calorie_target NUMERIC NOT NULL,
    water_intake NUMERIC NOT NULL,
    weight_loss_rate NUMERIC NOT NULL,
    see_results_days NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Guest/User Tracking Columns:**
- `user_id` - Foreign key to users (NULL for guests)
- `is_anonymous` - Boolean flag for guest submissions
- `anonymous_session_id` - UUID for guest session tracking

---

## 🔌 API Endpoints

### Authentication Endpoints

**1. Sign Up**
```http
POST /api/auth/signup
Content-Type: application/json

{ "name": "John Doe", "email": "john@example.com", "password": "SecurePass123" }
```
Response `201`: `{ success, message, user: { id, name, email, role, created_at } }`
Error `400`: `{ success: false, errors: [{ msg, param }] }`

**2. Login**
```http
POST /api/auth/login
Content-Type: application/json

{ "email": "john@example.com", "password": "SecurePass123" }
```
Response `200`: `{ success, message, token, user: { id, name, email, role } }`
Error `401`: `{ success: false, message: "Invalid email or password." }`

**3. Get Current User (Protected)**
```http
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>
```
Response `200`: `{ success, user: { id, email, role } }`

### Form Endpoints

**1. Submit Form (Optional Auth)**
```http
POST /api/form
[Authorization: Bearer <TOKEN>]  // Optional

{
  "gender": "male", "bodyFatPercent": 25, "BMI": 24, "calorieTarget": 2000,
  "waterIntake": 8, "weightLossRate": 1.5, "seeResultsDays": 14,
  "anonymousSessionId": "550e8400-..."  // If guest
}
```
Response `201`: `{ success, message, id }`

**2. Get User's Forms (Protected - User Role)**
```http
GET /api/form/all/user
Authorization: Bearer <JWT_TOKEN>
```
Response `200`: `{ success, data: [ { id, userId, isAnonymous, gender, bodyFatPercent, bmi, calorieTarget, waterIntake, weightLossRate, seeResultsDays, createdAt } ] }`

**3. Get All Forms (Protected - Admin Only)**
```http
GET /api/form/all/admin
Authorization: Bearer <JWT_TOKEN>
```
Response `200`: `{ success, data: [...] }` (all forms, all users, anonymous included)
Error `403`: `{ success: false, message: "You are not authorized to access this resource." }`

**4. Get Single Form (Optional Auth)**
```http
GET /api/form/:id
[Authorization: Bearer <TOKEN>]  // Optional for guests
X-Anonymous-Session: <sessionId>  // If guest
```
Response `200`: `{ success, data: { id, ...form data } }`

**5. Delete Form**
```http
DELETE /api/form/:id
[Authorization: Bearer <TOKEN>]  // Optional for guests
```

---

## 🔐 Authentication Flows

### JWT Token Structure

```
Header:  { "alg": "HS256", "typ": "JWT" }
Payload: { "id", "email", "role", "iat", "exp" (7 days later) }
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), JWT_SECRET)
```

### Token Flow

1. User logs in → Backend generates JWT with payload → JWT sent to client
2. Client stores JWT in localStorage
3. Client includes JWT in `Authorization: Bearer <token>` header
4. Backend extracts and verifies the token with `JWT_SECRET`
5. If valid, payload is decoded and attached to `req.user`
6. Request continues to the next middleware/handler

### Password Hashing

**On Signup:**
```
"SecurePass123" → bcrypt.hash(password, SALT_ROUNDS=10) → "$2b$10$N9qo8uLOickgx..." → stored in password_hash
```

**On Login:**
```
Retrieve stored hash → bcrypt.compare(password, hash) → true → generate JWT & allow login
                                                       → false → 401 "Invalid credentials"
```

---

## 👥 Authorization & Roles

### Role-Based Access Control (RBAC)

**Two Roles Implemented:**

| Role | Permissions | Endpoints |
|------|-------------|-----------|
| **user** | View/delete own forms | `GET /api/form/all/user`, `DELETE /api/form/:id` |
| **admin** | View all forms, manage system | `GET /api/form/all/admin`, `GET /api/auth/me` |

### Authorization Middleware Pattern

```typescript
// Single role:
router.get("/admin-only", authenticate, authorize("admin"), handler);

// Multiple roles:
router.get("/protected", authenticate, authorize("admin", "user"), handler);
```

### Access Control Examples

**Form Submission:**
- Authenticated users: submit with `user_id`
- Anonymous guests: submit with `anonymous_session_id` (limited to 1 submission per session)

**View Submissions:**
- Users: see only their own
- Admins: see all submissions

**View Results:**
- Authenticated: via `user_id` check
- Guest: via `X-Anonymous-Session` header

---

## ⚙️ Environment Configuration

### Backend (`backend/.env`)

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
1. **DATABASE_URL** — [Supabase Dashboard](https://app.supabase.com) → project → Settings → Database → copy connection string
2. **JWT_SECRET** — generate with `openssl rand -base64 32` (32+ characters, never commit)
3. **AI_API_KEY** — [Google AI Studio](https://aistudio.google.com/app/apikey) → Create API Key

### Frontend (`frontend/.env`)

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

1. **Password Security** - Hashed with bcrypt (10 rounds), never stored in plain text, strong password requirements enforced
2. **Token Security** - JWT signed with HS256, expires in 7 days, sent via Authorization header (not cookie)
3. **Data Isolation** - Users can only view/delete own forms; admins can view all; anonymous sessions tracked separately
4. **Input Validation** - express-validator middleware, email format & password strength checks, type checking on all inputs
5. **SQL Injection Prevention** - Parameterized queries, no string interpolation, `pg` library handles escaping
6. **Error Handling** - No sensitive info in error messages, generic "Invalid credentials" for auth, structured error responses

### ⚠️ Recommendations for Production

1. **HTTPS Only** - Force HTTPS, verify SSL certificates
2. **Rate Limiting** - Implement on `/api/auth/login`, limit to 5 attempts per 15 minutes
3. **CORS Restriction**
   ```typescript
   app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
   ```
4. **Secrets Management** - Environment variables only, never commit `.env`, rotate secrets periodically, use Vercel Secrets
5. **Logging & Monitoring** - Log auth attempts, monitor failed logins, alert on admin actions
6. **Data Retention** - Data deletion policies, GDPR compliance, user data export
7. **Additional Features** - Email verification, password reset flow, 2FA, session management, account lockout

---

## 🎨 Styling

- 🌈 **Tailwind CSS** with custom color palette
- 🎯 **Primary Color:** `#36BC9F` (teal/green)
- 🔴 **Secondary Color:** `#F75950` (coral red)
- 🌙 **Dark Mode:** Automatic via `dark:` class utilities
- 📱 **Responsive:** Mobile-first breakpoints (sm, md, lg, xl)
- ✨ **Custom Classes:** `.highlight` (teal text for key metrics), `.label` (label styling)

---

## ✅ Calculations & Logic

The `calculations.ts` utility generates context-aware callout messages:

- 🔢 **Body Fat Callouts** - Gender-specific thresholds
- 📊 **BMI Callouts** - Three-tier categorization
- 🔥 **Calorie Callouts** - Ranges from extreme restriction to high intake
- 💧 **Water Callouts** - Four levels of hydration awareness
- 📈 **Weight Loss & Results Callouts** - Motivational messaging

All callouts dynamically populate result cards based on form inputs.

---

## 🧪 Testing

Jest + React Testing Library are configured for component & page tests:

```bash
npm run test           # Run tests once
npm run test:watch     # Watch mode during development
```

**Test Configuration:**
- 🔧 `jest.config.cjs` - Jest settings
- ⚙️ `jest.setup.ts` - Testing library setup
- 📦 `babel.config.cjs` - Babel transpilation for tests

---

## ♿ Accessibility

- ✅ Semantic HTML elements (`<form>`, `<label>`, `<button>`)
- ✅ Proper `htmlFor` attributes on labels
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ✅ Focus states on form inputs

---

## 🌐 Deployment

Both frontend and backend are deployed on **Vercel** as separate projects from the same repo.

### Backend

1. Vercel Dashboard → Add Project → select `IrajFatima/mini-results-flow` → set root directory to `backend`
2. Configure environment variables (`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `AI_API_KEY`, `AI_MODEL`)
3. Push to `main` → Vercel auto-deploys → live at `https://mini-results-flow-backend.vercel.app`

### Frontend

1. Vercel Dashboard → Add Project → select `IrajFatima/mini-results-flow` → set root directory to `frontend`
2. Configure `VITE_API_URL=https://mini-results-flow-backend.vercel.app/api`
3. Push to `main` → Vercel auto-deploys → live at `https://mini-results-flow-pi.vercel.app`

### Live Deployment Links

| Service | URL |
|---------|-----|
| **Frontend** | [mini-results-flow-pi.vercel.app](https://mini-results-flow-pi.vercel.app) |
| **Backend API** | [mini-results-flow-backend.vercel.app](https://mini-results-flow-backend.vercel.app) |
| **GitHub Repo** | [IrajFatima/mini-results-flow](https://github.com/IrajFatima/mini-results-flow) |

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| ![Chrome](https://img.shields.io/badge/-Chrome-4285F4?style=flat&logo=googlechrome) | 90+ |
| ![Firefox](https://img.shields.io/badge/-Firefox-FF7139?style=flat&logo=firefox) | 88+ |
| ![Safari](https://img.shields.io/badge/-Safari-000000?style=flat&logo=safari) | 14+ |
| ![Edge](https://img.shields.io/badge/-Edge-0078D4?style=flat&logo=microsoftedge) | 90+ |

---

## 🔐 Persistence

💾 Form data is saved to browser localStorage under the key `formData` for instant client-side recovery, and — for authenticated or guest-tracked submissions — persisted server-side in PostgreSQL. Users can reset via the "No Thanks" link on the sales page.

---

## 📦 Dependencies

| Dependency | Version | Purpose |
|-----------|---------|---------|
| React / React DOM | 19.2.7 | UI library / DOM rendering |
| React Router DOM | 7.18.0 | Client routing |
| Framer Motion | 12.42.0 | Animations |
| Tailwind CSS | 4.3.1 | Styling |
| React Icons | 5.6.0 | Icon components |
| Axios | 1.18.1 | HTTP client |
| React Toastify | 11.1.0 | Notifications |
| Express.js | 5.2.1 | Backend API framework |
| jsonwebtoken | 9.0.3 | JWT generation/verification |
| bcrypt | 6.0.0 | Password hashing |
| express-validator | 7.3.2 | Input validation |
| pg | 8.22.0 | PostgreSQL client |

---

## 🤝 Contributing

Contributions welcome! Please:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 📝 Open a Pull Request

---

## 📄 License

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

This project is open source and available under the MIT License.

## 👤 Author

[![GitHub](https://img.shields.io/badge/GitHub-IrajFatima-181717?style=flat&logo=github)](https://github.com/IrajFatima)

Created by [IrajFatima](https://github.com/IrajFatima)

---

## 🙌 Support

**Questions or Feedback?**
- 🐛 [Open an issue](https://github.com/IrajFatima/mini-results-flow/issues) on GitHub
- 🚀 Check out the [live demo](https://mini-results-flow-pi.vercel.app/)
- ⭐ Give us a star if you found this useful!

---

<div align="center">

**Made with ❤️ by [IrajFatima](https://github.com/IrajFatima)**

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)](https://mini-results-flow-pi.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-IrajFatima-181717?style=flat&logo=github)](https://github.com/IrajFatima)
[![TypeScript](https://img.shields.io/badge/Built_with-TypeScript-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

</div>