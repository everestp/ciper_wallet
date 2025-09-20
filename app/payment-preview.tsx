import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ThemeContext } from '@/context/ThemeContext';
import { PaymentContext } from '@/context/PaymentContext';
import { WalletContext } from '@/context/WalletContext';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { TokenSelector } from '@/components/TokenSelector';
import { CircleCheck as CheckCircle, X, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function PaymentPreviewScreen() {
  const { colors } = useContext(ThemeContext);
  const { currentPaymentRequest, processPayment } = useContext(PaymentContext);
  const { balances } = useContext(WalletContext);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (balances && balances.length > 0 && !selectedToken) {
      setSelectedToken(balances[0]);
    }
  }, [balances, selectedToken]);

  const styles = createStyles(colors);

  if (!currentPaymentRequest) {
    router.back();
    return null;
  }

  if (!selectedToken) {
    return null;
  }

  const { merchant, amount, acceptedTokens, fee, tolerance } = currentPaymentRequest;

  // Calculate conversion if paying with different token
  const needsConversion = !acceptedTokens.includes(selectedToken.symbol);
  const conversionRate = needsConversion ? 1.02 : 1; // Mock 2% conversion fee
  const finalAmount = amount * conversionRate;
  const totalFee = fee + (needsConversion ? amount * 0.02 : 0);

  const handleConfirmPayment = async () => {
    if (selectedToken.balance < finalAmount) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough tokens to complete this payment.');
      return;
    }

    setIsProcessing(true);
    
    try {
      await processPayment({
        paymentRequest: currentPaymentRequest,
        selectedToken: selectedToken.symbol,
        finalAmount,
        fee: totalFee,
        needsConversion,
      });
      
      Alert.alert(
        'Payment Initiated',
        'Your payment has been submitted and is being processed.',
        [{ text: 'OK', onPress: () => router.push('/(tabs)/history') }]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Preview</Text>
        <Button
          title=""
          onPress={handleCancel}
          variant="ghost"
          icon={<X size={24} color={colors.text} />}
        />
      </View>

      <View style={styles.content}>
        <Card style={styles.merchantCard}>
          <View style={styles.merchantHeader}>
            <View style={styles.merchantInfo}>
              <Text style={styles.merchantName}>{merchant.name}</Text>
              {merchant.verified && (
                <View style={styles.verifiedBadge}>
                  <CheckCircle size={16} color={colors.success} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.merchantCategory}>{merchant.category}</Text>
        </Card>

        <Card style={styles.paymentCard}>
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Amount to Pay</Text>
            <Text style={styles.amount}>{amount.toFixed(2)} {acceptedTokens[0]}</Text>
          </View>

          <View style={styles.tokenSection}>
            <Text style={styles.sectionTitle}>Pay with</Text>
            <TokenSelector
              tokens={balances}
              selectedToken={selectedToken}
              onTokenChange={setSelectedToken}
            />
          </View>

          {needsConversion && (
            <View style={styles.conversionWarning}>
              <AlertTriangle size={16} color={colors.warning} />
              <Text style={styles.conversionText}>
                Token conversion required (+{(conversionRate - 1) * 100}% fee)
              </Text>
            </View>
          )}

          <View style={styles.feesSection}>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Network Fee</Text>
              <Text style={styles.feeValue}>{fee.toFixed(4)} {selectedToken.symbol}</Text>
            </View>
            {needsConversion && (
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Conversion Fee</Text>
                <Text style={styles.feeValue}>
                  {(amount * 0.02).toFixed(4)} {selectedToken.symbol}
                </Text>
              </View>
            )}
            <View style={[styles.feeRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {finalAmount.toFixed(4)} {selectedToken.symbol}
              </Text>
            </View>
          </View>

          {tolerance > 0 && (
            <View style={styles.toleranceInfo}>
              <Text style={styles.toleranceText}>
                Price tolerance: ±{(tolerance * 100).toFixed(1)}%
              </Text>
            </View>
          )}
        </Card>
      </View>

      <View style={styles.actions}>
        <Button
          title="Cancel"
          onPress={handleCancel}
          variant="secondary"
          style={styles.cancelButton}
        />
        <Button
          title="Confirm Payment"
          onPress={handleConfirmPayment}
          loading={isProcessing}
          style={styles.confirmButton}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  merchantCard: {
    padding: 20,
    marginBottom: 16,
  },
  merchantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  merchantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.success,
  },
  merchantCategory: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  paymentCard: {
    padding: 20,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  amountLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  tokenSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  conversionWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.warningLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  conversionText: {
    fontSize: 12,
    color: colors.warning,
    flex: 1,
  },
  feesSection: {
    gap: 8,
    marginBottom: 16,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  feeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  totalRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  toleranceInfo: {
    alignItems: 'center',
  },
  toleranceText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 2,
  },
});