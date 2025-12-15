# JSOS - JavaScript Operating System

A fully functional, browser-based operating system built entirely in vanilla JavaScript. Features a complete boot sequence with BIOS, virtual filesystem with persistent storage, Unix-like terminal, and real process/memory management.

**Live Demo:** Open `index.html` in any modern browser - no build process, no dependencies.

## 🎯 Features

### 🚀 Boot System
- **Complete Boot Sequence** - POST → BIOS → Bootloader → Kernel → Terminal
- **BIOS Setup Interface** - Press F2 during boot to access configuration
- **Hardware Detection** - Displays CPU, memory, browser capabilities
- **Real-Time POST Display** - Watch system initialization messages

### ⚙️ BIOS Configuration
Configure system settings that persist across sessions:
- **Boot Order** - Set device priority (IndexedDB, LocalStorage, Network)
- **Secure Boot** - Enable/disable bootloader verification
- **Virtualization** - Toggle VT-x support simulation
- **SATA Mode** - Select AHCI, IDE, or RAID mode
- **BIOS Entry Key** - Choose F2, Del, F10, or F12
- **Key Delay** - Adjust boot prompt window (500ms-3000ms)
- **Real-Time Clock** - Live date/time display updating every second

**Navigation:** Arrow keys to move, Enter to toggle, F10 to save, Esc to cancel

### 💾 Virtual File System
Complete Unix-like filesystem with real file operations:

**File Operations:**
- `mkdir <dir>` - Create directories
- `rmdir <dir>` - Remove empty directories
- `touch <file>` - Create files or update timestamps
- `cp <source> <dest>` - Copy files
- `mv <source> <dest>` - Move/rename files
- `rm <file>` - Delete files (use `-r` flag for directories)
- `cat <file>` - Display file contents

**Navigation:**
- `cd <path>` - Change directory (supports `.` and `..`)
- `pwd` - Print current working directory
- `ls [path]` - List directory contents with file details
- `tree` - Display entire file tree structure

**Filesystem Structure:**
```
/
├── bin/          # System binaries
├── boot/         # Boot configuration files
├── dev/          # Device files (null, zero, random)
├── etc/          # System configuration
│   ├── hostname  # System hostname
│   ├── hosts     # Host name mappings
│   └── passwd    # User account information
├── home/         # User home directories
│   └── user/     # Default user home
├── lib/          # Shared system libraries
├── tmp/          # Temporary files
├── usr/          # User programs and data
│   ├── bin/      # User binaries
│   ├── lib/      # User libraries
│   └── share/    # Shared user data
└── var/          # Variable data
    ├── log/      # System logs
    └── www/      # Web server files
```

### 📁 Data Persistence
All files and settings automatically saved across browser sessions using localStorage:
- **Filesystem Storage** - Complete directory tree serialized and restored
- **BIOS Config Storage** - All settings persistent
- **Storage Key** `jsos_filesystem` - File tree data
- **Storage Key** `jsos_bios_config` - BIOS configuration
- **Capacity** - ~5-10MB depending on browser (supports thousands of files)

**Reset Data:**
```bash
reset
# Confirm with: yes
# System clears all files and BIOS settings, reloads from defaults
```

### 🖥️ Terminal Interface
CRT-styled command-line interface with all standard features:

**Terminal Features:**
- Command history (arrow keys up/down)
- Clear text history (clear/cls)
- Real-time prompt display
- Green-on-black retro aesthetic
- Persistent input across commands
- Full command line editing

**System Commands:**
- `help` - Display all available commands
- `clear` / `cls` - Clear screen
- `memory` - Show memory allocation statistics
- `ps` - List all running processes
- `uname` - Display system information
- `whoami` - Show current user
- `echo <text>` - Print text to terminal
- `shutdown` - Power off system

### ⚡ Process Management
Fully functional process scheduler:
- Multiple concurrent processes
- Process scheduling and lifecycle
- Process state tracking
- PID assignment and management
- Process listing with states

### 🧠 Memory Management
Virtual memory system with allocation tracking:
- Block-based memory allocation
- Memory usage statistics
- Free/used/total memory display
- Memory allocation tracking by process

### 🔌 Driver System
Hardware abstraction layer with modular drivers:
- **Display Driver** - Terminal and UI rendering
- **Input Driver** - Keyboard and mouse event handling
- **Audio Driver** - Sound system interface

## 🎮 How to Use

