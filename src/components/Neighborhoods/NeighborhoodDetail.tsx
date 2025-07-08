import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Shield, Train, TreePine, GraduationCap, Moon, Home, IndianRupee } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getNeighborhoodById } from '../../data/neighborhoods';
import { calculateMatchScore } from '../../utils/matching';
import { formatCurrency } from '../../utils/currency';

export default function NeighborhoodDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const neighborhood = id ? getNeighborhoodById(id) : null;
  const matchScore = user?.preferences && neighborhood 
    ? calculateMatchScore(user.preferences, neighborhood)
    : 0;

  if (!neighborhood) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Neighborhood not found</h1>
          <Link to="/neighborhoods" className="text-indigo-400 hover:text-indigo-300">
            ← Back to neighborhoods
          </Link>
        </div>
      </div>
    );
  }

  const scoreCards = [
    { icon: Shield, label: 'Safety', value: neighborhood.safetyScore, color: 'text-red-400' },
    { icon: Train, label: 'Connectivity', value: neighborhood.connectivity, color: 'text-blue-400' },
    { icon: TreePine, label: 'Green Spaces', value: neighborhood.greenSpaces, color: 'text-green-400' },
    { icon: GraduationCap, label: 'Schools', value: neighborhood.schools, color: 'text-purple-400' },
    { icon: Moon, label: 'Nightlife', value: neighborhood.nightlife, color: 'text-pink-400' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          to="/neighborhoods" 
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to neighborhoods
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{neighborhood.name}</h1>
            <div className="flex items-center text-gray-300 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{neighborhood.city}</span>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl">{neighborhood.description}</p>
          </div>
          
          <div className="text-right">
            {user?.preferences && (
              <div className="bg-indigo-600 rounded-xl p-4 mb-4">
                <div className="text-white text-sm font-medium mb-1">Your Match</div>
                <div className="text-3xl font-bold text-white">{Math.round(matchScore)}%</div>
              </div>
            )}
            <div className="flex items-center justify-end text-yellow-400 mb-2">
              <Star className="h-5 w-5 fill-current mr-1" />
              <span className="text-lg font-semibold">{neighborhood.rating}</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(neighborhood.avgRent)}<span className="text-sm text-gray-400">/month</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {neighborhood.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Scores */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Neighborhood Scores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scoreCards.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center space-x-4">
                  <Icon className={`h-8 w-8 ${color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{label}</span>
                      <span className="text-white font-bold">{value}/10</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${color.replace('text-', 'bg-').replace('-400', '-500')}`}
                        style={{ width: `${value * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Amenities & Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {neighborhood.amenities.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-gray-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Housing Options */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Housing Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {neighborhood.housingOptions.map(option => (
                <div key={option.type} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{option.type}</h3>
                    <Home className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Average Rent</span>
                      <span className="text-white font-medium">{formatCurrency(option.avgRent)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Availability</span>
                      <span className={`font-medium ${
                        option.availability === 'High' ? 'text-green-400' :
                        option.availability === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {option.availability}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Facts</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Population</span>
                <span className="text-white font-medium">{neighborhood.population?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Area</span>
                <span className="text-white font-medium">{neighborhood.area} km²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average Age</span>
                <span className="text-white font-medium">{neighborhood.avgAge} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Crime Rate</span>
                <span className={`font-medium ${
                  neighborhood.crimeRate === 'Low' ? 'text-green-400' :
                  neighborhood.crimeRate === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {neighborhood.crimeRate}
                </span>
              </div>
            </div>
          </div>

          {/* Transportation */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Transportation</h3>
            <div className="space-y-3">
              {neighborhood.nearbyTransport.map((transport, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Train className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">{transport.name}</p>
                    <p className="text-gray-400 text-xs">{transport.distance} • {transport.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Interested in {neighborhood.name}?</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Get in touch with local real estate agents for more information and viewings.
            </p>
            <button className="w-full bg-white text-indigo-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Agents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}