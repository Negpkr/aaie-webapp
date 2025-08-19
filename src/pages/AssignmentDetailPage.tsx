import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Edit, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmissionUploadDialog } from '@/components/ui/SubmissionUploadDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Assignment, useAssignments } from '@/hooks/useAssignments';
import { toast } from 'sonner';

export default function AssignmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateAssignment, deleteAssignment } = useAssignments();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    unit_code: '',
    description: '',
    due_at: '',
  });

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
          <Button 
            variant="outline"
            onClick={() => {
              setEditData({
                title: assignment.title,
                unit_code: assignment.unit_code,
                description: assignment.description || '',
                due_at: assignment.due_at,
              });
              setIsEditDialogOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Assignment
          </Button>
          <Button 
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
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
            <SubmissionUploadDialog>
              <Button variant="outline" className="w-full mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Upload New
              </Button>
            </SubmissionUploadDialog>
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
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => {
                setEditData({
                  title: assignment.title,
                  unit_code: assignment.unit_code,
                  description: assignment.description || '',
                  due_at: assignment.due_at,
                });
                setIsEditDialogOpen(true);
              }}
            >
              Edit Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={async (e) => {
            e.preventDefault();
            try {
              await updateAssignment(assignment.id, editData);
              setIsEditDialogOpen(false);
              // Refresh assignment data
              const { data } = await supabase
                .from('assignments')
                .select(`*, submissions(count)`)
                .eq('id', id)
                .eq('owner_id', user.id)
                .single();
              
              if (data) {
                setAssignment({
                  ...data,
                  submissionCount: data.submissions?.[0]?.count || 0,
                  status: new Date(data.due_at) < new Date() ? 'closed' : 'active'
                });
              }
              toast.success('Assignment updated successfully');
            } catch (error) {
              toast.error('Failed to update assignment');
            }
          }}>
            <DialogHeader>
              <DialogTitle className="font-heading">Edit Assignment</DialogTitle>
              <DialogDescription>
                Update the assignment details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Assignment Title</Label>
                <Input
                  id="edit-title"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  required
                  className="academic-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-unit_code">Unit Code</Label>
                <Input
                  id="edit-unit_code"
                  value={editData.unit_code}
                  onChange={(e) => setEditData({ ...editData, unit_code: e.target.value })}
                  required
                  className="academic-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="academic-input"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-due_at">Due Date</Label>
                <Input
                  id="edit-due_at"
                  type="date"
                  value={editData.due_at}
                  onChange={(e) => setEditData({ ...editData, due_at: e.target.value })}
                  required
                  className="academic-input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="academic-button">
                Update Assignment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Assignment Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{assignment?.title}"? This action cannot be undone and will also delete all related submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={async () => {
                try {
                  await deleteAssignment(assignment.id);
                  toast.success('Assignment deleted successfully');
                  navigate('/assignments');
                } catch (error) {
                  toast.error('Failed to delete assignment');
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}