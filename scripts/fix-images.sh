#!/bin/bash

# Script to fix images for deployment

echo "Fixing images for deployment..."

# Create all necessary directories
mkdir -p public/case-studies
mkdir -p public/images/case-studies/new
mkdir -p public/images/ai-ml
mkdir -p public/images/blog
mkdir -p public/images/digital-marketing
mkdir -p public/images/tech
mkdir -p public/images/testimonials
mkdir -p public/images/web-dev
mkdir -p public/blog

# Copy case study images
echo "Copying case study images..."
cp -v distbak/images/case-studies/*.webp public/case-studies/
cp -v distbak/images/case-studies/*.webp public/images/case-studies/
cp -v distbak/images/case-studies/new/*.webp public/images/case-studies/new/

# Copy AI/ML images
echo "Copying AI/ML images..."
cp -v distbak/images/ai-ml/*.webp public/images/ai-ml/
cp -v distbak/images/ai-ml/*.webp public/

# Copy blog images
echo "Copying blog images..."
cp -v distbak/images/blog/*.jpg public/images/blog/
cp -v distbak/blog/*.jpg public/blog/

# Copy digital marketing images
echo "Copying digital marketing images..."
cp -v distbak/images/digital-marketing/*.webp public/images/digital-marketing/

# Copy tech stack images
echo "Copying tech stack images..."
cp -v distbak/images/tech/*.webp public/images/tech/
cp -v distbak/images/tech/*.svg public/images/tech/

# Copy testimonial images
echo "Copying testimonial images..."
cp -v distbak/images/testimonials/*.webp public/images/testimonials/

# Copy web dev images
echo "Copying web dev images..."
cp -v distbak/images/web-dev/*.webp public/images/web-dev/

echo "All images have been fixed!"