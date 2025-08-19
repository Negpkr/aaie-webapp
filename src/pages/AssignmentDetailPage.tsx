import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Assignment } from '@/hooks/useAssignments';

export default function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!id || !user) return;

      try {
        const { data, error } = await supabase
          .from('assignments')
          .select(`
            *,
            submissions(count)
          `)
          .eq('id', id)
          .eq('owner_id', user.id)
          .single();

        if (error) throw error;

        const assignmentWithCount = {
          ...data,
          submissionCount: data.submissions?.[0]?.count || 0,
          status: new Date(data.due_at) < new Date() ? 'closed' : 'active'
        };

        setAssignment(assignmentWithCount);
      } catch (error) {
        console.error('Failed to fetch assignment:', error);
        navigate('/assignments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
  }, [id, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assignment details...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Assignment not found</h2>
          <p className="text-muted-foreground mb-4">
            This assignment doesn't exist or you don't have permission to view it.
          </p>
          <Button asChild>
            <Link to="/assignments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assignments
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'closed':
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/assignments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assignments
            </Link>
          </Button>
          <div>
            <h1 className="font-heading text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground">
              Assignment Details • {assignment.unit_code}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Assignment
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Assignment Details */}
      <Card className="academic-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading">Assignment Information</CardTitle>
            {getStatusBadge(assignment.status || 'active')}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Title</label>
                <p className="text-base">{assignment.title}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Unit Code</label>
                <p className="text-base">{assignment.unit_code}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Due Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">{new Date(assignment.due_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Submissions</label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p className="text-base">{assignment.submissionCount} submissions received</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created</label>
                <p className="text-base">{new Date(assignment.created_at).toLocaleDateString()}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                <p className="text-base">{new Date(assignment.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          {assignment.description && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <div className="mt-2 p-4 bg-muted/30 rounded-lg">
                <p className="text-base whitespace-pre-wrap">{assignment.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="academic-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">View Submissions</p>
                <p className="text-sm text-muted-foreground">
                  Review student submissions
                </p>
              </div>
            </div>
            <Button asChild className="w-full mt-4">
              <Link to="/submissions">
                View All Submissions
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="academic-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Upload Submission</p>
                <p className="text-sm text-muted-foreground">
                  Add new student work
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Upload New
            </Button>
          </CardContent>
        </Card>
        
        <Card className="academic-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Edit className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Edit Assignment</p>
                <p className="text-sm text-muted-foreground">
                  Modify assignment details
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Edit Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}