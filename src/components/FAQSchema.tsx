import React from 'react';
import { Helmet } from 'react-helmet';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQ[];
  mainEntity?: string;
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ 
  faqs,
  mainEntity = 'https://ingeniousdigital.com'
}) => {
  
  // Create the schema.org JSON-LD data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;