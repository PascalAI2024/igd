import React from 'react';
import CTAButton from './CTAButton';
import { CTA_TEXT, SPACING } from './uiConstants';

/**
 * A showcase component to demonstrate the different styles and sizes of CTA buttons.
 * This component can be used for documentation or design system reference.
 */
const CTAButtonShowcase: React.FC = () => {
  return (
    <div className={`${SPACING.SECTION.MEDIUM} ${SPACING.CONTAINER.NARROW}`}>
      <h2 className="text-3xl font-bold mb-8 text-center">CTA Button System</h2>
      
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Button Types</h3>
        <div className="flex flex-wrap gap-4">
          <CTAButton buttonType="primary">
            {CTA_TEXT.START_PROJECT}
          </CTAButton>
          
          <CTAButton buttonType="secondary">
            {CTA_TEXT.LEARN_MORE}
          </CTAButton>
          
          <CTAButton buttonType="tertiary">
            {CTA_TEXT.READ_MORE}
          </CTAButton>
          
          <CTAButton buttonType="ghost">
            {CTA_TEXT.EXPLORE}
          </CTAButton>
        </div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <CTAButton buttonType="primary" size="small">
            Small Button
          </CTAButton>
          
          <CTAButton buttonType="primary" size="medium">
            Medium Button
          </CTAButton>
          
          <CTAButton buttonType="primary" size="large">
            Large Button
          </CTAButton>
        </div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <CTAButton buttonType="primary" showArrow>
            {CTA_TEXT.GET_STARTED}
          </CTAButton>
          
          <CTAButton buttonType="secondary" showArrow>
            {CTA_TEXT.EXPLORE_SOLUTIONS}
          </CTAButton>
          
          <CTAButton buttonType="tertiary" showArrow>
            {CTA_TEXT.VIEW_DETAILS}
          </CTAButton>
        </div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">States</h3>
        <div className="flex flex-wrap gap-4">
          <CTAButton buttonType="primary" isLoading>
            {CTA_TEXT.START_PROJECT}
          </CTAButton>
          
          <CTAButton buttonType="primary" disabled>
            {CTA_TEXT.START_PROJECT}
          </CTAButton>
          
          <CTAButton buttonType="secondary" isLoading loadingText="Processing...">
            {CTA_TEXT.BOOK_CONSULTATION}
          </CTAButton>
          
          <CTAButton buttonType="secondary" disabled>
            {CTA_TEXT.BOOK_CONSULTATION}
          </CTAButton>
        </div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Primary CTA Usage</h3>
        <div className="p-6 bg-black/20 rounded-lg mb-4">
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">For Contact/Conversion</h4>
            <CTAButton buttonType="primary" showArrow>
              {CTA_TEXT.START_PROJECT}
            </CTAButton>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">For Service Pages</h4>
            <CTAButton buttonType="primary" showArrow>
              {CTA_TEXT.GET_STARTED}
            </CTAButton>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2">For Lead Generation</h4>
            <CTAButton buttonType="primary" showArrow>
              {CTA_TEXT.BOOK_CONSULTATION}
            </CTAButton>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Secondary CTA Usage</h3>
        <div className="p-6 bg-black/20 rounded-lg">
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">For Service Discovery</h4>
            <CTAButton buttonType="secondary" showArrow>
              {CTA_TEXT.EXPLORE_SOLUTIONS}
            </CTAButton>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2">For Case Studies</h4>
            <CTAButton buttonType="secondary" showArrow>
              {CTA_TEXT.VIEW_CASE_STUDIES}
            </CTAButton>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2">For Services</h4>
            <CTAButton buttonType="secondary" showArrow>
              {CTA_TEXT.VIEW_SERVICES}
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAButtonShowcase;