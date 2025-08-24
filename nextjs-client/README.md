# ISI Travel Management System - Next.js Frontend

This is the Next.js frontend for the ISI Travel Management System, migrated from React + Express.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Drizzle ORM** for database operations
- **Authentication** with JWT tokens
- **Protected Routes** based on user roles
- **Responsive Design**

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Express backend running on port 3001

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgresql://username:password@localhost:5432/isi_travel
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/page.tsx     # Login page
│   ├── dashboard/page.tsx # Dashboard page
│   ├── allTours/page.tsx  # Tours listing page
│   ├── addTrip/page.tsx   # Add trip page
│   ├── requests/page.tsx  # Requests management page
│   └── status/page.tsx    # Trip status page
├── components/            # React components
│   ├── Navbar.tsx        # Navigation component
│   ├── Login.tsx         # Login form
│   ├── Dashboard.tsx     # Dashboard component
│   ├── Tours.tsx         # Tours listing
│   ├── AddTrip.tsx       # Add trip form
│   ├── Requests.tsx      # Requests management
│   ├── Status.tsx        # Trip status
│   └── ProtectedRoute.tsx # Route protection
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
└── lib/                  # Utility libraries
    ├── api.ts           # API configuration
    └── db/              # Database configuration
        ├── index.ts     # Database connection
        └── schema.ts    # Drizzle schema
```

## Database Schema

The application uses Drizzle ORM with PostgreSQL. The schema includes:

- **Users**: Employee information with roles and permissions
- **Trips**: Travel requests with approval status

## Authentication

The application uses JWT tokens for authentication. Users are assigned roles that determine their access to different features:

- **2020**: Basic employee access
- **2021**: Supervisor access
- **2022**: Director access  
- **2023**: Admin access

## API Integration

The frontend communicates with the Express backend through RESTful APIs. All API calls are configured in `src/lib/api.ts`.

## Migration Notes

This Next.js application is a migration from the original React + Express setup:

- **Frontend**: Migrated from Create React App to Next.js 15
- **Database**: Migrated from Prisma to Drizzle ORM
- **Routing**: Migrated from React Router to Next.js App Router
- **Backend**: Express backend remains unchanged for now

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/app/`
3. Update the database schema in `src/lib/db/schema.ts` if needed
4. Add API endpoints in the Express backend

## Deployment

The application can be deployed to Vercel, Netlify, or any other platform that supports Next.js.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
