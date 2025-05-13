interface TeamMember {
  name: string;
  role: string;
  icon: string;
  bio: string;
  skills: string[];
  color?: string;
}

export const team: TeamMember[] = [
  {
    name: 'Pascal Ledesma',
    role: 'Founder & CEO',
    icon: 'founder',
    color: 'from-red-500 to-orange-500',
    bio: 'Tech enthusiast and digital transformation expert with extensive experience in web development, digital marketing, and enterprise solutions. Passionate about helping businesses leverage technology to achieve their goals.',
    skills: [
      'Digital Strategy',
      'Web Development',
      'Digital Marketing',
      'SEO',
      'Cloud Architecture',
      'Enterprise Solutions',
      'Business Development',
      'UI/UX Design'
    ]
  },
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    icon: 'marketing',
    color: 'from-purple-500 to-pink-500',
    bio: 'Digital marketing specialist with over 10 years of experience in creating and executing successful marketing campaigns for businesses of all sizes. Expert in SEO, content marketing, and social media strategy.',
    skills: [
      'SEO Strategy',
      'Content Marketing',
      'Social Media',
      'Email Campaigns',
      'Analytics',
      'PPC Advertising',
      'Marketing Automation',
      'Brand Development'
    ]
  },
  {
    name: 'Michael Chen',
    role: 'Lead Developer',
    icon: 'developer',
    color: 'from-blue-500 to-cyan-500',
    bio: 'Full-stack developer with a passion for creating elegant, efficient solutions to complex problems. Specializes in modern web technologies and has led development on numerous successful projects.',
    skills: [
      'React',
      'Node.js',
      'TypeScript',
      'AWS',
      'Database Design',
      'API Development',
      'Performance Optimization',
      'DevOps'
    ]
  },
  {
    name: 'Jessica Rodriguez',
    role: 'AI & ML Specialist',
    icon: 'ai',
    color: 'from-green-500 to-emerald-500',
    bio: 'AI and machine learning expert with a background in data science. Helps businesses implement intelligent automation solutions that drive efficiency and provide valuable insights from complex data.',
    skills: [
      'Machine Learning',
      'Data Analysis',
      'Python',
      'TensorFlow',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'Business Intelligence'
    ]
  }
];

export default team;
