import { ArrowRight, GraduationCap, Users, BarChart3, Shield, Zap, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "AI Detection",
      description: "Advanced algorithms classify submissions as Human, AI, or Hybrid with high accuracy."
    },
    {
      icon: BarChart3,
      title: "Rubric Scoring",
      description: "Automated evaluation across Conceptual, Application, Evaluation, and Writing dimensions."
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Generate comprehensive feedback reports in seconds, not hours."
    },
    {
      icon: Users,
      title: "Educator Dashboard",
      description: "Manage assignments, track submissions, and analyze patterns across your classes."
    }
  ];

  const benefits = [
    "Reduce grading time by up to 80%",
    "Maintain academic integrity with AI detection",
    "Provide consistent, objective evaluations",
    "Generate detailed analytics and insights"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <GraduationCap className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary">
              Artificial Assessment Intelligence Engine
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Revolutionize academic assessment with AI-powered evaluation, integrity detection, 
              and comprehensive feedback generation for modern educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6"
                    asChild
                  >
                    <Link to="/auth">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-6"
                    asChild
                  >
                    <Link to="#features">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AAIE combines cutting-edge AI technology with educational expertise to deliver 
              comprehensive assessment solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="academic-card hover:shadow-academic-md transition-all">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <CardTitle className="font-heading text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Transform Your Assessment Process
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of educators who have already transformed their assessment 
                workflow with AAIE's intelligent evaluation system.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-academic-lg">
              <h3 className="font-heading text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Create your account today and experience the future of academic assessment.
              </p>
              {!user && (
                <Button size="lg" className="w-full" asChild>
                  <Link to="/auth">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Index;