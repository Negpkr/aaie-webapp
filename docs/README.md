# AAIE Documentation

Welcome to the Artificial Assessment Intelligence Engine (AAIE) documentation.

## Overview

AAIE is a comprehensive academic assessment platform that combines AI-powered evaluation with traditional rubric-based scoring to provide educators with intelligent tools for managing assignments, submissions, and feedback.

## System Architecture

AAIE is built on a modern web architecture:

### Frontend (React + Vite + Supabase)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks with custom auth context
- **Routing**: React Router for client-side navigation

### Backend (Supabase)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth with email/password
- **Real-time**: Supabase subscriptions for live updates
- **Storage**: Supabase Storage for file uploads
- **API**: Auto-generated REST and GraphQL APIs

## Core Features

### 1. Assignment Management
- Create and manage academic assignments
- Configure custom rubrics
- Set due dates and requirements
- Track submission status

### 2. Submission Portal
- Student submission interface
- File upload support (PDF, DOC, DOCX, TXT)
- Text-based submissions
- Automatic timestamping

### 3. AI-Powered Evaluation
- **Classification**: Detect Human, AI, or Hybrid content
- **Rubric Scoring**: Automated scoring across 4 dimensions:
  - Conceptual Understanding
  - Application Skills
  - Evaluation & Analysis
  - Writing Quality
- **Feedback Generation**: AI-generated detailed feedback
- **Confidence Scoring**: Reliability metrics for AI assessments

### 4. Educator Dashboard
- Assignment overview and analytics
- Submission tracking and management
- Evaluation review and override capabilities
- Performance analytics and insights

## Database Schema

### Tables

#### profiles
- User profile information
- Links to Supabase auth.users
- Stores educator metadata

#### assignments
- Assignment definitions and requirements
- Custom rubric configurations
- Due dates and settings

#### submissions
- Student submission data
- File references and content
- Status tracking

#### evaluations
- AI evaluation results
- Rubric scores and classifications
- Generated feedback and confidence metrics

## API Reference

### Authentication
- `POST /auth/signin` - User authentication
- `POST /auth/signup` - User registration
- `POST /auth/signout` - User logout

### Assignments
- `GET /assignments` - List all assignments
- `POST /assignments` - Create new assignment
- `GET /assignments/:id` - Get assignment details
- `PUT /assignments/:id` - Update assignment
- `DELETE /assignments/:id` - Delete assignment

### Submissions
- `GET /submissions` - List submissions (optionally filtered by assignment)
- `POST /submissions` - Create new submission
- `GET /submissions/:id` - Get submission details
- `PUT /submissions/:id/status` - Update submission status

### Evaluations
- `POST /evaluations/evaluate/:submissionId` - Trigger AI evaluation
- `PUT /evaluations/:id/feedback` - Regenerate feedback

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run database migrations
5. Start development server: `npm run dev`

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

Please see [contribution-guidelines.md](./contribution-guidelines.md) for detailed information about contributing to AAIE.

## Support

For technical support or questions, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact our support team

## License

AAIE is licensed under the MIT License. See LICENSE file for details.