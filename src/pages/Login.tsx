import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plane, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      const user = JSON.parse(localStorage.getItem('travelmate_user') || '{}');
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const fillDemo = (role: 'admin' | 'client') => {
    if (role === 'admin') {
      setEmail('admin@travelmate.com');
      setPassword('Admin@123');
    } else {
      setEmail('client@travelmate.com');
      setPassword('Client@123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary-foreground/20"
              style={{
                width: `${200 + i * 120}px`, height: `${200 + i * 120}px`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-primary-foreground text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center">
              <Plane className="w-7 h-7 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">TravelMate</h1>
          </div>
          <p className="text-xl opacity-90 max-w-md leading-relaxed">
            Your complete travel management platform. Plan, book, and manage trips with ease.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            {[{ n: '500+', l: 'Destinations' }, { n: '10K+', l: 'Travelers' }, { n: '98%', l: 'Satisfaction' }].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-bold">{s.n}</div>
                <div className="text-sm opacity-75">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">TravelMate</span>
          </div>

          <Card className="shadow-card border-border/50">
            <CardHeader className="space-y-1 pb-4">
              <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
              <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" value={email}
                    onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password"
                      value={password} onChange={e => setPassword(e.target.value)} required className="pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6">
                <p className="text-xs text-muted-foreground text-center mb-3">Quick demo access</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" onClick={() => fillDemo('admin')} className="text-xs">
                    Admin Demo
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => fillDemo('client')} className="text-xs">
                    Client Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
