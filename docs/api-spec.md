# AAIE API Specification

## Base URL
```
https://your-supabase-url.supabase.co/rest/v1
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Error Responses
All endpoints return errors in the following format:
```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

## Endpoints

### Authentication

#### POST /auth/signin
Sign in with email and password.

**Request:**
```json
{
  "email": "educator@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "educator@example.com",
    "user_metadata": {
      "name": "John Educator"
    }
  }
}
```

#### POST /auth/signup
Create a new user account.

**Request:**
```json
{
  "email": "educator@example.com",
  "password": "securepassword",
  "options": {
    "data": {
      "name": "John Educator"
    }
  }
}
```

### Assignments

#### GET /assignments
List all assignments for the authenticated user.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Essay on Climate Change",
    "description": "Write a 1000-word essay on climate change impacts",
    "due_date": "2024-02-15T23:59:59Z",
    "rubric": {
      "conceptual": {"weight": 25, "description": "Understanding of concepts"},
      "application": {"weight": 25, "description": "Application of knowledge"},
      "evaluation": {"weight": 25, "description": "Critical evaluation"},
      "writing": {"weight": 25, "description": "Writing quality"}
    },
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z",
    "educator_id": "uuid"
  }
]
```

#### POST /assignments
Create a new assignment.

**Request:**
```json
{
  "title": "Essay on Climate Change",
  "description": "Write a 1000-word essay on climate change impacts",
  "due_date": "2024-02-15T23:59:59Z",
  "rubric": {
    "conceptual": {"weight": 25, "description": "Understanding of concepts"},
    "application": {"weight": 25, "description": "Application of knowledge"},
    "evaluation": {"weight": 25, "description": "Critical evaluation"},
    "writing": {"weight": 25, "description": "Writing quality"}
  }
}
```

#### GET /assignments/:id
Get a specific assignment.

**Response:**
```json
{
  "id": "uuid",
  "title": "Essay on Climate Change",
  "description": "Write a 1000-word essay on climate change impacts",
  "due_date": "2024-02-15T23:59:59Z",
  "rubric": {},
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z",
  "educator_id": "uuid"
}
```

### Submissions

#### GET /submissions
List submissions, optionally filtered by assignment.

**Query Parameters:**
- `assignment_id` (optional): Filter by assignment ID

**Response:**
```json
[
  {
    "id": "uuid",
    "assignment_id": "uuid",
    "student_name": "Jane Student",
    "student_email": "jane@student.edu",
    "content": "Climate change is one of the most pressing...",
    "file_url": "https://storage.url/file.pdf",
    "status": "evaluated",
    "submitted_at": "2024-01-20T14:30:00Z",
    "assignments": {
      "title": "Essay on Climate Change",
      "due_date": "2024-02-15T23:59:59Z"
    },
    "evaluations": [
      {
        "classification": "Human",
        "rubric_scores": {
          "conceptual": 4,
          "application": 3,
          "evaluation": 4,
          "writing": 5
        },
        "feedback": "Excellent analysis with strong evidence..."
      }
    ]
  }
]
```

#### POST /submissions
Create a new submission.

**Request:**
```json
{
  "assignment_id": "uuid",
  "student_name": "Jane Student",
  "student_email": "jane@student.edu",
  "content": "Climate change is one of the most pressing issues...",
  "file_url": "https://storage.url/file.pdf"
}
```

#### GET /submissions/:id
Get a specific submission with full details.

**Response:**
```json
{
  "id": "uuid",
  "assignment_id": "uuid",
  "student_name": "Jane Student",
  "student_email": "jane@student.edu",
  "content": "Climate change is one of the most pressing...",
  "file_url": "https://storage.url/file.pdf",
  "status": "evaluated",
  "submitted_at": "2024-01-20T14:30:00Z",
  "assignments": {
    "title": "Essay on Climate Change",
    "description": "Write a 1000-word essay...",
    "due_date": "2024-02-15T23:59:59Z",
    "rubric": {}
  },
  "evaluations": [
    {
      "id": "uuid",
      "classification": "Human",
      "rubric_scores": {
        "conceptual": 4,
        "application": 3,
        "evaluation": 4,
        "writing": 5
      },
      "feedback": "Excellent analysis with strong evidence and clear reasoning. The student demonstrates deep understanding of climate science and effectively connects theory to real-world applications.",
      "confidence_score": 0.87,
      "created_at": "2024-01-20T14:35:00Z"
    }
  ]
}
```

### Evaluations

#### POST /evaluations/evaluate/:submissionId
Trigger AI evaluation for a submission.

**Response:**
```json
{
  "id": "uuid",
  "submission_id": "uuid",
  "classification": "Human",
  "rubric_scores": {
    "conceptual": 4,
    "application": 3,
    "evaluation": 4,
    "writing": 5
  },
  "feedback": "Excellent analysis with strong evidence...",
  "confidence_score": 0.87,
  "created_at": "2024-01-20T14:35:00Z"
}
```

#### PUT /evaluations/:id/feedback
Regenerate feedback for an evaluation.

**Response:**
```json
{
  "id": "uuid",
  "feedback": "Updated feedback with enhanced analysis...",
  "updated_at": "2024-01-20T15:00:00Z"
}
```

### Health Check

#### GET /health
Check system health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T14:35:00Z",
  "database": "connected",
  "version": "1.0.0"
}
```

## Rate Limits
- Authentication endpoints: 5 requests per minute per IP
- API endpoints: 100 requests per minute per user
- Evaluation endpoints: 10 requests per minute per user

## Webhooks
AAIE supports webhooks for real-time notifications:

### Available Events
- `submission.created` - New submission received
- `evaluation.completed` - AI evaluation finished
- `assignment.due_soon` - Assignment due within 24 hours

### Webhook Payload
```json
{
  "event": "submission.created",
  "timestamp": "2024-01-20T14:35:00Z",
  "data": {
    "submission_id": "uuid",
    "assignment_id": "uuid",
    "student_email": "jane@student.edu"
  }
}
```