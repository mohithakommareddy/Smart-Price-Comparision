import  { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 border rounded-md flex items-center space-x-1 hover:bg-gray-50"
      >
        <span className="text-sm">{currency.symbol} {currency.code}</span>
        <svg 
          className="w-4 h-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
          {currencies.map(curr => (
            <button
              key={curr.code}
              className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${
                curr.code === currency.code ? 'bg-gray-50 font-medium' : ''
              }`}
              onClick={() => {
                setCurrency(curr);
                setIsOpen(false);
              }}
            >
              <span className="inline-block w-8">{curr.symbol}</span>
              <span>{curr.code}</span>
              <span className="text-gray-500 ml-2 text-xs">{curr.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
 