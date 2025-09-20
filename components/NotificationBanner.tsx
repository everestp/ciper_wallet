import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { NotificationContext, Notification } from '@/context/NotificationContext';
import { Card } from './Card';
import { Bell, X } from 'lucide-react-native';

interface NotificationBannerProps {
  notifications: Notification[];
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ notifications }) => {
  const { colors } = useContext(ThemeContext);
  const { markAsRead } = useContext(NotificationContext);
  const styles = createStyles(colors);

  if (notifications.length === 0) return null;

  const latestNotification = notifications[0];

  return (
    <Card style={styles.banner}>
      <View style={styles.content}>
        <Bell size={20} color={colors.primary} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{latestNotification.title}</Text>
          <Text style={styles.message}>{latestNotification.message}</Text>
        </View>
        <Pressable
          onPress={() => markAsRead(latestNotification.id)}
          style={styles.closeButton}
        >
          <X size={16} color={colors.textSecondary} />
        </Pressable>
      </View>
      {notifications.length > 1 && (
        <Text style={styles.moreText}>
          +{notifications.length - 1} more notification{notifications.length > 2 ? 's' : ''}
        </Text>
      )}
    </Card>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  banner: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  closeButton: {
    padding: 4,
  },
  moreText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
});