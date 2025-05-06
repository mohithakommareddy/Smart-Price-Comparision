import  { X, Trash2, ShoppingCart, ExternalLink } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

interface WishlistSidebarProps {
  onClose: () => void;
}

const WishlistSidebar = ({ onClose }: WishlistSidebarProps) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Wishlist ({wishlist.length})</h2>
        <div className="flex items-center">
          {wishlist.length > 0 && (
            <button 
              onClick={clearWishlist}
              className="text-red-500 mr-4 flex items-center text-sm"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {wishlist.length === 0 ? (
        <div className="flex-grow p-6 flex flex-col items-center justify-center text-center text-gray-500">
          <div className="w-20 h-20 mb-4 mx-auto">
            <svg className="w-full h-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="mb-2 text-lg">Your wishlist is empty.</p>
          <p className="text-sm">Click the heart icon to wishlist products you like.</p>
        </div>
      ) : (
        <div className="flex-grow overflow-auto p-4">
          <div className="space-y-4">
            {wishlist.map(item => (
              <div key={item.id} className="border rounded-lg p-3 bg-white">
                <div className="flex">
                  <Link 
                    to={`/product/${item.id}`} 
                    onClick={onClose}
                    className="w-20 h-20 bg-gray-50 rounded flex-shrink-0 mr-3"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </Link>
                  
                  <div className="flex-grow">
                    <Link 
                      to={`/product/${item.id}`}
                      onClick={onClose}
                      className="font-medium hover:text-primary line-clamp-2 text-sm"
                    >
                      {item.title}
                    </Link>
                    
                    <div className="flex items-center mt-1">
                      <span className="font-bold text-sm">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-500 line-through ml-2">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                      {item.discount && (
                        <span className="ml-2 text-xs text-green-600 font-semibold">
                          {item.discount}% off
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{item.store}</span>
                    </div>
                    
                    <div className="flex mt-2">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-red-500 text-xs flex items-center mr-3"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                      
                      <a 
                        href={item.storeUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-xs flex items-center"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSidebar;
 