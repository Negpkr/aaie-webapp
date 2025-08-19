import { useEffect, useState } from 'react';
import { Plus, FileText, Send, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useAssignments } from '@/hooks/useAssignments';
import { useSubmissions } from '@/hooks/useSubmissions';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const { assignments, isLoading: assignmentsLoading } = useAssignments();
  const { submissions, isLoading: submissionsLoading } = useSubmissions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate stats from real data
  const stats = {
    totalAssignments: assignments.length,
    totalSubmissions: submissions.length,
    pendingReviews: submissions.filter(s => s.status === 'draft').length,
    publishedFeedback: submissions.filter(s => s.status === 'published').length,
  };

  // Get recent assignments with submission data
  const recentAssignments = assignments
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)
    .map(assignment => ({
      ...assignment,
      submissionCount: submissions.filter(s => s.assignment_id === assignment.id).length,
      pendingCount: submissions.filter(s => s.assignment_id === assignment.id && s.status === 'draft').length,
    }));

  // Get recent activity
  const recentActivity = [
    ...submissions.slice(0, 2).map(submission => ({
      id: submission.id,
      type: 'submission' as const,
      title: `New submission for ${submission.assignment?.title || 'Assignment'}`,
      time: new Date(submission.created_at).toLocaleDateString(),
      unit: submission.assignment?.unit_code || 'N/A',
    })),
    ...assignments.slice(0, 1).map(assignment => ({
      id: assignment.id,
      type: 'assignment' as const,
      title: `Assignment created: ${assignment.title}`,
      time: new Date(assignment.created_at).toLocaleDateString(),
      unit: assignment.unit_code,
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 3);

  if (!mounted || assignmentsLoading || submissionsLoading) {
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
            <div className="text-2xl font-bold">{stats.totalAssignments}</div>
            <p className="text-xs text-muted-foreground">Active assignments</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Student submissions</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Feedback</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.publishedFeedback}</div>
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
              {recentAssignments.length > 0 ? (
                recentAssignments.map((assignment) => (
                  <Link
                    key={assignment.id}
                    to={`/assignments/${assignment.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{assignment.title}</h3>
                          <Badge variant="secondary">{assignment.unit_code}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(assignment.due_at).toLocaleDateString()}
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
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No assignments yet</p>
              )}
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
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'submission' && (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Send className="h-4 w-4 text-blue-600" />
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
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No recent activity</p>
              )}
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