#!/bin/bash

# Script to generate case study images
# This script creates symbolic links for the case study images to ensure they load correctly

echo "Generating case study images..."

# Create case-studies directory if it doesn't exist
mkdir -p public/case-studies

# Create symbolic links from the case study data
# For each case study ID, create a link to the corresponding image
# This ensures we have local paths for all case studies

# ai-analytics
cp public/images/tech/analytics.webp public/case-studies/ai-analytics.webp

# cybersecurity-platform
cp public/images/tech/server.svg public/case-studies/cybersecurity-platform.svg
cp public/images/tech/server.svg public/case-studies/cybersecurity-platform.webp

# saas-platform
cp public/images/tech/api.svg public/case-studies/saas-platform.svg
cp public/images/tech/api.svg public/case-studies/saas-platform.webp

# iot-smart-city
cp public/images/tech/cloud.svg public/case-studies/iot-smart-city.svg
cp public/images/tech/cloud.svg public/case-studies/iot-smart-city.webp

# elearning-platform
cp public/images/tech/custom.svg public/case-studies/elearning-platform.svg
cp public/images/tech/custom.svg public/case-studies/elearning-platform.webp

# auto-service-digital
cp public/images/tech/client.svg public/case-studies/auto-service-digital.svg
cp public/images/tech/client.svg public/case-studies/auto-service-digital.webp

# retail-growth
cp public/images/tech/database.svg public/case-studies/retail-growth.svg
cp public/images/tech/database.svg public/case-studies/retail-growth.webp

# ecommerce-specialty
cp public/images/tech/device.svg public/case-studies/ecommerce-specialty.svg
cp public/images/tech/device.svg public/case-studies/ecommerce-specialty.webp

# realestate-digital
cp public/images/tech/router.svg public/case-studies/realestate-digital.svg
cp public/images/tech/router.svg public/case-studies/realestate-digital.webp

# fintech-payments
cp public/images/tech/server.svg public/case-studies/fintech-payments.svg
cp public/images/tech/server.svg public/case-studies/fintech-payments.webp

echo "Case study images generated successfully!"