# AAIE Frontend

The frontend for the Artificial Assessment Intelligence Engine (AAIE) built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with design system
- **React Router** for navigation
- **Supabase** for authentication and data
- **shadcn/ui** components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── layout/      # Header, Footer, Sidebar
│   │   └── auth/        # Authentication components
│   ├── pages/           # Route components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   ├── utils/          # Utility functions
│   └── integrations/   # Supabase integration
├── public/             # Static assets
└── docs/              # Documentation
```

## Features

- **Landing Page** - Introduction to AAIE
- **Authentication** - Sign in/up with Supabase Auth
- **Dashboard** - Overview for educators
- **Assignments** - Create and manage assignments
- **Submissions** - Upload and review student submissions
- **Responsive Design** - Mobile-first approach

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```