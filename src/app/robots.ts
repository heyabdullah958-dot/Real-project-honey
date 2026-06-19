import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/checkout/thank-you'],
    },
    sitemap: 'https://amazingnatures.com.au/sitemap.xml',
  }
}
