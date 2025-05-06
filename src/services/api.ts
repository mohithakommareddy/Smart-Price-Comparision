import  axios from 'axios';
import { Product } from '../types';

// Mock product database - in a real app this would come from an API
const mockProducts = [
  {
    id: '1',
    title: 'iPhone 16 Pro Max 256GB Black Titanium',
    image: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 129999,
    originalPrice: 152900,
    store: 'Amazon',
    storeUrl: 'https://www.amazon.in/Apple-iPhone-Pro-Max-256GB/dp/B0CHX1W7MY/',
    discount: 17,
    rating: 4.7,
    isBestDeal: true,
    priceHistory: [
      { date: '2023-09-15', price: 149999 },
      { date: '2023-10-01', price: 144999 },
      { date: '2023-10-15', price: 139999 },
      { date: '2023-11-01', price: 134999 },
      { date: '2023-11-15', price: 129999 },
    ]
  },
  {
    id: '2',
    title: 'iPhone 16 Pro Max 256GB White Titanium',
    image: 'https://images.unsplash.com/photo-1592826719120-5676cd23c1cb?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 131999,
    originalPrice: 152900,
    store: 'Flipkart',
    storeUrl: 'https://www.flipkart.com/apple-iphone-16-pro-max-white-titanium-256-gb/p/itm123456789',
    discount: 13,
    rating: 4.5,
    priceHistory: [
      { date: '2023-09-15', price: 149999 },
      { date: '2023-10-01', price: 145999 },
      { date: '2023-10-15', price: 141999 },
      { date: '2023-11-01', price: 135999 },
      { date: '2023-11-15', price: 131999 },
    ]
  },
  {
    id: '3',
    title: 'iPhone 16 Pro 256GB Black Titanium',
    image: 'https://images.unsplash.com/photo-1737617687161-39a848fc0231?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 119999,
    originalPrice: 139900,
    store: 'Croma',
    storeUrl: 'https://www.croma.com/apple-iphone-16-pro-black-titanium-256gb/p/123456',
    discount: 15,
    rating: 4.6,
    priceHistory: [
      { date: '2023-09-15', price: 139900 },
      { date: '2023-10-01', price: 134900 },
      { date: '2023-10-15', price: 129900 },
      { date: '2023-11-01', price: 124900 },
      { date: '2023-11-15', price: 119999 },
    ]
  },
  {
    id: '4',
    title: 'iPhone 16 256GB Blue',
    image: 'https://images.unsplash.com/photo-1598870783724-2ecf2e0653b2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw5fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 95999,
    originalPrice: 99900,
    store: 'Reliance Digital',
    storeUrl: 'https://www.reliancedigital.in/apple-iphone-16-blue-256-gb/p/123456',
    discount: 4,
    rating: 4.4,
    priceHistory: [
      { date: '2023-09-15', price: 99900 },
      { date: '2023-10-01', price: 97900 },
      { date: '2023-10-15', price: 97900 },
      { date: '2023-11-01', price: 96900 },
      { date: '2023-11-15', price: 95999 },
    ]
  },
  {
    id: '5',
    title: 'iPhone 15 Pro Max 256GB Black Titanium',
    image: 'https://images.unsplash.com/photo-1592826832050-7c586f9457ce?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw3fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 109999,
    originalPrice: 139900,
    store: 'Vijay Sales',
    storeUrl: 'https://www.vijaysales.com/apple-iphone-15-pro-max-black-titanium-256-gb/123456',
    discount: 15,
    rating: 4.5,
    priceHistory: [
      { date: '2023-09-15', price: 139900 },
      { date: '2023-10-01', price: 129900 },
      { date: '2023-10-15', price: 119900 },
      { date: '2023-11-01', price: 114900 },
      { date: '2023-11-15', price: 109999 },
    ]
  },
  {
    id: '6',
    title: 'iPhone 15 Pro 256GB Natural Titanium',
    image: 'https://images.unsplash.com/photo-1519587307163-d68d8b5aa895?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw4fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 99999,
    originalPrice: 119900,
    store: 'Amazon',
    storeUrl: 'https://www.amazon.in/Apple-iPhone-15-Pro-256GB/dp/B0CHX2F5QM/',
    discount: 16,
    rating: 4.7,
    priceHistory: [
      { date: '2023-09-15', price: 119900 },
      { date: '2023-10-01', price: 114900 },
      { date: '2023-10-15', price: 109900 },
      { date: '2023-11-01', price: 104900 },
      { date: '2023-11-15', price: 99999 },
    ]
  },
  {
    id: '7',
    title: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray',
    image: 'https://images.unsplash.com/photo-1561525155-40a650192479?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxMHx8c21hcnRwaG9uZSUyMGVsZWN0cm9uaWNzJTIwc2hvcHBpbmd8ZW58MHx8fHwxNzQ2MTA1MjI4fDA&ixlib=rb-4.0.3',
    price: 99999,
    originalPrice: 124999,
    store: 'Flipkart',
    storeUrl: 'https://www.flipkart.com/samsung-galaxy-s24-ultra-titanium-gray-512-gb/p/itm9876543210',
    discount: 20,
    rating: 4.8,
    priceHistory: [
      { date: '2023-09-15', price: 124999 },
      { date: '2023-10-01', price: 119999 },
      { date: '2023-10-15', price: 114999 },
      { date: '2023-11-01', price: 104999 },
      { date: '2023-11-15', price: 99999 },
    ]
  },
  {
    id: '8',
    title: 'OnePlus 12 16GB 512GB Flowy Emerald',
    image: 'https://images.unsplash.com/photo-1733506903133-9d65b66d299a?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 64999,
    originalPrice: 69999,
    store: 'Reliance Digital',
    storeUrl: 'https://www.reliancedigital.in/oneplus-12-flowy-emerald-16gb-512gb/p/654321',
    discount: 7,
    rating: 4.6,
    priceHistory: [
      { date: '2023-09-15', price: 69999 },
      { date: '2023-10-01', price: 68999 },
      { date: '2023-10-15', price: 67999 },
      { date: '2023-11-01', price: 66999 },
      { date: '2023-11-15', price: 64999 },
    ]
  },
  {
    id: '9',
    title: 'Google Pixel 9 Pro 128GB Obsidian',
    image: 'https://images.unsplash.com/photo-1733509213080-db2aca1bc244?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 85499,
    originalPrice: 94999,
    store: 'Vijay Sales',
    storeUrl: 'https://www.vijaysales.com/google-pixel-9-pro-obsidian-128gb/654321',
    discount: 10,
    rating: 4.7,
    priceHistory: [
      { date: '2023-09-15', price: 94999 },
      { date: '2023-10-01', price: 92499 },
      { date: '2023-10-15', price: 89999 },
      { date: '2023-11-01', price: 87499 },
      { date: '2023-11-15', price: 85499 },
    ]
  },
  {
    id: '10',
    title: 'MacBook Air M3 8GB 256GB Space Gray',
    image: 'https://images.unsplash.com/photo-1733507267128-e65b38dad170?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3',
    price: 89990,
    originalPrice: 119990,
    store: 'Croma',
    storeUrl: 'https://www.croma.com/apple-macbook-air-m3-space-gray-8gb-256gb/p/654321',
    discount: 25,
    rating: 4.9,
    priceHistory: [
      { date: '2023-09-15', price: 119990 },
      { date: '2023-10-01', price: 109990 },
      { date: '2023-10-15', price: 99990 },
      { date: '2023-11-01', price: 94990 },
      { date: '2023-11-15', price: 89990 },
    ]
  }
];

