/**
 * Process Manager - Process lifecycle and management
 * Handles process creation, execution, and termination
 * Integrates with scheduler for process execution
 */
class ProcessManager {
  constructor(scheduler, eventSystem) {
    this.scheduler = scheduler;
    this.events = eventSystem;
    // Map of processes: pid -> processObject
    this.processes = new Map();
    this.processCounter = 0;
    this.currentProcess = null;
  }
  
  /**
   * Create a new process
   * @param {string} name - Process name for identification
   * @param {Function} entry - Main function/entry point for process
   * @param {Object} [options] - Process options (memory, priority, etc)
   * @returns {number} Process ID (PID)
   */
  create(name, entry, options = {}) {
    const pid = ++this.processCounter;
    const process = {
      pid,
      name,
      entry,
      state: 'created',
      memory: options.memory || 10 * 1024 * 1024, // 10MB default
      priority: options.priority || 5,
      createdAt: Date.now(),
      threads: [],
      data: {},
    };
    
    this.processes.set(pid, process);
    this.events.emit('process:created', { pid, name });
    
    return pid;
  }
  
  /**
   * Start an existing process
   * Transitions state to 'running' and adds to scheduler queue
   * @param {number} pid - Process ID to start
   * @returns {number} Process ID
   */
  start(pid) {
    const process = this.processes.get(pid);
    if (!process) throw new Error(`Process ${pid} not found`);
    
    process.state = 'running';
    this.scheduler.enqueue(process);
    this.events.emit('process:started', { pid });
    
    return pid;
  }
  
  /**
   * Stop a running process (pause, not terminate)
   * @param {number} pid - Process ID to stop
   * @returns {boolean} True if successful
   */
  stop(pid) {
    const process = this.processes.get(pid);
    if (!process) throw new Error(`Process ${pid} not found`);
    
    process.state = 'stopped';
    this.events.emit('process:stopped', { pid });
    
    return true;
  }
  
  /**
   * Terminate a process completely
   * Removes from process list and scheduler
   * @param {number} pid - Process ID to terminate
   * @returns {boolean} True if successful
   */
  terminate(pid) {
    const process = this.processes.get(pid);
    if (!process) throw new Error(`Process ${pid} not found`);
    
    process.state = 'terminated';
    this.scheduler.dequeue(process);
    this.processes.delete(pid);
    this.events.emit('process:terminated', { pid });
    
    return true;
  }
  
  get(pid) {
    return this.processes.get(pid);
  }
  
  list() {
    return Array.from(this.processes.values());
  }
  
  getStats() {
    const running = Array.from(this.processes.values()).filter(p => p.state === 'running').length;
    return {
      total: this.processes.size,
      running,
      stopped: this.processes.size - running,
    };
  }
}

window.ProcessManager = ProcessManager;
