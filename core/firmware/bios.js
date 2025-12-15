// BIOS - System firmware and configuration
class BIOS {
  constructor() {
    this.timestamp = new Date();
    this.browserInfo = this.getBrowserInfo();
    
    const savedConfig = this.loadConfig();
    this.config = savedConfig || {
      date: new Date().toLocaleString(),
      bootOrder: ['IndexedDB', 'LocalStorage', 'Network'],
      secureBoot: true,
      virtualization: false,
      sataMode: 'AHCI',
      biosKey: 'F2',
      biosKeyDelay: 1500,
    };
  }

  getBrowserInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages || [navigator.language],
      onLine: navigator.onLine,
      cookieEnabled: navigator.cookieEnabled,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      vendor: navigator.vendor,
    };
  }

  runPOST() {
    const messages = [
      'JSOS Firmware Initialization',
      'Browser: ' + this.extractBrowserName(),
      'Platform: ' + (this.browserInfo.platform || 'Unknown'),
      'Online Status: ' + (this.browserInfo.onLine ? 'Online' : 'Offline'),
      'Cookies Enabled: ' + (this.browserInfo.cookieEnabled ? 'Yes' : 'No'),
      'WebGL Support: ' + this.checkWebGL(),
      'LocalStorage Available: ' + this.checkLocalStorage(),
      'IndexedDB Available: ' + this.checkIndexedDB(),
    ];
    return messages;
  }

  extractBrowserName() {
    const ua = this.browserInfo.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return 'Unknown Browser';
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) ? 'Yes' : 'No';
    } catch (e) {
      return 'No';
    }
  }

  checkLocalStorage() {
    try {
      return typeof localStorage !== 'undefined' ? 'Yes' : 'No';
    } catch (e) {
      return 'No';
    }
  }

  checkIndexedDB() {
    try {
      return !!(window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB) ? 'Yes' : 'No';
    } catch (e) {
      return 'No';
    }
  }

  saveConfig() {
    try {
      localStorage.setItem('jsos_bios_config', JSON.stringify(this.config));
    } catch (e) {
      console.error('Failed to save BIOS config:', e);
    }
  }

  loadConfig() {
    try {
      const saved = localStorage.getItem('jsos_bios_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load BIOS config:', e);
    }
    return null;
  }

  reset() {
    localStorage.removeItem('jsos_bios_config');
    this.config = {
      date: new Date().toLocaleString(),
      bootOrder: ['IndexedDB', 'LocalStorage', 'Network'],
      secureBoot: true,
      virtualization: false,
      sataMode: 'AHCI',
      biosKey: 'F2',
      biosKeyDelay: 1500,
    };
  }
}

window.BIOS = BIOS;

