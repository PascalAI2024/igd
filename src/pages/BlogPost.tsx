import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import { blogPosts } from '../data/blog/index';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  // Configure marked with syntax highlighting
  useEffect(() => {
    marked.use(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );

    // Set additional options for better rendering
    marked.use({
      gfm: true,
      breaks: true,
      pedantic: false
    });
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <Link
            to="/blog"
            className="inline-flex items-center text-red-500 hover:text-red-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blog
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
                <span className="px-3 py-1 bg-red-500/90 text-white text-sm rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient text-center">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-2 justify-center mb-8">
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
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                priority={true}
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-gray-300 prose-a:text-red-400 prose-strong:text-white prose-code:text-red-300 prose-li:text-gray-300 prose-img:rounded-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(post.content.trim()) as string
                }}
                className="blog-content"
              />
            </div>

            <style>{`
              .blog-content h1 {
                font-size: 2.5rem;
                margin-top: 2rem;
                margin-bottom: 1.5rem;
                font-weight: 700;
                background: linear-gradient(to right, #ff3d3d, #ff3d9c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                display: inline-block;
              }

              .blog-content h2 {
                font-size: 1.875rem;
                margin-top: 2rem;
                margin-bottom: 1rem;
                font-weight: 600;
                color: white;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: 0.5rem;
              }

              .blog-content h3 {
                font-size: 1.5rem;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                font-weight: 600;
                color: white;
              }

              .blog-content p {
                margin-bottom: 1.5rem;
                line-height: 1.8;
                color: rgba(255, 255, 255, 0.8);
              }

              .blog-content ul, .blog-content ol {
                margin-bottom: 1.5rem;
                padding-left: 1.5rem;
              }

              .blog-content li {
                margin-bottom: 0.5rem;
                line-height: 1.6;
              }

              .blog-content a {
                color: #ff3d3d;
                text-decoration: none;
                transition: all 0.2s;
                border-bottom: 1px dotted rgba(255, 61, 61, 0.5);
              }

              .blog-content a:hover {
                color: #ff3d9c;
                border-bottom: 1px solid rgba(255, 61, 156, 0.8);
              }

              .blog-content blockquote {
                border-left: 4px solid #ff3d3d;
                padding-left: 1rem;
                margin-left: 0;
                margin-right: 0;
                font-style: italic;
                color: rgba(255, 255, 255, 0.7);
              }

              .blog-content pre {
                background-color: rgba(0, 0, 0, 0.5) !important;
                border-radius: 0.5rem;
                padding: 1rem;
                overflow-x: auto;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 1.5rem;
              }

              .blog-content code {
                font-family: 'Fira Code', monospace;
                font-size: 0.9rem;
              }

              .blog-content :not(pre) > code {
                background-color: rgba(255, 255, 255, 0.1);
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                color: #ff3d3d;
              }

              .blog-content img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                margin: 2rem 0;
              }

              .blog-content table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 1.5rem;
              }

              .blog-content th, .blog-content td {
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 0.75rem;
                text-align: left;
              }

              .blog-content th {
                background-color: rgba(255, 255, 255, 0.05);
              }
            `}</style>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Share this article:</span>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gradient mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-white group-hover:text-gradient mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default BlogPost;