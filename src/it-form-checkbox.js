/**
 * Bootstrap Italia Form Checkbox Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-checkbox 
 *   label="Accetto i termini e condizioni" 
 *   value="accepted"
 *   required
 *   validation="valid"
 *   validation-message="Devi accettare i termini"
 * ></it-form-checkbox>
 */

class ItFormCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._label = '';
    this._value = '';
    this._checked = false;
    this._required = false;
    this._disabled = false;
    this._indeterminate = false;
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._helpText = '';
    this._checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'label', 'value', 'checked', 'required', 'disabled', 'indeterminate',
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
    this._indeterminate = this.hasAttribute('indeterminate');
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
      case 'indeterminate':
        this._indeterminate = this.hasAttribute('indeterminate');
        this.updateIndeterminate();
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
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      // Imposta attributi ARIA
      if (this._label) {
        checkbox.setAttribute('aria-labelledby', `${this._checkboxId}-label`);
      }
      
      const describedBy = [];
      if (this._helpText) {
        describedBy.push(this._helpId);
      }
      if (this._validation && this._validationMessage) {
        describedBy.push(this._validationId);
      }
      
      if (describedBy.length > 0) {
        checkbox.setAttribute('aria-describedby', describedBy.join(' '));
      }
      
      if (this._required) {
        checkbox.setAttribute('aria-required', 'true');
      }
      
      if (this._validation === 'invalid') {
        checkbox.setAttribute('aria-invalid', 'true');
      } else if (this._validation === 'valid') {
        checkbox.setAttribute('aria-invalid', 'false');
      }
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
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    return checkbox ? checkbox.checked : this._checked;
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

  get indeterminate() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    return checkbox ? checkbox.indeterminate : this._indeterminate;
  }

  set indeterminate(value) {
    this._indeterminate = value;
    if (value) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
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
    const checkboxClasses = this.getCheckboxClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';
    const checkboxAttributes = this.getCheckboxAttributes();

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
        
        .form-check {
          margin-bottom: 1rem;
        }
        
        .form-check-input:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <div class="form-check">
        <input 
          type="checkbox"
          class="${checkboxClasses}"
          id="${this._checkboxId}"
          ${checkboxAttributes}
        >
        ${labelElement}
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getCheckboxClasses() {
    const classes = ['form-check-input'];
    
    if (this._validation === 'valid') {
      classes.push('is-valid');
    } else if (this._validation === 'invalid') {
      classes.push('is-invalid');
    }
    
    return classes.join(' ');
  }

  getLabelElement() {
    return `
      <label for="${this._checkboxId}" id="${this._checkboxId}-label" class="form-check-label">
        ${this._label}
        ${this._required ? '<span class="text-danger">*</span>' : ''}
      </label>
    `;
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

  getCheckboxAttributes() {
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
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      // Eventi per sincronizzare lo stato
      checkbox.addEventListener('change', (event) => {
        this._checked = event.target.checked;
        this.dispatchEvent(new CustomEvent('it-form-checkbox-change', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            checkbox: this
          }
        }));
      });
      
      checkbox.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-checkbox-blur', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            checkbox: this
          }
        }));
      });
      
      checkbox.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-checkbox-focus', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            checkbox: this
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
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.value = this._value;
    }
  }

  updateChecked() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = this._checked;
    }
  }

  updateRequired() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      if (this._required) {
        checkbox.setAttribute('required', '');
        checkbox.setAttribute('aria-required', 'true');
      } else {
        checkbox.removeAttribute('required');
        checkbox.removeAttribute('aria-required');
      }
    }
  }

  updateDisabled() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.disabled = this._disabled;
    }
  }

  updateIndeterminate() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.indeterminate = this._indeterminate;
    }
  }

  updateValidation() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      // Rimuovi classi di validazione precedenti
      checkbox.classList.remove('is-valid', 'is-invalid');
      
      if (this._validation === 'valid') {
        checkbox.classList.add('is-valid');
        checkbox.setAttribute('aria-invalid', 'false');
      } else if (this._validation === 'invalid') {
        checkbox.classList.add('is-invalid');
        checkbox.setAttribute('aria-invalid', 'true');
      } else {
        checkbox.removeAttribute('aria-invalid');
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
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.focus();
    }
  }

  blur() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.blur();
    }
  }

  click() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.click();
    }
  }

  setCustomValidity(message) {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.setCustomValidity(message);
    }
  }

  checkValidity() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    return checkbox ? checkbox.checkValidity() : false;
  }

  reportValidity() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    return checkbox ? checkbox.reportValidity() : false;
  }
}

// Register the custom element
if (!customElements.get('it-form-checkbox')) {
  customElements.define('it-form-checkbox', ItFormCheckbox);
}

export default ItFormCheckbox;