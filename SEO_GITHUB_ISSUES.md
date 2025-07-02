# SEO Improvements - GitHub Issues to Create

## Issue 1: Implement Automated Schema.org Markup on All Service Pages

**Description:**
Currently, only the DigitalMarketing page uses the ServiceSchema component. All other service pages should also include structured data for better SEO.

**Tasks:**
- [ ] Add ServiceSchema to all service pages
- [ ] Add FAQSchema to relevant pages with Q&A content  
- [ ] Add BreadcrumbSchema to all pages for navigation structure
- [ ] Create a centralized configuration for schema data

**Pages Missing Schema Markup:**
- AdManagement.tsx
- LeadGeneration.tsx
- Photography.tsx
- SystemIntegration.tsx
- Videography.tsx
- Communication.tsx

## Issue 2: Add MetaTags to All Remaining Pages

**Description:**
Many pages still lack MetaTags component implementation, hurting SEO performance.

**Pages Missing MetaTags:**
- Blog.tsx
- BlogPost.tsx
- CaseStudies.tsx
- CaseStudyDetail.tsx
- All industry pages (Healthcare.tsx, Manufacturing.tsx, etc.)
- Legal pages (Privacy.tsx, Terms.tsx, Cookie.tsx, GDPR.tsx)
- ProjectDetail.tsx
- Resources.tsx

## Issue 3: Implement Automated Sitemap Generation

**Description:**
The sitemap.xml is currently static and outdated. Implement automated sitemap generation during the build process.

**Tasks:**
- [ ] Create a build script to generate sitemap.xml
- [ ] Include all dynamic routes (blog posts, case studies, etc.)
- [ ] Add proper lastmod dates based on file modification
- [ ] Integrate with the build pipeline

## Issue 4: Create Centralized SEO Configuration

**Description:**
Create a centralized system for managing SEO metadata across the site.

**Tasks:**
- [ ] Create a seo.config.ts file with default values
- [ ] Implement page-specific SEO configurations
- [ ] Add Open Graph image generation for dynamic pages
- [ ] Create SEO validation tests

## Issue 5: Improve Meta Tag Defaults and Consistency

**Description:**
Ensure consistent meta tag implementation across all pages with proper defaults.

**Tasks:**
- [ ] Create a useSEO hook for dynamic meta tags
- [ ] Implement canonical URL generation
- [ ] Add language alternatives for multi-language support
- [ ] Ensure all images have absolute URLs