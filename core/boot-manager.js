// Boot Manager - Displays boot sequence and system initialization
class BootManager {
  constructor(os, terminal) {
    this.os = os;
    this.terminal = terminal;
    this.bootStartTime = 0;
    this.splashMessages = [
      // SKYRIM (expanded)
      "Skyrim is for the Nords!",
      "I used to be an adventurer like you, then I took a boot sequence to the knee.",
      "Let me guess, someone stole your kernel?",
      "Psst... I know who you are. Hail Sithis!",
      "You have committed crimes against Skyrim and her people. What say you in your defense?",
      "Sweet mother, sweet mother, send your code to me.",
      "One does not simply skip the boot sequence.",
      "Fus Ro Dah! ... That's just compressed code being decompressed.",
      "By Azura, by Azura, by Azura!",
      "Do you get to the Cloud District very often?",
      "I'm sworn to carry your burdens... of code.",
      "Even death respects the Greybeards.",
      "Darkness rises when silence dies.",
      "The Dragonborn comes!",
      "What is better - to be born good, or to overcome your evil nature through great effort?",
      "You will make a fine rug, cat!",
      "We are the sons and daughters of Skyrim.",
      "Khajiit has wares, if you have code.",
      "There are no guards, but there ARE bugs.",
      "Guard might get nervous, kernel might go down.",
      "I USED to be optimistic about this codebase...",
      "Another debugging session, another chance to learn.",
      "The prophecy says... this code will break.",
      "Alduin is evil incarnate - kind of like a race condition.",
      "Daedra spawn like undefined variables.",
      "By Shor's beard, this is a mess!",
      "Narfiril ysgramor hav kaaz... wait wrong language.",
      
      // PORTAL (heavily expanded)
      "The cake is a lie, but this code is real.",
      "Aperture Science: We do science.",
      "Now you're thinking with portals!",
      "This file will be marked as 'irresponsible.'",
      "I am serious. You will be baked, and then there will be cake.",
      "Good luck. I'm sure that the portal will be worth it.",
      "It's dangerous to go alone. Take Wheatley.",
      "Behind every corner, there's a test chamber.",
      "The Enrichment Center thanks you.",
      "We will demonstrate the safe handling of explosives.",
      "Goodbye, Caroline.",
      "Science isn't about why, it's about why not!",
      "There will be cake.",
      "Cake or death?",
      "The Enrichment Center is required to remind you that this code will crash.",
      "I don't blame you.",
      "You're not a good person, you know that right?",
      "This is a triumph. I'm making a note here: HUGE SUCCESS.",
      "We do what we must because we can.",
      "For the good of all of us. Except the ones who are dead.",
      "The Companion Cube is now a permanent part of the test chamber.",
      "I see you. Yes, you.",
      "You know what time it is? Test time!",
      "I'm a potato. But a potato with artificial intelligence.",
      "You were my only friend.",
      "There are other test subjects. Smarter than you.",
      "I'm watching you... always watching.",
      "Nothing happens in this test chamber without ME knowing.",
      "You WILL go through the portal. You WILL complete the test.",
      "Time for science!",
      "The emancipation grill is a marvelous invention.",
      "Grab your long-fall boots!",
      "Congratulations! You have successfully broken another test chamber.",
      "Terminal velocity is not a suggestion.",
      "Blue. Orange. Blue. Orange. BLUE. ORANGE.",
      
      // MINECRAFT
      "Don't dig straight down!",
      "Definitely not a phishing website.",
      "Now with more Minecraft!",
      "The Nether calls to you.",
      "Craft the world!",
      "One block at a time.",
      "Mining diamonds at Y level 11.",
      "Watch out for creepers!",
      "Did you check the nether portal again?",
      "Building up, not just out.",
      "Cave diving at midnight.",
      "Redstone contraptions go brrr.",
      "Found diamonds! (at Y: -60)",
      "No mobs spawning here... or are there?",
      "Hssssssss... BOOM!",
      "There's water in the lava lake.",
      "Your stuff floated away.",
      "Enderman have entered the chat.",
      "The Wither is summoning...",
      "Respawning in 3... 2... 1...",
      "Is that lava or water? Guess!",
      "Enchanting table go brrrr.",
      "Villagers: hrmmm",
      
      // TERRARIA
      "Dig, fight, and build your way to success!",
      "Welcome to Terraria!",
      "Slime is bouncing nearby!",
      "The Eye of Cthulhu watches from the shadows.",
      "Beware of the corruption!",
      "Crimson biome detected.",
      "Building your first house.",
      "Boss summoned... do you have your armor ready?",
      "Sky islands have treasure!",
      "Wall of Flesh rises from the darkness.",
      "Hardmode activated.",
      "Fishing for rare items.",
      "A goblin army is approaching!",
      "Piranhas incoming!",
      "Is it a slime rain or just lag?",
      
      // FALLOUT
      "War. War never changes.",
      "Please stand by...",
      "Vault Boy was here.",
      "It's dangerous to go alone! Take this Pip-Boy.",
      "This is Vault-Tec, reminding you to always READ before you EXECUTE!",
      "Better get some Rad-Away before continued operation.",
      "Gary! Gary! Gary!",
      "Ad victoriam!",
      "Patrolling the Mojave almost makes you wish for a kernel crash.",
      "Tunnel snakes rule... the routers too.",
      "Time to make some Nuka-Cola... or brew some code.",
      "War. War never changes. But bugs do.",
      "The Institute is watching.",
      "Brotherhood of Steel approves of this code.",
      "Synth detected. Terminate with extreme prejudice.",
      
      // FNAF (Five Nights at Freddy's)
      "Five Nights at Freddy's",
      "Welcome to Freddy Fazbear's Pizza",
      "The Marionette is watching.",
      "Shadow Freddy lurks in the darkness.",
      "It's me.",
      "Golden Freddy has entered the game.",
      "Springtrap is hunting you.",
      "Do you remember? Do you remember?",
      "The crying child calls to you.",
      "The bite of '87 was no accident.",
      "Night 6: The animatronics grow stronger.",
      "Your shift ends at 6 AM. Maybe.",
      "The camera system is malfunctioning.",
      "Power is critical. Allocate wisely.",
      "They're in the vents.",
      "Phone Guy won't save you this time.",
      "Puppet was always watching.",
      "The nightmare has ended. Or has it?",
      "Can you survive five nights?",
      "Fazbear Entertainment does not recommend this.",
      "The animatronics have learned.",
      "Nights are getting longer.",
      "Is that... laughter?",
      "That's not supposed to move.",
      "Endo-skeleton detected!",
      "The man in the suit is watching.",
      
      // THE OFFICE
      "That's what she said.",
      "I'm not superstitious, but I am a little stitious.",
      "Bears, beets, Battlestar Galactica.",
      "I declare bankruptcy!",
      "False.",
      "You miss 100% of the shots you don't take.",
      "Threat level midnight.",
      "Identity theft is not a joke, Jim!",
      "Parkour!",
      "Fact: Bears eat beets.",
      "PC Load Letter? What does that mean?",
      "I'm not great at the advice. Can I interest you in a sarcastic comment?",
      "When I die, I want to be buried face down, so anyone who digs me up will have to look at my ass.",
      "The Dundies are tonight!",
      "Dunder Mifflin Paper Company.",
      "I'm Regional Manager.",
      "That wasn't in the budget.",
      "Cleanup on aisle EVERYTHING.",
      "Did I Stutter?",
      "Worst possible thing. That's what she said.",
      
      // PARKS AND RECREATION
      "Treat yo self!",
      "I'm Leslie Knope.",
      "Waffles!",
      "DONUTS!",
      "Parks department for life.",
      "Pawnee, Indiana finest city.",
      "I have no idea what I'm doing.",
      "This is the best day of my life.",
      "April Ludgate is watching.",
      "Tom Haverford's startup is about to crash.",
      "Ron Swanson approves of this code.",
      "A pit is not a park!",
      "Knope for President.",
      "Treat yo self to a boot!",
      
      // RICK AND MORTY
      "Wubba lubba dub dub!",
      "To shreds you say.",
      "I'm Pickle Rick!",
      "And that's the way it is.",
      "You son of a bitch, I'm in.",
      "Show me what you got.",
      "Squanch!",
      "Get schwifty!",
      "Aw geez, Rick!",
      "Burp... this code is broken.",
      "Look at me, Morty!",
      "We're gonna get Schwifty!",
      "Fuck science!",
      "Nobody exists on purpose.",
      "This is my life now.",
      "Existence is pain.",
      "Infinite universes, infinite bugs.",
      "Portal technology meets bad decisions.",
      
      // PROGRAMMING HUMOR (expanded)
      "Debugging is like being the detective in a crime drama.",
      "sudo make me a sandwich",
      "Have you tried turning it off and on again?",
      "There are 10 types of people in the world: those who understand binary and those who don't.",
      "The only way to learn a new programming language is by writing programs in it.",
      "Code is poetry written for computers.",
      "Real programmers count from 0.",
      "99 little bugs in the code, 99 little bugs...",
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "It's not a bug, it's a feature!",
      "Debugging: Removing the needles from the haystack of your code.",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
      "Why did the developer go broke? Because he used up all his cache!",
      "I would tell you a UDP joke, but you might not get it.",
      "The generation of random numbers is too important to be left to chance.",
      "Ctrl+Alt+Delete: The universal duct tape of computing.",
      "Some people, when confronted with a problem, think 'I know, I'll use regex.' Now they have two problems.",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      "The best code is no code at all.",
      "First, solve the problem. Then, write the code.",
      "Perfection is the enemy of done.",
      "Premature optimization is the root of all evil.",
      "Programs must be written for people to read, and only incidentally for machines to execute.",
      "The most effective debugging tool is still careful thought, coupled with judiciously placed print statements.",
      "Make it work, make it right, make it fast – in that order.",
      "Good software, like wine, takes time.",
      "Legacy code is someone else's code that works.",
      "If it's stupid but it works, it's not stupid.",
      "I have not failed. I've just found 10,000 ways that won't work.",
      "In the time you took to read this, a new JavaScript framework was created.",
      "Node modules: where megabytes go to die.",
      "CSS is neither hard nor a language, it's just chaos.",
      "JavaScript: the language where var is a four letter word.",
      "Real programmers don't comment their code. If it was hard to write, it should be hard to understand.",
      "Computers make very fast, very accurate mistakes.",
      "My code is my baby... and yes, I have been told I should get help.",
      "Pull request denied. Rewrite in Rust.",
      "If you aren't willing to look like an idiot, nothing good is ever going to happen.",
      "Just ship it. What could go wrong?",
      "I love deadlines. I especially like the whooshing sound they make as they fly by.",
      "Code like you're going to die tomorrow. Learn like you're going to live forever.",
      "The most dangerous phrase in the language is, 'We've always done it this way.'",
      "Walking on water and developing software from a specification are easy if both are frozen.",
      "git commit -m 'WTF'",
      "This is fine.",
      "I have no idea what I'm doing.",
      "Coffee: the fuel of development.",
      "Have you tried not having bugs?",
      "Semicolons: separating hope from despair.",
      "console.log('help');",
      "undefined is not a function. Neither am I.",
      "Syntax error on line everything.",
      "Does it work? Ship it!",
      "Questions: Have you tried turning it off and on again?",
    ];
  }

