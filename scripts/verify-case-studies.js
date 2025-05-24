#!/usr/bin/env node

/**
 * Script to verify that all case study IDs have corresponding image files
 * This helps ensure that no case studies have broken images
 */

const fs = require('fs');
const path = require('path');

// Path to the case studies directory relative to script location
const CASE_STUDIES_DIR = path.join(__dirname, '../public/case-studies');

// Path to the SimpleCaseStudies component
const SIMPLE_CASE_STUDIES_PATH = path.join(__dirname, '../src/pages/SimpleCaseStudies.tsx');

// Extract case study IDs from the component
function extractCaseStudyIds() {
  try {
    // Read the file
    const content = fs.readFileSync(SIMPLE_CASE_STUDIES_PATH, 'utf8');
    
    // Use regex to extract the IDs
    const idRegex = /id:\s*['"]([^'"]+)['"]/g;
    
    const ids = [];
    let match;
    while ((match = idRegex.exec(content)) !== null) {
      ids.push(match[1]);
    }
    
    return ids;
  } catch (error) {
    console.error('Error reading case studies file:', error.message);
    return [];
  }
}

// Get all image files in the case studies directory
function getImageFiles() {
  try {
    const files = fs.readdirSync(CASE_STUDIES_DIR);
    
    // Map of id to array of file extensions
    const imageMap = {};
    
    files.forEach(file => {
      const match = file.match(/^(.+)\.([^.]+)$/);
      if (match) {
        const [, id, ext] = match;
        
        if (!imageMap[id]) {
          imageMap[id] = [];
        }
        
        imageMap[id].push(ext);
      }
    });
    
    return imageMap;
  } catch (error) {
    console.error('Error reading case studies directory:', error.message);
    return {};
  }
}

// Main function
function main() {
  console.log('Verifying case study images...');
  
  const caseStudyIds = extractCaseStudyIds();
  console.log(`Found ${caseStudyIds.length} case study IDs in the code`);
  
  const imageFiles = getImageFiles();
  console.log(`Found ${Object.keys(imageFiles).length} unique image files in the directory`);
  
  let hasErrors = false;
  
  // Check for case studies without images
  caseStudyIds.forEach(id => {
    if (!imageFiles[id]) {
      console.error(`⚠️ Case study "${id}" has no image files`);
      hasErrors = true;
    } else {
      // Check if webp or svg exists
      if (!imageFiles[id].includes('webp') && !imageFiles[id].includes('svg')) {
        console.warn(`⚠️ Case study "${id}" has neither webp nor svg image`);
        hasErrors = true;
      } else {
        const formats = imageFiles[id].join(', ');
        console.log(`✅ Case study "${id}" has images in formats: ${formats}`);
      }
    }
  });
  
  // Check for images without case studies
  Object.keys(imageFiles).forEach(id => {
    // Skip some common exceptions
    if (['erp-platform', 'healthcare-platform', 'fintech-platform'].includes(id)) {
      return;
    }
    
    if (!caseStudyIds.includes(id)) {
      console.warn(`ℹ️ Image "${id}" (${imageFiles[id].join(', ')}) has no corresponding case study`);
    }
  });
  
  if (!hasErrors) {
    console.log('✅ All case study IDs have corresponding images');
    return 0;
  } else {
    console.error('❌ Some case study IDs are missing images');
    return 1;
  }
}

// Run the script
const exitCode = main();
process.exit(exitCode);