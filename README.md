# ekiliSync Web Application

Smart location-based attendance tracking system built with React, TypeScript, and Vite.

## 🚀 Features

- **Automatic Attendance Tracking** - Location-based check-in/out
- **Real-time Dashboard** - Monitor attendance in real-time
- **Employee Management** - Manage your team efficiently
- **Advanced Analytics** - Detailed reports and insights
- **Mobile Responsive** - Works seamlessly on all devices
- **Dark Mode Support** - Built-in theme switching
- **Advanced SEO** - Optimized for search engines

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/ekilie/ekilisync-web.git

# Navigate to project directory
cd ekilisync-web/web

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏃‍♂️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run knip` - Check for unused dependencies

## 📁 Project Structure

```
web/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components
│   │   ├── layout/       # Layout components
│   │   └── seo.tsx       # SEO component
│   ├── features/         # Feature-specific components
│   │   ├── landingPage/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── attendance/
│   │   ├── employees/
│   │   └── ...
│   ├── routes/           # Route definitions
│   ├── config/           # Configuration files
│   │   ├── fonts.ts
│   │   └── seo.ts        # SEO configuration
│   ├── lib/              # Utilities and helpers
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # State management
│   └── context/          # React context providers
├── public/
│   ├── images/           # Static images
│   ├── robots.txt        # Search engine directives
│   └── sitemap.xml       # URL sitemap
├── docs/                 # Documentation
│   ├── SEO.md           # SEO implementation guide
│   ├── SEO-QUICK-REFERENCE.md
│   └── OG-IMAGES-TODO.md
└── index.html
```

## 🎨 Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Router** - Routing solution
- **TanStack Query** - Data fetching & caching

### UI/Styling
- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Headless UI components
- **Framer Motion** - Animations
- **next-themes** - Theme management
- **Lucide Icons** - Icon library

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation

### State Management
- **Zustand** - Global state
- **React Context** - Local state

### HTTP & API
- **Axios** - HTTP client
- **Clerk** - Authentication

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript linting

## 🔍 SEO Implementation

This project includes comprehensive SEO optimization:

- ✅ Dynamic meta tags management
- ✅ Open Graph tags for social media
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD) schemas
- ✅ Sitemap and robots.txt
- ✅ Canonical URLs
- ✅ Per-route SEO configuration

### SEO Documentation
- **Full Guide:** [docs/SEO.md](./docs/SEO.md)
- **Quick Reference:** [docs/SEO-QUICK-REFERENCE.md](./docs/SEO-QUICK-REFERENCE.md)
- **OG Images Guide:** [docs/OG-IMAGES-TODO.md](./docs/OG-IMAGES-TODO.md)

### Using SEO in Components

```tsx
import { SEO } from '@/components/seo'
import { seoConfig, routeSEO } from '@/config/seo'

function MyPage() {
  return (
    <>
      <SEO
        title="Page Title - ekiliSync"
        description="Page description"
        canonical={`${seoConfig.siteUrl}/page`}
      />
      {/* Page content */}
    </>
  )
}
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_BASE_URL=your_api_url

# Clerk Authentication (if using)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Other configurations
VITE_APP_ENV=development
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deployment Platforms

This project is configured for:
- **Vercel** (vercel.json included)
- **Netlify** (netlify.toml included)
- Any static hosting service

### Pre-deployment Checklist

- [ ] Update environment variables
- [ ] Test production build locally (`npm run preview`)
- [ ] Verify all routes work correctly
- [ ] Check SEO meta tags
- [ ] Test on different devices
- [ ] Verify API endpoints
- [ ] Update sitemap.xml with current date
- [ ] Create OG images (see [docs/OG-IMAGES-TODO.md](./docs/OG-IMAGES-TODO.md))

## 📱 Tauri Desktop App

This project also includes a Tauri configuration for building native desktop applications:

```bash
# Development
npm run tauri:dev

# Build
npm run tauri:build
```

## 🧪 Testing

### SEO Testing
```bash
# Check meta tags
curl http://localhost:5173 | grep -i "meta"

# Validate structured data
# Visit: https://search.google.com/test/rich-results
```

### Manual Testing
- Check responsive design on different screen sizes
- Test dark/light theme switching
- Verify all routes are accessible
- Test authentication flows
- Check API integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is private and proprietary.

## 👥 Team

- **ekilie** - Development Team

## 📞 Support

For support and questions:
- Email: support@ekilisync.com
- Documentation: [/documentation](https://ekilisync.com/documentation)
- Issues: GitHub Issues

## 🗺️ Roadmap

### Current Version (v1.4.1)
- ✅ Core attendance tracking
- ✅ Dashboard with analytics
- ✅ Employee management
- ✅ Landing page
- ✅ Advanced SEO implementation

### Upcoming Features
- [ ] Advanced reporting
- [ ] Multi-location support
- [ ] API integrations
- [ ] Mobile app (iOS/Android)
- [ ] Real-time notifications
- [ ] Payroll integration
- [ ] Custom workflows

## 🔒 Security

- All data transmitted over HTTPS
- Authentication via Clerk
- Secure API endpoints
- Environment variables for sensitive data
- Regular security updates

## 📊 Performance

- Lighthouse score: 90+ (target)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Core Web Vitals: All green

## 🌟 Acknowledgments

- [TanStack](https://tanstack.com/) for excellent React libraries
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast builds

---

**Built with ❤️ by ekilie**

For more information, visit [ekilisync.com](https://ekilisync.com)
