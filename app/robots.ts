import { getHostPath } from '@/utils/envUtils';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/'
    },
    sitemap: getHostPath() + 'sitemap.xml'
  }
}