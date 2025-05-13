import { BlogPost } from '../types';

// Import all blog posts
import { posts as aiPosts } from './ai-ml';
import { posts as securityPosts } from './security';
import { post as cloudPost } from './cloud-computing';
import { post as devPost } from './software-development';
import { post as transformationPost } from './digital-transformation';
import { post as marketingTrendsPost } from './digital-marketing-trends';
import { post as seoPost } from './seo-strategies';
import { post as webDevPost } from './web-development-best-practices';

// New SEO-focused blog posts
import { post as localSeoPost } from './local-seo-strategies';
import { post as aiMarketingPost } from './ai-powered-marketing';
import { post as mobileOptimizationPost } from './mobile-optimization';
import { post as contentStrategyPost } from './content-strategy';
import { post as businessAutomationPost } from './business-automation';

// Combine all posts and sort by date
export const allBlogPosts: BlogPost[] = [
  ...aiPosts,
  ...securityPosts,
  cloudPost,
  devPost,
  transformationPost,
  marketingTrendsPost,
  seoPost,
  webDevPost,
  // Add new SEO-focused blog posts
  localSeoPost,
  aiMarketingPost,
  mobileOptimizationPost,
  contentStrategyPost,
  businessAutomationPost
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default allBlogPosts;
