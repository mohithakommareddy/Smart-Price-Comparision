import  { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TrendingDeals from './pages/TrendingDeals';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import ShoppingTips from './pages/ShoppingTips';
import TipDetail from './pages/TipDetail';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import NotFound from './pages/NotFound';
import PriceAlerts from './pages/PriceAlerts';
import PriceDrops from './pages/PriceDrops';

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="trending" element={<TrendingDeals />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:category" element={<CategoryDetail />} />
              <Route path="shopping-tips" element={<ShoppingTips />} />
              <Route path="shopping-tips/:id" element={<TipDetail />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="alerts" element={<PriceAlerts />} />
              <Route path="price-drops" element={<PriceDrops />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
 