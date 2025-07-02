import React from 'react';
import { motion } from 'framer-motion';
import { Cookie as CookieIcon, ArrowUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ExpandableSection from '../components/ExpandableSection';
import ReadingProgress from '../components/ReadingProgress';

const Cookie = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <ReadingProgress />
      <div className="min-h-screen bg-black py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
            >
              <CookieIcon className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">Cookie Policy</span>
            </motion.div>

            <h1 className="text-4xl font-bold text-gradient mb-6">
              Cookie Policy
            </h1>
            <p className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies</h2>
              <p className="text-gray-400">
                Cookies are small text files that are placed on your computer or mobile device when 
                you visit our website. They are widely used to make websites work more efficiently 
                and provide useful information to website owners.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>To provide essential website functionality</li>
                  <li>To remember your preferences</li>
                  <li>To analyze how you use our website</li>
                  <li>To improve our services</li>
                  <li>To personalize your experience</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                  <p className="text-gray-400">
                    These cookies are necessary for the website to function properly. They enable 
                    core functionality such as security, network management, and accessibility.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p className="text-gray-400">
                    These cookies help us understand how visitors interact with our website by 
                    collecting and reporting information anonymously.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Functional Cookies</h3>
                  <p className="text-gray-400">
                    These cookies enable enhanced functionality and personalization, such as 
                    remembering your preferences and settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Marketing Cookies</h3>
                  <p className="text-gray-400">
                    These cookies track your online activity to help advertisers deliver more 
                    relevant advertising or to limit how many times you see an ad.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
              <p className="text-gray-400">
                Most web browsers allow you to control cookies through their settings preferences. 
                However, if you limit the ability of websites to set cookies, you may impact your 
                overall user experience. To learn more about cookies and how to manage them, 
                visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" 
                className="text-red-500 hover:text-red-400">aboutcookies.org</a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-400">
                We may update our Cookie Policy from time to time. We will notify you of any 
                changes by posting the new Cookie Policy on this page and updating the "Last 
                updated" date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">
                If you have any questions about our Cookie Policy, please contact us at:
              </p>
              <div className="mt-4 text-gray-400">
                <p>Email: pascal@ingeniousdigital.com</p>
                <p>Phone: (954) 515-8586</p>
                <p>Address: Fort Lauderdale, FL 33304</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cookie;
