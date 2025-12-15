// Desktop - Main UI manager
class Desktop {
  constructor(os) {
    this.os = os;
    this.events = os.events;
    this.taskbar = null;
    this.startMenu = null;
    this.windows = new Map();
    this.runningApps = new Map();
    this.zIndexCounter = 100;
  }
  
  async init() {
    // Setup desktop environment
    this.setupDOM();
    
    // Create UI components
    this.taskbar = new Taskbar(this);
    this.startMenu = new StartMenu(this);
    
    const root = document.getElementById('root');
    
    // Render desktop
    const desktop = document.createElement('div');
    desktop.className = 'desktop';
    desktop.id = 'desktop';
    
    // Desktop background
    const background = document.createElement('div');
    background.className = 'desktop-background';
    desktop.appendChild(background);
    
    // Desktop icons area
    const iconsArea = document.createElement('div');
    iconsArea.className = 'desktop-icons';
    desktop.appendChild(iconsArea);
    
    // Windows container
    const windowsContainer = document.createElement('div');
    windowsContainer.className = 'windows-container';
    desktop.appendChild(windowsContainer);
    
    root.appendChild(desktop);
    
    // Add taskbar
    root.appendChild(this.taskbar.render());
    
    // Add start menu
    root.appendChild(this.startMenu.render());
    
    // Store container reference
    this.windowContainer = windowsContainer;
    
    // Show welcome window with core OS info
    this.showWelcomeWindow();
    
    return true;
  }
  
  setupDOM() {
    const root = document.getElementById('root');
    root.style.width = '100%';
    root.style.height = '100vh';
    root.style.margin = '0';
    root.style.padding = '0';
    root.style.overflow = 'hidden';
  }
  
  createDesktopIcons(container) {
    // For now, just show a welcome message
    // Desktop icons disabled - focusing on core OS
  }
  
  setupAppListeners() {
    // App launching disabled - focusing on core OS
  }
  
  launchApp(appName) {
    // Apps disabled for now
  }
  
  bringToFront(element) {
    element.style.zIndex = this.zIndexCounter++;
  }
  
  toggleStartMenu() {
    this.startMenu.toggle();
  }
  
  createWindow(options) {
    const windowObj = new WindowComponent(options);
    const windowEl = windowObj.render();
    
    const container = document.querySelector('.windows-container');
    if (container) {
      container.appendChild(windowEl);
    }
    
    this.windows.set(windowObj.id, windowObj);
    return windowObj;
  }

  showWelcomeWindow() {
    const welcome = this.createWindow({
      title: 'Welcome to JSOS',
      x: window.innerWidth / 2 - 300,
      y: window.innerHeight / 2 - 150,
      width: 600,
      height: 300,
    });
    
    const windowEl = document.getElementById(welcome.id);
    if (windowEl) {
      const content = windowEl.querySelector('.window-content');
      if (content) {
        const renderWelcome = () => {
          const mem = this.os.memory.getStats();
          const proc = this.os.processManager.getStats();
          content.innerHTML = `
            <div style="padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: center;">
              <h2 style="margin: 0 0 15px 0;">JSOS v1.0</h2>
              <p style="margin: 0 0 10px 0;">JavaScript Operating System</p>
              <p style="margin: 0; font-size: 12px; opacity: 0.7;">Core OS loaded successfully</p>
              <div style="margin-top: 20px; font-size: 12px; opacity: 0.6;">
                <p>Memory: ${mem.usage} (Allocated: ${(mem.allocated/1024/1024).toFixed(2)} MB, Free: ${(mem.free/1024/1024).toFixed(2)} MB)</p>
                <p>Processes: ${proc.total} (Running: ${proc.running})</p>
                <p style="opacity:0.6;font-size:11px;margin-top:8px">Updated: ${new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          `;
        };

        renderWelcome();
        // refresh every second to show realtime stats
        const intervalId = setInterval(renderWelcome, 1000);
        // store interval id so it can be cleared if window removed later
        windowEl.__welcomeInterval = intervalId;
      }
    }
  }
}

window.Desktop = Desktop;
  