import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagePackages from "./pages/admin/ManagePackages";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageDestinations from "./pages/admin/ManageDestinations";
import ClientDashboard from "./pages/client/ClientDashboard";
import BrowsePackages from "./pages/client/BrowsePackages";
import MyBookings from "./pages/client/MyBookings";
import ClientProfile from "./pages/client/ClientProfile";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: React.ReactNode; role: 'admin' | 'client' }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== role) return <Navigate to="/" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    
    {/* Admin Routes */}
    <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/packages" element={<ProtectedRoute role="admin"><ManagePackages /></ProtectedRoute>} />
    <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><ManageBookings /></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />
    <Route path="/admin/destinations" element={<ProtectedRoute role="admin"><ManageDestinations /></ProtectedRoute>} />

    {/* Client Routes */}
    <Route path="/dashboard" element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>} />
    <Route path="/dashboard/packages" element={<ProtectedRoute role="client"><BrowsePackages /></ProtectedRoute>} />
    <Route path="/dashboard/bookings" element={<ProtectedRoute role="client"><MyBookings /></ProtectedRoute>} />
    <Route path="/dashboard/profile" element={<ProtectedRoute role="client"><ClientProfile /></ProtectedRoute>} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
