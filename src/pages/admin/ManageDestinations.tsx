import { travelPackages } from '@/data/mockData';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function ManageDestinations() {
  const destinations = [...new Set(travelPackages.map(p => p.destination))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Destinations</h1>
        <p className="text-sm text-muted-foreground mt-1">Popular travel destinations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((dest, i) => {
          const pkgs = travelPackages.filter(p => p.destination === dest);
          const img = pkgs[0]?.image;
          return (
            <motion.div key={dest} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="relative rounded-xl overflow-hidden h-48 group">
              <img src={img} alt={dest} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-primary-foreground">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin className="w-4 h-4" />
                  <h3 className="font-semibold">{dest}</h3>
                </div>
                <p className="text-xs opacity-80">{pkgs.length} package{pkgs.length > 1 ? 's' : ''} available</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
