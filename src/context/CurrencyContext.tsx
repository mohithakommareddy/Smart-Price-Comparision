import  { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Currency } from '../types';
import { getExchangeRates } from '../services/api';

const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencies: Currency[];
  formatPrice: (price: number) => string;
  rates: {[key: string]: number};
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [rates, setRates] = useState<{[key: string]: number}>({
    'INR': 1,
    'USD': 0.012,
    'EUR': 0.011,
    'GBP': 0.0095
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const ratesData = await getExchangeRates();
        setRates(ratesData);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    
    fetchRates();
    
    // Try to load saved currency preference
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      try {
        const parsed = JSON.parse(savedCurrency);
        const found = currencies.find(c => c.code === parsed.code);
        if (found) setCurrency(found);
      } catch (e) {
        console.error('Failed to parse saved currency:', e);
      }
    }
  }, []);

  // Save currency preference when it changes
  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency));
  }, [currency]);

  const formatPrice = (price: number): string => {
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0
    };
    
    if (currency.code === 'USD' || currency.code === 'EUR' || currency.code === 'GBP') {
      options.maximumFractionDigits = 2;
    }
    
    return new Intl.NumberFormat('en-IN', options).format(price);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies, formatPrice, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
 