/**
 * Bootloader Module - Second stage bootloader with real system info
 * Reports actual browser and environment information
 */
class Bootloader {
  constructor() {
    this.timestamp = new Date();
  }

  /**
   * Get bootloader initialization info
   * @returns {Array} Initialization messages
   */
  initialize() {
    return [
      'Bootloader Stage 2 - JSOS Terminal',
      'Boot Time: ' + new Date().toLocaleString(),
      'Timezone: ' + Intl.DateTimeFormat().resolvedOptions().timeZone,
    ];
  }

  /**
   * Get runtime environment info
   * @returns {Array} Environment messages
   */
  getEnvironmentInfo() {
    return [
      'JavaScript Engine: ' + this.getEngineInfo(),
      'Runtime Memory Limit: ' + this.getMemoryInfo(),
      'Document Ready: ' + (document.readyState === 'complete' ? 'Yes' : 'Loading'),
      'Page Visibility: ' + (document.hidden ? 'Hidden' : 'Visible'),
    ];
  }

  /**
   * Detect JavaScript engine
   * @returns {string} Engine name
   */
  getEngineInfo() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'V8 (Chrome/Node)';
    if (ua.includes('Firefox')) return 'SpiderMonkey (Firefox)';
    if (ua.includes('Safari')) return 'JavaScriptCore (Safari)';
    if (ua.includes('Edge')) return 'Chakra (Edge)';
    return 'Unknown Engine';
  }

  /**
   * Get available memory info
   * @returns {string} Memory limit
   */
  getMemoryInfo() {
    if (navigator.deviceMemory) {
      return (navigator.deviceMemory * 1024) + ' MB';
    }
    return 'Unknown';
  }

  /**
   * Get bootloader status
   * @returns {Object} Status info
   */
  getStatus() {
    return {
      ready: true,
      timestamp: new Date().toISOString(),
    };
  }
}

window.Bootloader = Bootloader;
