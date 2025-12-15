// Display Driver - Handles rendering and display
class DisplayDriver {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.frameRate = 60;
    this.isRunning = false;
    this.renderCallbacks = [];
  }
  
  async init() {
    this.canvas = document.getElementById('root');
    
    // Create main container if needed
    if (!this.canvas) {
      const container = document.createElement('div');
      container.id = 'root';
      container.style.width = '100%';
      container.style.height = '100vh';
      container.style.overflow = 'hidden';
      document.body.appendChild(container);
      this.canvas = container;
    }
    
    window.addEventListener('resize', () => this.handleResize());
    return true;
  }
  
  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.emit('resize', { width: this.width, height: this.height });
  }
  
  getElement() {
    return this.canvas;
  }
  
  createWindow(options = {}) {
    const window = document.createElement('div');
    window.className = 'window';
    window.style.position = 'absolute';
    window.style.width = options.width || '400px';
    window.style.height = options.height || '300px';
    window.style.left = options.x || '50px';
    window.style.top = options.y || '50px';
    window.style.zIndex = options.zIndex || 100;
    
    return window;
  }
  
  render(callback) {
    this.renderCallbacks.push(callback);
  }
  
  clear() {
    this.canvas.innerHTML = '';
  }
  
  update() {
    this.renderCallbacks.forEach(cb => {
      try {
        cb();
      } catch (error) {
        console.error('Render callback error:', error);
      }
    });
  }
  
  emit(eventType, data) {
    // Emit display events
  }
  
  getStats() {
    return {
      width: this.width,
      height: this.height,
      frameRate: this.frameRate,
      isRunning: this.isRunning,
    };
  }
}

window.DisplayDriver = DisplayDriver;
