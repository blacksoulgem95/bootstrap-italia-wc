/**
 * Bootstrap Italia Button Group Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente usa SOLO le classi CSS di Bootstrap Italia - nessun CSS custom
 * 
 * Usage:
 * <it-button-group size="lg" vertical>
 *   <it-button type="primary">Primo</it-button>
 *   <it-button type="secondary">Secondo</it-button>
 *   <it-button type="success">Terzo</it-button>
 * </it-button-group>
 */

class ItButtonGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._size = null;
    this._vertical = false;
    this._groupId = `button-group-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'size', 'vertical', 'aria-label', 'role'
    ];
  }

  connectedCallback() {
    this._size = this.getAttribute('size');
    this._vertical = this.hasAttribute('vertical');
    
    this.render();
    this.setupAccessibility();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'size':
        this._size = newValue;
        this.updateSize();
        break;
      case 'vertical':
        this._vertical = this.hasAttribute('vertical');
        this.updateVertical();
        break;
    }
  }

  setupAccessibility() {
    // Imposta attributi ARIA per il gruppo
    this.setAttribute('role', this.getAttribute('role') || 'group');
    
    const ariaLabel = this.getAttribute('aria-label');
    if (ariaLabel) {
      this.setAttribute('aria-label', ariaLabel);
    }
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

  get vertical() {
    return this._vertical;
  }

  set vertical(value) {
    this._vertical = value;
    if (value) {
      this.setAttribute('vertical', '');
    } else {
      this.removeAttribute('vertical');
    }
  }

  render() {
    const groupClasses = this.getGroupClasses();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <div 
        class="${groupClasses}"
        role="${this.getAttribute('role') || 'group'}"
        ${this.getAttribute('aria-label') ? `aria-label="${this.getAttribute('aria-label')}"` : ''}
      >
        <slot></slot>
      </div>
    `;
  }

  getGroupClasses() {
    const classes = ['btn-group'];
    
    if (this._vertical) {
      classes.push('btn-group-vertical');
    }
    
    if (this._size) {
      classes.push(`btn-group-${this._size}`);
    }
    
    return classes.join(' ');
  }

  setupEventListeners() {
    // Ascolta gli eventi click dai bottoni figli
    this.addEventListener('it-button-click', (event) => {
      // Propaga l'evento con informazioni aggiuntive sul gruppo
      this.dispatchEvent(new CustomEvent('it-button-group-click', {
        bubbles: true,
        detail: {
          button: event.detail.button,
          buttonType: event.detail.type,
          buttonVariant: event.detail.variant,
          group: this,
          groupSize: this._size,
          groupVertical: this._vertical
        }
      }));
    });
  }

  updateSize() {
    this.render();
    this.setupAccessibility();
    this.setupEventListeners();
  }

  updateVertical() {
    this.render();
    this.setupAccessibility();
    this.setupEventListeners();
  }

  // Metodi pubblici per controllo programmatico
  getButtons() {
    return Array.from(this.querySelectorAll('it-button'));
  }

  setButtonSize(size) {
    const buttons = this.getButtons();
    buttons.forEach(button => {
      button.size = size;
    });
  }

  setButtonType(type) {
    const buttons = this.getButtons();
    buttons.forEach(button => {
      button.type = type;
    });
  }

  setButtonVariant(variant) {
    const buttons = this.getButtons();
    buttons.forEach(button => {
      button.variant = variant;
    });
  }

  disableAll() {
    const buttons = this.getButtons();
    buttons.forEach(button => {
      button.disabled = true;
    });
  }

  enableAll() {
    const buttons = this.getButtons();
    buttons.forEach(button => {
      button.disabled = false;
    });
  }

  setLoadingAll(loading) {
    const buttons = this.getButtons();
    buttons.forEach(button => {
      button.loading = loading;
    });
  }
}

// Register the custom element
if (!customElements.get('it-button-group')) {
  customElements.define('it-button-group', ItButtonGroup);
}

export default ItButtonGroup;