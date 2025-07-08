export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  description: string;
  avgRent: number;
  rating: number;
  safetyScore: number;
  connectivity: number;
  greenSpaces: number;
  schools: number;
  nightlife: number;
  tags: string[];
  amenities: string[];
  housingOptions: {
    type: string;
    avgRent: number;
    availability: 'High' | 'Medium' | 'Low';
  }[];
  nearbyTransport: {
    name: string;
    type: string;
    distance: string;
  }[];
  population?: number;
  area?: number;
  avgAge?: number;
  crimeRate?: 'Low' | 'Medium' | 'High';
}

const neighborhoods: Neighborhood[] = [
  {
    id: '1',
    name: 'Jalandhar',
    city: 'Punjab',
    description: 'A vibrant tech hub with numerous startups, cafes, and a bustling nightlife. Perfect for young professionals and entrepreneurs.',
    avgRent: 35000,
    rating: 4.5,
    safetyScore: 8,
    connectivity: 9,
    greenSpaces: 6,
    schools: 7,
    nightlife: 9,
    tags: ['Tech Hub', 'Nightlife', 'Startups', 'Cafes', 'Young Crowd'],
    amenities: ['Metro Station', 'Shopping Malls', 'Restaurants', 'Hospitals', 'Gyms', 'Co-working Spaces'],
    housingOptions: [
      { type: 'Studio Apartment', avgRent: 25000, availability: 'High' },
      { type: '1 BHK', avgRent: 30000, availability: 'High' },
      { type: '2 BHK', avgRent: 45000, availability: 'Medium' },
      { type: 'Shared Accommodation', avgRent: 15000, availability: 'High' }
    ],
    nearbyTransport: [
      { name: 'Forum Mall Metro', type: 'Metro', distance: '0.5 km' },
      { name: 'Koramangala Bus Stop', type: 'Bus', distance: '0.2 km' },
      { name: 'Silk Board Junction', type: 'Major Junction', distance: '2 km' }
    ],
    population: 150000,
    area: 8.5,
    avgAge: 28,
    crimeRate: 'Low'
  },
  {
    id: '2',
    name: 'Indiranagar',
    city: 'Bangalore',
    description: 'An upscale neighborhood known for its shopping streets, fine dining, and cultural venues. Great for families and established professionals.',
    avgRent: 42000,
    rating: 4.6,
    safetyScore: 9,
    connectivity: 8,
    greenSpaces: 7,
    schools: 8,
    nightlife: 8,
    tags: ['Upscale', 'Shopping', 'Fine Dining', 'Cultural', 'Family-Friendly'],
    amenities: ['Metro Station', 'Shopping Streets', 'Restaurants', 'Cultural Centers', 'Parks', 'Premium Hospitals'],
    housingOptions: [
      { type: '1 BHK', avgRent: 35000, availability: 'Medium' },
      { type: '2 BHK', avgRent: 50000, availability: 'Medium' },
      { type: '3 BHK', avgRent: 75000, availability: 'Low' },
      { type: 'Villa', avgRent: 120000, availability: 'Low' }
    ],
    nearbyTransport: [
      { name: 'Indiranagar Metro', type: 'Metro', distance: '0.3 km' },
      { name: '100 Feet Road Bus Stop', type: 'Bus', distance: '0.1 km' },
      { name: 'HAL Airport Road', type: 'Major Road', distance: '1 km' }
    ],
    population: 85000,
    area: 6.2,
    avgAge: 35,
    crimeRate: 'Low'
  },
  {
    id: '3',
    name: 'High Tech City',
    city: 'Hyderabad',
    description: 'A major IT corridor with excellent infrastructure, modern amenities, and proximity to tech parks. Ideal for IT professionals.',
    avgRent: 28000,
    rating: 4.2,
    safetyScore: 8,
    connectivity: 7,
    greenSpaces: 8,
    schools: 9,
    nightlife: 6,
    tags: ['IT Corridor', 'Modern', 'Tech Parks', 'Infrastructure', 'Professional'],
    amenities: ['Tech Parks', 'International Schools', 'Hospitals', 'Shopping Malls', 'Sports Complexes', 'Metro Connectivity'],
    housingOptions: [
      { type: '1 BHK', avgRent: 22000, availability: 'High' },
      { type: '2 BHK', avgRent: 32000, availability: 'High' },
      { type: '3 BHK', avgRent: 48000, availability: 'Medium' },
      { type: 'Gated Community', avgRent: 55000, availability: 'Medium' }
    ],
    nearbyTransport: [
      { name: 'Whitefield Metro (Upcoming)', type: 'Metro', distance: '1 km' },
      { name: 'ITPL Bus Stop', type: 'Bus', distance: '0.5 km' },
      { name: 'Outer Ring Road', type: 'Major Road', distance: '0.8 km' }
    ],
    population: 200000,
    area: 12.5,
    avgAge: 30,
    crimeRate: 'Low'
  },
  {
    id: '4',
    name: 'LivinKey',
    city: 'Vijayawada',
    description: 'A traditional neighborhood with rich cultural heritage, temples, and local markets. Perfect for families who appreciate heritage and culture.',
    avgRent: 25000,
    rating: 4.3,
    safetyScore: 9,
    connectivity: 6,
    greenSpaces: 8,
    schools: 9,
    nightlife: 4,
    tags: ['Traditional', 'Cultural Heritage', 'Temples', 'Local Markets', 'Family-Oriented'],
    amenities: ['Temples', 'Traditional Markets', 'Schools', 'Parks', 'Libraries', 'Cultural Centers'],
    housingOptions: [
      { type: '1 BHK', avgRent: 20000, availability: 'Medium' },
      { type: '2 BHK', avgRent: 28000, availability: 'High' },
      { type: '3 BHK', avgRent: 40000, availability: 'Medium' },
      { type: 'Independent House', avgRent: 35000, availability: 'Low' }
    ],
    nearbyTransport: [
      { name: 'Malleswaram Metro', type: 'Metro', distance: '0.4 km' },
      { name: 'Sampige Road Bus Stop', type: 'Bus', distance: '0.3 km' },
      { name: 'Chord Road', type: 'Major Road', distance: '0.5 km' }
    ],
    population: 75000,
    area: 5.8,
    avgAge: 42,
    crimeRate: 'Low'
  },
  {
    id: '5',
    name: 'Neeladri Layout',
    city: 'Srikakulam',
    description: 'A well-planned residential area with excellent amenities, parks, and proximity to IT hubs. Great for young families and professionals.',
    avgRent: 32000,
    rating: 4.4,
    safetyScore: 8,
    connectivity: 8,
    greenSpaces: 9,
    schools: 8,
    nightlife: 7,
    tags: ['Planned Layout', 'Residential', 'Parks', 'IT Proximity', 'Family-Friendly'],
    amenities: ['Parks', 'Shopping Centers', 'Restaurants', 'Gyms', 'Schools', 'Hospitals'],
    housingOptions: [
      { type: '1 BHK', avgRent: 25000, availability: 'High' },
      { type: '2 BHK', avgRent: 35000, availability: 'High' },
      { type: '3 BHK', avgRent: 50000, availability: 'Medium' },
      { type: 'Gated Community', avgRent: 45000, availability: 'Medium' }
    ],
    nearbyTransport: [
      { name: 'HSR Layout Metro (Upcoming)', type: 'Metro', distance: '1.2 km' },
      { name: '27th Main Bus Stop', type: 'Bus', distance: '0.2 km' },
      { name: 'Outer Ring Road', type: 'Major Road', distance: '1 km' }
    ],
    population: 120000,
    area: 9.2,
    avgAge: 32,
    crimeRate: 'Low'
  },
  {
    id: '6',
    name: 'Rushikonda',
    city: 'Vishakhapatnam',
    description: 'A well-established residential locality with good infrastructure and connectivity. Suitable for families and working professionals.',
    avgRent: 26000,
    rating: 4.1,
    safetyScore: 8,
    connectivity: 7,
    greenSpaces: 7,
    schools: 8,
    nightlife: 6,
    tags: ['Established', 'Residential', 'Infrastructure', 'Connectivity', 'Middle-Class'],
    amenities: ['Metro Station', 'Schools', 'Hospitals', 'Parks', 'Shopping Areas', 'Restaurants'],
    housingOptions: [
      { type: '1 BHK', avgRent: 20000, availability: 'High' },
      { type: '2 BHK', avgRent: 28000, availability: 'High' },
      { type: '3 BHK', avgRent: 40000, availability: 'Medium' },
      { type: 'Independent House', avgRent: 32000, availability: 'Medium' }
    ],
    nearbyTransport: [
      { name: 'JP Nagar Metro', type: 'Metro', distance: '0.6 km' },
      { name: 'Puttenahalli Bus Stop', type: 'Bus', distance: '0.4 km' },
      { name: 'Bannerghatta Road', type: 'Major Road', distance: '0.8 km' }
    ],
    population: 95000,
    area: 7.5,
    avgAge: 38,
    crimeRate: 'Low'
  },
  {
    id: '7',
    name: 'Bandra West',
    city: 'Mumbai',
    description: 'A trendy upscale neighborhood known for its cafes, bars, and proximity to the sea. Popular among celebrities and young professionals.',
    avgRent: 65000,
    rating: 4.7,
    safetyScore: 8,
    connectivity: 9,
    greenSpaces: 6,
    schools: 7,
    nightlife: 10,
    tags: ['Upscale', 'Trendy', 'Nightlife', 'Cafes', 'Celebrity Area'],
    amenities: ['Railway Station', 'Sea Face', 'Restaurants', 'Bars', 'Shopping Areas', 'Gyms'],
    housingOptions: [
      { type: '1 BHK', avgRent: 45000, availability: 'Low' },
      { type: '2 BHK', avgRent: 75000, availability: 'Low' },
      { type: '3 BHK', avgRent: 120000, availability: 'Low' },
      { type: 'Luxury Apartment', avgRent: 200000, availability: 'Low' }
    ],
    nearbyTransport: [
      { name: 'Bandra Railway Station', type: 'Railway', distance: '0.8 km' },
      { name: 'Bandra Bus Depot', type: 'Bus', distance: '0.5 km' },
      { name: 'Western Express Highway', type: 'Highway', distance: '1 km' }
    ],
    population: 180000,
    area: 15.2,
    avgAge: 29,
    crimeRate: 'Medium'
  },
  {
    id: '8',
    name: 'Plura',
    city: 'New Delhi',
    description: 'A modern planned township with beautiful lake views, tech companies, and premium residential complexes. Great for IT professionals.',
    avgRent: 48000,
    rating: 4.4,
    safetyScore: 8,
    connectivity: 7,
    greenSpaces: 9,
    schools: 9,
    nightlife: 7,
    tags: ['Planned Township', 'Lake Views', 'Tech Hub', 'Premium', 'Modern'],
    amenities: ['Tech Parks', 'International Schools', 'Hospitals', 'Shopping Malls', 'Lake', 'Sports Facilities'],
    housingOptions: [
      { type: '1 BHK', avgRent: 35000, availability: 'Medium' },
      { type: '2 BHK', avgRent: 55000, availability: 'Medium' },
      { type: '3 BHK', avgRent: 80000, availability: 'Low' },
      { type: 'Luxury Villa', avgRent: 150000, availability: 'Low' }
    ],
    nearbyTransport: [
      { name: 'Powai Bus Depot', type: 'Bus', distance: '0.3 km' },
      { name: 'Eastern Express Highway', type: 'Highway', distance: '2 km' },
      { name: 'Mumbai Airport', type: 'Airport', distance: '8 km' }
    ],
    population: 165000,
    area: 13.8,
    avgAge: 31,
    crimeRate: 'Low'
  },
  {
  id: '9',
  name: 'Gariahat',
  city: 'Kolkata',
  description: 'A lively area known for shopping, street food, and cultural vibes. Well-connected and full of local energy.',
  avgRent: 27000,
  rating: 4.3,
  safetyScore: 7,
  connectivity: 9,
  greenSpaces: 6,
  schools: 8,
  nightlife: 6,
  tags: ['Shopping', 'Local Vibes', 'Street Food', 'Culture', 'Family Area'],
  amenities: ['Shopping Markets', 'Street Food Hubs', 'Schools', 'Hospitals', 'Parks'],
  housingOptions: [
    { type: '1 BHK', avgRent: 20000, availability: 'High' },
    { type: '2 BHK', avgRent: 28000, availability: 'Medium' },
    { type: '3 BHK', avgRent: 40000, availability: 'Low' },
    { type: 'Independent House', avgRent: 35000, availability: 'Medium' }
  ],
  nearbyTransport: [
    { name: 'Gariahat Crossing', type: 'Bus', distance: '0.3 km' },
    { name: 'Kalighat Metro', type: 'Metro', distance: '0.6 km' },
    { name: 'Rashbehari Avenue', type: 'Major Road', distance: '0.2 km' }
  ],
  population: 100000,
  area: 6.9,
  avgAge: 36,
  crimeRate: 'Medium'
},
{
  id: '10',
  name: 'Sector 62',
  city: 'Noida',
  description: 'A clean and modern tech and residential hub with corporate offices and good infrastructure.',
  avgRent: 32000,
  rating: 4.2,
  safetyScore: 8,
  connectivity: 8,
  greenSpaces: 7,
  schools: 9,
  nightlife: 5,
  tags: ['Tech Park', 'Modern', 'Clean', 'Corporate', 'Residential'],
  amenities: ['IT Parks', 'Malls', 'Schools', 'Hospitals', 'Gyms'],
  housingOptions: [
    { type: '1 BHK', avgRent: 26000, availability: 'High' },
    { type: '2 BHK', avgRent: 34000, availability: 'High' },
    { type: '3 BHK', avgRent: 50000, availability: 'Medium' },
    { type: 'Gated Society', avgRent: 60000, availability: 'Low' }
  ],
  nearbyTransport: [
    { name: 'Sector 62 Metro', type: 'Metro', distance: '0.5 km' },
    { name: 'Electronic City Bus Stop', type: 'Bus', distance: '0.3 km' },
    { name: 'NH-24', type: 'Highway', distance: '1 km' }
  ],
  population: 85000,
  area: 7.4,
  avgAge: 33,
  crimeRate: 'Low'
},
{
  id: '11',
  name: 'Kothrud',
  city: 'Pune',
  description: 'A well-developed residential area with great educational institutes and parks. Ideal for students and families.',
  avgRent: 29000,
  rating: 4.0,
  safetyScore: 7,
  connectivity: 7,
  greenSpaces: 8,
  schools: 9,
  nightlife: 6,
  tags: ['Educational', 'Residential', 'Green', 'Student Friendly', 'Safe'],
  amenities: ['Colleges', 'Parks', 'Shopping', 'Hospitals', 'Temples'],
  housingOptions: [
    { type: '1 BHK', avgRent: 21000, availability: 'High' },
    { type: '2 BHK', avgRent: 31000, availability: 'High' },
    { type: '3 BHK', avgRent: 45000, availability: 'Medium' },
    { type: 'PG', avgRent: 12000, availability: 'High' }
  ],
  nearbyTransport: [
    { name: 'Kothrud Depot', type: 'Bus', distance: '0.2 km' },
    { name: 'Vanaz Metro', type: 'Metro', distance: '1.1 km' },
    { name: 'Karve Road', type: 'Major Road', distance: '0.4 km' }
  ],
  population: 90000,
  area: 8.0,
  avgAge: 29,
  crimeRate: 'Low'
},
{
  id: '12',
  name: 'Gandhinagar Sector 21',
  city: 'Gujarat',
  description: 'An eco-friendly and peaceful area with government offices, tree-lined roads, and clean air.',
  avgRent: 23000,
  rating: 4.1,
  safetyScore: 9,
  connectivity: 6,
  greenSpaces: 9,
  schools: 8,
  nightlife: 3,
  tags: ['Eco-Friendly', 'Peaceful', 'Government Area', 'Greenery', 'Clean'],
  amenities: ['Government Buildings', 'Parks', 'Schools', 'Hospitals', 'Yoga Centers'],
  housingOptions: [
    { type: '2 BHK', avgRent: 24000, availability: 'Medium' },
    { type: '3 BHK', avgRent: 32000, availability: 'Medium' },
    { type: 'Independent House', avgRent: 40000, availability: 'Low' },
    { type: 'Staff Quarters', avgRent: 20000, availability: 'High' }
  ],
  nearbyTransport: [
    { name: 'Gandhinagar Railway Station', type: 'Railway', distance: '1.5 km' },
    { name: 'Sector 21 Bus Stop', type: 'Bus', distance: '0.4 km' },
    { name: 'NH-8C', type: 'Highway', distance: '2 km' }
  ],
  population: 65000,
  area: 10.0,
  avgAge: 40,
  crimeRate: 'Low'
},
{
  id: '13',
  name: 'Maa Residency',
  city: 'Srikakulam',
  description: 'A densely populated yet vibrant area with easy access to educational institutions and hospitals.',
  avgRent: 21000,
  rating: 3.9,
  safetyScore: 6,
  connectivity: 7,
  greenSpaces: 5,
  schools: 8,
  nightlife: 4,
  tags: ['Vibrant', 'Educational', 'Crowded', 'Affordable', 'Urban'],
  amenities: ['Schools', 'Hospitals', 'Markets', 'Temples', 'Public Parks'],
  housingOptions: [
    { type: '1 BHK', avgRent: 16000, availability: 'High' },
    { type: '2 BHK', avgRent: 22000, availability: 'High' },
    { type: '3 BHK', avgRent: 35000, availability: 'Medium' },
    { type: 'Rental Rooms', avgRent: 10000, availability: 'High' }
  ],
  nearbyTransport: [
    { name: 'Rajendra Nagar Terminal', type: 'Railway', distance: '0.8 km' },
    { name: 'Kankarbagh Main Road', type: 'Bus', distance: '0.3 km' },
    { name: 'Patna Junction', type: 'Railway', distance: '3 km' }
  ],
  population: 180000,
  area: 11.1,
  avgAge: 31,
  crimeRate: 'Medium'
},
{
  id: '14',
  name: 'Hazratganj',
  city: 'Lucknow',
  description: 'A historical and commercial center known for colonial architecture, vibrant bazaars, and cultural events.',
  avgRent: 26000,
  rating: 4.2,
  safetyScore: 7,
  connectivity: 8,
  greenSpaces: 7,
  schools: 8,
  nightlife: 6,
  tags: ['Heritage', 'Shopping', 'Cultural', 'Bazaars', 'Central'],
  amenities: ['Markets', 'Cafes', 'Schools', 'Hospitals', 'Museums'],
  housingOptions: [
    { type: '1 BHK', avgRent: 20000, availability: 'High' },
    { type: '2 BHK', avgRent: 27000, availability: 'Medium' },
    { type: '3 BHK', avgRent: 38000, availability: 'Low' },
    { type: 'Heritage House', avgRent: 50000, availability: 'Low' }
  ],
  nearbyTransport: [
    { name: 'Hazratganj Metro', type: 'Metro', distance: '0.2 km' },
    { name: 'Charbagh Railway Station', type: 'Railway', distance: '3.5 km' },
    { name: 'MG Road', type: 'Major Road', distance: '0.1 km' }
  ],
  population: 95000,
  area: 6.5,
  avgAge: 34,
  crimeRate: 'Medium'
},
{
  id: '15',
  name: 'Teynampet',
  city: 'Chennai',
  description: 'An upscale commercial and residential zone with excellent civic infrastructure, near Marina Beach.',
  avgRent: 37000,
  rating: 4.5,
  safetyScore: 9,
  connectivity: 9,
  greenSpaces: 7,
  schools: 9,
  nightlife: 7,
  tags: ['Upscale', 'Commercial', 'Beach Access', 'Modern', 'Corporate'],
  amenities: ['Metro', 'Corporate Offices', 'Schools', 'Hospitals', 'Shopping Malls'],
  housingOptions: [
    { type: '1 BHK', avgRent: 30000, availability: 'Medium' },
    { type: '2 BHK', avgRent: 40000, availability: 'Medium' },
    { type: '3 BHK', avgRent: 60000, availability: 'Low' },
    { type: 'Luxury Apartment', avgRent: 90000, availability: 'Low' }
  ],
  nearbyTransport: [
    { name: 'Teynampet Metro', type: 'Metro', distance: '0.4 km' },
    { name: 'Anna Salai Bus Stop', type: 'Bus', distance: '0.2 km' },
    { name: 'Marina Beach', type: 'Beach', distance: '2.5 km' }
  ],
  population: 110000,
  area: 9.0,
  avgAge: 30,
  crimeRate: 'Low'
}

];

export function getNeighborhoods(): Neighborhood[] {
  return neighborhoods;
}

export function getNeighborhoodById(id: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.id === id);
}