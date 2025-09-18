/**
 * Tests for it-alert Web Component
 */

require('../src/it-alert.js');

describe('ItAlert', () => {
  let alertElement;

  beforeEach(() => {
    // Create a new alert element for each test
    alertElement = document.createElement('it-alert');
    document.body.appendChild(alertElement);
  });

  afterEach(() => {
    // Clean up after each test
    if (alertElement && alertElement.parentNode) {
      alertElement.parentNode.removeChild(alertElement);
    }
  });

  describe('Basic functionality', () => {
    test('should be defined as a custom element', () => {
      expect(customElements.get('it-alert')).toBeDefined();
    });

    test('should extend HTMLElement', () => {
      expect(alertElement instanceof HTMLElement).toBe(true);
    });

    test('should have shadow DOM', () => {
      expect(alertElement.shadowRoot).toBeDefined();
    });

    test('should render with default type', () => {
      expect(alertElement.type).toBe('info');
    });

    test('should not be dismissible by default', () => {
      expect(alertElement.dismissible).toBe(false);
    });

    test('should not be dismissed by default', () => {
      expect(alertElement.dismissed).toBe(false);
    });
  });

  describe('Attributes and properties', () => {
    test('should set type attribute', () => {
      alertElement.type = 'success';
      expect(alertElement.getAttribute('type')).toBe('success');
      expect(alertElement.type).toBe('success');
    });

    test('should set dismissible attribute', () => {
      alertElement.dismissible = true;
      expect(alertElement.hasAttribute('dismissible')).toBe(true);
      expect(alertElement.dismissible).toBe(true);
    });

    test('should set dismissed attribute', () => {
      alertElement.dismissed = true;
      expect(alertElement.hasAttribute('dismissed')).toBe(true);
      expect(alertElement.dismissed).toBe(true);
    });

    test('should handle type attribute changes', () => {
      alertElement.setAttribute('type', 'warning');
      expect(alertElement.type).toBe('warning');
    });

    test('should handle dismissible attribute changes', () => {
      alertElement.setAttribute('dismissible', '');
      expect(alertElement.dismissible).toBe(true);
    });

    test('should handle dismissed attribute changes', () => {
      alertElement.setAttribute('dismissed', '');
      expect(alertElement.dismissed).toBe(true);
    });
  });

  describe('Dismiss functionality', () => {
    test('should dismiss alert when dismiss() is called', () => {
      alertElement.dismiss();
      expect(alertElement.dismissed).toBe(true);
    });

    test('should show alert when show() is called', () => {
      alertElement.dismissed = true;
      alertElement.show();
      expect(alertElement.dismissed).toBe(false);
    });

    test('should dispatch dismiss event when dismissed', (done) => {
      alertElement.addEventListener('it-alert-dismiss', (event) => {
        expect(event.detail.alert).toBe(alertElement);
        expect(event.detail.type).toBe('info');
        expect(event.bubbles).toBe(true);
        expect(event.cancelable).toBe(true);
        done();
      });

      alertElement.dismiss();
    });
  });

  describe('Type variations', () => {
    const types = ['info', 'success', 'warning', 'danger'];

    types.forEach(type => {
      test(`should handle ${type} type correctly`, () => {
        alertElement.type = type;
        expect(alertElement.type).toBe(type);
      });
    });
  });

  describe('Edge cases', () => {
    test('should handle empty type attribute', () => {
      alertElement.setAttribute('type', '');
      expect(alertElement.type).toBe('info'); // Should default to info
    });

    test('should handle null type', () => {
      alertElement.type = null;
      expect(alertElement.type).toBe('info'); // Should default to info
    });

    test('should handle undefined type', () => {
      alertElement.type = undefined;
      expect(alertElement.type).toBe('info'); // Should default to info
    });

    test('should handle multiple attribute changes', () => {
      alertElement.setAttribute('type', 'warning');
      alertElement.setAttribute('dismissible', '');
      alertElement.setAttribute('dismissed', '');
      
      expect(alertElement.type).toBe('warning');
      expect(alertElement.dismissible).toBe(true);
      expect(alertElement.dismissed).toBe(true);
    });
  });
});