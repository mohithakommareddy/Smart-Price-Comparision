import  { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SmartPriceCompare</h3>
            <p className="text-gray-300 mb-4">
              Your ultimate shopping companion that helps you find the best deals online and save money.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary">Home</Link></li>
              <li><Link to="/trending" className="text-gray-300 hover:text-primary">Trending Deals</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-primary">Categories</Link></li>
              <li><Link to="/shopping-tips" className="text-gray-300 hover:text-primary">Shopping Tips</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/electronics" className="text-gray-300 hover:text-primary">Electronics</Link></li>
              <li><Link to="/categories/fashion" className="text-gray-300 hover:text-primary">Fashion</Link></li>
              <li><Link to="/categories/home" className="text-gray-300 hover:text-primary">Home & Kitchen</Link></li>
              <li><Link to="/categories/beauty" className="text-gray-300 hover:text-primary">Beauty & Personal Care</Link></li>
              <li><Link to="/categories/kids" className="text-gray-300 hover:text-primary">Kids & Toys</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 text-primary" />
                <span className="text-gray-300">123 Shopping Street, Delhi, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-300">support@smartpricecompare.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SmartPriceCompare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 