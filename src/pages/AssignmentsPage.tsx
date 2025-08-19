import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
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

// Mock data
let mockAssignments = [
  {
    id: '1',
    title: 'Essay Analysis Assignment',
    unitCode: 'SIT374',
    description: 'Analyze the provided essay for structure, argumentation, and evidence quality.',
    dueDate: '2025-02-15',
    submissionCount: 15,
    status: 'active',
    createdAt: '2025-01-15',
  },
  {
    id: '2',
    title: 'Research Methods Report',
    unitCode: 'SIT312',
    description: 'Comprehensive report on qualitative and quantitative research methodologies.',
    dueDate: '2025-02-20',
    submissionCount: 12,
    status: 'active',
    createdAt: '2025-01-10',
  },
  {
    id: '3',
    title: 'Final Project Proposal',
    unitCode: 'SIT374',
    description: 'Detailed proposal for the final semester project including methodology and timeline.',
    dueDate: '2025-03-01',
    submissionCount: 8,
    status: 'draft',
    createdAt: '2025-01-20',
  },
];

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [assignments, setAssignments] = useState(mockAssignments);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    unitCode: '',
    description: '',
    dueDate: '',
  });
  const [editAssignment, setEditAssignment] = useState({
    title: '',
    unitCode: '',
    description: '',
    dueDate: '',
  });

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.unitCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = String(assignments.length + 1);
    const assignment = {
      id: newId,
      ...newAssignment,
      submissionCount: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setAssignments([...assignments, assignment]);
    setIsCreateDialogOpen(false);
    setNewAssignment({ title: '', unitCode: '', description: '', dueDate: '' });
  };

  const handleEditAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    
    const updatedAssignments = assignments.map(assignment =>
      assignment.id === selectedAssignment.id
        ? { ...assignment, ...editAssignment }
        : assignment
    );
    
    setAssignments(updatedAssignments);
    setIsEditDialogOpen(false);
    setSelectedAssignment(null);
    setEditAssignment({ title: '', unitCode: '', description: '', dueDate: '' });
  };

  const handleDeleteAssignment = () => {
    if (!selectedAssignment) return;
    
    const updatedAssignments = assignments.filter(
      assignment => assignment.id !== selectedAssignment.id
    );
    
    setAssignments(updatedAssignments);
    setIsDeleteDialogOpen(false);
    setSelectedAssignment(null);
  };

  const openEditDialog = (assignment: any) => {
    setSelectedAssignment(assignment);
    setEditAssignment({
      title: assignment.title,
      unitCode: assignment.unitCode,
      description: assignment.description,
      dueDate: assignment.dueDate,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (assignment: any) => {
    setSelectedAssignment(assignment);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (assignment: any) => {
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
                  <Label htmlFor="unitCode">Unit Code</Label>
                  <Input
                    id="unitCode"
                    placeholder="e.g., SIT374"
                    value={newAssignment.unitCode}
                    onChange={(e) => setNewAssignment({ ...newAssignment, unitCode: e.target.value })}
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
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
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
                        {assignment.description.length > 60
                          ? `${assignment.description.substring(0, 60)}...`
                          : assignment.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{assignment.unitCode}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{assignment.submissionCount}</div>
                      <div className="text-xs text-muted-foreground">submissions</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(assignment.status)}
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
                        <DropdownMenuItem onClick={() => openViewDialog(assignment)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
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
                <Label htmlFor="edit-unitCode">Unit Code</Label>
                <Input
                  id="edit-unitCode"
                  value={editAssignment.unitCode}
                  onChange={(e) => setEditAssignment({ ...editAssignment, unitCode: e.target.value })}
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
                <Label htmlFor="edit-dueDate">Due Date</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={editAssignment.dueDate}
                  onChange={(e) => setEditAssignment({ ...editAssignment, dueDate: e.target.value })}
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

      {/* View Assignment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Assignment Details</DialogTitle>
          </DialogHeader>
          {selectedAssignment && (
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                <p className="text-sm">{selectedAssignment.title}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Unit Code</Label>
                <p className="text-sm">{selectedAssignment.unitCode}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="text-sm">{selectedAssignment.description}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Due Date</Label>
                <p className="text-sm">{new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Submissions</Label>
                <p className="text-sm">{selectedAssignment.submissionCount} submissions</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <div className="mt-1">{getStatusBadge(selectedAssignment.status)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                <p className="text-sm">{new Date(selectedAssignment.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Assignment Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assignment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedAssignment?.title}"? This action cannot be undone.
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