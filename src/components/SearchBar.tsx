import  { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  inHero?: boolean;
}

const SearchBar = ({ inHero = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`flex w-full ${inHero ? 'max-w-2xl' : 'max-w-md'}`}>
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full pl-10 pr-4 py-3 rounded-l-md border-2 border-gray-200 focus:outline-none focus:border-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button 
        type="submit" 
        className="bg-primary hover:bg-primary-dark text-white font-medium px-6 rounded-r-md"
      >
        Compare Prices
      </button>
    </form>
  );
};

export default SearchBar;
 