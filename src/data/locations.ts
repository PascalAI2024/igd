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
    metaDescription: 'Multilingual digital marketing and web solutions for Miami businesses. Boost your local visibility with strategies designed for Miami\'s diverse market.'
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
    nearbyLocations: ['fort-lauderdale', 'boca-raton', 'deerfield-beach', 'lighthouse-point'],
    metaTitle: 'Digital Marketing & SEO Services in Pompano Beach, FL',
    metaDescription: 'Custom digital marketing solutions for Pompano Beach businesses. Boost your local visibility with strategies designed for Pompano Beach\'s coastal market.'
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
    nearbyLocations: ['miami', 'south-miami', 'coconut-grove', 'miami-beach'],
    metaTitle: 'Upscale Digital Marketing Services in Coral Gables, FL',
    metaDescription: 'Premium digital solutions for Coral Gables businesses. Connect with affluent customers through targeted marketing and web development strategies.'
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
    nearbyLocations: ['boca-raton', 'boynton-beach', 'west-palm-beach', 'highland-beach'],
    metaTitle: 'Digital Marketing & SEO for Delray Beach Businesses',
    metaDescription: 'Specialized digital marketing services for Delray Beach businesses. Stand out on Atlantic Avenue and beyond with our customized strategies.'
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
    nearbyLocations: ['pompano-beach', 'boca-raton', 'lighthouse-point', 'coconut-creek'],
    metaTitle: 'Digital Marketing Services in Deerfield Beach, FL',
    metaDescription: 'Connect with local families and visitors in Deerfield Beach through our targeted digital marketing solutions for local businesses.'
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
    nearbyLocations: ['miami', 'coral-gables', 'surfside', 'north-miami-beach'],
    metaTitle: 'Tourism-Focused Digital Marketing in Miami Beach, FL',
    metaDescription: 'Reach international tourists and local residents with our multilingual SEO and targeted digital marketing services for Miami Beach businesses.'
  },
  {
    id: 'plantation',
    city: 'Plantation',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33324',
    county: 'Broward',
    lat: '26.1275',
    lng: '-80.2511',
    population: '92560',
    description: 'Plantation is a thriving suburban community in Broward County with a diverse business landscape. Our digital marketing solutions help Plantation businesses increase their local visibility and connect with the growing residential and commercial market.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing'
    ],
    nearbyLocations: ['fort-lauderdale', 'sunrise', 'davie', 'weston'],
    metaTitle: 'Digital Marketing & SEO Services in Plantation, FL',
    metaDescription: 'Grow your Plantation business with our custom digital marketing solutions. Connect with local residents and businesses through targeted SEO strategies.'
  },
  {
    id: 'sunrise',
    city: 'Sunrise',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33351',
    county: 'Broward',
    lat: '26.1669',
    lng: '-80.2564',
    population: '95157',
    description: 'Sunrise is home to major attractions like the FLA Live Arena and Sawgrass Mills Mall. Our digital marketing strategies help Sunrise businesses capitalize on the high tourist and shopper traffic while building sustainable local customer bases.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Retail Marketing',
      'Tourism Marketing'
    ],
    nearbyLocations: ['plantation', 'tamarac', 'lauderhill', 'weston'],
    metaTitle: 'Retail & Tourism Digital Marketing in Sunrise, FL',
    metaDescription: 'Specialized digital solutions for Sunrise businesses near Sawgrass Mills and FLA Live Arena. Attract tourists and local shoppers with our targeted strategies.'
  },
  {
    id: 'coral-springs',
    city: 'Coral Springs',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33065',
    county: 'Broward',
    lat: '26.2708',
    lng: '-80.2706',
    population: '133759',
    description: 'Coral Springs is a family-friendly community with excellent schools and a strong business presence. Our digital marketing services help Coral Springs businesses connect with local families and the surrounding suburban market through targeted online campaigns.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing'
    ],
    nearbyLocations: ['parkland', 'tamarac', 'coconut-creek', 'margate'],
    metaTitle: 'Family-Focused Digital Marketing in Coral Springs, FL',
    metaDescription: 'Connect with local families in Coral Springs through our targeted digital marketing and SEO services tailored for suburban businesses.'
  },
  {
    id: 'davie',
    city: 'Davie',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33314',
    county: 'Broward',
    lat: '26.0764',
    lng: '-80.2521',
    population: '105691',
    description: 'Davie combines a unique western theme with a strong educational presence, hosting several colleges and universities. Our digital marketing solutions help Davie businesses target both the academic community and local residents through customized strategies.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing',
      'Education Marketing'
    ],
    nearbyLocations: ['fort-lauderdale', 'plantation', 'weston', 'cooper-city'],
    metaTitle: 'Educational & Local Digital Marketing in Davie, FL',
    metaDescription: 'Reach Davie\'s academic community and local residents with our customized digital marketing strategies for local businesses.'
  },
  {
    id: 'weston',
    city: 'Weston',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33326',
    county: 'Broward',
    lat: '26.1004',
    lng: '-80.3997',
    population: '68423',
    description: 'Weston is an upscale master-planned community with beautiful neighborhoods and a strong focus on family life. Our premium digital marketing services help Weston businesses connect with affluent residents and visitors through sophisticated online strategies.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Luxury Brand Marketing',
      'Content Marketing'
    ],
    nearbyLocations: ['davie', 'sunrise', 'southwest-ranches', 'pembroke-pines'],
    metaTitle: 'Premium Digital Marketing for Weston, FL Businesses',
    metaDescription: 'Connect with Weston\'s affluent community through our premium digital marketing and SEO services tailored for upscale businesses.'
  },
  {
    id: 'miramar',
    city: 'Miramar',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33027',
    county: 'Broward',
    lat: '25.9765',
    lng: '-80.3327',
    population: '134721',
    description: 'Miramar is a rapidly growing city with a diverse population and expanding business district. Our digital marketing strategies help Miramar businesses reach the multicultural community and capitalize on the city\'s economic growth.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Multilingual SEO',
      'Content Marketing'
    ],
    nearbyLocations: ['pembroke-pines', 'hollywood-fl', 'davie', 'southwest-ranches'],
    metaTitle: 'Multilingual Digital Marketing in Miramar, FL',
    metaDescription: 'Reach Miramar\'s diverse community with our multilingual digital marketing and SEO services designed for growing businesses.'
  },
  {
    id: 'pembroke-pines',
    city: 'Pembroke Pines',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33028',
    county: 'Broward',
    lat: '26.0123',
    lng: '-80.3146',
    population: '170712',
    description: 'Pembroke Pines is one of Broward County\'s largest cities with extensive shopping, dining, and entertainment options. Our comprehensive digital marketing solutions help Pembroke Pines businesses stand out in the competitive local market and attract customers from surrounding areas.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing',
      'Retail Marketing'
    ],
    nearbyLocations: ['miramar', 'hollywood-fl', 'davie', 'cooper-city'],
    metaTitle: 'Comprehensive Digital Marketing in Pembroke Pines, FL',
    metaDescription: 'Stand out in Pembroke Pines\' competitive market with our complete digital marketing and SEO services for local businesses.'
  },
  {
    id: 'tamarac',
    city: 'Tamarac',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33321',
    county: 'Broward',
    lat: '26.2035',
    lng: '-80.2495',
    population: '71897',
    description: 'Tamarac offers a blend of residential communities and commercial districts that cater to diverse demographics. Our digital marketing services help Tamarac businesses reach both seniors and younger families through targeted online strategies.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Content Marketing'
    ],
    nearbyLocations: ['coral-springs', 'sunrise', 'lauderhill', 'margate'],
    metaTitle: 'Cross-Generational Digital Marketing in Tamarac, FL',
    metaDescription: 'Connect with Tamarac\'s diverse age demographics through our targeted digital marketing strategies for local businesses.'
  },
  {
    id: 'hallandale-beach',
    city: 'Hallandale Beach',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33009',
    county: 'Broward',
    lat: '25.9841',
    lng: '-80.1478',
    population: '40958',
    description: 'Hallandale Beach is known for its gaming, racing, and beach attractions. Our specialized digital marketing strategies help Hallandale Beach businesses target both tourist traffic and local residents, particularly in the entertainment and hospitality sectors.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Tourism Marketing',
      'Hospitality Marketing'
    ],
    nearbyLocations: ['hollywood-fl', 'aventura', 'sunny-isles-beach', 'golden-beach'],
    metaTitle: 'Entertainment & Tourism Digital Marketing in Hallandale Beach',
    metaDescription: 'Specialized digital strategies for Hallandale Beach hospitality and entertainment businesses to attract tourists and locals alike.'
  },
  {
    id: 'dania-beach',
    city: 'Dania Beach',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33004',
    county: 'Broward',
    lat: '26.0526',
    lng: '-80.1567',
    population: '31965',
    description: 'Dania Beach, known as the "Antique Capital of the South," combines historic charm with proximity to Fort Lauderdale Airport. Our digital marketing solutions help Dania Beach businesses leverage both tourist traffic and the antique shopping reputation to increase their online visibility.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Tourism Marketing',
      'Retail Marketing'
    ],
    nearbyLocations: ['fort-lauderdale', 'hollywood-fl', 'davie', 'cooper-city'],
    metaTitle: 'Specialty Retail & Tourism Digital Marketing in Dania Beach',
    metaDescription: 'Help your Dania Beach antique shop or local business stand out with our specialized digital marketing strategies for this unique market.'
  },
  {
    id: 'lighthouse-point',
    city: 'Lighthouse Point',
    state: 'Florida',
    stateAbbr: 'FL',
    zip: '33064',
    county: 'Broward',
    lat: '26.2758',
    lng: '-80.0883',
    population: '11262',
    description: 'Lighthouse Point is an affluent coastal community known for its waterways, marinas, and upscale lifestyle. Our premium digital marketing services help Lighthouse Point businesses connect with affluent residents and visitors through sophisticated and targeted online strategies.',
    servicesOffered: [
      'Web Development',
      'SEO',
      'Digital Marketing',
      'Social Media Management',
      'Google Business Profile Optimization',
      'Local SEO',
      'Luxury Brand Marketing',
      'Content Marketing'
    ],
    nearbyLocations: ['pompano-beach', 'deerfield-beach', 'hillsboro-beach', 'fort-lauderdale'],
    metaTitle: 'Premium Digital Marketing in Lighthouse Point, FL',
    metaDescription: 'Connect with Lighthouse Point\'s affluent community through our premium digital marketing and SEO services for luxury businesses.'
  }
];

export const allServiceAreas: Location[] = [...primaryServiceArea, ...secondaryServiceArea];

export default allServiceAreas;