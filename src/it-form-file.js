/**
 * Bootstrap Italia Form File Upload Web Component
 * Conformità alle normative europee sull'accessibilità (EN 301 549, WCAG 2.1 AA)
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina
 * Questo componente si basa sui CSS esistenti e aggiunge solo stili per accessibilità
 * 
 * Usage:
 * <it-form-file 
 *   label="Carica un file" 
 *   accept=".pdf,.doc,.docx"
 *   multiple
 *   required
 *   validation="valid"
 *   validation-message="File caricato con successo"
 * ></it-form-file>
 */

class ItFormFile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._label = '';
    this._accept = '';
    this._multiple = false;
    this._required = false;
    this._disabled = false;
    this._validation = null; // 'valid', 'invalid', null
    this._validationMessage = '';
    this._helpText = '';
    this._files = [];
    this._fileId = `file-${Math.random().toString(36).substr(2, 9)}`;
    this._helpId = `help-${Math.random().toString(36).substr(2, 9)}`;
    this._validationId = `validation-${Math.random().toString(36).substr(2, 9)}`;
  }

  static get observedAttributes() {
    return [
      'label', 'accept', 'multiple', 'required', 'disabled',
      'validation', 'validation-message', 'help-text', 'name', 'id',
      'aria-label', 'aria-describedby'
    ];
  }

  connectedCallback() {
    this._label = this.getAttribute('label') || '';
    this._accept = this.getAttribute('accept') || '';
    this._multiple = this.hasAttribute('multiple');
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
      case 'accept':
        this._accept = newValue || '';
        this.updateAccept();
        break;
      case 'multiple':
        this._multiple = this.hasAttribute('multiple');
        this.updateMultiple();
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
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      // Imposta attributi ARIA
      if (this._label) {
        fileInput.setAttribute('aria-labelledby', `${this._fileId}-label`);
      }
      
      const describedBy = [];
      if (this._helpText) {
        describedBy.push(this._helpId);
      }
      if (this._validation && this._validationMessage) {
        describedBy.push(this._validationId);
      }
      
      if (describedBy.length > 0) {
        fileInput.setAttribute('aria-describedby', describedBy.join(' '));
      }
      
      if (this._required) {
        fileInput.setAttribute('aria-required', 'true');
      }
      
      if (this._validation === 'invalid') {
        fileInput.setAttribute('aria-invalid', 'true');
      } else if (this._validation === 'valid') {
        fileInput.setAttribute('aria-invalid', 'false');
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

  get accept() {
    return this._accept;
  }

  set accept(value) {
    this._accept = value || '';
    this.setAttribute('accept', this._accept);
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

  get files() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    return fileInput ? fileInput.files : this._files;
  }

  render() {
    const fileClasses = this.getFileClasses();
    const labelElement = this._label ? this.getLabelElement() : '';
    const helpElement = this._helpText ? this.getHelpElement() : '';
    const validationElement = this._validation && this._validationMessage ? this.getValidationElement() : '';
    const fileAttributes = this.getFileAttributes();
    const fileListElement = this._files.length > 0 ? this.getFileListElement() : '';

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
        
        .form-control-file:focus {
          outline: 2px solid #0066cc;
          outline-offset: 2px;
        }
        
        .file-list {
          margin-top: 0.5rem;
        }
        
        .file-item {
          display: flex;
          align-items: center;
          padding: 0.25rem 0;
          border-bottom: 1px solid #dee2e6;
        }
        
        .file-item:last-child {
          border-bottom: none;
        }
        
        .file-name {
          flex: 1;
          margin-right: 0.5rem;
        }
        
        .file-size {
          color: #6c757d;
          font-size: 0.875rem;
        }
        
        .file-remove {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          padding: 0.25rem;
        }
        
        .file-remove:hover {
          color: #c82333;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      
      <div class="form-group">
        ${labelElement}
        <input 
          type="file"
          class="${fileClasses}"
          id="${this._fileId}"
          ${fileAttributes}
        >
        ${fileListElement}
        ${helpElement}
        ${validationElement}
      </div>
    `;
  }

  getFileClasses() {
    const classes = ['form-control-file'];
    
    if (this._validation === 'valid') {
      classes.push('is-valid');
    } else if (this._validation === 'invalid') {
      classes.push('is-invalid');
    }
    
    return classes.join(' ');
  }

  getLabelElement() {
    return `
      <label for="${this._fileId}" id="${this._fileId}-label" class="form-label">
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

  getFileListElement() {
    if (this._files.length === 0) return '';
    
    const fileItems = this._files.map((file, index) => `
      <div class="file-item">
        <span class="file-name">${file.name}</span>
        <span class="file-size">${this.formatFileSize(file.size)}</span>
        <button type="button" class="file-remove" data-index="${index}" aria-label="Rimuovi ${file.name}">
          ×
        </button>
      </div>
    `).join('');
    
    return `
      <div class="file-list">
        ${fileItems}
      </div>
    `;
  }

  getFileAttributes() {
    const attributes = [];
    
    if (this._accept) {
      attributes.push(`accept="${this._accept}"`);
    }
    
    if (this._multiple) {
      attributes.push('multiple');
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

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  setupEventListeners() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      // Eventi per gestire i file
      fileInput.addEventListener('change', (event) => {
        this._files = Array.from(event.target.files);
        this.render();
        this.setupEventListeners();
        this.setupAccessibility();
        
        this.dispatchEvent(new CustomEvent('it-form-file-change', {
          bubbles: true,
          detail: {
            files: this._files,
            fileInput: this
          }
        }));
      });
      
      fileInput.addEventListener('blur', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-file-blur', {
          bubbles: true,
          detail: {
            files: this._files,
            fileInput: this
          }
        }));
      });
      
      fileInput.addEventListener('focus', (event) => {
        this.dispatchEvent(new CustomEvent('it-form-file-focus', {
          bubbles: true,
          detail: {
            files: this._files,
            fileInput: this
          }
        }));
      });
    }
    
    // Eventi per rimuovere file
    this.shadowRoot.addEventListener('click', (event) => {
      if (event.target.classList.contains('file-remove')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        this.removeFile(index);
      }
    });
  }

  updateLabel() {
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
  }

  updateAccept() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.accept = this._accept;
    }
  }

  updateMultiple() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.multiple = this._multiple;
    }
  }

  updateRequired() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      if (this._required) {
        fileInput.setAttribute('required', '');
        fileInput.setAttribute('aria-required', 'true');
      } else {
        fileInput.removeAttribute('required');
        fileInput.removeAttribute('aria-required');
      }
    }
  }

  updateDisabled() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.disabled = this._disabled;
    }
  }

  updateValidation() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      // Rimuovi classi di validazione precedenti
      fileInput.classList.remove('is-valid', 'is-invalid');
      
      if (this._validation === 'valid') {
        fileInput.classList.add('is-valid');
        fileInput.setAttribute('aria-invalid', 'false');
      } else if (this._validation === 'invalid') {
        fileInput.classList.add('is-invalid');
        fileInput.setAttribute('aria-invalid', 'true');
      } else {
        fileInput.removeAttribute('aria-invalid');
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
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.focus();
    }
  }

  blur() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.blur();
    }
  }

  click() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  }

  setCustomValidity(message) {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.setCustomValidity(message);
    }
  }

  checkValidity() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    return fileInput ? fileInput.checkValidity() : false;
  }

  reportValidity() {
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    return fileInput ? fileInput.reportValidity() : false;
  }

  // Metodi per gestire i file
  removeFile(index) {
    if (index >= 0 && index < this._files.length) {
      this._files.splice(index, 1);
      this.render();
      this.setupEventListeners();
      this.setupAccessibility();
      
      this.dispatchEvent(new CustomEvent('it-form-file-remove', {
        bubbles: true,
        detail: {
          files: this._files,
          removedIndex: index,
          fileInput: this
        }
      }));
    }
  }

  clearFiles() {
    this._files = [];
    const fileInput = this.shadowRoot.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
    this.render();
    this.setupEventListeners();
    this.setupAccessibility();
    
    this.dispatchEvent(new CustomEvent('it-form-file-clear', {
      bubbles: true,
      detail: {
        fileInput: this
      }
    }));
  }
}

// Register the custom element
if (!customElements.get('it-form-file')) {
  customElements.define('it-form-file', ItFormFile);
}

export default ItFormFile;