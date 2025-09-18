// Jest setup file for Bootstrap Italia WC tests

// Mock CustomEvent for older browsers
if (typeof window !== 'undefined' && !window.CustomEvent) {
  window.CustomEvent = function(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };
  window.CustomEvent.prototype = window.Event.prototype;
}