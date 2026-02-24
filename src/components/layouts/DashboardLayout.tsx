import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plane, LayoutDashboard, Package, BookOpen, Users, MapPin, Menu, X,
  LogOut, User, ChevronDown, Globe, CalendarDays, Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const adminNav: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Packages', href: '/admin/packages', icon: Package },
  { label: 'Bookings', href: '/admin/bookings', icon: BookOpen },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
];

const clientNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Browse Packages', href: '/dashboard/packages', icon: Globe },
  { label: 'My Bookings', href: '/dashboard/bookings', icon: CalendarDays },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = user?.role === 'admin' ? adminNav : clientNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin' || href === '/dashboard') return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col gradient-sidebar fixed inset-y-0 left-0 z-30">
        <div className="p-6">
          <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Plane className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">TravelMate</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href} to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive(item.href)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-muted truncate">{user?.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 gradient-sidebar z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                    <Plane className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <span className="text-lg font-bold text-sidebar-foreground">TravelMate</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground/70">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 px-3 space-y-1">
                {navItems.map(item => (
                  <Link
                    key={item.href} to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                      isActive(item.href)
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 glass border-b border-border/50">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text" placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-48"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="text-xs text-muted-foreground">{user?.email}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
