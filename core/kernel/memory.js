// Memory Manager - Virtual memory allocation using block-based strategy
class Memory {
  constructor() {
    this.totalMemory = 1024 * 1024 * 100; // 100MB
    this.allocatedMemory = 0;
    this.blocks = new Map(); // blockId -> { size, timestamp, owner, id, data }
    this.blockCounter = 0;
  }
  
  async init() {
    return Promise.resolve();
  }
  
  allocate(size, owner = 'system') {
    if (this.allocatedMemory + size > this.totalMemory) {
      throw new Error('Out of memory');
    }
    
    const blockId = ++this.blockCounter;
    const block = {
      size,
      timestamp: Date.now(),
      owner,
      id: blockId,
      data: new Uint8Array(size),
    };
    
    this.blocks.set(blockId, block);
    this.allocatedMemory += size;
    
    return blockId;
  }
  
  free(blockId) {
    if (this.blocks.has(blockId)) {
      const block = this.blocks.get(blockId);
      this.allocatedMemory -= block.size;
      this.blocks.delete(blockId);
      return true;
    }
    return false;
  }
  
  getBlock(blockId) {
    return this.blocks.get(blockId);
  }
  
  getStats() {
    return {
      total: this.totalMemory,
      allocated: this.allocatedMemory,
      free: this.totalMemory - this.allocatedMemory,
      blocks: this.blocks.size,
      usage: ((this.allocatedMemory / this.totalMemory) * 100).toFixed(2) + '%',
    };
  }
  
  // Clean up memory blocks owned by a specific process
  cleanup(owner) {
    const blocksToRemove = [];
    this.blocks.forEach((block, id) => {
      if (block.owner === owner) {
        blocksToRemove.push(id);
      }
    });
    blocksToRemove.forEach(id => this.free(id));
    return blocksToRemove.length;
  }
}

window.Memory = Memory;
