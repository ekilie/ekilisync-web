export const seoConfig = {
  siteName: 'ekiliSync',
  siteUrl: 'https://ekilisync.com',
  defaultTitle: 'ekiliSync - Smart Location-Based Attendance Tracking',
  defaultDescription:
    'Automatic attendance tracking using location. No cards or manual punching needed. Streamline your workforce management with ekiliSync - the modern solution for employee attendance.',
  defaultKeywords:
    'attendance tracking, location-based attendance, employee attendance, workforce management, automatic attendance, GPS attendance, time tracking, employee management, HR software, attendance management system, geofencing attendance, mobile attendance app',
  defaultOgImage: '/images/og-image.png',
  twitterHandle: '@ekilisync',
  locale: 'en_US',
  author: 'ekilie',
  themeColor: '#fff',
  backgroundColor: '#fff',
  twitterCard: 'summary_large_image' as const,
}

export const routeSEO = {
  home: {
    title: 'ekiliSync - Smart Location-Based Attendance Tracking',
    description:
      'Revolutionize your attendance management with ekiliSync. Automatic check-in/out using location. Perfect for businesses of all sizes. Start free today!',
    keywords:
      'attendance tracking software, automatic attendance system, location based attendance, employee time tracking, workforce management software, GPS attendance tracking, mobile attendance app, smart attendance solution',
    ogImage: '/images/og-home.png',
  },
  features: {
    title: 'Features - ekiliSync Smart Attendance System',
    description:
      'Discover powerful features: Real-time attendance tracking, geofencing, automated reports, mobile app, and more. Everything you need to manage attendance efficiently.',
    keywords:
      'attendance features, real-time tracking, geofencing, attendance reports, mobile attendance, automated attendance, employee monitoring',
  },
  pricing: {
    title: 'Pricing - Affordable Attendance Tracking Plans | ekiliSync',
    description:
      'Transparent pricing for businesses of all sizes. Start free with unlimited features. Flexible plans that grow with your team. No hidden fees.',
    keywords:
      'attendance tracking pricing, affordable HR software, free attendance app, business pricing plans, attendance system cost',
  },
  about: {
    title: 'About ekiliSync - Modern Attendance Management',
    description:
      'Learn about ekiliSync and our mission to simplify attendance management for businesses worldwide through innovative location-based technology.',
    keywords: 'about ekiliSync, company information, attendance technology, HR innovation',
  },
  documentation: {
    title: 'Documentation - ekiliSync Help Center',
    description:
      'Complete documentation and guides for ekiliSync. Learn how to set up, configure, and get the most out of your attendance tracking system.',
    keywords:
      'ekiliSync documentation, user guide, setup guide, attendance system help, how to use ekiliSync',
  },
  blog: {
    title: 'Blog - Tips & Insights on Attendance Management | ekiliSync',
    description:
      'Expert insights on attendance management, workforce optimization, and HR best practices. Stay updated with the latest in attendance technology.',
    keywords:
      'attendance blog, HR blog, workforce management tips, attendance best practices, HR technology',
  },
  support: {
    title: 'Support - Get Help with ekiliSync',
    description:
      'Get help with ekiliSync. Contact our support team, browse FAQs, or explore our knowledge base for quick solutions.',
    keywords: 'ekiliSync support, customer help, technical support, contact support, help center',
  },
  careers: {
    title: 'Careers - Join the ekiliSync Team',
    description:
      'Join our team and help revolutionize attendance management. Explore career opportunities at ekiliSync.',
    keywords: 'careers, jobs at ekiliSync, work with us, job opportunities, join our team',
  },
  dashboard: {
    title: 'Dashboard - ekiliSync',
    description: 'Access your ekiliSync dashboard to manage attendance, view reports, and monitor your team.',
    keywords: 'ekiliSync dashboard, attendance dashboard, team management',
    noindex: true,
  },
  signIn: {
    title: 'Sign In - ekiliSync',
    description: 'Sign in to your ekiliSync account to manage attendance and access your dashboard.',
    keywords: 'sign in, login, ekiliSync login',
    noindex: true,
  },
  signUp: {
    title: 'Sign Up - Start Free with ekiliSync',
    description:
      'Create your free ekiliSync account today. Get started with smart attendance tracking in minutes.',
    keywords: 'sign up, create account, register, free trial, get started',
  },
}

// Organization structured data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ekiliSync',
  legalName: 'ekilie',
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/images/logo.png`,
  description: seoConfig.defaultDescription,
  foundingDate: '2024',
  founders: [
    {
      '@type': 'Person',
      name: 'ekilie Team',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@ekilisync.com',
    url: `${seoConfig.siteUrl}/support`,
  },
  sameAs: [
    'https://twitter.com/ekilisync',
    'https://linkedin.com/company/ekilisync',
    'https://facebook.com/ekilisync',
  ],
}

// Website structured data
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  description: seoConfig.defaultDescription,
  publisher: {
    '@type': 'Organization',
    name: 'ekiliSync',
    logo: {
      '@type': 'ImageObject',
      url: `${seoConfig.siteUrl}/images/logo.png`,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// Software Application structured data
export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ekiliSync',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: seoConfig.defaultDescription,
  url: seoConfig.siteUrl,
  image: `${seoConfig.siteUrl}/images/og-image.png`,
  screenshot: `${seoConfig.siteUrl}/images/ekiliSync.jpeg`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
  featureList: [
    'Location-based automatic attendance',
    'Real-time tracking',
    'Geofencing technology',
    'Mobile app for employees',
    'Automated reports',
    'Team management',
    'Analytics dashboard',
  ],
}
