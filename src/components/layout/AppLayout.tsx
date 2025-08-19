import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from '@/hooks/useAuth';
import { Outlet, useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/assignments': 'Assignments',
  '/submissions': 'Submissions',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

export function AppLayout() {
  const location = useLocation();
  const { loading } = useAuth();

  // Get page title from current route
  const currentTitle = pageTitles[location.pathname] || 'AAIE';

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-1 flex-col">
          <Header title={currentTitle} />
          
          <main className="flex-1 p-6">
            <a 
              href="#main-content" 
              className="skip-link"
            >
              Skip to main content
            </a>
            <div id="main-content">
              <Outlet />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}