import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amazing-natures-beta.vercel.app'
  
  // List of all static routes
  const routes = [
    '',
    '/about',
    '/products',
    '/science',
    '/blog',
    '/faq',
    '/contact',
    '/wellness-quiz',
    '/privacy-policy',
    '/terms-of-service',
    '/shipping-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Add dynamic product routes if needed, but for now static list is safer
  const products = [
    '/products/mgo-30',
    '/products/mgo-100',
    '/products/mgo-263',
    '/products/mgo-400',
    '/products/mgo-800',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...routes, ...products]
}
