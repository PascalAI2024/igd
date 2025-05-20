/**
 * Location data for service areas
 * This data is used to create location-specific pages and improve local SEO
 */

export interface Location {
  id: string;
  city: string;
  state: string;
  stateAbbr: string;
  zip: string;
  county: string;
  lat: string;
  lng: string;
  population: string;
  description: string;
  servicesOffered: string[];
  nearbyLocations: string[]; // IDs of nearby locations
  imageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const primaryServiceArea: Location[] = [
  {
    id: 'fort-lauderdale',
    city: 'Fort Lauderdale',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33304',
    county: 'Broward',
    lat: '26.1224',
    lng: '-80.1373',
    population: '182437',
    description: 'Fort Lauderdale is a vibrant coastal city known for its beaches, arts, culture, and events. As a growing business hub in South Florida, local businesses in Fort Lauderdale benefit from our digital marketing strategies tailored to the unique tourist and resident demographics.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing',
      'Photography',
      'Videography'
    ],
    nearbyLocations: ['miami', 'boca-raton', 'hollywood-fl', 'pompano-beach'],
    metaTitle: 'Digital Marketing & Web Development in Fort Lauderdale, FL',
    metaDescription: 'Custom digital marketing solutions for Fort Lauderdale businesses. Local SEO, web development, and digital strategy tailored to South Florida markets.'
  },
  {
    id: 'miami',
    city: 'Miami',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33101',
    county: 'Miami-Dade',
    lat: '25.7617',
    lng: '-80.1918',
    population: '442241',
    description: 'Miami is a major center for commerce, culture, arts, and international business. Our digital solutions help Miami businesses stand out in the competitive local market with multilingual SEO and culturally relevant digital marketing strategies.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing',
      'Photography',
      'Videography',
      'Multilingual SEO',
      'International SEO'
    ],
    nearbyLocations: ['fort-lauderdale', 'coral-gables', 'miami-beach', 'hialeah'],
    metaTitle: 'Digital Marketing & Web Development in Miami, FL',
    metaDescription: 'Multilingual digital marketing and web solutions for Miami businesses. Boost your local visibility with strategies designed for Miami's diverse market.'
  },
  {
    id: 'boca-raton',
    city: 'Boca Raton',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33431',
    county: 'Palm Beach',
    lat: '26.3683',
    lng: '-80.1289',
    population: '97422',
    description: 'Boca Raton is known for its upscale lifestyle, beautiful beaches, and thriving business environment. Our premium digital marketing services help Boca Raton businesses connect with affluent local customers through targeted digital strategies.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing',
      'Photography',
      'Videography',
      'Luxury Brand Marketing'
    ],
    nearbyLocations: ['fort-lauderdale', 'delray-beach', 'pompano-beach', 'west-palm-beach'],
    metaTitle: 'Digital Marketing & Web Development in Boca Raton, FL',
    metaDescription: 'Premium digital solutions for Boca Raton businesses. Connect with affluent local customers through targeted SEO and web development services.'
  },
  {
    id: 'west-palm-beach',
    city: 'West Palm Beach',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33401',
    county: 'Palm Beach',
    lat: '26.7153',
    lng: '-80.0534',
    population: '117415',
    description: 'West Palm Beach combines urban living with tropical paradise, offering diverse business opportunities. Our local digital marketing services help West Palm Beach businesses target year-round residents and seasonal visitors alike.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing',
      'Tourism Marketing',
      'Seasonal Campaign Management'
    ],
    nearbyLocations: ['boca-raton', 'delray-beach', 'jupiter-fl', 'palm-beach-gardens'],
    metaTitle: 'Digital Marketing & Web Development in West Palm Beach, FL',
    metaDescription: 'Local digital marketing strategies for West Palm Beach businesses. Target year-round residents and seasonal visitors with our specialized solutions.'
  },
  {
    id: 'hollywood-fl',
    city: 'Hollywood',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33019',
    county: 'Broward',
    lat: '26.0112',
    lng: '-80.1495',
    population: '154817',
    description: 'Hollywood, Florida offers a unique beach community with a historic downtown arts district. Our digital marketing services help Hollywood businesses attract locals and tourists with strategies that highlight local charm and beachfront appeal.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing',
      'Tourism Marketing',
      'Restaurant Marketing'
    ],
    nearbyLocations: ['fort-lauderdale', 'miami', 'hallandale-beach', 'dania-beach'],
    metaTitle: 'Digital Marketing & Web Development in Hollywood, FL',
    metaDescription: 'Digital marketing solutions tailored for Hollywood, FL businesses. Attract locals and tourists with strategies highlighting your local charm and appeal.'
  }
];

export const secondaryServiceArea: Location[] = [
  {
    id: 'pompano-beach',
    city: 'Pompano Beach',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33060',
    county: 'Broward',
    lat: '26.2378',
    lng: '-80.1247',
    population: '112046',
    description: 'Pompano Beach is a growing coastal city with excellent fishing, boating, and water activities. Our digital marketing services help Pompano Beach businesses leverage their coastal appeal and reach local residents and tourists.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO'
    ],
    nearbyLocations: ['fort-lauderdale', 'boca-raton', 'deerfield-beach', 'lighthouse-point']
  },
  {
    id: 'coral-gables',
    city: 'Coral Gables',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33134',
    county: 'Miami-Dade',
    lat: '25.7215',
    lng: '-80.2684',
    population: '49700',
    description: 'Coral Gables is an upscale community known for Mediterranean Revival architecture and high-end shopping. Our digital marketing solutions help Coral Gables businesses target affluent customers and showcase premium products and services.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Luxury Brand Marketing'
    ],
    nearbyLocations: ['miami', 'south-miami', 'coconut-grove', 'miami-beach']
  },
  {
    id: 'delray-beach',
    city: 'Delray Beach',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33444',
    county: 'Palm Beach',
    lat: '26.4615',
    lng: '-80.0728',
    population: '69451',
    description: 'Delray Beach offers a vibrant downtown area with a mix of galleries, boutiques, and restaurants. Our digital marketing services help Delray Beach businesses stand out in the competitive Atlantic Avenue area and beyond.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Restaurant Marketing',
      'Retail Marketing'
    ],
    nearbyLocations: ['boca-raton', 'boynton-beach', 'west-palm-beach', 'highland-beach']
  },
  {
    id: 'deerfield-beach',
    city: 'Deerfield Beach',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33441',
    county: 'Broward',
    lat: '26.3184',
    lng: '-80.0998',
    population: '86859',
    description: 'Deerfield Beach offers beautiful beaches and a family-friendly atmosphere. Our digital marketing solutions help Deerfield Beach businesses connect with local families and seasonal visitors through targeted online strategies.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO'
    ],
    nearbyLocations: ['pompano-beach', 'boca-raton', 'lighthouse-point', 'coconut-creek']
  },
  {
    id: 'miami-beach',
    city: 'Miami Beach',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33139',
    county: 'Miami-Dade',
    lat: '25.7907',
    lng: '-80.1300',
    population: '88885',
    description: 'Miami Beach is world-famous for its beaches, Art Deco district, and vibrant nightlife. Our digital marketing strategies help Miami Beach businesses reach international tourists and local residents through multilingual SEO and targeted campaigns.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Tourism Marketing',
      'Multilingual SEO',
      'Restaurant Marketing',
      'Hospitality Marketing'
    ],
    nearbyLocations: ['miami', 'coral-gables', 'surfside', 'north-miami-beach']
  }
];

export const allServiceAreas: Location[] = [...primaryServiceArea, ...secondaryServiceArea];

export default allServiceAreas;