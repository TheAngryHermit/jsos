// JSOS - JavaScript Operating System
// Main entry point and system initialization
// 
// A browser-based operating system featuring:
// - BIOS with configurable settings
// - Virtual filesystem with persistence
// - Terminal interface with Unix-like commands
// - Process and memory management
// - Driver system for hardware abstraction

class JSOS {
  constructor() {
    // Kernel
    this.events = new EventSystem();
    this.memory = new Memory();
    this.scheduler = new Scheduler();
    this.processManager = new ProcessManager(this.scheduler, this.events);
    this.vfs = new VirtualFileSystem();
    
    // Drivers
    this.display = new DisplayDriver();
    this.input = new InputDriver(this.events);
    this.audio = new AudioDriver();
    
    // UI
    this.terminal = new Terminal(this);
    this.bootManager = new BootManager(this, this.terminal);
    
    window.jsos = this;
  }
  
  async init() {
    try {
      await this.memory.init();
      await this.vfs.init();
      await this.display.init();
      await this.input.init();
      await this.audio.init();
      await this.terminal.init();
      
      this.scheduler.start();
      await this.bootManager.runBootSequence();
      
      this.events.emit('system:ready');
    } catch (error) {
      console.error('Boot failed:', error);
    }
  }
  
  shutdown() {
    console.log('Shutting down JSOS...');
    this.scheduler.stop();
    this.events.emit('system:shutdown');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const os = new JSOS();
  await os.init();
});
