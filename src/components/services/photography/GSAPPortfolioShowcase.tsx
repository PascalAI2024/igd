import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2, X } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  client?: string;
  year?: string;
  tags: string[];
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Luxury Product Showcase",
    category: "Product Photography",
    image: "/images/case-studies/erp-platform.webp",
    description: "Premium product photography featuring elegant lighting and composition for high-end retail.",
    client: "Luxe Brands",
    year: "2024",
    tags: ["Product", "Studio", "Commercial"]
  },
  {
    id: 2,
    title: "Executive Portraits",
    category: "Corporate Photography",
    image: "/images/testimonials/client1.webp",
    description: "Professional headshots capturing leadership presence and brand personality.",
    client: "Fortune 500",
    year: "2024",
    tags: ["Corporate", "Portraits", "Branding"]
  },
  {
    id: 3,
    title: "Modern Architecture",
    category: "Real Estate Photography",
    image: "/images/case-studies/healthcare-platform.webp",
    description: "Stunning architectural photography showcasing modern design and space.",
    client: "Premier Properties",
    year: "2024",
    tags: ["Architecture", "Real Estate", "HDR"]
  },
  {
    id: 4,
    title: "Culinary Artistry",
    category: "Food Photography",
    image: "/images/case-studies/new/restaurant.webp",
    description: "Appetizing food photography that captures flavor and presentation.",
    client: "Michelin Restaurant",
    year: "2023",
    tags: ["Food", "Restaurant", "Editorial"]
  },
  {
    id: 5,
    title: "Tech Conference",
    category: "Event Photography",
    image: "/images/case-studies/new/ecommerce.webp",
    description: "Dynamic event coverage capturing energy and key moments.",
    client: "Tech Summit 2023",
    year: "2023",
    tags: ["Events", "Corporate", "Documentary"]
  },
  {
    id: 6,
    title: "Retail Experience",
    category: "Commercial Photography",
    image: "/images/case-studies/fintech-platform.webp",
    description: "Comprehensive retail photography showcasing brand experience.",
    client: "Retail Chain",
    year: "2023",
    tags: ["Retail", "Commercial", "Lifestyle"]
  }
];

const GSAPPortfolioShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(portfolioData.map(item => item.category)))];

  // Initialize GSAP animations
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        {
          opacity: 0,
          scale: 0.8,
          rotationY: -30,
          transformOrigin: 'center center',
          transformPerspective: 1000
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "random",
            ease: "power2.out"
          },
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animations for each item
      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const image = item.querySelector('.portfolio-image');
        const overlay = item.querySelector('.portfolio-overlay');
        const content = item.querySelector('.portfolio-content');
        const tags = item.querySelectorAll('.portfolio-tag');

        // Create hover timeline
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out"
          })
          .to(overlay, {
            opacity: 0.9,
            duration: 0.3
          }, 0)
          .fromTo(content, {
            y: 20,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          }, 0.1)
          .fromTo(tags, {
            y: 10,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.out"
          }, 0.2);

        // Add magnetic effect
        const handleMouseMove = (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(item, {
            x: x * 0.1,
            y: y * 0.1,
            rotationY: x * 0.05,
            rotationX: -y * 0.05,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseEnter = () => {
          hoverTl.play();
          setHoveredId(portfolioData[index].id);
          item.addEventListener('mousemove', handleMouseMove);
        };

        const handleMouseLeave = () => {
          hoverTl.reverse();
          setHoveredId(null);
          item.removeEventListener('mousemove', handleMouseMove);
          
          gsap.to(item, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        item.addEventListener('mouseenter', handleMouseEnter);
        item.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup
        return () => {
          item.removeEventListener('mouseenter', handleMouseEnter);
          item.removeEventListener('mouseleave', handleMouseLeave);
          item.removeEventListener('mousemove', handleMouseMove);
        };
      });

      // Parallax effect on scroll
      gsap.to('.portfolio-bg-gradient', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filter]);

  // Filter animation
  const handleFilter = (category: string) => {
    if (category === filter) return;

    const tl = gsap.timeline();
    
    // Animate items out
    tl.to(itemRefs.current.filter(Boolean), {
      opacity: 0,
      scale: 0.8,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setFilter(category);
      }
    });
  };

  // Filtered items
  const filteredItems = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  return (
    <div ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Background gradient with parallax */}
      <div className="portfolio-bg-gradient absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gradient mb-4"
          >
            Portfolio Showcase
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            Explore our award-winning photography work
          </motion.p>
        </div>

        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === category 
                  ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }
              `}
            >
              {category === 'all' ? 'All Work' : category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                ref={el => itemRefs.current[index] = el}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="portfolio-item relative group cursor-pointer overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="portfolio-image w-full h-full object-cover transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="portfolio-content absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="portfolio-tag px-3 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                {hoveredId === item.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="/contact"
            className="magnetic-target inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
          >
            Let's Create Together
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Modal for selected item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-4xl w-full bg-black/90 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h3>
                  <p className="text-lg text-red-500 mb-4">{selectedItem.category}</p>
                  <p className="text-gray-300 mb-6">{selectedItem.description}</p>
                  
                  {(selectedItem.client || selectedItem.year) && (
                    <div className="mb-6">
                      {selectedItem.client && (
                        <p className="text-sm text-gray-400">
                          <span className="font-semibold">Client:</span> {selectedItem.client}
                        </p>
                      )}
                      {selectedItem.year && (
                        <p className="text-sm text-gray-400">
                          <span className="font-semibold">Year:</span> {selectedItem.year}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm rounded-full text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GSAPPortfolioShowcase;