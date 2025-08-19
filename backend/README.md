# AAIE Backend

The AAIE backend is implemented using Supabase, providing:

## Architecture

- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for file uploads
- **Real-time**: Supabase subscriptions

## Database Schema

### Tables
- `profiles` - User profiles and metadata
- `assignments` - Assignment definitions and rubrics
- `submissions` - Student submissions and content
- `evaluations` - AI evaluation results and scores

## API Endpoints

All API interactions are handled through Supabase client:

### Authentication
- Sign up/Sign in via Supabase Auth
- Profile management

### Assignments
- CRUD operations with RLS policies
- Rubric configuration

### Submissions
- File upload and text submissions
- Status tracking

### Evaluations
- AI classification (Human/AI/Hybrid)
- Rubric scoring across 4 dimensions
- Feedback generation

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

## Development

The backend is fully managed by Supabase. For local development:

1. Set up Supabase project
2. Configure environment variables
3. Run migrations
4. Start frontend development server

## Security

- Row Level Security (RLS) enabled on all tables
- User-based data isolation
- Secure file upload policies