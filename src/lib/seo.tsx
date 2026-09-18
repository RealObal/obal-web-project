import { useEffect, useMemo, type ReactNode } from 'react';
import { absoluteUrl, DEFAULT_IMAGE, SITE_NAME, X_HANDLE } from './seoData';

type JsonLdData = unknown | unknown[];

interface SeoProps {
  title: string;
  description: string;
  keywords?: string | string[];
  path?: string;
  type?: 'website' | 'profile' | 'article';
  image?: string | null;
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: JsonLdData;
  children?: ReactNode;
}

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
}

export function Seo({
  title,
  description,
  keywords,
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  twitterCard = 'summary_large_image',
  jsonLd,
  children,
}: SeoProps) {
  const url = absoluteUrl(path);
  const previewImage = image || DEFAULT_IMAGE;
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const jsonLdEntries = useMemo(() => Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [], [jsonLd]);

  useEffect(() => {
    const isPublicHost = ['ronaldobal.com', 'www.ronaldobal.com'].includes(window.location.hostname);
    document.title = title;
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', { name: 'robots', content: isPublicHost ? 'index, follow' : 'noindex, nofollow' });
    if (keywordContent) setMeta('meta[name="keywords"]', { name: 'keywords', content: keywordContent });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: previewImage });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: twitterCard });
    setMeta('meta[name="twitter:site"]', { name: 'twitter:site', content: `@${X_HANDLE}` });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: previewImage });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.head.querySelectorAll('script[data-site-jsonld]').forEach((node) => node.remove());
    jsonLdEntries.filter(Boolean).forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.siteJsonld = 'true';
      script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
      document.head.appendChild(script);
    });
  }, [description, jsonLdEntries, keywordContent, previewImage, title, twitterCard, type, url]);

  return children ? <>{children}</> : null;
}
