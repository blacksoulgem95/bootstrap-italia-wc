# Bootstrap Italia WC

[![npm version](https://badge.fury.io/js/bootstrap-italia-wc.svg)](https://badge.fury.io/js/bootstrap-italia-wc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Bootstrap Italia components implemented as native Web Components in vanilla JavaScript.

## Overview

Bootstrap Italia WC provides a collection of native Web Components that implement the Bootstrap Italia design system. Each component extends `HTMLElement` and uses Shadow DOM where appropriate, ensuring encapsulation and compatibility with any framework or vanilla JavaScript application.

## Features

- 🚀 **Native Web Components** - Built with vanilla JavaScript, no framework dependencies
- 🎨 **Bootstrap Italia Design** - Follows the official Bootstrap Italia design system
- 📦 **Lightweight** - Minimal bundle size with tree-shaking support
- 🔧 **Framework Agnostic** - Works with React, Vue, Angular, or vanilla JavaScript
- ♿ **Accessible** - Built with accessibility in mind
- 🧪 **Well Tested** - Comprehensive test suite with Jest
- 📚 **Well Documented** - Extensive documentation and examples

## Installation

### NPM

```bash
npm install bootstrap-italia-wc
```

### CDN

```html
<!-- Bootstrap Italia CSS (required) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.0/dist/css/bootstrap-italia.min.css">

<!-- Bootstrap Italia WC JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-italia-wc@1.0.0/dist/bootstrap-italia-wc.min.js"></script>
```

### Download

Download the latest release from the [releases page](https://github.com/your-org/bootstrap-italia-wc/releases) and include the files in your project.

## Quick Start

1. **Include the CSS and JavaScript:**

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Bootstrap Italia CSS (required) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.0/dist/css/bootstrap-italia.min.css">
    
    <!-- Bootstrap Italia WC JavaScript -->
    <script src="path/to/bootstrap-italia-wc.js"></script>
</head>
<body>
    <!-- Your components here -->
</body>
</html>
```

2. **Use the Web Components:**

```html
<!-- Basic alert -->
<it-alert type="success">
    <strong>Success!</strong> Your action was completed successfully.
</it-alert>

<!-- Dismissible alert -->
<it-alert type="warning" dismissible>
    <strong>Warning!</strong> This alert can be dismissed.
</it-alert>
```

3. **Handle events (optional):**

```javascript
document.addEventListener('it-alert-dismiss', function(event) {
    console.log('Alert dismissed:', event.detail.type);
});
```

## Components

### it-alert

Displays contextual feedback messages for user actions.

#### Usage

```html
<it-alert type="success" dismissible>
    <strong>Success!</strong> Your action was completed successfully.
</it-alert>
```

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | string | `"info"` | Alert type: `"info"`, `"success"`, `"warning"`, `"danger"` |
| `dismissible` | boolean | `false` | Whether the alert can be dismissed |
| `dismissed` | boolean | `false` | Whether the alert is currently dismissed |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Get/set the alert type |
| `dismissible` | boolean | Get/set whether the alert is dismissible |
| `dismissed` | boolean | Get/set whether the alert is dismissed |

#### Methods

| Method | Description |
|--------|-------------|
| `dismiss()` | Dismiss the alert |
| `show()` | Show the alert (if dismissed) |

#### Events

| Event | Description |
|-------|-------------|
| `it-alert-dismiss` | Fired when the alert is dismissed |

#### Examples

```html
<!-- Basic alerts -->
<it-alert type="info">Information message</it-alert>
<it-alert type="success">Success message</it-alert>
<it-alert type="warning">Warning message</it-alert>
<it-alert type="danger">Danger message</it-alert>

<!-- Dismissible alerts -->
<it-alert type="info" dismissible>Dismissible info alert</it-alert>

<!-- Programmatic control -->
<it-alert type="success" dismissible id="my-alert">Controlled alert</it-alert>

<script>
const alert = document.getElementById('my-alert');
alert.dismiss(); // Dismiss the alert
alert.show();    // Show the alert
alert.type = 'warning'; // Change type
</script>
```

## Browser Support

Bootstrap Italia WC supports all modern browsers that implement the Web Components standards:

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browsers, you may need to include polyfills for Custom Elements and Shadow DOM.

## Development

### Prerequisites

- Node.js 16+
- npm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/bootstrap-italia-wc.git
cd bootstrap-italia-wc

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Start development server
npm run dev
```

### Project Structure

```
bootstrap-italia-wc/
├── src/                    # Source code
│   ├── it-alert.js        # Alert component
│   └── index.js           # Main entry point
├── dist/                  # Built files
├── examples/              # Usage examples
├── tests/                 # Test files
├── package.json           # Package configuration
├── rollup.config.js       # Rollup configuration
├── jest.config.js         # Jest configuration
├── README.md              # This file
└── AGENT.md               # Internal documentation
```

### Adding New Components

1. Create a new component file in `src/` (e.g., `it-button.js`)
2. Extend `HTMLElement` and implement the component
3. Register the component with `customElements.define()`
4. Export the component from `src/index.js`
5. Add tests in `tests/`
6. Create examples in `examples/`
7. Update documentation

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Building

```bash
# Build for production
npm run build

# Build in watch mode
npm run dev
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Bootstrap Italia](https://italia.github.io/bootstrap-italia/) for the design system
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for the technology
- All contributors who help make this project better

## Support

- 📖 [Documentation](https://github.com/your-org/bootstrap-italia-wc#readme)
- 🐛 [Issue Tracker](https://github.com/your-org/bootstrap-italia-wc/issues)
- 💬 [Discussions](https://github.com/your-org/bootstrap-italia-wc/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.