// Audio Driver - Handles audio and sound
class AudioDriver {
  constructor() {
    this.audioContext = null;
    this.volume = 0.5;
    this.isEnabled = true;
    this.sounds = new Map();
    this.isInitialized = false;
  }
  
  async init() {
    // Don't create AudioContext yet - wait for user interaction
    // Just set up the listener
    this.setupUserInteractionListener();
    return true;
  }
  
  setupUserInteractionListener() {
    const events = ['click', 'touchstart', 'keydown'];
    const initAudio = () => {
      if (this.isInitialized) return;
      
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.isInitialized = true;
        
        // Resume if suspended
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }
      } catch (error) {
        console.error('Audio context not available:', error);
        this.isEnabled = false;
      }
      
      // Remove listeners after initialization
      events.forEach(event => {
        document.removeEventListener(event, initAudio);
      });
    };
    
    events.forEach(event => {
      document.addEventListener(event, initAudio);
    });
  }
  
  playTone(frequency = 440, duration = 100, volume = 0.5) {
    if (!this.isEnabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
    
    osc.start(now);
    osc.stop(now + duration / 1000);
  }
  
  playSound(name, url) {
    if (!this.isEnabled) return;
    
    if (this.sounds.has(name)) {
      const audio = this.sounds.get(name);
      audio.currentTime = 0;
      audio.play();
      return;
    }
    
    const audio = new Audio(url);
    audio.volume = this.volume;
    this.sounds.set(name, audio);
    audio.play();
  }
  
  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
  }
  
  getVolume() {
    return this.volume;
  }
  
  stopAll() {
    this.sounds.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
  
  playNotification() {
    this.playTone(800, 100);
    setTimeout(() => this.playTone(1000, 100), 150);
  }
}

window.AudioDriver = AudioDriver;