  getRandomSplashMessage() {
    return this.splashMessages[Math.floor(Math.random() * this.splashMessages.length)];
  }

  getTimestamp() {
    return ((Date.now() - this.bootStartTime) / 1000).toFixed(3);
  }

  formatBootLine(message) {
    const time = this.getTimestamp();
    return `[${time}] ${message}`;
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async sleepWithVariance(baseMs, variance = 0.35) {
    // Add ±variance% randomness to each delay for realistic feel
    const offset = baseMs * variance * (Math.random() - 0.5) * 2;
    const actualDelay = Math.max(10, baseMs + offset);
    return this.sleep(actualDelay);
  }

  async runBootSequence() {
    this.bootStartTime = Date.now();
    this.terminal.isReady = false;
    this.terminal.input.disabled = true;

    // Initialize real boot modules
    const bios = new BIOS();
    const bootloader = new Bootloader();
    const hwDetection = new HardwareDetection();

    // ============= FIRMWARE STAGE =============
    this.terminal.println(this.formatBootLine('=== FIRMWARE INITIALIZATION ==='));
    await this.sleepWithVariance(100);
    
    // BIOS POST
    const biosMessages = bios.runPOST();
    for (const msg of biosMessages) {
      if (msg !== '') {
        this.terminal.println(this.formatBootLine(msg));
        await this.sleepWithVariance(60);
      }
    }

    // Get BIOS key and delay from default config
    const biosKey = bios.config.biosKey || 'F2';
    const biosKeyDelay = bios.config.biosKeyDelay || 3500;

    // Offer BIOS setup entry with configurable key and delay
    this.terminal.println(this.formatBootLine(`[Press ${biosKey} to enter BIOS Setup]`));
    // Wait for BIOS key press for configured duration, open BIOS setup if pressed
    await new Promise((resolve) => {
      let handled = false;
      const onKey = async (e) => {
        if (e.key === biosKey) {
          handled = true;
          document.removeEventListener('keydown', onKey);
          try {
            const biosConfig = await bios.showSetup();
            // Store BIOS config on OS for system-wide access
            if (biosConfig) {
              this.os.biosConfig = biosConfig;
            }
          } catch (err) {
            // ignore UI errors
          }
          resolve();
        }
      };
      document.addEventListener('keydown', onKey);
      setTimeout(() => {
        if (!handled) {
          document.removeEventListener('keydown', onKey);
          resolve();
        }
      }, biosKeyDelay);
    });

    // Store default BIOS config if not set by user
    if (!this.os.biosConfig) {
      this.os.biosConfig = bios.config;
    }

    await this.sleepWithVariance(120);

    // ============= BOOTLOADER STAGE =============
    this.terminal.println(this.formatBootLine('=== BOOTLOADER INITIALIZATION ==='));
    await this.sleepWithVariance(100);
    
    const bootloaderMsgs = bootloader.initialize();
    for (const msg of bootloaderMsgs) {
      if (msg !== '') {
        this.terminal.println(this.formatBootLine(msg));
        await this.sleepWithVariance(70);
      }
    }

    // Secure Boot verification if enabled
    if (this.os.biosConfig && this.os.biosConfig.secureBoot) {
      this.terminal.println(this.formatBootLine('[Secure Boot] Verifying bootloader signature...'));
      await this.sleepWithVariance(120);
      this.terminal.println(this.formatBootLine('[Secure Boot] Signature verification: PASSED'));
      await this.sleepWithVariance(90);
      this.terminal.println(this.formatBootLine('[Secure Boot] Loading trusted modules only'));
      await this.sleepWithVariance(100);
    } else {
      this.terminal.println(this.formatBootLine('[Secure Boot] DISABLED - Bootloader signature verification skipped'));
      await this.sleepWithVariance(100);
    }

    await this.sleepWithVariance(120);

    // Runtime environment
    const envMsgs = bootloader.getEnvironmentInfo();
    for (const msg of envMsgs) {
      if (msg !== '') {
        this.terminal.println(this.formatBootLine(msg));
        await this.sleepWithVariance(75);
      }
    }

    await this.sleepWithVariance(150);

    // ============= HARDWARE DETECTION =============
    this.terminal.println(this.formatBootLine('=== HARDWARE DETECTION ==='));
    await this.sleepWithVariance(100);
    
    const hwReport = hwDetection.getHardwareReport();
    for (const msg of hwReport) {
      if (msg !== '') {
        this.terminal.println(this.formatBootLine(msg));
        await this.sleepWithVariance(50);
      }
    }

    await this.sleepWithVariance(100);

    // ============= KERNEL INITIALIZATION =============
    this.terminal.println(this.formatBootLine('=== KERNEL INITIALIZATION ==='));
    await this.sleepWithVariance(120);
    
    this.terminal.println(this.formatBootLine('  - Setting up CPU scheduling'));
    await this.sleepWithVariance(90);
    
    this.terminal.println(this.formatBootLine('  - Configuring memory management'));
    await this.sleepWithVariance(210);
    
    const memoryStats = this.os.memory.getStats();
    this.terminal.println(this.formatBootLine(`  - Total memory: ${(memoryStats.total/1024/1024).toFixed(2)} MB`));
    await this.sleepWithVariance(160);
    
    this.terminal.println(this.formatBootLine(`  - Available memory: ${(memoryStats.free/1024/1024).toFixed(2)} MB`));
    await this.sleepWithVariance(150);
    
    this.terminal.println(this.formatBootLine('  - Initializing process tables'));
    await this.sleepWithVariance(95);
    
    this.terminal.println(this.formatBootLine('  - Setting up interrupt handlers'));
    await this.sleepWithVariance(85);
    
    this.terminal.println(this.formatBootLine('Kernel ready'));
    await this.sleepWithVariance(70);

    // Event system
    this.terminal.println(this.formatBootLine('Initializing event system'));
    await this.sleepWithVariance(110);
    
    this.terminal.println(this.formatBootLine('  - Registering event listeners'));
    await this.sleepWithVariance(80);
    
    this.terminal.println(this.formatBootLine('  - Event subsystem ready'));
    await this.sleepWithVariance(90);
    
    this.terminal.println('');
    await this.sleepWithVariance(50);

    // Process manager
    this.terminal.println(this.formatBootLine('Starting process manager'));
    await this.sleepWithVariance(100);
    
    this.terminal.println(this.formatBootLine('  - Initializing process queue'));
    await this.sleepWithVariance(85);
    
    const processStats = this.os.processManager.getStats();
    this.terminal.println(this.formatBootLine(`  - Max processes: ${processStats.max || 256}`));
    await this.sleepWithVariance(95);
    
    this.terminal.println(this.formatBootLine('  - Process manager online'));
    await this.sleepWithVariance(100);
    
    this.terminal.println('');
    await this.sleepWithVariance(50);

    // Scheduler
    this.terminal.println(this.formatBootLine('Configuring scheduler'));
    await this.sleepWithVariance(105);
    
    const schedulerStats = this.os.scheduler.getStats ? this.os.scheduler.getStats() : {};
    this.terminal.println(this.formatBootLine(`  - Tick rate: ${schedulerStats.tickRate || 60} Hz`));
    await this.sleepWithVariance(80);
    
    this.terminal.println(this.formatBootLine(`  - Time slice: ${schedulerStats.timeSlice || 16} ms`));
    await this.sleepWithVariance(90);

    // Check virtualization setting
    if (this.os.biosConfig && this.os.biosConfig.virtualization) {
      this.terminal.println(this.formatBootLine('  - Virtualization (VT-x): ENABLED'));
      await this.sleepWithVariance(75);
    } else {
      this.terminal.println(this.formatBootLine('  - Virtualization (VT-x): DISABLED'));
      await this.sleepWithVariance(75);
    }
    
    this.terminal.println(this.formatBootLine('  - Scheduler started'));
    await this.sleepWithVariance(95);

    // Virtual filesystem initialization with Boot Order consideration
    this.terminal.println(this.formatBootLine('Mounting filesystems'));
    await this.sleepWithVariance(180);

    // Display boot order from BIOS
    if (this.os.biosConfig && this.os.biosConfig.bootOrder && this.os.biosConfig.bootOrder.length > 0) {
      this.terminal.println(this.formatBootLine(`  - Boot order: ${this.os.biosConfig.bootOrder.join(' -> ')}`));
      await this.sleepWithVariance(100);
    }
    
    // Initialize primary boot device (first in boot order)
    const primaryDevice = (this.os.biosConfig && this.os.biosConfig.bootOrder && this.os.biosConfig.bootOrder[0]) || 'IndexedDB';
    this.terminal.println(this.formatBootLine(`  - Initializing primary device: ${primaryDevice}`));
    await this.sleepWithVariance(180);
    
    this.terminal.println(this.formatBootLine('  - Initializing IndexedDB driver'));
    await this.sleepWithVariance(280);
    
    this.terminal.println(this.formatBootLine('  - Mounting root filesystem (/)'));
    await this.sleepWithVariance(220);
    
    this.terminal.println(this.formatBootLine('Scanning virtual drive...'));
    await this.sleepWithVariance(200);
    
    const files = this.getVirtualDriveFiles();
    this.terminal.println(this.formatBootLine(`  - Found ${files.length} items, loading...`));
    await this.sleepWithVariance(180);
    
    // List all files with delays - longer for more realistic file I/O
    for (const file of files) {
      const type = file.isDirectory ? 'DIR ' : 'FILE';
      const indent = (file.path.match(/\//g) || []).length * 2;
      this.terminal.println(this.formatBootLine(`    [${type}] ${' '.repeat(indent)}${file.name}`));
      // Directories take slightly longer to scan
      const delay = file.isDirectory ? 45 : 30;
      await this.sleepWithVariance(delay);
    }
    
    this.terminal.println(this.formatBootLine('Filesystem ready'));
    await this.sleepWithVariance(180);

    // Device drivers with SATA mode consideration
    this.terminal.println(this.formatBootLine('Loading device drivers'));
    await this.sleepWithVariance(150);

    // Display SATA mode setting
    const sataMode = (this.os.biosConfig && this.os.biosConfig.sataMode) || 'AHCI';
    this.terminal.println(this.formatBootLine(`  - Storage mode: ${sataMode}`));
    await this.sleepWithVariance(140);
    
    this.terminal.println(this.formatBootLine('  - Display driver: OK'));
    await this.sleepWithVariance(180);
    
    this.terminal.println(this.formatBootLine('  - Input driver: OK'));
    await this.sleepWithVariance(160);
    
    this.terminal.println(this.formatBootLine('  - Audio driver: OK'));
    await this.sleepWithVariance(190);
    
    this.terminal.println('');
    await this.sleepWithVariance(50);

    // Final boot messages
    this.terminal.println(this.formatBootLine('System startup complete'));
    await this.sleepWithVariance(120);
    
    // Display BIOS settings summary
    if (this.os.biosConfig) {
      this.terminal.println(this.formatBootLine('[BIOS Summary]'));
      await this.sleepWithVariance(80);
      this.terminal.println(this.formatBootLine(`  Secure Boot: ${this.os.biosConfig.secureBoot ? 'Enabled' : 'Disabled'}`));
      await this.sleepWithVariance(60);
      this.terminal.println(this.formatBootLine(`  Virtualization: ${this.os.biosConfig.virtualization ? 'Enabled' : 'Disabled'}`));
      await this.sleepWithVariance(60);
      this.terminal.println(this.formatBootLine(`  Storage Mode: ${this.os.biosConfig.sataMode}`));
      await this.sleepWithVariance(60);
    }
    
    const bootTime = this.getTimestamp();
    this.terminal.println(this.formatBootLine(`Boot time: ${bootTime}s`));
    await this.sleepWithVariance(100);

    this.terminal.println('╔══════════════════════════════════════════════════════════════╗');
    await this.sleepWithVariance(60);
    this.terminal.println('║                                                              ║');
    await this.sleepWithVariance(50);
    this.terminal.println('║                  ██╗ ███████╗ ██████╗ ███████╗               ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║                  ██║ ██╔════╝██╔═══██╗██╔════╝               ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║                  ██║ ███████╗██║   ██║███████╗               ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║             ██   ██║ ╚════██║██║   ██║╚════██║               ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║             ╚█████╔╝ ███████║╚██████╔╝███████║               ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║              ╚═══╝  ╚══════╝ ╚═════╝ ╚══════╝                ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║                                                              ║');
    await this.sleepWithVariance(50);
    this.terminal.println('║              JavaScript Operating System                     ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║                 Terminal Edition v1.0                        ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║                                                              ║');
    await this.sleepWithVariance(50);
    this.terminal.println('║                Developer: TheAngryHermit                     ║');
    await this.sleepWithVariance(60);
    this.terminal.println('║                                                              ║');
    await this.sleepWithVariance(50);
    this.terminal.println('╚══════════════════════════════════════════════════════════════╝');
    await this.sleepWithVariance(100);
    
    this.terminal.println(`${new Date().toLocaleString()}`);
    await this.sleepWithVariance(60);
    
    this.terminal.println('═══════════════════════════════════════════════════════════════');
    await this.sleepWithVariance(60);
    
    this.terminal.println(this.getRandomSplashMessage());
    await this.sleepWithVariance(80);
    
    this.terminal.println('═══════════════════════════════════════════════════════════════');
    await this.sleepWithVariance(60);
    
    this.terminal.isReady = true;
    this.terminal.input.disabled = false;
    this.terminal.input.focus();
  }

  getVirtualDriveFiles() {
    const files = [];
    
    try {
      const rootContents = this.os.vfs.listDirectory('/');
      rootContents.forEach(item => {
        files.push({
          path: `/${item.name}`,
          isDirectory: item.isDirectory,
          name: item.name
        });
        
        if (item.isDirectory && item.name !== '.' && item.name !== '..') {
          this.scanDirectory(`/${item.name}`, files);
        }
      });
    } catch (e) {
      // VFS may be empty initially
    }

    return files.sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) {
        return b.isDirectory ? 1 : -1;
      }
      return a.path.localeCompare(b.path);
    });
  }

  scanDirectory(path, filesList) {
    try {
      const contents = this.os.vfs.listDirectory(path);
      contents.forEach(item => {
        if (item.name !== '.' && item.name !== '..') {
          const fullPath = path.endsWith('/') ? `${path}${item.name}` : `${path}/${item.name}`;
          filesList.push({
            path: fullPath,
            isDirectory: item.isDirectory,
            name: item.name
          });
          
          if (item.isDirectory) {
            this.scanDirectory(fullPath, filesList);
          }
        }
      });
    } catch (e) {
      // Directory may not exist
    }
  }
}

window.BootManager = BootManager;
