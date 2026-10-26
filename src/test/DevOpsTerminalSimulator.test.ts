import { describe, it, expect } from 'vitest';
import { INITIAL_VFS } from '../data/devopsDay2Activities';
import {
  cloneVfs,
  resolvePathSegments,
  pathSegmentsToString,
  getNodeBySegments,
  executeTerminalCommand,
} from '../services/devopsTerminalSimulator';

describe('DevOps Terminal Simulator Virtual Filesystem & Commands', () => {
  const initialCwd = '/home/devops/workspace/ecommerce-api';

  it('initializes with default ecommerce-api workspace and initial files', () => {
    const vfs = cloneVfs(INITIAL_VFS);
    expect(vfs.children?.home).toBeDefined();

    const node = getNodeBySegments(vfs, ['home', 'devops', 'workspace', 'ecommerce-api', 'server.js']);
    expect(node).toBeDefined();
    expect(node?.type).toBe('file');
    expect(node?.content).toContain('express');
  });

  it('resolves relative, home, parent, and absolute path segments accurately', () => {
    let segs = resolvePathSegments(initialCwd, '.');
    expect(pathSegmentsToString(segs)).toBe(initialCwd);

    segs = resolvePathSegments(initialCwd, '..');
    expect(pathSegmentsToString(segs)).toBe('/home/devops/workspace');

    segs = resolvePathSegments(initialCwd, '../..');
    expect(pathSegmentsToString(segs)).toBe('/home/devops');

    segs = resolvePathSegments(initialCwd, '~');
    expect(pathSegmentsToString(segs)).toBe('/home/devops');

    segs = resolvePathSegments(initialCwd, '~/notes');
    expect(pathSegmentsToString(segs)).toBe('/home/devops/notes');

    segs = resolvePathSegments(initialCwd, '/var/log');
    expect(pathSegmentsToString(segs)).toBe('/var/log');
  });

  it('executes pwd and reports current working directory', () => {
    const vfs = cloneVfs(INITIAL_VFS);
    const res = executeTerminalCommand('pwd', initialCwd, vfs);
    expect(res.output).toBe(initialCwd);
    expect(res.isError).toBeFalsy();
  });

  it('executes cd to navigate between directories', () => {
    let vfs = cloneVfs(INITIAL_VFS);
    let cwd = initialCwd;

    // cd src
    let res = executeTerminalCommand('cd src', cwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.newCwd).toBe('/home/devops/workspace/ecommerce-api/src');
    cwd = res.newCwd!;

    // cd ..
    res = executeTerminalCommand('cd ..', cwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.newCwd).toBe('/home/devops/workspace/ecommerce-api');
    cwd = res.newCwd!;

    // cd ~
    res = executeTerminalCommand('cd ~', cwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.newCwd).toBe('/home/devops');
    cwd = res.newCwd!;

    // cd to non-existent folder
    res = executeTerminalCommand('cd nonexistent_dir', cwd, vfs);
    expect(res.isError).toBe(true);
    expect(res.output).toContain('No such file or directory');
  });

  it('executes ls and ls -la with proper directory contents', () => {
    const vfs = cloneVfs(INITIAL_VFS);
    const res = executeTerminalCommand('ls', initialCwd, vfs);
    expect(res.output).toContain('server.js');
    expect(res.output).toContain('package.json');
    expect(res.output).toContain('src');

    const resLa = executeTerminalCommand('ls -la', initialCwd, vfs);
    expect(resLa.output).toContain('.env.example');
    expect(resLa.output).toContain('drwxr-xr-x');
  });

  it('executes mkdir and mkdir -p to create new directories', () => {
    let vfs = cloneVfs(INITIAL_VFS);
    let cwd = initialCwd;

    // mkdir telemetry
    let res = executeTerminalCommand('mkdir telemetry', cwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.newVfs).toBeDefined();
    vfs = res.newVfs!;

    const node = getNodeBySegments(vfs, ['home', 'devops', 'workspace', 'ecommerce-api', 'telemetry']);
    expect(node).toBeDefined();
    expect(node?.type).toBe('dir');

    // mkdir -p nested
    res = executeTerminalCommand('mkdir -p monitoring/prometheus/rules', cwd, vfs);
    expect(res.isError).toBeFalsy();
    vfs = res.newVfs!;

    const nestedNode = getNodeBySegments(vfs, ['home', 'devops', 'workspace', 'ecommerce-api', 'monitoring', 'prometheus', 'rules']);
    expect(nestedNode).toBeDefined();
    expect(nestedNode?.type).toBe('dir');
  });

  it('executes touch to create empty files or update timestamps', () => {
    let vfs = cloneVfs(INITIAL_VFS);
    const res = executeTerminalCommand('touch healthcheck.sh', initialCwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.newVfs).toBeDefined();

    const node = getNodeBySegments(res.newVfs!, ['home', 'devops', 'workspace', 'ecommerce-api', 'healthcheck.sh']);
    expect(node).toBeDefined();
    expect(node?.type).toBe('file');
  });

  it('executes cat, head, and tail on text files', () => {
    const vfs = cloneVfs(INITIAL_VFS);
    const catRes = executeTerminalCommand('cat .env.example', initialCwd, vfs);
    expect(catRes.output).toContain('PORT=3000');
    expect(catRes.output).toContain('DB_HOST=127.0.0.1');

    const headRes = executeTerminalCommand('head -n 2 .env.example', initialCwd, vfs);
    expect(headRes.isError).toBeFalsy();
    expect(headRes.output.split('\n').length).toBe(2);

    const tailRes = executeTerminalCommand('tail -n 2 .env.example', initialCwd, vfs);
    expect(tailRes.isError).toBeFalsy();
    expect(tailRes.output.split('\n').length).toBe(2);
  });

  it('executes cp to copy files across locations', () => {
    let vfs = cloneVfs(INITIAL_VFS);
    const res = executeTerminalCommand('cp .env.example .env.production', initialCwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.newVfs).toBeDefined();

    const copyNode = getNodeBySegments(res.newVfs!, ['home', 'devops', 'workspace', 'ecommerce-api', '.env.production']);
    expect(copyNode).toBeDefined();
    expect(copyNode?.content).toContain('PORT=3000');
  });

  it('executes mv to rename and move files', () => {
    let vfs = cloneVfs(INITIAL_VFS);
    const res = executeTerminalCommand('mv README.md ARCHITECTURE.md', initialCwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.newVfs).toBeDefined();

    const oldNode = getNodeBySegments(res.newVfs!, ['home', 'devops', 'workspace', 'ecommerce-api', 'README.md']);
    expect(oldNode).toBeNull();

    const newNode = getNodeBySegments(res.newVfs!, ['home', 'devops', 'workspace', 'ecommerce-api', 'ARCHITECTURE.md']);
    expect(newNode).toBeDefined();
  });

  it('executes rm to remove files and rm -r to remove directories', () => {
    let vfs = cloneVfs(INITIAL_VFS);
    // Remove a file
    let res = executeTerminalCommand('rm README.md', initialCwd, vfs);
    expect(res.isError).toBeFalsy();
    vfs = res.newVfs!;

    const removedFile = getNodeBySegments(vfs, ['home', 'devops', 'workspace', 'ecommerce-api', 'README.md']);
    expect(removedFile).toBeNull();

    // Removing directory without -r should error
    res = executeTerminalCommand('rm src', initialCwd, vfs);
    expect(res.isError).toBe(true);
    expect(res.output).toContain('Is a directory');

    // Removing directory with -r should succeed
    res = executeTerminalCommand('rm -r src', initialCwd, vfs);
    expect(res.isError).toBeFalsy();
    const removedDir = getNodeBySegments(res.newVfs!, ['home', 'devops', 'workspace', 'ecommerce-api', 'src']);
    expect(removedDir).toBeNull();
  });

  it('provides manual documentation with man command', () => {
    const vfs = cloneVfs(INITIAL_VFS);
    const res = executeTerminalCommand('man ls', initialCwd, vfs);
    expect(res.isError).toBeFalsy();
    expect(res.output).toContain('LS(1)');

    const unknownRes = executeTerminalCommand('man nonexistent_tool', initialCwd, vfs);
    expect(unknownRes.isError).toBe(true);
    expect(unknownRes.output).toContain('No manual entry');
  });

  it('handles help and clear commands', () => {
    const vfs = cloneVfs(INITIAL_VFS);
    const helpRes = executeTerminalCommand('help', initialCwd, vfs);
    expect(helpRes.output).toContain('Supported Commands');

    const clearRes = executeTerminalCommand('clear', initialCwd, vfs);
    expect(clearRes.output).toBe('__CLEAR__');
  });

  it('returns helpful error for unsupported or invalid commands', () => {
    const vfs = cloneVfs(INITIAL_VFS);
    const res = executeTerminalCommand('sl', initialCwd, vfs);
    expect(res.isError).toBe(true);
    expect(res.output).toContain('command not found');
  });
});
