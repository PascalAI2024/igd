import { CaseStudy } from './types';
import { bakeryCaseStudy } from './small-business-bakery';
import { lawFirmCaseStudy } from './small-business-law-firm';
import { hvacCaseStudy } from './small-business-hvac';
import { boutiqueCaseStudy } from './small-business-boutique';
import { fintech } from './fintech';
import { healthcare } from './healthcare';
import { ecommerce } from './ecommerce';
import { manufacturing } from './manufacturing';
import { education } from './education';
import { restaurant } from './restaurant';
import { realestate } from './realestate';

// Enhanced case studies with professional images and detailed descriptions
export const allCaseStudies: CaseStudy[] = [
  // Small business focused case studies
  bakeryCaseStudy,
  lawFirmCaseStudy,
  hvacCaseStudy,
  boutiqueCaseStudy,
  // Enterprise case studies with complete content
  fintech,
  healthcare,
  ecommerce,
  manufacturing,
  education,
  restaurant,
  realestate
];

export default allCaseStudies;
