import  { Heart, ShoppingCart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  store: string;
  storeUrl: string;
  discount?: number;
  isBestDeal?: boolean;
  priceDrop?: string;
}

const ProductCard = ({
  id,
  title,
  image,
  price,
  originalPrice,
  store,
  storeUrl,
  discount,
  isBestDeal = false,
  priceDrop
}: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const inWishlist = isInWishlist(id);
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        title,
        image,
        price,
        originalPrice,
        store,
        storeUrl,
        discount
      });
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(storeUrl, '_blank');
  };
  
  return (
    <div className={`border rounded-lg overflow-hidden bg-white transition-transform hover:-translate-y-1 relative ${isBestDeal ? 'border-green-500' : ''}`}>
      {isBestDeal && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-1 text-sm font-medium z-10">
          BEST DEAL
        </div>
      )}
      
      {priceDrop && (
        <div className="absolute top-0 left-0 right-0 bg-rose-500 text-white text-center py-1 text-sm font-medium z-10">
          PRICE DROP: {priceDrop}%
        </div>
      )}
      
      {discount && !priceDrop && !isBestDeal && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
          {discount}% off
        </div>
      )}
      
      <div className="p-4 flex flex-col h-full">
        <div className="relative pt-[100%] mb-4">
          <img 
            src={image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-contain"
          />
          <button 
            className={`absolute top-2 left-2 p-1.5 rounded-full shadow-sm ${inWishlist ? 'bg-red-50 text-red-500' : 'bg-white hover:text-primary'}`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <Link to={`/product/${id}`} className="mb-2 font-medium line-clamp-2 hover:text-primary">
          {title}
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-baseline mb-1">
            <span className="text-lg font-bold">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <img 
              src={`https://logo.clearbit.com/${store.toLowerCase()}.com`} 
              alt={store}
              className="w-4 h-4 mr-1.5"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = 'https://via.placeholder.com/40';
              }}
            />
            <span>{store}</span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-md flex items-center justify-center"
              onClick={handleBuyNow}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              <span>Buy Now</span>
            </button>
            <a 
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border rounded-md hover:bg-gray-50"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
 