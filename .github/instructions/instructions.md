# Development Instructions for Kopi Translate SG Style

## 📋 Overview

This document provides comprehensive instructions for developing and maintaining the Kopi Translate SG Style application. This is a Singapore coffee ordering system that teaches authentic kopi slang and helps users learn kopitiam culture.

## 🎯 Project Goals

- Create an educational tool for learning authentic Singapore kopi terminology
- Help users build coffee orders through intuitive dropdown selections
- Generate accurate kopi slang based on traditional kopitiam rules
- Provide visual feedback with coffee/tea images
- Track order history for learning and favorites
- Make kopitiam culture accessible to both locals and tourists

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
# Future API integrations (if needed)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Development settings
NODE_ENV=development
```

## 🎨 UI/UX Guidelines

### Design Principles
1. **Mobile-First**: Design for coffee shop environments and on-the-go ordering
2. **Accessibility**: Follow WCAG 2.1 AA standards for diverse user base
3. **Cultural Authenticity**: Use Singapore coffee culture imagery and terminology
4. **Educational Focus**: Make learning kopi slang intuitive and engaging
5. **Quick Interactions**: Optimize for fast ordering in busy kopitiam environments

### Component Standards
- Use shadcn/ui components as base
- Follow consistent naming conventions for coffee terminology
- Implement proper TypeScript types for orders and drinks
- Add proper ARIA labels for accessibility
- Ensure touch-friendly sizing for mobile coffee shop usage

### Color Scheme
```css
/* Kopitiam-inspired color palette */
--kopi-brown: #8B4513;         /* Coffee brown */
--teh-amber: #FF6B35;          /* Tea amber */
--hawker-orange: #FF6B35;      /* Hawker center warmth */
--kopitiam-cream: #F5F5DC;     /* Cream/milk color */
--singapore-green: #228B22;    /* Garden city green */
```

## ☕ Kopi Slang Generation System

### Core Order Processing Logic

#### 1. Order Input Structure
```typescript
interface OrderInput {
  customerName: string;
  drinkType: 'coffee' | 'tea' | 'milo';
  milkType: 'condensed' | 'evaporated' | 'none';
  sweetness: 'normal' | 'less' | 'extra' | 'none';
  temperature: 'hot' | 'iced';
}

interface Order {
  id: string;
  name: string;
  drink: string;
  kopiSlang: string;
  timestamp: Date;
}
```

#### 2. Kopi Slang Generation Rules
```typescript
// Base drink mapping
const DRINK_BASE = {
  coffee: 'Kopi',
  tea: 'Teh', 
  milo: 'Milo'
};

// Milk modifier rules
const MILK_MODIFIERS = {
  condensed: '',        // Default, no suffix
  evaporated: '-C',     // Carnation milk
  none: '-O'           // "O" meaning black
};

// Sugar modifier rules  
const SUGAR_MODIFIERS = {
  normal: '',           // Default sweetness
  less: ' Siu Dai',     // Less sweet
  extra: ' Gah Dai',    // Extra sweet  
  none: ' Kosong'       // No sugar
};

// Temperature modifier
const TEMP_MODIFIERS = {
  hot: '',              // Default
  iced: ' Peng'         // Iced
};
```

#### 3. Slang Generation Function
```typescript
function generateKopiSlang(input: OrderInput): string {
  const base = DRINK_BASE[input.drinkType];
  const milk = MILK_MODIFIERS[input.milkType];
  const sugar = SUGAR_MODIFIERS[input.sweetness];
  const temp = TEMP_MODIFIERS[input.temperature];
  
  return `${base}${milk}${sugar}${temp}`.trim();
}
```

### Visual Representation System

#### Coffee/Tea Image Mapping
```typescript
interface DrinkVisual {
  imageSrc: string;
  label: string;
  alt: string;
}

const VISUAL_MAPPING = {
  'kopi': '/images/kopi.png',           // Coffee with condensed milk
  'kopi-o': '/images/kopi-o.png',       // Black coffee
  'kopi-c': '/images/kopi-c.png',       // Coffee with evaporated milk
  'kopi-peng': '/images/kopi-peng.png', // Iced coffee
  'teh': '/images/teh.png',             // Tea with condensed milk
  'teh-peng': '/images/teh-peng.png',   // Iced tea
  'milo': '/images/milo.png'            // Milo chocolate drink
};
```

## 🧪 Testing Guidelines

### Test Structure
```
__tests__/
├── components/           # Component tests
├── lib/                 # Utility function tests
├── kopi-slang/          # Kopi slang generation tests
└── e2e/                # End-to-end tests
```

### Testing Standards
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Kopi slang accuracy tests
pnpm test:kopi-slang

# Build test
pnpm build
```

