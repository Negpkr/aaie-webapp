import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Assignment {
  id: string;
  title: string;
  unit_code: string;
  description: string | null;
  due_at: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  submissionCount?: number;
  status?: string;
}

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAssignments = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('assignments')
        .select(`
          *,
          submissions(count)
        `)
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const assignmentsWithCounts = data?.map(assignment => ({
        ...assignment,
        submissionCount: assignment.submissions?.[0]?.count || 0,
        status: new Date(assignment.due_at) < new Date() ? 'closed' : 'active'
      })) || [];

      setAssignments(assignmentsWithCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
    } finally {
      setIsLoading(false);
    }
  };

  const createAssignment = async (assignmentData: {
    title: string;
    unit_code: string;
    description: string;
    due_at: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('assignments')
        .insert({
          ...assignmentData,
          owner_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      await fetchAssignments();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create assignment');
    }
  };

  const updateAssignment = async (id: string, assignmentData: {
    title: string;
    unit_code: string;
    description: string;
    due_at: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('assignments')
        .update(assignmentData)
        .eq('id', id)
        .eq('owner_id', user.id)
        .select()
        .single();

      if (error) throw error;

      await fetchAssignments();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update assignment');
    }
  };

  const deleteAssignment = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id);

      if (error) throw error;

      await fetchAssignments();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete assignment');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [user]);

  return {
    assignments,
    isLoading,
    error,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    refetch: fetchAssignments
  };
}