// Additional laptop products
const laptopProducts = [
  {
    id: '11',
    title: 'Dell XPS 13 Plus 13.4" FHD+ Laptop',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    price: 124990,
    originalPrice: 139990,
    store: 'Amazon',
    storeUrl: 'https://www.amazon.in/Dell-XPS-13-Plus-Laptop/dp/B0ABC123DEF',
    discount: 10,
    rating: 4.6,
    priceHistory: [
      { date: '2023-09-15', price: 139990 },
      { date: '2023-10-01', price: 134990 },
      { date: '2023-10-15', price: 129990 },
      { date: '2023-11-01', price: 124990 },
      { date: '2023-11-15', price: 124990 },
    ]
  },
  {
    id: '12',
    title: 'HP Spectre x360 14 2-in-1 Laptop',
    image: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    price: 134990,
    originalPrice: 149990,
    store: 'Flipkart',
    storeUrl: 'https://www.flipkart.com/hp-spectre-x360-14-2-in-1-laptop/p/itm123456789',
    discount: 10,
    rating: 4.7,
    priceHistory: [
      { date: '2023-09-15', price: 149990 },
      { date: '2023-10-01', price: 144990 },
      { date: '2023-10-15', price: 139990 },
      { date: '2023-11-01', price: 134990 },
      { date: '2023-11-15', price: 134990 },
    ]
  }
];

