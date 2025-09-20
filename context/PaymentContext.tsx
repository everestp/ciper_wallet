import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';
import { WalletContext } from './WalletContext';
import { mockPaymentHistory } from '@/mock/paymentHistory';

export interface PaymentRequest {
  id: string;
  merchant: {
    name: string;
    category: string;
    verified: boolean;
  };
  amount: number;
  acceptedTokens: string[];
  fee: number;
  tolerance: number;
}

export interface Payment {
  id: string;
  merchantName: string;
  amount: number;
  token: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  fee: number;
}

interface PaymentContextType {
  currentPaymentRequest: PaymentRequest | null;
  paymentHistory: Payment[];
  setCurrentPaymentRequest: (request: PaymentRequest | null) => void;
  processPayment: (params: {
    paymentRequest: PaymentRequest;
    selectedToken: string;
    finalAmount: number;
    fee: number;
    needsConversion: boolean;
  }) => Promise<void>;
}

export const PaymentContext = createContext<PaymentContextType>({
  currentPaymentRequest: null,
  paymentHistory: [],
  setCurrentPaymentRequest: () => {},
  processPayment: async () => {},
});

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const { updateBalance } = useContext(WalletContext);
  const [currentPaymentRequest, setCurrentPaymentRequest] = useState<PaymentRequest | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>(mockPaymentHistory);

  const processPayment = useCallback(async (params: {
    paymentRequest: PaymentRequest;
    selectedToken: string;
    finalAmount: number;
    fee: number;
    needsConversion: boolean;
  }) => {
    const { paymentRequest, selectedToken, finalAmount, fee } = params;
    
    // Create new payment record
    const newPayment: Payment = {
      id: `payment_${Date.now()}`,
      merchantName: paymentRequest.merchant.name,
      amount: paymentRequest.amount,
      token: selectedToken,
      status: 'pending',
      timestamp: new Date().toISOString(),
      fee,
    };

    // Add to history immediately
    setPaymentHistory(prev => [newPayment, ...prev]);
    
    // Update wallet balance
    updateBalance(selectedToken, finalAmount * -1); // Deduct amount
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentHistory(prev =>
        prev.map(p =>
          p.id === newPayment.id
            ? { ...p, status: Math.random() > 0.1 ? 'confirmed' : 'failed' }
            : p
        )
      );
    }, 3000);

    // Clear current request
    setCurrentPaymentRequest(null);
  }, [updateBalance]);

  return (
    <PaymentContext.Provider value={{
      currentPaymentRequest,
      paymentHistory,
      setCurrentPaymentRequest,
      processPayment,
    }}>
      {children}
    </PaymentContext.Provider>
  );
};