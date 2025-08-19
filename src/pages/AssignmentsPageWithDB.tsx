import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAssignments, Assignment } from '@/hooks/useAssignments';
import { toast } from 'sonner';

export default function AssignmentsPageWithDB() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    unit_code: '',
    description: '',
    due_at: '',
  });
  const [editAssignment, setEditAssignment] = useState({
    title: '',
    unit_code: '',
    description: '',
    due_at: '',
  });

  const { assignments, isLoading, error, createAssignment, updateAssignment, deleteAssignment } = useAssignments();

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.unit_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAssignment(newAssignment);
      setIsCreateDialogOpen(false);
      setNewAssignment({ title: '', unit_code: '', description: '', due_at: '' });
      toast.success('Assignment created successfully');
    } catch (error) {
      toast.error('Failed to create assignment');
    }
  };

  const handleEditAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    
    try {
      await updateAssignment(selectedAssignment.id, editAssignment);
      setIsEditDialogOpen(false);
      setSelectedAssignment(null);
      setEditAssignment({ title: '', unit_code: '', description: '', due_at: '' });
      toast.success('Assignment updated successfully');
    } catch (error) {
      toast.error('Failed to update assignment');
    }
  };

  const handleDeleteAssignment = async () => {
    if (!selectedAssignment) return;
    
    try {
      await deleteAssignment(selectedAssignment.id);
      setIsDeleteDialogOpen(false);
      setSelectedAssignment(null);
      toast.success('Assignment deleted successfully');
    } catch (error) {
      toast.error('Failed to delete assignment');
    }
  };

  const openEditDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setEditAssignment({
      title: assignment.title,
      unit_code: assignment.unit_code,
      description: assignment.description || '',
      due_at: assignment.due_at,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteDialogOpen(true);
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">
            Manage your assignments and track submission progress
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="academic-button bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleCreateAssignment}>
              <DialogHeader>
                <DialogTitle className="font-heading">Create New Assignment</DialogTitle>
                <DialogDescription>
                  Add a new assignment for your students to complete.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Essay Analysis Assignment"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    required
                    className="academic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit_code">Unit Code</Label>
                  <Input
                    id="unit_code"
                    placeholder="e.g., SIT374"
                    value={newAssignment.unit_code}
                    onChange={(e) => setNewAssignment({ ...newAssignment, unit_code: e.target.value })}
                    required
                    className="academic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the assignment requirements..."
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    className="academic-input"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="due_at">Due Date</Label>
                  <Input
                    id="due_at"
                    type="date"
                    value={newAssignment.due_at}
                    onChange={(e) => setNewAssignment({ ...newAssignment, due_at: e.target.value })}
                    required
                    className="academic-input"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="academic-button">
                  Create Assignment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="academic-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 academic-input"
              />
            </div>
            <Button variant="outline" className="academic-button">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Table */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="font-heading">All Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Unit Code</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {assignment.description && assignment.description.length > 60
                          ? `${assignment.description.substring(0, 60)}...`
                          : assignment.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{assignment.unit_code}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(assignment.due_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{assignment.submissionCount || 0}</div>
                      <div className="text-xs text-muted-foreground">submissions</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(assignment.status || 'active')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/assignments/${assignment.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(assignment)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Assignment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => openDeleteDialog(assignment)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Assignment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">No assignments found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Create your first assignment to get started.'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="academic-button"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Assignment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleEditAssignment}>
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
                  value={editAssignment.title}
                  onChange={(e) => setEditAssignment({ ...editAssignment, title: e.target.value })}
                  required
                  className="academic-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-unit_code">Unit Code</Label>
                <Input
                  id="edit-unit_code"
                  value={editAssignment.unit_code}
                  onChange={(e) => setEditAssignment({ ...editAssignment, unit_code: e.target.value })}
                  required
                  className="academic-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editAssignment.description}
                  onChange={(e) => setEditAssignment({ ...editAssignment, description: e.target.value })}
                  className="academic-input"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-due_at">Due Date</Label>
                <Input
                  id="edit-due_at"
                  type="date"
                  value={editAssignment.due_at}
                  onChange={(e) => setEditAssignment({ ...editAssignment, due_at: e.target.value })}
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
              Are you sure you want to delete "{selectedAssignment?.title}"? This action cannot be undone and will also delete all related submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAssignment} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}