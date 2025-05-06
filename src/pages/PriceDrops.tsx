import  { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { getPriceDrops } from '../services/api';
import { TrendingDown } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const PriceDrops = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currency } = useCurrency();
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getPriceDrops();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching price drops:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [currency.code]);
  
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-2">
          <TrendingDown className="h-8 w-8 mr-2 text-rose-600" />
          Biggest Price Drops
        </h1>
        <p className="text-gray-600">Products that have recently dropped significantly in price. Get them while they're at their lowest!</p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <TrendingDown className="h-12 w-12 text-gray-300" />
              </div>
              <h2 className="text-xl font-medium mb-2">No Price Drops Available</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any significant price drops at the moment. Check back later for new deals!
              </p>
            </div>
          ) : (
            <div className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    store={product.store}
                    storeUrl={product.storeUrl}
                    discount={product.discount}
                    priceDrop={product.priceDrop}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="bg-rose-50 rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">How Price Drops Work</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Our system continuously tracks the prices of products across major online retailers in India. When we detect a significant price drop, we feature the product here to help you find the best deals.
          </p>
          <p>
            A significant price drop is defined as a reduction of at least 10% from the average price over the past month. The bigger the drop, the higher it appears in our listings.
          </p>
          <p>
            For the most accurate and up-to-date information, we recommend setting up price alerts for specific products you're interested in. This way, you'll be notified immediately when a price drops to your target level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceDrops;
 