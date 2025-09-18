/**
 * Bootstrap Italia Button Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente usa SOLO le classi CSS di Bootstrap Italia - nessun CSS custom
 * 
 * Usage:
 * <it-button type="primary" size="lg" disabled>
 *   Testo del bottone
 * </it-button>
 */

class ItButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._type = 'primary';
    this._size = null;
    this._variant = null; // 'outline', 'ghost', null
    this._disabled = false;
    this._loading = false;
    this._icon = null;
    this._iconPosition = 'left'; // 'left', 'right'
    this._buttonId = `button-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'type', 'size', 'variant', 'disabled', 'loading', 'icon', 'icon-position',
      'aria-label', 'aria-describedby', 'title'
    ];
  }

  connectedCallback() {
    this._type = this.getAttribute('type') || 'primary';
    this._size = this.getAttribute('size');
    this._variant = this.getAttribute('variant');
    this._disabled = this.hasAttribute('disabled');
    this._loading = this.hasAttribute('loading');
    this._icon = this.getAttribute('icon');
    this._iconPosition = this.getAttribute('icon-position') || 'left';
    
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'type':
        this._type = newValue || 'primary';
        this.updateType();
        break;
      case 'size':
        this._size = newValue;
        this.updateSize();
        break;
      case 'variant':
        this._variant = newValue;
        this.updateVariant();
        break;
      case 'disabled':
        this._disabled = this.hasAttribute('disabled');
        this.updateDisabled();
        break;
      case 'loading':
        this._loading = this.hasAttribute('loading');
        this.updateLoading();
        break;
      case 'icon':
        this._icon = newValue;
        this.updateIcon();
        break;
      case 'icon-position':
        this._iconPosition = newValue || 'left';
        this.updateIconPosition();
        break;
    }
  }

  setupAccessibility() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      // Imposta attributi ARIA
      const ariaLabel = this.getAttribute('aria-label');
      const ariaDescribedBy = this.getAttribute('aria-describedby');
      const title = this.getAttribute('title');
      
      if (ariaLabel) {
        button.setAttribute('aria-label', ariaLabel);
      }
      
      if (ariaDescribedBy) {
        button.setAttribute('aria-describedby', ariaDescribedBy);
      }
      
      if (title) {
        button.setAttribute('title', title);
      }
      
      if (this._disabled) {
        button.setAttribute('aria-disabled', 'true');
      } else {
        button.removeAttribute('aria-disabled');
      }
      
      if (this._loading) {
        button.setAttribute('aria-busy', 'true');
      } else {
        button.removeAttribute('aria-busy');
      }
    }
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value || 'primary';
    this.setAttribute('type', this._type);
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
    if (value) {
      this.setAttribute('size', value);
    } else {
      this.removeAttribute('size');
    }
  }

  get variant() {
    return this._variant;
  }

  set variant(value) {
    this._variant = value;
    if (value) {
      this.setAttribute('variant', value);
    } else {
      this.removeAttribute('variant');
    }
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = value;
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    if (value) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }

  get icon() {
    return this._icon;
  }

  set icon(value) {
    this._icon = value;
    if (value) {
      this.setAttribute('icon', value);
    } else {
      this.removeAttribute('icon');
    }
  }

  get iconPosition() {
    return this._iconPosition;
  }

  set iconPosition(value) {
    this._iconPosition = value || 'left';
    this.setAttribute('icon-position', this._iconPosition);
  }

  render() {
    const buttonClasses = this.getButtonClasses();
    const buttonAttributes = this.getButtonAttributes();
    const buttonContent = this.getButtonContent();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <button 
        class="${buttonClasses}"
        id="${this._buttonId}"
        ${buttonAttributes}
      >
        ${buttonContent}
      </button>
    `;
  }

  getButtonClasses() {
    const classes = ['btn'];
    
    // Tipo di bottone
    if (this._variant === 'outline') {
      classes.push(`btn-outline-${this._type}`);
    } else if (this._variant === 'ghost') {
      classes.push(`btn-ghost-${this._type}`);
    } else {
      classes.push(`btn-${this._type}`);
    }
    
    // Dimensione
    if (this._size) {
      classes.push(`btn-${this._size}`);
    }
    
    return classes.join(' ');
  }

  getButtonAttributes() {
    const attributes = [];
    
    if (this._disabled || this._loading) {
      attributes.push('disabled');
    }
    
    const type = this.getAttribute('button-type') || 'button';
    attributes.push(`type="${type}"`);
    
    return attributes.join(' ');
  }

  getButtonContent() {
    const content = [];
    const textContent = this.textContent.trim();
    
    // Icona di loading
    if (this._loading) {
      content.push('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>');
    }
    
    // Icona personalizzata
    if (this._icon && !this._loading) {
      const iconElement = `<i class="${this._icon}" aria-hidden="true"></i>`;
      if (this._iconPosition === 'left') {
        content.push(iconElement);
        if (textContent) {
          content.push(`<span class="ms-2">${textContent}</span>`);
        }
      } else {
        if (textContent) {
          content.push(`<span class="me-2">${textContent}</span>`);
        }
        content.push(iconElement);
      }
    } else if (textContent) {
      content.push(`<span>${textContent}</span>`);
    }
    
    return content.join('');
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.addEventListener('click', (event) => {
        if (!this._disabled && !this._loading) {
          this.dispatchEvent(new CustomEvent('it-button-click', {
            bubbles: true,
            detail: {
              button: this,
              type: this._type,
              variant: this._variant
            }
          }));
        }
      });
      
      button.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-button-focus', {
          bubbles: true,
          detail: {
            button: this
          }
        }));
      });
      
      button.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-button-blur', {
          bubbles: true,
          detail: {
            button: this
          }
        }));
      });
    }
  }

  updateType() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateSize() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateVariant() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateDisabled() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.disabled = this._disabled || this._loading;
      if (this._disabled) {
        button.setAttribute('aria-disabled', 'true');
      } else {
        button.removeAttribute('aria-disabled');
      }
    }
  }

  updateLoading() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateIcon() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateIconPosition() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  // Metodi pubblici per controllo programmatico
  focus() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.focus();
    }
  }

  blur() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.blur();
    }
  }

  click() {
    const button = this.shadowRoot.querySelector('button');
    if (button && !this._disabled && !this._loading) {
      button.click();
    }
  }

  setLoading(loading) {
    this.loading = loading;
  }
}

// Register the custom element
if (!customElements.get('it-button')) {
  customElements.define('it-button', ItButton);
}

export default ItButton;