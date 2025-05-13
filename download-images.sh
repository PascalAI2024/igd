#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/web-dev
mkdir -p public/images/ai-ml
mkdir -p public/images/digital-marketing
mkdir -p public/images/tech
mkdir -p public/images/blog

# Web Development Images
curl -L "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format" -o public/images/web-dev/desktop.webp
curl -L "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format" -o public/images/web-dev/tablet.webp
curl -L "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format" -o public/images/web-dev/mobile.webp

# AI & Machine Learning Images
curl -L "https://images.unsplash.com/photo-1677442135968-6b7d726b3a48?w=800&auto=format" -o public/images/ai-ml/ai-ml-hero.webp
curl -L "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format" -o public/images/ai-ml/ai-process-1.webp
curl -L "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format" -o public/images/ai-ml/ai-process-2.webp
curl -L "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format" -o public/images/ai-ml/ai-process-3.webp
curl -L "https://images.unsplash.com/photo-1581092921461-7031e8fbc66c?w=800&auto=format" -o public/images/ai-ml/ai-process-4.webp
curl -L "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format" -o public/images/ai-ml/ai-process-5.webp
curl -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format" -o public/images/ai-ml/ai-usecase-1.webp
curl -L "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format" -o public/images/ai-ml/ai-usecase-2.webp
curl -L "https://images.unsplash.com/photo-1576400883215-7083980b6193?w=800&auto=format" -o public/images/ai-ml/ai-usecase-3.webp
curl -L "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format" -o public/images/ai-ml/ai-usecase-4.webp

# Digital Marketing Images
curl -L "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format" -o public/images/digital-marketing/seo.webp
curl -L "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format" -o public/images/digital-marketing/social.webp
curl -L "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format" -o public/images/digital-marketing/analytics.webp
curl -L "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&auto=format" -o public/images/digital-marketing/content.webp

# Technology Stack Images
curl -L "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format" -o public/images/tech/react.webp
curl -L "https://images.unsplash.com/photo-1598425237654-4fc758e50a93?w=800&auto=format" -o public/images/tech/nodejs.webp
curl -L "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&auto=format" -o public/images/tech/tailwind.webp
curl -L "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format" -o public/images/tech/mongodb.webp
curl -L "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&auto=format" -o public/images/tech/aws.webp
curl -L "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format" -o public/images/tech/graphql.webp
curl -L "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format" -o public/images/tech/google-business.webp
curl -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format" -o public/images/tech/analytics.webp
curl -L "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format" -o public/images/tech/seo.webp
curl -L "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format" -o public/images/tech/social.webp
curl -L "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format" -o public/images/tech/email.webp
curl -L "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format" -o public/images/tech/ads.webp

# Testimonial Images
curl -L "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format" -o public/images/testimonials/client1.webp
curl -L "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format" -o public/images/testimonials/client2.webp
curl -L "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format" -o public/images/testimonials/client3.webp

# Blog Images
curl -L "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800" -o public/images/blog/local-seo.jpg
curl -L "https://images.unsplash.com/photo-1677442135136-760c813a6a13?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800" -o public/images/blog/ai-marketing.jpg
curl -L "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800" -o public/images/blog/mobile-optimization.jpg
curl -L "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800" -o public/images/blog/content-strategy.jpg
curl -L "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=800" -o public/images/blog/business-automation.jpg

echo "All images downloaded successfully!"
