// Terminal - JSOS command-line interface
class Terminal {
  constructor(os) {
    this.os = os;
    this.terminal = null;
    this.output = null;
    this.input = null;
    this.inputBuffer = '';
    this.history = [];
    this.historyIndex = -1;
    this.cursorVisible = true;
    this.isReady = false;
    this.currentDir = '/';
    this.confirmCallback = null;
  }

  init() {
    this.setupDOM();
    return true;
  }

  setupDOM() {
    const root = document.getElementById('root');
    root.style.backgroundColor = '#1a1a1a';
    root.style.color = '#00ff00';
    root.style.fontFamily = 'monospace';
    root.style.fontSize = '14px';
    root.style.margin = '0';
    root.style.padding = '0';
    root.style.overflow = 'hidden';
    root.style.height = '100vh';
    root.style.width = '100vw';

    const terminal = document.createElement('div');
    terminal.className = 'terminal';
    terminal.id = 'terminal';
    terminal.style.width = '100%';
    terminal.style.height = '100%';
    terminal.style.display = 'flex';
    terminal.style.flexDirection = 'column';
    terminal.style.padding = '20px';
    terminal.style.boxSizing = 'border-box';
    terminal.style.overflowY = 'auto';
    terminal.style.backgroundColor = '#1a1a1a';
    terminal.style.color = '#00ff00';
    terminal.style.userSelect = 'text';

    const output = document.createElement('div');
    output.className = 'terminal-output';
    output.id = 'terminal-output';
    output.style.flex = '1';
    output.style.overflowY = 'auto';
    output.style.marginBottom = '10px';
    output.style.whiteSpace = 'pre-wrap';
    output.style.wordWrap = 'break-word';

    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-input-line';
    inputLine.id = 'terminal-input-line';
    inputLine.style.display = 'flex';
    inputLine.style.alignItems = 'center';

    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.id = 'terminal-prompt';
    prompt.textContent = '> ';
    prompt.style.color = '#00ff00';
    prompt.style.marginRight = '5px';

    const input = document.createElement('input');
    input.className = 'terminal-input';
    input.id = 'terminal-input';
    input.type = 'text';
    input.style.backgroundColor = 'transparent';
    input.style.border = 'none';
    input.style.color = '#00ff00';
    input.style.fontFamily = 'monospace';
    input.style.fontSize = '14px';
    input.style.outline = 'none';
    input.style.flex = '1';
    input.style.padding = '0';
    input.style.margin = '0';

    inputLine.appendChild(prompt);
    inputLine.appendChild(input);

    terminal.appendChild(output);
    terminal.appendChild(inputLine);

    root.appendChild(terminal);

    this.terminal = terminal;
    this.output = output;
    this.input = input;

    this.setupInputHandlers();
  }

  setupInputHandlers() {
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.input.focus();
  }

  handleKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = this.input.value;
      
      if (this.confirmCallback) {
        const callback = this.confirmCallback;
        this.confirmCallback = null;
        callback(command);
      } else {
        this.executeCommand(command);
      }
      
