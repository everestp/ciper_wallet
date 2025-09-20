import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/ThemeContext';
import { MerchantCard } from '@/components/MerchantCard';
import { verifiedMerchants } from '@/mock/verifiedMerchants';

export default function MerchantsScreen() {
  const { colors } = useContext(ThemeContext);
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verified Merchants</Text>
        <Text style={styles.subtitle}>
          {verifiedMerchants.length} trusted merchants
        </Text>
      </View>

      <FlatList
        data={verifiedMerchants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MerchantCard merchant={item} />}
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