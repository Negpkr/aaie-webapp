import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Brain, BarChart3, Shield, Zap, Users } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 p-3 rounded-full bg-primary/10 border">
              <GraduationCap className="h-8 w-8 text-primary" />
              <Brain className="h-8 w-8 text-accent" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            AAIE
          </h1>
          
          <p className="text-2xl md:text-3xl font-heading mb-4 text-foreground">
            Artificial Assessment Intelligence Engine
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your educational assessment process with advanced AI technology. 
            Streamline grading, enhance feedback quality, and gain insights into student performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary px-8 py-6 text-lg">
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link to="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionize Assessment with AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed for educators who want to enhance their assessment capabilities 
              while maintaining academic integrity and personalized feedback.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elegant">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Instant Analysis</CardTitle>
                <CardDescription>
                  AI-powered classification to identify AI-generated, human-written, or hybrid content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms analyze writing patterns, style, and content to provide 
                  accurate classification with confidence scores.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Rubric-Based Scoring</CardTitle>
                <CardDescription>
                  Automated evaluation across multiple dimensions with detailed feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Evaluate submissions on conceptual understanding, application skills, 
                  critical evaluation, and writing quality with consistent scoring.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Academic Integrity</CardTitle>
                <CardDescription>
                  Maintain educational standards with comprehensive integrity checking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detect potential academic dishonesty while supporting legitimate use of 
                  AI tools in educational contexts.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Collaborative Platform</CardTitle>
                <CardDescription>
                  Streamlined workflow for educators with submission management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create assignments, collect submissions, and provide feedback all in 
                  one integrated platform designed for educational excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Intelligent Feedback</CardTitle>
                <CardDescription>
                  Personalized, constructive feedback to enhance student learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Generate detailed, actionable feedback that helps students improve 
                  their work while saving educators valuable time.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elegant">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Educational Analytics</CardTitle>
                <CardDescription>
                  Insights into learning patterns and assessment effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track student progress, identify learning trends, and optimize 
                  your teaching strategies with comprehensive analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Assessment Process?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join educators worldwide who are using AAIE to enhance their teaching 
            and provide better feedback to their students.
          </p>
          <Button asChild size="lg" className="btn-primary px-8 py-6 text-lg">
            <Link to="/auth">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}