import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/ThemeContext';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Wallet } from 'lucide-react-native';

export default function LoginScreen() {
  const { colors } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('demo@ciper.xyz');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);

  const styles = createStyles(colors);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <DarkModeToggle />
        </View>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Wallet size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.logoText}>Ciper.xyz</Text>
            <Text style={styles.logoSubtext}>Your Crypto Wallet</Text>
          </View>

          <Card style={styles.loginCard}>
            <Text style={styles.loginTitle}>Welcome Back</Text>
            <Text style={styles.loginSubtitle}>Sign in to your wallet</Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSecondary}
                  secureTextEntry
                />
              </View>

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                style={styles.loginButton}
              />
            </View>

            <View style={styles.demoInfo}>
              <Text style={styles.demoText}>Demo Credentials:</Text>
              <Text style={styles.demoCredentials}>demo@ciper.xyz / demo123</Text>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  logoSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  loginCard: {
    padding: 32,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.inputBackground,
  },
  loginButton: {
    marginTop: 12,
  },
  demoInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    alignItems: 'center',
  },
  demoText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
  },
  demoCredentials: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});