# CommunityConnect

A platform connecting NGOs with volunteers to create meaningful social impact across India.

## Features

### For NGOs
- Create and manage volunteer opportunities
- Review applications from volunteers
- Accept/reject volunteer applications
- Track active tasks and volunteers

### For Volunteers
- Browse opportunities with advanced filtering
- Filter by location, cause area, and required skills
- Apply to tasks that match your skills
- Track application status

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Database Schema

The application uses the following main tables:

- `ngo_profiles` - NGO organization information
- `volunteer_profiles` - Volunteer information
- `tasks` - Volunteer opportunities
- `applications` - Applications from volunteers to tasks

All tables have Row Level Security (RLS) enabled for secure data access.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Set up the database:
   - The database migrations have already been applied
   - Follow `DATABASE_SETUP.md` to create test users

5. Start the development server:
   ```bash
   npm run dev
   ```

### Database Setup

See `DATABASE_SETUP.md` for detailed instructions on:
- Creating test users (NGO and Volunteer accounts)
- Setting up sample data
- Troubleshooting common issues

### Test Credentials

After following the database setup guide, you can log in with:

**NGO Account:**
- Email: `ngo@example.com`
- Password: `password123`

**Volunteer Account:**
- Email: `volunteer@example.com`
- Password: `password123`

## Project Structure

```
src/
├── components/        # Reusable UI components
├── data/             # Constants and mock data
├── lib/              # Library configurations (Supabase)
├── pages/            # Page components
│   ├── ngo/         # NGO-specific pages
│   └── volunteer/   # Volunteer-specific pages
├── store/           # Zustand store (auth & state management)
├── types/           # TypeScript type definitions
└── App.tsx          # Main app component with routing
```

## Key Features Implemented

### Layer 1: Core Authentication & Basic UI
- Landing page with hero section and features
- Registration for NGOs and Volunteers
- Login with role-based routing
- Protected routes
- Beautiful, responsive design

### Layer 2: Dashboard & Task Management
- NGO Dashboard with task management
- Volunteer Dashboard with recommendations
- Task creation and management
- Application workflow (apply, accept, reject)
- Browse tasks with filtering

### Layer 3: Advanced Features & Database Integration
- Supabase database integration
- Real authentication with Supabase Auth
- Advanced task filtering (location, cause area, skills)
- Toast notifications for user feedback
- Full CRUD operations for tasks and applications
- Row Level Security for data protection

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Design System

The application uses a custom design system with:
- Neutral color palette for base UI
- Primary colors for main actions (teal/cyan)
- Success colors for positive feedback (green)
- Accent colors for highlights (amber/orange)
- Consistent spacing using 8px grid system
- Typography with Poppins font family
- Responsive breakpoints (mobile, tablet, desktop)

## Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication via Supabase Auth
- Profile-based access control
- Input validation using Zod schemas
- Protected API routes

## Future Enhancements

- Real-time chat between NGOs and volunteers
- User profile editing
- Task search with full-text search
- Email notifications
- Volunteer hour tracking
- Rating and review system
- Photo/document uploads
- Mobile app (React Native)

## Contributing

This is a project developed for connecting NGOs with volunteers. Contributions are welcome!

## License

MIT License
