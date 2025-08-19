// API service layer for AAIE
// Centralized API client following the modular structure requested

import { supabase } from '@/integrations/supabase/client';

// Authentication API
export const authApi = {
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signUp: async (email: string, password: string, name: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name },
      },
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
};

// Assignments API
export const assignmentsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  create: async (assignment: {
    title: string;
    description?: string;
    due_date?: string;
    unit_code: string;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('assignments')
      .insert({
        title: assignment.title,
        description: assignment.description,
        due_at: assignment.due_date || new Date().toISOString(),
        unit_code: assignment.unit_code,
        owner_id: user.id,
      })
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, updates: Partial<{
    title: string;
    description: string;
    due_date: string;
    rubric: Record<string, any>;
  }>) => {
    const { data, error } = await supabase
      .from('assignments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id);
    return { error };
  },
};

// Submissions API
export const submissionsApi = {
  getAll: async (assignmentId?: string) => {
    let query = supabase
      .from('submissions')
      .select(`
        *,
        assignments (
          title,
          due_date
        ),
        evaluations (
          classification,
          rubric_scores,
          feedback
        )
      `)
      .order('submitted_at', { ascending: false });

    if (assignmentId) {
      query = query.eq('assignment_id', assignmentId);
    }

    const { data, error } = await query;
    return { data, error };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('submissions')
      .select(`
        *,
        assignments (
          title,
          description,
          due_date,
          rubric
        ),
        evaluations (
          classification,
          rubric_scores,
          feedback,
          confidence_score
        )
      `)
      .eq('id', id)
      .single();
    return { data, error };
  },

  create: async (submission: {
    assignment_id: string;
    student_name: string;
    student_email: string;
    content: string;
    file_url?: string;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('submissions')
      .insert({
        assignment_id: submission.assignment_id,
        student_id: user.id, // Using authenticated user as student for now
        content: submission.content,
        file_url: submission.file_url,
      })
      .select()
      .single();
    return { data, error };
  },

  updateStatus: async (id: string, status: 'pending' | 'evaluated' | 'reviewed') => {
    const { data, error } = await supabase
      .from('submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },
};

// Evaluations API (AI/LLM processing mock)
export const llmApi = {
  evaluateSubmission: async (submissionId: string) => {
    // Mock AI evaluation - in real implementation, this would call external AI services
    const mockEvaluation = {
      submission_id: submissionId,
      classification: ['Human', 'AI', 'Hybrid'][Math.floor(Math.random() * 3)] as 'Human' | 'AI' | 'Hybrid',
      rubric_scores: {
        conceptual: Math.floor(Math.random() * 5) + 1,
        application: Math.floor(Math.random() * 5) + 1,
        evaluation: Math.floor(Math.random() * 5) + 1,
        writing: Math.floor(Math.random() * 5) + 1,
      },
      ai_feedback: 'This is mock AI-generated feedback. The submission demonstrates good understanding of the concepts with clear explanations and examples.',
      confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
    };

    const { data, error } = await supabase
      .from('evaluations')
      .insert(mockEvaluation)
      .select()
      .single();

    return { data, error };
  },

  regenerateFeedback: async (evaluationId: string) => {
    // Mock feedback regeneration
    const newFeedback = 'Regenerated AI feedback with improved analysis and suggestions for enhancement.';
    
    const { data, error } = await supabase
      .from('evaluations')
      .update({ ai_feedback: newFeedback })
      .eq('id', evaluationId)
      .select()
      .single();

    return { data, error };
  },
};

// Health check API
export const healthApi = {
  check: async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      return { 
        status: error ? 'unhealthy' : 'healthy', 
        timestamp: new Date().toISOString(),
        database: error ? 'disconnected' : 'connected'
      };
    } catch (error) {
      return { 
        status: 'unhealthy', 
        timestamp: new Date().toISOString(),
        database: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },
};