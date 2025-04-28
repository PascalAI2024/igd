import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layout, Palette, Server, Database, ChevronRight } from 'lucide-react';

interface CodeExample {
  language: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  code: string;
  color: string;
}

interface CodeShowcaseProps {
  title: string;
  description: string;
  animationDelay?: number;
}

const CodeShowcase: React.FC<CodeShowcaseProps> = ({
  title,
  description,
  animationDelay = 0.3
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedCode, setTypedCode] = useState('');
  
  const codeExamples: CodeExample[] = [
    {
      language: 'html',
      icon: <Layout className="w-5 h-5" />,
      title: 'Semantic HTML',
      description: 'Clean, accessible markup for better SEO and user experience',
      color: '#E34F26',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Local Business Website</title>
  <meta name="description" content="Your trusted local business serving the community">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/" class="logo">
        <img src="logo.svg" alt="Company Name" width="150" height="50">
      </a>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>Welcome to Our Business</h1>
      <p>Serving the local community since 2010</p>
      <a href="/contact" class="cta-button">Get in Touch</a>
    </section>
    
    <!-- More semantic sections -->
  </main>

  <footer>
    <!-- Footer content -->
  </footer>
</body>
</html>`
    },
    {
      language: 'css',
      icon: <Palette className="w-5 h-5" />,
      title: 'Responsive CSS',
      description: 'Mobile-first design that looks great on all devices',
      color: '#264DE4',
      code: `/* Mobile-first approach */
:root {
  --primary-color: #e63946;
  --secondary-color: #457b9d;
  --dark-color: #1d3557;
  --light-color: #f1faee;
}

/* Base styles (mobile) */
.container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

.hero {
  padding: 3rem 1rem;
  text-align: center;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
              url('hero-bg.jpg') center/cover;
  color: var(--light-color);
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #c1121f;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  
  .hero {
    padding: 5rem 2rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
  
  .hero {
    padding: 7rem 2rem;
    text-align: left;
  }
}`
    },
    {
      language: 'javascript',
      icon: <Code className="w-5 h-5" />,
      title: 'Modern JavaScript',
      description: 'Interactive features with clean, efficient code',
      color: '#F7DF1E',
      code: `// Navigation menu with smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Smooth scrolling for anchor links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Intersection Observer for scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
});`
    },
    {
      language: 'react',
      icon: <Code className="w-5 h-5" />,
      title: 'React Components',
      description: 'Reusable UI components for modern web applications',
      color: '#61DAFB',
      code: `import React, { useState, useEffect } from 'react';

// Testimonial Carousel Component
const TestimonialCarousel = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);
  
  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="testimonial-carousel">
      <div className="testimonial-container">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={\`testimonial \${index === activeIndex ? 'active' : ''}\`}
          >
            <div className="testimonial-content">
              <p className="quote">{testimonial.quote}</p>
              <div className="author">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="avatar" 
                />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="controls">
        <button 
          className="prev-button" 
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          &larr;
        </button>
        <div className="indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={\`indicator \${index === activeIndex ? 'active' : ''}\`}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIndex(index);
              }}
              aria-label={\`Go to testimonial \${index + 1}\`}
            />
          ))}
        </div>
        <button 
          className="next-button" 
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;`
    },
    {
      language: 'node',
      icon: <Server className="w-5 h-5" />,
      title: 'Node.js Backend',
      description: 'Scalable server-side solutions for your business',
      color: '#68A063',
      code: `// Contact form API endpoint with validation and email sending
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Contact form endpoint with validation
router.post(
  '/contact',
  [
    // Validate inputs
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').optional({ checkFalsy: true })
      .isMobilePhone().withMessage('Valid phone number is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
      .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;

    try {
      // Send email
      await transporter.sendMail({
        from: \`"Website Contact" <\${process.env.SMTP_USER}>\`,
        to: process.env.CONTACT_EMAIL,
        subject: \`New Contact Form Submission from \${name}\`,
        text: \`
          Name: \${name}
          Email: \${email}
          Phone: \${phone || 'Not provided'}
          
          Message:
          \${message}
        \`,
        html: \`
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> \${name}</p>
          <p><strong>Email:</strong> \${email}</p>
          <p><strong>Phone:</strong> \${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>\${message.replace(/\\n/g, '<br>')}</p>
        \`
      });

      // Send confirmation email to user
      await transporter.sendMail({
        from: \`"Your Business Name" <\${process.env.SMTP_USER}>\`,
        to: email,
        subject: 'Thank you for contacting us',
        text: \`
          Dear \${name},
          
          Thank you for contacting us. We have received your message and will get back to you shortly.
          
          Best regards,
          Your Business Team
        \`,
        html: \`
          <h2>Thank you for contacting us</h2>
          <p>Dear \${name},</p>
          <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
          <p>Best regards,<br>Your Business Team</p>
        \`
      });

      res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  }
);

module.exports = router;`
    }
  ];
  
  // Simulate typing effect
  const startTypingAnimation = () => {
    setIsTyping(true);
    setTypedCode('');
    
    const code = codeExamples[activeTab].code;
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex < code.length) {
        setTypedCode(code.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextCharacter, Math.random() * 10 + 5); // Random typing speed
      } else {
        setIsTyping(false);
      }
    };
    
    typeNextCharacter();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      {/* Code Tabs */}
      <div className="flex overflow-x-auto mb-4 pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {codeExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(index);
              setTypedCode('');
              setIsTyping(false);
            }}
            className={`flex items-center px-4 py-2 rounded-t-lg mr-2 transition-colors ${
              activeTab === index 
                ? 'bg-gray-800 text-white border-t-2' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800/50'
            }`}
            style={{ 
              borderColor: activeTab === index ? codeExamples[activeTab].color : 'transparent' 
            }}
          >
            <span className="mr-2">{example.icon}</span>
            <span>{example.title}</span>
          </button>
        ))}
      </div>
      
      {/* Code Example Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold" style={{ color: codeExamples[activeTab].color }}>
            {codeExamples[activeTab].title}
          </h4>
          <p className="text-sm text-gray-400">{codeExamples[activeTab].description}</p>
        </div>
        
        <button
          onClick={startTypingAnimation}
          disabled={isTyping}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            isTyping 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {isTyping ? 'Typing...' : 'Run Demo'}
        </button>
      </div>
      
      {/* Code Display */}
      <div className="relative">
        <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm font-mono">
          <code className={`language-${codeExamples[activeTab].language}`}>
            {isTyping || typedCode ? typedCode : codeExamples[activeTab].code}
          </code>
        </pre>
        
        {/* Cursor */}
        {isTyping && (
          <span className="absolute inline-block w-2 h-5 bg-white/70 animate-blink" />
        )}
      </div>
    </motion.div>
  );
};

export default CodeShowcase;
