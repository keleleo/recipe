import { MetadataRoute } from 'next';
const SITE_BASE_URL = process.env.SITE_BASE_URL || '';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/'
    },
    sitemap:SITE_BASE_URL+'sitemap.xml'
  }
}