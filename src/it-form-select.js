/**
 * Bootstrap Italia Form Select Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-select 
 *   label="Scegli un'opzione" 
 *   required
 *   validation="valid"
 *   validation-message="Selezione valida"
 * >
 *   <option value="">Seleziona...</option>
 *   <option value="1">Opzione 1</option>
 *   <option value="2">Opzione 2</option>
 * </it-form-select>
 */

class ItFormSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._label = '';
    this._value = '';
    this._required = false;
    this._disabled = false;
    this._multiple = false;
    this._size = null;
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._helpText = '';
    this._selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'label', 'value', 'required', 'disabled', 'multiple', 'size',
      'validation', 'validation-message', 'help-text', 'name', 'id',
      'aria-label', 'aria-describedby'
    ];
  }

  connectedCallback() {
    this._label = this.getAttribute('label') || '';
    this._value = this.getAttribute('value') || '';
    this._required = this.hasAttribute('required');
    this._disabled = this.hasAttribute('disabled');
    this._multiple = this.hasAttribute('multiple');
    this._size = this.getAttribute('size') ? parseInt(this.getAttribute('size')) : null;
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
      case 'required':
        this._required = this.hasAttribute('required');
        this.updateRequired();
        break;
      case 'disabled':
        this._disabled = this.hasAttribute('disabled');
        this.updateDisabled();
        break;
      case 'multiple':
        this._multiple = this.hasAttribute('multiple');
        this.updateMultiple();
        break;
      case 'size':
        this._size = newValue ? parseInt(newValue) : null;
        this.updateSize();
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
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      // Imposta attributi ARIA
      if (this._label) {
        select.setAttribute('aria-labelledby', `${this._selectId}-label`);
      }
      
      const describedBy = [];
      if (this._helpText) {
        describedBy.push(this._helpId);
      }
      if (this._validation && this._validationMessage) {
        describedBy.push(this._validationId);
      }
      
      if (describedBy.length > 0) {
        select.setAttribute('aria-describedby', describedBy.join(' '));
      }
      
      if (this._required) {
        select.setAttribute('aria-required', 'true');
      }
      
      if (this._validation === 'invalid') {
        select.setAttribute('aria-invalid', 'true');
      } else if (this._validation === 'valid') {
        select.setAttribute('aria-invalid', 'false');
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
    const select = this.shadowRoot.querySelector('select');
    return select ? select.value : this._value;
  }

  set value(value) {
    this._value = value || '';
    this.setAttribute('value', this._value);
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      select.value = this._value;
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

  get multiple() {
    return this._multiple;
  }

  set multiple(value) {
    this._multiple = value;
    if (value) {
      this.setAttribute('multiple', '');
    } else {
      this.removeAttribute('multiple');
    }
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value ? parseInt(value) : null;
    if (this._size) {
      this.setAttribute('size', this._size);
    } else {
      this.removeAttribute('size');
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
    const selectClasses = this.getSelectClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';
    const selectAttributes = this.getSelectAttributes();
    const options = this.getOptions();

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
        <select 
          class="${selectClasses}"
          id="${this._selectId}"
          ${selectAttributes}
        >
          ${options}
        </select>
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getSelectClasses() {
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
      <label for="${this._selectId}" id="${this._selectId}-label" class="form-label">
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

  getSelectAttributes() {
    const attributes = [];
    
    if (this._required) {
      attributes.push('required');
    }
    
    if (this._disabled) {
      attributes.push('disabled');
    }
    
    if (this._multiple) {
      attributes.push('multiple');
    }
    
    if (this._size) {
      attributes.push(`size="${this._size}"`);
    }
    
    // Altri attributi
    const name = this.getAttribute('name');
    const ariaLabel = this.getAttribute('aria-label');
    
    if (name) attributes.push(`name="${name}"`);
    if (ariaLabel) attributes.push(`aria-label="${ariaLabel}"`);
    
    return attributes.join(' ');
  }

  getOptions() {
    // Estrai le opzioni dal contenuto del componente
    const options = Array.from(this.children).filter(child => 
      child.tagName.toLowerCase() === 'option'
    );
    
    if (options.length === 0) {
      return '<option value="">Seleziona un\'opzione...</option>';
    }
    
    return options.map(option => {
      const value = option.getAttribute('value') || '';
      const selected = option.hasAttribute('selected') ? 'selected' : '';
      const disabled = option.hasAttribute('disabled') ? 'disabled' : '';
      const text = option.textContent || option.innerHTML;
      
      return `<option value="${value}" ${selected} ${disabled}>${text}</option>`;
    }).join('');
  }

  setupEventListeners() {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      // Eventi per sincronizzare il valore
      select.addEventListener('change', (event) => {
        this._value = event.target.value;
        this.dispatchEvent(new CustomEvent('it-form-select-change', {
          bubbles: true,
          detail: {
            value: this._value,
            select: this
          }
        }));
      });
      
      select.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-select-blur', {
          bubbles: true,
          detail: {
            value: this._value,
            select: this
          }
        }));
      });
      
      select.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-select-focus', {
          bubbles: true,
          detail: {
            value: this._value,
            select: this
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
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      select.value = this._value;
    }
  }

  updateRequired() {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      if (this._required) {
        select.setAttribute('required', '');
        select.setAttribute('aria-required', 'true');
      } else {
        select.removeAttribute('required');
        select.removeAttribute('aria-required');
      }
    }
  }

  updateDisabled() {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      select.disabled = this._disabled;
    }
  }

  updateMultiple() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateSize() {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      if (this._size) {
        select.size = this._size;
      } else {
        select.removeAttribute('size');
      }
    }
  }

  updateValidation() {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      // Rimuovi classi di validazione precedenti
      select.classList.remove('is-valid', 'is-invalid');
      
      if (this._validation === 'valid') {
        select.classList.add('is-valid');
        select.setAttribute('aria-invalid', 'false');
      } else if (this._validation === 'invalid') {
        select.classList.add('is-invalid');
        select.setAttribute('aria-invalid', 'true');
      } else {
        select.removeAttribute('aria-invalid');
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
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      select.focus();
    }
  }

  blur() {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      select.blur();
    }
  }

  setCustomValidity(message) {
    const select = this.shadowRoot.querySelector('select');
    if (select) {
      select.setCustomValidity(message);
    }
  }

  checkValidity() {
    const select = this.shadowRoot.querySelector('select');
    return select ? select.checkValidity() : false;
  }

  reportValidity() {
    const select = this.shadowRoot.querySelector('select');
    return select ? select.reportValidity() : false;
  }

  // Metodi per gestire le opzioni
  addOption(value, text, selected = false) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    if (selected) {
      option.selected = true;
    }
    this.appendChild(option);
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  removeOption(value) {
    const options = Array.from(this.children).filter(child => 
      child.tagName.toLowerCase() === 'option' && child.value === value
    );
    options.forEach(option => option.remove());
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  clearOptions() {
    const options = Array.from(this.children).filter(child => 
      child.tagName.toLowerCase() === 'option'
    );
    options.forEach(option => option.remove());
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }
}

// Register the custom element
if (!customElements.get('it-form-select')) {
  customElements.define('it-form-select', ItFormSelect);
}

export default ItFormSelect;