### Quick Start
1. **Open** `index.html` in your browser
2. **Watch** the boot sequence complete
3. **Press F2** (optional) to configure BIOS
4. **Type** `help` in terminal for command list

### Example Commands
```bash
# Navigate filesystem
cd /home/user
pwd
ls -la

# Create files
mkdir projects
touch projects/myfile.txt
cat projects/myfile.txt

# Copy and move
cp projects/myfile.txt projects/backup.txt
mv projects/backup.txt /tmp/

# System info
memory
ps
uname
whoami

# Control
shutdown
reset
```

### BIOS Configuration Example
1. Hard refresh browser or reopen page
2. Wait for JSOS startup message
3. Press **F2** within 1.5 seconds
4. Use arrow keys to navigate BIOS menu
5. Press Enter to toggle options
6. Press F10 to save changes
7. System restarts with new config

## 🏗️ Architecture

### System Layers
```
┌──────────────────────────────────┐
│     Terminal (UI Interface)      │
├──────────────────────────────────┤
│  VFS   │  Kernel  │  Drivers     │
│ Files  │ Memory   │ Display      │
│ Dirs   │ Process  │ Audio        │
│ Persist│ Schedule │ Input        │
├──────────────────────────────────┤
│    BIOS   │  Bootloader          │
└──────────────────────────────────┘
```

### Core Modules

**Kernel** (`core/kernel/`)
- `bootstrap.js` - Kernel initialization and startup
- `events.js` - System event management
- `memory.js` - Virtual memory allocation
- `process.js` - Process management structures
- `scheduler.js` - CPU scheduling for processes

**Firmware** (`core/firmware/`)
- `bios.js` - BIOS with configuration and setup screen
- `bootloader.js` - Boot sequence orchestration

**Filesystem** (`core/filesystem/`)
- `vfs.js` - Virtual file system with Unix semantics
- `indexeddb-driver.js` - IndexedDB storage backend

**Hardware** (`core/hardware/`)
- `detection.js` - Hardware capability detection

**Drivers** (`core/drivers/`)
- `display.js` - Display and rendering
- `audio.js` - Audio system
- `input.js` - Input handling

**UI** (`ui/`)
- `terminal.js` - Terminal interface and command execution
- `desktop.js` - Desktop environment
- `components/start-menu.js` - UI components

**Boot Manager** (`core/boot-manager.js`)
- Orchestrates entire boot sequence
- Manages BIOS integration
- Handles system initialization

## 🌐 Browser Compatibility

**Tested & Supported:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES6+ support

**Requirements:**
- ES6+ JavaScript support
- LocalStorage API (for persistence)
- IndexedDB API (for file storage)

## 📊 Performance

- **Load Time:** Instant (no build process)
- **Memory:** Minimal footprint (~2-3MB)
- **File Operations:** Synchronous with persistence
- **Boot Sequence:** ~3-5 seconds

## 🎓 Educational Value

This project demonstrates:
- Operating system fundamentals (boot, kernel, drivers)
- Virtual file systems and persistence
- Process scheduling and management
- Memory management concepts
- BIOS/firmware concepts
- Command-line interface design
- JavaScript event systems and closures
- Browser storage APIs (localStorage, IndexedDB)

## 🚀 Extensibility

Easy to add new features:

**New Terminal Commands:**
```javascript
// Add to Terminal.executeCommand()
case 'mycommand':
  this.myCommand(args);
  break;
```

**New File Operations:**
```javascript
// Add methods to VirtualFileSystem class
myOperation(path) {
  // Implementation
  this.saveToStorage(); // Persist changes
}
```

**New BIOS Options:**
```javascript
// Add to BIOS config object and menu
{
  name: 'My Setting',
  value: 'value',
  tooltip: 'Description'
}
```

## 💡 Technical Stack

- **Language:** Vanilla JavaScript (ES6+)
- **Build:** None (pure browser execution)
- **Storage:** localStorage + IndexedDB
- **Architecture:** Modular, event-driven
- **UI:** HTML5 + CSS3

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Found a bug? Have an idea? Contributions welcome!

## 🎉 Credits

Built entirely in vanilla JavaScript with no external dependencies. Inspired by Unix/Linux operating systems and classic BIOS interfaces.

---

**Note:** JSOS is an educational project simulating OS concepts in the browser. It provides no actual hardware access or kernel-level operations - it's all JavaScript running in your browser!
