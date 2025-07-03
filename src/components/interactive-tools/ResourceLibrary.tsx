import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  Mail, 
  Lock,
  BookOpen,
  TrendingUp,
  Users,
  BarChart,
  Target,
  Zap,
  Search,
  Filter
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'guide' | 'checklist' | 'template' | 'ebook';
  pages?: number;
  downloadCount: number;
  icon: React.ReactNode;
  gated: boolean;
  fileSize?: string;
}

interface DownloadFormData {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  subscribe: boolean;
}

const ResourceLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [downloadedResources, setDownloadedResources] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<DownloadFormData>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    subscribe: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Ultimate SEO Guide 2024',
      description: 'Complete guide to dominating search rankings with latest Google algorithm updates',
      category: 'SEO',
      type: 'guide',
      pages: 45,
      downloadCount: 2847,
      icon: <TrendingUp className="w-8 h-8" />,
      gated: true,
      fileSize: '3.2 MB'
    },
    {
      id: '2',
      title: 'Social Media Content Calendar Template',
      description: '12-month planning template with post ideas and scheduling tips',
      category: 'Social Media',
      type: 'template',
      downloadCount: 1923,
      icon: <Users className="w-8 h-8" />,
      gated: true,
      fileSize: '1.5 MB'
    },
    {
      id: '3',
      title: 'Website Launch Checklist',
      description: '87-point checklist to ensure your website launches perfectly',
      category: 'Web Development',
      type: 'checklist',
      downloadCount: 1456,
      icon: <CheckCircle className="w-8 h-8" />,
      gated: false,
      fileSize: '0.8 MB'
    },
    {
      id: '4',
      title: 'Digital Marketing ROI Calculator',
      description: 'Excel template to calculate and track your marketing ROI',
      category: 'Analytics',
      type: 'template',
      downloadCount: 2103,
      icon: <BarChart className="w-8 h-8" />,
      gated: true,
      fileSize: '2.1 MB'
    },
    {
      id: '5',
      title: 'Email Marketing Best Practices',
      description: 'Comprehensive guide to creating high-converting email campaigns',
      category: 'Email Marketing',
      type: 'ebook',
      pages: 32,
      downloadCount: 1789,
      icon: <Mail className="w-8 h-8" />,
      gated: true,
      fileSize: '2.8 MB'
    },
    {
      id: '6',
      title: 'PPC Campaign Setup Guide',
      description: 'Step-by-step instructions for launching profitable PPC campaigns',
      category: 'Advertising',
      type: 'guide',
      pages: 28,
      downloadCount: 1234,
      icon: <Target className="w-8 h-8" />,
      gated: true,
      fileSize: '2.3 MB'
    },
    {
      id: '7',
      title: 'Business Automation Starter Kit',
      description: 'Templates and workflows to automate your business processes',
      category: 'Automation',
      type: 'template',
      downloadCount: 987,
      icon: <Zap className="w-8 h-8" />,
      gated: true,
      fileSize: '4.1 MB'
    },
    {
      id: '8',
      title: 'Content Strategy Workbook',
      description: 'Plan and execute a winning content strategy for your brand',
      category: 'Content Marketing',
      type: 'guide',
      pages: 36,
      downloadCount: 1567,
      icon: <BookOpen className="w-8 h-8" />,
      gated: true,
      fileSize: '3.5 MB'
    }
  ];

  const categories = ['all', ...new Set(resources.map(r => r.category))];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = async (resource: Resource) => {
    if (!resource.gated || downloadedResources.has(resource.id)) {
      // Direct download
      console.log(`Downloading ${resource.title}...`);
      // In a real app, this would trigger the actual download
      alert(`Download started: ${resource.title}`);
      return;
    }

    // Show gated form
    setSelectedResource(resource);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mark resource as downloaded
    setDownloadedResources(prev => new Set(prev).add(selectedResource!.id));
    
    // Trigger download
    console.log(`Downloading ${selectedResource!.title}...`);
    alert(`Thank you! Download started: ${selectedResource!.title}`);
    
    // Reset form
    setSelectedResource(null);
    setIsSubmitting(false);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      subscribe: true
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-700';
      case 'checklist': return 'bg-green-100 text-green-700';
      case 'template': return 'bg-purple-100 text-purple-700';
      case 'ebook': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Free Marketing Resources</h2>
        <p className="text-xl text-gray-600">Download guides, templates, and tools to grow your business</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatePresence>
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-blue-600">{resource.icon}</div>
                  {resource.gated && !downloadedResources.has(resource.id) && (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                  <span className="text-sm text-gray-500">{resource.category}</span>
                  {resource.pages && (
                    <span className="text-sm text-gray-500">{resource.pages} pages</span>
                  )}
                  {resource.fileSize && (
                    <span className="text-sm text-gray-500">{resource.fileSize}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    <Download className="w-4 h-4 inline mr-1" />
                    {resource.downloadCount.toLocaleString()} downloads
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(resource)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      downloadedResources.has(resource.id)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {downloadedResources.has(resource.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Gated Download Modal */}
      <AnimatePresence>
        {selectedResource && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Get Your Free Resource</h3>
                <p className="text-blue-100">
                  Fill out the form below to download "{selectedResource.title}"
                </p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="subscribe"
                    checked={formData.subscribe}
                    onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="subscribe" className="text-sm text-gray-600">
                    Yes, I'd like to receive marketing tips and resources via email
                  </label>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Processing...
                      </span>
                    ) : (
                      'Download Now'
                    )}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setSelectedResource(null)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Want Custom Resources for Your Business?</h3>
        <p className="text-lg mb-6">
          Our team can create personalized strategies and resources tailored to your specific needs
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          Get Custom Solutions
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ResourceLibrary;