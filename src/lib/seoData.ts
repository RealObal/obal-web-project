export const SITE_URL = 'https://ronaldobal.com';
export const SITE_NAME = 'Ronald Obal';
export const DEFAULT_IMAGE = `${SITE_URL}/ronald-profile.PNG`;
export const LINKEDIN_URL = 'https://linkedin.com/in/ronaldobal';
export const X_HANDLE = 'real_obal';
export const X_URL = `https://x.com/${X_HANDLE}`;

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const siteNavigationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { '@type': 'SiteNavigationElement', position: 1, name: 'Ronald Obal', url: absoluteUrl('/') },
    { '@type': 'SiteNavigationElement', position: 2, name: 'About Ronald', url: absoluteUrl('/about') },
    { '@type': 'SiteNavigationElement', position: 3, name: 'MEAL Services', url: absoluteUrl('/services') },
    { '@type': 'SiteNavigationElement', position: 4, name: 'Experience', url: absoluteUrl('/portfolio') },
    { '@type': 'SiteNavigationElement', position: 5, name: 'Insights', url: absoluteUrl('/blog') },
    { '@type': 'SiteNavigationElement', position: 6, name: 'Contact', url: absoluteUrl('/contact') },
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Ronald Obal',
  url: absoluteUrl('/'),
  image: DEFAULT_IMAGE,
  jobTitle: 'MEAL Manager & MEARL Specialist',
  description:
    'Ronald Obal is a MEAL Manager, Monitoring Evaluation Accountability Research and Learning Specialist, researcher, and development practitioner in Uganda.',
  worksFor: {
    '@type': 'Organization',
    name: 'Laminopabo Child and Youth Development Center',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gulu and Kampala',
    addressCountry: 'UG',
  },
  sameAs: [LINKEDIN_URL, X_URL],
  knowsAbout: [
    'Monitoring and Evaluation',
    'Accountability and Learning',
    'MEARL',
    'Impact Evaluation',
    'Community Development',
    'Child Protection',
    'Mental Health Programs',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Ronald Obal Official Website',
  url: absoluteUrl('/'),
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
  inLanguage: 'en',
};

export const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  url: absoluteUrl('/'),
  name: 'Ronald Obal Official Website',
  about: {
    '@id': `${SITE_URL}/#person`,
  },
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
  },
  isPartOf: {
    '@id': `${SITE_URL}/#website`,
  },
};
