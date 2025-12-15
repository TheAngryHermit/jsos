// Virtual File System - POSIX-like file operations with IndexedDB persistence
class VirtualFileSystem {
  constructor() {
    this.driver = new IndexedDBDriver();
    this.root = {
      name: '/',
      type: 'directory',
      children: {},
      metadata: { created: Date.now(), modified: Date.now() },
    };
    this.currentPath = '/';
  }
  
  async init() {
    await this.driver.init();
    
    const saved = this.loadFromStorage();
    if (saved) {
      this.root = saved;
      return true;
    }
    
    this.mkdir('/bin');
    this.mkdir('/boot');
    this.mkdir('/dev');
    this.mkdir('/etc');
    this.mkdir('/home');
    this.mkdir('/home/user');
    this.mkdir('/home/user/documents');
    this.mkdir('/home/user/downloads');
    this.mkdir('/home/user/projects');
    this.mkdir('/lib');
    this.mkdir('/opt');
    this.mkdir('/root');
    this.mkdir('/sys');
    this.mkdir('/tmp');
    this.mkdir('/usr');
    this.mkdir('/usr/bin');
    this.mkdir('/usr/lib');
    this.mkdir('/usr/local');
    this.mkdir('/usr/local/bin');
    this.mkdir('/var');
    this.mkdir('/var/log');
    this.mkdir('/var/tmp');
    
    await this.writeFile('/etc/hostname', 'jsos-system', { owner: 'system' });
    await this.writeFile('/etc/os-release', 'NAME="JSOS"\nVERSION="1.0"\nID=jsos', { owner: 'system' });
    await this.writeFile('/etc/fstab', '# File Systems Table\n/dev/sda1 / ext4 defaults 0 0', { owner: 'system' });
    await this.writeFile('/etc/resolv.conf', 'nameserver 8.8.8.8\nnameserver 8.8.4.4', { owner: 'system' });
    
    await this.writeFile('/boot/grub.cfg', '# GRUB Configuration\ndefault=0\ntimeout=5', { owner: 'system' });
    
    await this.writeFile('/bin/ls', 'ls - list directory contents\nUsage: ls [OPTION]... [FILE]...\n\nList information about the FILEs (the current directory by default).', { owner: 'system' });
    await this.writeFile('/bin/cat', 'cat - concatenate files and print on the standard output\nUsage: cat [OPTION]... [FILE]...\n\nConcatenate FILE(s) to standard output.', { owner: 'system' });
    await this.writeFile('/bin/echo', 'echo - display a line of text\nUsage: echo [OPTION]... [STRING]...\n\nEcho the STRING(s) to standard output.', { owner: 'system' });
    await this.writeFile('/bin/pwd', 'pwd - print name of current/working directory\nUsage: pwd [OPTION]...\n\nPrint the full filename of the current working directory.', { owner: 'system' });
    await this.writeFile('/bin/mkdir', 'mkdir - make directories\nUsage: mkdir [OPTION]... DIRECTORY...\n\nCreate the DIRECTORY(ies), if they do not already exist.', { owner: 'system' });
    await this.writeFile('/bin/rm', 'rm - remove files or directories\nUsage: rm [OPTION]... [FILE]...\n\nRemove (unlink) the FILE(s).', { owner: 'system' });
    
    await this.writeFile('/usr/bin/python', 'python3 - interactive high-level object-oriented language (v3.9.0)\nPython is an interpreted, interactive, object-oriented programming language.', { owner: 'system' });
    await this.writeFile('/usr/bin/node', 'node - javascript runtime (v16.0.0)\nNode.js is a javascript runtime built on Chrome\'s V8 JavaScript engine.', { owner: 'system' });
    await this.writeFile('/usr/bin/git', 'git - the stupid content tracker (v2.30.0)\nGit is a free and open source distributed version control system.', { owner: 'system' });
    
    await this.writeFile('/var/log/system.log', '[System Boot Log]\n[00:00:00] JSOS v1.0 starting...\n[00:00:01] Memory Manager initialized\n[00:00:01] Process Scheduler started\n[00:00:02] Filesystem mounted\n[00:00:02] Terminal ready\n[00:00:02] Boot sequence completed successfully', { owner: 'system' });
    await this.writeFile('/var/log/kernel.log', '[Kernel Log]\n[BOOT] Linux kernel version 5.10.0 (JSOS build)\n[INIT] Initializing system\n[DRIVERS] Loading drivers...\n[DRIVERS] Audio driver loaded\n[DRIVERS] Display driver loaded\n[DRIVERS] Input driver loaded\n[OK] Boot process completed', { owner: 'system' });
    
    await this.writeFile('/home/user/readme.txt', 'Welcome to JSOS!\n\nThis is a JavaScript Operating System.\nNavigate the file tree and explore the system.', { owner: 'user' });
    await this.writeFile('/home/user/documents/notes.txt', 'System Notes\n- Boot time: 2.3s\n- Memory: 256MB\n- Processes: 15', { owner: 'user' });
    await this.writeFile('/home/user/projects/project.js', '// JSOS Project\nconsole.log("Hello from JSOS");', { owner: 'user' });
    
    await this.writeFile('/lib/kernel.so', '[Shared Library - kernel.so v1.0]', { owner: 'system' });
    await this.writeFile('/lib/libc.so', '[Shared Library - libc v6.3]', { owner: 'system' });
    
    this.saveToStorage();
    return true;
  }
  
