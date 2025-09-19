/**
 * Bootstrap Italia Form Textarea Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-textarea 
 *   label="Messaggio" 
 *   placeholder="Inserisci il tuo messaggio"
 *   rows="4"
 *   maxlength="500"
 *   required
 *   validation="valid"
 *   validation-message="Messaggio valido"
 * ></it-form-textarea>
 */

class ItFormTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._label = '';
    this._placeholder = '';
    this._value = '';
    this._rows = 3;
    this._cols = null;
    this._maxlength = null;
    this._minlength = null;
    this._required = false;
    this._disabled = false;
    this._readonly = false;
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._helpText = '';
    this._textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'label', 'placeholder', 'value', 'rows', 'cols', 'maxlength', 'minlength',
      'required', 'disabled', 'readonly', 'validation', 'validation-message',
      'help-text', 'name', 'id', 'aria-label', 'aria-describedby'
    ];
  }

  connectedCallback() {
    this._label = this.getAttribute('label') || '';
    this._placeholder = this.getAttribute('placeholder') || '';
    this._value = this.getAttribute('value') || '';
    this._rows = parseInt(this.getAttribute('rows')) || 3;
    this._cols = this.getAttribute('cols') ? parseInt(this.getAttribute('cols')) : null;
    this._maxlength = this.getAttribute('maxlength') ? parseInt(this.getAttribute('maxlength')) : null;
    this._minlength = this.getAttribute('minlength') ? parseInt(this.getAttribute('minlength')) : null;
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
      case 'rows':
        this._rows = parseInt(newValue) || 3;
        this.updateRows();
        break;
      case 'cols':
        this._cols = newValue ? parseInt(newValue) : null;
        this.updateCols();
        break;
      case 'maxlength':
        this._maxlength = newValue ? parseInt(newValue) : null;
        this.updateMaxlength();
        break;
      case 'minlength':
        this._minlength = newValue ? parseInt(newValue) : null;
        this.updateMinlength();
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
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      // Imposta attributi ARIA
      if (this._label) {
        textarea.setAttribute('aria-labelledby', `${this._textareaId}-label`);
      }
      
      const describedBy = [];
      if (this._helpText) {
        describedBy.push(this._helpId);
      }
      if (this._validation && this._validationMessage) {
        describedBy.push(this._validationId);
      }
      
      if (describedBy.length > 0) {
        textarea.setAttribute('aria-describedby', describedBy.join(' '));
      }
      
      if (this._required) {
        textarea.setAttribute('aria-required', 'true');
      }
      
      if (this._validation === 'invalid') {
        textarea.setAttribute('aria-invalid', 'true');
      } else if (this._validation === 'valid') {
        textarea.setAttribute('aria-invalid', 'false');
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

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value || '';
    this.setAttribute('placeholder', this._placeholder);
  }

  get value() {
    const textarea = this.shadowRoot.querySelector('textarea');
    return textarea ? textarea.value : this._value;
  }

  set value(value) {
    this._value = value || '';
    this.setAttribute('value', this._value);
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.value = this._value;
    }
  }

  get rows() {
    return this._rows;
  }

  set rows(value) {
    this._rows = parseInt(value) || 3;
    this.setAttribute('rows', this._rows);
  }

  get cols() {
    return this._cols;
  }

  set cols(value) {
    this._cols = value ? parseInt(value) : null;
    if (this._cols) {
      this.setAttribute('cols', this._cols);
    } else {
      this.removeAttribute('cols');
    }
  }

  get maxlength() {
    return this._maxlength;
  }

  set maxlength(value) {
    this._maxlength = value ? parseInt(value) : null;
    if (this._maxlength) {
      this.setAttribute('maxlength', this._maxlength);
    } else {
      this.removeAttribute('maxlength');
    }
  }

  get minlength() {
    return this._minlength;
  }

  set minlength(value) {
    this._minlength = value ? parseInt(value) : null;
    if (this._minlength) {
      this.setAttribute('minlength', this._minlength);
    } else {
      this.removeAttribute('minlength');
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
    const textareaClasses = this.getTextareaClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';
    const textareaAttributes = this.getTextareaAttributes();

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
        <textarea 
          class="${textareaClasses}"
          id="${this._textareaId}"
          ${textareaAttributes}
        >${this._value}</textarea>
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getTextareaClasses() {
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
      <label for="${this._textareaId}" id="${this._textareaId}-label" class="form-label">
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

  getTextareaAttributes() {
    const attributes = [];
    
    if (this._placeholder) {
      attributes.push(`placeholder="${this._placeholder}"`);
    }
    
    attributes.push(`rows="${this._rows}"`);
    
    if (this._cols) {
      attributes.push(`cols="${this._cols}"`);
    }
    
    if (this._maxlength) {
      attributes.push(`maxlength="${this._maxlength}"`);
    }
    
    if (this._minlength) {
      attributes.push(`minlength="${this._minlength}"`);
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
    
    // Altri attributi
    const name = this.getAttribute('name');
    const ariaLabel = this.getAttribute('aria-label');
    
    if (name) attributes.push(`name="${name}"`);
    if (ariaLabel) attributes.push(`aria-label="${ariaLabel}"`);
    
    return attributes.join(' ');
  }

  setupEventListeners() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      // Eventi per sincronizzare il valore
      textarea.addEventListener('input', (event) => {
        this._value = event.target.value;
        this.dispatchEvent(new CustomEvent('it-form-textarea-change', {
          bubbles: true,
          detail: {
            value: this._value,
            textarea: this
          }
        }));
      });
      
      textarea.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-textarea-blur', {
          bubbles: true,
          detail: {
            value: this._value,
            textarea: this
          }
        }));
      });
      
      textarea.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-textarea-focus', {
          bubbles: true,
          detail: {
            value: this._value,
            textarea: this
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

  updatePlaceholder() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.placeholder = this._placeholder;
    }
  }

  updateValue() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.value = this._value;
    }
  }

  updateRows() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.rows = this._rows;
    }
  }

  updateCols() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      if (this._cols) {
        textarea.cols = this._cols;
      } else {
        textarea.removeAttribute('cols');
      }
    }
  }

  updateMaxlength() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      if (this._maxlength) {
        textarea.maxLength = this._maxlength;
      } else {
        textarea.removeAttribute('maxlength');
      }
    }
  }

  updateMinlength() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      if (this._minlength) {
        textarea.minLength = this._minlength;
      } else {
        textarea.removeAttribute('minlength');
      }
    }
  }

  updateRequired() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      if (this._required) {
        textarea.setAttribute('required', '');
        textarea.setAttribute('aria-required', 'true');
      } else {
        textarea.removeAttribute('required');
        textarea.removeAttribute('aria-required');
      }
    }
  }

  updateDisabled() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.disabled = this._disabled;
    }
  }

  updateReadonly() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.readOnly = this._readonly;
    }
  }

  updateValidation() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      // Rimuovi classi di validazione precedenti
      textarea.classList.remove('is-valid', 'is-invalid');
      
      if (this._validation === 'valid') {
        textarea.classList.add('is-valid');
        textarea.setAttribute('aria-invalid', 'false');
      } else if (this._validation === 'invalid') {
        textarea.classList.add('is-invalid');
        textarea.setAttribute('aria-invalid', 'true');
      } else {
        textarea.removeAttribute('aria-invalid');
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
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  }

  blur() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.blur();
    }
  }

  select() {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.select();
    }
  }

  setCustomValidity(message) {
    const textarea = this.shadowRoot.querySelector('textarea');
    if (textarea) {
      textarea.setCustomValidity(message);
    }
  }

  checkValidity() {
    const textarea = this.shadowRoot.querySelector('textarea');
    return textarea ? textarea.checkValidity() : false;
  }

  reportValidity() {
    const textarea = this.shadowRoot.querySelector('textarea');
    return textarea ? textarea.reportValidity() : false;
  }
}

// Register the custom element
if (!customElements.get('it-form-textarea')) {
  customElements.define('it-form-textarea', ItFormTextarea);
}

export default ItFormTextarea;