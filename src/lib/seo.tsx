import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';
import { absoluteUrl, DEFAULT_IMAGE, SITE_NAME, X_HANDLE } from './seoData';

type JsonLdData = unknown | unknown[];

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'profile' | 'article';
  image?: string | null;
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: JsonLdData;
  children?: ReactNode;
}

export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  twitterCard = 'summary_large_image',
  jsonLd,
  children,
}: SeoProps) {
  const url = absoluteUrl(path);
  const previewImage = image || DEFAULT_IMAGE;
  const jsonLdEntries = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={previewImage} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={`@${X_HANDLE}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />
      {jsonLdEntries.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
      {children}
    </Helmet>
  );
}
