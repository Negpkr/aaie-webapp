import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function SubmissionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Submissions</h1>
        <p className="text-muted-foreground">Review and evaluate student submissions</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Research Paper - Climate Change Analysis
                </CardTitle>
                <CardDescription>Student: Sarah Johnson | Submitted 2 hours ago</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Pending Review
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Assignment: Research Paper Analysis</p>
                <p className="text-sm font-medium">File: climate_analysis_final.pdf (2.3 MB)</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Preview</Button>
                <Button size="sm">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Critical Essay - Modern Literature
                </CardTitle>
                <CardDescription>Student: Michael Chen | Submitted yesterday</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="flex items-center gap-1 bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3" />
                  Evaluated
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Assignment: Critical Essay Writing</p>
                <p className="text-sm font-medium">Score: 85/100 | AI Classification: Human</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Feedback</Button>
                <Button variant="outline" size="sm">Edit Score</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Lab Report - Physics Experiment
                </CardTitle>
                <CardDescription>Student: Emma Davis | Submitted 3 days ago</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Needs Review
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Assignment: Lab Report Analysis</p>
                <p className="text-sm font-medium">AI Classification: Hybrid (60% AI)</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Preview</Button>
                <Button size="sm">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}