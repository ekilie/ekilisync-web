import { useEffect } from 'react'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: 'website' | 'article' | 'product'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  nofollow?: boolean
}

export function SEO({
  title = 'ekiliSync - Smart Location-Based Attendance Tracking',
  description = 'Automatic attendance tracking using location. No cards or manual punching needed. Streamline your workforce management with ekiliSync.',
  keywords = 'attendance tracking, location-based attendance, employee attendance, workforce management, automatic attendance, GPS attendance, time tracking, employee management',
  ogTitle,
  ogDescription,
  ogImage = '/images/og-image.png',
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  author = 'ekilie',
  publishedTime,
  modifiedTime,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Helper function to update or create meta tag
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${property}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, property)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`)
      
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }
      
      element.setAttribute('href', href)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', author)
    
    // Robots meta tag
    const robotsContent = []
    if (noindex) robotsContent.push('noindex')
    if (nofollow) robotsContent.push('nofollow')
    if (robotsContent.length > 0) {
      updateMetaTag('robots', robotsContent.join(', '))
    }

    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, true)
    updateMetaTag('og:description', ogDescription || description, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:type', ogType, true)
    
    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true)
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard)
    updateMetaTag('twitter:title', twitterTitle || ogTitle || title)
    updateMetaTag('twitter:description', twitterDescription || ogDescription || description)
    updateMetaTag('twitter:image', twitterImage || ogImage)

    // Article meta tags
    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true)
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true)
    }

    // Canonical URL
    if (canonical) {
      updateLinkTag('canonical', canonical)
    }

    // Additional SEO meta tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    updateMetaTag('theme-color', '#fff')
    
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    canonical,
    author,
    publishedTime,
    modifiedTime,
    noindex,
    nofollow,
  ])

  return null
}

// Structured Data Component
interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    script.id = 'structured-data'
    
    // Remove existing structured data script if it exists
    const existingScript = document.getElementById('structured-data')
    if (existingScript) {
      existingScript.remove()
    }
    
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [data])

  return null
}

// Prebuilt structured data schemas
export const createOrganizationSchema = (
  name: string,
  url: string,
  logo: string,
  description: string,
  email?: string,
  phone?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name,
  url,
  logo,
  description,
  ...(email && { email }),
  ...(phone && { telephone: phone }),
})

export const createWebsiteSchema = (name: string, url: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name,
  url,
  description,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

export const createSoftwareApplicationSchema = (
  name: string,
  description: string,
  url: string,
  applicationCategory: string,
  operatingSystem: string,
  price?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  offers: {
    '@type': 'Offer',
    price: price || '0',
    priceCurrency: 'USD',
  },
})

export const createBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})
