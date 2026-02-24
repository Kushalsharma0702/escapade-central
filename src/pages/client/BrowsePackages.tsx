import { useState } from 'react';
import { travelPackages } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, MapPin, Clock, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function BrowsePackages() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [bookingPkg, setBookingPkg] = useState<string | null>(null);

  const filtered = travelPackages.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase());
    const matchBudget = budgetFilter === 'all' ||
      (budgetFilter === 'low' && p.price < 1500) ||
      (budgetFilter === 'mid' && p.price >= 1500 && p.price < 2500) ||
      (budgetFilter === 'high' && p.price >= 2500);
    const matchDuration = durationFilter === 'all' ||
      (durationFilter === 'short' && p.duration <= 5) ||
      (durationFilter === 'medium' && p.duration > 5 && p.duration <= 8) ||
      (durationFilter === 'long' && p.duration > 8);
    return matchSearch && matchBudget && matchDuration;
  });

  const handleBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Booking request submitted! Awaiting admin approval.');
    setBookingPkg(null);
  };

  const selectedPkg = travelPackages.find(p => p.id === bookingPkg);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Browse Packages</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover your next adventure</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search destinations..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={budgetFilter} onValueChange={setBudgetFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Budget" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Budgets</SelectItem>
            <SelectItem value="low">Under $1,500</SelectItem>
            <SelectItem value="mid">$1,500 - $2,500</SelectItem>
            <SelectItem value="high">$2,500+</SelectItem>
          </SelectContent>
        </Select>
        <Select value={durationFilter} onValueChange={setDurationFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Duration" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            <SelectItem value="short">1-5 days</SelectItem>
            <SelectItem value="medium">6-8 days</SelectItem>
            <SelectItem value="long">9+ days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((pkg, i) => (
          <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden hover:shadow-card-hover transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                <Star className="w-3 h-3 text-warning fill-warning" />
                <span className="text-xs font-semibold text-card-foreground">{pkg.rating}</span>
              </div>
              <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
                {pkg.category}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-semibold text-card-foreground text-lg">{pkg.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{pkg.destination}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration} days</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{pkg.availableSeats} seats</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <div>
                  <span className="text-xl font-bold text-primary">${pkg.price}</span>
                  <span className="text-xs text-muted-foreground">/person</span>
                </div>
                <Button className="gradient-accent text-accent-foreground" onClick={() => setBookingPkg(pkg.id)}>
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Dialog */}
      <Dialog open={!!bookingPkg} onOpenChange={o => !o && setBookingPkg(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book: {selectedPkg?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBook} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={user?.name} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={user?.email} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue={user?.phone} required />
              </div>
              <div className="space-y-2">
                <Label>Travelers</Label>
                <Input type="number" defaultValue={1} min={1} max={selectedPkg?.availableSeats} required />
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4 text-sm space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Package</span><span className="font-medium text-foreground">{selectedPkg?.title}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Price/person</span><span className="font-medium text-foreground">${selectedPkg?.price}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Travel Date</span><span className="font-medium text-foreground">{selectedPkg?.travelDate}</span></div>
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground">Submit Booking</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
