import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Lightbulb, Users, Target } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import TeamMember from '../components/TeamMember';
import { team } from '../data/team';

const values = [
  {
    icon: Code2,
    title: 'Technical Excellence',
    description: 'We maintain the highest standards in software development and technological innovation.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Constantly exploring new technologies and approaches to solve complex challenges.'
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'Building lasting relationships through collaboration and shared success.'
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Focused on delivering measurable impact and value for our clients.'
  }
];

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gradient">
                Passionate About Technology
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                We're not just developers – we're technology enthusiasts who live and breathe innovation. 
                Our mission is to transform businesses through cutting-edge digital solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-4">Our Values</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Guided by our commitment to excellence and innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <value.icon className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-4">Our Team</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Meet the innovators and problem solvers behind Ingenious Digital
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {team.map((member, index) => (
                <TeamMember key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 sm:p-12 backdrop-blur-sm border border-red-500/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-6">Our Mission</h2>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                  To empower businesses through innovative digital solutions, combining our passion 
                  for technology with expertise to create transformative experiences that drive 
                  success in the digital age.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;