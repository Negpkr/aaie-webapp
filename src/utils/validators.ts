// Validation utilities for AAIE application
import { z } from 'zod';

// Authentication schemas
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Assignment schemas
export const assignmentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().optional(),
  due_date: z.string().optional().refine((date) => {
    if (!date) return true;
    return new Date(date) > new Date();
  }, 'Due date must be in the future'),
  rubric: z.record(z.any()).optional(),
});

// Submission schemas
export const submissionSchema = z.object({
  assignment_id: z.string().uuid('Invalid assignment ID'),
  student_name: z.string().min(1, 'Student name is required').max(100, 'Name too long'),
  student_email: z.string().email('Please enter a valid email address'),
  content: z.string().min(10, 'Submission content must be at least 10 characters'),
  file_url: z.string().url().optional(),
});

// Evaluation schemas
export const rubricScoresSchema = z.object({
  conceptual: z.number().min(1).max(5),
  application: z.number().min(1).max(5),
  evaluation: z.number().min(1).max(5),
  writing: z.number().min(1).max(5),
});

export const evaluationSchema = z.object({
  submission_id: z.string().uuid(),
  classification: z.enum(['Human', 'AI', 'Hybrid']),
  rubric_scores: rubricScoresSchema,
  feedback: z.string().min(10, 'Feedback must be at least 10 characters'),
  confidence_score: z.number().min(0).max(1),
});

// File validation
export const fileValidator = {
  validateSize: (file: File, maxSizeMB: number = 5): boolean => {
    return file.size <= maxSizeMB * 1024 * 1024;
  },

  validateType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },

  validateSubmissionFile: (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!fileValidator.validateType(file, allowedTypes)) {
      return {
        valid: false,
        error: 'Only PDF, DOC, DOCX, and TXT files are allowed',
      };
    }

    if (!fileValidator.validateSize(file, 10)) {
      return {
        valid: false,
        error: 'File size must be less than 10MB',
      };
    }

    return { valid: true };
  },
};

// Type exports for use in components
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
export type AssignmentForm = z.infer<typeof assignmentSchema>;
export type SubmissionForm = z.infer<typeof submissionSchema>;
export type RubricScores = z.infer<typeof rubricScoresSchema>;
export type EvaluationData = z.infer<typeof evaluationSchema>;