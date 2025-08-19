import { useState } from 'react';
import { Plus, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAssignments } from '@/hooks/useAssignments';
import { useSubmissions } from '@/hooks/useSubmissions';
import { toast } from 'sonner';

interface SubmissionUploadDialogProps {
  children: React.ReactNode;
}

export function SubmissionUploadDialog({ children }: SubmissionUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    student_id: '',
    assignment_id: '',
    content: '',
    file_url: '',
  });

  const { assignments } = useAssignments();
  const { createSubmission } = useSubmissions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createSubmission({
        student_id: formData.student_id,
        assignment_id: formData.assignment_id,
        content: formData.content,
      });

      toast.success('Submission uploaded successfully');
      setIsOpen(false);
      setFormData({
        student_id: '',
        assignment_id: '',
        content: '',
        file_url: '',
      });
    } catch (error) {
      toast.error('Failed to upload submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-heading">Upload New Submission</DialogTitle>
            <DialogDescription>
              Add a new student submission to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student_id">Student ID</Label>
              <Input
                id="student_id"
                placeholder="e.g., s123456789"
                value={formData.student_id}
                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                required
                className="academic-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignment_id">Assignment</Label>
              <Select
                value={formData.assignment_id}
                onValueChange={(value) => setFormData({ ...formData, assignment_id: value })}
                required
              >
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
              <Label htmlFor="content">Submission Content</Label>
              <Textarea
                id="content"
                placeholder="Enter the submission content..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                className="academic-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file_url">File URL (Optional)</Label>
              <Input
                id="file_url"
                placeholder="https://example.com/file.pdf"
                value={formData.file_url}
                onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                className="academic-input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="academic-button"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Submission
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}