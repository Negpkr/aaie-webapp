# AAIE Backend

The backend services for the Artificial Assessment Intelligence Engine (AAIE).

## Architecture

This project uses **Supabase** as the backend-as-a-service solution, providing:

- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: Built-in auth with JWT tokens
- **Real-time**: WebSocket connections for live updates
- **Storage**: File storage for submissions and documents
- **Edge Functions**: Serverless functions for custom logic

## Database Schema

### Core Tables

- **profiles** - Extended user information
- **assignments** - Assignment details and rubrics
- **submissions** - Student submission data
- **evaluations** - AI and manual evaluation results

### Security

All tables implement Row Level Security (RLS) policies to ensure:
- Users can only access their own data
- Educators can manage their assignments and submissions
- Proper authorization for all operations

## API Endpoints

The API is accessed through the Supabase client in the frontend:

### Authentication
- Sign up/Sign in via Supabase Auth
- JWT token management
- User profile management

### Assignments
- Create/Read/Update/Delete assignments
- Manage rubrics and evaluation criteria
- Assignment publication and sharing

### Submissions
- Upload student submissions
- File storage integration
- Submission status tracking

### Evaluations
- AI-powered assessment (future)
- Manual evaluation tools
- Rubric scoring system

## Development

### Prerequisites

- Supabase CLI (for local development)
- PostgreSQL (if running locally)

### Local Setup

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Start local Supabase:
```bash
supabase start
```

3. Run migrations:
```bash
supabase db reset
```

### Database Migrations

All database changes are managed through SQL migrations in the `supabase/migrations/` directory.

To create a new migration:
```bash
supabase migration new your_migration_name
```

### Edge Functions

Custom serverless functions are located in `supabase/functions/`.

To create a new function:
```bash
supabase functions new your_function_name
```

## Deployment

The backend is automatically deployed with Supabase. Database migrations and edge functions are deployed through the Supabase CLI or dashboard.

## Environment Variables

Required environment variables for the Supabase project:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side only)

## Monitoring

- **Database**: Monitor through Supabase dashboard
- **Authentication**: Auth logs in Supabase
- **Edge Functions**: Function logs and metrics
- **Performance**: Built-in analytics and monitoring