import  { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bell, Heart, User, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import CurrencySelector from './CurrencySelector';

interface NavbarProps {
  onWishlistClick: () => void;
}

const Navbar = ({ onWishlistClick }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <ShoppingCart className="text-primary mr-2" />
              <span className="text-secondary">Smart<span className="text-primary">PriceCompare</span></span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium hover:text-primary">Home</Link>
            <Link to="/trending" className="font-medium hover:text-primary">Trending Deals</Link>
            <Link to="/categories" className="font-medium hover:text-primary">Categories</Link>
            <Link to="/shopping-tips" className="font-medium hover:text-primary">Shopping Tips</Link>
            <Link to="/price-drops" className="font-medium hover:text-primary">Price Drops</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <CurrencySelector />
            
            <button 
              onClick={onWishlistClick} 
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {user && (
              <Link to="/alerts" className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5" />
              </Link>
            )}

            <div className="relative">
              {user ? (
                <>
                  <button 
                    className="flex items-center p-2 hover:text-primary"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline">{user.name}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p>{user.name}</p>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                      <Link 
                        to="/alerts" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Price Alerts
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="hidden md:flex items-center p-2 hover:text-primary">
                  <User className="h-5 w-5 mr-1" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t pt-3">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="font-medium hover:text-primary">Home</Link>
              <Link to="/trending" className="font-medium hover:text-primary">Trending Deals</Link>
              <Link to="/categories" className="font-medium hover:text-primary">Categories</Link>
              <Link to="/shopping-tips" className="font-medium hover:text-primary">Shopping Tips</Link>
              <Link to="/price-drops" className="font-medium hover:text-primary">Price Drops</Link>
              {user ? (
                <>
                  <Link to="/alerts" className="font-medium hover:text-primary">Price Alerts</Link>
                  <button 
                    onClick={handleLogout}
                    className="font-medium text-left text-red-500 hover:text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="font-medium hover:text-primary">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
 