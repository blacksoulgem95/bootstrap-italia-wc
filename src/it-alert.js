/**
 * Bootstrap Italia Alert Web Component
 * 
 * Usage:
 * <it-alert type="success" dismissible>
 *   <strong>Success!</strong> This is a success alert.
 * </it-alert>
 */

class ItAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._dismissible = false;
    this._type = 'info';
    this._dismissed = false;
  }

  static get observedAttributes() {
    return ['type', 'dismissible', 'dismissed'];
  }

  connectedCallback() {
    this._dismissible = this.hasAttribute('dismissible');
    this._type = this.getAttribute('type') || 'info';
    this._dismissed = this.hasAttribute('dismissed');
    
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
    case 'type':
      this._type = newValue || 'info';
      this.updateType();
      break;
    case 'dismissible':
      this._dismissible = this.hasAttribute('dismissible');
      this.updateDismissible();
      break;
    case 'dismissed':
      this._dismissed = this.hasAttribute('dismissed');
      this.updateVisibility();
      break;
    }
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value || 'info';
    this.setAttribute('type', this._type);
  }

  get dismissible() {
    return this._dismissible;
  }

  set dismissible(value) {
    this._dismissible = value;
    if (value) {
      this.setAttribute('dismissible', '');
    } else {
      this.removeAttribute('dismissible');
    }
  }

  get dismissed() {
    return this._dismissed;
  }

  set dismissed(value) {
    this._dismissed = value;
    if (value) {
      this.setAttribute('dismissed', '');
    } else {
      this.removeAttribute('dismissed');
    }
  }

  render() {
    const alertClasses = this.getAlertClasses();
    const dismissButton = this._dismissible ? this.getDismissButton() : '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .alert {
          position: relative;
          padding: 0.75rem 1.25rem;
          margin-bottom: 1rem;
          border: 1px solid transparent;
          border-radius: 0.25rem;
        }
        
        .alert-info {
          color: #0c5460;
          background-color: #d1ecf1;
          border-color: #bee5eb;
        }
        
        .alert-success {
          color: #155724;
          background-color: #d4edda;
          border-color: #c3e6cb;
        }
        
        .alert-warning {
          color: #856404;
          background-color: #fff3cd;
          border-color: #ffeaa7;
        }
        
        .alert-danger {
          color: #721c24;
          background-color: #f8d7da;
          border-color: #f5c6cb;
        }
        
        .alert-dismissible {
          padding-right: 4rem;
        }
        
        .btn-close {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
          padding: 0.75rem 1.25rem;
          color: inherit;
          background: transparent;
          border: 0;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
          color: #000;
          text-shadow: 0 1px 0 #fff;
          opacity: 0.5;
          cursor: pointer;
        }
        
        .btn-close:hover {
          opacity: 0.75;
        }
        
        .btn-close::before {
          content: "×";
        }
        
        .alert[hidden] {
          display: none !important;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <div class="alert ${alertClasses}" ${this._dismissed ? 'hidden' : ''}>
        <slot></slot>
        ${dismissButton}
      </div>
    `;
  }

  getAlertClasses() {
    const classes = ['alert', `alert-${this._type}`];
    if (this._dismissible) {
      classes.push('alert-dismissible');
    }
    return classes.join(' ');
  }

  getDismissButton() {
    return '<button type="button" class="btn-close" aria-label="Close"></button>';
  }

  setupEventListeners() {
    const dismissButton = this.shadowRoot.querySelector('.btn-close');
    if (dismissButton) {
      dismissButton.addEventListener('click', () => {
        this.dismiss();
      });
    }
  }

  updateType() {
    const alertElement = this.shadowRoot.querySelector('.alert');
    if (alertElement) {
      // Remove old type class
      alertElement.classList.remove('alert-info', 'alert-success', 'alert-warning', 'alert-danger');
      // Add new type class
      alertElement.classList.add(`alert-${this._type}`);
    }
  }

  updateDismissible() {
    this.render();
    this.setupEventListeners();
  }

  updateVisibility() {
    const alertElement = this.shadowRoot.querySelector('.alert');
    if (alertElement) {
      if (this._dismissed) {
        alertElement.setAttribute('hidden', '');
      } else {
        alertElement.removeAttribute('hidden');
      }
    }
  }

  dismiss() {
    this._dismissed = true;
    this.setAttribute('dismissed', '');
    
    // Dispatch custom event
    const dismissEvent = new CustomEvent('it-alert-dismiss', {
      bubbles: true,
      cancelable: true,
      detail: {
        alert: this,
        type: this._type
      }
    });
    
    this.dispatchEvent(dismissEvent);
  }

  show() {
    this._dismissed = false;
    this.removeAttribute('dismissed');
  }
}

// Register the custom element
if (!customElements.get('it-alert')) {
  customElements.define('it-alert', ItAlert);
}

export default ItAlert;