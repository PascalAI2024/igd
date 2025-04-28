export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  date: string;
  readTime: string;
  tags: string[];
  relatedPosts?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
}