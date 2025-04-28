import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Target, Users,
  CheckCircle, Star,
  BarChart2, Zap, Globe
} from 'lucide-react';
import LeadCaptureForm from '../components/LeadCaptureForm';
import MetaTags from '../components/MetaTags';

const Landing = () => {
  const stats = [
    { value: '300+', label: 'Local Businesses', icon: Users },
    { value: '95%', label: 'Client Retention', icon: Target },
    { value: '3X', label: 'Average Growth', icon: TrendingUp }
  ];

  const benefits = [
    {
      title: 'Dominate Local Search',
      description: 'Rank higher on Google and capture more local customers.',
      icon: Globe
    },
    {
      title: 'Increase Revenue',
      description: 'Convert more leads into paying customers.',
      icon: BarChart2
    },
    {
      title: 'Save Time',
      description: 'Automate your marketing and focus on running your business.',
      icon: Zap
    }
  ];

  const testimonials = [
    {
      quote: "Our business has grown 3x since working with them. Best investment we've made.",
      author: "Robert",
      role: "Owner, Wellness Medical Center",
      rating: 5
    },
    {
      quote: "They helped us dominate local search and now we're booked months in advance.",
      author: "Maria",
      role: "Director, Family Treasures Retail",
      rating: 5
    },
    {
      quote: "Professional, responsive, and they deliver results. Highly recommended.",
      author: "David",
      role: "Owner, Premier Properties",
      rating: 5
    }
  ];

  const features = [
    'Local SEO Optimization',
    'Google Business Profile Management',
    'Social Media Marketing',
    'Review Management',
    'Lead Generation',
    'Marketing Automation'
  ];

  return (
    <>
      <MetaTags
        title="Grow Your Local Business | Digital Marketing That Works"
        description="Get more customers, increase revenue, and save time with our proven digital marketing solutions. Book your free strategy call today."
        type="website"
      />

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-gradient mb-6"
              >
                Grow Your Local Business with Digital Marketing That Works
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-300 mb-12"
              >
                Get more customers, increase revenue, and save time with our proven digital marketing solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <a
                  href="#get-started"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25 text-lg font-semibold"
                >
                  Get Your Free Strategy Call
                </a>
                <a
                  href="#learn-more"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all duration-300 text-lg font-semibold"
                >
                  Learn More
                </a>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We help local businesses like yours grow with proven digital marketing strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <benefit.icon className="w-12 h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Join hundreds of satisfied local businesses who trust us with their digital marketing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our comprehensive digital marketing solution includes everything you need to grow your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="get-started" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Ready to Grow Your Business?
                </h2>
                <p className="text-xl text-gray-300">
                  Book your free strategy call today and discover how we can help you get more customers.
                </p>
              </div>

              <LeadCaptureForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing;
