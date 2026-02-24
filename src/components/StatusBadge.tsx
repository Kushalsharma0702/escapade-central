import { cn } from '@/lib/utils';

type BadgeVariant = 'pending' | 'approved' | 'rejected' | 'paid' | 'unpaid' | 'refunded';

const variants: Record<BadgeVariant, string> = {
  pending: 'bg-warning/15 text-warning border-warning/20',
  approved: 'bg-success/15 text-success border-success/20',
  rejected: 'bg-destructive/15 text-destructive border-destructive/20',
  paid: 'bg-success/15 text-success border-success/20',
  unpaid: 'bg-warning/15 text-warning border-warning/20',
  refunded: 'bg-muted text-muted-foreground border-border',
};

export default function StatusBadge({ status }: { status: BadgeVariant }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize', variants[status])}>
      {status}
    </span>
  );
}
