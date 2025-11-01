
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContextType {
  isProcessing: boolean;
  error: string | null;
  processPayment: (amount: number) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (amount: number): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);

    // Mock payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Always succeed
        setIsProcessing(false);
        resolve(true);
      }, 1500); // Reduced delay
    });
  };

  return (
    <PaymentContext.Provider
      value={{
        isProcessing,
        error,
        processPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
