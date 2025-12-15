/**
 * Scheduler - Process scheduling and execution
 * Implements round-robin scheduling with time slices
 * Distributes CPU time fairly among processes
 */
class Scheduler {
  constructor() {
    this.queue = [];
    this.isRunning = false;
    this.tickRate = 16; // ~60 FPS
    this.currentSlice = 0;
    this.timeSlice = 4; // ms per process
  }
  
  /**
   * Add process to scheduling queue
   * Prevents duplicate enqueuing of same process
   * @param {Object} process - Process object with pid and state
   */
  enqueue(process) {
    if (!this.queue.find(p => p.pid === process.pid)) {
      this.queue.push(process);
    }
  }
  
  /**
   * Remove process from scheduling queue
   * @param {Object} process - Process to remove
   */
  dequeue(process) {
    const index = this.queue.findIndex(p => p.pid === process.pid);
    if (index > -1) {
      this.queue.splice(index, 1);
    }
  }
  
  /**
   * Start the scheduler tick loop
   * Begins executing processes from queue
   */
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.tick();
  }
  
  /**
   * Stop the scheduler tick loop
   */
  stop() {
    this.isRunning = false;
  }
  
  tick() {
    if (!this.isRunning) return;
    
    // Execute one process or rotate through queue
    if (this.queue.length > 0) {
      const process = this.queue[this.currentSlice % this.queue.length];
      
      if (process.state === 'running' && process.entry) {
        try {
          process.entry();
        } catch (error) {
          console.error(`Process ${process.pid} error:`, error);
          process.state = 'error';
        }
      }
      
      this.currentSlice++;
    }
    
    // Schedule next tick
    setTimeout(() => this.tick(), this.tickRate);
  }
  
  getQueue() {
    return [...this.queue];
  }
  
  setTimeSlice(ms) {
    this.timeSlice = ms;
  }
  
  setTickRate(ms) {
    this.tickRate = ms;
  }
}

window.Scheduler = Scheduler;
