import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { LandingFooter } from '@/components/layout/LandingFooter';

// Pages
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import AssignmentsPage from '@/pages/AssignmentsPage';
import SubmissionsPage from '@/pages/SubmissionsPage';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            <div className="min-h-screen flex flex-col">
              <LandingHeader />
              <main className="flex-1">
                <Index />
              </main>
              <LandingFooter />
            </div>
          } 
        />
        <Route 
          path="/auth" 
          element={
            <div className="min-h-screen flex flex-col">
              <LandingHeader />
              <main className="flex-1">
                <AuthPage />
              </main>
              <LandingFooter />
            </div>
          } 
        />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }>
          <Route index element={<DashboardPage />} />
        </Route>
        
        <Route path="/assignments" element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }>
          <Route index element={<AssignmentsPage />} />
        </Route>
        
        <Route path="/submissions" element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }>
          <Route index element={<SubmissionsPage />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;