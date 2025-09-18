/**
 * Bootstrap Italia Form Input Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-input 
 *   type="text" 
 *   label="Nome" 
 *   placeholder="Inserisci il tuo nome"
 *   required
 *   validation="valid"
 *   validation-message="Campo valido"
 * ></it-form-input>
 */

class ItFormInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._type = 'text';
    this._label = '';
    this._placeholder = '';
    this._value = '';
    this._required = false;
    this._disabled = false;
    this._readonly = false;
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._helpText = '';
    this._inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'type', 'label', 'placeholder', 'value', 'required', 'disabled', 'readonly',
      'validation', 'validation-message', 'help-text', 'name', 'id', 'min', 'max',
      'step', 'pattern', 'autocomplete', 'aria-label', 'aria-describedby'
    ];
  }

  connectedCallback() {
    this._type = this.getAttribute('type') || 'text';
    this._label = this.getAttribute('label') || '';
    this._placeholder = this.getAttribute('placeholder') || '';
    this._value = this.getAttribute('value') || '';
    this._required = this.hasAttribute('required');
    this._disabled = this.hasAttribute('disabled');
    this._readonly = this.hasAttribute('readonly');
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
      case 'type':
        this._type = newValue || 'text';
        this.updateInputType();
        break;
      case 'label':
        this._label = newValue || '';
        this.updateLabel();
        break;
      case 'placeholder':
        this._placeholder = newValue || '';
        this.updatePlaceholder();
        break;
      case 'value':
        this._value = newValue || '';
        this.updateValue();
        break;
      case 'required':
        this._required = this.hasAttribute('required');
        this.updateRequired();
        break;
      case 'disabled':
        this._disabled = this.hasAttribute('disabled');
        this.updateDisabled();
        break;
      case 'readonly':
        this._readonly = this.hasAttribute('readonly');
        this.updateReadonly();
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
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      // Imposta attributi ARIA
      if (this._label) {
        input.setAttribute('aria-labelledby', `${this._inputId}-label`);
      }
      
      const describedBy = [];
      if (this._helpText) {
        describedBy.push(this._helpId);
      }
      if (this._validation && this._validationMessage) {
        describedBy.push(this._validationId);
      }
      
      if (describedBy.length > 0) {
        input.setAttribute('aria-describedby', describedBy.join(' '));
      }
      
      if (this._required) {
        input.setAttribute('aria-required', 'true');
      }
      
      if (this._validation === 'invalid') {
        input.setAttribute('aria-invalid', 'true');
      } else if (this._validation === 'valid') {
        input.setAttribute('aria-invalid', 'false');
      }
    }
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value || 'text';
    this.setAttribute('type', this._type);
  }

  get label() {
    return this._label;
  }

  set label(value) {
    this._label = value || '';
    this.setAttribute('label', this._label);
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value || '';
    this.setAttribute('placeholder', this._placeholder);
  }

  get value() {
    const input = this.shadowRoot.querySelector('input');
    return input ? input.value : this._value;
  }

  set value(value) {
    this._value = value || '';
    this.setAttribute('value', this._value);
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.value = this._value;
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

  get readonly() {
    return this._readonly;
  }

  set readonly(value) {
    this._readonly = value;
    if (value) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
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
    const inputClasses = this.getInputClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';
    const inputAttributes = this.getInputAttributes();

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
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-control:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <div class="form-group">
        ${labelElement}
        <input 
          type="${this._type}"
          class="${inputClasses}"
          id="${this._inputId}"
          ${inputAttributes}
        >
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getInputClasses() {
    const classes = ['form-control'];
    
    if (this._validation === 'valid') {
      classes.push('is-valid');
    } else if (this._validation === 'invalid') {
      classes.push('is-invalid');
    }
    
    return classes.join(' ');
  }

  getLabelElement() {
    return `
      <label for="${this._inputId}" id="${this._inputId}-label" class="form-label">
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

  getInputAttributes() {
    const attributes = [];
    
    if (this._placeholder) {
      attributes.push(`placeholder="${this._placeholder}"`);
    }
    
    if (this._value) {
      attributes.push(`value="${this._value}"`);
    }
    
    if (this._required) {
      attributes.push('required');
    }
    
    if (this._disabled) {
      attributes.push('disabled');
    }
    
    if (this._readonly) {
      attributes.push('readonly');
    }
    
    // Attributi specifici per tipo
    if (this._type === 'number') {
      const min = this.getAttribute('min');
      const max = this.getAttribute('max');
      const step = this.getAttribute('step');
      
      if (min !== null) attributes.push(`min="${min}"`);
      if (max !== null) attributes.push(`max="${max}"`);
      if (step !== null) attributes.push(`step="${step}"`);
    }
    
    if (this._type === 'email' || this._type === 'url' || this._type === 'text') {
      const pattern = this.getAttribute('pattern');
      if (pattern) attributes.push(`pattern="${pattern}"`);
    }
    
    // Altri attributi
    const name = this.getAttribute('name');
    const autocomplete = this.getAttribute('autocomplete');
    const ariaLabel = this.getAttribute('aria-label');
    
    if (name) attributes.push(`name="${name}"`);
    if (autocomplete) attributes.push(`autocomplete="${autocomplete}"`);
    if (ariaLabel) attributes.push(`aria-label="${ariaLabel}"`);
    
    return attributes.join(' ');
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      // Eventi per sincronizzare il valore
      input.addEventListener('input', (event) => {
        this._value = event.target.value;
        this.dispatchEvent(new CustomEvent('it-form-input-change', {
          bubbles: true,
          detail: {
            value: this._value,
            input: this
          }
        }));
      });
      
      input.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-input-blur', {
          bubbles: true,
          detail: {
            value: this._value,
            input: this
          }
        }));
      });
      
      input.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-input-focus', {
          bubbles: true,
          detail: {
            value: this._value,
            input: this
          }
        }));
      });
    }
  }

  updateInputType() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.type = this._type;
    }
  }

  updateLabel() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updatePlaceholder() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.placeholder = this._placeholder;
    }
  }

  updateValue() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.value = this._value;
    }
  }

  updateRequired() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      if (this._required) {
        input.setAttribute('required', '');
        input.setAttribute('aria-required', 'true');
      } else {
        input.removeAttribute('required');
        input.removeAttribute('aria-required');
      }
    }
  }

  updateDisabled() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.disabled = this._disabled;
    }
  }

  updateReadonly() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.readOnly = this._readonly;
    }
  }

  updateValidation() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      // Rimuovi classi di validazione precedenti
      input.classList.remove('is-valid', 'is-invalid');
      
      if (this._validation === 'valid') {
        input.classList.add('is-valid');
        input.setAttribute('aria-invalid', 'false');
      } else if (this._validation === 'invalid') {
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
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
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.focus();
    }
  }

  blur() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.blur();
    }
  }

  select() {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.select();
    }
  }

  setCustomValidity(message) {
    const input = this.shadowRoot.querySelector('input');
    if (input) {
      input.setCustomValidity(message);
    }
  }

  checkValidity() {
    const input = this.shadowRoot.querySelector('input');
    return input ? input.checkValidity() : false;
  }

  reportValidity() {
    const input = this.shadowRoot.querySelector('input');
    return input ? input.reportValidity() : false;
  }
}

// Register the custom element
if (!customElements.get('it-form-input')) {
  customElements.define('it-form-input', ItFormInput);
}

export default ItFormInput;