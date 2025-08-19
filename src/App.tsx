import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Documentation and static pages */}
          <Route path="/docs" element={<div className="p-6">Documentation (Coming Soon)</div>} />
          <Route path="/about" element={<div className="p-6">About (Coming Soon)</div>} />
          <Route path="/contact" element={<div className="p-6">Contact (Coming Soon)</div>} />
          
          <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/submissions" element={<SubmissionsPage />} />
            <Route path="/submissions/:id" element={<div className="p-6">Feedback Hub (Coming Soon)</div>} />
            <Route path="/reports" element={<div className="p-6">Reports (Coming Soon)</div>} />
            <Route path="/settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