// Additional headphone products
const headphoneProducts = [
  {
    id: '21',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=1465&q=80',
    price: 29990,
    originalPrice: 34990,
    store: 'Amazon',
    storeUrl: 'https://www.amazon.in/Sony-WH-1000XM5-Wireless-Cancelling-Headphones/dp/B09XS7JWHH',
    discount: 14,
    rating: 4.8,
    priceHistory: [
      { date: '2023-09-15', price: 34990 },
      { date: '2023-10-01', price: 32990 },
      { date: '2023-10-15', price: 31990 },
      { date: '2023-11-01', price: 30990 },
      { date: '2023-11-15', price: 29990 },
    ]
  },
  {
    id: '22',
    title: 'Apple AirPods Pro (2nd Generation)',
    image: 'https://images.unsplash.com/photo-1600294037732-d3265f808819?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    price: 21990,
    originalPrice: 26990,
    store: 'Croma',
    storeUrl: 'https://www.croma.com/apple-airpods-pro-2nd-generation/p/123456',
    discount: 18,
    rating: 4.7,
    priceHistory: [
      { date: '2023-09-15', price: 26990 },
      { date: '2023-10-01', price: 24990 },
      { date: '2023-10-15', price: 23990 },
      { date: '2023-11-01', price: 22990 },
      { date: '2023-11-15', price: 21990 },
    ]
  }
];

// Search results with dynamic currency conversion
export const searchProducts = async (query: string, currency = 'INR'): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  if (!query) return mockProducts;
  
  const normalizedQuery = query.toLowerCase();
  let results = mockProducts.filter(product => 
    product.title.toLowerCase().includes(normalizedQuery)
  );
  
  // Add category specific products if searching for them
  if (['laptop', 'laptops', 'macbook', 'dell', 'hp'].some(term => normalizedQuery.includes(term))) {
    results = [...results, ...laptopProducts];
  }
  
  if (['headphone', 'airpods', 'sony', 'audio'].some(term => normalizedQuery.includes(term))) {
    results = [...results, ...headphoneProducts];
  }
  
  // Apply currency conversion if needed
  if (currency !== 'INR') {
    const rates = {
      'USD': 0.012, // 1 INR = 0.012 USD
      'EUR': 0.011, // 1 INR = 0.011 EUR
      'GBP': 0.0095 // 1 INR = 0.0095 GBP
    };
    
    const rate = rates[currency as keyof typeof rates] || 1;
    
    return results.map(product => ({
      ...product,
      price: parseFloat((product.price * rate).toFixed(2)),
      originalPrice: product.originalPrice ? parseFloat((product.originalPrice * rate).toFixed(2)) : undefined
    }));
  }
  
  return results;
};

export const getProductById = async (id: string, currency = 'INR'): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  
  // Search in all product collections
  const allProducts = [...mockProducts, ...laptopProducts, ...headphoneProducts];
  const product = allProducts.find(p => p.id === id);
  
  if (!product) return null;
  
  // Apply currency conversion if needed
  if (currency !== 'INR') {
    const rates = {
      'USD': 0.012,
      'EUR': 0.011,
      'GBP': 0.0095
    };
    
    const rate = rates[currency as keyof typeof rates] || 1;
    
    return {
      ...product,
      price: parseFloat((product.price * rate).toFixed(2)),
      originalPrice: product.originalPrice ? parseFloat((product.originalPrice * rate).toFixed(2)) : undefined
    };
  }
  
  return product;
};

