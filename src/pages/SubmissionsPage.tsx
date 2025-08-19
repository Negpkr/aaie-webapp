import { useState } from 'react';
import { Upload, Search, Filter, Eye, FileText, User, Calendar, CheckCircle, Clock, AlertCircle, Trash2, MoreHorizontal } from 'lucide-react';
import { useSubmissions } from '@/hooks/useSubmissions';
import { useAssignments } from '@/hooks/useAssignments';
import { toast } from 'sonner';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { submissions, isLoading, error, createSubmission, deleteSubmission } = useSubmissions();
  const { assignments } = useAssignments();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [uploadData, setUploadData] = useState({
    assignmentId: '',
    studentId: '',
    content: '',
  });

  const filteredSubmissions = submissions.filter(submission => {
    const assignmentTitle = submission.assignment?.title || '';
    const unitCode = submission.assignment?.unit_code || '';
    return (
      submission.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unitCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleUploadSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubmission({
        assignment_id: uploadData.assignmentId,
        student_id: uploadData.studentId,
        content: uploadData.content,
      });
      
      toast.success('Submission uploaded and evaluated successfully');
      setIsUploadDialogOpen(false);
      setUploadData({ assignmentId: '', studentId: '', content: '' });
    } catch (error) {
      toast.error('Failed to upload submission');
    }
  };

  const handleDeleteSubmission = async () => {
    if (!selectedSubmission) return;
    
    try {
      await deleteSubmission(selectedSubmission.id);
      toast.success('Submission deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedSubmission(null);
    } catch (error) {
      toast.error('Failed to delete submission');
    }
  };

  const openDeleteDialog = (submission: any) => {
    setSelectedSubmission(submission);
    setIsDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Draft
          </Badge>
        );
      case 'published':
        return (
          <Badge variant="default" className="flex items-center gap-1 bg-green-600">
            <CheckCircle className="h-3 w-3" />
            Published
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getClassificationBadge = (classification: string) => {
    const getColor = () => {
      switch (classification) {
        case 'Human':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'AI':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'Hybrid':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    return (
      <Badge className={`${getColor()} border`}>
        {classification}
      </Badge>
    );
  };

  const getRubricScoreDisplay = (scores: any) => {
    const scoreLabels = ['Bad', 'Average', 'Good', 'Excellent'];
    const dimensions = ['Conceptual', 'Application', 'Evaluation', 'Writing'];
    
    return (
      <div className="space-y-1">
        {dimensions.map((dim, idx) => {
          const key = dim.toLowerCase();
          const score = scores[key] || 1;
          const label = scoreLabels[score - 1];
          const colorClass = score === 4 ? 'text-green-600' : 
                           score === 3 ? 'text-blue-600' : 
                           score === 2 ? 'text-yellow-600' : 'text-red-600';
          
          return (
            <div key={dim} className="flex justify-between text-xs">
              <span className="font-medium">{dim}:</span>
              <span className={colorClass}>{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
          <div className="h-48 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Error Loading Submissions</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Submissions</h1>
          <p className="text-muted-foreground">
            Review student submissions and manage feedback
          </p>
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="academic-button bg-gradient-accent">
              <Upload className="mr-2 h-4 w-4" />
              Upload Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleUploadSubmission}>
              <DialogHeader>
                <DialogTitle className="font-heading">Upload Student Submission</DialogTitle>
                <DialogDescription>
                  Add a new student submission for evaluation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment">Assignment</Label>
                  <Select value={uploadData.assignmentId} onValueChange={(value) => 
                    setUploadData({ ...uploadData, assignmentId: value })
                  }>
                    <SelectTrigger className="academic-input">
                      <SelectValue placeholder="Select an assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignments.map((assignment) => (
                        <SelectItem key={assignment.id} value={assignment.id}>
                          {assignment.title} ({assignment.unit_code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    placeholder="e.g., S001"
                    value={uploadData.studentId}
                    onChange={(e) => setUploadData({ ...uploadData, studentId: e.target.value })}
                    required
                    className="academic-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Submission Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste the student's submission text here..."
                    value={uploadData.content}
                    onChange={(e) => setUploadData({ ...uploadData, content: e.target.value })}
                    className="academic-input"
                    rows={6}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="academic-button">
                  Upload & Evaluate
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
                placeholder="Search by student ID, assignment, or unit code..."
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

      {/* Submissions Table */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="font-heading">All Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student & Assignment</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>AI Classification</TableHead>
                <TableHead>Rubric Scores</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{submission.student_id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        <span>{submission.assignment?.title || 'Unknown Assignment'}</span>
                        <Badge variant="outline" className="text-xs">
                          {submission.assignment?.unit_code || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(submission.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(submission.created_at).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {submission.evaluation?.classification ? getClassificationBadge(submission.evaluation.classification) : <Badge variant="outline">Pending</Badge>}
                  </TableCell>
                  <TableCell>
                    {submission.evaluation?.rubric_scores ? getRubricScoreDisplay(submission.evaluation.rubric_scores) : <span className="text-muted-foreground text-sm">No evaluation</span>}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(submission.status)}
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
                          <Link to={`/submissions/${submission.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Review
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => openDeleteDialog(submission)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Submission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">No submissions found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Upload your first submission to get started.'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setIsUploadDialogOpen(true)}
                  className="academic-button"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Submission
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Submission Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the submission from {selectedSubmission?.student_id}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSubmission} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}