import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Brain, Shield, Zap, ArrowRight, Users, Award, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl pt-20 pb-32 sm:pt-32 sm:pb-40">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              AI-Powered Academic
              <span className="text-primary"> Assessment Platform</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Revolutionize your academic assessment workflow with intelligent submission analysis, 
              automated rubric scoring, and comprehensive plagiarism detection.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="academic-button bg-gradient-primary">
                <Link to="/auth">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="academic-button">
                <Link to="/dashboard">
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Powerful Features for Modern Education
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Everything you need to streamline academic assessment and provide meaningful feedback.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <Card className="academic-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>AI Classification</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced AI analysis to detect human, AI-generated, or hybrid content with high accuracy and confidence scoring.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="academic-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Award className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle>Smart Rubric Scoring</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Automated evaluation across Conceptual, Application, Evaluation, and Writing dimensions with detailed scoring breakdown.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="academic-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Comprehensive Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Detailed insights and reports on submission patterns, performance trends, and assessment analytics.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="academic-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Assignment Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create, organize, and track assignments with due dates, submission counts, and progress monitoring.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="academic-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle>Student Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Monitor individual student progress and provide personalized feedback for improved learning outcomes.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="academic-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Secure & Reliable</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Enterprise-grade security with encrypted data storage and reliable infrastructure for academic institutions.
                  </CardDescription>
                </CardContent>
              </Card>
            </dl>
          </div>
        </div>
      </section>

      