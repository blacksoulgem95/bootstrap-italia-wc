/**
 * Bootstrap Italia Alert Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * Usage:
 * <it-alert type="success" dismissible>
 *   <strong>Successo!</strong> Questo è un alert di successo.
 * </it-alert>
 */

class ItAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._dismissible = false;
    this._type = 'info';
    this._dismissed = false;
    this._announcementId = `alert-${Math.random().toString(36).substr(2, 9)}`;
    this._dismissButtonId = `dismiss-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return ['type', 'dismissible', 'dismissed', 'role', 'aria-live', 'aria-atomic'];
  }

  connectedCallback() {
    this._dismissible = this.hasAttribute('dismissible');
    this._type = this.getAttribute('type') || 'info';
    this._dismissed = this.hasAttribute('dismissed');
    
    // Imposta attributi di accessibilità di default
    this.setupAccessibilityAttributes();
    this.render();
    this.setupEventListeners();
    this.setupKeyboardNavigation();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
    case 'type':
      this._type = newValue || 'info';
      this.updateType();
      this.updateAriaLabel();
      break;
    case 'dismissible':
      this._dismissible = this.hasAttribute('dismissible');
      this.updateDismissible();
      break;
    case 'dismissed':
      this._dismissed = this.hasAttribute('dismissed');
      this.updateVisibility();
      break;
    case 'role':
    case 'aria-live':
    case 'aria-atomic':
      this.updateAccessibilityAttributes();
      break;
    }
  }

  setupAccessibilityAttributes() {
    // Imposta attributi ARIA di base
    this.setAttribute('role', this.getAttribute('role') || 'alert');
    this.setAttribute('aria-live', this.getAttribute('aria-live') || 'polite');
    this.setAttribute('aria-atomic', this.getAttribute('aria-atomic') || 'true');
    this.setAttribute('aria-labelledby', this._announcementId);
    
    // Imposta aria-hidden se dismissibile
    if (this._dismissible) {
      this.setAttribute('aria-describedby', this._dismissButtonId);
    }
  }

  updateAccessibilityAttributes() {
    const alertElement = this.shadowRoot.querySelector('.alert');
    if (alertElement) {
      alertElement.setAttribute('role', this.getAttribute('role') || 'alert');
      alertElement.setAttribute('aria-live', this.getAttribute('aria-live') || 'polite');
      alertElement.setAttribute('aria-atomic', this.getAttribute('aria-atomic') || 'true');
      alertElement.setAttribute('aria-labelledby', this._announcementId);
      
      if (this._dismissible) {
        alertElement.setAttribute('aria-describedby', this._dismissButtonId);
      } else {
        alertElement.removeAttribute('aria-describedby');
      }
    }
  }

  updateAriaLabel() {
    const alertElement = this.shadowRoot.querySelector('.alert');
    if (alertElement) {
      const typeLabels = {
        'info': 'Informazione',
        'success': 'Successo',
        'warning': 'Avvertimento',
        'danger': 'Errore'
      };
      
      const label = typeLabels[this._type] || 'Informazione';
      alertElement.setAttribute('aria-label', `Alert ${label}`);
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
    const typeLabels = {
      'info': 'Informazione',
      'success': 'Successo', 
      'warning': 'Avvertimento',
      'danger': 'Errore'
    };
    const label = typeLabels[this._type] || 'Informazione';
    
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
          /* Supporto per modalità ad alto contrasto */
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        
        .alert:focus-within {
          outline: 2px solid currentColor;
          outline-offset: 2px;
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
          /* Accessibilità: focus visibile */
          outline: 2px solid transparent;
          outline-offset: 2px;
          border-radius: 0.25rem;
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-close:hover,
        .btn-close:focus {
          opacity: 0.75;
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
        
        .btn-close:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
        
        .btn-close::before {
          content: "×";
          font-size: 1.5rem;
          line-height: 1;
        }
        
        .alert[hidden] {
          display: none !important;
        }
        
        ::slotted(*) {
          margin: 0;
        }
        
        /* Supporto per prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .alert,
          .btn-close {
            transition: none;
          }
        }
        
        /* Supporto per modalità ad alto contrasto */
        @media (prefers-contrast: high) {
          .alert {
            border-width: 2px;
          }
          
          .btn-close {
            border: 1px solid currentColor;
          }
        }
        
        /* Classe per screen reader only */
        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }
      </style>
      
      <div 
        class="alert ${alertClasses}" 
        ${this._dismissed ? 'hidden' : ''}
        role="${this.getAttribute('role') || 'alert'}"
        aria-live="${this.getAttribute('aria-live') || 'polite'}"
        aria-atomic="${this.getAttribute('aria-atomic') || 'true'}"
        aria-labelledby="${this._announcementId}"
        ${this._dismissible ? `aria-describedby="${this._dismissButtonId}"` : ''}
        aria-label="Alert ${label}"
        tabindex="-1"
      >
        <span id="${this._announcementId}" class="sr-only">Alert ${label}:</span>
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
    return `
      <button 
        type="button" 
        class="btn-close" 
        id="${this._dismissButtonId}"
        aria-label="Chiudi alert"
        title="Chiudi questo alert"
      >
        <span class="sr-only">Chiudi</span>
      </button>
    `;
  }

  setupEventListeners() {
    const dismissButton = this.shadowRoot.querySelector('.btn-close');
    if (dismissButton) {
      dismissButton.addEventListener('click', () => {
        this.dismiss();
      });
      
      // Supporto per Enter e Space
      dismissButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.dismiss();
        }
      });
    }
  }

  setupKeyboardNavigation() {
    // Gestione della navigazione da tastiera
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this._dismissible && !this._dismissed) {
        this.dismiss();
      }
    });
  }

  updateType() {
    const alertElement = this.shadowRoot.querySelector('.alert');
    if (alertElement) {
      // Remove old type class
      alertElement.classList.remove('alert-info', 'alert-success', 'alert-warning', 'alert-danger');
      // Add new type class
      alertElement.classList.add(`alert-${this._type}`);
      
      // Aggiorna aria-label
      this.updateAriaLabel();
    }
  }

  updateDismissible() {
    this.render();
    this.setupEventListeners();
    this.setupKeyboardNavigation();
  }

  updateVisibility() {
    const alertElement = this.shadowRoot.querySelector('.alert');
    if (alertElement) {
      if (this._dismissed) {
        alertElement.setAttribute('hidden', '');
        alertElement.setAttribute('aria-hidden', 'true');
      } else {
        alertElement.removeAttribute('hidden');
        alertElement.removeAttribute('aria-hidden');
      }
    }
  }

  dismiss() {
    this._dismissed = true;
    this.setAttribute('dismissed', '');
    
    // Annuncia la chiusura agli screen reader
    this.announceToScreenReader('Alert chiuso');
    
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
    
    // Annuncia la riapertura agli screen reader
    this.announceToScreenReader('Alert riaperto');
  }

  announceToScreenReader(message) {
    // Crea un elemento temporaneo per annunciare ai screen reader
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Rimuovi dopo un breve delay
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Register the custom element
if (!customElements.get('it-alert')) {
  customElements.define('it-alert', ItAlert);
}

export default ItAlert;