import { Payment } from '@/context/PaymentContext';

export const mockPaymentHistory: Payment[] = [
  {
    id: 'payment_1',
    merchantName: 'Starbucks Downtown',
    amount: 5.75,
    token: 'USDC',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    fee: 0.001,
  },
  {
    id: 'payment_2',
    merchantName: 'Amazon',
    amount: 89.99,
    token: 'USDT',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    fee: 0.002,
  },
  {
    id: 'payment_3',
    merchantName: 'Gas Station',
    amount: 32.50,
    token: 'SOL',
    status: 'pending',
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    fee: 0.0008,
  },
  {
    id: 'payment_4',
    merchantName: 'Pizza Hut',
    amount: 24.99,
    token: 'USDC',
    status: 'failed',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    fee: 0.001,
  },
];