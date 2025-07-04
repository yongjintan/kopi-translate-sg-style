# Development Instructions for Kopi Translate SG Style

## 📋 Overview

This document provides comprehensive instructions for developing and maintaining the Kopi Translate SG Style application. This is a Singapore-focused translation tool that preserves local context, Singlish expressions, and cultural nuances.

## 🎯 Project Goals

- Create accurate translations that preserve Singapore context
- Handle Singlish expressions appropriately
- Maintain cultural sensitivity in translations
- Provide a mobile-first, user-friendly interface
- Support multilingual Singapore community

## 🏗️ Architecture Guidelines

### Frontend Structure
```
app/                    # Next.js 14 App Router
├── globals.css        # Global styles
├── layout.tsx         # Root layout
└── page.tsx           # Homepage

components/            # React components
├── ui/               # shadcn/ui components
└── theme-provider.tsx # Theme configuration

lib/                   # Utilities
└── utils.ts          # Helper functions

hooks/                 # Custom React hooks
├── use-mobile.tsx    # Mobile detection
└── use-toast.ts      # Toast notifications
```

### Key Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Package Manager**: pnpm
- **Deployment**: Vercel

## 🔧 Development Setup

### Prerequisites
```bash
# Required versions
Node.js >= 18.0.0
pnpm >= 8.0.0
Git >= 2.0.0
```

### Initial Setup
```bash
# Clone repository
git clone https://github.com/yourusername/kopi-translate-sg-style.git
cd kopi-translate-sg-style

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
open http://localhost:3000
```

### Environment Variables
Create `.env.local` for local development:
```env
# Translation API keys (if using external services)
NEXT_PUBLIC_TRANSLATION_API_KEY=your_api_key_here

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Development settings
NODE_ENV=development
```

## 🎨 UI/UX Guidelines

### Design Principles
1. **Mobile-First**: Design for mobile, enhance for desktop
2. **Accessibility**: Follow WCAG 2.1 AA standards
3. **Cultural Sensitivity**: Use appropriate colors and imagery for Singapore context
4. **Performance**: Optimize for fast loading on mobile networks

### Component Standards
- Use shadcn/ui components as base
- Follow consistent naming conventions
- Implement proper TypeScript types
- Add proper ARIA labels for accessibility

### Color Scheme
```css
/* Singapore-inspired color palette */
--singapore-red: #DA0010;      /* Singapore flag red */
--singapore-white: #FFFFFF;    /* Singapore flag white */
--hawker-orange: #FF6B35;      /* Hawker center warmth */
--mrt-blue: #0066CC;           /* MRT system blue */
--nature-green: #228B22;       /* Garden city green */
```

## 🔤 Translation Implementation

### Core Translation Logic

#### 1. Input Processing
```typescript
interface TranslationInput {
  text: string;
  sourceLang: string;
  targetLang: string;
  context?: 'formal' | 'casual' | 'singlish';
}
```

#### 2. Singapore Context Detection
```typescript
// Detect Singapore-specific terms
const SG_TERMS = {
  transport: ['MRT', 'LRT', 'ERP', 'COE', 'bus interchange'],
  housing: ['HDB', 'BTO', 'condo', 'landed', 'void deck'],
  food: ['kopitiam', 'hawker center', 'teh', 'kopi', 'laksa'],
  places: ['Orchard', 'Sentosa', 'Marina Bay', 'Changi'],
  singlish: ['lah', 'lor', 'meh', 'sia', 'wah', 'aiyah']
};
```

#### 3. Translation Preservation Rules
```typescript
// Terms that should NOT be translated
const PRESERVE_TERMS = [
  'HDB', 'MRT', 'LRT', 'ERP', 'COE',
  'kopitiam', 'hawker center',
  'Singlish', 'lah', 'lor', 'meh'
];

// Context-aware translation
function translateWithContext(input: TranslationInput): string {
  // 1. Identify Singapore terms
  // 2. Apply context-appropriate translation
  // 3. Preserve cultural terms
  // 4. Return localized result
}
```

### Language Support Priority

1. **English ↔ Chinese (Simplified)** - Primary focus
2. **English ↔ Chinese (Traditional)** - Secondary
3. **English ↔ Malay** - Community driven
4. **English ↔ Tamil** - Community driven

## 🧪 Testing Guidelines

### Test Structure
```
__tests__/
├── components/           # Component tests
├── lib/                 # Utility function tests
├── translation/         # Translation logic tests
└── e2e/                # End-to-end tests
```

### Testing Standards
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Translation accuracy tests
pnpm test:translation

# Build test
pnpm build
```

### Translation Testing Checklist
- [ ] Singapore terms are preserved correctly
- [ ] Singlish expressions maintain meaning
- [ ] Cultural context is maintained
- [ ] Edge cases are handled
- [ ] Native speaker validation (when possible)

## 📱 Mobile Optimization

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Mobile-Specific Features
- Touch-friendly interface
- Offline capability (future)
- Voice input (future)
- Share functionality
- Copy-to-clipboard

## 🔒 Security Considerations

### Data Handling
- Never log user translation input
- Sanitize all user inputs
- Use HTTPS for all API calls
- Implement rate limiting

### Privacy
- No storage of user translations
- Clear privacy policy
- Transparent data usage
- GDPR compliance (if applicable)

## 🚀 Deployment Process

### Development → Staging → Production

```bash
# Development
git checkout develop
git pull origin develop
# Make changes
git add .
git commit -m "feat: add feature description"
git push origin develop

# Create PR to main
# After review and approval
git checkout main
git pull origin main
# Automatic deployment via Vercel
```

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Translation accuracy verified
- [ ] Mobile responsiveness checked
- [ ] Performance metrics within targets
- [ ] Security scan passed

## 📊 Analytics & Monitoring

### Key Metrics to Track
- Translation accuracy feedback
- User engagement (time on site, translations per session)
- Language pair usage
- Error rates
- Performance metrics

### Tools
- Vercel Analytics (performance)
- Custom translation feedback system
- Error monitoring (Sentry or similar)

## 🤝 Community Guidelines

### Code Review Process
1. All PRs require review
2. Translation changes need native speaker validation
3. UI changes need accessibility review
4. Performance impact assessment required

### Contributing Areas
- Translation accuracy improvements
- Singapore context detection
- UI/UX enhancements
- Performance optimizations
- Documentation updates

## 🔄 Maintenance Schedule

### Weekly
- Dependency updates check
- Performance monitoring review
- Community feedback review

### Monthly
- Security audit
- Translation accuracy assessment
- Feature roadmap review
- Community contribution recognition

### Quarterly
- Major dependency updates
- Architecture review
- User research sessions
- Roadmap planning

## 📚 Resources

### Singapore Context References
- [Singlish Dictionary](https://www.singlishdictionary.com/)
- [Singapore Government Terms](https://www.gov.sg/)
- [MRT System Map](https://www.smrt.com.sg/)
- [HDB Housing Types](https://www.hdb.gov.sg/)

### Technical Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*Remember: We're building for Singapore's unique multicultural and multilingual community. Every translation should respect and preserve the rich cultural context that makes Singapore special.* 🇸🇬
