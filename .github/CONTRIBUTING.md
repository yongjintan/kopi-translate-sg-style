# Contributing to Kopi Translate SG Style

Thank you for your interest in contributing to Kopi Translate SG Style! 🇸🇬☕

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Kopi Culture Guidelines](#kopi-culture-guidelines)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. Please be respectful and inclusive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/kopi-translate-sg-style.git`
3. Install dependencies: `pnpm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- A clear and descriptive title
- Steps to reproduce the problem with specific dropdown selections
- Expected kopi slang output
- Actual kopi slang output
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please use the feature request template and include:

- A clear description of the feature
- Why it would be useful for learning kopi culture
- How it relates to Singapore kopitiam context
- Any implementation ideas

### Kopi Culture Improvements

We especially welcome contributions that improve kopi slang accuracy and cultural authenticity:

- **Kopi terminology accuracy**: Help us ensure authentic kopitiam slang generation
- **New coffee/tea variations**: Add support for additional drink types
- **Visual representations**: Improve coffee/tea images and descriptions
- **Educational content**: Enhance learning materials about kopitiam culture
- **Order flow improvements**: Better user experience for coffee shop environments

## Kopi Culture Guidelines

### Singapore Kopitiam Considerations

When contributing kopi slang improvements:

1. **Maintain authenticity**: Ensure all generated slang matches real kopitiam usage
   - "Kopi-O" means black coffee (no milk)
   - "Kopi-C" means coffee with evaporated milk
   - "Kosong" means no sugar
   - "Siu Dai" means less sweet
   - "Gah Dai" means extra sweet
   - "Peng" means iced

2. **Respect traditional ordering**:
   - Understand the proper order of modifiers
   - Know which combinations are authentic
   - Maintain cultural respect for kopitiam traditions

3. **Cultural sensitivity**:
   - Be aware of kopitiam etiquette
   - Respect coffee shop worker terminology
   - Understand local coffee culture context

4. **Educational value**:
   - Help users learn proper kopi ordering
   - Provide clear explanations for slang terms
   - Make kopitiam culture accessible to tourists and newcomers

### Drink Variations Priority

1. **Core drinks**: Kopi, Teh, Milo
2. **Milk variations**: Default (condensed), -C (evaporated), -O (no milk)
3. **Sugar levels**: Normal, Kosong, Siu Dai, Gah Dai
4. **Temperature**: Hot (default), Peng (iced)

## Development Setup

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kopi-translate-sg-style.git

# Navigate to the project directory
cd kopi-translate-sg-style

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
│   └── ui/             # UI components (shadcn/ui)
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── styles/             # Global styles
└── public/             # Static assets
```

## Submitting Changes

1. **Create a feature branch**: `git checkout -b feature/description`
2. **Make your changes**: Follow the coding standards
3. **Test your changes**: Ensure everything works correctly
4. **Commit with clear messages**: Use descriptive commit messages
5. **Push to your fork**: `git push origin feature/description`
6. **Create a Pull Request**: Use the PR template

### Commit Message Guidelines

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add support for Teh-C Peng combination

- Implement slang generation for iced tea with evaporated milk
- Add visual representation for this drink variant
- Update educational tooltips with proper explanation

Fixes #123
```

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Use Prettier for code formatting
- Use ESLint for code linting
- Write meaningful variable and function names related to coffee terminology

## Testing

Before submitting:

- [ ] Run `pnpm build` to ensure the project builds
- [ ] Test kopi slang generation manually with various combinations
- [ ] Verify UI/UX changes work in coffee shop lighting conditions
- [ ] Check that order history functionality works correctly
- [ ] Ensure visual coffee representations load properly

## Kopi Slang Testing

For kopi slang-related contributions:

- Test with Singapore locals when possible
- Verify all drink combinations produce authentic slang
- Ensure cultural appropriateness and accuracy
- Test edge cases (e.g., unusual modifier combinations)
- Validate against real kopitiam ordering patterns

## Questions?

If you have questions:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Be specific about what you need help with

## Recognition

Contributors will be recognized in our README and release notes. We appreciate all forms of contribution!

---

Thank you for helping make Kopi Translate SG Style better for learning Singapore coffee culture! 🚀☕
