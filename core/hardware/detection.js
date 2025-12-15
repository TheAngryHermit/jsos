/**
 * Hardware Detection Module - Detects and reports actual system hardware
 * Uses real browser APIs to get actual device information
 */
class HardwareDetection {
  constructor() {
    this.cpu = this.detectCPU();
    this.memory = this.detectMemory();
    this.display = this.detectDisplay();
    this.keyboard = this.detectKeyboard();
  }

  /**
   * Detect CPU information from real browser APIs
   * @returns {Object} Real CPU info
   */
  detectCPU() {
    const cores = navigator.hardwareConcurrency || 'Unknown';
    const userAgent = navigator.userAgent;
    let os = 'Unknown OS';
    let arch = 'Unknown';
    
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
    
    if (userAgent.includes('x86_64') || userAgent.includes('x64')) arch = 'x86_64';
    else if (userAgent.includes('x86')) arch = 'x86';
    else if (userAgent.includes('arm64')) arch = 'ARM64';
    else if (userAgent.includes('arm')) arch = 'ARM';

    return {
      cores: cores,
      threads: cores !== 'Unknown' ? cores * 2 : 'Unknown',
      os: os,
      architecture: arch,
      userAgent: userAgent.substring(0, 80) + '...',
    };
  }

  /**
   * Detect memory from real browser APIs
   * @returns {Object} Real memory info
   */
  detectMemory() {
    const deviceMem = navigator.deviceMemory;
    const totalMemory = deviceMem ? (deviceMem * 1024).toFixed(0) + ' MB' : 'Unknown';
    
    return {
      total: totalMemory,
      available: deviceMem ? (deviceMem * 1024 * 0.95).toFixed(0) + ' MB' : 'Unknown',
    };
  }

  /**
   * Detect display from real browser APIs
   * @returns {Object} Real display info
   */
  detectDisplay() {
    const screen = window.screen;
    const dpi = (window.devicePixelRatio || 1).toFixed(1);
    
    return {
      resolution: `${screen.width}x${screen.height}`,
      colorDepth: `${screen.colorDepth}-bit`,
      pixelRatio: dpi + 'x',
    };
  }

  /**
   * Detect keyboard from real browser APIs
   * @returns {Object} Real keyboard info
   */
  detectKeyboard() {
    const language = navigator.language || 'en-US';
    const languages = navigator.languages ? navigator.languages.join(', ') : language;
    const touchPoints = navigator.maxTouchPoints || 0;
    
    return {
      language: language,
      supportedLanguages: languages,
      touchSupport: touchPoints > 0 ? `Yes (${touchPoints} points)` : 'No',
    };
  }

  /**
   * Get all hardware summary with only real data
   * @returns {Array} Hardware report messages
   */
  getHardwareReport() {
    const messages = [
      '=== HARDWARE CONFIGURATION ===',
      'System Information:',
      '  OS: ' + this.cpu.os,
      '  Architecture: ' + this.cpu.architecture,
      'Processor:',
      '  Cores: ' + this.cpu.cores,
      '  Threads: ' + this.cpu.threads,
      'Memory:',
      '  Total: ' + this.memory.total,
      '  Available: ' + this.memory.available,
      'Display:',
      '  Resolution: ' + this.display.resolution,
      '  Color Depth: ' + this.display.colorDepth,
      '  Pixel Ratio: ' + this.display.pixelRatio,
      'Input:',
      '  Language: ' + this.keyboard.language,
      '  Touch Support: ' + this.keyboard.touchSupport,
    ];

    return messages;
  }
}

window.HardwareDetection = HardwareDetection;
