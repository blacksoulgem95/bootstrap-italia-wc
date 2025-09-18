# Bootstrap Italia WC - Internal Documentation

This document contains internal information for developers working on the Bootstrap Italia WC project.

## Project Overview

Bootstrap Italia WC is a library that implements Bootstrap Italia components as native Web Components. The project follows a specific architecture and development workflow.

## Architecture

### Component Structure

Each Web Component follows this structure:

```javascript
class ItComponentName extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Initialize properties
  }

  static get observedAttributes() {
    return ['attr1', 'attr2'];
  }

  connectedCallback() {
    // Component initialization
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Handle attribute changes
  }

  render() {
    // Render component HTML and CSS
  }

  // Component-specific methods
}
```

### Naming Conventions

- **Component Classes**: `ItComponentName` (e.g., `ItAlert`, `ItButton`)
- **Custom Elements**: `it-component-name` (e.g., `it-alert`, `it-button`)
- **Event Names**: `it-component-action` (e.g., `it-alert-dismiss`)
- **CSS Classes**: Follow Bootstrap Italia conventions

### File Organization

```
src/
├── it-alert.js          # Alert component
├── it-button.js         # Button component (future)
├── it-modal.js          # Modal component (future)
└── index.js             # Main entry point
```

## Development Workflow

### 1. Adding New Components

1. **Create Component File**
   - Create `src/it-component-name.js`
   - Follow the component structure above
   - Implement all required methods

2. **Register Component**
   - Use `customElements.define('it-component-name', ItComponentName)`
   - Add safety check: `if (!customElements.get('it-component-name'))`

3. **Export Component**
   - Add import to `src/index.js`
   - Add to exports object
   - Add to main library object for UMD builds

4. **Add Tests**
   - Create `tests/it-component-name.test.js`
   - Test all public methods and properties
   - Test event handling
   - Test edge cases

5. **Create Examples**
   - Add example HTML in `examples/`
   - Demonstrate all features
   - Include interactive examples

6. **Update Documentation**
   - Update README.md with component documentation
   - Add API reference
   - Include usage examples

### 2. Component Development Guidelines

#### Shadow DOM Usage
- Always use Shadow DOM for encapsulation
- Include component-specific CSS in shadow DOM
- Use `<slot>` for content projection
- Avoid global CSS dependencies in shadow DOM

#### Event Handling
- Use Custom Events for component interactions
- Follow naming convention: `it-component-action`
- Include relevant data in event detail
- Make events bubble and cancelable when appropriate

#### Attribute Handling
- Use `observedAttributes` for reactive attributes
- Implement getters/setters for properties
- Handle attribute changes in `attributeChangedCallback`
- Provide sensible defaults

#### Styling
- Don't re-implement Bootstrap Italia styles
- Use CSS custom properties for theming
- Ensure accessibility compliance
- Test across different screen sizes

### 3. Testing Strategy

#### Unit Tests
- Test component initialization
- Test attribute/property handling
- Test event dispatching
- Test method functionality
- Test edge cases and error conditions

#### Integration Tests
- Test component interaction with DOM
- Test event handling
- Test accessibility features
- Test browser compatibility

#### Visual Tests
- Manual testing in examples
- Cross-browser testing
- Responsive design testing
- Accessibility testing

### 4. Build Process

#### Rollup Configuration
- Multiple output formats: UMD, ES modules
- Babel transpilation for browser compatibility
- Terser minification for production
- Source maps for debugging

#### Bundle Structure
```
dist/
├── bootstrap-italia-wc.js      # UMD build
├── bootstrap-italia-wc.min.js  # UMD minified
└── bootstrap-italia-wc.esm.js  # ES module build
```

### 5. Release Process

#### Versioning
- Follow Semantic Versioning (SemVer)
- Major: Breaking changes
- Minor: New features, backward compatible
- Patch: Bug fixes, backward compatible

#### Release Steps
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Run tests: `npm test`
4. Build project: `npm run build`
5. Create git tag: `git tag v1.0.0`
6. Push to repository
7. Publish to npm: `npm publish`

#### Pre-release Checklist
- [ ] All tests pass
- [ ] Examples work correctly
- [ ] Documentation is up to date
- [ ] CHANGELOG.md is updated
- [ ] Version numbers are correct
- [ ] Build output is correct

