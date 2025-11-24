# AI Motorcycle Repair Shops - User Manual

**Project Name:** AI Motorcycle Repair Shops
**Website:** https://ai-motorcycle-repair-shops.vercel.app
**Date:** November 24, 2025

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [What This Project Does](#what-this-project-does)
3. [How to Run Locally](#how-to-run-locally)
4. [Google Login Setup](#google-login-setup)
5. [Vercel Deployment](#vercel-deployment)
6. [Important Files](#important-files)
7. [Common Problems & Solutions](#common-problems--solutions)
8. [Contact Information](#contact-information)

---

## 🚀 Quick Start

### What You Need
- Node.js installed on your computer
- Google account
- Vercel account (free)
- Code editor (VS Code recommended)

### Quick Setup (5 Minutes)
```bash
# 1. Install dependencies
npm install

# 2. Set up database
npx prisma db push

# 3. Run the app
npm run dev

# 4. Open browser
Go to: http://localhost:3000
```

---

## 💡 What This Project Does

### Main Features
✅ **User Login with Google** - Users can sign in using their Google account
✅ **Motorcycle Shop Database** - Contains 3,149 repair shops across Europe
✅ **Search Functionality** - Find repair shops by location
✅ **User Profiles** - Save favorite shops and preferences

### Technology Used
- **Frontend:** Next.js (React framework)
- **Authentication:** Google OAuth (NextAuth.js)
- **Database:** SQLite (local) / PostgreSQL (production)
- **Hosting:** Vercel (cloud platform)
- **Styling:** Tailwind CSS

---

## 💻 How to Run Locally

### Step 1: Install Node.js
Download from: https://nodejs.org
Choose: LTS version (recommended)

### Step 2: Download Project
```bash
git clone https://github.com/potnurusrilatha/ai-motorcycle-repair-shops.git
cd ai-motorcycle-repair-shops
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install all required packages.

### Step 4: Set Up Environment Variables

Create a file named `.env` in the project root folder:

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

### Step 5: Set Up Database
```bash
npx prisma db push
```

This creates the database tables.

### Step 6: Run the Application
```bash
npm run dev
```

### Step 7: Open in Browser
Go to: **http://localhost:3000**

You should see the login page!

---

## 🔐 Google Login Setup

### Why Google Login?
Users can sign in safely using their existing Google account. No need to create new passwords!

### How to Set It Up

#### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com

#### Step 2: Create New Project (if needed)
1. Click "Select a project" at the top
2. Click "New Project"
3. Name it: "Motorcycle Repair Shops"
4. Click "Create"

#### Step 3: Enable Google+ API
1. Go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click "Enable"

#### Step 4: Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Name it: "Motorcycle App"

#### Step 5: Add Redirect URIs

Add these two URLs:

**For Local Development:**
```
http://localhost:3000/api/auth/callback/google
```

**For Production:**
```
https://ai-motorcycle-repair-shops.vercel.app/api/auth/callback/google
```

⚠️ **Important:** Must be exact! No extra spaces or slashes.

#### Step 6: Save Credentials
1. Click "Create"
2. Copy the **Client ID** and **Client Secret**
3. Add them to your `.env` file

---

## 🌐 Vercel Deployment

### What is Vercel?
Vercel is a free cloud platform that hosts your website and makes it accessible to everyone on the internet.

### Step-by-Step Deployment

#### Step 1: Create Vercel Account
1. Go to: https://vercel.com
2. Sign up with GitHub (free)

#### Step 2: Connect GitHub Repository
1. Click "Add New Project"
2. Import your GitHub repository
3. Select: `ai-motorcycle-repair-shops`

#### Step 3: Configure Environment Variables

⚠️ **VERY IMPORTANT!** Add these in Vercel:

Go to: **Project Settings → Environment Variables**

Add these 5 variables:

| Variable Name | Value |
|--------------|-------|
| `NEXTAUTH_URL` | `https://ai-motorcycle-repair-shops.vercel.app` |
| `NEXTAUTH_SECRET` | `v6qw8j8k8Gi/il+9EYrr4XDSxxWX7QyM+1k0pxmzaDk=` |
| `GOOGLE_CLIENT_ID` | `22492229772-11lp9kvm979dm6ctbemcgu8737tuvt4n.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | `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` |
| `DATABASE_URL` | `file:./dev.db` |

**For each variable:**
- Select all environments (Production, Preview, Development)
- Click "Save"

#### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site will be live!

#### Step 5: Test Login
1. Visit: https://ai-motorcycle-repair-shops.vercel.app
2. Click "Sign in with Google"
3. Select your Google account
4. ✅ Success! You're logged in

---

## 📁 Important Files

### Configuration Files

**`package.json`**
- Lists all project dependencies
- Contains build and run scripts
- Current version: Prisma 6.19.0 (important!)

**`.env`**
- Contains secret keys and credentials
- **NEVER** commit this to GitHub
- Different for local and production

**`prisma/schema.prisma`**
- Defines database structure
- Contains user, shop, and session tables

### Application Files

**`src/app/page.tsx`**
- Homepage
- Shows list of repair shops

**`src/app/auth/signin/page.tsx`**
- Login page
- Google sign-in button

**`src/lib/auth.ts`**
- NextAuth configuration
- Handles Google OAuth
- Manages user sessions

**`src/app/api/auth/[...nextauth]/route.ts`**
- API route for authentication
- Handles login/logout requests

---

## 🔧 Common Problems & Solutions

### Problem 1: "Error 400: redirect_uri_mismatch"

**What it means:**
Google doesn't recognize your website URL.

**How to fix:**
1. Go to Google Cloud Console
2. Click your OAuth client
3. Add exact redirect URI:
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://ai-motorcycle-repair-shops.vercel.app/api/auth/callback/google`
4. Make sure NO trailing slash (no `/` at the end)
5. Click "Save"
6. Wait 5 minutes for Google to update

### Problem 2: Login Not Working on Vercel

**What it means:**
Environment variables are missing or incorrect.

**How to fix:**
1. Go to Vercel dashboard
2. Open: Project Settings → Environment Variables
3. Check all 5 variables are set (see table above)
4. Make sure `NEXTAUTH_URL` has NO trailing slash
5. Redeploy: Deployments → ⋮ → Redeploy

### Problem 3: "npm install" Fails

**What it means:**
Dependency conflict or network issue.

**How to fix:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall
npm install
```

### Problem 4: Database Doesn't Exist

**What it means:**
Prisma hasn't created the database file yet.

**How to fix:**
```bash
npx prisma db push
```

### Problem 5: Vercel Build Fails

**What it means:**
Missing environment variables or wrong Prisma version.

**How to fix:**
1. Check `package.json` has Prisma 6.19.0 (NOT 7.x)
2. Verify all environment variables on Vercel
3. Check build logs for specific error
4. Make sure `postinstall` script exists:
   ```json
   "postinstall": "prisma generate"
   ```

---

## 📊 Project Structure

```
ai-motorcycle-repair-shops/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── auth/
│   │   │   └── signin/
│   │   │       └── page.tsx      # Login page
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts  # Auth API
│   │       └── debug/
│   │           └── route.ts      # Debug endpoint
│   └── lib/
│       ├── auth.ts               # Auth config
│       └── prisma.ts             # Database connection
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── dev.db                    # SQLite database (local)
├── .env                          # Environment variables (secret!)
├── package.json                  # Dependencies
└── next.config.ts                # Next.js config
```

---

## 🔑 Security Notes

### Important Security Rules

⚠️ **NEVER share these publicly:**
- Google Client Secret
- NextAuth Secret
- Database connection strings
- `.env` file contents

✅ **Safe to share:**
- Google Client ID
- Website URL
- Repository (public code)

### .env File Safety
- Already in `.gitignore` (won't be committed)
- Each developer needs their own `.env`
- Production uses Vercel environment variables

---

## 🎯 Quick Command Reference

### Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Database Commands
```bash
# Create database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (database viewer)
npx prisma studio

# Reset database (⚠️ deletes all data!)
npx prisma db push --force-reset
```

### Git Commands
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

---

## 📱 Testing the Application

### Local Testing Checklist

✅ **1. Homepage Loads**
- Visit: http://localhost:3000
- Should see app interface

✅ **2. Login Button Works**
- Click "Sign in with Google"
- Redirects to Google login

✅ **3. Google Login**
- Enter Google credentials
- Should redirect back to app
- Should see user logged in

✅ **4. Database Works**
- Check if repair shops display
- Verify user session persists

### Production Testing Checklist

✅ **1. Site is Live**
- Visit: https://ai-motorcycle-repair-shops.vercel.app
- Loads without errors

✅ **2. Environment Variables**
- Visit: https://ai-motorcycle-repair-shops.vercel.app/api/debug
- All should show "SET"

✅ **3. Google OAuth**
- Click "Sign in with Google"
- No "redirect_uri_mismatch" error
- Successfully logs in

✅ **4. Session Persists**
- Refresh page
- User stays logged in

---

## 📞 Contact Information

### Project Links
- **Website:** https://ai-motorcycle-repair-shops.vercel.app
- **GitHub:** https://github.com/potnurusrilatha/ai-motorcycle-repair-shops
- **Vercel:** https://vercel.com/srilathas-projects-ea418222/ai-motorcycle-repair-shops

### Support Resources
- **Next.js Docs:** https://nextjs.org/docs
- **NextAuth Docs:** https://next-auth.js.org
- **Prisma Docs:** https://www.prisma.io/docs
- **Vercel Docs:** https://vercel.com/docs

### Owner
- **GitHub:** potnurusrilatha

---

## 📝 Notes & Tips

### Development Tips
- Always test locally before deploying
- Use `git status` frequently
- Commit small changes often
- Keep `.env` file updated

### Production Tips
- Monitor Vercel deployment logs
- Check environment variables after updates
- Test OAuth after every deployment
- Keep database backups

### Performance Tips
- Images should be optimized
- Use Next.js Image component
- Enable caching where possible
- Monitor Vercel analytics

---

## 🎓 What We Fixed Today

### Issues Resolved
1. ✅ **Prisma Version Error**
   - Problem: Prisma 7.x caused deployment failures
   - Solution: Downgraded to Prisma 6.19.0

2. ✅ **Duplicate Dependencies**
   - Problem: `@prisma/client` in both dependencies and devDependencies
   - Solution: Removed from devDependencies

3. ✅ **Google OAuth Error**
   - Problem: redirect_uri_mismatch error
   - Solution: Added correct redirect URIs, configured environment variables

4. ✅ **Package Lock Corruption**
   - Problem: package-lock.json had conflicts
   - Solution: Regenerated clean lock file

5. ✅ **Environment Variables**
   - Problem: Missing on Vercel
   - Solution: Added all 5 required variables

---

## 🚀 Next Steps

### Immediate Actions
1. ✅ Test login locally
2. ✅ Test login on production
3. ✅ Verify database works
4. ✅ Check all pages load

### Future Improvements
1. **Switch to PostgreSQL** (SQLite won't work long-term on Vercel)
2. **Add User Dashboard** (show favorite shops)
3. **Add Reviews** (users can rate shops)
4. **Add Admin Panel** (manage shop database)
5. **Add Search Filters** (by location, rating, services)
6. **Add Maps Integration** (show shops on Google Maps)

---

## ✅ Success Checklist

Use this to verify everything is working:

### Local Development
- [ ] Node.js installed
- [ ] npm install completed
- [ ] .env file created
- [ ] Database created (prisma db push)
- [ ] Dev server runs (npm run dev)
- [ ] Homepage loads (http://localhost:3000)
- [ ] Google login works locally

### Production Deployment
- [ ] GitHub repository up to date
- [ ] Vercel account connected
- [ ] All 5 environment variables set
- [ ] Google redirect URIs configured
- [ ] Deployment successful
- [ ] Production site loads
- [ ] Google login works in production
- [ ] No console errors

---

**Document Version:** 1.0
**Created:** November 24, 2025
**Last Updated:** November 24, 2025

---

## 🎉 Congratulations!

You now have a fully functional motorcycle repair shop finder app with Google authentication!

**Your App:** https://ai-motorcycle-repair-shops.vercel.app

If you have any questions, refer back to this manual or check the troubleshooting section.

Happy coding! 🏍️✨
