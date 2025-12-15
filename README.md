# JSOS

JSOS is a browser‑based operating system implemented in vanilla JavaScript. It includes a BIOS setup screen, a virtual filesystem with persistence, a Unix‑style terminal, and basic process and memory management — all running entirely in the browser with no build step or external dependencies.

Read the full documentation in the Wiki: https://github.com/TheAngryHermit/jsos/wiki

## Overview

JSOS boots through a POST→BIOS→Bootloader→Kernel sequence and drops you into a terminal. Files you create and settings you change are saved automatically and restored on the next visit.

## Key Features

- BIOS setup with configurable boot order, secure boot, virtualization, and SATA mode (press F2 during boot)
- Persistent virtual filesystem with standard operations
- Terminal with command history, navigation, and system utilities
- Process scheduler and memory subsystem with usage reporting
- Open `index.html` in a modern browser to run JSOS

## Getting Started

1. Open `index.html` in your browser.
2. Watch the boot sequence complete.
3. (Optional) Press F2 during boot to open BIOS Setup and change settings.
4. See the Wiki for terminal usage and command reference.

## Usage

Refer to the Wiki for examples of navigation, file operations, and system controls.

## Persistence

JSOS stores the filesystem and BIOS settings in the browser using LocalStorage. Data is restored automatically on reload. Storage limits vary by browser (typically 5–10MB).

## Compatibility

Tested on current versions of Chrome/Edge, Firefox, and Safari. Requires ES6 features and access to LocalStorage and IndexedDB.

## Learn More

See the Wiki for:
- Terminal command reference
- BIOS configuration guide
- Filesystem layout
- Architecture overview
- Extending JSOS

---

Built with vanilla JavaScript. Open `index.html` to run.
