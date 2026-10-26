export interface SimulatedProcess {
  pid: number;
  ppid: number;
  user: string;
  cpu: number;
  mem: number;
  stat: string;
  command: string;
  isAnomaly?: boolean;
  anomalyReason?: string;
}

export const SIMULATED_PROCESSES: SimulatedProcess[] = [
  { pid: 1, ppid: 0, user: 'root', cpu: 0.1, mem: 0.4, stat: 'Ss', command: '/sbin/init splash' },
  { pid: 142, ppid: 1, user: 'root', cpu: 0.0, mem: 0.3, stat: 'Ss', command: '/lib/systemd/systemd-journald' },
  { pid: 489, ppid: 1, user: 'syslog', cpu: 0.0, mem: 0.2, stat: 'Ssl', command: '/usr/sbin/rsyslogd -n -iNONE' },
  { pid: 612, ppid: 1, user: 'root', cpu: 0.0, mem: 0.5, stat: 'Ss', command: 'sshd: /usr/sbin/sshd -D [listener]' },
  { pid: 820, ppid: 1, user: 'www-data', cpu: 0.4, mem: 1.2, stat: 'S', command: 'nginx: worker process' },
  { pid: 821, ppid: 1, user: 'www-data', cpu: 0.3, mem: 1.1, stat: 'S', command: 'nginx: worker process' },
  { pid: 1204, ppid: 1, user: 'nodeapp', cpu: 2.1, mem: 4.8, stat: 'Sl', command: 'node /app/server.js' },
  {
    pid: 1840,
    ppid: 1204,
    user: 'nodeapp',
    cpu: 98.4,
    mem: 38.6,
    stat: 'R+',
    command: 'node /app/workers/pdfExportWorker.js --unbounded-loop',
    isAnomaly: true,
    anomalyReason: 'Uncontrolled CPU spike (98.4%) and high memory consumption caused by an infinite loop in a background PDF worker.',
  },
  { pid: 2110, ppid: 612, user: 'devops', cpu: 0.0, mem: 0.8, stat: 'Ss', command: 'sshd: devops@pts/0' },
  { pid: 2115, ppid: 2110, user: 'devops', cpu: 0.0, mem: 0.5, stat: 'S', command: '-bash' },
  { pid: 2240, ppid: 2115, user: 'devops', cpu: 0.1, mem: 0.4, stat: 'R+', command: 'ps aux' },
];

export interface SimulatedLogLine {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  component: string;
  message: string;
  isRootCause?: boolean;
}

export const SIMULATED_INCIDENT_LOGS: SimulatedLogLine[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-26T10:00:00.120Z',
    level: 'INFO',
    component: 'systemd[1]',
    message: 'Starting RootShop E-Commerce API Service (rootshop-api.service)...',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-26T10:00:00.450Z',
    level: 'INFO',
    component: 'node[1204]',
    message: 'Node.js runtime v20.14.0 initialized. PID: 1204, User: nodeapp (UID: 1002)',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-26T10:00:00.612Z',
    level: 'INFO',
    component: 'rootshop-api',
    message: 'Reading environment configuration file from /etc/ecommerce/config.json...',
  },
  {
    id: 'log-4',
    timestamp: '2026-10-26T10:00:00.618Z',
    level: 'ERROR',
    component: 'rootshop-api',
    message: 'EACCES: permission denied, open \'/etc/ecommerce/config.json\'',
    isRootCause: true,
  },
  {
    id: 'log-5',
    timestamp: '2026-10-26T10:00:00.620Z',
    level: 'FATAL',
    component: 'rootshop-api',
    message: 'Unhandled Exception: ConfigLoadFailure: Cannot bootstrap application without database credentials',
  },
  {
    id: 'log-6',
    timestamp: '2026-10-26T10:00:00.625Z',
    level: 'FATAL',
    component: 'rootshop-api',
    message: 'Stack Trace:\n    at Object.openSync (fs.js:498:3)\n    at readConfig (/app/lib/config.js:14:18)\n    at Object.<anonymous> (/app/server.js:8:5)',
  },
  {
    id: 'log-7',
    timestamp: '2026-10-26T10:00:00.800Z',
    level: 'WARN',
    component: 'systemd[1]',
    message: 'rootshop-api.service: Main process exited, code=exited, status=1/FAILURE',
  },
  {
    id: 'log-8',
    timestamp: '2026-10-26T10:00:00.802Z',
    level: 'ERROR',
    component: 'systemd[1]',
    message: 'Failed to start RootShop E-Commerce API Service. Unit entered failed state.',
  },
  {
    id: 'log-9',
    timestamp: '2026-10-26T10:00:05.100Z',
    level: 'ERROR',
    component: 'nginx[820]',
    message: '127.0.0.1 - - [26/Oct/2026:10:00:05 +0000] "GET /api/products HTTP/1.1" 502 559 "-" "curl/7.88.1"',
  },
];
