export interface FhsDirectoryInfo {
  path: string;
  name: string;
  category: 'System' | 'Configuration' | 'Runtime' | 'User';
  purpose: string;
  practicalExample: string;
  commonFiles: string[];
}

export const FHS_DIRECTORIES: FhsDirectoryInfo[] = [
  {
    path: '/home',
    name: 'User Home Directories',
    category: 'User',
    purpose: 'Stores personal files, documents, project code, and user-specific configurations for non-privileged accounts.',
    practicalExample: 'When you log in via SSH as user "devops", your initial shell session opens in /home/devops with full write permissions.',
    commonFiles: ['/home/devops/.bashrc', '/home/devops/.ssh/authorized_keys', '/home/devops/projects/'],
  },
  {
    path: '/etc',
    name: 'System-Wide Configuration',
    category: 'Configuration',
    purpose: 'Contains all host-specific, plain-text configuration files and startup scripts for system services.',
    practicalExample: 'When configuring an Nginx web server or setting DNS nameservers, you edit /etc/nginx/nginx.conf and /etc/resolv.conf.',
    commonFiles: ['/etc/hosts', '/etc/nginx/nginx.conf', '/etc/ssh/sshd_config', '/etc/passwd'],
  },
  {
    path: '/var',
    name: 'Variable Runtime Data',
    category: 'Runtime',
    purpose: 'Stores runtime data expected to grow and change dynamically during system operation, including logs, mail, and spools.',
    practicalExample: 'Databases like MySQL store their actual table data in /var/lib/mysql, and web servers store static assets in /var/www/html.',
    commonFiles: ['/var/log/', '/var/www/', '/var/lib/docker/', '/var/run/'],
  },
  {
    path: '/var/log',
    name: 'System & Application Logs',
    category: 'Runtime',
    purpose: 'The central repository where the operating system and background services append log messages, audit trails, and errors.',
    practicalExample: 'The first place you look when troubleshooting an HTTP 502 error is /var/log/nginx/error.log.',
    commonFiles: ['/var/log/syslog', '/var/log/auth.log', '/var/log/nginx/access.log', '/var/log/dpkg.log'],
  },
  {
    path: '/tmp',
    name: 'Temporary Scratch Storage',
    category: 'System',
    purpose: 'A shared scratchpad for temporary files created by running programs. Typically wiped on reboot or by automated cleanup daemons.',
    practicalExample: 'CI pipeline scripts download archive tarballs to /tmp/build_artifact.tar.gz before unpacking them.',
    commonFiles: ['/tmp/sess_abc123', '/tmp/npm-cache/', '/tmp/backup.sql'],
  },
  {
    path: '/usr',
    name: 'User System Resources & Binaries',
    category: 'System',
    purpose: 'Contains read-only user utilities, shared libraries, documentation, and standard binary executables.',
    practicalExample: 'When you execute "python3" or "git", the system runs the binary located in /usr/bin/python3 or /usr/bin/git.',
    commonFiles: ['/usr/bin/node', '/usr/bin/git', '/usr/lib/', '/usr/share/doc/'],
  },
  {
    path: '/opt',
    name: 'Optional Third-Party Software',
    category: 'System',
    purpose: 'Reserved for self-contained, proprietary or third-party add-on software packages that do not follow standard distribution layouts.',
    practicalExample: 'Enterprise monitoring agents like Datadog, Splunk, or Google Cloud Ops Agent install their files under /opt.',
    commonFiles: ['/opt/datadog-agent/', '/opt/google/chrome/', '/opt/gitlab/'],
  },
];

// Initial Virtual Filesystem Node structure for Simulated Terminal
export interface VFSNode {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  children?: Record<string, VFSNode>;
}

export const INITIAL_VFS: VFSNode = {
  name: '',
  type: 'dir',
  children: {
    home: {
      name: 'home',
      type: 'dir',
      children: {
        devops: {
          name: 'devops',
          type: 'dir',
          children: {
            workspace: {
              name: 'workspace',
              type: 'dir',
              children: {
                'ecommerce-api': {
                  name: 'ecommerce-api',
                  type: 'dir',
                  children: {
                    'README.md': {
                      name: 'README.md',
                      type: 'file',
                      content: '# RootShop E-Commerce API\n\nMicroservice backend for user authentication, product catalog, and checkout processing.\n\nRun `npm install` followed by `npm start` to launch.\nConfiguration is managed via environment variables defined in .env.\n',
                    },
                    'package.json': {
                      name: 'package.json',
                      type: 'file',
                      content: '{\n  "name": "ecommerce-api",\n  "version": "1.0.0",\n  "main": "server.js",\n  "scripts": {\n    "start": "node server.js"\n  }\n}\n',
                    },
                    'server.js': {
                      name: 'server.js',
                      type: 'file',
                      content: 'const express = require("express");\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get("/health", (req, res) => res.json({ status: "healthy" }));\napp.listen(PORT, () => console.log(`API running on port ${PORT}`));\n',
                    },
                    '.env.example': {
                      name: '.env.example',
                      type: 'file',
                      content: 'PORT=3000\nNODE_ENV=production\nDB_HOST=127.0.0.1\nDB_PORT=5432\nAPI_SECRET=change_me_in_production\n',
                    },
                    src: {
                      name: 'src',
                      type: 'dir',
                      children: {
                        'auth.js': {
                          name: 'auth.js',
                          type: 'file',
                          content: '// Authentication middleware and JWT validation routines\nmodule.exports = { verifyToken: () => true };\n',
                        },
                        'cart.js': {
                          name: 'cart.js',
                          type: 'file',
                          content: '// Shopping cart aggregation logic\nmodule.exports = { calculateTotal: (items) => 100 };\n',
                        },
                      },
                    },
                  },
                },
              },
            },
            notes: {
              name: 'notes',
              type: 'dir',
              children: {
                'todo.txt': {
                  name: 'todo.txt',
                  type: 'file',
                  content: '1. Set up CI pipeline\n2. Configure Dockerfile\n3. Audit Linux permissions\n',
                },
              },
            },
          },
        },
      },
    },
    etc: {
      name: 'etc',
      type: 'dir',
      children: {
        hosts: {
          name: 'hosts',
          type: 'file',
          content: '127.0.0.1   localhost rootaccess-devops\n::1         localhost ip6-localhost ip6-loopback\n',
        },
        nginx: {
          name: 'nginx',
          type: 'dir',
          children: {
            'nginx.conf': {
              name: 'nginx.conf',
              type: 'file',
              content: 'events { worker_connections 1024; }\nhttp {\n  server {\n    listen 80;\n    location / { proxy_pass http://localhost:3000; }\n  }\n}\n',
            },
          },
        },
      },
    },
    var: {
      name: 'var',
      type: 'dir',
      children: {
        log: {
          name: 'log',
          type: 'dir',
          children: {
            'app.log': {
              name: 'app.log',
              type: 'file',
              content: '2026-10-26T10:00:01Z [INFO] Server initialized on port 3000\n2026-10-26T10:05:22Z [INFO] Database connected successfully\n2026-10-26T10:14:02Z [WARN] High memory usage detected: 78%\n2026-10-26T10:20:15Z [INFO] Health check probe: 200 OK\n',
            },
          },
        },
      },
    },
    tmp: {
      name: 'tmp',
      type: 'dir',
      children: {},
    },
  },
};

export interface CommandChallenge {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  hint: string;
  validationCheck: (cwd: string, vfs: VFSNode) => boolean;
  successMessage: string;
}
