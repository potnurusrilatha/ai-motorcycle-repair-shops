# AI Motorcycle Repair Shops

A full-stack Next.js application for finding and managing motorcycle repair shops with Google OAuth authentication.

## Features

- 🔐 **Google OAuth Authentication** - Secure user login with NextAuth.js
- 🏍️ **Repair Shop Directory** - Browse and search motorcycle repair shops
- 🔍 **Smart Search** - Filter shops by name, city, or specialty
- 📱 **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- 🗄️ **Database Integration** - Prisma ORM with SQLite database
- ⚡ **Modern Stack** - Built with Next.js 15, TypeScript, and React

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Authentication:** NextAuth.js with Google Provider
- **Database:** Prisma ORM + SQLite
- **Styling:** Tailwind CSS
- **Icons:** React Icons

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Google Cloud Console account for OAuth credentials

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/potnurusrilatha/ai-motorcycle-repair-shops.git
cd ai-motorcycle-repair-shops
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the OAuth consent screen if prompted
6. For Application type, select "Web application"
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - Add production URL later when deployed
8. Copy the Client ID and Client Secret

### 4. Configure environment variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

**Important:** Generate a secure `NEXTAUTH_SECRET` using:

```bash
openssl rand -base64 32
```

### 5. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ai-motorcycle-repair-shops/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth.js API routes
│   │   │   └── shops/         # Shops API endpoints
│   │   ├── auth/
│   │   │   └── signin/        # Sign-in page
│   │   ├── shops/             # Shops listing page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── SessionProvider.tsx # Auth session provider
│   └── lib/
│       ├── auth.ts            # NextAuth configuration
│       └── prisma.ts          # Prisma client singleton
├── .env                       # Environment variables
├── .env.example              # Example environment variables
└── package.json
```

## Database Schema

The application includes the following models:

- **User** - User accounts with Google OAuth
- **Account** - OAuth account information
- **Session** - User sessions
- **VerificationToken** - Email verification tokens
- **RepairShop** - Motorcycle repair shop information

## Features Breakdown

### Authentication Flow

1. User clicks "Sign in with Google"
2. Redirected to Google OAuth consent screen
3. After approval, redirected back to the application
4. NextAuth.js creates/updates user in database
5. User session is established

### Repair Shops

The application allows users to:

- View all repair shops in a card-based grid layout
- Search and filter shops by name, city, or specialty
- View shop details including contact information and ratings
- See shop specialties and descriptions

## Development

### Adding Sample Data

You can add sample repair shops using Prisma Studio:

```bash
npx prisma studio
```

Or create a seed script in `prisma/seed.ts`.

### Running Database Migrations

```bash
npx prisma migrate dev --name <migration-name>
```

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update Google OAuth authorized redirect URIs with your production URL
5. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:

- `DATABASE_URL` - Update for production database (consider PostgreSQL)
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Secure random string
- `GOOGLE_CLIENT_ID` - Same as development or create new
- `GOOGLE_CLIENT_SECRET` - Same as development or create new

## Troubleshooting

### Google OAuth Error: redirect_uri_mismatch

Make sure your authorized redirect URIs in Google Cloud Console match exactly:
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://yourdomain.com/api/auth/callback/google`

### Prisma Client Not Generated

Run: `npx prisma generate`

### Database Connection Issues

Check your `DATABASE_URL` in `.env` is correct.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and TypeScript