BIOS.prototype.showSetup = function() {
  return new Promise((resolve) => {
    if (document.getElementById('bios-setup-overlay')) return resolve();

    const overlay = document.createElement('div');
    overlay.id = 'bios-setup-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#000';
    overlay.style.color = '#0f0';
    overlay.style.fontFamily = 'monospace';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.cursor = 'none';

    // Terminal-like container (larger, immersive, responsive)
    const term = document.createElement('div');
    term.style.width = '90vw';
    term.style.height = '88vh';
    term.style.maxWidth = '1280px';
    term.style.maxHeight = '920px';
    term.style.border = '2px solid #0f0';
    term.style.boxSizing = 'border-box';
    term.style.padding = '12px';
    term.style.overflow = 'hidden';
    term.style.display = 'flex';
    term.style.flexDirection = 'column';

    // content area (styled terminal)
    const screen = document.createElement('div');
    screen.id = 'bios-screen';
    screen.style.flex = '1';
    screen.style.margin = '0';
    // Keep content within the terminal (no scrollbar to preserve immersion)
    screen.style.overflow = 'hidden';
    screen.style.fontSize = '14px';
    screen.style.lineHeight = '1.4';
    screen.style.padding = '8px';
    screen.style.color = '#00ff66';
    screen.style.background = 'linear-gradient(#00110a, #001b10)';
    screen.style.fontFamily = 'monospace';
    screen.style.whiteSpace = 'pre';
    screen.style.borderRadius = '2px';
    screen.style.boxShadow = '0 0 24px rgba(0,255,0,0.03) inset';
    screen.innerHTML = '';

    const footer = document.createElement('div');
    footer.style.height = '30px';
    footer.style.borderTop = '1px solid rgba(0,255,0,0.06)';
    footer.style.paddingTop = '6px';
    footer.style.fontSize = '12px';
    footer.style.color = '#9fffaa';
    footer.style.display = 'flex';
    footer.style.alignItems = 'center';
    footer.style.justifyContent = 'space-between';
    footer.style.flexWrap = 'wrap';
    footer.style.gap = '8px';
    footer.innerHTML = `<div style="opacity:0.95">Arrows:Move · Enter:Select · ←/→:Change · F10:Save · Esc:Exit</div><div id="bios-cursor" style="font-family:monospace;color:#00ff66;margin-left:8px;">█</div>`;

    // scanline overlay for CRT feel
    term.style.position = 'relative';
    const scan = document.createElement('div');
    scan.style.position = 'absolute';
    scan.style.left = '0';
    scan.style.top = '0';
    scan.style.width = '100%';
    scan.style.height = '100%';
    scan.style.pointerEvents = 'none';
    scan.style.backgroundImage = 'repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0.04) 1px)';
    scan.style.opacity = '0.55';
    scan.style.mixBlendMode = 'multiply';
    scan.style.borderRadius = '2px';
    term.appendChild(scan);

    // subtle header glow
    const styleEl = document.createElement('style');
    styleEl.textContent = `@keyframes bios-blink{50%{opacity:0}} #bios-cursor{animation:bios-blink 1s steps(1) infinite}`;
    overlay.appendChild(styleEl);

    term.appendChild(screen);
    term.appendChild(footer);
    overlay.appendChild(term);
    document.body.appendChild(overlay);

    // BIOS Setup UI - keyboard-driven menu with detailed tooltips
    const menu = [
      { key: 'Date/Time', type: 'info', value: () => this.config.date, tooltip: 'System clock - updates in real time (read-only)' },
      { key: 'Boot Order', type: 'list', value: () => this.config.bootOrder.join(', '), options: [['IndexedDB','LocalStorage','Network']], tooltip: 'Boot device priority: IndexedDB (browser DB), LocalStorage (session), Network (remote). Use arrows to change order.' },
      { key: 'Secure Boot', type: 'bool', value: () => (this.config.secureBoot ? 'Enabled' : 'Disabled'), tooltip: 'Verify bootloader signature before loading. Prevents unauthorized kernel modifications. Toggle with Enter/arrows.' },
      { key: 'Virtualization', type: 'bool', value: () => (this.config.virtualization ? 'Enabled' : 'Disabled'), tooltip: 'Enable VT-x/AMD-V processor extensions for running VMs and containers. Required for hypervisor tasks.' },
      { key: 'SATA Mode', type: 'enum', value: () => this.config.sataMode, options: ['AHCI','IDE','RAID'], tooltip: 'Storage interface: AHCI (modern, fast), IDE (legacy), RAID (mirroring/striping). Use arrows to cycle.' },
      { key: 'BIOS Key', type: 'enum', value: () => this.config.biosKey, options: ['F2','Del','F10','F12'], tooltip: 'Key to enter BIOS on boot: F2 (common), Del (older systems), F10 (HP), F12 (Dell/Lenovo).' },
      { key: 'BIOS Key Delay', type: 'enum', value: () => (this.config.biosKeyDelay / 1000).toFixed(1) + 's', options: ['1.0s','1.5s','2.0s','3.5s','5.0s','10.0s'], tooltip: 'How long to show the boot prompt. Shorter = faster boot, longer = more time to press key.' },
      { key: 'Reset to Defaults', type: 'action', tooltip: 'Restore factory settings. Does NOT erase data, only resets BIOS config. Press Enter to execute.' },
    ];

    let selected = 0;

    const render = () => {
      const rows = [];
      rows.push(`<div style="color:#7CFF9A;font-weight:700;margin-bottom:6px">JSOS BIOS Setup Utility</div>`);
      rows.push(`<div style="color:#9fffaa;margin-bottom:6px">System Information:</div>`);
      rows.push(`<div style="opacity:0.9">  <span style=\"color:#aaffbf\">Timestamp    :</span> ${new Date().toLocaleString()}</div>`);
      rows.push(`<div style="opacity:0.9">  <span style=\"color:#aaffbf\">Browser      :</span> ${this.extractBrowserName()}</div>`);
      rows.push(`<div style="opacity:0.9">  <span style=\"color:#aaffbf\">Platform     :</span> ${this.browserInfo.platform || 'Unknown'}</div>`);
      rows.push(`<div style="opacity:0.9">  <span style=\"color:#aaffbf\">Language     :</span> ${this.browserInfo.language}</div>`);
      rows.push(`<div style="opacity:0.9">  <span style=\"color:#aaffbf\">WebGL        :</span> ${this.checkWebGL()}</div>`);

      rows.push(`<div style="height:8px"></div>`);
      rows.push(`<div style="color:#9fffaa;margin-bottom:6px">Configuration:</div>`);
      menu.forEach((item, idx) => {
        let v = '';
        try { v = item.value ? item.value() : ''; } catch (e) { v = ''; }
        if (item.type === 'action') {
          if (idx === selected) {
            rows.push(`<div style=\"background:#00ff66;color:#001a00;padding:2px 6px;border-radius:2px;margin-bottom:2px\">&gt; ${item.key}</div>`);
          } else {
            rows.push(`<div style=\"padding:2px 6px;margin-bottom:2px\"> ${item.key}</div>`);
          }
        } else {
          const left = `${item.key.padEnd(15)}`;
          if (idx === selected) {
            rows.push(`<div style=\"background:#00ff66;color:#001a00;padding:2px 6px;border-radius:2px;margin-bottom:2px\">&gt; <span style=\"font-weight:600\">${left}</span> : ${v}</div>`);
          } else {
            rows.push(`<div style=\"padding:2px 6px;margin-bottom:2px\"> ${left} : ${v}</div>`);
          }
        }
      });

      // Add tooltip for selected item
      const selectedItem = menu[selected];
      if (selectedItem && selectedItem.tooltip) {
        rows.push(`<div style=\"height:8px\"></div>`);
        rows.push(`<div style=\"color:#7CFF9A;font-size:11px;padding:6px;background:rgba(0,255,102,0.08);border-radius:2px;border-left:2px solid #00ff66;word-wrap:break-word;white-space:normal;line-height:1.3\">${selectedItem.tooltip}</div>`);
      }

      rows.push(`<div style=\"height:8px\"></div>`);
      rows.push(`<div style=\"opacity:0.85;font-size:12px\">Commands: ArrowUp/Down - move | Left/Right - change | Enter - change/toggle | F10 - Save & Exit | Esc - Exit without saving</div>`);
      screen.innerHTML = rows.join('');
    };

    const applyLeftRight = (dir) => {
      const item = menu[selected];
      if (!item) return;
      if (item.type === 'bool') {
        this.config[item.key.toLowerCase().replace(/ /g,'')] = !this.config[item.key.toLowerCase().replace(/ /g,'')];
      } else if (item.type === 'enum') {
        const opts = item.options;
        // Handle different enum types based on key
        let cur, configKey;
        if (item.key === 'SATA Mode') {
          cur = this.config.sataMode;
          configKey = 'sataMode';
        } else if (item.key === 'BIOS Key') {
          cur = this.config.biosKey;
          configKey = 'biosKey';
        } else if (item.key === 'BIOS Key Delay') {
          // Map delay display values to milliseconds
          const delayMap = { '1.0s': 1000, '2.0s': 2000, '3.5s': 3500, '5.0s': 5000, '10.0s': 10000 };
          cur = (this.config.biosKeyDelay / 1000).toFixed(1) + 's';
          configKey = 'biosKeyDelay';
        }
        const idx = opts.indexOf(cur);
        const next = opts[(idx + (dir === 'right' ? 1 : -1) + opts.length) % opts.length];
        // Apply the change
        if (item.key === 'BIOS Key Delay') {
          const delayMap = { '1.0s': 1000, '2.0s': 2000, '3.5s': 3500, '5.0s': 5000, '10.0s': 10000 };
          this.config.biosKeyDelay = delayMap[next];
        } else {
          this.config[configKey] = next;
        }
      } else if (item.type === 'list') {
        // rotate bootOrder when left/right
        if (Array.isArray(this.config.bootOrder)) {
          if (dir === 'right') {
            const first = this.config.bootOrder.shift();
            this.config.bootOrder.push(first);
          } else {
            const last = this.config.bootOrder.pop();
            this.config.bootOrder.unshift(last);
          }
        }
      } else if (item.type === 'action') {
        if (item.key === 'Reset to Defaults') {
          this.config = {
            date: new Date().toLocaleString(),
            bootOrder: ['IndexedDB', 'LocalStorage', 'Network'],
            secureBoot: true,
            virtualization: false,
            sataMode: 'AHCI',
            biosKey: 'F2',
            biosKeyDelay: 3500,
          };
        }
      }
      // keep date current
      this.config.date = new Date().toLocaleString();
      render();
    };

    const keyHandler = (e) => {
      const key = e.key;
      if (key === 'ArrowUp') {
        selected = (selected - 1 + menu.length) % menu.length;
        render();
        e.preventDefault();
      } else if (key === 'ArrowDown') {
        selected = (selected + 1) % menu.length;
        render();
        e.preventDefault();
      } else if (key === 'ArrowLeft') {
        applyLeftRight('left');
        e.preventDefault();
      } else if (key === 'ArrowRight') {
        applyLeftRight('right');
        e.preventDefault();
      } else if (key === 'Enter') {
        // toggle or act
        const it = menu[selected];
        if (it.type === 'bool') {
          const k = it.key.toLowerCase().replace(/ /g,'');
          this.config[k] = !this.config[k];
        } else if (it.type === 'enum') {
          applyLeftRight('right');
        } else if (it.type === 'list') {
          applyLeftRight('right');
        } else if (it.type === 'action') {
          if (it.key === 'Reset to Defaults') {
            this.config = {
              date: new Date().toLocaleString(),
              bootOrder: ['IndexedDB', 'LocalStorage', 'Network'],
              secureBoot: true,
              virtualization: false,
              sataMode: 'AHCI',
            };
          }
        }
        render();
        e.preventDefault();
      } else if (key === 'F10') {
        cleanup(true);
        e.preventDefault();
      } else if (key === 'Escape') {
        cleanup(false);
        e.preventDefault();
      }
    };

    let refreshTimer = null;
    const cleanup = (saved) => {
      document.removeEventListener('keydown', keyHandler);
      if (refreshTimer) clearInterval(refreshTimer);
      overlay.remove();
      if (saved) {
        this.saveConfig();
      }
      resolve(saved ? this.config : null);
    };

    // initial render and focus
    render();
    // update date/time and render every second for realtime info
    refreshTimer = setInterval(() => {
      this.config.date = new Date().toLocaleString();
      render();
    }, 1000);

    setTimeout(() => {
      document.addEventListener('keydown', keyHandler);
    }, 10);
  });
};
