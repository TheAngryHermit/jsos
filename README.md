# JSOS

A real operating system built in JavaScript that runs in your browser.

Boot it up. Use it. Create files. Configure BIOS. It all persists.

**[→ Full Documentation in Wiki](https://github.com/TheAngryHermit/jsos/wiki)**

## What You Get

- **Actual BIOS** - Press F2 to configure boot order, secure boot, virtualization, SATA mode. Changes stick.
- **Real File System** - mkdir, rm, cp, mv, cat. Your files don't disappear when you refresh.
- **Unix Terminal** - Full command line. History. Navigation. Just like a real OS.
- **Process Scheduler** - Multiple processes running. Memory management. Real scheduling.
- **Persistent Storage** - Everything saves to localStorage. Close the tab, come back later, it's all there.

## Start Here

```
1. Open index.html
2. Watch it boot
3. Press F2 for BIOS (optional)
4. Type help
```

That's it. No build step. No dependencies. Just open it.

## Quick Commands

```bash
# Files
mkdir projects
touch projects/idea.txt
cat projects/idea.txt
cp projects/idea.txt /tmp/backup.txt
mv /tmp/backup.txt /home/

# Navigation
cd /home
pwd
ls
tree

# System
memory
ps
uname

# Reset everything
reset
```

## Why This Works

Pure vanilla JavaScript. No webpack, no npm, no bullshit. Just classes and events. The whole OS loads in seconds.

It's not pretending to be an OS. It has a real boot sequence. Real BIOS settings that actually change behavior. Real file operations that persist. Real process scheduling.

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+. Anything with ES6 and localStorage.

## More Details

See the **[Wiki](https://github.com/TheAngryHermit/jsos/wiki)** for:
- Complete terminal command reference
- BIOS configuration guide
- Filesystem structure
- Architecture breakdown
- How to extend it

## Made In

Vanilla JavaScript. No frameworks. No build process. That's the point.
