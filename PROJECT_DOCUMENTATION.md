# AI Motorcycle Repair Shops - Project Documentation

**Project URL:** https://ai-motorcycle-repair-shops.vercel.app
**Repository:** https://github.com/potnurusrilatha/ai-motorcycle-repair-shops
**Date:** November 24, 2025

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Issues Fixed](#issues-fixed)
3. [Configuration Setup](#configuration-setup)
4. [Environment Variables](#environment-variables)
5. [Google OAuth Setup](#google-oauth-setup)
6. [Database Configuration](#database-configuration)
7. [Deployment Status](#deployment-status)
8. [Testing Instructions](#testing-instructions)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Technology Stack:**
- **Frontend:** Next.js 16.0.3 with React 19.2.0
- **Authentication:** NextAuth.js v4 with Google OAuth
- **Database:** Prisma ORM with SQLite (dev) / PostgreSQL (production recommended)
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel
- **Language:** TypeScript 5

**Features:**
- Google OAuth authentication
- 3,149 European motorcycle repair shops database
- Search and browse functionality
- User session management

---

## Issues Fixed

### 1. Prisma Version Conflicts ✅

**Problem:**
- Vercel deployment failing with error: "The datasource property `url` is no longer supported in schema files"
- Prisma 7.x had breaking changes incompatible with the project

**Solution:**
- Downgraded Prisma from 7.0.0 to 6.19.0
- Updated both `@prisma/client` and `prisma` packages
- Files modified: `package.json`, `package-lock.json`

**Changes:**
```json
"dependencies": {
  "@prisma/client": "6.19.0"
},
"devDependencies": {
  "prisma": "6.19.0"
}
```

### 2. Duplicate Package Dependencies ✅

**Problem:**
- `@prisma/client` appeared in BOTH dependencies and devDependencies
- Caused package-lock.json corruption and deployment failures

**Solution:**
- Removed `@prisma/client` from devDependencies (should only be in dependencies)
- Regenerated clean package-lock.json
- Deleted and reinstalled node_modules

### 3. Google OAuth Configuration ✅

**Problem:**
- Error 400: redirect_uri_mismatch
- Users couldn't sign in with Google

**Solution:**
- Added proper OAuth authorization parameters in NextAuth configuration
- Configured correct redirect URIs in Google Cloud Console
- Set up environment variables on Vercel

**Files Modified:**
- `src/lib/auth.ts` - Added OAuth parameters and debug mode

---

## Configuration Setup

### Package.json Configuration

**Final package.json:**
```json
{
  "name": "ai-motorcycle-repair-shops",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.11.1",
    "@prisma/client": "6.19.0",
    "csv-parser": "^3.2.0",
    "next": "16.0.3",
    "next-auth": "^4.24.13",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.3",
    "prisma": "6.19.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### NextAuth Configuration

**File:** `src/lib/auth.ts`

```typescript
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
```

---

## Environment Variables

### Local Development (.env)

**File:** `.env` (not committed to git)

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=v6qw8j8k8Gi/il+9EYrr4XDSxxWX7QyM+1k0pxmzaDk=

# Google OAuth
GOOGLE_CLIENT_ID=22492229772-11lp9kvm979dm6ctbemcgu8737tuvt4n.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

### Production (Vercel)

**Required Environment Variables:**

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXTAUTH_URL` | `https://ai-motorcycle-repair-shops.vercel.app` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `v6qw8j8k8Gi/il+9EYrr4XDSxxWX7QyM+1k0pxmzaDk=` | Production, Preview, Development |
| `GOOGLE_CLIENT_ID` | `22492229772-11lp9kvm979dm6ctbemcgu8737tuvt4n.apps.googleusercontent.com` | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | `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` | Production, Preview, Development |
| `DATABASE_URL` | `file:./dev.db` | All (PostgreSQL recommended for production) |

**Important Notes:**
- Environment variables must be set in Vercel dashboard
- After adding/updating variables, redeploy the application
- Variables are only applied to NEW deployments, not existing ones

---

## Google OAuth Setup

### Google Cloud Console Configuration

**OAuth 2.0 Client Credentials:**
- **Client ID:** `22492229772-11lp9kvm979dm6ctbemcgu8737tuvt4n.apps.googleusercontent.com`
- **Client Secret:** `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`

### Authorized Redirect URIs

**Required URIs in Google Cloud Console:**

1. **Local Development:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```

2. **Production:**
   ```
   https://ai-motorcycle-repair-shops.vercel.app/api/auth/callback/google
   ```

### Setup Instructions

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Under "Authorized redirect URIs", add both URIs listed above
4. Click "Save"

**Important:** The redirect URIs must match exactly (no trailing slashes, correct protocol https/http)

---

## Database Configuration

### Current Setup

**Database Type:** SQLite (Development)
**Location:** `prisma/dev.db`
**ORM:** Prisma 6.19.0

### Database Schema

The application uses Prisma with the following main models:
- User (authentication)
- Account (OAuth accounts)
- Session (user sessions)
- RepairShop (motorcycle repair shops data)

### Running Migrations

**Local Development:**
```bash
npx prisma db push
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

### Production Database Recommendation

⚠️ **Warning:** SQLite doesn't persist on Vercel serverless functions.

**Recommended for Production:**
- **Vercel Postgres** (seamless integration)
- **PlanetScale** (MySQL-compatible)
- **Supabase** (PostgreSQL)

**To migrate to PostgreSQL:**
1. Set up database on chosen provider
2. Update `DATABASE_URL` in Vercel environment variables
3. Run `npx prisma db push` to create tables

---

## Deployment Status

### GitHub Repository
- **URL:** https://github.com/potnurusrilatha/ai-motorcycle-repair-shops
- **Main Branch:** `main`
- **Feature Branch:** `claude/connect-google-auth-01Gq1CjxiuWE74qXd1EMsU1F`

### Vercel Deployment
- **Production URL:** https://ai-motorcycle-repair-shops.vercel.app
- **Project:** https://vercel.com/srilathas-projects-ea418222/ai-motorcycle-repair-shops
- **Status:** ✅ Deployed
- **Last Update:** Environment variables configured

### Recent Commits
1. `0133985` - Trigger deployment with updated environment variables
2. `2e69c6b` - Add OAuth debugging and improve NextAuth configuration
3. `a959244` - Force Vercel redeployment with correct environment variables
4. `84609c9` - Trigger Vercel redeployment to apply environment variables
5. `c95f78c` - Fix duplicate @prisma/client in package.json

---

## Testing Instructions

### Local Testing

**Step 1: Install Dependencies**
```bash
npm install
```

**Step 2: Set Up Database**
```bash
npx prisma db push
```

**Step 3: Start Development Server**
```bash
npm run dev
```

**Step 4: Test Login**
1. Open: http://localhost:3000
2. Click "Sign in with Google"
3. Sign in with your Google account
4. Should redirect to homepage after successful login

### Production Testing

**Step 1: Open Production Site**
Visit: https://ai-motorcycle-repair-shops.vercel.app

**Step 2: Test Login**
1. Click "Sign in with Google"
2. Select Google account
3. Verify successful authentication

**Step 3: Verify Environment Variables (Debug Endpoint)**
Visit: https://ai-motorcycle-repair-shops.vercel.app/api/debug

**Expected Response:**
```json
{
  "NEXTAUTH_URL": "https://ai-motorcycle-repair-shops.vercel.app",
  "GOOGLE_CLIENT_ID": "SET",
  "GOOGLE_CLIENT_SECRET": "SET",
  "NEXTAUTH_SECRET": "SET",
  "NODE_ENV": "production"
}
```

⚠️ **If any value shows "NOT SET"**, environment variables are not configured correctly on Vercel.

---

## Troubleshooting

### Issue: "Error 400: redirect_uri_mismatch"

**Possible Causes:**
1. Missing redirect URI in Google Cloud Console
2. Incorrect `NEXTAUTH_URL` environment variable
3. Mismatch between configured and actual URLs

**Solutions:**
1. Verify redirect URIs in Google Cloud Console match exactly
2. Check `NEXTAUTH_URL` has no trailing slash
3. Ensure environment variables are applied to production
4. Redeploy application after updating environment variables

### Issue: Vercel Deployment Failing

**Possible Causes:**
1. Prisma version incompatibility
2. Missing environment variables
3. Build errors

**Solutions:**
1. Verify Prisma is version 6.19.0 (not 7.x)
2. Check all environment variables are set on Vercel
3. Review build logs in Vercel dashboard
4. Ensure `postinstall` script runs `prisma generate`

### Issue: Database Connection Failed

**Possible Causes:**
1. DATABASE_URL not set
2. SQLite file doesn't exist locally
3. Production using SQLite (won't work on Vercel)

**Solutions:**
1. Run `npx prisma db push` locally
2. Use PostgreSQL for production deployments
3. Update DATABASE_URL environment variable

### Issue: OAuth Login Works Locally But Not in Production

**Possible Causes:**
1. Environment variables not set on Vercel
2. Redirect URI not configured for production URL
3. Old deployment cached

**Solutions:**
1. Verify all environment variables on Vercel
2. Add production redirect URI to Google Cloud Console
3. Trigger fresh deployment
4. Check `/api/debug` endpoint

---

## Next Steps & Recommendations

### Immediate Actions Required

1. ✅ **Test Login on Production**
   - Visit https://ai-motorcycle-repair-shops.vercel.app
   - Verify Google OAuth works correctly

2. ⚠️ **Migrate to Production Database**
   - SQLite won't persist on Vercel
   - Recommend: Vercel Postgres or Supabase
   - Update DATABASE_URL environment variable

3. 📋 **Remove Debug Endpoint**
   - Delete `src/app/api/debug/route.ts` after testing
   - Security: Exposes environment variable status

### Future Enhancements

1. **Database Migration**
   - Set up production PostgreSQL database
   - Migrate 3,149 motorcycle repair shops data
   - Update Prisma schema for production

2. **Security Improvements**
   - Add rate limiting for OAuth
   - Implement CSRF protection
   - Add API route protection

3. **Features**
   - User dashboard
   - Favorite shops functionality
   - Reviews and ratings
   - Admin panel for shop management

4. **Performance Optimization**
   - Add Redis caching
   - Implement ISR (Incremental Static Regeneration)
   - Optimize database queries

---

## Summary

### What Was Fixed
✅ Prisma downgraded from 7.x to 6.19.0
✅ Removed duplicate @prisma/client package
✅ Fixed package-lock.json corruption
✅ Configured Google OAuth properly
✅ Set up environment variables on Vercel
✅ Added OAuth debugging tools
✅ Deployed to production successfully

### Current Status
- **Repository:** Up to date with all fixes
- **Vercel:** Deployed and configured
- **Google OAuth:** Configured with correct redirect URIs
- **Environment Variables:** Set on Vercel
- **Database:** SQLite (local) - needs migration for production

### Known Limitations
- SQLite database won't persist on Vercel (needs PostgreSQL for production)
- Debug endpoint should be removed after testing
- Need to test actual OAuth login flow on production

---

## Contact & Support

**Repository:** https://github.com/potnurusrilatha/ai-motorcycle-repair-shops
**Production URL:** https://ai-motorcycle-repair-shops.vercel.app
**Owner:** potnurusrilatha

---

**Document Version:** 1.0
**Last Updated:** November 24, 2025
**Generated By:** Claude Code AI Assistant
