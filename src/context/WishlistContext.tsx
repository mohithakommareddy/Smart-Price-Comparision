import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WishlistItem, Product } from '../types';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { user } = useAuth();

  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (storedWishlist) {
        try {
          const parsedWishlist = JSON.parse(storedWishlist);
          // Convert string dates back to Date objects
          const wishlistWithDates = parsedWishlist.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
          setWishlist(wishlistWithDates);
        } catch (error) {
          console.error('Error parsing wishlist:', error);
        }
      }
    } else {
      // If not logged in, check for anonymous wishlist
      const anonymousWishlist = localStorage.getItem('anonymous_wishlist');
      if (anonymousWishlist) {
        try {
          const parsedWishlist = JSON.parse(anonymousWishlist);
          // Convert string dates back to Date objects
          const wishlistWithDates = parsedWishlist.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
          setWishlist(wishlistWithDates);
        } catch (error) {
          console.error('Error parsing anonymous wishlist:', error);
        }
      }
    }
  }, [user]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    } else {
      localStorage.setItem('anonymous_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      // Check if product already exists in wishlist
      if (prevWishlist.some(item => item.id === product.id)) {
        return prevWishlist;
      }
      
      // Add new product to wishlist with current date
      return [...prevWishlist, { ...product, addedAt: new Date() }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    );
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
 