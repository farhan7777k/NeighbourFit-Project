import { Neighborhood } from '../data/neighborhoods';

interface UserPreferences {
  budgetRange: { min: number; max: number };
  lifestyle: string[];
  commute: string;
  amenities: string[];
  housingType: string[];
  safetyPriority: number;
  nightlifePriority: number;
  greenSpacePriority: number;
  schoolsPriority: number;
  transportPriority: number;
}

export function calculateMatchScore(preferences: UserPreferences, neighborhood: Neighborhood): number {
  let score = 0;
  let totalWeight = 0;

  // Budget compatibility (25% weight)
  const budgetWeight = 25;
  const budgetMatch = calculateBudgetMatch(preferences.budgetRange, neighborhood.avgRent);
  score += budgetMatch * budgetWeight;
  totalWeight += budgetWeight;

  // Lifestyle preferences (20% weight)
  const lifestyleWeight = 20;
  const lifestyleMatch = calculateLifestyleMatch(preferences.lifestyle, neighborhood.tags);
  score += lifestyleMatch * lifestyleWeight;
  totalWeight += lifestyleWeight;

  // Amenities match (15% weight)
  const amenitiesWeight = 15;
  const amenitiesMatch = calculateAmenitiesMatch(preferences.amenities, neighborhood.amenities);
  score += amenitiesMatch * amenitiesWeight;
  totalWeight += amenitiesWeight;

  // Priority-based scoring (40% total weight)
  const priorityScores = [
    { score: neighborhood.safetyScore, priority: preferences.safetyPriority, weight: 10 },
    { score: neighborhood.nightlife, priority: preferences.nightlifePriority, weight: 8 },
    { score: neighborhood.greenSpaces, priority: preferences.greenSpacePriority, weight: 8 },
    { score: neighborhood.schools, priority: preferences.schoolsPriority, weight: 7 },
    { score: neighborhood.connectivity, priority: preferences.transportPriority, weight: 7 }
  ];

  priorityScores.forEach(({ score: itemScore, priority, weight }) => {
    const priorityMatch = calculatePriorityMatch(itemScore, priority);
    score += priorityMatch * weight;
    totalWeight += weight;
  });

  return Math.min(100, Math.max(0, (score / totalWeight) * 100));
}

function calculateBudgetMatch(budgetRange: { min: number; max: number }, avgRent: number): number {
  if (avgRent >= budgetRange.min && avgRent <= budgetRange.max) {
    return 1; // Perfect match
  }
  
  // Calculate how far outside the budget it is
  const deviation = avgRent < budgetRange.min 
    ? (budgetRange.min - avgRent) / budgetRange.min
    : (avgRent - budgetRange.max) / budgetRange.max;
  
  // Return a score between 0 and 1 based on deviation
  return Math.max(0, 1 - deviation);
}

function calculateLifestyleMatch(userLifestyle: string[], neighborhoodTags: string[]): number {
  if (userLifestyle.length === 0) return 0.5; // Neutral if no preferences
  
  const matches = userLifestyle.filter(lifestyle => 
    neighborhoodTags.some(tag => 
      tag.toLowerCase().includes(lifestyle.toLowerCase()) ||
      lifestyle.toLowerCase().includes(tag.toLowerCase())
    )
  );
  
  return matches.length / userLifestyle.length;
}

function calculateAmenitiesMatch(userAmenities: string[], neighborhoodAmenities: string[]): number {
  if (userAmenities.length === 0) return 0.5; // Neutral if no preferences
  
  const matches = userAmenities.filter(amenity =>
    neighborhoodAmenities.some(nAmenity =>
      nAmenity.toLowerCase().includes(amenity.toLowerCase()) ||
      amenity.toLowerCase().includes(nAmenity.toLowerCase())
    )
  );
  
  return matches.length / userAmenities.length;
}

function calculatePriorityMatch(itemScore: number, userPriority: number): number {
  // Normalize scores to 0-1 range
  const normalizedItemScore = itemScore / 10;
  const normalizedPriority = userPriority / 10;
  
  // If user priority is high, item score should be high
  // If user priority is low, item score can be anything (less weight)
  if (normalizedPriority > 0.7) {
    return normalizedItemScore;
  } else if (normalizedPriority > 0.4) {
    return 0.5 + (normalizedItemScore * 0.5);
  } else {
    return 0.7; // Less importance, give neutral-good score
  }
}