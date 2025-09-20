import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
};