# AAIE - Artificial Assessment Intelligence Engine

A comprehensive academic assessment platform that combines AI-powered evaluation with traditional rubric-based scoring.

## Project Structure

```
aaie/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── README.md
├── backend/               # Supabase backend configuration
│   └── README.md
├── docs/                  # Project documentation
│   ├── README.md          # System overview
│   └── api-spec.md        # API specification
└── README.md             # This file
```

## Quick Start

### Frontend Development
```bash
npm install
npm run dev
```

### Backend Setup
The backend uses Supabase. See `backend/README.md` for setup instructions.

## Features

- **AI Detection**: Classify submissions as Human, AI, or Hybrid
- **Rubric Scoring**: Automated evaluation across 4 dimensions
- **Instant Feedback**: Generate comprehensive reports in seconds
- **Educator Dashboard**: Manage assignments and track submissions

## Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: shadcn/ui components
- **Build**: Vite

## Documentation

- [System Overview](docs/README.md)
- [API Specification](docs/api-spec.md)
- [Frontend Guide](frontend/README.md)
- [Backend Guide](backend/README.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.