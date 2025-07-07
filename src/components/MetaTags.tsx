import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  category?: string;
  tags?: string[];
  locale?: string;
  twitterUsername?: string;
  noIndex?: boolean;
  alternateUrls?: {
    hrefLang: string;
    href: string;
  }[];
  videoUrl?: string;
  cityName?: string;
  regionName?: string;
  countryName?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image = '/social-preview.jpg',
  url,
  type = 'website',
  keywords = ['digital marketing', 'web development', 'AI solutions', 'SEO', 'small business'],
  author = 'Ingenious Digital',
  publishedTime,
  modifiedTime,
  category,
  tags = [],
  locale = 'en_US',
  twitterUsername = '@ingeniousdigital',
  noIndex = false,
  alternateUrls = [],
  videoUrl,
  cityName,
  regionName,
  countryName = 'USA'
}) => {
  const location = useLocation();
  const siteName = 'Ingenious Digital';
  // Ensure URL has absolute path
  const absoluteUrl = url || `https://ingeniousdigital.com${location.pathname}`;
  // Ensure image has absolute path
  const absoluteImage = image.startsWith('http') ? image : `https://ingeniousdigital.com${image}`;
  // Create full title with site name
  const fullTitle = `${title} | ${siteName}`;
  // Create combined keywords string from array
  const keywordsString = [...keywords, ...tags].join(', ');
  // Location string for geo-targeting
  const locationString = [cityName, regionName, countryName].filter(Boolean).join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />

      {/* Robots directive */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Viewport and other technical tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={absoluteUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Add article-specific tags if type is article */}
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && category && <meta property="article:section" content={category} />}
      {type === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      {type === 'article' && <meta property="article:author" content={author} />}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Alternate language/region URLs */}
      {alternateUrls.map((altUrl, index) => (
        <link key={index} rel="alternate" hrefLang={altUrl.hrefLang} href={altUrl.href} />
      ))}

      {/* Video content if available */}
      {videoUrl && <meta property="og:video" content={videoUrl} />}
      {videoUrl && <meta property="og:video:secure_url" content={videoUrl} />}
      {videoUrl && <meta property="og:video:type" content="video/mp4" />}
      {videoUrl && <meta property="og:video:width" content="1280" />}
      {videoUrl && <meta property="og:video:height" content="720" />}

      {/* Geo-targeting if city/region provided */}
      {locationString && <meta name="geo.placename" content={locationString} />}
      {cityName && <meta name="geo.region" content={`US-${regionName || 'FL'}`} />}
    </Helmet>
  );
};

export default MetaTags;
