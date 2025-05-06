import  { Link } from 'react-router-dom';
import { Smartphone, Tv, Headphones, Laptop, Camera, Watch, Gift, ShoppingBag, Home, Heart } from 'lucide-react';

const Categories = () => {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Shop by Categories</h1>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Electronics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Link to="/categories/smartphones" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-medium text-center">Smartphones</span>
          </Link>
          
          <Link to="/categories/laptops" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <Laptop className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="font-medium text-center">Laptops</span>
          </Link>
          
          <Link to="/categories/tvs" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Tv className="h-6 w-6 text-red-600" />
            </div>
            <span className="font-medium text-center">TVs</span>
          </Link>
          
          <Link to="/categories/headphones" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Headphones className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-medium text-center">Headphones</span>
          </Link>
          
          <Link to="/categories/cameras" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
              <Camera className="h-6 w-6 text-amber-600" />
            </div>
            <span className="font-medium text-center">Cameras</span>
          </Link>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Fashion</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Link to="/categories/mens" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-medium text-center">Men's Fashion</span>
          </Link>
          
          <Link to="/categories/womens" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="h-6 w-6 text-pink-600" />
            </div>
            <span className="font-medium text-center">Women's Fashion</span>
          </Link>
          
          <Link to="/categories/watches" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Watch className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-medium text-center">Watches</span>
          </Link>
          
          <Link to="/categories/footwear" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-medium text-center">Footwear</span>
          </Link>
          
          <Link to="/categories/jewelry" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <Heart className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="font-medium text-center">Jewelry</span>
          </Link>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Home & Kitchen</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Link to="/categories/furniture" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center mb-3">
              <Home className="h-6 w-6 text-amber-800" />
            </div>
            <span className="font-medium text-center">Furniture</span>
          </Link>
          
          <Link to="/categories/appliances" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Home className="h-6 w-6 text-gray-600" />
            </div>
            <span className="font-medium text-center">Appliances</span>
          </Link>
          
          <Link to="/categories/kitchen" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Home className="h-6 w-6 text-red-600" />
            </div>
            <span className="font-medium text-center">Kitchen</span>
          </Link>
          
          <Link to="/categories/decor" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-medium text-center">Home Decor</span>
          </Link>
          
          <Link to="/categories/garden" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-medium text-center">Garden</span>
          </Link>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Kids & Toys</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Link to="/categories/toys" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <Gift className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="font-medium text-center">Toys</span>
          </Link>
          
          <Link to="/categories/baby" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Gift className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-medium text-center">Baby Products</span>
          </Link>
          
          <Link to="/categories/kidswear" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="h-6 w-6 text-pink-600" />
            </div>
            <span className="font-medium text-center">Kids Wear</span>
          </Link>
          
          <Link to="/categories/school" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-medium text-center">School Supplies</span>
          </Link>
          
          <Link to="/categories/gaming" className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-medium text-center">Gaming</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
 