export const getTrendingProducts = async (currency = 'INR'): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  // Get products with highest discounts as trending
  const trendingProducts = [...mockProducts, ...laptopProducts, ...headphoneProducts]
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 6);
  
  // Apply currency conversion if needed
  if (currency !== 'INR') {
    const rates = {
      'USD': 0.012,
      'EUR': 0.011,
      'GBP': 0.0095
    };
    
    const rate = rates[currency as keyof typeof rates] || 1;
    
    return trendingProducts.map(product => ({
      ...product,
      price: parseFloat((product.price * rate).toFixed(2)),
      originalPrice: product.originalPrice ? parseFloat((product.originalPrice * rate).toFixed(2)) : undefined
    }));
  }
  
  return trendingProducts;
};

export const getCategoryProducts = async (category: string, currency = 'INR'): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  
  let categoryProducts: Product[] = [];
  
  // Return specific products based on category
  switch(category.toLowerCase()) {
    case 'smartphones':
    case 'electronics':
      categoryProducts = mockProducts.slice(0, 6);
      break;
    case 'laptops':
      categoryProducts = laptopProducts;
      break;
    case 'headphones':
      categoryProducts = headphoneProducts;
      break;
    default:
      // For other categories, return a random subset of products
      categoryProducts = [...mockProducts, ...laptopProducts, ...headphoneProducts]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
  }
  
  // Apply currency conversion if needed
  if (currency !== 'INR') {
    const rates = {
      'USD': 0.012,
      'EUR': 0.011,
      'GBP': 0.0095
    };
    
    const rate = rates[currency as keyof typeof rates] || 1;
    
    return categoryProducts.map(product => ({
      ...product,
      price: parseFloat((product.price * rate).toFixed(2)),
      originalPrice: product.originalPrice ? parseFloat((product.originalPrice * rate).toFixed(2)) : undefined
    }));
  }
  
  return categoryProducts;
};

// Function to get price alerts
export const getPriceAlerts = async (userId: string): Promise<any[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  
  return [
    { 
      id: '1', 
      productId: '1', 
      productTitle: 'iPhone 16 Pro Max 256GB Black Titanium',
      targetPrice: 125000, 
      currentPrice: 129999,
      image: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3'
    },
    { 
      id: '2', 
      productId: '7', 
      productTitle: 'Samsung Galaxy S24 Ultra 512GB Titanium Gray',
      targetPrice: 95000, 
      currentPrice: 99999,
      image: 'https://images.unsplash.com/photo-1561525155-40a650192479?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxMHx8c21hcnRwaG9uZSUyMGVsZWN0cm9uaWNzJTIwc2hvcHBpbmd8ZW58MHx8fHwxNzQ2MTA1MjI4fDA&ixlib=rb-4.0.3'
    },
    {
      id: '3',
      productId: '10',
      productTitle: 'MacBook Air M3 8GB 256GB Space Gray',
      targetPrice: 85000,
      currentPrice: 89990,
      image: 'https://images.unsplash.com/photo-1733507267128-e65b38dad170?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBzaG9wcGluZ3xlbnwwfHx8fDE3NDYxMDUyMjh8MA&ixlib=rb-4.0.3'
    }
  ];
};

// Function to set a price alert
export const setPriceAlert = async (userId: string, productId: string, targetPrice: number): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  return true;
};

// Get exchange rates for currency conversion
export const getExchangeRates = async (): Promise<{[key: string]: number}> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  
  // Fixed exchange rates for demo
  return {
    'INR': 1,
    'USD': 0.012,
    'EUR': 0.011,
    'GBP': 0.0095
  };
};

// Get current price drops
export const getPriceDrops = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate API delay
  
  // Find products with significant price drops based on price history
  const productsWithDrops = [...mockProducts, ...laptopProducts, ...headphoneProducts]
    .filter(product => product.priceHistory)
    .map(product => {
      const history = product.priceHistory || [];
      if (history.length >= 2) {
        const oldestPrice = history[0].price;
        const currentPrice = product.price;
        const dropPercentage = ((oldestPrice - currentPrice) / oldestPrice) * 100;
        
        return {
          ...product,
          priceDrop: dropPercentage.toFixed(1)
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => parseFloat(b!.priceDrop as string) - parseFloat(a!.priceDrop as string))
    .slice(0, 5) as Product[];
  
  return productsWithDrops;
};
 