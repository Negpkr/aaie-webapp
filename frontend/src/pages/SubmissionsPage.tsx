import { useState } from 'react';
import { Upload, Search, Filter, Eye, FileText, User, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
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

// Mock data
const mockSubmissions = [
  {
    id: '1',
    studentId: 'S001',
    assignmentTitle: 'Essay Analysis Assignment',
    unitCode: 'SIT374',
    submittedAt: '2025-01-20T14:30:00Z',
    status: 'draft',
    evaluation: {
      classification: 'Hybrid',
      confidence: 0.75,
      rubricScores: {
        conceptual: 4,
        application: 3,
        evaluation: 4,
        writing: 5,
      },
    },
  },
  {
    id: '2',
    studentId: 'S002',
    assignmentTitle: 'Research Methods Report',
    unitCode: 'SIT312',
    submittedAt: '2025-01-19T16:45:00Z',
    status: 'published',
    evaluation: {
      classification: 'Human',
      confidence: 0.92,
      rubricScores: {
        conceptual: 5,
        application: 4,
        evaluation: 5,
        writing: 4,
      },
    },
  },
  {
    id: '3',
    studentId: 'S003',
    assignmentTitle: 'Final Project Proposal',
    unitCode: 'SIT374',
    submittedAt: '2025-01-18T10:15:00Z',
    status: 'draft',
    evaluation: {
      classification: 'AI',
      confidence: 0.88,
      rubricScores: {
        conceptual: 2,
        application: 3,
        evaluation: 2,
        writing: 3,
      },
    },
  },
];

const mockAssignments = [
  { id: '1', title: 'Essay Analysis Assignment', unitCode: 'SIT374' },
  { id: '2', title: 'Research Methods Report', unitCode: 'SIT312' },
  { id: '3', title: 'Final Project Proposal', unitCode: 'SIT374' },
];

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    assignmentId: '',
    studentId: '',
    content: '',
  });

  const filteredSubmissions = mockSubmissions.filter(submission =>
    submission.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.unitCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission upload
    console.log('Uploading submission:', uploadData);
    setIsUploadDialogOpen(false);
    setUploadData({ assignmentId: '', studentId: '', content: '' });
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

  const getClassificationBadge = (classification: string, confidence: number) => {
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
      <div className="space-y-1">
        <Badge className={`${getColor()} border`}>
          {classification}
        </Badge>
        <div className="text-xs text-muted-foreground">
          {Math.round(confidence * 100)}% confidence
        </div>
      </div>
    );
  };

  const getAverageScore = (scores: any) => {
    const values = Object.values(scores) as number[];
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

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
                      {mockAssignments.map((assignment) => (
                        <SelectItem key={assignment.id} value={assignment.id}>
                          {assignment.title} ({assignment.unitCode})
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
                <TableHead>Rubric Average</TableHead>
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
                        <span className="font-medium">{submission.studentId}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        <span>{submission.assignmentTitle}</span>
                        <Badge variant="outline" className="text-xs">
                          {submission.unitCode}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(submission.submittedAt).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getClassificationBadge(
                      submission.evaluation.classification,
                      submission.evaluation.confidence
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-lg font-semibold">
                        {getAverageScore(submission.evaluation.rubricScores)}
                      </div>
                      <div className="text-xs text-muted-foreground">out of 5</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(submission.status)}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="outline" size="sm" className="academic-button">
                      <Link to={`/submissions/${submission.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Link>
                    </Button>
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
    </div>
  );
}