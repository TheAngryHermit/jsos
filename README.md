# JSOS

JSOS is a browser‑based operating system implemented in vanilla JavaScript. It includes a BIOS setup screen, a virtual filesystem with persistence, a Unix‑style terminal, and basic process and memory management — all running entirely in the browser with no build step or external dependencies.

Read the full documentation in the Wiki: https://github.com/TheAngryHermit/jsos/wiki

## Overview

JSOS boots through a POST→BIOS→Bootloader→Kernel sequence and drops you into a terminal. Files you create and settings you change are saved automatically and restored on the next visit.

## Key Features

- BIOS setup with configurable boot order, secure boot, virtualization, and SATA mode (press F2 during boot)
- Persistent virtual filesystem with standard operations (mkdir, rm, cp, mv, cat, tree)
- Terminal with command history, navigation (`cd`, `pwd`, `ls`), and helpful system commands
- Process scheduler and memory subsystem with simple usage reporting
- Zero setup: open `index.html` in a modern browser and start using it

## Getting Started

1. Open `index.html` in your browser.
2. Watch the boot sequence complete.
3. (Optional) Press F2 during boot to open BIOS Setup and change settings.
4. At the terminal prompt, type `help` to see available commands.

## Usage Highlights

Files and directories:
```bash
mkdir projects
touch projects/notes.txt
cat projects/notes.txt
cp projects/notes.txt /tmp/backup.txt
mv /tmp/backup.txt /home/
rm /home/backup.txt
tree
```

Navigation and system info:
```bash
cd /home
pwd
ls
memory
ps
uname
```

Persistence and reset:
```bash
reset   # type "yes" to confirm; restores defaults
```

## Persistence

JSOS stores the entire filesystem and BIOS settings in the browser using LocalStorage. Your data is restored automatically on reload. Storage limits vary by browser (typically 5–10MB).

## Compatibility

Works on current versions of Chrome/Edge, Firefox, and Safari. Requires ES6 features and access to LocalStorage and IndexedDB.

## Learn More

The Wiki covers details, including:
- Terminal command reference
- BIOS configuration guide
- Filesystem layout
- Architecture overview
- Extending JSOS

---

Built with vanilla JavaScript for clarity and approachability. Open `index.html` and explore.
