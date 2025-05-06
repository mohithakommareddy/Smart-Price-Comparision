import  { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../types';
import { getCategoryProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!category) return;
      
      setIsLoading(true);
      try {
        const data = await getCategoryProducts(category);
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryProducts();
  }, [category]);

  // Function to get a nice display name for the category
  const getCategoryDisplayName = () => {
    if (!category) return '';
    
    // Convert from kebab-case to Title Case
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link to="/categories" className="flex items-center text-primary mb-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Categories
        </Link>
        <h1 className="text-3xl font-bold">{getCategoryDisplayName()}</h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-gray-500 mb-4">
                We couldn't find any products in this category at the moment.
              </p>
              <Link to="/categories" className="text-primary font-medium">
                Browse other categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  store={product.store}
                  discount={product.discount}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Category info section */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">About {getCategoryDisplayName()}</h2>
        <p className="text-gray-600 mb-4">
          Find the best deals on {getCategoryDisplayName().toLowerCase()} from top retailers like Amazon, Flipkart, Croma, and more. 
          Our price comparison tool helps you save money by showing you the best offers across multiple stores.
        </p>
        <p className="text-gray-600">
          We update prices daily and send alerts when prices drop, so you'll never miss a great deal!
        </p>
      </div>
    </div>
  );
};

export default CategoryDetail;
 