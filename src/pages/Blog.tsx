import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import { blogPosts, categories } from '../data/blog/index';

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Enhanced search function with more robust matching
  const filteredPosts = blogPosts.filter(post => {
    const category = categories.find(c => c.name === selectedCategory);
    const matchesCategory = selectedCategory === 'All' || (category && post.category === category.name);
    const matchesSearch = isSearchActive ? (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true;

    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Handle search submission
  const handleSearch = () => {
    setIsSearchActive(searchQuery.trim() !== '');
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Latest Insights
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Expert perspectives on technology, innovation, and digital transformation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
              <div className="relative w-full md:w-96 flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleSearch}
                  className="ml-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Search
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  key="All"
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-red-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCategory === category.name
                        ? 'bg-red-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count and Search Status */}
            <div className="text-gray-400 mb-8 flex justify-between items-center">
              <span>
                {isSearchActive ? 'Search Results: ' : 'Showing '}
                {paginatedPosts.length} of {filteredPosts.length} articles
              </span>
              {isSearchActive && (
                <button
                  onClick={clearSearch}
                  className="text-red-500 hover:text-red-400 flex items-center"
                >
                  Clear Search <X className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>

            {/* No Results Handling */}
            {paginatedPosts.length === 0 && (
              <div className="text-center py-12 bg-white/5 rounded-lg">
                <h3 className="text-2xl text-gray-300 mb-4">No articles found</h3>
                <p className="text-gray-500 mb-6">Try a different search or category</p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reset Search
                </button>
              </div>
            )}

            {/* Blog Posts Grid */}
            {paginatedPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/20 transition-all duration-300"
                  >
                    {/* Existing post card content remains the same */}
                    <div className="relative overflow-hidden aspect-video">
                      <OptimizedImage
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-500/90 text-white text-sm rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gradient">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="flex items-center text-sm text-gray-400"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
                        onClick={(e) => {
                          // Prevent default behavior
                          e.preventDefault();
                          // Navigate programmatically
                          window.location.href = `/blog/${post.id}`;
                        }}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && paginatedPosts.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-red-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
