import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getNeighborhoods } from '../../data/neighborhoods';
import { calculateMatchScore } from '../../utils/matching';
import { formatCurrency } from '../../utils/currency';

export default function Neighborhoods() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [budgetFilter, setBudgetFilter] = useState('all');
  
  const neighborhoods = getNeighborhoods();

  const filteredAndSortedNeighborhoods = useMemo(() => {
    let filtered = neighborhoods.filter(neighborhood =>
      neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      neighborhood.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Budget filter
    if (budgetFilter !== 'all') {
      const [min, max] = budgetFilter.split('-').map(Number);
      filtered = filtered.filter(n => n.avgRent >= min && (max ? n.avgRent <= max : true));
    }

    // Add match scores if user has preferences
    const withScores = filtered.map(neighborhood => ({
      ...neighborhood,
      matchScore: user?.preferences 
        ? calculateMatchScore(user.preferences, neighborhood)
        : 0
    }));

    // Sort
    return withScores.sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'price-low':
          return a.avgRent - b.avgRent;
        case 'price-high':
          return b.avgRent - a.avgRent;
        case 'rating':
          return b.rating - a.rating;
        case 'safety':
          return b.safetyScore - a.safetyScore;
        default:
          return 0;
      }
    });
  }, [neighborhoods, searchTerm, sortBy, budgetFilter, user?.preferences]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Neighborhoods</h1>
        <p className="text-gray-300">
          Discover the perfect neighborhood that matches your lifestyle
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search neighborhoods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="match">Best Match</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="safety">Safest</option>
            </select>

            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Budgets</option>
              <option value="0-20000">Under ₹20,000</option>
              <option value="20000-40000">₹20,000 - ₹40,000</option>
              <option value="40000-60000">₹40,000 - ₹60,000</option>
              <option value="60000-0">Above ₹60,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedNeighborhoods.map((neighborhood) => (
          <div
            key={neighborhood.id}
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-200 group"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
              <div className="p-4 flex items-end justify-between">
                {user?.preferences && (
                  <div className="text-white">
                    <div className="text-xs font-medium mb-1">Match Score</div>
                    <div className="text-2xl font-bold">{Math.round(neighborhood.matchScore)}%</div>
                  </div>
                )}
                <div className="flex items-center text-white bg-black/20 px-2 py-1 rounded-lg">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  <span className="text-sm">{neighborhood.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {neighborhood.name}
                </h3>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-xs">{neighborhood.city}</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {neighborhood.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avg. Rent</span>
                  <span className="text-white font-medium">
                    {formatCurrency(neighborhood.avgRent)}/month
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Safety Score</span>
                  <span className="text-white font-medium">{neighborhood.safetyScore}/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Connectivity</span>
                  <span className="text-white font-medium">{neighborhood.connectivity}/10</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {neighborhood.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {neighborhood.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                    +{neighborhood.tags.length - 3} more
                  </span>
                )}
              </div>

              <Link
                to={`/neighborhoods/${neighborhood.id}`}
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedNeighborhoods.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No neighborhoods found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}