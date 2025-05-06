import  { Link } from 'react-router-dom';
import { ShoppingBag, Tag, Clock, Bell, CreditCard, Globe, Heart, LineChart, Star, Smartphone, Home, Smile, Gift, MoreHorizontal, TrendingDown } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FeatureCard from '../components/FeatureCard';
import { useEffect, useState } from 'react';
import { Product } from '../types';
import { getTrendingProducts, getPriceDrops } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useCurrency } from '../context/CurrencyContext';

const HomePage = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [priceDrops, setPriceDrops] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropsLoading, setIsDropsLoading] = useState(false);
  const { currency } = useCurrency();
  
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getTrendingProducts(currency.code);
        setTrendingProducts(products);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchPriceDrops = async () => {
      setIsDropsLoading(true);
      try {
        const products = await getPriceDrops();
        setPriceDrops(products);
      } catch (error) {
        console.error('Error fetching price drops:', error);
      } finally {
        setIsDropsLoading(false);
      }
    };
    
    fetchTrendingProducts();
    fetchPriceDrops();
  }, [currency.code]);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="container-custom py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-full lg:w-3/4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Find the Best Deals Online
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Compare prices across multiple Indian stores and save money
                with our smart price comparison tool.
              </p>
              <div className="mb-8 flex justify-center">
                <SearchBar inHero={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Smart Shopping Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers powerful tools to help you make better shopping decisions
              and save money on every purchase.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Coupon & Discount Finder"
              description="Automatically searches and applies valid discount coupons to maximize your savings."
              icon={Tag}
            />
            <FeatureCard
              title="Price Drop Alerts"
              description="Get email alerts when a product's price falls below your desired amount."
              icon={Bell}
            />
            <FeatureCard
              title="User Reviews Aggregation"
              description="View ratings and reviews from multiple stores for better decision-making."
              icon={Star}
            />
            <FeatureCard
              title="Smart Deal Alerts"
              description="Get notified when a product hits its lowest price in the last 6 months."
              icon={Clock}
            />
            <FeatureCard
              title="Wishlist with Price Tracker"
              description="Save products and track their prices over time to buy at the best moment."
              icon={Heart}
            />
            <FeatureCard
              title="Competitor Price Comparison"
              description="See price differences across platforms with highlights on the best deals."
              icon={ShoppingBag}
            />
            <FeatureCard
              title="Price History Charts"
              description="View historical price trends to determine if now is the right time to buy."
              icon={LineChart}
            />
            <FeatureCard
              title="Currency Converter"
              description="Auto-converts prices to your preferred currency for international users."
              icon={Globe}
            />
            <FeatureCard
              title="Secure Checkout Options"
              description="Shop with confidence using our secure payment integration with leading platforms."
              icon={CreditCard}
            />
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our most popular shopping categories to find amazing deals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link to="/categories/smartphones" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium">Electronics</span>
            </Link>
            
            <Link to="/categories/fashion" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag className="h-6 w-6 text-pink-600" />
              </div>
              <span className="font-medium">Fashion</span>
            </Link>
            
            <Link to="/categories/home" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Home className="h-6 w-6 text-amber-600" />
              </div>
              <span className="font-medium">Home</span>
            </Link>
            
            <Link to="/categories/beauty" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Smile className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-medium">Beauty</span>
            </Link>
            
            <Link to="/categories/kids" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium">Kids</span>
            </Link>
            
            <Link to="/categories" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <MoreHorizontal className="h-6 w-6 text-gray-600" />
              </div>
              <span className="font-medium">More</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Price Drops Section */}
      <section className="py-16 bg-rose-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <TrendingDown className="h-6 w-6 mr-2 text-rose-600" />
                Biggest Price Drops
              </h2>
              <p className="text-gray-600">Products that have dropped significantly in price recently</p>
            </div>
            <Link to="/price-drops" className="text-rose-600 hover:text-rose-700 font-medium">
              View All
            </Link>
          </div>
          
          {isDropsLoading ? (
            <div className="flex justify-center py-12">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {priceDrops.slice(0, 4).map(product => (
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
          )}
        </div>
      </section>
      
      {/* Today's Hot Deals */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Today's Hot Deals</h2>
            <Link to="/trending" className="text-primary hover:text-primary-dark font-medium">
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.slice(0, 4).map(product => (
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
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money every day with SmartPriceCompare.
          </p>
          <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-md font-bold">
            Sign Up - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
 