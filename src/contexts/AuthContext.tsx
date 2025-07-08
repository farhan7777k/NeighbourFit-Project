import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
}

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

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUserPreferences: (preferences: UserPreferences) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userSession = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        preferences: existingUser.preferences
      };
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      preferences: null
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userSession = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      preferences: newUser.preferences
    };
    setUser(userSession);
    localStorage.setItem('user', JSON.stringify(userSession));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserPreferences = (preferences: UserPreferences) => {
    if (user) {
      const updatedUser = { ...user, preferences };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].preferences = preferences;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserPreferences }}>
      {children}
    </AuthContext.Provider>
  );
}