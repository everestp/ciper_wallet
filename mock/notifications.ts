import { Notification } from '@/context/NotificationContext';

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    title: 'Payment Request',
    message: 'Coffee Bean Café is requesting $12.50 payment',
    type: 'payment_request',
    timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    read: false,
  },
  {
    id: 'notif_2',
    title: 'Payment Confirmed',
    message: 'Your payment to Starbucks Downtown has been confirmed',
    type: 'payment_confirmed',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    read: true,
  },
  {
    id: 'notif_3',
    title: 'New Merchant Alert',
    message: 'TechStore Online has joined as a verified merchant',
    type: 'payment_request',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: false,
  },
];