const SITE_URL = 'https://ronaldobal.com';
const IMAGE = `${SITE_URL}/ronald-profile.PNG`;

const routes = {
  '/': {
    title: 'Ronald Obal | MEAL Manager & MEARL Specialist',
    description: 'Official website of Ronald Obal, MEAL Manager, researcher, and development practitioner in Uganda.',
    type: 'profile',
    h1: 'Ronald Obal',
    intro:
      'This is the official website of Ronald Obal, a MEAL Manager, Monitoring Evaluation Accountability Research and Learning (MEARL) Specialist, researcher, and development practitioner in Uganda.',
    links: [
      ['About Ronald', '/about'],
      ['MEAL Services', '/services'],
      ['Experience', '/portfolio'],
      ['Insights', '/blog'],
      ['Contact', '/contact'],
    ],
  },
  '/about': {
    title: 'About Ronald Obal | MEAL Manager & MEARL Specialist',
    description:
      'Learn about Ronald Obal, a MEAL Manager and MEARL Specialist in Uganda with experience in monitoring, evaluation, accountability, research, and learning.',
    type: 'profile',
    h1: 'About Ronald Obal',
    intro:
      'Ronald Obal is a Monitoring, Evaluation, Accountability, Research and Learning professional focused on evidence systems for social impact programs in Uganda.',
    links: [['Ronald Obal Official Website', '/']],
  },
  '/services': {
    title: 'MEAL Services by Ronald Obal | Monitoring, Evaluation & Learning',
    description:
      "Explore Ronald Obal's MEAL services, including system design, surveys, data analysis, evaluations, digital data collection, and capacity building in Uganda.",
    type: 'website',
    h1: 'MEAL Services by Ronald Obal',
    intro:
      'Monitoring, evaluation, accountability, research and learning services for development, humanitarian, and community programs.',
    links: [['Ronald Obal Official Website', '/']],
  },
  '/portfolio': {
    title: 'Ronald Obal Experience | MEAL Portfolio & Development Work',
    description:
      "Review Ronald Obal's MEAL experience across mental health, child protection, trauma care, community development, education, and youth empowerment programs.",
    type: 'website',
    h1: 'Ronald Obal Experience',
    intro:
      'A track record of designing and implementing MEAL systems that strengthen program performance across social impact sectors.',
    links: [['Ronald Obal Official Website', '/']],
  },
  '/blog': {
    title: 'Ronald Obal Insights | MEAL Field Notes & Development Learning',
    description:
      "Read Ronald Obal's insights on Monitoring, Evaluation, Accountability, Research and Learning in social impact, humanitarian, and development programs.",
    type: 'website',
    h1: 'Ronald Obal Insights',
    intro:
      'Evidence-based lessons from the field on Monitoring, Evaluation, Accountability, Research and Learning.',
    links: [['Ronald Obal Official Website', '/']],
  },
  '/contact': {
    title: 'Contact Ronald Obal | MEAL Consultancy & Collaboration',
    description:
      'Contact Ronald Obal for MEAL systems, evaluations, research, learning, accountability, digital data collection, and development program collaboration in Uganda.',
    type: 'website',
    h1: 'Contact Ronald Obal',
    intro:
      'Connect with Ronald Obal for MEAL consultancy, evaluations, capacity building, and development program collaboration.',
    links: [['Ronald Obal Official Website', '/']],
  },
};

function absoluteUrl(path) {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function breadcrumbSchema(route, data) {
  const items = route === '/'
    ? [{ name: 'Ronald Obal Official Website', path: '/' }]
    : [
        { name: 'Ronald Obal Official Website', path: '/' },
        { name: data.h1, path: route },
      ];

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

function homepageSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Ronald Obal',
      url: absoluteUrl('/'),
      image: IMAGE,
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
      sameAs: ['https://linkedin.com/in/ronaldobal', 'https://x.com/real_obal'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Ronald Obal Official Website',
      url: absoluteUrl('/'),
      publisher: {
        '@id': `${SITE_URL}/#person`,
      },
      inLanguage: 'en',
    },
    {
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'SiteNavigationElement', position: 1, name: 'Ronald Obal', url: absoluteUrl('/') },
        { '@type': 'SiteNavigationElement', position: 2, name: 'About Ronald', url: absoluteUrl('/about') },
        { '@type': 'SiteNavigationElement', position: 3, name: 'MEAL Services', url: absoluteUrl('/services') },
        { '@type': 'SiteNavigationElement', position: 4, name: 'Experience', url: absoluteUrl('/portfolio') },
        { '@type': 'SiteNavigationElement', position: 5, name: 'Research Portfolio', url: absoluteUrl('/data-analytics-research-portfolio') },
        { '@type': 'SiteNavigationElement', position: 6, name: 'Insights', url: absoluteUrl('/blog') },
        { '@type': 'SiteNavigationElement', position: 7, name: 'Contact', url: absoluteUrl('/contact') },
      ],
    },
  ];
}

function metaBlock(route, data) {
  const url = absoluteUrl(route);
  const schemas = [
    ...(route === '/' ? homepageSchemas() : []),
    breadcrumbSchema(route, data),
  ];

  return `
    <title>${escapeHtml(data.title)}</title>
    <meta name="description" content="${escapeAttr(data.description)}">
    <link rel="canonical" href="${url}">
    <meta name="robots" content="index, follow">
    <meta property="og:type" content="${data.type}">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${escapeAttr(data.title)}">
    <meta property="og:description" content="${escapeAttr(data.description)}">
    <meta property="og:site_name" content="Ronald Obal">
    <meta property="og:image" content="${IMAGE}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@real_obal">
    <meta name="twitter:title" content="${escapeAttr(data.title)}">
    <meta name="twitter:description" content="${escapeAttr(data.description)}">
    <meta name="twitter:image" content="${IMAGE}">
    ${schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n    ')}
  `;
}

function bodyFallback(data) {
  const links = data.links
    .map(([label, path]) => `<a href="${path}">${escapeHtml(label)}</a>`)
    .join(' ');

  return `<div id="root"><main data-prerendered="true"><h1>${escapeHtml(data.h1)}</h1><p>${escapeHtml(data.intro)}</p><nav>${links}</nav></main></div>`;
}

export function applySeoToHtml(html, route) {
  const data = routes[route] || routes['/'];
  let nextHtml = html;

  nextHtml = nextHtml.replace(/<title>[\s\S]*?<\/title>/i, '');
  nextHtml = nextHtml.replace(/<meta\s+name=["']description["'][^>]*>/gi, '');
  nextHtml = nextHtml.replace(/<meta\s+name=["']robots["'][^>]*>/gi, '');
  nextHtml = nextHtml.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
  nextHtml = nextHtml.replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '');
  nextHtml = nextHtml.replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');
  nextHtml = nextHtml.replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, '');
  nextHtml = nextHtml.replace('</head>', `${metaBlock(route, data)}</head>`);
  nextHtml = nextHtml.replace(/<div id="root">[\s\S]*?<\/div>/i, bodyFallback(data));

  return nextHtml;
}
