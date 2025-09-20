import { Token } from '@/context/WalletContext';

export const mockWalletBalances: Token[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    balance: 15.4523,
    price: 98.45,
    icon: '◎',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 1250.00,
    price: 1.00,
    icon: '$',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    balance: 850.75,
    price: 1.00,
    icon: '₮',
  },
];