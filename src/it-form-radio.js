/**
 * Bootstrap Italia Form Radio Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-radio 
 *   name="gender"
 *   label="Maschio" 
 *   value="male"
 *   required
 *   validation="valid"
 *   validation-message="Selezione valida"
 * ></it-form-radio>
 */

class ItFormRadio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._label = '';
    this._value = '';
    this._name = '';
    this._checked = false;
    this._required = false;
    this._disabled = false;
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._helpText = '';
    this._radioId = `radio-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'label', 'value', 'name', 'checked', 'required', 'disabled',
      'validation', 'validation-message', 'help-text', 'id',
      'aria-label', 'aria-describedby'
    ];
  }

  connectedCallback() {
    this._label = this.getAttribute('label') || '';
    this._value = this.getAttribute('value') || '';
    this._name = this.getAttribute('name') || '';
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
      case 'name':
        this._name = newValue || '';
        this.updateName();
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
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      // Imposta attributi ARIA
      if (this._label) {
        radio.setAttribute('aria-labelledby', `${this._radioId}-label`);
      }
      
      const describedBy = [];
      if (this._helpText) {
        describedBy.push(this._helpId);
      }
      if (this._validation && this._validationMessage) {
        describedBy.push(this._validationId);
      }
      
      if (describedBy.length > 0) {
        radio.setAttribute('aria-describedby', describedBy.join(' '));
      }
      
      if (this._required) {
        radio.setAttribute('aria-required', 'true');
      }
      
      if (this._validation === 'invalid') {
        radio.setAttribute('aria-invalid', 'true');
      } else if (this._validation === 'valid') {
        radio.setAttribute('aria-invalid', 'false');
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

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value || '';
    this.setAttribute('name', this._name);
  }

  get checked() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    return radio ? radio.checked : this._checked;
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
    const radioClasses = this.getRadioClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';
    const radioAttributes = this.getRadioAttributes();

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
          type="radio"
          class="${radioClasses}"
          id="${this._radioId}"
          ${radioAttributes}
        >
        ${labelElement}
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getRadioClasses() {
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
      <label for="${this._radioId}" id="${this._radioId}-label" class="form-check-label">
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

  getRadioAttributes() {
    const attributes = [];
    
    if (this._name) {
      attributes.push(`name="${this._name}"`);
    }
    
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
    const ariaLabel = this.getAttribute('aria-label');
    
    if (ariaLabel) attributes.push(`aria-label="${ariaLabel}"`);
    
    return attributes.join(' ');
  }

  setupEventListeners() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      // Eventi per sincronizzare lo stato
      radio.addEventListener('change', (event) => {
        this._checked = event.target.checked;
        this.dispatchEvent(new CustomEvent('it-form-radio-change', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            name: this._name,
            radio: this
          }
        }));
      });
      
      radio.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-radio-blur', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            name: this._name,
            radio: this
          }
        }));
      });
      
      radio.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-radio-focus', {
          bubbles: true,
          detail: {
            checked: this._checked,
            value: this._value,
            name: this._name,
            radio: this
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
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.value = this._value;
    }
  }

  updateName() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.name = this._name;
    }
  }

  updateChecked() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = this._checked;
    }
  }

  updateRequired() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      if (this._required) {
        radio.setAttribute('required', '');
        radio.setAttribute('aria-required', 'true');
      } else {
        radio.removeAttribute('required');
        radio.removeAttribute('aria-required');
      }
    }
  }

  updateDisabled() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.disabled = this._disabled;
    }
  }

  updateValidation() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      // Rimuovi classi di validazione precedenti
      radio.classList.remove('is-valid', 'is-invalid');
      
      if (this._validation === 'valid') {
        radio.classList.add('is-valid');
        radio.setAttribute('aria-invalid', 'false');
      } else if (this._validation === 'invalid') {
        radio.classList.add('is-invalid');
        radio.setAttribute('aria-invalid', 'true');
      } else {
        radio.removeAttribute('aria-invalid');
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
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.focus();
    }
  }

  blur() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.blur();
    }
  }

  click() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.click();
    }
  }

  setCustomValidity(message) {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    if (radio) {
      radio.setCustomValidity(message);
    }
  }

  checkValidity() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    return radio ? radio.checkValidity() : false;
  }

  reportValidity() {
    const radio = this.shadowRoot.querySelector('input[type="radio"]');
    return radio ? radio.reportValidity() : false;
  }
}

// Register the custom element
if (!customElements.get('it-form-radio')) {
  customElements.define('it-form-radio', ItFormRadio);
}

export default ItFormRadio;