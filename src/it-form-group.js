/**
 * Bootstrap Italia Form Group Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-group 
 *   label="Gruppo di campi" 
 *   help-text="Istruzioni per il gruppo"
 *   validation="valid"
 *   validation-message="Tutti i campi sono validi"
 * >
 *   <it-form-input label="Nome" required></it-form-input>
 *   <it-form-input label="Cognome" required></it-form-input>
 * </it-form-group>
 */

class ItFormGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._label = '';
    this._helpText = '';
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._groupId = `group-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'label', 'help-text', 'validation', 'validation-message', 'id',
      'aria-label', 'aria-describedby', 'role'
    ];
  }

  connectedCallback() {
    this._label = this.getAttribute('label') || '';
    this._helpText = this.getAttribute('help-text') || '';
    this._validation = this.getAttribute('validation');
    this._validationMessage = this.getAttribute('validation-message') || '';
    
    this.render();
    this.setupAccessibility();
    this.setupValidation();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'label':
        this._label = newValue || '';
        this.updateLabel();
        break;
      case 'help-text':
        this._helpText = newValue || '';
        this.updateHelpText();
        break;
      case 'validation':
        this._validation = newValue;
        this.updateValidation();
        break;
      case 'validation-message':
        this._validationMessage = newValue || '';
        this.updateValidationMessage();
        break;
    }
  }

  setupAccessibility() {
    // Imposta attributi ARIA per il gruppo
    this.setAttribute('role', this.getAttribute('role') || 'group');
    
    if (this._label) {
      this.setAttribute('aria-labelledby', `${this._groupId}-label`);
    }
    
    const describedBy = [];
    if (this._helpText) {
      describedBy.push(this._helpId);
    }
    if (this._validation && this._validationMessage) {
      describedBy.push(this._validationId);
    }
    
    if (describedBy.length > 0) {
      this.setAttribute('aria-describedby', describedBy.join(' '));
    }
  }

  get label() {
    return this._label;
  }

  set label(value) {
    this._label = value || '';
    this.setAttribute('label', this._label);
  }

  get helpText() {
    return this._helpText;
  }

  set helpText(value) {
    this._helpText = value || '';
    this.setAttribute('help-text', this._helpText);
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

  render() {
    const groupClasses = this.getGroupClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';

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
          margin-bottom: 1.5rem;
          padding: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          background-color: #f8f9fa;
        }
        
        .form-group.is-valid {
          border-color: #198754;
          background-color: #f0f9f4;
        }
        
        .form-group.is-invalid {
          border-color: #dc3545;
          background-color: #fef7f7;
        }
        
        .group-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #495057;
        }
        
        .group-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .group-content.horizontal {
          flex-direction: row;
          flex-wrap: wrap;
          align-items: end;
        }
        
        .group-content.horizontal > * {
          flex: 1;
          min-width: 200px;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <div class="form-group ${groupClasses}">
        ${labelElement}
        <div class="group-content">
          <slot></slot>
        </div>
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getGroupClasses() {
    const classes = [];
    
    if (this._validation === 'valid') {
      classes.push('is-valid');
    } else if (this._validation === 'invalid') {
      classes.push('is-invalid');
    }
    
    return classes.join(' ');
  }

  getLabelElement() {
    return `
      <div class="group-label" id="${this._groupId}-label">
        ${this._label}
      </div>
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

  updateLabel() {
    this.render();
    this.setupAccessibility();
  }

  updateHelpText() {
    this.render();
    this.setupAccessibility();
  }

  updateValidation() {
    this.render();
    this.setupAccessibility();
  }

  updateValidationMessage() {
    this.render();
    this.setupAccessibility();
  }

  setupValidation() {
    // Ascolta gli eventi di validazione dai componenti figli
    this.addEventListener('it-form-input-change', this.handleChildValidation);
    this.addEventListener('it-form-textarea-change', this.handleChildValidation);
    this.addEventListener('it-form-select-change', this.handleChildValidation);
    this.addEventListener('it-form-checkbox-change', this.handleChildValidation);
    this.addEventListener('it-form-radio-change', this.handleChildValidation);
    this.addEventListener('it-form-file-change', this.handleChildValidation);
    this.addEventListener('it-form-toggle-change', this.handleChildValidation);
  }

  handleChildValidation = (event) => {
    // Aggiorna lo stato di validazione del gruppo basato sui componenti figli
    this.updateGroupValidation();
  }

  updateGroupValidation() {
    const formElements = this.querySelectorAll([
      'it-form-input',
      'it-form-textarea', 
      'it-form-select',
      'it-form-checkbox',
      'it-form-radio',
      'it-form-file',
      'it-form-toggle'
    ].join(', '));

    let hasInvalid = false;
    let hasValid = false;
    let allValid = true;

    formElements.forEach(element => {
      const validation = element.getAttribute('validation');
      if (validation === 'invalid') {
        hasInvalid = true;
        allValid = false;
      } else if (validation === 'valid') {
        hasValid = true;
      } else {
        allValid = false;
      }
    });

    // Aggiorna lo stato di validazione del gruppo
    if (hasInvalid) {
      this.validation = 'invalid';
      this.validationMessage = 'Alcuni campi contengono errori';
    } else if (allValid && hasValid) {
      this.validation = 'valid';
      this.validationMessage = 'Tutti i campi sono validi';
    } else {
      this.validation = null;
      this.validationMessage = '';
    }
  }

  // Metodi pubblici per controllo programmatico
  validate() {
    const formElements = this.querySelectorAll([
      'it-form-input',
      'it-form-textarea', 
      'it-form-select',
      'it-form-checkbox',
      'it-form-radio',
      'it-form-file',
      'it-form-toggle'
    ].join(', '));

    let allValid = true;
    formElements.forEach(element => {
      if (element.checkValidity && !element.checkValidity()) {
        allValid = false;
      }
    });

    this.updateGroupValidation();
    return allValid;
  }

  reset() {
    const formElements = this.querySelectorAll([
      'it-form-input',
      'it-form-textarea', 
      'it-form-select',
      'it-form-checkbox',
      'it-form-radio',
      'it-form-file',
      'it-form-toggle'
    ].join(', '));

    formElements.forEach(element => {
      if (element.reset) {
        element.reset();
      } else {
        // Reset manuale per componenti senza metodo reset
        if (element.value !== undefined) {
          element.value = '';
        }
        if (element.checked !== undefined) {
          element.checked = false;
        }
        element.validation = null;
        element.validationMessage = '';
      }
    });

    this.validation = null;
    this.validationMessage = '';
  }

  getFormData() {
    const formData = new FormData();
    const formElements = this.querySelectorAll([
      'it-form-input',
      'it-form-textarea', 
      'it-form-select',
      'it-form-checkbox',
      'it-form-radio',
      'it-form-file',
      'it-form-toggle'
    ].join(', '));

    formElements.forEach(element => {
      const name = element.getAttribute('name');
      if (name) {
        if (element.type === 'file' && element.files) {
          Array.from(element.files).forEach(file => {
            formData.append(name, file);
          });
        } else if (element.checked !== undefined) {
          if (element.checked) {
            formData.append(name, element.value || 'on');
          }
        } else if (element.value !== undefined) {
          formData.append(name, element.value);
        }
      }
    });

    return formData;
  }

  setLayout(layout) {
    const content = this.shadowRoot.querySelector('.group-content');
    if (content) {
      content.classList.remove('horizontal');
      if (layout === 'horizontal') {
        content.classList.add('horizontal');
      }
    }
  }
}

// Register the custom element
if (!customElements.get('it-form-group')) {
  customElements.define('it-form-group', ItFormGroup);
}

export default ItFormGroup;