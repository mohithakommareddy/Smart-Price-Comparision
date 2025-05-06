import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Heart, Share, ShoppingCart, Star, Award, AlertCircle, ArrowRight, Bell } from 'lucide-react';
import { Product } from '../types';
import { getProductById, setPriceAlert } from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import PriceHistoryChart from '../components/PriceHistoryChart';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('description');
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priceAlertValue, setPriceAlertValue] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { currency, formatPrice } = useCurrency();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getProductById(id, currency.code);
        if (data) {
          setProduct(data);
          // Initialize price alert value to 10% below current price
          if (data.price) {
            const suggestedAlertPrice = Math.floor(data.price * 0.9);
            setPriceAlertValue(suggestedAlertPrice.toString());
          }
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, currency.code]);

  if (isLoading) {
    return (
      <div className="container-custom py-20 flex justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Generate mock stores with relative prices
  const stores = [
    { 
      name: product.store, 
      price: product.price, 
      originalPrice: product.originalPrice || product.price * 1.2, 
      discount: product.discount || 0, 
      delivery: 'Free delivery by Tomorrow',
      url: product.storeUrl
    },
    { 
      name: product.store === 'Amazon' ? 'Flipkart' : 'Amazon', 
      price: product.price * 1.02, 
      originalPrice: product.originalPrice ? product.originalPrice * 1.01 : product.price * 1.22, 
      discount: (product.discount || 0) - 2, 
      delivery: 'Free delivery by Nov 10',
      url: `https://www.${product.store === 'Amazon' ? 'flipkart' : 'amazon'}.in/product-details`
    },
    { 
      name: 'Croma', 
      price: product.price * 1.04, 
      originalPrice: product.originalPrice ? product.originalPrice * 1.02 : product.price * 1.24, 
      discount: (product.discount || 0) - 4, 
      delivery: 'Free delivery by Nov 12',
      url: 'https://www.croma.com/product-details'
    },
    { 
      name: 'Reliance Digital', 
      price: product.price * 1.03, 
      originalPrice: product.originalPrice ? product.originalPrice * 1.015 : product.price * 1.23, 
      discount: (product.discount || 0) - 3, 
      delivery: 'Free delivery by Nov 11',
      url: 'https://www.reliancedigital.in/product-details'
    }
  ];

  const addToWishlistHandler = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleSetPriceAlert = async () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    const price = parseInt(priceAlertValue, 10);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    try {
      const success = await setPriceAlert(user.id, product.id, price);
      if (success) {
        setAlertSuccess(true);
        setTimeout(() => setAlertSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error setting price alert:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this great deal on ${product.title}!`,
        url: window.location.href
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };
  
  return (
    <div className="container-custom py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-2/5 mb-6 lg:mb-0">
            <div className="sticky top-24">
              <div className="bg-gray-50 p-8 rounded-lg flex items-center justify-center h-[400px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex justify-center mt-4">
                <button 
                  onClick={addToWishlistHandler}
                  className={`flex items-center text-sm mr-6 ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'}`}
                >
                  <Heart className={`h-5 w-5 mr-1 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center text-sm text-gray-600"
                >
                  <Share className="h-5 w-5 mr-1" />
                  Share
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-3/5 lg:pl-8">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-3">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span>{product.rating || 4.5}/5</span>
              </div>
              <span className="text-sm text-gray-500">Based on 4,827 ratings</span>
            </div>
            
            <div className="border-t border-b py-4 mb-6">
              <div className="text-sm text-gray-500 mb-1">Best Price Available At:</div>
              <div className="flex items-center">
                <img 
                  src={`https://logo.clearbit.com/${stores[0].name.toLowerCase()}.com`} 
                  alt={stores[0].name}
                  className="w-6 h-6 mr-2"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = 'https://via.placeholder.com/40';
                  }}
                />
                <div className="mr-4">
                  <span className="font-bold text-2xl">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                {product.discount && (
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1">{stores[0].delivery}</div>
            </div>
            
            {/* Price History Chart */}
            {product.priceHistory && product.priceHistory.length > 0 && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Price History</h3>
                <PriceHistoryChart 
                  priceHistory={product.priceHistory}
                  currentPrice={product.price}
                  width={500}
                  height={150}
                />
              </div>
            )}
            
            {/* Price alert setter */}
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" /> 
                Set Price Drop Alert
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                We'll notify you when the price drops below your target:
              </p>
              <div className="flex">
                <div className="relative flex-grow mr-2">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{currency.symbol}</span>
                  <input
                    type="number"
                    value={priceAlertValue}
                    onChange={(e) => setPriceAlertValue(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border rounded-md"
                    placeholder="Enter target price"
                  />
                </div>
                <button 
                  onClick={handleSetPriceAlert}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Set Alert
                </button>
              </div>
              {alertSuccess && (
                <div className="mt-2 text-sm text-green-600">
                  Price alert set successfully! We'll notify you when the price drops.
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3">Available at Multiple Stores</h2>
              
              <div className="space-y-4">
                {stores.map((store, index) => (
                  <div key={index} className={`border p-4 rounded-lg ${index === 0 ? 'bg-green-50 border-green-200' : ''}`}>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <img 
                          src={`https://logo.clearbit.com/${store.name.toLowerCase().replace(' ', '')}.com`} 
                          alt={store.name}
                          className="w-8 h-8 mr-3"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'https://via.placeholder.com/40';
                          }}
                        />
                        <div>
                          <div className="font-medium">{store.name}</div>
                          <div className="text-sm text-gray-600">{store.delivery}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-bold text-lg">{formatPrice(store.price)}</span>
                          <span className="text-xs text-red-600 ml-2">-{store.discount}%</span>
                        </div>
                        <div className="text-sm text-gray-500 line-through">{formatPrice(store.originalPrice)}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex">
                      <a 
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary hover:bg-primary-dark text-white text-center py-2 rounded-md mr-2"
                      >
                        Buy Now
                      </a>
                      <a 
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-50"
                      >
                        <ExternalLink className="h-5 w-5 text-gray-600" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-3">Price Analysis</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">Currently at lowest price in last 30 days</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg mb-3">Buying Advice</h2>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      This is a great time to buy as the price is at its lowest in 30 days. The average selling price across platforms is {formatPrice(product.price * 1.05)}.
                    </p>
                    <a href="#" className="text-primary text-sm font-medium flex items-center">
                      See detailed price analysis
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'specifications' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 mb-4">{product.description || 'Experience the ultimate iPhone with the all-new iPhone 16 Pro Max. Featuring the powerful A18 Pro chip, a stunning Super Retina XDR display with always-on technology, and the most advanced camera system on an iPhone.'}</p>
              <p className="text-gray-700 mb-4">
                The iPhone 16 Pro Max takes everything you love about iPhone to a whole new level. The titanium design is both strong and lightweight, with a textured matte glass back. The Super Retina XDR display features ProMotion technology for fluid scrolling and always-on capabilities to quickly view information at a glance.
              </p>
              <p className="text-gray-700">
                The pro camera system includes a 48MP main camera with a quad-pixel sensor, a 12MP ultra-wide camera with macro photography capabilities, and a 12MP telephoto camera with 3x optical zoom. Capture stunning photos and videos in any lighting condition, including impressive low-light photography with Night mode.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {product.specifications ? (
                  product.specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between">
                      <dt className="text-gray-600 mb-1 md:mb-0">{spec.name}</dt>
                      <dd className="font-medium text-gray-900 md:text-right">{spec.value}</dd>
                    </div>
                  ))
                ) : (
                  [
                    { name: 'Display', value: '6.9-inch Super Retina XDR display with ProMotion' },
                    { name: 'Processor', value: 'A18 Pro chip with 6-core CPU and 5-core GPU' },
                    { name: 'Storage', value: '256GB' },
                    { name: 'Camera', value: 'Pro camera system: 48MP main, 12MP ultra-wide, 12MP telephoto' },
                    { name: 'Battery', value: 'Up to 29 hours video playback' },
                    { name: 'OS', value: 'iOS 18' },
                    { name: 'Water Resistance', value: 'IP68 (max depth of 6 meters up to 30 minutes)' },
                    { name: 'Dimensions', value: '159.9 x 76.7 x 8.25 mm' },
                    { name: 'Weight', value: '221 g' }
                  ].map((spec, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between">
                      <dt className="text-gray-600 mb-1 md:mb-0">{spec.name}</dt>
                      <dd className="font-medium text-gray-900 md:text-right">{spec.value}</dd>
                    </div>
                  ))
                )}
              </dl>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="mr-6">
                  <div className="text-5xl font-bold text-center">{product.rating || 4.7}</div>
                  <div className="flex text-yellow-400 justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 4.7) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-1">4,827 ratings</div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center mb-1">
                    <div className="w-20 text-sm text-gray-600">5 stars</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600">75%</div>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-20 text-sm text-gray-600">4 stars</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-green-400 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600">18%</div>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-20 text-sm text-gray-600">3 stars</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-yellow-400 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600">5%</div>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-20 text-sm text-gray-600">2 stars</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-orange-400 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600">1%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">1 star</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-red-400 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600">1%</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a href="#" className="text-primary font-medium hover:text-primary-dark">Read all reviews →</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
 