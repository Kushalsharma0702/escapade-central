import { useState } from 'react';
import { bookings as initialBookings, Booking } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { Check, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ManageBookings() {
  const [allBookings, setAllBookings] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState('');

  const filtered = allBookings.filter(b =>
    b.clientName.toLowerCase().includes(search.toLowerCase()) ||
    b.packageName.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setAllBookings(prev => prev.map(b =>
      b.id === id ? { ...b, status, paymentStatus: status === 'approved' ? 'paid' as const : 'refunded' as const } : b
    ));
    toast.success(`Booking ${status} successfully`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Manage Bookings</h1>
        <p className="text-sm text-muted-foreground mt-1">Approve or reject client booking requests</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {['Client', 'Package', 'Travelers', 'Travel Date', 'Amount', 'Status', 'Payment', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="border-t border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-card-foreground">{b.clientName}</p>
                    <p className="text-xs text-muted-foreground">{b.clientEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{b.packageName}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{b.travelers}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{b.travelDate}</td>
                  <td className="px-6 py-4 text-sm font-medium text-card-foreground">${b.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                  <td className="px-6 py-4"><StatusBadge status={b.paymentStatus} /></td>
                  <td className="px-6 py-4">
                    {b.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-success hover:bg-success/10 gap-1"
                          onClick={() => updateStatus(b.id, 'approved')}>
                          <Check className="w-3 h-3" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-destructive hover:bg-destructive/10 gap-1"
                          onClick={() => updateStatus(b.id, 'rejected')}>
                          <X className="w-3 h-3" /> Reject
                        </Button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
