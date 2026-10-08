import { MetadataRoute } from 'next';
import { getSiteUrl, isIndexingEnabled } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  // If global indexing is disabled, disallow everything
  if (!isIndexingEnabled()) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api', '/api/', '/search', '/search/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
