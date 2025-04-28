import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
    bio: string;
    skills: string[];
  };
  index: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card */}
      <div className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
                <User className="w-12 h-12 text-red-500/70" />
              </div>
            </div>
          ) : (
            <img
              src={member.image}
              alt={member.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
          <p className="text-red-500 text-sm mb-3">{member.role}</p>
          <p className="text-gray-400 text-sm mb-4">{member.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-white/5 text-gray-300 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg" />
    </motion.div>
  );
};

export default TeamMember;
