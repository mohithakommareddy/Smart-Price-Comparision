import  { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WishlistSidebar from './WishlistSidebar';
import { useState } from 'react';

const Layout = () => {
  const [showWishlist, setShowWishlist] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onWishlistClick={() => setShowWishlist(!showWishlist)} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {showWishlist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowWishlist(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <WishlistSidebar onClose={() => setShowWishlist(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
 