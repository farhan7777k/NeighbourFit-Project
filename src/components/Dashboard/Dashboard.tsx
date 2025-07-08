import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Users, ArrowRight, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getNeighborhoods } from '../../data/neighborhoods';
import { calculateMatchScore } from '../../utils/matching';
import { formatCurrency } from '../../utils/currency';

export default function Dashboard() {
  const { user } = useAuth();
  const neighborhoods = getNeighborhoods();
  
  const topMatches = user?.preferences 
    ? neighborhoods
        .map(neighborhood => ({
          ...neighborhood,
          matchScore: calculateMatchScore(user.preferences!, neighborhood)
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3)
    : [];

  const hasPreferences = user?.preferences;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-300">
          {hasPreferences 
            ? "Here are your personalized neighborhood recommendations"
            : "Complete your profile to get personalized neighborhood recommendations"
          }
        </p>
      </div>

      {!hasPreferences && (
        <div className="mb-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <Settings className="h-6 w-6 text-amber-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-300 mb-2">
                Complete Your Profile
              </h3>
              <p className="text-amber-200 mb-4">
                Tell us about your lifestyle preferences to get personalized neighborhood recommendations.
              </p>
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Complete Profile
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Neighborhoods</p>
              <p className="text-2xl font-bold text-white">{neighborhoods.length}</p>
            </div>
            <MapPin className="h-8 w-8 text-indigo-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Your Matches</p>
              <p className="text-2xl font-bold text-white">{hasPreferences ? topMatches.length : 0}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Avg. Match Score</p>
              <p className="text-2xl font-bold text-white">
                {hasPreferences && topMatches.length > 0 
                  ? Math.round(topMatches.reduce((sum, n) => sum + n.matchScore, 0) / topMatches.length)
                  : 0}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Profile Complete</p>
              <p className="text-2xl font-bold text-white">{hasPreferences ? '100' : '25'}%</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {hasPreferences && topMatches.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Top Matches for You</h2>
            <Link
              to="/neighborhoods"
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMatches.map((neighborhood) => (
              <div
                key={neighborhood.id}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-200 group"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-indigo-500 to-purple-600">
                  <div className="p-4 flex items-end">
                    <div className="text-white">
                      <div className="text-xs font-medium mb-1">Match Score</div>
                      <div className="text-2xl font-bold">{Math.round(neighborhood.matchScore)}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {neighborhood.name}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{neighborhood.rating}</span>
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
        </div>
      )}

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/profile"
            className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <Settings className="h-8 w-8 text-indigo-400 mr-3" />
            <div>
              <p className="font-medium text-white group-hover:text-indigo-300">Update Preferences</p>
              <p className="text-sm text-gray-400">Refine your lifestyle preferences</p>
            </div>
          </Link>
          
          <Link
            to="/neighborhoods"
            className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <MapPin className="h-8 w-8 text-emerald-400 mr-3" />
            <div>
              <p className="font-medium text-white group-hover:text-emerald-300">Explore Areas</p>
              <p className="text-sm text-gray-400">Browse all neighborhoods</p>
            </div>
          </Link>
          
          <div className="flex items-center p-4 bg-white/5 rounded-lg">
            <TrendingUp className="h-8 w-8 text-purple-400 mr-3" />
            <div>
              <p className="font-medium text-white">Get Insights</p>
              <p className="text-sm text-gray-400">View market trends (Coming Soon)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}