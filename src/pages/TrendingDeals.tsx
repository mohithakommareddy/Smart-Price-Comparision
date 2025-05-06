import  { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { getTrendingProducts } from '../services/api';

const TrendingDeals = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getTrendingProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [activeTab]);
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Trending Deals</h1>
      
      <div className="mb-8">
        <div className="border-b">
          <div className="flex space-x-8 overflow-x-auto">
            <button 
              className={`py-3 font-medium border-b-2 whitespace-nowrap ${activeTab === 'today' ? 'border-primary text-primary' : 'border-transparent'}`}
              onClick={() => setActiveTab('today')}
            >
              Today's Deals
            </button>
            <button 
              className={`py-3 font-medium border-b-2 whitespace-nowrap ${activeTab === 'week' ? 'border-primary text-primary' : 'border-transparent'}`}
              onClick={() => setActiveTab('week')}
            >
              This Week
            </button>
            <button 
              className={`py-3 font-medium border-b-2 whitespace-nowrap ${activeTab === 'flash' ? 'border-primary text-primary' : 'border-transparent'}`}
              onClick={() => setActiveTab('flash')}
            >
              Flash Sales
            </button>
            <button 
              className={`py-3 font-medium border-b-2 whitespace-nowrap ${activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="loader"></div>
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
                discount={product.discount}
                isBestDeal={product.isBestDeal}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">Popular Deal Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <a href="/categories/smartphones" className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center">
            <span className="block font-medium">Smartphones</span>
            <span className="text-sm text-gray-500">183 deals</span>
          </a>
          <a href="/categories/laptops" className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center">
            <span className="block font-medium">Laptops</span>
            <span className="text-sm text-gray-500">97 deals</span>
          </a>
          <a href="/categories/headphones" className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center">
            <span className="block font-medium">Headphones</span>
            <span className="text-sm text-gray-500">74 deals</span>
          </a>
          <a href="/categories/tvs" className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center">
            <span className="block font-medium">TVs</span>
            <span className="text-sm text-gray-500">56 deals</span>
          </a>
          <a href="/categories/cameras" className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center">
            <span className="block font-medium">Cameras</span>
            <span className="text-sm text-gray-500">42 deals</span>
          </a>
          <a href="/categories/appliances" className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow text-center">
            <span className="block font-medium">Appliances</span>
            <span className="text-sm text-gray-500">109 deals</span>
          </a>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Recently Viewed Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="relative pt-[75%] mb-3">
              <img 
                src="https://images.unsplash.com/photo-1571867424488-4565932edb41?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDM4ODJ8MA&ixlib=rb-4.0.3" 
                alt="iPhone" 
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <h3 className="font-medium mb-1 line-clamp-2">iPhone 16 Pro Max 256GB</h3>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">₹129,999</span>
              </div>
              <span className="text-xs text-gray-500">Amazon</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="relative pt-[75%] mb-3">
              <img 
                src="https://images.unsplash.com/photo-1592826719120-5676cd23c1cb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDM4ODJ8MA&ixlib=rb-4.0.3" 
                alt="MacBook" 
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <h3 className="font-medium mb-1 line-clamp-2">MacBook Air M3 8GB 256GB</h3>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">₹89,990</span>
              </div>
              <span className="text-xs text-gray-500">Croma</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingDeals;
 