# RootAccess — Phase 1: Authentication & Project Setup

RootAccess is a modern career learning and job discovery platform for students and working professionals.

This repository contains the completed **Phase 1** implementation: core authentication, session management, protected routes, and user profile synchronization powered by React, TypeScript, Tailwind CSS, and Supabase Auth.

---

## Port Configuration

Per your setup, this project runs on **`http://localhost:5173`** (avoiding any collision with other services on `http://localhost:3000`).

---

## Technology Stack

- **React 19 & TypeScript**: Component-driven UI with type-safety.
- **Vite 6**: Fast development build tool and bundling.
- **Tailwind CSS v4**: Modern, responsive styling with clean design and accessible focus states.
- **Supabase Auth**: Secure authentication (registration, sign-in, recovery, session persistence).
- **PostgreSQL & Row Level Security (RLS)**: Isolated user profiles and zero unauthorized data exposure.
- **Vitest & React Testing Library**: Automated unit and component integration testing suite.

---

## Getting Started (Beginner Guide)

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your computer.

### 2. Environment Configuration
Copy the sample environment file to create your local `.env`:

```bash
cp .env.example .env
```

Open `.env` in your text editor. You will see:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 3. Setting Up Supabase (100% Free Tier)

1. **Create an Account**: Go to [https://supabase.com](https://supabase.com) and sign up for a free account.
2. **Create a New Project**:
   - Click **New Project**.
   - Choose a project name (e.g., `rootaccess-dev`).
   - Set a strong database password (store it securely).
   - Select your preferred region (e.g., Singapore or Mumbai if in South Asia).
   - Choose the Free pricing plan.
3. **Get Your API Credentials**:
   - In your Supabase Dashboard, navigate to **Project Settings** (gear icon) -> **API**.
   - Copy the **Project URL** into `VITE_SUPABASE_URL`.
   - Copy the **Project API Key (`anon` / `public`)** into `VITE_SUPABASE_ANON_KEY`.
   - *CRITICAL SECURITY WARNING*: Never copy the `service_role` key into `.env` or any frontend code!
4. **Set Up the Database & RLS**:
   - Go to the **SQL Editor** in your Supabase Dashboard.
   - Click **New Query**.
   - Open and copy the contents of [`supabase/schema.sql`](./supabase/schema.sql) in this repository.
   - Paste it into the SQL Editor and click **Run**.
   - This creates the `public.profiles` table with Row Level Security and an automatic user creation trigger.
5. **Configure Redirect URLs (Localhost)**:
   - Go to **Authentication** -> **URL Configuration**.
   - Set **Site URL** to: `http://localhost:5173`.
   - In **Redirect URLs**, add:
     - `http://localhost:5173/login`
     - `http://localhost:5173/reset-password`
     - `http://localhost:5173/app`
   - Click **Save**.

---

## Running the Application

### Start Development Server:
```bash
npm run dev
```
The application will launch at:
```
http://localhost:5173
```

### Run Automated Tests:
```bash
npm run test
```

### Build for Production:
```bash
npm run build
```

---

## Phase 1 Feature Overview

1. **Sign-Up (`/signup`)**:
   - Full name, email, password, confirm password, terms checkbox.
   - Strict client-side validation and password strength enforcement (8+ chars, uppercase, lowercase, number).
   - Show/hide password toggles.
   - Prevention of duplicate form submission with loading indicators.
   - Handles email verification required states cleanly without falsely marking accounts as authenticated.

2. **Login (`/login`)**:
   - Email and password sign-in.
   - Specific error feedback for incorrect credentials and unconfirmed email addresses.
   - Auto-redirects to `/app` upon successful sign-in.

3. **Forgot Password (`/forgot-password`)**:
   - Email input with regex validation.
   - Supabase `resetPasswordForEmail` integration.
   - Neutral confirmation message to prevent email harvesting/enumeration.

4. **Password Reset (`/reset-password`)**:
   - Listens for recovery tokens and recovery sessions.
   - Gracefully rejects invalid or expired links with helpful instructions.
   - Updates password securely and redirects to login.

5. **Protected Verification Page (`/app`)**:
   - Displays the RootAccess wordmark and verified status.
   - Shows welcome greeting with display name/email.
   - Renders required text: *"Your learning journey starts here."*
   - Displays authenticated session diagnostic details (User ID, Email, Last Sign-In).
   - Working **Log out** button that terminates the session and redirects to `/login`.

6. **Route Protection**:
   - Unauthenticated visitors attempting to access `/app` are redirected to `/login`.
   - Authenticated users visiting `/login` or `/signup` are redirected to `/app`.
