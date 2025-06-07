import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchRoutes, type RouteItem } from '../data/routes';
import NavigationButton from './NavigationButton';

interface NavigationSearchProps {
  className?: string;
  onClose?: () => void;
  autoFocus?: boolean;
}

const NavigationSearch: React.FC<NavigationSearchProps> = ({ 
  className = '',
  onClose,
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RouteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  const performSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim().length > 0) {
      const searchResults = searchRoutes(searchQuery);
      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, []);

  // Debounce the search
  useEffect(() => {
    const timeout = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, performSearch]);

  // Auto focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setSelectedIndex(-1);
          if (onClose) onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (route: RouteItem) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onClose) onClose();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={18} 
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search pages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
          aria-label="Search navigation"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          role="combobox"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
            role="listbox"
          >
            {results.map((route, index) => (
              <div
                key={route.path}
                className={`border-b border-white/10 last:border-b-0 ${
                  index === selectedIndex ? 'bg-white/10' : ''
                }`}
              >
                <NavigationButton
                  to={route.path}
                  className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors ${
                    index === selectedIndex ? 'bg-white/10' : ''
                  }`}
                  onClick={() => handleResultClick(route)}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{route.name}</span>
                    {route.description && (
                      <span className="text-gray-400 text-sm mt-1">
                        {route.description}
                      </span>
                    )}
                  </div>
                </NavigationButton>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {isOpen && query.trim().length > 0 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl p-4 text-center"
          >
            <p className="text-gray-400">No pages found for "{query}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationSearch;