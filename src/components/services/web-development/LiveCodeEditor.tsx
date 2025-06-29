import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Eye, Smartphone, Monitor, Tablet, Copy, Check } from 'lucide-react';

interface LiveCodeEditorProps {
  title?: string;
  description?: string;
}

const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  title = "Live Code Editor",
  description = "See our development skills in action - edit the code and watch it update in real-time!"
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [code, setCode] = useState({
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Business Website</title>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="logo">Your Business</h1>
            <nav class="nav">
                <a href="#home">Home</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    </header>
    
    <main class="hero">
        <div class="container">
            <h2 class="hero-title">Welcome to Our Business</h2>
            <p class="hero-subtitle">Professional services you can trust</p>
            <button class="cta-button" onclick="showAlert()">Get Started</button>
        </div>
    </main>
    
    <section class="features">
        <div class="container">
            <div class="feature-grid">
                <div class="feature-card">
                    <h3>Quality Service</h3>
                    <p>We deliver exceptional results</p>
                </div>
                <div class="feature-card">
                    <h3>Expert Team</h3>
                    <p>Experienced professionals</p>
                </div>
                <div class="feature-card">
                    <h3>24/7 Support</h3>
                    <p>Always here when you need us</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
}

.nav {
    display: flex;
    gap: 2rem;
}

.nav a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav a:hover {
    opacity: 0.8;
}

.hero {
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), 
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><rect fill="%23f0f0f0" width="1000" height="600"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="40" fill="%23999">Hero Background</text></svg>');
    background-size: cover;
    background-position: center;
    color: white;
    padding: 6rem 0;
    text-align: center;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    animation: fadeInUp 1s ease-out 0.2s both;
}

.cta-button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-button:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.features {
    padding: 4rem 0;
    background: #f8f9fa;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-card h3 {
    color: #667eea;
    margin-bottom: 1rem;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .header .container {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
}`,
    js: `function showAlert() {
    alert('Welcome! This is a live demo of our web development capabilities.');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add a subtle click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show a demo message
            setTimeout(() => {
                alert('Navigation clicked! In a real site, this would scroll to the ' + this.textContent + ' section.');
            }, 200);
        });
    });
    
    // Add some interactive effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.style.color = 'white';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            this.style.color = '#333';
        });
    });
    
    // Demo: Dynamic content update
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            subtitle.textContent = 'This content updated dynamically with JavaScript!';
        }
    }, 3000);
});`
  });

  const updatePreview = () => {
    if (!iframeRef.current) return;

    const fullCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Live Preview</title>
          <style>${code.css}</style>
      </head>
      <body>
          ${code.html.replace(/<html[^>]*>|<\/html>|<head[^>]*>[\s\S]*?<\/head>|<!DOCTYPE[^>]*>/gi, '')}
          <script>${code.js}</script>
      </body>
      </html>
    `;

    const iframe = iframeRef.current;
    iframe.srcdoc = fullCode;
  };

  useEffect(() => {
    updatePreview();
  }, [code]);

  const handleCodeChange = (value: string) => {
    setCode(prev => ({
      ...prev,
      [activeTab]: value
    }));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile': return 'w-80 h-96';
      case 'tablet': return 'w-96 h-80';
      default: return 'w-full h-96';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex space-x-2">
            {(['html', 'css', 'js'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-gray-800 text-white border-b-2 border-red-500'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
            <button
              onClick={copyCode}
              className="ml-auto px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Code Input */}
          <textarea
            value={code[activeTab]}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-80 bg-gray-900 text-white p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="space-y-4">
          {/* Viewport Controls */}
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">Live Preview</h4>
            <div className="flex space-x-2">
              {[
                { mode: 'desktop', icon: Monitor },
                { mode: 'tablet', icon: Tablet },
                { mode: 'mobile', icon: Smartphone }
              ].map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === mode
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Preview Frame */}
          <div className="flex justify-center">
            <div className={`${getViewportClass()} border border-gray-700 rounded-lg overflow-hidden bg-white`}>
              <iframe
                ref={iframeRef}
                className="w-full h-full"
                title="Live Preview"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🚀 This is what we build:</strong> Interactive, responsive websites with clean code, 
          modern design, and seamless functionality. Try editing the code above to see real-time changes!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveCodeEditor;
