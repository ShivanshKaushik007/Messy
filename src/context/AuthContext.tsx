'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'student' | 'admin' | null;

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on mount
    const savedRole = localStorage.getItem('mockRole') as Role;
    if (savedRole) {
      setRoleState(savedRole);
    } else {
      // Default to student if no role is set
      setRoleState('student');
      localStorage.setItem('mockRole', 'student');
    }
    setIsLoading(false);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem('mockRole', newRole);
    } else {
      localStorage.removeItem('mockRole');
    }
  };

  return (
    <AuthContext.Provider value={{ role, setRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
