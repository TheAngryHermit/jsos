// Start Menu Component
class StartMenu {
  constructor(desktop) {
    this.desktop = desktop;
    this.isOpen = false;
  }
  
  render() {
    const menu = document.createElement('div');
    menu.className = 'start-menu';
    menu.id = 'start-menu';
    menu.style.display = 'none';
    
    menu.innerHTML = `
      <div class="start-menu-header">
        <h2>JSOS</h2>
      </div>
      <div class="start-menu-content">
        <div class="menu-section">
          <h3>System</h3>
          <ul>
            <li data-action="about">About JSOS</li>
            <li data-action="shutdown">Shutdown</li>
          </ul>
        </div>
      </div>
    `;
    
    // Setup event listeners
    menu.querySelectorAll('[data-app]').forEach(item => {
      item.addEventListener('click', () => {
        // Apps disabled for now
        this.toggle();
      });
    });
    
    menu.querySelectorAll('[data-action]').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.action;
        if (action === 'shutdown') {
          window.jsos.shutdown();
        } else if (action === 'about') {
          alert('JSOS - JavaScript Operating System v1.0');
        }
      });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.start-menu') && !e.target.closest('.start-btn')) {
        if (this.isOpen) this.toggle();
      }
    });
    
    return menu;
  }
  
  toggle() {
    const menu = document.getElementById('start-menu');
    if (menu) {
      this.isOpen = !this.isOpen;
      menu.style.display = this.isOpen ? 'block' : 'none';
    }
  }
}

window.StartMenu = StartMenu;
