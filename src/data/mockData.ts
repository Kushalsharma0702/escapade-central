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
  images: string[];
  rating: number;
  category: string;
  tags: string[];
  visible: boolean;
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

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  images: string[];
  travelSeason: string;
  attractions: string[];
}

export interface Route {
  id: string;
  source: string;
  destination: string;
  stops: string[];
  distance: string;
  travelMode: 'Flight' | 'Road' | 'Train';
  duration: string;
}

export const demoUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@routeaura.com', role: 'admin', phone: '+1 555-0100', joinedDate: '2024-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'client@routeaura.com', role: 'client', phone: '+1 555-0201', joinedDate: '2024-03-20' },
  { id: '3', name: 'Mike Chen', email: 'mike@example.com', role: 'client', phone: '+1 555-0302', joinedDate: '2024-05-10' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', role: 'client', phone: '+1 555-0403', joinedDate: '2024-06-01' },
  { id: '5', name: 'James Brown', email: 'james@example.com', role: 'client', phone: '+1 555-0504', joinedDate: '2024-07-15' },
];

export const travelPackages: TravelPackage[] = [
  {
    id: 'pkg-1', title: 'Bali Paradise Retreat', destination: 'Bali, Indonesia',
    description: 'Experience the magic of Bali with pristine beaches, ancient temples, and lush rice terraces. Includes luxury villa accommodation and guided tours.',
    price: 1299, duration: 7, availableSeats: 20, travelDate: '2026-04-15',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
    ],
    rating: 4.8, category: 'Beach', tags: ['Family', 'Relaxation', 'Culture'], visible: true,
  },
  {
    id: 'pkg-2', title: 'Swiss Alps Adventure', destination: 'Zurich, Switzerland',
    description: 'Conquer the majestic Swiss Alps with guided hiking, skiing, and breathtaking mountain views. Premium chalet stay included.',
    price: 2499, duration: 10, availableSeats: 12, travelDate: '2026-05-01',
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
      'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=800',
    ],
    rating: 4.9, category: 'Adventure', tags: ['Adventure', 'Sports', 'Nature'], visible: true,
  },
  {
    id: 'pkg-3', title: 'Tokyo Cultural Experience', destination: 'Tokyo, Japan',
    description: 'Immerse yourself in Japanese culture with visits to historic shrines, traditional tea ceremonies, and vibrant city nightlife.',
    price: 1899, duration: 8, availableSeats: 15, travelDate: '2026-03-20',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    ],
    rating: 4.7, category: 'Cultural', tags: ['Culture', 'City', 'Food'], visible: true,
  },
  {
    id: 'pkg-4', title: 'Maldives Luxury Escape', destination: 'Maldives',
    description: 'Unwind in overwater villas with crystal-clear waters, private beaches, and world-class spa treatments.',
    price: 3499, duration: 5, availableSeats: 8, travelDate: '2026-06-10',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
    ],
    rating: 5.0, category: 'Luxury', tags: ['Luxury', 'Beach', 'Honeymoon'], visible: true,
  },
  {
    id: 'pkg-5', title: 'Safari in Kenya', destination: 'Nairobi, Kenya',
    description: 'Witness the Big Five on an unforgettable African safari. Luxury lodge accommodation with expert guides.',
    price: 2199, duration: 6, availableSeats: 10, travelDate: '2026-07-05',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
    ],
    rating: 4.6, category: 'Adventure', tags: ['Adventure', 'Wildlife', 'Nature'], visible: true,
  },
  {
    id: 'pkg-6', title: 'Santorini Getaway', destination: 'Santorini, Greece',
    description: 'Explore whitewashed villages, stunning sunsets, and delicious Mediterranean cuisine on this Greek island paradise.',
    price: 1599, duration: 5, availableSeats: 18, travelDate: '2026-05-20',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      'https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?w=800',
    ],
    rating: 4.8, category: 'Beach', tags: ['Beach', 'Romantic', 'Food'], visible: true,
  },
];

export const destinations: Destination[] = [
  {
    id: 'dest-1', name: 'Bali', country: 'Indonesia',
    description: 'A tropical paradise known for forested volcanic mountains, iconic rice paddies, and beautiful beaches.',
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800'],
    travelSeason: 'Apr - Oct', attractions: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur'],
  },
  {
    id: 'dest-2', name: 'Zurich', country: 'Switzerland',
    description: 'Gateway to the Swiss Alps with stunning mountain scenery and world-class skiing.',
    images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800'],
    travelSeason: 'Jun - Sep / Dec - Mar', attractions: ['Jungfrau', 'Lake Zurich', 'Matterhorn', 'Interlaken'],
  },
  {
    id: 'dest-3', name: 'Tokyo', country: 'Japan',
    description: 'A dazzling blend of traditional culture and ultramodern technology.',
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'],
    travelSeason: 'Mar - May / Sep - Nov', attractions: ['Shibuya Crossing', 'Senso-ji Temple', 'Mount Fuji', 'Akihabara'],
  },
  {
    id: 'dest-4', name: 'Maldives', country: 'Maldives',
    description: 'Crystal-clear waters and overwater bungalows define this ultimate luxury destination.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800'],
    travelSeason: 'Nov - Apr', attractions: ['Male Atoll', 'Underwater Restaurant', 'Coral Reefs', 'Dolphin Cruises'],
  },
  {
    id: 'dest-5', name: 'Santorini', country: 'Greece',
    description: 'Iconic sunsets, white-washed buildings, and azure waters on the Aegean Sea.',
    images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800'],
    travelSeason: 'May - Oct', attractions: ['Oia Sunset', 'Red Beach', 'Ancient Akrotiri', 'Fira Town'],
  },
];

export const routes: Route[] = [
  { id: 'rt-1', source: 'New York', destination: 'Bali', stops: ['Dubai', 'Singapore'], distance: '16,200 km', travelMode: 'Flight', duration: '22h' },
  { id: 'rt-2', source: 'London', destination: 'Zurich', stops: [], distance: '960 km', travelMode: 'Train', duration: '8h' },
  { id: 'rt-3', source: 'Los Angeles', destination: 'Tokyo', stops: ['Honolulu'], distance: '8,800 km', travelMode: 'Flight', duration: '12h' },
  { id: 'rt-4', source: 'Singapore', destination: 'Maldives', stops: ['Colombo'], distance: '3,300 km', travelMode: 'Flight', duration: '5h' },
  { id: 'rt-5', source: 'Paris', destination: 'Santorini', stops: ['Rome', 'Athens'], distance: '2,800 km', travelMode: 'Flight', duration: '4h' },
  { id: 'rt-6', source: 'Mumbai', destination: 'Nairobi', stops: ['Addis Ababa'], distance: '4,500 km', travelMode: 'Flight', duration: '6h' },
];

export const bookings: Booking[] = [
  {
    id: 'bk-1', packageId: 'pkg-1', packageName: 'Bali Paradise Retreat', clientId: '2',
    clientName: 'Sarah Johnson', clientEmail: 'client@routeaura.com', clientPhone: '+1 555-0201',
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
    clientName: 'Sarah Johnson', clientEmail: 'client@routeaura.com', clientPhone: '+1 555-0201',
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
  { name: 'Beach', value: 40, fill: 'hsl(239 84% 67%)' },
  { name: 'Adventure', value: 25, fill: 'hsl(187 92% 53%)' },
  { name: 'Cultural', value: 20, fill: 'hsl(152 60% 42%)' },
  { name: 'Luxury', value: 15, fill: 'hsl(38 92% 50%)' },
];
