import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { Payment } from '@/context/PaymentContext';
import { Card } from './Card';
import { CircleCheck as CheckCircle, Clock, Circle as XCircle } from 'lucide-react-native';

interface PaymentHistoryItemProps {
  payment: Payment;
}

export const PaymentHistoryItem: React.FC<PaymentHistoryItemProps> = ({ payment }) => {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  const getStatusIcon = () => {
    switch (payment.status) {
      case 'confirmed':
        return <CheckCircle size={20} color={colors.success} />;
      case 'pending':
        return <Clock size={20} color={colors.warning} />;
      case 'failed':
        return <XCircle size={20} color={colors.error} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (payment.status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'failed':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.merchantInfo}>
          <Text style={styles.merchantName}>{payment.merchantName}</Text>
          <Text style={styles.timestamp}>{formatDate(payment.timestamp)}</Text>
        </View>
        <View style={styles.status}>
          {getStatusIcon()}
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.paymentDetails}>
        <View style={styles.amount}>
          <Text style={styles.amountText}>
            -{payment.amount.toFixed(4)} {payment.token}
          </Text>
          <Text style={styles.feeText}>
            Fee: {payment.fee.toFixed(4)} {payment.token}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  feeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});