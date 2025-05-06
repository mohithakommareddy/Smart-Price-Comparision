import  { useSearchParams } from 'react-router-dom';
import { Filter, RefreshCw, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { searchProducts } from '../services/api';
import { useCurrency } from '../context/CurrencyContext';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('price-asc');
  const [isLoading, setIsLoading] = useState(false);
  const { currency } = useCurrency();
  
  // Filters
  const [priceRanges, setPriceRanges] = useState({
    under50k: false,
    from50kTo100k: false,
    from100kTo150k: true,
    above150k: false
  });
  
  const [stores, setStores] = useState({
    amazon: true,
    flipkart: true,
    croma: true,
    relianceDigital: true,
    vijaySales: true
  });
  
  const [discounts, setDiscounts] = useState({
    above10: false,
    above15: true,
    above25: false
  });
  
  // Fetch products when query or currency changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      
      setIsLoading(true);
      try {
        const results = await searchProducts(query, currency.code);
        setProducts(results);
        setFilteredProducts(results);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [query, currency.code]);
  
  // Apply filters and sorting
  useEffect(() => {
    if (products.length === 0) return;
    
    let filtered = [...products];
    
    // Apply price filters
    if (priceRanges.under50k || priceRanges.from50kTo100k || priceRanges.from100kTo150k || priceRanges.above150k) {
      filtered = filtered.filter(product => {
        // Adjust price range based on currency
        const multiplier = currency.code === 'INR' ? 1 : (currency.code === 'USD' ? 80 : (currency.code === 'EUR' ? 90 : 100));
        
        if (priceRanges.under50k && product.price < 50000 / multiplier) return true;
        if (priceRanges.from50kTo100k && product.price >= 50000 / multiplier && product.price < 100000 / multiplier) return true;
        if (priceRanges.from100kTo150k && product.price >= 100000 / multiplier && product.price < 150000 / multiplier) return true;
        if (priceRanges.above150k && product.price >= 150000 / multiplier) return true;
        return false;
      });
    }
    
    // Apply store filters
    if (stores.amazon || stores.flipkart || stores.croma || stores.relianceDigital || stores.vijaySales) {
      filtered = filtered.filter(product => {
        const storeLower = product.store.toLowerCase();
        if (stores.amazon && storeLower === 'amazon') return true;
        if (stores.flipkart && storeLower === 'flipkart') return true;
        if (stores.croma && storeLower === 'croma') return true;
        if (stores.relianceDigital && storeLower === 'reliance digital') return true;
        if (stores.vijaySales && storeLower === 'vijay sales') return true;
        return false;
      });
    }
    
    // Apply discount filters
    if (discounts.above10 || discounts.above15 || discounts.above25) {
      filtered = filtered.filter(product => {
        if (!product.discount) return false;
        if (discounts.above25 && product.discount >= 25) return true;
        if (discounts.above15 && product.discount >= 15) return true;
        if (discounts.above10 && product.discount >= 10) return true;
        return false;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'discount-desc':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, priceRanges, stores, discounts, sortBy, currency.code]);
  
  const handlePriceRangeChange = (range: keyof typeof priceRanges) => {
    setPriceRanges(prev => ({
      ...prev,
      [range]: !prev[range]
    }));
  };
  
  const handleStoreChange = (store: keyof typeof stores) => {
    setStores(prev => ({
      ...prev,
      [store]: !prev[store]
    }));
  };
  
  const handleDiscountChange = (discount: keyof typeof discounts) => {
    setDiscounts(prev => ({
      ...prev,
      [discount]: !prev[discount]
    }));
  };
  
  const resetFilters = () => {
    setPriceRanges({
      under50k: false,
      from50kTo100k: false,
      from100kTo150k: true,
      above150k: false
    });
    
    setStores({
      amazon: true,
      flipkart: true,
      croma: true,
      relianceDigital: true,
      vijaySales: true
    });
    
    setDiscounts({
      above10: false,
      above15: true,
      above25: false
    });
    
    setSortBy('price-asc');
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
        <SearchBar />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters (sidebar) */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button 
                  className="text-primary text-sm flex items-center"
                  onClick={resetFilters}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Reset
                </button>
              </div>
              
              <div className="py-3 border-t">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="price-1" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={priceRanges.under50k}
                      onChange={() => handlePriceRangeChange('under50k')}
                    />
                    <label htmlFor="price-1" className="text-sm">Under {currency.symbol}50,000</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="price-2" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={priceRanges.from50kTo100k}
                      onChange={() => handlePriceRangeChange('from50kTo100k')}
                    />
                    <label htmlFor="price-2" className="text-sm">{currency.symbol}50,000 - {currency.symbol}1,00,000</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="price-3" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={priceRanges.from100kTo150k}
                      onChange={() => handlePriceRangeChange('from100kTo150k')}
                    />
                    <label htmlFor="price-3" className="text-sm">{currency.symbol}1,00,000 - {currency.symbol}1,50,000</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="price-4" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={priceRanges.above150k}
                      onChange={() => handlePriceRangeChange('above150k')}
                    />
                    <label htmlFor="price-4" className="text-sm">Above {currency.symbol}1,50,000</label>
                  </div>
                </div>
              </div>
              
              <div className="py-3 border-t">
                <h4 className="font-medium mb-2">Stores</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="store-1" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={stores.amazon}
                      onChange={() => handleStoreChange('amazon')}
                    />
                    <label htmlFor="store-1" className="text-sm">Amazon</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="store-2" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={stores.flipkart}
                      onChange={() => handleStoreChange('flipkart')}
                    />
                    <label htmlFor="store-2" className="text-sm">Flipkart</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="store-3" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={stores.croma}
                      onChange={() => handleStoreChange('croma')}
                    />
                    <label htmlFor="store-3" className="text-sm">Croma</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="store-4" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={stores.relianceDigital}
                      onChange={() => handleStoreChange('relianceDigital')}
                    />
                    <label htmlFor="store-4" className="text-sm">Reliance Digital</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="store-5" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={stores.vijaySales}
                      onChange={() => handleStoreChange('vijaySales')}
                    />
                    <label htmlFor="store-5" className="text-sm">Vijay Sales</label>
                  </div>
                </div>
              </div>
              
              <div className="py-3 border-t">
                <h4 className="font-medium mb-2">Discount</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="discount-1" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={discounts.above10}
                      onChange={() => handleDiscountChange('above10')}
                    />
                    <label htmlFor="discount-1" className="text-sm">10% or more</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="discount-2" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={discounts.above15}
                      onChange={() => handleDiscountChange('above15')}
                    />
                    <label htmlFor="discount-2" className="text-sm">15% or more</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="discount-3" 
                      className="w-4 h-4 rounded mr-2 text-primary focus:ring-primary"
                      checked={discounts.above25}
                      onChange={() => handleDiscountChange('above25')}
                    />
                    <label htmlFor="discount-3" className="text-sm">25% or more</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className="flex-grow">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Found <span className="font-medium text-gray-700">{filteredProducts.length}</span> results</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <label htmlFor="sortby" className="text-sm mr-2">Sort by:</label>
                  <select 
                    id="sortby" 
                    className="text-sm border rounded-md py-1 px-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="discount-desc">Discount</option>
                    <option value="rating-desc">Rating</option>
                  </select>
                </div>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or filters to find what you're looking for.
                </p>
                <button 
                  onClick={resetFilters}
                  className="text-primary font-medium flex items-center mx-auto"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
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
                    isBestDeal={product.isBestDeal}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
 