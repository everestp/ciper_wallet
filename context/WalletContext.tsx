import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { mockWalletBalances } from '@/mock/walletBalances';

export interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  icon: string;
}

interface WalletContextType {
  balances: Token[];
  showBalances: boolean;
  toggleShowBalances: () => void;
  updateBalance: (symbol: string, newBalance: number) => void;
  refreshBalances: () => void;
}

export const WalletContext = createContext<WalletContextType>({
  balances: [],
  showBalances: true,
  toggleShowBalances: () => {},
  updateBalance: () => {},
  refreshBalances: () => {},
});

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [balances, setBalances] = useState<Token[]>(mockWalletBalances);
  const [showBalances, setShowBalances] = useState(true);

  const toggleShowBalances = useCallback(() => {
    setShowBalances(prev => !prev);
  }, []);

  const updateBalance = useCallback((symbol: string, newBalance: number) => {
    setBalances(prev =>
      prev.map(token =>
        token.symbol === symbol
          ? { ...token, balance: newBalance }
          : token
      )
    );
  }, []);

  const refreshBalances = useCallback(() => {
    // Simulate fetching fresh balance data
    setBalances([...mockWalletBalances]);
  }, []);

  return (
    <WalletContext.Provider value={{
      balances,
      showBalances,
      toggleShowBalances,
      updateBalance,
      refreshBalances,
    }}>
      {children}
    </WalletContext.Provider>
  );
};