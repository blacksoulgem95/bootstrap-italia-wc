/**
 * Bootstrap Italia Form Toggle Switch Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-toggle 
 *   label="Abilita notifiche" 
 *   value="enabled"
 *   checked
 *   required
 *   validation="valid"
 *   validation-message="Toggle valido"
 * ></it-form-toggle>
 */

class ItFormToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._label = '';
    this._value = '';
    this._checked = false;
    this._required = false;
    this._disabled = false;
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._helpText = '';
    this._toggleId = `toggle-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'label', 'value', 'checked', 'required', 'disabled',
      'validation', 'validation-message', 'help-text', 'name', 'id',
      'aria-label', 'aria-describedby'
    ];
  }

  connectedCallback() {
    this._label = this.getAttribute('label') || '';
    this._value = this.getAttribute('value') || '';
    this._checked = this.hasAttribute('checked');
    this._required = this.hasAttribute('required');
    this._disabled = this.hasAttribute('disabled');
    this._validation = this.getAttribute('validation');
    this._validationMessage = this.getAttribute('validation-message') || '';
    this._helpText = this.getAttribute('help-text') || '';
    
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'label':
        this._label = newValue || '';
        this.updateLabel();
        break;
      case 'value':
        this._value = newValue || '';
        this.updateValue();
        break;
      case 'checked':
        this._checked = this.hasAttribute('checked');
        this.updateChecked();
        break;
      case 'required':
        this._required = this.hasAttribute('required');
        this.updateRequired();
        break;
      case 'disabled':
        this._disabled = this.hasAttribute('disabled');
        this.updateDisabled();
        break;
      case 'validation':
        this._validation = newValue;
        this.updateValidation();
        break;
      case 'validation-message':
        this._validationMessage = newValue || '';
        this.updateValidationMessage();
        break;
      case 'help-text':
        this._helpText = newValue || '';
        this.updateHelpText();
        break;
    }
  }

  setupAccessibility() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      // Imposta attributi ARIA
      if (this._label) {
        toggle.setAttribute('aria-labelledby', `${this._toggleId}-label`);
      }
      
      const describedBy = [];
      if (this._helpText) {
        describedBy.push(this._helpId);
      }
      if (this._validation && this._validationMessage) {
        describedBy.push(this._validationId);
      }
      
      if (describedBy.length > 0) {
        toggle.setAttribute('aria-describedby', describedBy.join(' '));
      }
      
      if (this._required) {
        toggle.setAttribute('aria-required', 'true');
      }
      
      if (this._validation === 'invalid') {
        toggle.setAttribute('aria-invalid', 'true');
      } else if (this._validation === 'valid') {
        toggle.setAttribute('aria-invalid', 'false');
      }
      
      // Imposta role per screen reader
      toggle.setAttribute('role', 'switch');
    }
  }

  get label() {
    return this._label;
  }

  set label(value) {
    this._label = value || '';
    this.setAttribute('label', this._label);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value || '';
    this.setAttribute('value', this._value);
  }

  get checked() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    return toggle ? toggle.checked : this._checked;
  }

  set checked(value) {
    this._checked = value;
    if (value) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get required() {
    return this._required;
  }

  set required(value) {
    this._required = value;
    if (value) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
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

  get validation() {
    return this._validation;
  }

  set validation(value) {
    this._validation = value;
    if (value) {
      this.setAttribute('validation', value);
    } else {
      this.removeAttribute('validation');
    }
  }

  get validationMessage() {
    return this._validationMessage;
  }

  set validationMessage(value) {
    this._validationMessage = value || '';
    this.setAttribute('validation-message', this._validationMessage);
  }

  get helpText() {
    return this._helpText;
  }

  set helpText(value) {
    this._helpText = value || '';
    this.setAttribute('help-text', this._helpText);
  }

  render() {
    const toggleClasses = this.getToggleClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';
    const toggleAttributes = this.getToggleAttributes();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        /* 
         * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente
         * Questo componente usa SOLO le classi CSS di Bootstrap Italia
         * Non aggiunge CSS custom - tutto viene da Bootstrap Italia
         */
        
        .toggles {
          margin-bottom: 1rem;
        }
        
        .toggles label {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
        
        .toggles input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .toggles .lever {
          position: relative;
          width: 40px;
          height: 20px;
          background-color: #ccc;
          border-radius: 20px;
          margin-right: 10px;
          transition: background-color 0.3s ease;
        }
        
        .toggles .lever:before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
        
        .toggles input[type="checkbox"]:checked + .lever {
          background-color: #0066cc;
        }
        
        .toggles input[type="checkbox"]:checked + .lever:before {
          transform: translateX(20px);
        }
        
        .toggles input[type="checkbox"]:disabled + .lever {
          background-color: #e9ecef;
          cursor: not-allowed;
        }
        
        .toggles input[type="checkbox"]:disabled + .lever:before {
          background-color: #f8f9fa;
        }
        
        .toggles input[type="checkbox"]:focus + .lever {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        
        .toggle-label {
          flex: 1;
        }
        
        .toggle-label .required {
          color: #dc3545;
          margin-left: 0.25rem;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <div class="toggles">
        <label for="${this._toggleId}">
          <input 
            type="checkbox"
            id="${this._toggleId}"
            ${toggleAttributes}
          >
          <span class="lever"></span>
          <span class="toggle-label" id="${this._toggleId}-label">
            ${this._label}
            ${this._required ? '<span class="required">*</span>' : ''}
          </span>
        </label>
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getToggleClasses() {
    const classes = [];
    
    if (this._validation === 'valid') {
      classes.push('is-valid');
    } else if (this._validation === 'invalid') {
      classes.push('is-invalid');
    }
    
    return classes.join(' ');
  }

  getLabelElement() {
    return '';
  }

  getHelpElement() {
    return `
      <div id="${this._helpId}" class="form-text">
        ${this._helpText}
      </div>
    `;
  }

  getValidationElement() {
    const validationClass = this._validation === 'valid' ? 'valid-feedback' : 'invalid-feedback';
    return `
      <div id="${this._validationId}" class="${validationClass}">
        ${this._validationMessage}
      </div>
    `;
  }

  getToggleAttributes() {
    const attributes = [];
    
    if (this._value) {
      attributes.push(`value="${this._value}"`);
    }
    
    if (this._checked) {
      attributes.push('checked');
    }
    
    if (this._required) {
      attributes.push('required');
    }
    
    if (this._disabled) {
      attributes.push('disabled');
    }
    
    // Altri attributi
    const name = this.getAttribute('name');
    const ariaLabel = this.getAttribute('aria-label');
    
    if (name) attributes.push(`name="${name}"`);
    if (ariaLabel) attributes.push(`aria-label="${ariaLabel}"`);
    
    return attributes.join(' ');
  }

  setupEventListeners() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      // Eventi per sincronizzare lo stato
      toggle.addEventListener('change', (event) => {
        this._checked = event.target.checked;
        this.dispatchEvent(new CustomEvent('it-form-toggle-change', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            toggle: this
          }
        }));
      });
      
      toggle.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-toggle-blur', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            toggle: this
          }
        }));
      });
      
      toggle.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-toggle-focus', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            toggle: this
          }
        }));
      });
    }
  }

  updateLabel() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateValue() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      toggle.value = this._value;
    }
  }

  updateChecked() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      toggle.checked = this._checked;
    }
  }

  updateRequired() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      if (this._required) {
        toggle.setAttribute('required', '');
        toggle.setAttribute('aria-required', 'true');
      } else {
        toggle.removeAttribute('required');
        toggle.removeAttribute('aria-required');
      }
    }
  }

  updateDisabled() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      toggle.disabled = this._disabled;
    }
  }

  updateValidation() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      // Rimuovi classi di validazione precedenti
      toggle.classList.remove('is-valid', 'is-invalid');
      
      if (this._validation === 'valid') {
        toggle.classList.add('is-valid');
        toggle.setAttribute('aria-invalid', 'false');
      } else if (this._validation === 'invalid') {
        toggle.classList.add('is-invalid');
        toggle.setAttribute('aria-invalid', 'true');
      } else {
        toggle.removeAttribute('aria-invalid');
      }
    }
    
    this.updateValidationMessage();
  }

  updateValidationMessage() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateHelpText() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  // Metodi pubblici per controllo programmatico
  focus() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      toggle.focus();
    }
  }

  blur() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      toggle.blur();
    }
  }

  click() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      toggle.click();
    }
  }

  setCustomValidity(message) {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (toggle) {
      toggle.setCustomValidity(message);
    }
  }

  checkValidity() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    return toggle ? toggle.checkValidity() : false;
  }

  reportValidity() {
    const toggle = this.shadowRoot.querySelector('input[type="checkbox"]');
    return toggle ? toggle.reportValidity() : false;
  }
}

// Register the custom element
if (!customElements.get('it-form-toggle')) {
  customElements.define('it-form-toggle', ItFormToggle);
}

export default ItFormToggle;