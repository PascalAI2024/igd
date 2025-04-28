import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Users, Star, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const positions = [
  {
    title: 'Senior Full Stack Developer',
    type: 'Full-time',
    location: 'Fort Lauderdale, FL',
    department: 'Engineering',
    experience: '5+ years',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    description: 'Looking for an experienced full-stack developer to join our growing team.',
    responsibilities: [
      'Design and implement scalable web applications',
      'Work with cross-functional teams to deliver solutions',
      'Mentor junior developers',
      'Contribute to technical architecture decisions'
    ]
  },
  {
    title: 'AI/ML Engineer',
    type: 'Full-time',
    location: 'Fort Lauderdale, FL',
    department: 'AI & Innovation',
    experience: '3+ years',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
    description: 'Join our AI team to build next-generation intelligent solutions.',
    responsibilities: [
      'Develop and deploy ML models',
      'Work on computer vision and NLP projects',
      'Optimize model performance',
      'Research and implement new AI technologies'
    ]
  },
  {
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'Fort Lauderdale, FL',
    department: 'Infrastructure',
    experience: '4+ years',
    skills: ['AWS', 'Kubernetes', 'Docker', 'CI/CD', 'Terraform'],
    description: 'Help us build and maintain robust cloud infrastructure.',
    responsibilities: [
      'Manage cloud infrastructure',
      'Implement CI/CD pipelines',
      'Monitor system performance',
      'Ensure security best practices'
    ]
  }
];

const benefits = [
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Work-life balance with flexible scheduling'
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Collaborative and innovative environment'
  },
  {
    icon: Star,
    title: 'Growth',
    description: 'Career development and learning opportunities'
  }
];

const Careers = () => {
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
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Join Our Team
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Be part of a team that's shaping the future of technology. We're always looking for talented individuals who share our passion for innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">Why Join Us</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We offer more than just a job - we offer a career with growth opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <benefit.icon className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">Open Positions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our current opportunities and find your next role
              </p>
            </div>

            <div className="space-y-6">
              {positions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {position.type}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {position.department}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-red-500 transform group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-gray-300 mb-4">{position.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {position.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {position.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Careers;