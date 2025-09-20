import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/ThemeContext';
import { AuthContext } from '@/context/AuthContext';
import { WalletContext } from '@/context/WalletContext';
import { NotificationContext } from '@/context/NotificationContext';
import { TokenCard } from '@/components/TokenCard';
import { NotificationBanner } from '@/components/NotificationBanner';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { Button } from '@/components/Button';
import { Eye, EyeOff, Bell } from 'lucide-react-native';

export default function WalletScreen() {
  const { theme, colors } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { balances, showBalances, toggleShowBalances, refreshBalances } = useContext(WalletContext);
  const { notifications } = useContext(NotificationContext);

  useEffect(() => {
    refreshBalances();
  }, []);

  const styles = createStyles(colors);
  const activeNotifications = notifications.filter(n => !n.read);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <View style={styles.headerActions}>
          <DarkModeToggle />
          <Pressable style={styles.notificationButton}>
            <Bell size={24} color={colors.text} />
            {activeNotifications.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{activeNotifications.length}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeNotifications.length > 0 && (
          <NotificationBanner notifications={activeNotifications} />
        )}

        <View style={styles.walletSection}>
          <View style={styles.balanceHeader}>
            <Text style={styles.sectionTitle}>Your Wallet</Text>
            <Pressable onPress={toggleShowBalances} style={styles.toggleButton}>
              {showBalances ? (
                <Eye size={20} color={colors.textSecondary} />
              ) : (
                <EyeOff size={20} color={colors.textSecondary} />
              )}
            </Pressable>
          </View>

          <View style={styles.tokenList}>
            {balances.map((token) => (
              <TokenCard
                key={token.symbol}
                token={token}
                showBalance={showBalances}
              />
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Logout"
            onPress={logout}
            variant="secondary"
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  walletSection: {
    padding: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  toggleButton: {
    padding: 8,
  },
  tokenList: {
    gap: 12,
  },
  actions: {
    padding: 20,
    paddingTop: 0,
  },
});