      this.input.value = '';
      this.history.push(command);
      this.historyIndex = this.history.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    }
  }

  println(text = '') {
    const line = document.createElement('div');
    line.textContent = text;
    line.style.whiteSpace = 'pre-wrap';
    line.style.wordWrap = 'break-word';
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  print(text = '') {
    if (this.output.children.length === 0) {
      this.println(text);
    } else {
      const lastLine = this.output.lastChild;
      lastLine.textContent += text;
      this.output.scrollTop = this.output.scrollHeight;
    }
  }

  clear() {
    this.output.innerHTML = '';
  }

  async executeCommand(command) {
    this.println(`> ${command}`);

    const parts = command.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        this.showHelp();
        break;
      case 'clear':
      case 'cls':
        this.clear();
        break;
      case 'memory':
        this.showMemory();
        break;
      case 'ps':
        this.showProcesses();
        break;
      case 'cat':
        this.catFile(args[0]);
        break;
      case 'ls':
        this.listFiles(args[0] || this.currentDir);
        break;
      case 'cd':
        this.changeDirectory(args[0]);
        break;
      case 'pwd':
        this.println(this.currentDir);
        break;
      case 'mkdir':
        this.makeDirectory(args[0]);
        break;
      case 'rmdir':
        this.removeDirectory(args[0]);
        break;
      case 'rm':
        this.removeFile(args[0], args.includes('-r') || args.includes('-rf'));
        break;
      case 'touch':
        await this.touchFile(args[0]);
        break;
      case 'cp':
        await this.copyFile(args[0], args[1]);
        break;
      case 'mv':
        await this.moveFile(args[0], args[1]);
        break;
      case 'tree':
        this.showTree();
        break;
      case 'whoami':
        this.println('root@jsos');
        break;
      case 'uname':
        this.showSystemInfo();
        break;
      case 'echo':
        this.println(args.join(' '));
        break;
      case 'reset':
        this.factoryReset();
        break;
      case 'shutdown':
        this.shutdown();
        break;
      case '':
        break;
      default:
        this.println(`Command not found: ${cmd}`);
        this.println(`Type 'help' for available commands`);
    }
  }

  showHelp() {
    this.println('JSOS - Available Commands:');
    this.println('');
    this.println('  help        - Show this help message');
    this.println('  clear/cls   - Clear screen');
    this.println('');
    this.println('File Operations:');
    this.println('  cat [file]  - Display file contents');
    this.println('  ls [path]   - List files');
    this.println('  cd [path]   - Change directory');
    this.println('  pwd         - Print working directory');
    this.println('  mkdir [dir] - Create directory');
    this.println('  rmdir [dir] - Remove empty directory');
    this.println('  rm [file]   - Remove file (use -r for directories)');
    this.println('  touch [file]- Create empty file or update timestamp');
    this.println('  cp [s] [d]  - Copy file');
    this.println('  mv [s] [d]  - Move/rename file');
    this.println('  tree        - Show file tree');
    this.println('');
    this.println('System:');
    this.println('  memory      - Show memory usage');
    this.println('  ps          - List processes');
    this.println('  uname       - System information');
    this.println('  whoami      - Current user');
    this.println('  echo [text] - Print text');
    this.println('  reset       - Factory reset (clear all data)');
    this.println('  shutdown    - Shutdown system');
  }

  showMemory() {
    const stats = this.os.memory.getStats();
    const totalMB = (stats.total / 1024 / 1024).toFixed(2);
    const freeMB = (stats.free / 1024 / 1024).toFixed(2);
    const usedMB = (stats.allocated / 1024 / 1024).toFixed(2);
    this.println(`Memory Usage: ${stats.usage} (${usedMB} MB / ${totalMB} MB)`);
    this.println(`Free: ${freeMB} MB`);
    this.println(`Used: ${usedMB} MB`);
  }

  showProcesses() {
    this.println('PID   | Name           | State');
    this.println('------|----------------|--------');
    
    const queue = this.os.processManager.getRunningQueue();
    queue.forEach(pid => {
      const process = this.os.processManager.processes.get(pid);
      if (process) {
        const pidStr = pid.toString().padEnd(5);
        const nameStr = (process.name || 'unknown').substring(0, 14).padEnd(14);
        const stateStr = process.state || 'unknown';
        this.println(`${pidStr}| ${nameStr}| ${stateStr}`);
      }
    });
  }

  listFiles(path) {
    try {
      const files = this.os.vfs.listDirectory(path);
      if (files.length === 0) {
        this.println('(empty directory)');
      } else {
        files.forEach(file => {
          const type = file.type === 'directory' ? '[DIR]' : '[FILE]';
          this.println(`${type.padEnd(6)} ${file.name}`);
        });
      }
    } catch (e) {
      this.println(`Error: ${e.message}`);
    }
  }

  changeDirectory(path) {
    if (!path) {
      this.currentDir = '/';
      return;
    }

    try {
      let targetPath = path;
      if (path === '..') {
        if (this.currentDir === '/') {
          targetPath = '/';
        } else {
          const parts = this.currentDir.split('/').filter(p => p);
          parts.pop();
          targetPath = '/' + parts.join('/');
        }
      } else if (path === '/') {
        targetPath = '/';
      } else if (!path.startsWith('/')) {
        if (this.currentDir === '/') {
          targetPath = '/' + path;
        } else {
          targetPath = this.currentDir + '/' + path;
        }
      }

      targetPath = targetPath.replace(/\/+/g, '/');
      if (targetPath !== '/' && targetPath.endsWith('/')) {
        targetPath = targetPath.slice(0, -1);
      }

      const dir = this.os.vfs.getDirectory(targetPath);
      if (dir) {
        this.currentDir = targetPath;
      } else {
        this.println(`cd: no such directory: ${path}`);
      }
    } catch (e) {
      this.println(`Error: ${e.message}`);
    }
  }

  catFile(path) {
    if (!path) {
      this.println('cat: missing file operand');
      return;
    }

    try {
      let filePath = path;
      if (!path.startsWith('/')) {
        if (this.currentDir === '/') {
          filePath = '/' + path;
        } else {
          filePath = this.currentDir + '/' + path;
        }
      }

      const file = this.os.vfs.getFile(filePath);
      if (!file) {
        this.println(`cat: ${path}: No such file or directory`);
        return;
      }

      this.println(file.content);
    } catch (e) {
      this.println(`Error: ${e.message}`);
    }
  }

  makeDirectory(path) {
    if (!path) {
      this.println('mkdir: missing operand');
      return;
    }

    try {
      let dirPath = this.resolvePath(path);
      this.os.vfs.mkdir(dirPath);
    } catch (e) {
      this.println(e.message);
    }
  }

  removeDirectory(path) {
    if (!path) {
      this.println('rmdir: missing operand');
      return;
    }

    try {
      let dirPath = this.resolvePath(path);
      this.os.vfs.rmdir(dirPath);
    } catch (e) {
      this.println(e.message);
    }
  }

  removeFile(path, recursive = false) {
    if (!path) {
      this.println('rm: missing operand');
      return;
    }

    try {
      let filePath = this.resolvePath(path);
      this.os.vfs.deleteFile(filePath, recursive);
    } catch (e) {
      this.println(e.message);
    }
  }

  async touchFile(path) {
    if (!path) {
      this.println('touch: missing file operand');
      return;
    }

    try {
      let filePath = this.resolvePath(path);
      await this.os.vfs.touch(filePath);
    } catch (e) {
      this.println(`touch: ${e.message}`);
    }
  }

  async copyFile(source, dest) {
    if (!source || !dest) {
      this.println('cp: missing file operand');
      return;
    }

    try {
      let sourcePath = this.resolvePath(source);
      let destPath = this.resolvePath(dest);
      await this.os.vfs.copy(sourcePath, destPath);
    } catch (e) {
      this.println(e.message);
    }
  }

  async moveFile(source, dest) {
    if (!source || !dest) {
      this.println('mv: missing file operand');
      return;
    }

    try {
      let sourcePath = this.resolvePath(source);
      let destPath = this.resolvePath(dest);
      await this.os.vfs.move(sourcePath, destPath);
    } catch (e) {
      this.println(e.message);
    }
  }

  resolvePath(path) {
    if (path.startsWith('/')) {
      return path;
    }
    if (this.currentDir === '/') {
      return '/' + path;
    }
    return this.currentDir + '/' + path;
  }

  showTree(prefix = '', path = '/', isLast = true) {
    try {
      const dir = this.os.vfs.getDirectory(path);
      if (!dir) {
        this.println(`Error: Directory not found: ${path}`);
        return;
      }

      if (path === '/' && prefix === '') {
        this.println('/');
      }

      const children = Object.values(dir.children);
      children.forEach((child, index) => {
        const isLastChild = index === children.length - 1;
        const connector = isLastChild ? '└── ' : '├── ';
        const displayPath = path === '/' ? '/' + child.name : path + '/' + child.name;
        const icon = child.type === 'directory' ? '[D] ' : '[F] ';
        this.println(`${prefix}${connector}${icon}${child.name}`);

        if (child.type === 'directory') {
          const newPrefix = prefix + (isLastChild ? '    ' : '│   ');
          this.showTree(newPrefix, displayPath, isLastChild);
        }
      });
    } catch (e) {
      this.println(`Error: ${e.message}`);
    }
  }

  showSystemInfo() {
    this.println('JSOS - JavaScript Operating System');
    this.println('Version: 1.0 (Terminal Build)');
    this.println('Kernel: JSOS v1.0');
    this.println(`Architecture: ${navigator.platform}`);
    this.println(`Processor: JavaScript Engine`);
    const m = this.os.memory.getStats();
    this.println(`Available Memory: ${(m.free/1024/1024).toFixed(2)} MB / ${(m.total/1024/1024).toFixed(2)} MB`);
    
    const stats = this.os.processManager.getStats();
    this.println(`Running Processes: ${stats.running}`);
  }

  shutdown() {
    this.println('');
    this.println('Shutting down JSOS...');
    this.println('');
    setTimeout(() => {
      this.println('System halted.');
      this.input.disabled = true;
    }, 500);
  }

  displayBootSequence(bootSteps, delay = 150) {
    this.isReady = false;
    this.input.disabled = true;
    let stepIndex = 0;

    const displayStep = () => {
      if (stepIndex < bootSteps.length) {
        const step = bootSteps[stepIndex];
        this.println(step);
        stepIndex++;
        setTimeout(displayStep, delay);
      } else {
        this.println('');
        this.println('Boot sequence completed. Type "help" for commands.');
        this.isReady = true;
        this.input.disabled = false;
        this.input.focus();
      }
    };

    displayStep();
  }
  
  displayBootMessage(message) {
    this.println(message);
  }

  factoryReset() {
    this.println('WARNING: This will erase all files and settings!');
    this.println('Type "yes" to confirm or anything else to cancel:');
    
    this.confirmCallback = (response) => {
      const answer = response.trim().toLowerCase();
      this.println('> ' + answer);
      
      if (answer === 'yes') {
        this.println('Performing factory reset...');
        
        localStorage.removeItem('jsos_filesystem');
        localStorage.removeItem('jsos_bios_config');
        
        setTimeout(() => {
          this.println('Reset complete. Reloading...');
          setTimeout(() => location.reload(), 1000);
        }, 500);
      } else {
        this.println('Reset cancelled.');
      }
    };
  }
}

window.Terminal = Terminal;
