import type { DevOpsDayUnit } from '../types/devopsCourse';

export const DEVOPS_DAY_3_DATA: DevOpsDayUnit = {
  dayNumber: 3,
  moduleNumber: 1,
  moduleTitle: 'Module 1 — DevOps Foundations',
  lessonTitle: 'Linux Permissions, Processes, Logs, and Troubleshooting',
  subtitle: 'Master Linux user access control, process inspection, system telemetry, log forensics, and structured operational incident troubleshooting.',
  level: 'Beginner',
  estimatedHours: '2–3 Hours',
  prerequisites: 'Completion of Days 1 and 2.',
  learningObjectives: [
    'Understand Linux multi-user architecture: users, groups, UIDs, GIDs, and file ownership',
    'Interpret symbolic permission strings (rwxr-xr-x) and calculate numeric octal modes (755, 644, 700)',
    'Use chmod and chown safely without resorting to dangerous anti-patterns like chmod 777',
    'Inspect running processes, process trees, and system resource consumption using ps, top, and free',
    'Examine application logs, parse error traces, and identify failure root causes with evidence',
    'Execute a structured 5-step troubleshooting methodology to diagnose and resolve service incidents safely',
  ],

  topics: [
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Linux Users, Groups, and File Ownership',
      durationMinutes: 20,
      explanation: `Linux was architected from day one as a secure, multi-user operating system. Every single file, folder, and running process on the system is owned by a specific **User** and belongs to a specific **Group**.

### User Accounts & Identifiers
1. **The Superuser (\`root\`, UID 0):** Has unrestricted administrative authority over the entire operating system. It can read, write, or delete any file and terminate any process. **Rule:** Never run web applications or daily development as \`root\`. If a container or web app is compromised while running as root, the attacker gains full control of the host.
2. **System Service Accounts (UID 1–999):** Non-login service accounts created to isolate daemons (e.g., \`nginx\`, \`postgres\`, \`systemd-resolve\`).
3. **Regular User Accounts (UID 1000+):** Human engineers and developers (e.g. \`devops\`, \`priya\`).

### Groups
A group is a collection of user accounts sharing common access privileges (e.g. \`developers\`, \`sudo\`, \`docker\`). Instead of assigning permissions to 20 individual developers, you grant permissions to a group and add the users to that group.

### Key Ownership Commands
- \`whoami\`: Prints your current active username.
- \`id\`: Displays your User ID (UID), primary Group ID (GID), and all secondary group memberships.
- \`cat /etc/passwd\`: The system file listing all defined user accounts.
- \`cat /etc/group\`: The system file listing all groups and their members.`,
      keyTakeaways: [
        'Every file and process has an owner user (UID) and a primary group (GID).',
        'Root has UID 0 and unlimited power; never run user-facing applications as root.',
        'Groups allow multiple users to share access without exposing files to everyone.',
      ],
      commonPitfalls: [
        'Running application containers as root instead of creating a dedicated unprivileged user.',
        'Editing /etc/passwd directly with a text editor instead of using useradd or usermod.',
      ],
    },
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Read, Write, and Execute Permissions',
      durationMinutes: 20,
      explanation: `When you run \`ls -l\`, the very first column displays an 11-character permission string. Understanding how to decode this string is a core DevOps requirement.

\`\`\`
- rwx r-x r--  1  devops  developers  4096  Oct 26 10:00  app.js
┬ ─── ─── ───
│  │   │   │
│  │   │   └── Others (World) Permissions: r-- (Read-only)
│  │   └────── Group Permissions:          r-x (Read and Execute)
│  └────────── Owner (User) Permissions:   rwx (Read, Write, Execute)
└───────────── File Type: (-) = Regular file, (d) = Directory, (l) = Symlink
\`\`\`

### What Permissions Mean for Files vs. Directories

| Permission | For a Regular File | For a Directory |
| :---: | :--- | :--- |
| **r (Read)** | View/read file content (\`cat\`, \`head\`) | List files inside directory (\`ls\`) |
| **w (Write)** | Modify/edit/save file content | Create, rename, or delete files inside directory |
| **x (Execute)** | Run file as a program or script | Enter directory (\`cd\`) and access file metadata |

**Crucial Directory Insight:** To navigate into a directory (\`cd /var/log\`) or access any file inside it, the user must have **execute (\`x\`) permission** on that directory! If a directory has \`r--\` without \`x\`, you can see the file names, but you cannot enter the folder or read the contents of the files!`,
      keyTakeaways: [
        'Permissions are divided into three triplets: Owner (User), Group, and Others (World).',
        'r = Read, w = Write, x = Execute.',
        'On directories, x (Execute) is required to cd into the folder and access files.',
      ],
      commonPitfalls: [
        'Removing the execute bit from a directory, making it impossible for users to cd into it.',
        'Assuming write permission on a file lets you delete it; deleting a file requires write permission on its parent directory.',
      ],
    },
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Permission Notation: Symbolic and Octal (Numeric) Modes',
      durationMinutes: 25,
      explanation: `Linux represents permissions in two interchangeable ways: **Symbolic notation** (\`rwxr-xr-x\`) and **Octal (numeric) notation** (\`755\`).

### The Mathematical Octal Bitmask
Each permission has a specific binary numeric value:
- **r (Read) = 4** (binary \`100\`)
- **w (Write) = 2** (binary \`010\`)
- **x (Execute) = 1** (binary \`001\`)
- **- (None) = 0** (binary \`000\`)

To calculate the mode for each triplet, simply add the numbers together:

\`\`\`
Owner: r w x  = 4 + 2 + 1 = 7
Group: r - x  = 4 + 0 + 1 = 5
Other: r - -  = 4 + 0 + 0 = 4
Combined Octal Mode: 754
\`\`\`

### Standard Industry Modes
- **\`755\` (\`rwxr-xr-x\`):** Standard for executable scripts and directories. Owner can read/write/execute; group and others can read and execute.
- **\`644\` (\`rw-r--r--\`):** Standard for non-executable files (HTML, config files, images). Owner can read/write; group and others can only read.
- **\`600\` (\`rw-------\`):** Standard for sensitive private keys and secrets (e.g. \`~/.ssh/id_rsa\`). Only the owner can read/write; everyone else has zero access.
- **\`700\` (\`rwx------\`):** Standard for private directories (e.g. \`~/.ssh\`). Only the owner can enter and list files.

### Why "chmod 777" is an Extreme Anti-Pattern
When a junior engineer encounters a \`Permission Denied\` error, their first instinct is often to run:
\`\`\`bash
$ chmod -R 777 /app   # DO NOT DO THIS!
\`\`\`
**\`777\` (\`rwxrwxrwx\`) gives every user and process on the entire machine unrestricted write and execute permissions.** Any rogue process, compromised web dependency, or malicious user can overwrite, inject malicious code into, or delete the file. Senior engineers reject pull requests containing \`chmod 777\` immediately. Always apply the **Principle of Least Privilege**: grant only the minimum permissions required.`,
      keyTakeaways: [
        'Read = 4, Write = 2, Execute = 1. Add them together for each triplet.',
        'Standard file mode is 644; standard executable/dir mode is 755; SSH secret mode is 600.',
        'Never use chmod 777 in production; it violates the Principle of Least Privilege.',
      ],
      commonPitfalls: [
        'Using chmod 777 as a quick fix instead of investigating proper group ownership.',
        'Leaving SSH private keys with 644 permissions (SSH client will reject the key as too open).',
      ],
    },
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Basic chmod and chown Concepts',
      durationMinutes: 20,
      explanation: `To modify permissions and ownership, Linux provides two primary utilities: \`chmod\` and \`chown\`.

### 1. \`chmod\` (Change Mode)
Modifies the access permissions of files or directories.
- **Numeric Mode Syntax:**
  \`\`\`bash
  $ chmod 755 deploy.sh      # rwxr-xr-x
  $ chmod 644 nginx.conf     # rw-r--r--
  $ chmod 600 id_rsa         # rw-------
  \`\`\`
- **Symbolic Mode Syntax:**
  \`\`\`bash
  # Syntax: [who][operator][permission]
  # who: u (user/owner), g (group), o (other), a (all)
  # operator: + (add), - (remove), = (set exactly)
  
  $ chmod u+x backup.sh     # Add execute to owner
  $ chmod g-w config.json    # Remove write from group
  $ chmod o-rwx secrets.env  # Revoke all permissions from others
  \`\`\`

### 2. \`chown\` (Change Ownership)
Transfers file ownership to a different user and/or group. Only the superuser (\`root\`) or a user with \`sudo\` privileges can change file owners.
\`\`\`bash
# Change owner only:
$ sudo chown devops app.js

# Change both owner and group:
$ sudo chown devops:developers app.js

# Recursively change ownership for an entire directory tree using -R:
$ sudo chown -R www-data:www-data /var/www/html
\`\`\``,
      keyTakeaways: [
        'chmod changes permissions; chown changes user and group ownership.',
        'Use numeric chmod (755, 644) for complete mode resets; use symbolic (u+x) for targeted tweaks.',
        'Only root/sudo can reassign file ownership to another user.',
      ],
      commonPitfalls: [
        'Forgetting the -R flag when modifying ownership across an entire directory tree.',
        'Accidentally running chown on / instead of ./ due to an extra slash.',
      ],
    },
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Processes and Process Identification',
      durationMinutes: 25,
      explanation: `A **process** is a program currently running in system memory. Every program executed—from a web server to a simple \`ls\` command—is assigned a unique integer called a **Process ID (PID)**.

### Process Hierarchy
In Linux, processes form a tree hierarchy:
- The initial process started by the Linux kernel upon system boot is **\`systemd\`** (or init), which has **PID 1**.
- Every process is spawned by a **Parent Process (PPID)**.
- If a parent process dies before its child terminates, the child process is adopted by PID 1 and can become an **Orphan** or a **Zombie** (a terminated process whose exit status has not been reaped by its parent).

### Process Management Commands
1. **\`ps\` (Process Status):**
   - \`ps aux\`: Displays every running process across all users:
     - \`a\`: Shows processes for all users.
     - \`u\`: Displays user-oriented format with CPU and memory percentages.
     - \`x\`: Includes processes without a controlling terminal (background daemons).
   - \`ps -ef | grep node\`: Searches for running Node.js processes.
2. **\`kill\` and Signals:**
   Processes communicate via numeric **Signals**:
   - **\`kill -15 <PID>\` (SIGTERM):** Graceful termination request. Gives the process time to close database connections, finish active requests, and write flush buffers. **Always try SIGTERM first.**
   - **\`kill -9 <PID>\` (SIGKILL):** Forceful immediate kill by the kernel. The process cannot catch or ignore this signal. Use only when a process is frozen or unresponsive to SIGTERM.`,
      keyTakeaways: [
        'Every process has a unique PID; PID 1 is the system init daemon (systemd).',
        'ps aux shows all running processes with user and resource usage.',
        'Always try graceful termination (SIGTERM / kill -15) before resorting to force kill (SIGKILL / kill -9).',
      ],
      commonPitfalls: [
        'Immediately using kill -9, corrupting database files or leaving locked socket ports open.',
        'Killing the wrong process because of not verifying the PID in ps aux first.',
      ],
    },
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'CPU, Memory, and Disk Inspection',
      durationMinutes: 25,
      explanation: `When a server slows down or an API experiences high latency, you must quickly determine whether the bottleneck is **CPU saturation**, **Memory exhaustion**, or **Disk space limits**.

### 1. \`top\` / \`htop\` (Real-Time Process Monitor)
Provides an interactive, dynamically updating dashboard of system resources:
- **Load Average:** Displays 3 numbers representing system load over 1, 5, and 15 minutes. On a 4-core CPU, a load average below 4.0 means the CPU has headroom; a load average of 8.0 means processes are queued waiting for CPU time.
- Press **P** in top to sort by CPU usage.
- Press **M** in top to sort by Memory usage.
- Press **q** to quit.

### 2. \`free -m\` (Memory Usage)
Inspects physical RAM and Swap usage in megabytes.
\`\`\`
$ free -m
               total        used        free      shared  buff/cache   available
Mem:            7960        2150        3210         120        2600        5410
Swap:           2048           0        2048
\`\`\`
**Crucial Metric: \`available\` RAM.** Linux aggressively uses free RAM as \`buff/cache\` to speed up disk reads. This memory is automatically released the instant an application needs it. Look at the **available** column, not the free column, to see true usable memory!

### 3. \`df -h\` (Disk Free)
Displays total, used, and available disk space across all mounted filesystem partitions.
- If a partition hits **100% capacity**, applications cannot write logs or temporary sessions, causing immediate service crashes.

### 4. \`uptime\`
Displays how long the server has been running since its last reboot, the number of active users, and system load averages.`,
      keyTakeaways: [
        'top provides real-time CPU and memory monitoring; press M to sort by memory.',
        'Look at available memory in free -m, not just free memory.',
        'df -h shows disk capacity; a 100% full disk will crash databases and loggers.',
      ],
      commonPitfalls: [
        'Panicking because free memory is low; Linux utilizes unused memory for high-speed disk caching.',
        'Ignoring disk usage until partitions hit 100%, causing catastrophic application outages.',
      ],
    },
    {
      id: 'topic-7',
      topicNumber: 7,
      title: 'Application Logs and Error Messages',
      durationMinutes: 20,
      explanation: `Logs are the primary source of truth when investigating what went wrong. Understanding log conventions and severity levels accelerates incident triage.

### Standard Log Levels
Applications and system services classify log events by severity:
- **DEBUG:** Verbose diagnostic information used during development.
- **INFO:** Routine operational events (e.g. \`Server listening on port 3000\`, \`User 45 logged in\`).
- **WARN:** Unexpected condition that does not break core functionality (e.g. \`API response took 800ms\`, \`Deprecated flag used\`).
- **ERROR:** A specific operation or user request failed, but the application remains running (e.g. \`Database query timeout\`, \`Failed to process payment\`).
- **FATAL / CRITICAL:** Catastrophic failure causing the entire service to crash or terminate (e.g. \`Cannot bind port 80: Address already in use\`, \`Out of Memory\`).

### The Anatomy of an Error Trace
A typical application crash log contains:
1. **Timestamp (ISO 8601):** \`2026-10-26T10:14:02Z\` — Essential for correlating events across multiple microservices.
2. **Log Level:** \`[ERROR]\`
3. **Component / Module:** \`[DatabasePool]\`
4. **Message & Reason:** \`Connection refused at 10.0.1.4:5432\`
5. **Stack Trace:** The sequence of function calls leading to the failure. Look at the **first line of the stack trace** to find the file and line number where the exception occurred.`,
      keyTakeaways: [
        'Log severity progresses from DEBUG -> INFO -> WARN -> ERROR -> FATAL.',
        'Timestamps allow correlating frontend errors with backend database timeouts.',
        'The top of a stack trace indicates the exact file and line number of the failure.',
      ],
      commonPitfalls: [
        'Writing logs without timestamps, making it impossible to reconstruct incident timelines.',
        'Ignoring WARNING logs that accumulate before a full system crash.',
      ],
    },
    {
      id: 'topic-8',
      topicNumber: 8,
      title: 'A Structured Troubleshooting Workflow',
      durationMinutes: 25,
      explanation: `Amateur engineers react to outages by blindly restarting services, changing random file permissions, or rebooting servers. Senior DevOps engineers follow a disciplined, hypothesis-driven troubleshooting process.

### The 5-Step Operational Triage Framework

\`\`\`
[1. Gather Evidence] ──> [2. Isolate Component] ──> [3. Formulate Hypothesis] ──> [4. Test Safely] ──> [5. Verify & Document]
\`\`\`

1. **Step 1: Gather Evidence:**
   - What is the exact symptom? (e.g. "API returns HTTP 500 on /checkout").
   - When did it start? Was a deployment, configuration change, or database migration performed recently?
   - Inspect the logs: \`tail -n 100 /var/log/app.log\` and system status \`systemctl status app\`.
2. **Step 2: Isolate the Component:**
   - Is the problem in DNS, Network/Firewall, Application Process, or the Database?
   - Check if the process is alive: \`ps aux | grep node\`.
   - Check if ports are listening: \`netstat -tlpn\` or \`ss -tulpn\`.
3. **Step 3: Formulate a Testable Hypothesis:**
   - *"The service crashed because it does not have read permissions on /etc/app/config.json."*
   - Avoid guessing multiple unrelated causes at once.
4. **Step 4: Test and Apply the Fix Safely:**
   - Change ONE variable at a time.
   - If applying a permission fix: \`chmod 644 /etc/app/config.json\`.
   - Never use brute-force hacks like \`chmod 777\` or deleting databases.
5. **Step 5: Verify Resolution and Prevent Recurrence:**
   - Test the endpoint: \`curl -I http://localhost:3000/health\`.
   - Monitor error rates for 15 minutes.
   - Update the deployment pipeline or Ansible playbook so future deployments never ship with the wrong permissions.`,
      keyTakeaways: [
        'Never blindly restart services without first gathering log evidence.',
        'Isolate whether the bottleneck is network, process, permissions, or resource exhaustion.',
        'Change only ONE variable at a time when testing a hypothesis.',
      ],
      commonPitfalls: [
        'Rebooting the server immediately, destroying ephemeral RAM evidence and logs.',
        'Applying 5 changes simultaneously, making it impossible to know which change resolved the bug.',
      ],
    },
  ],

  checkpoints: [
    {
      id: 'cp-1',
      question: 'What is the numeric octal representation of the permission string "rwxr-xr--"?',
      options: ['755', '754', '644', '770'],
      correctIndex: 1,
      explanation: 'Owner is rwx (4+2+1=7), Group is r-x (4+0+1=5), and Others is r-- (4+0+0=4). Combining them gives 754.',
    },
    {
      id: 'cp-2',
      question: 'Why does SSH reject a private key file (e.g., id_rsa) if its permissions are set to 644?',
      options: [
        'Because 644 is an invalid numeric mode in Linux',
        'Because 644 allows other users on the system to read your private key, violating security requirements',
        'Because 644 makes the file executable',
        'Because SSH keys must be owned by the root user',
      ],
      correctIndex: 1,
      explanation: 'SSH requires private keys to be protected against unauthorized read access by other local users; private keys must be set to 600 (rw-------) or 400 (r--------).',
    },
    {
      id: 'cp-3',
      question: 'What is the difference between sending SIGTERM (kill -15) and SIGKILL (kill -9) to a running process?',
      options: [
        'SIGKILL gives the process time to close database connections, while SIGTERM does not',
        'SIGTERM requests a graceful shutdown allowing the process to clean up, while SIGKILL immediately halts the process at the kernel level without cleanup',
        'SIGTERM only works on root processes',
        'SIGKILL restarts the process automatically',
      ],
      correctIndex: 1,
      explanation: 'SIGTERM (signal 15) allows graceful termination and resource cleanup; SIGKILL (signal 9) forcibly aborts the process immediately, risking data corruption.',
    },
    {
      id: 'cp-4',
      question: 'When inspecting RAM on a Linux server with "free -m", which column represents the true amount of memory available for new applications?',
      options: ['free', 'used', 'shared', 'available'],
      correctIndex: 3,
      explanation: 'The "available" column estimates how much memory is available for starting new applications without swapping, taking into account reclaimable cache buffers.',
    },
    {
      id: 'cp-5',
      question: 'What should be your FIRST action when responding to an unexpected production service outage?',
      options: [
        'Reboot the physical server immediately to clear all memory',
        'Gather observable evidence by inspecting service status and recent application log error messages',
        'Run chmod -R 777 on the application root directory',
        'Commit a blank file to the git repository to trigger a rebuild',
      ],
      correctIndex: 1,
      explanation: 'Senior troubleshooting begins with gathering evidence from logs and process status before taking action. Blindly rebooting erases valuable diagnostics.',
    },
  ],

  quizQuestions: [
    {
      id: 'q1',
      domain: 'User Access Control',
      question: 'What is the User ID (UID) of the root superuser account on all standard Linux systems?',
      options: ['1', '0', '1000', '999'],
      correctIndex: 1,
      explanation: 'In the Linux operating system, the superuser (root) is uniquely identified by UID 0.',
    },
    {
      id: 'q2',
      domain: 'Directory Permissions',
      question: 'A user has read (r) permission on a directory, but does NOT have execute (x) permission. What is the user prevented from doing?',
      options: [
        'Viewing the names of files inside the directory with ls',
        'Entering the directory with "cd" and accessing file metadata inside it',
        'Deleting their own user account',
        'Reading manual pages',
      ],
      correctIndex: 1,
      explanation: 'The execute (x) bit on a directory controls search/traversal access. Without x, a user cannot cd into the directory or access files within it.',
    },
    {
      id: 'q3',
      domain: 'Permission Security',
      question: 'Why is running "chmod -R 777 /var/www/html" considered a severe security vulnerability?',
      options: [
        'It causes the web server to run out of memory',
        'It grants every local user and compromised process full write and execution authority over web application files',
        'It changes the port from 80 to 777',
        'It deletes all HTML files',
      ],
      correctIndex: 1,
      explanation: 'chmod 777 grants universal read, write, and execute permissions, allowing any process or attacker to inject malicious scripts into your web files.',
    },
    {
      id: 'q4',
      domain: 'File Ownership',
      question: 'Which command changes the ownership of "server.js" so that user "nodeapp" owns it and group "webgroup" is assigned?',
      options: [
        'chmod nodeapp:webgroup server.js',
        'chown nodeapp:webgroup server.js',
        'useradd nodeapp:webgroup server.js',
        'mv nodeapp webgroup server.js',
      ],
      correctIndex: 1,
      explanation: 'The chown command (change owner) uses the syntax chown user:group filename to set both user and group ownership simultaneously.',
    },
    {
      id: 'q5',
      domain: 'Process Management',
      question: 'In the output of "ps aux", what does the PID column represent?',
      options: ['Priority ID', 'Process ID', 'Program Instance Descriptor', 'Port ID'],
      correctIndex: 1,
      explanation: 'PID stands for Process ID, the unique integer assigned by the operating system kernel to identify an active running process.',
    },
    {
      id: 'q6',
      domain: 'System Diagnostics',
      question: 'On a server with 2 CPU cores, what does a 1-minute Load Average of 6.50 indicate?',
      options: [
        'The CPU is operating at 6.5% utilization',
        'The CPU is severely overloaded, with an average of 4.5 processes queued waiting for available CPU execution time',
        'The server has been running for 6.5 hours',
        '6.5 GB of RAM has been consumed',
      ],
      correctIndex: 1,
      explanation: 'On 2 cores, a load average of 2.0 represents 100% saturation. A load of 6.50 means processes are heavily bottlenecked waiting for CPU cycles.',
    },
    {
      id: 'q7',
      domain: 'Disk Forensics',
      question: 'An application crashes with the error "ENOSPC: no space left on device". Which command checks partition utilization?',
      options: ['free -m', 'df -h', 'uptime', 'ps -ef'],
      correctIndex: 1,
      explanation: 'df -h (disk free, human-readable) displays the percentage of available and used disk space for all mounted filesystems.',
    },
    {
      id: 'q8',
      domain: 'Log Investigation',
      question: 'What does the first line of an application stack trace typically reveal?',
      options: [
        'The IP address of the user who made the request',
        'The exact error exception type and the specific file name and line number where the failure originated',
        'The database password',
        'The server serial number',
      ],
      correctIndex: 1,
      explanation: 'The top of a stack trace specifies the exception message along with the exact source file and line number that triggered the failure.',
    },
    {
      id: 'q9',
      domain: 'Signal Handling',
      question: 'Which signal number is associated with SIGKILL in Linux?',
      options: ['Signal 15', 'Signal 9', 'Signal 1', 'Signal 0'],
      correctIndex: 1,
      explanation: 'SIGKILL is signal 9; SIGTERM is signal 15; SIGHUP is signal 1.',
    },
    {
      id: 'q10',
      domain: 'Troubleshooting Methodology',
      question: 'When testing a hypothesis during an incident, why is it critical to change only ONE variable at a time?',
      options: [
        'Because Linux only allows one command per minute',
        'To definitively know which specific change resolved the incident and avoid introducing new confounding variables',
        'To reduce electricity consumption in the data center',
        'Because terminal text buffers will overflow',
      ],
      correctIndex: 1,
      explanation: 'Changing one variable at a time adheres to the scientific method, ensuring you identify the true root cause without creating new accidental defects.',
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-1',
      question: 'Explain what happens when an application tries to start but crashes with "Error: listen EADDRINUSE: address already in use :::3000". How do you diagnose and fix this?',
      targetRole: 'DevOps / SRE Engineer',
      difficulty: 'Intermediate',
      modelAnswer:
        'EADDRINUSE means another process is already bound to port 3000 on the network interface. To diagnose: 1) Run sudo ss -tulpn | grep 3000 or sudo lsof -i :3000 to identify the PID holding the port. 2) Inspect the process with ps -p <PID> -u to verify whether it is a zombie instance or an intentional service. 3) If it is an orphaned or rogue instance, terminate it gracefully with kill -15 <PID>. 4) Restart the intended service and verify it binds successfully.',
      keyPoints: [
        'Identify process holding port with ss -tulpn or lsof -i.',
        'Inspect PID details before terminating.',
        'Send SIGTERM (15) to release the socket cleanly.',
      ],
      commonMistakes: [
        'Changing the application port randomly instead of freeing the blocked port.',
        'Rebooting the entire server.',
      ],
    },
    {
      id: 'iq-2',
      question: 'Why is "chmod 777" considered an unacceptable practice in cloud environments, and what should you do instead when facing permission errors?',
      targetRole: 'DevOps / Cloud Security',
      difficulty: 'Beginner',
      modelAnswer:
        'chmod 777 grants universal read, write, and execute permissions to everyone, completely violating the Principle of Least Privilege. If a web application with 777 permissions suffers a remote code execution vulnerability, an attacker can modify binaries, inject webshells, or wipe the disk. Instead, you should determine the exact user running the service (e.g. www-data or nodeapp), ensure that specific user or their group owns the directory using chown, and grant minimal permissions like 755 for directories and 644 for files.',
      keyPoints: [
        '777 grants full write/execute to everyone, creating critical security risks.',
        'Enforce Principle of Least Privilege.',
        'Set ownership with chown and use 755/644 standard modes.',
      ],
      commonMistakes: [
        'Claiming 777 is fine if the server is inside a private VPC.',
        'Not explaining the alternative (chown + 755/644).',
      ],
    },
    {
      id: 'iq-3',
      question: 'What is the difference between a Zombie process and an Orphan process in Linux?',
      targetRole: 'Linux / Systems Administrator',
      difficulty: 'Intermediate',
      modelAnswer:
        'An Orphan process is a running process whose parent process terminated before it did; it is immediately adopted by PID 1 (systemd/init), which monitors it until completion. A Zombie process (state Z in ps) is a process that has completed execution and terminated, but its entry remains in the process table because its parent has not yet read its exit status via the wait() system call. Zombies do not consume CPU or RAM, but they consume process table slots. If a parent continuously leaks zombies, the system can run out of available PIDs.',
      keyPoints: [
        'Orphan is still running; adopted by PID 1.',
        'Zombie is dead; waiting for parent to read exit status.',
        'Too many zombies exhaust the system PID space.',
      ],
      commonMistakes: [
        'Thinking you can kill a zombie with kill -9 (zombies are already dead; you must signal the parent).',
        'Confusing orphans with background daemons.',
      ],
    },
    {
      id: 'iq-4',
      question: 'How do you interpret the three numbers in the "load average" line of uptime or top?',
      targetRole: 'Site Reliability Engineer',
      difficulty: 'Intermediate',
      modelAnswer:
        'The three numbers represent the average number of processes in a runnable or uninterruptible sleep state (waiting for CPU or non-interruptible disk I/O) over the last 1 minute, 5 minutes, and 15 minutes. To interpret them, you must compare them against the total number of CPU cores available. On an 8-core CPU, a load average of 8.0 indicates 100% capacity. If the 1-minute load is 16.0 while the 15-minute load is 2.0, the system is experiencing a sudden severe traffic spike.',
      keyPoints: [
        'Averages over 1, 5, and 15 minutes.',
        'Must be evaluated relative to total number of CPU cores.',
        'High uninterruptible load often indicates disk I/O bottlenecks rather than pure CPU.',
      ],
      commonMistakes: [
        'Interpreting load average as a percentage without knowing the core count.',
        'Forgetting that disk I/O wait contributes to load average in Linux.',
      ],
    },
    {
      id: 'iq-5',
      question: 'Walk me through your troubleshooting approach when a microservice in production returns HTTP 500 Internal Server Error.',
      targetRole: 'DevOps / Platform Engineer',
      difficulty: 'Scenario',
      modelAnswer:
        'I follow a structured triage process: 1) Verify the scope: Is the 500 error occurring for all requests or only specific routes (e.g. /checkout)? 2) Check application logs: Tail the active log stream (tail -n 100 app.log) to locate the exact unhandled exception and stack trace. 3) Check system telemetry: Run free -m and df -h to verify the server is not out of memory or disk space. 4) Check dependencies: Verify backend databases and upstream APIs are reachable and healthy. 5) Mitigate immediately: If caused by a recent bad deployment, trigger an automated rollback to the previous stable release. 6) Post-incident: Conduct a blameless postmortem to add regression tests and health checks.',
      keyPoints: [
        'Determine scope and recent change history.',
        'Inspect error logs for stack traces.',
        'Verify system resource limits (RAM, disk) and downstream dependencies.',
        'Prioritize rapid customer mitigation (rollback) before deep code investigation.',
      ],
      commonMistakes: [
        'Starting by editing code directly on the production server.',
        'Failing to consider rolling back to restore customer service immediately.',
      ],
    },
  ],

  pdfDownloadUrl: '/devops/day-3-linux-permissions-processes-logs.pdf',
  pdfFileName: 'day-3-linux-permissions-processes-logs.pdf',
};
