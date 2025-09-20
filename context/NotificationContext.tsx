import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { mockNotifications } from '@/mock/notifications';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'payment_request' | 'payment_confirmed' | 'payment_failed';
  timestamp: string;
  read: boolean;
  data?: any;
}

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  markAsRead: () => {},
  addNotification: () => {},
});

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      markAsRead,
      addNotification,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};