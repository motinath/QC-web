/**
 * Centralized SEO Configuration & Structured Data Generator
 */

import { siteConfig } from "./site";

export interface PageSeoOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const defaultSeo = {
  titleTemplate: "%s | Quantum Codon",
  defaultTitle: "Quantum Codon — Next-Gen Therapeutics & Biocomputing",
  defaultDescription: siteConfig.description,
  siteUrl: siteConfig.url,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/logo-emblem.png`,
        width: 1200,
        height: 630,
        alt: "Quantum Codon Biocomputing Platform",
      },
    ],
  },
  twitter: {
    handle: "@QuantumCodon",
    site: "@QuantumCodon",
    cardType: "summary_large_image",
  },
} as const;

export function generatePageMeta({
  title,
  description,
  canonicalUrl,
  ogImage,
  noindex,
}: PageSeoOptions) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : defaultSeo.defaultTitle;
  const pageDescription = description || defaultSeo.defaultDescription;
  const url = canonicalUrl ? `${siteConfig.url}${canonicalUrl}` : siteConfig.url;
  const image = ogImage ? `${siteConfig.url}${ogImage}` : defaultSeo.openGraph.images[0].url;

  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: pageTitle },
    { name: "description", content: pageDescription },
    { name: "author", content: siteConfig.name },
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),

    // Open Graph
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:site_name", content: siteConfig.name },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: defaultSeo.twitter.site },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
    { name: "twitter:image", content: image },
  ];
}
