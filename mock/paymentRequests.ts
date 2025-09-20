import { PaymentRequest } from '@/context/PaymentContext';

export const mockPaymentRequests: PaymentRequest[] = [
  {
    id: 'req_1',
    merchant: {
      name: 'Coffee Bean Café',
      category: 'Food & Beverage',
      verified: true,
    },
    amount: 12.50,
    acceptedTokens: ['USDC', 'USDT'],
    fee: 0.001,
    tolerance: 0.01,
  },
  {
    id: 'req_2',
    merchant: {
      name: 'TechStore Online',
      category: 'Electronics',
      verified: true,
    },
    amount: 299.99,
    acceptedTokens: ['USDT'],
    fee: 0.002,
    tolerance: 0.005,
  },
  {
    id: 'req_3',
    merchant: {
      name: 'Local Market',
      category: 'Grocery',
      verified: false,
    },
    amount: 45.80,
    acceptedTokens: ['USDC', 'SOL'],
    fee: 0.0015,
    tolerance: 0.02,
  },
];