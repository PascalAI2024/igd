import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen, 
  Tag,
  Eye,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  views?: number;
  likes?: number;
}

interface EnhancedBlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
}

const EnhancedBlogCard: React.FC<EnhancedBlogCardProps> = ({ post, index, featured = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes || 0);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/blog/${post.id}`
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'AI & ML': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Web Development': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Business': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Design': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Marketing': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative"
      >
        <Link to={`/blog/${post.id}`} className="block">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-red-500/20 transition-all duration-300">
            {/* Featured Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>

            {/* Image */}
            <div className="relative h-64 bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category and Meta */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className={`w-4 h-4 ${isLiked ? 'text-red-400 fill-current' : ''}`} />
                    <span>{localLikes}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="flex items-center gap-1 px-2 py-1 bg-white/5 text-gray-300 text-xs rounded border border-white/10"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author and Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className={`p-2 rounded-lg transition-colors ${
                      isLiked ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleBookmark}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white/5 text-gray-400 hover:text-blue-400 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/blog/${post.id}`} className="block">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300 h-full">
          {/* Category */}
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Eye className="w-3 h-3" />
              <span>{post.views || 0}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-400 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 2).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`p-1 rounded transition-colors ${
                  isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <span className="text-xs">{localLikes}</span>
              <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default EnhancedBlogCard;
