/**
 * EventSystem - Core event emitter for inter-module communication
 * Provides pub/sub pattern for loose coupling between system components
 */
class EventSystem {
  constructor() {
    // Map to store event listeners: { eventName: [callbacks] }
    this.listeners = new Map();
  }
  
  /**
   * Subscribe to an event
   * @param {string} eventName - Name of the event to listen for
   * @param {Function} callback - Function to execute when event is emitted
   * @returns {Function} Unsubscribe function for removing listener
   */
  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
    
    // Return unsubscribe function for convenient cleanup
    return () => {
      const callbacks = this.listeners.get(eventName);
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    };
  }
  
  /**
   * Subscribe to an event that fires only once
   * @param {string} eventName - Name of the event
   * @param {Function} callback - Function to execute once
   * @returns {Function} Unsubscribe function
   */
  once(eventName, callback) {
    const unsubscribe = this.on(eventName, (...args) => {
      callback(...args);
      unsubscribe();
    });
    return unsubscribe;
  }
  
  /**
   * Emit an event to all subscribed listeners
   * @param {string} eventName - Name of the event
   * @param {...*} args - Arguments to pass to listeners
   */
  emit(eventName, ...args) {
    if (this.listeners.has(eventName)) {
      // Error handling prevents one bad listener from breaking others
      this.listeners.get(eventName).forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Event handler error for '${eventName}':`, error);
        }
      });
    }
  }
  
  /**
   * Unsubscribe from an event
   * @param {string} eventName - Name of the event
   * @param {Function} callback - Specific callback to remove
   */
  off(eventName, callback) {
    if (this.listeners.has(eventName)) {
      const callbacks = this.listeners.get(eventName);
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    }
  }
  
  /**
   * Remove all listeners for an event or clear all listeners
   * @param {string} [eventName] - Optional event name. If omitted, clears all listeners
   */
  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners.delete(eventName);
    } else {
      this.listeners.clear();
    }
  }
}

window.EventSystem = EventSystem;
