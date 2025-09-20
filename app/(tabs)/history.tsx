import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/ThemeContext';
import { PaymentContext } from '@/context/PaymentContext';
import { PaymentHistoryItem } from '@/components/PaymentHistoryItem';

export default function HistoryScreen() {
  const { colors } = useContext(ThemeContext);
  const { paymentHistory } = useContext(PaymentContext);

  const styles = createStyles(colors);

  const sortedHistory = [...paymentHistory].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment History</Text>
        <Text style={styles.subtitle}>{paymentHistory.length} transactions</Text>
      </View>

      <FlatList
        data={sortedHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PaymentHistoryItem payment={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
  list: {
    padding: 20,
  },
});