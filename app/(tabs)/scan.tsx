import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemeContext } from '@/context/ThemeContext';
import { PaymentContext } from '@/context/PaymentContext';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { QrCode, Link } from 'lucide-react-native';
import { mockPaymentRequests } from '@/mock/paymentRequests';

export default function ScanScreen() {
  const { colors } = useContext(ThemeContext);
  const { setCurrentPaymentRequest } = useContext(PaymentContext);
  const [paymentLink, setPaymentLink] = useState('');

  const styles = createStyles(colors);

  const handleQRScan = () => {
    // Mock QR scan - simulate scanning a merchant QR code
    const mockRequest = mockPaymentRequests[0];
    setCurrentPaymentRequest(mockRequest);
    router.push('/payment-preview');
  };

  const handlePaymentLink = () => {
    if (!paymentLink.trim()) {
      Alert.alert('Error', 'Please enter a payment link');
      return;
    }

    // Mock processing payment link
    const mockRequest = mockPaymentRequests[1];
    setCurrentPaymentRequest(mockRequest);
    router.push('/payment-preview');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay Merchant</Text>
        <Text style={styles.subtitle}>Scan QR code or enter payment link</Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.qrSection}>
          <View style={styles.qrIconContainer}>
            <QrCode size={48} color={colors.primary} />
          </View>
          <Text style={styles.qrTitle}>Scan QR Code</Text>
          <Text style={styles.qrDescription}>
            Point your camera at the merchant's QR code to initiate payment
          </Text>
          <Button
            title="Open Camera"
            onPress={handleQRScan}
            icon={<QrCode size={20} color="#FFFFFF" />}
          />
        </Card>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Card style={styles.linkSection}>
          <View style={styles.linkIconContainer}>
            <Link size={24} color={colors.primary} />
          </View>
          <Text style={styles.linkTitle}>Enter Payment Link</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="https://ciper.xyz/pay/..."
              placeholderTextColor={colors.textSecondary}
              value={paymentLink}
              onChangeText={setPaymentLink}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          
          <Button
            title="Process Link"
            onPress={handlePaymentLink}
            variant="secondary"
            icon={<Link size={20} color={colors.primary} />}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  qrSection: {
    alignItems: 'center',
    padding: 32,
  },
  qrIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primaryLight,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  qrDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginHorizontal: 16,
    fontWeight: '500',
  },
  linkSection: {
    padding: 24,
  },
  linkIconContainer: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  linkTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
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
});