  async writeFile(path, content, options = {}) {
    const { encoding = 'utf-8', owner = 'system' } = options;
    const dir = this.getDirectory(this.getDirPath(path));
    const filename = this.getFileName(path);
    
    if (!dir) throw new Error(`Directory not found: ${this.getDirPath(path)}`);
    
    const file = {
      name: filename,
      type: 'file',
      content,
      encoding,
      metadata: {
        created: Date.now(),
        modified: Date.now(),
        size: content.length,
        owner,
      },
    };
    
    dir.children[filename] = file;
    await this.driver.save(path, file);
    this.saveToStorage();
    
    return file;
  }
  
  async readFile(path) {
    const file = this.getFile(path);
    if (!file) throw new Error(`File not found: ${path}`);
    
    const cached = await this.driver.load(path);
    return cached || file;
  }
  
  mkdir(path) {
    if (this.exists(path)) {
      throw new Error(`mkdir: cannot create directory '${path}': File exists`);
    }
    
    const parentPath = this.getDirPath(path);
    const parent = this.getDirectory(parentPath);
    
    if (!parent) {
      throw new Error(`mkdir: cannot create directory '${path}': No such file or directory`);
    }
    
    const dir = {
      name: this.getFileName(path) || '/',
      type: 'directory',
      children: {},
      metadata: { created: Date.now(), modified: Date.now() },
    };
    
    parent.children[dir.name] = dir;
    this.saveToStorage();
    return dir;
  }

  rmdir(path) {
    const dir = this.getDirectory(path);
    if (!dir) {
      throw new Error(`rmdir: failed to remove '${path}': No such file or directory`);
    }
    if (Object.keys(dir.children).length > 0) {
      throw new Error(`rmdir: failed to remove '${path}': Directory not empty`);
    }
    return this.deleteFile(path);
  }

  async touch(path) {
    if (this.exists(path)) {
      const node = this.getNode(path);
      if (node && node.metadata) {
        node.metadata.modified = Date.now();
      }
      return node;
    } else {
      return await this.writeFile(path, '', { owner: 'user' });
    }
  }

  async copy(source, dest) {
    const sourceNode = this.getNode(source);
    if (!sourceNode) {
      throw new Error(`cp: cannot stat '${source}': No such file or directory`);
    }

    if (sourceNode.type === 'file') {
      const destDir = this.getDirectory(this.getDirPath(dest));
      if (!destDir) {
        throw new Error(`cp: cannot create '${dest}': No such file or directory`);
      }
      return await this.writeFile(dest, sourceNode.content || '', { owner: sourceNode.metadata?.owner || 'user' });
    } else {
      throw new Error(`cp: -r not specified; omitting directory '${source}'`);
    }
  }

  async move(source, dest) {
    await this.copy(source, dest);
    return this.deleteFile(source);
  }
  
  listDirectory(path) {
    const dir = this.getDirectory(path);
    if (!dir) throw new Error(`Directory not found: ${path}`);
    
    return Object.values(dir.children).map(item => ({
      name: item.name,
      type: item.type,
      size: item.metadata?.size || 0,
      modified: item.metadata?.modified || Date.now(),
    }));
  }
  
  deleteFile(path, recursive = false) {
    const node = this.getNode(path);
    if (!node) {
      throw new Error(`rm: cannot remove '${path}': No such file or directory`);
    }

    if (node.type === 'directory' && !recursive) {
      throw new Error(`rm: cannot remove '${path}': Is a directory`);
    }

    const dir = this.getDirectory(this.getDirPath(path));
    const filename = this.getFileName(path);
    
    if (dir && dir.children[filename]) {
      delete dir.children[filename];
      this.saveToStorage();
      return true;
    }
    return false;
  }
  
  exists(path) {
    return !!this.getNode(path);
  }
  
  getFile(path) {
    const node = this.getNode(path);
    return node?.type === 'file' ? node : null;
  }
  
  getDirectory(path) {
    const node = this.getNode(path);
    return node?.type === 'directory' ? node : null;
  }
  
  getNode(path) {
    const parts = path.split('/').filter(p => p);
    let current = this.root;
    
    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }
    
    return current;
  }
  
  getDirPath(path) {
    const lastSlash = path.lastIndexOf('/');
    return lastSlash === 0 ? '/' : path.substring(0, lastSlash);
  }
  
  getFileName(path) {
    const lastSlash = path.lastIndexOf('/');
    return path.substring(lastSlash + 1);
  }
  
  getStats() {
    const stats = { files: 0, directories: 0, totalSize: 0 };
    this.countNodes(this.root, stats);
    return stats;
  }
  
  countNodes(node, stats) {
    if (node.type === 'file') {
      stats.files++;
      stats.totalSize += node.metadata?.size || 0;
    } else if (node.type === 'directory') {
      stats.directories++;
      if (node.children) {
        Object.values(node.children).forEach(child => this.countNodes(child, stats));
      }
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('jsos_filesystem', JSON.stringify(this.root));
    } catch (e) {
      console.error('Failed to save filesystem:', e);
    }
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('jsos_filesystem');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load filesystem:', e);
    }
    return null;
  }

  reset() {
    localStorage.removeItem('jsos_filesystem');
    this.root = {
      name: '/',
      type: 'directory',
      children: {},
      metadata: { created: Date.now(), modified: Date.now() },
    };
  }
}


window.VirtualFileSystem = VirtualFileSystem;