import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import NavigationButton from './NavigationButton';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/ingeniousdigital' },
    { icon: Twitter, href: 'https://twitter.com/ingeniousdigital' },
    { icon: Linkedin, href: 'https://linkedin.com/company/ingeniousdigital' },
    { icon: Instagram, href: 'https://instagram.com/ingeniousdigital' }
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
        { name: 'Digital Marketing', href: '/services/digital-marketing' },
        { name: 'Lead Generation', href: '/services/lead-generation' },
        { name: 'CRM Solutions', href: '/services/crm' },
        { name: 'Web Development', href: '/services/web-development' },
        { name: 'System Integration', href: '/services/system-integration' },
        { name: 'Photography', href: '/services/photography' },
        { name: 'Videography', href: '/services/videography' }
      ]
    },
    {
      title: 'Industries',
      links: [
        { name: 'Local Retail', href: '/industries/local-retail' },
        { name: 'Restaurants', href: '/industries/restaurants' },
        { name: 'Local Services', href: '/industries/local-services' },
        { name: 'Healthcare', href: '/industries/healthcare' },
        { name: 'Auto Services', href: '/industries/auto-services' },
        { name: 'Manufacturing', href: '/industries/manufacturing' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookie' },
        { name: 'GDPR', href: '/gdpr' }
      ]
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Logo and Description */}
          <div>
            <NavigationButton to="/" className="inline-block mb-6">
              <div className="flex items-center space-x-3">
                {/* Logo */}
                <div className="w-10 h-10">
                  <img
                    src="/iconlogo.png"
                    alt="Ingenious Digital Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Company Name */}
                <div>
                  <div className="text-2xl font-bold">
                    <span className="text-[#ff3d3d]">Ingenious</span>
                    <span className="text-white">Digital</span>
                  </div>
                </div>
              </div>
            </NavigationButton>
            <p className="text-gray-400 max-w-md">
              Digital solutions for local businesses. Transform your business with our
              cutting-edge technology and expertise in digital marketing, lead generation,
              and business automation.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-[#ff3d3d] transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4 text-gray-400">
              <p>Email: pascal@ingeniousdigital.com</p>
              <p>Phone: (954) 515-8586</p>
              <p>Address: Fort Lauderdale, FL 33304</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <NavigationButton
                      to={link.href}
                      className="text-gray-400 hover:text-[#ff3d3d] transition-colors"
                    >
                      {link.name}
                    </NavigationButton>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ingenious Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
