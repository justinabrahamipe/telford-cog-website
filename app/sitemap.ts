// Dynamic Sitemap Generation

import { MetadataRoute } from 'next';
import { siteConfig, pageMetadata } from '../src/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.values(pageMetadata);

  return pages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === '/' ? 'daily' : 'weekly' as any,
    priority: page.path === '/' ? 1.0 : 0.8,
  }));
}
