import { useEffect, useState } from 'react';
import { Plus, FileText, Send, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockStats = {
  totalAssignments: 12,
  totalSubmissions: 48,
  pendingReviews: 8,
  publishedFeedback: 40,
};

const mockRecentActivity = [
  {
    id: '1',
    type: 'submission',
    title: 'New submission for Essay Analysis',
    time: '2 hours ago',
    unit: 'SIT374',
  },
  {
    id: '2',
    type: 'feedback',
    title: 'Feedback published for Research Methods',
    time: '4 hours ago',
    unit: 'SIT312',
  },
  {
    id: '3',
    type: 'assignment',
    title: 'New assignment created: Final Project',
    time: '1 day ago',
    unit: 'SIT374',
  },
];

const mockAssignments = [
  {
    id: '1',
    title: 'Essay Analysis Assignment',
    unitCode: 'SIT374',
    dueDate: '2025-02-15',
    submissionCount: 15,
    pendingCount: 3,
  },
  {
    id: '2',
    title: 'Research Methods Report',
    unitCode: 'SIT312',
    dueDate: '2025-02-20',
    submissionCount: 12,
    pendingCount: 2,
  },
  {
    id: '3',
    title: 'Final Project Proposal',
    unitCode: 'SIT374',
    dueDate: '2025-03-01',
    submissionCount: 8,
    pendingCount: 8,
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold">
          Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Educator'}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your assessment activities and recent updates.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalAssignments}</div>
            <p className="text-xs text-muted-foreground">Active assignments</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Student submissions</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{mockStats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Feedback</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockStats.publishedFeedback}</div>
            <p className="text-xs text-muted-foreground">Completed reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Assignments */}
        <Card className="academic-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-heading">Recent Assignments</CardTitle>
              <CardDescription>
                Your active assignments and their progress
              </CardDescription>
            </div>
            <Button asChild size="sm" className="academic-button">
              <Link to="/assignments">
                <Plus className="mr-2 h-4 w-4" />
                New Assignment
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAssignments.map((assignment) => (
                <div 
                  key={assignment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <Badge variant="secondary">{assignment.unitCode}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">
                      {assignment.submissionCount} submissions
                    </p>
                    {assignment.pendingCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {assignment.pendingCount} pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'submission' && (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Send className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'feedback' && (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'assignment' && (
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.unit}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle className="font-heading">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts for efficient workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default" className="academic-button">
              <Link to="/assignments">
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Link>
            </Button>
            <Button asChild variant="outline" className="academic-button">
              <Link to="/submissions">
                <Send className="mr-2 h-4 w-4" />
                Upload Submission
              </Link>
            </Button>
            <Button asChild variant="outline" className="academic-button">
              <Link to="/submissions">
                <Clock className="mr-2 h-4 w-4" />
                Review Pending
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}