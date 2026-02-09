# Contributing to Asset QR System

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/asset-qr-system/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features

1. Check existing [Issues](https://github.com/yourusername/asset-qr-system/issues) for similar suggestions
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Test thoroughly
5. Commit with clear messages:
   ```bash
   git commit -m "Add: description of feature"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots/GIFs if applicable

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Use meaningful variable and function names
- Comment complex logic
- Follow existing code patterns

### JavaScript

- Use ES6+ features
- Prefer `const` and `let` over `var`
- Use template literals for strings
- Write clear, self-documenting code

### CSS

- Use CSS variables for colors and common values
- Follow mobile-first approach
- Keep selectors simple and specific
- Group related styles together

### HTML

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Keep markup clean and well-indented

## Testing

Before submitting:
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices
- Verify QR code scanning works
- Check responsive design
- Ensure no console errors

## Asset Data

When updating `assets.json`:
- Maintain the existing structure
- Validate JSON syntax
- Test with the application
- Don't commit sensitive data

## Questions?

Feel free to:
- Open an issue for questions
- Contact the maintainers
- Check existing documentation

Thank you for contributing! 🎉
