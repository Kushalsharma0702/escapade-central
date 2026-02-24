export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  phone?: string;
  avatar?: string;
  joinedDate: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: number;
  duration: number;
  availableSeats: number;
  travelDate: string;
  image: string;
  rating: number;
  category: string;
}

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  travelers: number;
  travelDate: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  totalAmount: number;
  bookedDate: string;
}

export const demoUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@travelmate.com', role: 'admin', phone: '+1 555-0100', joinedDate: '2024-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'client@travelmate.com', role: 'client', phone: '+1 555-0201', joinedDate: '2024-03-20' },
  { id: '3', name: 'Mike Chen', email: 'mike@example.com', role: 'client', phone: '+1 555-0302', joinedDate: '2024-05-10' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', role: 'client', phone: '+1 555-0403', joinedDate: '2024-06-01' },
  { id: '5', name: 'James Brown', email: 'james@example.com', role: 'client', phone: '+1 555-0504', joinedDate: '2024-07-15' },
];

export const travelPackages: TravelPackage[] = [
  {
    id: 'pkg-1', title: 'Bali Paradise Retreat', destination: 'Bali, Indonesia',
    description: 'Experience the magic of Bali with pristine beaches, ancient temples, and lush rice terraces. Includes luxury villa accommodation and guided tours.',
    price: 1299, duration: 7, availableSeats: 20, travelDate: '2026-04-15',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', rating: 4.8, category: 'Beach',
  },
  {
    id: 'pkg-2', title: 'Swiss Alps Adventure', destination: 'Zurich, Switzerland',
    description: 'Conquer the majestic Swiss Alps with guided hiking, skiing, and breathtaking mountain views. Premium chalet stay included.',
    price: 2499, duration: 10, availableSeats: 12, travelDate: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', rating: 4.9, category: 'Adventure',
  },
  {
    id: 'pkg-3', title: 'Tokyo Cultural Experience', destination: 'Tokyo, Japan',
    description: 'Immerse yourself in Japanese culture with visits to historic shrines, traditional tea ceremonies, and vibrant city nightlife.',
    price: 1899, duration: 8, availableSeats: 15, travelDate: '2026-03-20',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', rating: 4.7, category: 'Cultural',
  },
  {
    id: 'pkg-4', title: 'Maldives Luxury Escape', destination: 'Maldives',
    description: 'Unwind in overwater villas with crystal-clear waters, private beaches, and world-class spa treatments.',
    price: 3499, duration: 5, availableSeats: 8, travelDate: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', rating: 5.0, category: 'Beach',
  },
  {
    id: 'pkg-5', title: 'Safari in Kenya', destination: 'Nairobi, Kenya',
    description: 'Witness the Big Five on an unforgettable African safari. Luxury lodge accommodation with expert guides.',
    price: 2199, duration: 6, availableSeats: 10, travelDate: '2026-07-05',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', rating: 4.6, category: 'Adventure',
  },
  {
    id: 'pkg-6', title: 'Santorini Getaway', destination: 'Santorini, Greece',
    description: 'Explore whitewashed villages, stunning sunsets, and delicious Mediterranean cuisine on this Greek island paradise.',
    price: 1599, duration: 5, availableSeats: 18, travelDate: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', rating: 4.8, category: 'Beach',
  },
];

export const bookings: Booking[] = [
  {
    id: 'bk-1', packageId: 'pkg-1', packageName: 'Bali Paradise Retreat', clientId: '2',
    clientName: 'Sarah Johnson', clientEmail: 'client@travelmate.com', clientPhone: '+1 555-0201',
    travelers: 2, travelDate: '2026-04-15', status: 'approved', paymentStatus: 'paid',
    totalAmount: 2598, bookedDate: '2026-01-10',
  },
  {
    id: 'bk-2', packageId: 'pkg-3', packageName: 'Tokyo Cultural Experience', clientId: '3',
    clientName: 'Mike Chen', clientEmail: 'mike@example.com', clientPhone: '+1 555-0302',
    travelers: 1, travelDate: '2026-03-20', status: 'pending', paymentStatus: 'unpaid',
    totalAmount: 1899, bookedDate: '2026-02-01',
  },
  {
    id: 'bk-3', packageId: 'pkg-4', packageName: 'Maldives Luxury Escape', clientId: '2',
    clientName: 'Sarah Johnson', clientEmail: 'client@travelmate.com', clientPhone: '+1 555-0201',
    travelers: 2, travelDate: '2026-06-10', status: 'pending', paymentStatus: 'unpaid',
    totalAmount: 6998, bookedDate: '2026-02-15',
  },
  {
    id: 'bk-4', packageId: 'pkg-2', packageName: 'Swiss Alps Adventure', clientId: '4',
    clientName: 'Emma Wilson', clientEmail: 'emma@example.com', clientPhone: '+1 555-0403',
    travelers: 3, travelDate: '2026-05-01', status: 'approved', paymentStatus: 'paid',
    totalAmount: 7497, bookedDate: '2026-01-20',
  },
  {
    id: 'bk-5', packageId: 'pkg-5', packageName: 'Safari in Kenya', clientId: '5',
    clientName: 'James Brown', clientEmail: 'james@example.com', clientPhone: '+1 555-0504',
    travelers: 2, travelDate: '2026-07-05', status: 'rejected', paymentStatus: 'refunded',
    totalAmount: 4398, bookedDate: '2026-02-05',
  },
];

export const monthlyBookingsData = [
  { month: 'Jan', bookings: 12 }, { month: 'Feb', bookings: 19 },
  { month: 'Mar', bookings: 15 }, { month: 'Apr', bookings: 25 },
  { month: 'May', bookings: 22 }, { month: 'Jun', bookings: 30 },
  { month: 'Jul', bookings: 28 }, { month: 'Aug', bookings: 35 },
  { month: 'Sep', bookings: 20 }, { month: 'Oct', bookings: 18 },
  { month: 'Nov', bookings: 24 }, { month: 'Dec', bookings: 32 },
];

export const destinationData = [
  { name: 'Beach', value: 40, fill: 'hsl(210 80% 45%)' },
  { name: 'Adventure', value: 25, fill: 'hsl(15 90% 58%)' },
  { name: 'Cultural', value: 20, fill: 'hsl(152 60% 42%)' },
  { name: 'Luxury', value: 15, fill: 'hsl(38 92% 50%)' },
];
