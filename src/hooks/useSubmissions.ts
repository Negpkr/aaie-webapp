import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Submission {
  id: string;
  student_id: string;
  assignment_id: string;
  content: string | null;
  file_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  assignment?: {
    title: string;
    unit_code: string;
  };
  evaluation?: {
    classification: string;
    rubric_scores: {
      conceptual: number;
      application: number;
      evaluation: number;
      writing: number;
    };
    ai_feedback?: string;
    teacher_notes?: string;
  };
}

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSubmissions = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          assignments(title, unit_code),
          evaluations(
            classification,
            rubric_scores,
            ai_feedback,
            teacher_notes
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const submissionsWithEvaluations = data?.map(submission => ({
        ...submission,
        assignment: submission.assignments,
        evaluation: submission.evaluations?.[0] || null
      })) || [];

      setSubmissions(submissionsWithEvaluations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setIsLoading(false);
    }
  };

  const createSubmission = async (submissionData: {
    assignment_id: string;
    student_id: string;
    content: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data: submission, error: submissionError } = await supabase
        .from('submissions')
        .insert(submissionData)
        .select()
        .single();

      if (submissionError) throw submissionError;

      // Create mock evaluation
      const evaluation = {
        submission_id: submission.id,
        classification: Math.random() > 0.6 ? 'Human' : Math.random() > 0.3 ? 'Hybrid' : 'AI',
        confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
        rubric_scores: {
          conceptual: Math.floor(Math.random() * 4) + 1,
          application: Math.floor(Math.random() * 4) + 1,
          evaluation: Math.floor(Math.random() * 4) + 1,
          writing: Math.floor(Math.random() * 4) + 1,
        },
        ai_feedback: 'This submission demonstrates good understanding of the topic...'
      };

      const { error: evaluationError } = await supabase
        .from('evaluations')
        .insert(evaluation);

      if (evaluationError) throw evaluationError;

      await fetchSubmissions();
      return submission;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create submission');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Delete evaluations first
      await supabase
        .from('evaluations')
        .delete()
        .eq('submission_id', id);

      // Then delete submission
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchSubmissions();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete submission');
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user]);

  return {
    submissions,
    isLoading,
    error,
    createSubmission,
    deleteSubmission,
    refetch: fetchSubmissions
  };
}