import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertCircle, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getPriceAlerts } from '../services/api';
import { useCurrency } from '../context/CurrencyContext';

const PriceAlerts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { formatPrice } = useCurrency();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login', { state: { from: '/alerts' } });
      return;
    }
    
    const fetchAlerts = async () => {
      setIsLoading(true);
      try {
        const data = await getPriceAlerts(user.id);
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching price alerts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlerts();
  }, [user, navigate]);
  
  const handleRemoveAlert = (alertId: string) => {
    // In a real app, you would call an API to remove the alert
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };
  
  return (
    <div className="container-custom py-8">
      <div className="flex items-center mb-6">
        <Bell className="h-6 w-6 text-primary mr-3" />
        <h1 className="text-2xl font-bold">Price Drop Alerts</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {alerts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <Bell className="h-12 w-12 text-gray-300" />
              </div>
              <h2 className="text-xl font-medium mb-2">No Price Alerts</h2>
              <p className="text-gray-600 mb-6">
                You don't have any price alerts set up yet. Set alerts for products
                you want to track, and we'll notify you when prices drop.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
                  <div className="col-span-1"></div>
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2">Target Price</div>
                  <div className="col-span-2">Current Price</div>
                  <div className="col-span-2">Actions</div>
                </div>
              </div>
              
              <div className="divide-y">
                {alerts.map(alert => (
                  <div key={alert.id} className="px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <img 
                          src={alert.image}
                          alt={alert.productTitle}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </div>
                      <div className="col-span-5">
                        <a 
                          href={`/product/${alert.productId}`}
                          className="font-medium hover:text-primary"
                        >
                          {alert.productTitle}
                        </a>
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">{formatPrice(alert.targetPrice)}</span>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <span className="font-medium">{formatPrice(alert.currentPrice)}</span>
                          
                          {alert.currentPrice <= alert.targetPrice ? (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Target met!
                            </span>
                          ) : (
                            <span className="ml-2 text-xs text-gray-500">
                              {Math.round((alert.currentPrice - alert.targetPrice) / alert.targetPrice * 100)}% away
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex space-x-3">
                          <a 
                            href={`/product/${alert.productId}`}
                            className="text-primary flex items-center"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          
                          <button 
                            onClick={() => handleRemoveAlert(alert.id)}
                            className="text-red-500 flex items-center"
                            title="Remove alert"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">How Price Alerts Work</h3>
                <p className="text-sm text-gray-700">
                  Price alerts notify you when the price of a product drops below your desired amount.
                  You'll receive an email notification as soon as we detect a price drop. Price tracking
                  works across Amazon, Flipkart, Croma, and other major retailers.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceAlerts;
 