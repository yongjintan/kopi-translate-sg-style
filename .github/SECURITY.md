# Security Policy

## Supported Versions

We take security seriously and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ |
| < 1.0   | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability, please follow these steps:

### 1. Do NOT create a public issue

Please do not report security vulnerabilities through public GitHub issues.

### 2. Send a private report

Send an email to [your-security-email@domain.com] with:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (if you have them)

### 3. What to expect

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Initial assessment**: We'll provide an initial assessment within 5 business days
- **Progress updates**: We'll keep you informed of our progress
- **Resolution**: We aim to resolve critical issues within 30 days

### 4. Responsible disclosure

We ask that you:

- Give us reasonable time to fix the issue before public disclosure
- Don't access or modify data that doesn't belong to you
- Don't perform actions that could harm our users or service availability

## Security Considerations for Contributors

When contributing to this project:

### Data Handling
- Never log or store user input unnecessarily
- Be careful with translation data that might contain sensitive information
- Implement proper input sanitization

### API Security
- Don't expose API keys in client-side code
- Use environment variables for sensitive configuration
- Implement rate limiting where appropriate

### Dependencies
- Keep dependencies updated
- Review new dependencies for security issues
- Use `pnpm audit` to check for vulnerabilities

### User Privacy
- Respect user privacy in translations
- Don't store personal information unnecessarily
- Be transparent about data usage

## Security Features

This application implements:

- Input sanitization for user translations
- Secure handling of API responses
- No storage of user translation data
- Rate limiting (when applicable)
- Regular dependency updates

## Contact

For security-related questions or concerns, contact:
- Email: [your-security-email@domain.com]
- PGP Key: [Optional: link to PGP key]

---

Thank you for helping keep Kopi Translate SG Style secure! 🔒
