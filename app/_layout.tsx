import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { WalletProvider } from '@/context/WalletContext';
import { PaymentProvider } from '@/context/PaymentContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthGuard } from '@/components/AuthGuard';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <PaymentProvider>
            <NotificationProvider>
              <AuthGuard>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="login" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="payment-preview" />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </AuthGuard>
            </NotificationProvider>
          </PaymentProvider>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}