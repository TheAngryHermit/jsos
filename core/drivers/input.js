// Input Driver - Handles keyboard and mouse input
class InputDriver {
  constructor(eventSystem) {
    this.events = eventSystem;
    this.keyState = new Map();
    this.mouseState = {
      x: 0,
      y: 0,
      buttons: {},
    };
  }
  
  async init() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    document.addEventListener('click', (e) => this.handleClick(e));
    
    return true;
  }
  
  handleKeyDown(event) {
    this.keyState.set(event.key, true);
    this.events.emit('input:keydown', {
      key: event.key,
      code: event.code,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
    });
  }
  
  handleKeyUp(event) {
    this.keyState.set(event.key, false);
    this.events.emit('input:keyup', {
      key: event.key,
      code: event.code,
    });
  }
  
  handleMouseMove(event) {
    this.mouseState.x = event.clientX;
    this.mouseState.y = event.clientY;
    this.events.emit('input:mousemove', {
      x: event.clientX,
      y: event.clientY,
    });
  }
  
  handleMouseDown(event) {
    this.mouseState.buttons[event.button] = true;
    this.events.emit('input:mousedown', {
      x: event.clientX,
      y: event.clientY,
      button: event.button,
    });
  }
  
  handleMouseUp(event) {
    this.mouseState.buttons[event.button] = false;
    this.events.emit('input:mouseup', {
      x: event.clientX,
      y: event.clientY,
      button: event.button,
    });
  }
  
  handleClick(event) {
    this.events.emit('input:click', {
      x: event.clientX,
      y: event.clientY,
      target: event.target,
    });
  }
  
  isKeyPressed(key) {
    return this.keyState.get(key) || false;
  }
  
  getMouseState() {
    return { ...this.mouseState };
  }
  
  getKeyState() {
    const state = {};
    this.keyState.forEach((value, key) => {
      state[key] = value;
    });
    return state;
  }
}

window.InputDriver = InputDriver;
