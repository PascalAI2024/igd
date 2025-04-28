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
    image: '/team/pascal.jpg',
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
  }
];

export default team;
