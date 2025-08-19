# AAIE - Artificial Assessment Intelligence Engine

A comprehensive AI-powered assessment platform designed for educators to streamline the evaluation process of student submissions.

## Project Structure

```
aaie/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Route components  
│   │   ├── services/   # API services
│   │   └── utils/      # Utility functions
│   └── README.md
├── backend/            # Supabase backend
│   ├── supabase/       # Database migrations & functions
│   └── README.md
├── docs/               # Documentation
└── README.md
```

## Quick Start

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Access the app at `http://localhost:8080`

### Backend Setup

The backend uses Supabase as a Backend-as-a-Service. See `backend/README.md` for setup instructions.

## Features

- **Landing Page** - Introduction to AAIE platform
- **Authentication** - Secure user management with Supabase Auth
- **Dashboard** - Educator overview and analytics
- **Assignment Management** - Create and manage assignments with custom rubrics
- **Submission Portal** - Upload and track student submissions
- **AI Evaluation** - Automated assessment with AI classification
- **Responsive Design** - Mobile-first, accessible interface

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS with design system
- React Router for navigation
- shadcn/ui component library

### Backend
- Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- Row Level Security (RLS) for data protection
- Real-time subscriptions
- File storage for submissions

## Documentation

- [Frontend Setup](./frontend/README.md)
- [Backend Architecture](./backend/README.md)
- [API Documentation](./docs/api-spec.md)
- [Project Overview](./docs/README.md)

## Development Workflow

1. **Frontend**: Run `cd frontend && npm run dev` for React development
2. **Backend**: Use Supabase dashboard or CLI for database/function management
3. **Documentation**: Update docs for any architectural changes

## Contributing

Please read [docs/README.md](./docs/README.md) for development guidelines and project structure details.

## License

This project is licensed under the MIT License.
