interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
}

export const team: TeamMember[] = [
  {
    name: 'Pascal Ledesma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
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
