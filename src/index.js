/**
 * Bootstrap Italia Web Components
 * 
 * Una raccolta di Web Components nativi che implementano i componenti Bootstrap Italia.
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina.
 * I Web Components usano SOLO le classi CSS di Bootstrap Italia - nessun CSS custom.
 * 
 * @version 1.0.0
 * @author Bootstrap Italia WC Contributors
 * @license MIT
 */

// Import all components
import ItAlert from './it-alert.js';
import ItFormInput from './it-form-input.js';
import ItFormTextarea from './it-form-textarea.js';
import ItFormSelect from './it-form-select.js';
import ItFormCheckbox from './it-form-checkbox.js';
import ItFormRadio from './it-form-radio.js';
import ItFormFile from './it-form-file.js';
import ItFormToggle from './it-form-toggle.js';
import ItFormGroup from './it-form-group.js';

// Export all components
export {
  ItAlert,
  ItFormInput,
  ItFormTextarea,
  ItFormSelect,
  ItFormCheckbox,
  ItFormRadio,
  ItFormFile,
  ItFormToggle,
  ItFormGroup
};

// Auto-register all components when the module is loaded
// This allows users to simply import the library and use the components
// without manually registering them

// Note: Components are auto-registered in their individual files
// This ensures they're available as soon as the module is imported

// Version info
export const VERSION = '1.0.0';

// Main library object for UMD builds
const BootstrapItaliaWC = {
  VERSION,
  ItAlert,
  ItFormInput,
  ItFormTextarea,
  ItFormSelect,
  ItFormCheckbox,
  ItFormRadio,
  ItFormFile,
  ItFormToggle,
  ItFormGroup,
  
  // Utility function to check if all components are registered
  isReady() {
    return customElements.get('it-alert') !== undefined &&
           customElements.get('it-form-input') !== undefined &&
           customElements.get('it-form-textarea') !== undefined &&
           customElements.get('it-form-select') !== undefined &&
           customElements.get('it-form-checkbox') !== undefined &&
           customElements.get('it-form-radio') !== undefined &&
           customElements.get('it-form-file') !== undefined &&
           customElements.get('it-form-toggle') !== undefined &&
           customElements.get('it-form-group') !== undefined;
  },
  
  // Utility function to wait for all components to be ready
  async ready() {
    if (this.isReady()) {
      return Promise.resolve();
    }
    
    return new Promise((resolve) => {
      const checkReady = () => {
        if (this.isReady()) {
          resolve();
        } else {
          setTimeout(checkReady, 10);
        }
      };
      checkReady();
    });
  }
};

// Export for UMD builds
export default BootstrapItaliaWC;