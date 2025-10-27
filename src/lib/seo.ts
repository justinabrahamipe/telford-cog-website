// SEO Utility Functions

import { Metadata } from 'next';
import { siteConfig, pageMetadata } from '../config/seo';

type PageKey = keyof typeof pageMetadata;

export function generateMetadata(page: PageKey): Metadata {
  const pageData = pageMetadata[page];
  const fullTitle = pageData.title;
  const url = `${siteConfig.url}${pageData.path}`;

  return {
    title: fullTitle,
    description: pageData.description,
    keywords: [...pageData.keywords, ...siteConfig.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: url,
      title: fullTitle,
      description: pageData.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: pageData.description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Generate JSON-LD structured data for Church organization
export function generateChurchSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
  };
}

// Generate JSON-LD for specific sermon/event
export function generateSermonSchema(sermon: {
  title: string;
  description: string;
  date: string;
  speaker: string;
  videoUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: sermon.title,
    description: sermon.description,
    startDate: sermon.date,
    location: {
      '@type': 'Place',
      name: siteConfig.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.address.city,
        addressCountry: siteConfig.address.country,
      },
    },
    performer: {
      '@type': 'Person',
      name: sermon.speaker,
    },
    ...(sermon.videoUrl && {
      video: {
        '@type': 'VideoObject',
        name: sermon.title,
        description: sermon.description,
        contentUrl: sermon.videoUrl,
      },
    }),
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