### Kopi Slang Testing Checklist
- [ ] All drink combinations generate correct slang
- [ ] Edge cases handled (e.g., Milo with milk modifiers)
- [ ] Slang matches authentic kopitiam terminology
- [ ] Visual representations match generated slang
- [ ] Order history persists correctly
- [ ] Cultural authenticity validated by Singapore coffee culture experts

## 📱 Mobile Optimization

### Performance Targets
- **Order Form Response**: < 100ms per dropdown selection
- **Slang Generation**: < 50ms instant feedback
- **Image Loading**: < 500ms for coffee visuals
- **Order History Load**: < 200ms
- **Local Storage Operations**: < 100ms

### Coffee Shop Environment Features
- Touch-friendly dropdown interfaces
- High contrast for bright coffee shop lighting
- Quick order building workflow
- Offline order history access
- Copy-to-clipboard for sharing orders
- Educational tooltips that don't interrupt ordering flow
- Voice input (future)
- Share functionality
- Copy-to-clipboard

## 🔒 Security Considerations

### Data Handling
- Store order history locally in browser storage only
- Sanitize customer name inputs
- No external API calls required for core functionality
- Implement basic input validation for dropdown selections

### Privacy
- No server-side storage of user orders
- Order history remains on user's device
- Clear privacy policy about local data usage
- Export functionality for user data portability

## 🚀 Deployment Process

### Development → Staging → Production

```bash
# Development
git checkout develop
git pull origin develop
# Make changes to kopi slang rules or UI
git add .
git commit -m "feat: add new coffee variation support"
git push origin develop

# Create PR to main
# After review and kopitiam culture validation
git checkout main
git pull origin main
# Automatic deployment via Vercel
```

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Kopi slang generation accuracy verified
- [ ] Mobile responsiveness in coffee shop lighting tested
- [ ] Order history functionality working
- [ ] Coffee images loading correctly
- [ ] Cultural authenticity reviewed by Singapore locals

## 📊 Analytics & Monitoring

### Key Metrics to Track
- Most popular kopi combinations ordered
- User engagement (orders per session, return visits)
- Educational content interaction (hover cards, visual previews)
- Order history usage patterns
- Coffee shop environment performance metrics

### Tools
- Vercel Analytics (performance)
- Custom order analytics (popular combinations)
- Error monitoring for slang generation
- User feedback system for cultural accuracy

## 🤝 Community Guidelines

### Code Review Process
1. All PRs require review
2. Kopi slang changes need Singapore local validation
3. UI changes need coffee shop environment testing
4. Cultural authenticity assessment required
5. Order flow usability review

### Contributing Areas
- Kopi slang accuracy improvements
- New coffee/tea variations
- Visual coffee representation enhancements
- Coffee shop usability optimizations
- Educational content improvements
- Documentation updates

## 🔄 Maintenance Schedule

### Weekly
- Dependency updates check
- Order analytics review
- Community feedback on kopi accuracy review
- Coffee shop environment performance monitoring

### Monthly
- Security audit
- Kopi slang cultural accuracy assessment
- Feature roadmap review
- Community contribution recognition
- Coffee shop user research

### Quarterly
- Major dependency updates
- Architecture review
- Singapore coffee culture research update
- Roadmap planning with community input

## 📚 Resources

### Singapore Coffee Culture References
- [Singapore Kopi Culture Guide](https://www.visitsingapore.com/dining-drinks-singapore/local-dishes/kopi/)
- [Traditional Kopitiam Terminology](https://www.straitstimes.com/lifestyle/food/kopi-talk)
- [Singapore Coffee Shop History](https://www.roots.sg/learn/stories/kopitiam-culture)
- [Authentic Kopi Ordering Guide](https://thehoneycombers.com/singapore/kopi-guide-singapore/)

### Technical Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*Remember: We're building an educational tool for Singapore's rich kopitiam culture. Every kopi slang generation should be authentic, respectful, and help users learn genuine coffee ordering traditions.* 🇸🇬☕
