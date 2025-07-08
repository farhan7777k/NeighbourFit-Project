import React, { useState } from 'react';
import { Save, User, Home, MapPin, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, updateUserPreferences } = useAuth();
  const [preferences, setPreferences] = useState(user?.preferences || {
    budgetRange: { min: 15000, max: 50000 },
    lifestyle: [],
    commute: '',
    amenities: [],
    housingType: [],
    safetyPriority: 5,
    nightlifePriority: 3,
    greenSpacePriority: 4,
    schoolsPriority: 3,
    transportPriority: 4
  });
  const [saved, setSaved] = useState(false);

  const lifestyleOptions = [
    'Active/Fitness', 'Nightlife', 'Quiet/Peaceful', 'Family-oriented',
    'Professional/Career-focused', 'Student-friendly', 'Pet-friendly',
    'Artistic/Creative', 'Tech-savvy', 'Foodie'
  ];

  const amenityOptions = [
    'Gym/Fitness Center', 'Swimming Pool', 'Parks/Green Spaces',
    'Shopping Centers', 'Restaurants', 'Public Transport',
    'Schools', 'Hospitals', 'Libraries', 'Entertainment Venues'
  ];

  const housingOptions = [
    'Apartment', 'Independent House', 'Villa', 'Studio',
    'Shared Accommodation', 'Gated Community'
  ];

  const commuteOptions = [
    'Walking/Cycling', 'Public Transport', 'Personal Vehicle',
    'Work from Home', 'Hybrid'
  ];

  const handleArrayChange = (field: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSliderChange = (field: string, value: number) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBudgetChange = (type: 'min' | 'max', value: number) => {
    setPreferences(prev => ({
      ...prev,
      budgetRange: {
        ...prev.budgetRange,
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    updateUserPreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Lifestyle Preferences</h1>
        <p className="text-gray-300">
          Tell us about your preferences to get personalized neighborhood recommendations
        </p>
      </div>

      {saved && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-3 rounded-lg">
          Your preferences have been saved successfully!
        </div>
      )}

      <div className="space-y-8">
        {/* Budget Range */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <Home className="h-6 w-6 text-indigo-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Budget Range</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Minimum Budget (₹/month)
              </label>
              <input
                type="number"
                value={preferences.budgetRange.min}
                onChange={(e) => handleBudgetChange('min', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="5000"
                step="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Maximum Budget (₹/month)
              </label>
              <input
                type="number"
                value={preferences.budgetRange.max}
                onChange={(e) => handleBudgetChange('max', Number(e.target.value))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="10000"
                step="1000"
              />
            </div>
          </div>
        </div>

        {/* Lifestyle Preferences */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-pink-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Lifestyle Preferences</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {lifestyleOptions.map(option => (
              <button
                key={option}
                onClick={() => handleArrayChange('lifestyle', option)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  preferences.lifestyle.includes(option)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Commute Preference */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <MapPin className="h-6 w-6 text-emerald-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Commute Preference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {commuteOptions.map(option => (
              <button
                key={option}
                onClick={() => setPreferences(prev => ({ ...prev, commute: option }))}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  preferences.commute === option
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Housing Type */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <Home className="h-6 w-6 text-purple-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Housing Type</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {housingOptions.map(option => (
              <button
                key={option}
                onClick={() => handleArrayChange('housingType', option)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  preferences.housingType.includes(option)
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-yellow-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Important Amenities</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {amenityOptions.map(option => (
              <button
                key={option}
                onClick={() => handleArrayChange('amenities', option)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  preferences.amenities.includes(option)
                    ? 'bg-yellow-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Sliders */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">Priority Levels</h2>
          <div className="space-y-6">
            {[
              { key: 'safetyPriority', label: 'Safety & Security', color: 'red' },
              { key: 'nightlifePriority', label: 'Nightlife & Entertainment', color: 'purple' },
              { key: 'greenSpacePriority', label: 'Green Spaces & Parks', color: 'green' },
              { key: 'schoolsPriority', label: 'Schools & Education', color: 'blue' },
              { key: 'transportPriority', label: 'Public Transportation', color: 'yellow' }
            ].map(({ key, label, color }) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-200">{label}</label>
                  <span className="text-sm text-white">{preferences[key as keyof typeof preferences]}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={preferences[key as keyof typeof preferences] as number}
                  onChange={(e) => handleSliderChange(key, Number(e.target.value))}
                  className={`w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-${color}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Preferences
        </button>
      </div>
    </div>
  );
}