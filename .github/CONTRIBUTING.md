# Contributing to Kopi Translate SG Style

Thank you for your interest in contributing to Kopi Translate SG Style! 🇸🇬

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Translation Guidelines](#translation-guidelines)
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
- Steps to reproduce the problem
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please use the feature request template and include:

- A clear description of the feature
- Why it would be useful
- How it relates to Singapore context
- Any implementation ideas

### Translation Improvements

We especially welcome contributions that improve translation accuracy for Singapore context:

- **Singlish support**: Help us better handle Singlish phrases and expressions
- **Local terminology**: Improve translations for Singapore-specific terms
- **Cultural context**: Enhance cultural sensitivity in translations
- **Food terminology**: Better handling of local food names and descriptions

## Translation Guidelines

### Singapore-Specific Considerations

When contributing translation improvements:

1. **Preserve local context**: Don't over-translate Singapore-specific terms
   - "HDB" should remain "HDB" in most cases
   - "Kopitiam" should remain "kopitiam"
   - "MRT" should remain "MRT"

2. **Handle Singlish appropriately**: 
   - Understand when to preserve Singlish expressions
   - Know when to provide standard translations
   - Maintain the spirit of the original expression

3. **Cultural sensitivity**:
   - Be aware of cultural nuances
   - Respect religious and cultural references
   - Understand local humor and expressions

4. **Food and dining**:
   - Preserve authentic food names when appropriate
   - Provide context when helpful
   - Understand hawker center terminology

### Language Pairs Priority

1. **English ↔ Chinese (Simplified)**
2. **English ↔ Chinese (Traditional)**
3. **English ↔ Malay**
4. **English ↔ Tamil**

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
Add Singlish phrase detection feature

- Implement pattern matching for common Singlish expressions
- Add translation context preservation
- Update test cases for new functionality

Fixes #123
```

## Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Use Prettier for code formatting
- Use ESLint for code linting
- Write meaningful variable and function names

## Testing

Before submitting:

- [ ] Run `pnpm build` to ensure the project builds
- [ ] Test translation functionality manually
- [ ] Verify UI/UX changes work across different screen sizes
- [ ] Check that your changes don't break existing functionality

## Translation Testing

For translation-related contributions:

- Test with native speakers when possible
- Verify Singapore context is preserved
- Ensure cultural appropriateness
- Test edge cases and special characters

## Questions?

If you have questions:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Be specific about what you need help with

## Recognition

Contributors will be recognized in our README and release notes. We appreciate all forms of contribution!

---

Thank you for helping make Kopi Translate SG Style better for the Singapore community! 🚀
