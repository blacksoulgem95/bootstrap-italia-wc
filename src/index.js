/**
 * Bootstrap Italia Web Components
 * 
 * Una raccolta di Web Components nativi che implementano i componenti Bootstrap Italia.
 * 
 * ASSUNZIONE: Il CSS di Bootstrap Italia è già importato globalmente nella pagina.
 * I Web Components si basano sui CSS esistenti e aggiungono solo funzionalità e accessibilità.
 * 
 * @version 1.0.0
 * @author Bootstrap Italia WC Contributors
 * @license MIT
 */

// Import all components
import ItAlert from './it-alert.js';

// Export all components
export {
  ItAlert
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
  
  // Utility function to check if all components are registered
  isReady() {
    return customElements.get('it-alert') !== undefined;
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