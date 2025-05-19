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

// Small business focused blog posts
import { post as smallBusinessSeoPost } from './small-business-seo-basics';
import { post as smallBusinessAiToolsPost } from './small-business-ai-tools';
import { post as smallBusinessWebsitePost } from './small-business-website-essentials';
import { post as smallBusinessSocialMediaPost } from './small-business-social-media-strategy';
import { post as smallBusinessEmailPost } from './small-business-email-marketing';
import { post as smallBusinessCloudPost } from './small-business-cloud-solutions';
import { post as smallBusinessCybersecurityPost } from './small-business-cybersecurity';
import { post as smallBusinessAutomationPost } from './small-business-automation';
import { post as smallBusinessCrmPost } from './small-business-crm-guide';
import { post as smallBusinessContentPost } from './small-business-content-marketing';
import { post as smallBusinessAnalyticsPost } from './small-business-analytics';
import { post as smallBusinessDigitalTransformationPost } from './small-business-digital-transformation';

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
  businessAutomationPost,
  // Add small business focused blog posts
  smallBusinessSeoPost,
  smallBusinessAiToolsPost,
  smallBusinessWebsitePost,
  smallBusinessSocialMediaPost,
  smallBusinessEmailPost,
  smallBusinessCloudPost,
  smallBusinessCybersecurityPost,
  smallBusinessAutomationPost,
  smallBusinessCrmPost,
  smallBusinessContentPost,
  smallBusinessAnalyticsPost,
  smallBusinessDigitalTransformationPost
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default allBlogPosts;
