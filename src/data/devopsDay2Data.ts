import type { DevOpsDayUnit } from '../types/devopsCourse';

export const DEVOPS_DAY_2_DATA: DevOpsDayUnit = {
  dayNumber: 2,
  moduleNumber: 1,
  moduleTitle: 'Module 1 — DevOps Foundations',
  lessonTitle: 'Linux Fundamentals and Command-Line Navigation',
  subtitle: 'Master the operating system powering the cloud. Navigate filesystems, manage files, inspect text output, and operate the shell with confidence.',
  level: 'Beginner',
  estimatedHours: '2–3 Hours',
  prerequisites: 'Completion of Day 1. Basic computer literacy.',
  learningObjectives: [
    'Explain why Linux is the dominant operating system for cloud infrastructure, containers, and web servers',
    'Understand the distinction between the operating system kernel, the terminal emulator, and the shell interpreter',
    'Navigate the Linux Filesystem Hierarchy Standard (FHS) using absolute and relative paths',
    'Identify the core system directories: /home, /etc, /var, /tmp, /usr, /opt, and /var/log',
    'Create, inspect, copy, move, and remove files safely in a simulated terminal environment',
    'Read files efficiently using cat, head, and tail, and extract help information using --help and man',
  ],

  topics: [
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Linux and Common Distributions',
      durationMinutes: 20,
      explanation: `Over 90% of all public cloud workloads, 100% of the world's top 500 supercomputers, and virtually all Docker container images run on **Linux**. Understanding Linux is not optional for a DevOps engineer—it is your everyday working environment.

### What is Linux?
Technically, "Linux" is not a complete operating system; it is an **open-source monolithic kernel** created by Linus Torvalds in 1991. The kernel is the core software layer that manages hardware interactions: CPU scheduling, RAM allocation, disk I/O, and network device drivers.

A **Linux Distribution (Distro)** pairs the Linux kernel with GNU userland utilities, package managers, system libraries, and background service managers (like systemd) to create a complete, installable operating system.

### The Major Distribution Families

1. **Debian Family (Ubuntu, Debian):**
   - Package Manager: \`apt\` / \`dpkg\` (deb packages).
   - Highly popular in developer environments, cloud VMs, and default container images. Ubuntu Server is the most widely deployed cloud OS on AWS and GCP.
2. **Red Hat Family (RHEL, Rocky Linux, AlmaLinux, Fedora):**
   - Package Manager: \`dnf\` / \`yum\` / \`rpm\`.
   - The corporate enterprise standard across banking, government, and legacy corporate IT. Renowned for rock-solid stability and SELinux enterprise security.
3. **Alpine Linux:**
   - Package Manager: \`apk\`.
   - Ultra-minimal distribution (~5 MB base footprint) built around musl libc and busybox. Widely chosen for production Docker microservices to minimize attack surface and download times.`,
      keyTakeaways: [
        'Linux is the standard OS for cloud computing, microservices, and containerized workloads.',
        'Ubuntu/Debian uses apt; RHEL/Rocky uses dnf/rpm; Alpine uses apk.',
        'The kernel communicates with physical hardware; the userland provides software tools.',
      ],
      commonPitfalls: [
        'Assuming a command works identically across all distros; package manager commands vary between Debian and Red Hat.',
        'Using heavy desktop distributions for server deployments instead of headless, minimal server editions.',
      ],
    },
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Operating System, Terminal, and Shell',
      durationMinutes: 20,
      explanation: `Beginners frequently confuse the terms **Console**, **Terminal**, and **Shell**. Distinguishing them gives you a clear mental model of how commands execute.

### 1. The Terminal (Terminal Emulator)
The terminal is the graphical window program that accepts keyboard input and renders text output on screen (e.g. iTerm2 on Mac, Windows Terminal, GNOME Terminal, or your cloud web console). It does not execute commands itself; it simply routes your keystrokes to the shell.

### 2. The Shell (Command Interpreter)
The shell is the command-line interpreter that reads your commands, interprets what you typed, evaluates environment variables and wildcards, and requests the Linux kernel to launch the appropriate executable programs.
- **Bash (Bourne Again Shell):** The default standard shell on almost all Linux servers. Scripts typically begin with the \`#!/bin/bash\` shebang.
- **Zsh (Z Shell):** Default on modern macOS with rich autocomplete and themes.
- **sh (Bourne Shell):** Minimal POSIX standard shell found on embedded systems and Alpine containers.

### The Shell Command Anatomy
A shell command typically follows this structure:

\`\`\`
command  [options/flags]  [arguments]
ls       -l               /var/log
\`\`\`
- \`command\`: The executable binary or built-in function to run (\`ls\`).
- \`options/flags\`: Modifies command behavior. Usually preceded by a single dash for short flags (\`-l\`, \`-a\`) or two dashes for long flags (\`--all\`).
- \`arguments\`: The target resource or data the command operates upon (\`/var/log\`).`,
      keyTakeaways: [
        'The terminal is the display window; the shell is the program that interprets and runs commands.',
        'Bash is the universal standard for Linux servers and CI/CD automation pipelines.',
        'Commands consist of an executable name, optional modifier flags, and target arguments.',
      ],
      commonPitfalls: [
        'Typing flags without a preceding dash (e.g. typing \`ls l\` instead of \`ls -l\`).',
        'Assuming terminal shortcuts like Ctrl+C mean "Copy"; in the terminal, Ctrl+C sends SIGINT to terminate a running program.',
      ],
    },
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Filesystem Structure (FHS)',
      durationMinutes: 25,
      explanation: `Unlike Windows, which organizes disks into separate drive letters (\`C:\\\`, \`D:\\\`), Linux organizes everything into a **single unified hierarchical tree** starting at the root directory: **\`/\`** (forward slash).

In Linux, there is a fundamental architectural rule: **"Everything is a file"**. Hard disks, memory states, network sockets, keyboard inputs, and running process information are all exposed through the filesystem.

### The Linux Filesystem Hierarchy Standard (FHS)

\`\`\`
/ (Root)
├── home/       # Personal directories for non-root users (e.g., /home/devops)
├── root/       # Home directory of the superuser (root)
├── etc/        # System-wide configuration files (e.g., /etc/nginx, /etc/hosts)
├── var/        # Variable, changing data (e.g., /var/log, /var/www, /var/run)
├── tmp/        # Temporary files (cleared automatically on reboot)
├── usr/        # User binaries and shared read-only software libraries
│   └── bin/    # Standard user commands (e.g., /usr/bin/python3, /usr/bin/git)
├── bin/        # Essential user binaries (symlinked to /usr/bin on modern distros)
├── opt/        # Optional third-party software packages (e.g., /opt/datadog)
├── proc/       # Virtual filesystem exposing kernel & process state in RAM
└── dev/        # Device files representing physical and virtual hardware
\`\`\`

### Directories Every DevOps Engineer Must Know:
- **\`/etc\`**: Where application configurations live. When you configure Nginx, SSH, or PostgreSQL, your config files are in \`/etc\`.
- **\`/var/log\`**: Where system and application log files are stored. The first place you look when troubleshooting an outage.
- **\`/tmp\`**: Used by build scripts and scrapers for transient files. Never store persistent data here because it can be wiped at any time.`,
      keyTakeaways: [
        'Linux uses a single unified tree starting at the root slash (/).',
        'System and service configurations live in /etc; runtime logs live in /var/log.',
        '/tmp is temporary and can be wiped on system reboot.',
      ],
      commonPitfalls: [
        'Confusing the root directory (\`/\`) with the root user\'s personal home folder (\`/root\`).',
        'Saving production database files or persistent backups in \`/tmp\`.',
      ],
    },
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Navigation Commands: pwd, ls, and cd',
      durationMinutes: 25,
      explanation: `When you connect to a Linux server via SSH, there is no graphical mouse or desktop. You navigate by changing your **Current Working Directory (CWD)**.

### 1. \`pwd\` (Print Working Directory)
Prints the full absolute path of the directory you are currently in.
\`\`\`bash
$ pwd
/home/devops/workspace
\`\`\`

### 2. \`ls\` (List Files and Folders)
Displays the contents of a directory. Essential flags:
- \`ls\`: Basic list of visible files.
- \`ls -l\`: Long listing format showing permissions, owner, group, file size in bytes, and timestamp.
- \`ls -a\`: Shows **all** files, including hidden dotfiles (files starting with a \`.\` like \`.env\` or \`.git\`).
- \`ls -lh\`: Long listing with human-readable file sizes (KB, MB, GB instead of raw bytes).
- \`ls -lt\`: Sorts files by modification time, newest first (invaluable for spotting recent log outputs).

### 3. \`cd\` (Change Directory)
Moves your shell to a different directory location.
- **Absolute Paths:** Start from root \`/\` (e.g. \`cd /var/log/nginx\`). Works from anywhere.
- **Relative Paths:** Start relative to your current location:
  - \`.\` (single dot): Current directory.
  - \`..\` (double dot): Parent directory (one level up).
  - \`~\` (tilde): Current user's home directory (\`/home/username\`).
  - \`cd -\`: Toggles back to the previous directory you were in before your last move.`,
      keyTakeaways: [
        'pwd tells you where you are; ls shows what is there; cd moves you somewhere else.',
        'Use ls -lah to see all files (including hidden .env files) with readable sizes.',
        'cd .. moves one level up; cd ~ takes you directly home.',
      ],
      commonPitfalls: [
        'Forgetting that files starting with a dot (like \`.env\` or \`.gitignore\`) are hidden by default from \`ls\`. Use \`ls -a\`.',
        'Typing \`cd\` without a space before the path (e.g. typing \`cd..\` instead of \`cd ..\`).',
      ],
    },
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'File and Directory Operations: mkdir, touch, cp, mv, and rm',
      durationMinutes: 25,
      explanation: `Creating, duplicating, moving, and safely deleting files are the core mechanics of managing application deployments.

### 1. \`mkdir\` (Make Directory)
Creates a new directory.
\`\`\`bash
$ mkdir project_logs
# Use -p (parents) to create nested directory paths in one command without errors:
$ mkdir -p app/backend/config
\`\`\`

### 2. \`touch\` (Create Empty File or Update Timestamp)
Quickly creates a blank, empty file if it does not exist, or updates its last-modified timestamp if it already exists.
\`\`\`bash
$ touch .env.example
$ touch app.log
\`\`\`

### 3. \`cp\` (Copy Files and Folders)
Copies files or entire directory trees from a source to a destination.
\`\`\`bash
# Copy a single file:
$ cp config.example.json config.json

# Copy an entire directory recursively using -r:
$ cp -r src/ backups/src_backup/
\`\`\`

### 4. \`mv\` (Move or Rename Files)
Moves a file to a new location OR renames it if the path is in the same directory.
\`\`\`bash
# Renaming a file:
$ mv server.js index.js

# Moving a file into another folder:
$ mv index.js src/
\`\`\`

### 5. \`rm\` (Remove Files and Folders)
Permanently deletes files from the filesystem. **WARNING: Linux has no "Recycle Bin" or Trash can.** Once \`rm\` executes, the file is unlinked immediately.
- \`rm app.log\`: Removes a single file.
- \`rm -r folder/\`: Recursively deletes a directory and all of its contents.
- \`rm -f\`: Force removal without confirmation prompts.
- **DANGER:** \`rm -rf /\` or \`rm -rf /*\` will delete the entire operating system! Never run this command. Always double-check your current path with \`pwd\` before using \`rm -rf\`.`,
      keyTakeaways: [
        'mkdir -p creates nested directory trees safely.',
        'cp requires the -r flag to copy directories; mv renames or relocates files.',
        'rm has no undo or recycle bin; exercise extreme caution with rm -rf.',
      ],
      commonPitfalls: [
        'Running \`rm -rf\` without verifying your current directory with \`pwd\` first.',
        'Forgetting the \`-r\` flag when trying to copy or remove a directory with \`cp\` or \`rm\`.',
      ],
    },
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Reading Files and Inspecting Output: cat, head, and tail',
      durationMinutes: 20,
      explanation: `DevOps engineers frequently inspect configuration files, environment definitions, and application log output. Choosing the right command prevents flooding your terminal screen.

### 1. \`cat\` (Concatenate and Display)
Prints the entire contents of a file to the terminal output.
\`\`\`bash
$ cat /etc/hosts
127.0.0.1   localhost
\`\`\`
**Best for:** Short configuration files (under 50 lines). If you run \`cat\` on a 500 MB log file, your terminal will freeze as millions of lines flash across the screen!

### 2. \`head\` (View Top of File)
Prints the first few lines of a file (default is 10 lines).
\`\`\`bash
# View the first 5 lines of a log:
$ head -n 5 /var/log/syslog
\`\`\`

### 3. \`tail\` (View Bottom of File)
Prints the last few lines of a file (default is 10 lines).
\`\`\`bash
# View the last 15 lines of an application log:
$ tail -n 15 app.log

# Stream live updates in real time using -f (follow):
$ tail -f /var/log/nginx/access.log
\`\`\`
The \`tail -f\` command is one of the most frequently used diagnostic commands in DevOps. It keeps the file connection open and prints new log entries as they are written by the web server in real time. Press \`Ctrl+C\` to stop streaming.`,
      keyTakeaways: [
        'cat is for short files; do not use it on massive logs.',
        'head shows the top of a file; tail shows the bottom.',
        'tail -f follows log updates live in real-time, crucial for testing running services.',
      ],
      commonPitfalls: [
        'Running \`cat\` on huge multi-gigabyte log files, freezing your terminal session.',
        'Forgetting how to exit \`tail -f\`: press Ctrl+C to terminate the stream.',
      ],
    },
    {
      id: 'topic-7',
      topicNumber: 7,
      title: 'Command Arguments and Help: --help and man',
      durationMinutes: 20,
      explanation: `No engineer memorizes every single flag for every Linux command. Senior engineers are simply faster at looking up help information in the terminal.

### 1. The \`--help\` Flag
Most modern command-line utilities provide a built-in help overview when passed \`--help\` or \`-h\`:
\`\`\`bash
$ ls --help
$ docker --help
$ git checkout --help
\`\`\`
This displays accepted arguments, short/long flags, and brief descriptions directly in your terminal.

### 2. \`man\` (Manual Pages)
The \`man\` command displays the official system manual for a tool:
\`\`\`bash
$ man ls
$ man ps
\`\`\`
This opens a scrollable, searchable pager (typically using \`less\`):
- Press **Space** or **Down Arrow** to scroll down.
- Press **b** or **Up Arrow** to scroll up.
- Type **\`/<keyword>\`** and press **Enter** to search for a word (press **n** for next match).
- Press **q** to quit and return to your shell prompt.`,
      keyTakeaways: [
        'Never guess flags; use --help or man to inspect available options.',
        'man opens a scrollable manual; press q to exit the pager.',
        'Search within man pages by typing / followed by your search keyword.',
      ],
      commonPitfalls: [
        'Getting stuck inside a man page because you do not know that \`q\` exits.',
        'Assuming flags are case-insensitive; in Linux, \`-p\` and \`-P\` are completely different flags.',
      ],
    },
  ],

  checkpoints: [
    {
      id: 'cp-1',
      question: 'Which of the following directories is where system-wide and service configuration files reside in Linux?',
      options: ['/var/log', '/home', '/etc', '/opt'],
      correctIndex: 2,
      explanation: '/etc is the standard Linux directory reserved for host-specific, system-wide configuration files (e.g. /etc/nginx/nginx.conf, /etc/hosts).',
    },
    {
      id: 'cp-2',
      question: 'What is the purpose of the -p flag when running the mkdir command?',
      options: [
        'It sets file permissions to public',
        'It creates intermediate parent directories as needed without failing if they already exist',
        'It prints the directory size in megabytes',
        'It prompts the user before creating each directory',
      ],
      correctIndex: 1,
      explanation: 'mkdir -p (parents) allows creating nested directories like mkdir -p a/b/c in a single command without failing if folders already exist.',
    },
    {
      id: 'cp-3',
      question: 'Which command allows a DevOps engineer to monitor an active web server log file live as new requests arrive?',
      options: ['cat /var/log/nginx/access.log', 'head -n 20 /var/log/nginx/access.log', 'tail -f /var/log/nginx/access.log', 'ls -lt /var/log/nginx/'],
      correctIndex: 2,
      explanation: 'tail -f (follow) streams newly appended log lines to the terminal in real time, making it the primary tool for live incident monitoring.',
    },
    {
      id: 'cp-4',
      question: 'What is the difference between an absolute path and a relative path in Linux?',
      options: [
        'Absolute paths always start from the root directory (/), while relative paths are calculated from your current working directory',
        'Absolute paths only work for root users; regular users must use relative paths',
        'Relative paths cannot contain file extensions',
        'Absolute paths are temporary and deleted on reboot',
      ],
      correctIndex: 0,
      explanation: 'An absolute path specifies a complete location starting from the root slash (/), whereas a relative path is resolved relative to the current working directory.',
    },
    {
      id: 'cp-5',
      question: 'Why is running "rm -rf" considered extremely dangerous without verifying your current directory?',
      options: [
        'It will delete the user account from the cloud provider',
        'It forcefully and recursively deletes files and folders without a confirmation prompt or recycle bin recovery mechanism',
        'It restarts the physical server immediately',
        'It exposes passwords over the unencrypted network',
      ],
      correctIndex: 1,
      explanation: 'Linux has no Trash/Recycle Bin; rm -rf unlinks files immediately and recursively without confirmation. A mistyped path can wipe critical system files.',
    },
  ],

  quizQuestions: [
    {
      id: 'q1',
      domain: 'Linux Architecture',
      question: 'What is the primary role of the Linux operating system kernel?',
      options: [
        'Providing a graphical user interface with customizable themes',
        'Managing physical hardware resources, memory allocation, CPU scheduling, and hardware device drivers',
        'Compiling JavaScript source code into machine binaries',
        'Managing customer subscriptions for software applications',
      ],
      correctIndex: 1,
      explanation: 'The kernel is the foundational core of Linux that manages hardware interactions, CPU scheduling, memory management, and I/O.',
    },
    {
      id: 'q2',
      domain: 'Package Management',
      question: 'Which package management command is native to Debian and Ubuntu Linux distributions?',
      options: ['apk', 'dnf', 'apt', 'yum'],
      correctIndex: 2,
      explanation: 'Debian and Ubuntu use apt (Advanced Package Tool); Red Hat uses dnf/yum; Alpine uses apk.',
    },
    {
      id: 'q3',
      domain: 'Filesystem Navigation',
      question: 'If your current working directory is /home/devops/projects/api, what directory will "cd ../.." take you to?',
      options: ['/home/devops', '/home', '/home/devops/projects', '/'],
      correctIndex: 0,
      explanation: 'Each ".." moves up one directory level. Starting from /home/devops/projects/api, the first ".." goes to /home/devops/projects, and the second goes to /home/devops.',
    },
    {
      id: 'q4',
      domain: 'Listing Files',
      question: 'Which command will list all files in a folder, including hidden dotfiles, with human-readable file sizes?',
      options: ['ls -h', 'ls -lah', 'ls -r', 'ls --plain'],
      correctIndex: 1,
      explanation: 'The -l flag provides long listing, -a includes hidden files starting with a dot, and -h displays human-readable file sizes (e.g. 4.2K, 12M).',
    },
    {
      id: 'q5',
      domain: 'File Operations',
      question: 'Which command will copy an entire directory named "configs" to a new backup folder named "configs_backup"?',
      options: ['cp configs configs_backup', 'cp -r configs configs_backup', 'mv configs configs_backup', 'touch configs configs_backup'],
      correctIndex: 1,
      explanation: 'cp requires the -r (recursive) flag when copying directories. Without -r, cp will return an error stating that configs is a directory.',
    },
    {
      id: 'q6',
      domain: 'FHS Standards',
      question: 'Where are application and system runtime log files conventionally stored on a Linux server?',
      options: ['/tmp', '/etc/log', '/var/log', '/usr/log'],
      correctIndex: 2,
      explanation: '/var/log is the standard directory defined by the Filesystem Hierarchy Standard (FHS) for system, authentication, and application log files.',
    },
    {
      id: 'q7',
      domain: 'Reading Output',
      question: 'What will the command "head -n 20 app.log" do?',
      options: [
        'Display the last 20 lines of app.log',
        'Display the first 20 lines of app.log',
        'Delete the first 20 lines of app.log',
        'Search app.log for the number 20',
      ],
      correctIndex: 1,
      explanation: 'The head command outputs the beginning lines of a file; -n 20 specifies the first 20 lines.',
    },
    {
      id: 'q8',
      domain: 'Interactive Shell',
      question: 'What is the standard keyboard shortcut to stop a running command in the terminal (like tail -f)?',
      options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + Z', 'Alt + F4'],
      correctIndex: 0,
      explanation: 'Ctrl+C sends the SIGINT (interrupt) signal to the active foreground process in the terminal, cleanly terminating it.',
    },
    {
      id: 'q9',
      domain: 'Directory Creation',
      question: 'How do you create a directory structure "app/src/utils" when neither "app" nor "src" exists yet?',
      options: ['mkdir app src utils', 'mkdir -p app/src/utils', 'mkdir --all app/src/utils', 'touch app/src/utils'],
      correctIndex: 1,
      explanation: 'mkdir -p (or --parents) automatically creates all required missing parent directories along the specified path.',
    },
    {
      id: 'q10',
      domain: 'System Help',
      question: 'When reading a command manual using the "man" command, which key exits the pager?',
      options: ['Escape', 'q', 'Ctrl + X', 'Enter'],
      correctIndex: 1,
      explanation: 'The man command uses less as its display pager; pressing "q" exits the pager and returns you to the shell prompt.',
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-1',
      question: 'Why do containers (like Docker) predominantly use Alpine or Debian Linux instead of Windows or macOS as base images?',
      targetRole: 'DevOps / Cloud Engineer',
      difficulty: 'Beginner',
      modelAnswer:
        'Linux is open-source, lightweight, and built with native kernel isolation primitives (namespaces and cgroups) that make container virtualization possible without hypervisor overhead. Distributions like Alpine (~5 MB) or Debian Slim (~70 MB) allow container images to download in seconds, consume minimal RAM, have zero licensing costs, and minimize attack surfaces by excluding unnecessary desktop packages.',
      keyPoints: [
        'Linux has native kernel cgroups and namespaces for process isolation.',
        'Alpine/Debian provide tiny image footprints without licensing costs.',
        'Minimal base images reduce security vulnerability attack surface.',
      ],
      commonMistakes: [
        'Saying Windows cannot run containers (Windows containers exist, but are heavy and costly).',
        'Failing to mention namespaces and cgroups.',
      ],
    },
    {
      id: 'iq-2',
      question: 'Explain the difference between a hard link and a symbolic (soft) link in the Linux filesystem.',
      targetRole: 'Linux / Systems Administrator',
      difficulty: 'Intermediate',
      modelAnswer:
        'A hard link is an additional directory entry pointing directly to the exact same inode (physical data blocks on disk). If you delete the original file, the hard link still accesses the data. Hard links cannot span across different disk partitions or point to directories. A symbolic link (symlink, created with ln -s) is a special pointer file containing a path string referencing another target file. If the target file is deleted or moved, the symlink breaks ("dangling symlink"). Symlinks can span different disks and point to directories.',
      keyPoints: [
        'Hard link shares the same inode; deleting original does not delete data.',
        'Soft/symlink stores the target path; breaks if target is removed.',
        'Symlinks can cross filesystem partitions; hard links cannot.',
      ],
      commonMistakes: [
        'Claiming hard links and symlinks are identical.',
        'Not knowing what an inode is.',
      ],
    },
    {
      id: 'iq-3',
      question: 'A junior engineer ran "cat production.log" on an active 10 GB log file and the terminal froze. How do you recover and what should they have done instead?',
      targetRole: 'DevOps / SRE',
      difficulty: 'Scenario',
      modelAnswer:
        'To recover immediately, press Ctrl+C to send SIGINT. If the terminal buffer is completely locked up, open a separate terminal window and terminate the cat process using pkill -9 cat. To inspect large log files safely, you should never use cat. Instead: 1) Use tail -n 100 to inspect the most recent entries, 2) Use tail -f to stream live updates, 3) Use less production.log to view the file page-by-page with on-demand streaming without loading the entire 10 GB into memory, or 4) Use grep to filter for specific error timestamps.',
      keyPoints: [
        'Terminate with Ctrl+C or kill the process from another session.',
        'Use less for memory-efficient paginated navigation.',
        'Use tail -n or tail -f for inspecting recent entries.',
      ],
      commonMistakes: [
        'Suggesting to reboot the production server.',
        'Recommending downloading the 10 GB file to a laptop.',
      ],
    },
    {
      id: 'iq-4',
      question: 'What is the purpose of the /etc, /var, and /tmp directories in the Linux Filesystem Hierarchy Standard?',
      targetRole: 'Junior DevOps Engineer',
      difficulty: 'Beginner',
      modelAnswer:
        '/etc is reserved for static, host-specific system and application configuration files (e.g. /etc/nginx/nginx.conf, /etc/fstab). /var contains variable runtime data that changes frequently while the system is running (e.g. log files in /var/log, package caches, and database data). /tmp is used for temporary, transient scratch files created by running programs, and its contents are typically wiped automatically upon system reboot or periodically by systemd-tmpfiles.',
      keyPoints: [
        '/etc for configuration files.',
        '/var for runtime variable data and logs.',
        '/tmp for temporary files wiped on reboot.',
      ],
      commonMistakes: [
        'Storing persistent backups or databases in /tmp.',
        'Confusing /etc with binary executable directories.',
      ],
    },
    {
      id: 'iq-5',
      question: 'How do you check available disk space and determine which directory is consuming the most storage on a Linux server?',
      targetRole: 'Infrastructure / Systems Engineer',
      difficulty: 'Intermediate',
      modelAnswer:
        'First, I run df -h (disk free, human-readable) to identify which mounted filesystem partition is filling up (e.g. if /var is at 98%). Next, I navigate to the problem partition and run du -sh * | sort -hr | head -n 10 (disk usage, summary, human-readable, sorted in reverse order) to quickly pinpoint the top 10 largest subdirectories. If a log file is the culprit, I can truncate it safely using truncate -s 0 file.log rather than deleting an open file descriptor.',
      keyPoints: [
        'df -h shows filesystem partition percentages.',
        'du -sh * | sort -hr reveals directory size consumption.',
        'Truncating open logs prevents "deleted but still consuming disk" descriptor leaks.',
      ],
      commonMistakes: [
        'Confusing df (disk free) with du (disk usage).',
        'Deleting an active log file that is held open by a running process, failing to reclaim space.',
      ],
    },
  ],

  pdfDownloadUrl: '/devops/day-2-linux-fundamentals.pdf',
  pdfFileName: 'day-2-linux-fundamentals.pdf',
};
