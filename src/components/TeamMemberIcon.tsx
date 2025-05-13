import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Code, 
  Lightbulb, 
  Brain, 
  BarChart2, 
  Megaphone, 
  Palette, 
  Database, 
  LineChart, 
  LucideIcon 
} from 'lucide-react';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    icon: string;
    bio: string;
    skills: string[];
    color?: string;
  };
  index: number;
}

// Map of role keywords to icons
const roleIconMap: Record<string, LucideIcon> = {
  'ceo': Briefcase,
  'founder': Briefcase,
  'developer': Code,
  'engineer': Code,
  'marketing': Megaphone,
  'designer': Palette,
  'data': Database,
  'ai': Brain,
  'ml': Brain,
  'analytics': LineChart,
  'strategy': Lightbulb,
  'director': BarChart2,
  'specialist': User
};

// Function to determine the appropriate icon based on role
const getIconForRole = (role: string): LucideIcon => {
  const lowerRole = role.toLowerCase();
  
  for (const [keyword, icon] of Object.entries(roleIconMap)) {
    if (lowerRole.includes(keyword)) {
      return icon;
    }
  }
  
  return User; // Default icon
};

const TeamMemberIcon: React.FC<TeamMemberProps> = ({ member, index }) => {
  // Determine icon based on role if not explicitly provided
  const IconComponent = member.icon ? 
    roleIconMap[member.icon.toLowerCase()] || User : 
    getIconForRole(member.role);
  
  // Determine color based on role or use provided color
  const getColorClass = () => {
    if (member.color) return member.color;
    
    const role = member.role.toLowerCase();
    if (role.includes('founder') || role.includes('ceo')) return 'from-red-500 to-orange-500';
    if (role.includes('developer') || role.includes('engineer')) return 'from-blue-500 to-cyan-500';
    if (role.includes('marketing')) return 'from-purple-500 to-pink-500';
    if (role.includes('ai') || role.includes('ml')) return 'from-green-500 to-emerald-500';
    if (role.includes('design')) return 'from-yellow-500 to-amber-500';
    
    return 'from-red-500 to-purple-500'; // Default color
  };
  
  const colorClass = getColorClass();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card */}
      <div className="card-premium h-full">
        {/* Icon Container */}
        <div className="card-premium-header flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card-premium-content">
          <p className="text-gray-300 text-sm mb-4">{member.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-white/5 text-gray-300 rounded border border-white/5 hover:border-white/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={`absolute -inset-0.5 bg-gradient-to-r ${colorClass} rounded-xl opacity-0 blur-lg -z-10`}
        style={{ opacity: 0.2 }}
      />
    </motion.div>
  );
};

export default TeamMemberIcon;
