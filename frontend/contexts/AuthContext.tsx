'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface RegisterPayload {
  fullName: string;
  email: string;
  mobileNumber?: string;
  password?: string;
  targetExam?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  loginAsDemo: (role: 'STUDENT' | 'ADMIN') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = '10q_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default guest/demo student
        const defaultStudent: User = {
          id: 101,
          fullName: 'Aarav Sharma',
          email: 'student@10qchallenge.in',
          mobileNumber: '+91 98765 43210',
          role: 'STUDENT',
          targetExam: 'BITSAT',
        };
        setUser(defaultStudent);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStudent));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    const isSpecialAdmin =
      email.toLowerCase().includes('admin') || email.toLowerCase().includes('harshal') || email.toLowerCase().includes('ritesh');
    const loggedUser: User = {
      id: isSpecialAdmin ? 1 : Date.now(),
      fullName: isSpecialAdmin ? 'Harshal Jain (Lead Admin)' : 'Aarav Sharma',
      email: email,
      mobileNumber: '+91 98765 43210',
      role: isSpecialAdmin ? 'ADMIN' : 'STUDENT',
      targetExam: 'BITSAT',
    };

    setUser(loggedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    return true;
  };

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    const newUser: User = {
      id: Date.now(),
      fullName: payload.fullName,
      email: payload.email,
      mobileNumber: payload.mobileNumber,
      role: 'STUDENT',
      targetExam: payload.targetExam || 'BITSAT',
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return true;
  };

  const loginAsDemo = async (role: 'STUDENT' | 'ADMIN'): Promise<boolean> => {
    if (role === 'ADMIN') {
      const adminUser: User = {
        id: 1,
        fullName: 'Harshal Jain (Lead Admin)',
        email: 'admin@10qchallenge.in',
        mobileNumber: '+91 98765 43210',
        role: 'ADMIN',
      };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
    } else {
      const studentUser: User = {
        id: 101,
        fullName: 'Aarav Sharma',
        email: 'student@10qchallenge.in',
        mobileNumber: '+91 98765 43210',
        role: 'STUDENT',
        targetExam: 'BITSAT',
      };
      setUser(studentUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentUser));
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        loginAsDemo,
        logout,
      }}
    >
      {isLoaded ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