## Code Standards

### JavaScript
- Use ES6+ features
- Follow consistent naming conventions
- Add JSDoc comments for public methods
- Use meaningful variable names
- Handle errors gracefully

### CSS
- Use consistent indentation
- Group related properties
- Use meaningful class names
- Follow Bootstrap Italia conventions
- Ensure accessibility

### HTML
- Use semantic HTML
- Include proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers

## Browser Support

### Target Browsers
- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

### Polyfills
- Custom Elements v1
- Shadow DOM v1
- ES6 features (handled by Babel)

### Testing
- Test in all target browsers
- Use BrowserStack for cross-browser testing
- Test with assistive technologies

## Performance Considerations

### Bundle Size
- Keep components lightweight
- Use tree-shaking where possible
- Minimize dependencies
- Optimize images and assets

### Runtime Performance
- Use efficient DOM manipulation
- Minimize reflows and repaints
- Use event delegation where appropriate
- Lazy load components when possible

### Memory Management
- Clean up event listeners
- Remove DOM references
- Avoid memory leaks
- Use WeakMap for private data

## Accessibility Guidelines

### Conformità alle Normative Europee
Tutti i componenti devono rispettare le normative europee in materia di accessibilità:

- **Direttiva Europea sull'Accessibilità Web (2016/2102/EU)**
- **EN 301 549 V3.2.1** - Standard europeo per l'accessibilità ICT
- **WCAG 2.1 AA** - Web Content Accessibility Guidelines livello AA
- **Direttiva Europea sui Servizi Digitali (DSA)** - per quanto applicabile

### Requisiti Obbligatori
- **Percebilità**: Le informazioni devono essere presentate in modi che gli utenti possano percepire
- **Utilizzabilità**: I componenti devono essere navigabili e utilizzabili da tutti
- **Comprensibilità**: Le informazioni e l'operazione dell'interfaccia devono essere comprensibili
- **Robustezza**: Il contenuto deve essere abbastanza robusto da essere interpretato da una vasta gamma di tecnologie assistive

### ARIA Support
- Use appropriate ARIA roles
- Include ARIA labels and descriptions
- Support keyboard navigation
- Ensure screen reader compatibility
- Implement proper focus management
- Support high contrast mode
- Ensure color contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)

### Testing
- Test with keyboard only
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test with high contrast mode
- Test with reduced motion preferences
- Test with zoom up to 200%
- Validate with automated accessibility tools (axe-core, WAVE)
- Manual testing with real users with disabilities

## Security Considerations

### XSS Prevention
- Sanitize user input
- Use safe DOM manipulation
- Avoid innerHTML with user data
- Use textContent for text nodes

### CSP Compliance
- Avoid inline scripts
- Use external stylesheets
- Minimize eval usage
- Follow CSP best practices

## Troubleshooting

### Common Issues

#### Component Not Registering
- Check if customElements is supported
- Verify component name follows convention
- Ensure no naming conflicts

#### Styling Issues
- Check CSS specificity
- Verify Bootstrap Italia CSS is loaded
- Test in different browsers

#### Event Handling Problems
- Verify event names follow convention
- Check event bubbling settings
- Ensure proper event cleanup

### Debug Tools
- Browser DevTools
- Custom Elements DevTools extension
- Shadow DOM inspector
- Performance profiler

## Future Enhancements

### Planned Features
- Additional components (Button, Modal, etc.)
- Theme customization
- TypeScript support
- Storybook integration
- Automated testing

### Architecture Improvements
- Component composition
- State management
- Event system enhancements
- Performance optimizations

## Resources

### Documentation
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Bootstrap Italia](https://italia.github.io/bootstrap-italia/)
- [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)

### Tools
- [Rollup](https://rollupjs.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Babel](https://babeljs.io/)

### Testing
- [Jest](https://jestjs.io/)
- [jsdom](https://github.com/jsdom/jsdom)
- [BrowserStack](https://www.browserstack.com/)

## Contact

For questions about this internal documentation or the project architecture, please:
- Open an issue on GitHub
- Contact the maintainers
- Join the project discussions