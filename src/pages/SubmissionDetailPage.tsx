import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, FileText, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useSubmissions } from '@/hooks/useSubmissions';
import { toast } from 'sonner';

export default function SubmissionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { submissions, isLoading } = useSubmissions();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState('');

  const submission = submissions.find(s => s.id === id);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Submission Not Found</h1>
          <p className="text-muted-foreground mb-4">The submission you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/submissions')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Submissions
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'published':
        return <Badge className="bg-green-600">Published</Badge>;
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
      <div className="grid grid-cols-2 gap-4">
        {dimensions.map((dim) => {
          const key = dim.toLowerCase();
          const score = scores[key] || 1;
          const label = scoreLabels[score - 1];
          const colorClass = score === 4 ? 'text-green-600' : 
                           score === 3 ? 'text-blue-600' : 
                           score === 2 ? 'text-yellow-600' : 'text-red-600';
          
          return (
            <div key={dim} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">{dim}:</span>
              <span className={`font-semibold ${colorClass}`}>{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const handleSaveNotes = () => {
    toast.success('Teacher notes saved successfully');
    setIsEditingNotes(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/submissions')}
          className="academic-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="font-heading text-3xl font-bold">Review Submission</h1>
          <p className="text-muted-foreground">
            Student: {submission.student_id} • {submission.assignment?.title}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Content */}
          <Card className="academic-card">
            <CardHeader>
              <CardTitle className="font-heading">Submission Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {submission.content || 'No content available'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Feedback */}
          {submission.evaluation?.ai_feedback && (
            <Card className="academic-card">
              <CardHeader>
                <CardTitle className="font-heading">AI Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {submission.evaluation.ai_feedback}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Teacher Notes */}
          <Card className="academic-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading">Teacher Notes</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (isEditingNotes) {
                    setIsEditingNotes(false);
                  } else {
                    setTeacherNotes(submission.evaluation?.teacher_notes || '');
                    setIsEditingNotes(true);
                  }
                }}
              >
                {isEditingNotes ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <div className="space-y-4">
                  <Textarea
                    value={teacherNotes}
                    onChange={(e) => setTeacherNotes(e.target.value)}
                    placeholder="Add your notes and feedback here..."
                    rows={4}
                    className="academic-input"
                  />
                  <Button onClick={handleSaveNotes} className="academic-button">
                    <Save className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {submission.evaluation?.teacher_notes || 'No teacher notes yet. Click Edit to add notes.'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Submission Info */}
          <Card className="academic-card">
            <CardHeader>
              <CardTitle className="font-heading">Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{submission.student_id}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{submission.assignment?.title}</p>
                  <p className="text-sm text-muted-foreground">{submission.assignment?.unit_code}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm">{new Date(submission.created_at).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">{new Date(submission.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Status:</Label>
                {getStatusBadge(submission.status)}
              </div>
            </CardContent>
          </Card>

          {/* AI Evaluation */}
          {submission.evaluation && (
            <Card className="academic-card">
              <CardHeader>
                <CardTitle className="font-heading">AI Evaluation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Classification:</Label>
                  {getClassificationBadge(submission.evaluation.classification)}
                </div>
                
                <div>
                  <Label className="mb-3 block">Rubric Scores:</Label>
                  {getRubricScoreDisplay(submission.evaluation.rubric_scores)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}