import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Palette, 
  BarChart3, 
  Users, 
  Zap, 
  Star,
  Award,
  Coffee,
  Heart,
  Target,
  Lightbulb,
  Rocket
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
  experience: string;
  projects: number;
  specialty: string;
  quote: string;
  achievements: string[];
}

const InteractiveTeamShowcase: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 'ceo-founder',
      name: 'Pascal Ledesma',
      role: 'CEO & Founder',
      icon: Rocket,
      color: 'bg-red-500',
      skills: ['Digital Strategy', 'Web Development', 'Digital Marketing', 'SEO', 'Business Development'],
      experience: '15+ years',
      projects: 300,
      specialty: 'Digital Transformation & Strategic Leadership',
      quote: 'Technology should empower businesses, not complicate them.',
      achievements: ['Founded Ingenious Digital', 'Transformed 100+ businesses', 'Digital innovation leader']
    },
    {
      id: 'lead-dev',
      name: 'Alex Chen',
      role: 'Lead Developer',
      icon: Code,
      color: 'bg-blue-500',
      skills: ['React', 'Node.js', 'Python', 'AI/ML', 'Cloud Architecture'],
      experience: '8+ years',
      projects: 150,
      specialty: 'Full-Stack Development & AI Integration',
      quote: 'Code is poetry in motion - every line should tell a story.',
      achievements: ['Led 50+ successful projects', 'AI innovation award', 'Open source contributor']
    },
    {
      id: 'ui-designer',
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      icon: Palette,
      color: 'bg-purple-500',
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'],
      experience: '6+ years',
      projects: 120,
      specialty: 'User Experience & Interface Design',
      quote: 'Great design is invisible - it just works beautifully.',
      achievements: ['Design excellence award', 'UX certification', '95% user satisfaction rate']
    },
    {
      id: 'data-analyst',
      name: 'Michael Rodriguez',
      role: 'Data Analyst',
      icon: BarChart3,
      color: 'bg-green-500',
      skills: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'Statistical Analysis'],
      experience: '7+ years',
      projects: 100,
      specialty: 'Data Science & Business Intelligence',
      quote: 'Data tells stories - I help businesses listen.',
      achievements: ['Analytics optimization expert', 'ROI improvement specialist', 'Data visualization master']
    },
    {
      id: 'project-manager',
      name: 'Emily Davis',
      role: 'Project Manager',
      icon: Users,
      color: 'bg-orange-500',
      skills: ['Agile', 'Scrum', 'Team Leadership', 'Client Relations', 'Process Optimization'],
      experience: '9+ years',
      projects: 200,
      specialty: 'Project Delivery & Team Coordination',
      quote: 'Success is a team sport - I help everyone win.',
      achievements: ['100% on-time delivery', 'Team leadership excellence', 'Client satisfaction champion']
    },
    {
      id: 'automation-specialist',
      name: 'David Kim',
      role: 'Automation Specialist',
      icon: Zap,
      color: 'bg-yellow-500',
      skills: ['Process Automation', 'RPA', 'Workflow Design', 'Integration', 'Optimization'],
      experience: '5+ years',
      projects: 80,
      specialty: 'Business Process Automation',
      quote: 'Why do manually what machines can do better?',
      achievements: ['Automation innovation award', '80% efficiency improvements', 'Process optimization expert']
    },
    {
      id: 'quality-assurance',
      name: 'Lisa Wang',
      role: 'Quality Assurance',
      icon: Star,
      color: 'bg-red-500',
      skills: ['Testing Automation', 'Quality Control', 'Bug Detection', 'Performance Testing', 'Security'],
      experience: '6+ years',
      projects: 180,
      specialty: 'Quality Assurance & Testing',
      quote: 'Quality is not an act, it is a habit.',
      achievements: ['Zero critical bugs record', 'Testing excellence award', '99.9% quality rate']
    }
  ];

  const selectedTeamMember = teamMembers.find(member => member.id === selectedMember);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">👥 Meet Our Expert Team</h3>
        <p className="text-gray-400">Interactive team showcase - hover and click to learn more about our experts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredMember(member.id)}
                onHoverEnd={() => setHoveredMember(null)}
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                className={`relative cursor-pointer group ${
                  selectedMember === member.id ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <div className="bg-black/30 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                  {/* Background glow */}
                  <div className={`absolute inset-0 ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Member Icon */}
                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-3 relative`}>
                      <member.icon className="w-8 h-8 text-white" />
                      {hoveredMember === member.id && (
                        <motion.div
                          className="absolute inset-0 border-2 border-white rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                    
                    <h4 className="text-white font-semibold text-sm mb-1">{member.name}</h4>
                    <p className="text-gray-400 text-xs mb-2">{member.role}</p>
                    
                    {/* Quick Stats */}
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">{member.experience}</span>
                      <span className="text-red-400">{member.projects}+ projects</span>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedMember === member.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Team Members', value: '7+', icon: Users },
              { label: 'Combined Experience', value: '55+ years', icon: Award },
              { label: 'Projects Delivered', value: '1130+', icon: Rocket },
              { label: 'Client Satisfaction', value: '98%', icon: Heart }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-black/30 border border-white/10 rounded-lg p-3 text-center"
              >
                <stat.icon className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-white font-bold">{stat.value}</p>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Member Details */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 h-full">
            <AnimatePresence mode="wait">
              {selectedTeamMember ? (
                <motion.div
                  key={selectedTeamMember.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Header */}
                  <div className="text-center">
                    <div className={`w-20 h-20 ${selectedTeamMember.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <selectedTeamMember.icon className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-white font-bold text-lg">{selectedTeamMember.name}</h4>
                    <p className="text-gray-400">{selectedTeamMember.role}</p>
                  </div>

                  {/* Quote */}
                  <div className="bg-white/5 p-3 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-300 text-sm italic">"{selectedTeamMember.quote}"</p>
                  </div>

                  {/* Specialty */}
                  <div>
                    <h5 className="text-white font-semibold mb-2">Specialty</h5>
                    <p className="text-gray-400 text-sm">{selectedTeamMember.specialty}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h5 className="text-white font-semibold mb-2">Skills</h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedTeamMember.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="text-white font-semibold mb-2">Achievements</h5>
                    <div className="space-y-1">
                      {selectedTeamMember.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          <span className="text-gray-400 text-xs">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <Coffee className="w-12 h-12 text-gray-500 mb-4" />
                  <h4 className="text-white font-semibold mb-2">Meet Our Team</h4>
                  <p className="text-gray-400 text-sm">Click on any team member to learn more about their expertise and achievements.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">👥 Our Team:</strong> Each member brings unique expertise and passion to deliver 
          exceptional results. Click on team members to explore their skills and achievements!
        </p>
      </div>
    </motion.div>
  );
};

export default InteractiveTeamShowcase;
