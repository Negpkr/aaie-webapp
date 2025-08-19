import { GraduationCap, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Documentation', href: '/docs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'GitHub', href: 'https://github.com/aaie' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold text-primary">AAIE</span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                Assessment Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                {...(item.href.startsWith('http') && { 
                  target: '_blank', 
                  rel: 'noopener noreferrer' 
                })}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  {...(item.href.startsWith('http') && { 
                    target: '_blank', 
                    rel: 'noopener noreferrer' 
                  })}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <div className="mt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" asChild>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}