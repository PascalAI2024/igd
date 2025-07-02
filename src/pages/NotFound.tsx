import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Code2, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import MetaTags from '../components/MetaTags';

const NotFound = () => {
  const glitchVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const binaryDigits = Array.from({ length: 50 }, () => Math.round(Math.random()));

  return (
    <PageTransition>
      <MetaTags 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Let's get you back on track with Ingenious Digital's AI-powered solutions."
        noIndex={true}
      />
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
        
        {/* Binary Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {binaryDigits.map((_, index) => (
            <motion.div
              key={index}
              initial={{ y: -20, opacity: 0 }}
              animate={{ 
                y: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              className="absolute text-red-500 font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {Math.round(Math.random())}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            variants={glitchVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{
                  x: [-2, 2, -2],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-9xl font-bold text-red-500 font-mono relative"
              >
                404
              </motion.div>
              <div className="absolute inset-0 text-9xl font-bold text-red-500/30 font-mono blur-sm">
                404
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="text-gradient">Page Not Found</span>
            </h2>
            
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you've ventured into uncharted digital territory. 
              Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium overflow-hidden shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group relative inline-flex items-center px-8 py-4 border border-red-500/20 rounded-lg text-white font-medium overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-20">
            <Code2 className="w-24 h-24 text-red-500" />
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-20">
            <Binary className="w-24 h-24 text-red-500" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;