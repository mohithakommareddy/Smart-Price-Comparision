import  { Link } from 'react-router-dom';
import { Clock, Star, Tag, ThumbsUp, AlertTriangle, LineChart, Bell, Heart, Home } from 'lucide-react';

const ShoppingTips = () => {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Tips & Guides</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Link to="/shopping-tips/1" className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="h-48 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwaG9uZXMlMjBzbWFydHBob25lcyUyMGNvbXBhcmlzb24lMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDI5Mzl8MA&ixlib=rb-4.0.3" 
              alt="When to buy smartphones" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Nov 5, 2023</span>
              <span className="mx-2">•</span>
              <span>6 min read</span>
            </div>
            <h3 className="text-xl font-bold mb-2">When is the Best Time to Buy a New Smartphone?</h3>
            <p className="text-gray-600 mb-4">
              Learn the optimal times to purchase a new smartphone to get the best deals and avoid overpaying.
            </p>
            <div className="text-primary font-medium">Read more →</div>
          </div>
        </Link>
        
        <Link to="/shopping-tips/2" className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="h-48 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwaG9uZXMlMjBzbWFydHBob25lcyUyMGNvbXBhcmlzb24lMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDI5Mzl8MA&ixlib=rb-4.0.3" 
              alt="Price history tools" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Oct 22, 2023</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>
            <h3 className="text-xl font-bold mb-2">How to Use Price History Tools to Save Money</h3>
            <p className="text-gray-600 mb-4">
              Price history tools can help you understand if a deal is really good or just marketing hype.
            </p>
            <div className="text-primary font-medium">Read more →</div>
          </div>
        </Link>
        
        <Link to="/shopping-tips/3" className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="h-48 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516274626895-055a99214f08?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwaG9uZXMlMjBzbWFydHBob25lcyUyMGNvbXBhcmlzb24lMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDI5Mzl8MA&ixlib=rb-4.0.3" 
              alt="Fake reviews" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Sep 15, 2023</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>
            <h3 className="text-xl font-bold mb-2">How to Spot Fake Reviews and Ratings Online</h3>
            <p className="text-gray-600 mb-4">
              Learn to identify suspicious reviews and make informed decisions based on authentic feedback.
            </p>
            <div className="text-primary font-medium">Read more →</div>
          </div>
        </Link>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Smart Shopping Tactics</h2>
        
        <div className="bg-white rounded-lg shadow-sm divide-y">
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Always Check for Coupon Codes</h3>
                <p className="text-gray-600">
                  Before finalizing any purchase, take a moment to search for coupon codes. SmartPriceCompare automatically finds and applies the best coupons for you.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <LineChart className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Check Price History Before Buying</h3>
                <p className="text-gray-600">
                  A "sale" might not be a good deal if the item was cheaper last month. Always check price history to understand if you're getting a true discount.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Read Reviews Across Multiple Platforms</h3>
                <p className="text-gray-600">
                  Don't rely on reviews from a single platform. Check reviews from different sources to get a more accurate picture of product quality.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Beware of Too-Good-To-Be-True Deals</h3>
                <p className="text-gray-600">
                  If a deal seems incredibly low compared to market rates, be cautious. It might be a counterfeit product or have hidden catches.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Set Price Drop Alerts</h3>
                <p className="text-gray-600">
                  For items you're not in a rush to buy, set price drop alerts. You'll be notified when the price falls to your desired level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Buying Guides</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/shopping-tips/1" className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">How to Choose the Right Smartphone in 2023</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to selecting the perfect smartphone based on your needs and budget.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>Helpful for 94% of users</span>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/shopping-tips/2" className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Laptop Buying Guide: Finding the Perfect Match</h3>
                <p className="text-gray-600 mb-4">
                  Everything you need to know before purchasing a laptop for work, gaming, or everyday use.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>Helpful for 91% of users</span>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/shopping-tips/3" className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">TV Buying Guide: 4K, OLED, QLED Explained</h3>
                <p className="text-gray-600 mb-4">
                  Understand the different TV technologies and features to make an informed purchase decision.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>Helpful for 89% of users</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingTips;
 