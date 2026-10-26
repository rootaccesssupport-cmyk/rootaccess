import type { VFSNode } from '../data/devopsDay2Activities';

export interface TerminalExecutionResult {
  output: string;
  isError?: boolean;
  newCwd?: string;
  newVfs?: VFSNode;
}

// Deep clone a VFS tree
export function cloneVfs(node: VFSNode): VFSNode {
  const copy: VFSNode = {
    name: node.name,
    type: node.type,
    content: node.content,
  };
  if (node.children) {
    copy.children = {};
    for (const [key, child] of Object.entries(node.children)) {
      copy.children[key] = cloneVfs(child);
    }
  }
  return copy;
}

// Resolve a path string to an array of path segments starting from root
export function resolvePathSegments(cwd: string, targetPath: string): string[] {
  let segments: string[] = [];

  if (targetPath.startsWith('/')) {
    // Absolute path
    segments = targetPath.split('/').filter(Boolean);
  } else if (targetPath.startsWith('~')) {
    // Home path
    const homeSegments = ['home', 'devops'];
    const rest = targetPath.slice(1).split('/').filter(Boolean);
    segments = [...homeSegments, ...rest];
  } else {
    // Relative path
    const base = cwd.split('/').filter(Boolean);
    const parts = targetPath.split('/').filter(Boolean);
    segments = [...base];
    for (const part of parts) {
      if (part === '.') {
        continue;
      } else if (part === '..') {
        if (segments.length > 0) {
          segments.pop();
        }
      } else {
        segments.push(part);
      }
    }
  }

  // Resolve any remaining '..' in the absolute segments
  const resolved: string[] = [];
  for (const seg of segments) {
    if (seg === '.') continue;
    if (seg === '..') {
      if (resolved.length > 0) resolved.pop();
    } else {
      resolved.push(seg);
    }
  }
  return resolved;
}

export function pathSegmentsToString(segments: string[]): string {
  if (segments.length === 0) return '/';
  return '/' + segments.join('/');
}

// Traverse VFS to find a node by segments
export function getNodeBySegments(root: VFSNode, segments: string[]): VFSNode | null {
  let current: VFSNode = root;
  for (const seg of segments) {
    if (current.type !== 'dir' || !current.children || !current.children[seg]) {
      return null;
    }
    current = current.children[seg];
  }
  return current;
}

// Execute a command string in the virtual terminal
export function executeTerminalCommand(
  rawInput: string,
  currentCwd: string,
  currentVfs: VFSNode,
  previousCwd = '/home/devops'
): TerminalExecutionResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: '' };
  }

  const parts = trimmed.split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  // Parse flags vs arguments
  const flags = args.filter((a) => a.startsWith('-'));
  const positionalArgs = args.filter((a) => !a.startsWith('-'));

  const vfsCopy = cloneVfs(currentVfs);

  switch (command) {
    case 'pwd': {
      return { output: currentCwd };
    }

    case 'help': {
      return {
        output: [
          'RootAccess Simulated Linux Shell — Supported Commands:',
          '  pwd              - Print current working directory',
          '  ls [-l -a -la]   - List files and directories in path',
          '  cd <path>        - Change working directory (.., ~, /, relative, absolute)',
          '  mkdir [-p] <dir> - Create one or more new directories',
          '  touch <file>     - Create an empty file or update timestamp',
          '  cat <file>       - Display entire contents of file',
          '  head [-n N] file - Display first N lines of file (default: 10)',
          '  tail [-n N] file - Display last N lines of file (default: 10)',
          '  cp [-r] src dst  - Copy file or folder to destination',
          '  mv src dst       - Move or rename file/folder',
          '  rm [-r -f] target- Remove file or folder',
          '  man <command>    - View manual page for command',
          '  clear            - Clear terminal screen',
        ].join('\n'),
      };
    }

    case 'clear': {
      return { output: '__CLEAR__' };
    }

    case 'man': {
      if (positionalArgs.length === 0) {
        return { output: 'What manual page do you want?\nFor example, try "man ls" or "man pwd".', isError: true };
      }
      const target = positionalArgs[0];
      const manuals: Record<string, string> = {
        ls: 'LS(1)                       User Commands                      LS(1)\n\nNAME\n       ls - list directory contents\n\nSYNOPSIS\n       ls [OPTION]... [FILE]...\n\nDESCRIPTION\n       List information about the FILEs (the current directory by default).\n\n       -a, --all\n              do not ignore entries starting with .\n       -l\n              use a long listing format\n       -h, --human-readable\n              with -l, print human readable sizes (e.g., 1K 234M 2G)\n\nRootAccess Linux Reference (Press q to exit)',
        cd: 'CD(1)                       User Commands                      CD(1)\n\nNAME\n       cd - change the shell working directory\n\nSYNOPSIS\n       cd [dir]\n\nDESCRIPTION\n       Change the current directory to dir. The default dir is the value of the\n       HOME shell variable (~). "cd .." moves up one directory level.',
        pwd: 'PWD(1)                      User Commands                     PWD(1)\n\nNAME\n       pwd - print name of current/working directory\n\nSYNOPSIS\n       pwd\n\nDESCRIPTION\n       Print the full absolute pathname of the current working directory.',
        mkdir: 'MKDIR(1)                    User Commands                   MKDIR(1)\n\nNAME\n       mkdir - make directories\n\nSYNOPSIS\n       mkdir [OPTION]... DIRECTORY...\n\nDESCRIPTION\n       Create the DIRECTORY(ies), if they do not already exist.\n\n       -p, --parents\n              no error if existing, make parent directories as needed',
        rm: 'RM(1)                       User Commands                      RM(1)\n\nNAME\n       rm - remove files or directories\n\nSYNOPSIS\n       rm [OPTION]... [FILE]...\n\nDESCRIPTION\n       rm removes each specified file. By default, it does not remove directories.\n\n       -r, -R, --recursive\n              remove directories and their contents recursively\n       -f, --force\n              ignore nonexistent files and arguments, never prompt',
        cat: 'CAT(1)                      User Commands                     CAT(1)\n\nNAME\n       cat - concatenate files and print on the standard output\n\nSYNOPSIS\n       cat [OPTION]... [FILE]...\n\nDESCRIPTION\n       Concatenate FILE(s) to standard output.',
      };

      if (!manuals[target]) {
        return { output: `No manual entry for ${target}.\nTry: ls, cd, pwd, mkdir, rm, cat.`, isError: true };
      }
      return { output: manuals[target] };
    }

    case 'cd': {
      let targetPath = positionalArgs[0] || '~';
      if (targetPath === '-') {
        targetPath = previousCwd;
      }

      const segments = resolvePathSegments(currentCwd, targetPath);
      const targetNode = getNodeBySegments(vfsCopy, segments);

      if (!targetNode) {
        return { output: `bash: cd: ${targetPath}: No such file or directory`, isError: true };
      }
      if (targetNode.type !== 'dir') {
        return { output: `bash: cd: ${targetPath}: Not a directory`, isError: true };
      }

      const newCwd = pathSegmentsToString(segments);
      return {
        output: '',
        newCwd,
      };
    }

    case 'ls': {
      const isLong = flags.some((f) => f.includes('l'));
      const isAll = flags.some((f) => f.includes('a'));
      const targetPath = positionalArgs[0] || '.';

      const segments = resolvePathSegments(currentCwd, targetPath);
      const targetNode = getNodeBySegments(vfsCopy, segments);

      if (!targetNode) {
        return { output: `ls: cannot access '${targetPath}': No such file or directory`, isError: true };
      }

      if (targetNode.type === 'file') {
        if (isLong) {
          return { output: `-rw-r--r-- 1 devops devops ${targetNode.content?.length || 0} Oct 26 10:00 ${targetNode.name}` };
        }
        return { output: targetNode.name };
      }

      const children = targetNode.children || {};
      const entries = Object.keys(children).sort();

      const filteredEntries = isAll ? ['.', '..', ...entries] : entries.filter((e) => !e.startsWith('.'));

      if (filteredEntries.length === 0) {
        return { output: '' };
      }

      if (isLong) {
        const lines = filteredEntries.map((name) => {
          if (name === '.' || name === '..') {
            return `drwxr-xr-x 2 devops devops 4096 Oct 26 10:00 ${name}`;
          }
          const item = children[name];
          if (item?.type === 'dir') {
            return `drwxr-xr-x 2 devops devops 4096 Oct 26 10:00 ${name}/`;
          }
          const size = item?.content?.length || 0;
          return `-rw-r--r-- 1 devops devops ${size.toString().padStart(4, ' ')} Oct 26 10:00 ${name}`;
        });
        return { output: lines.join('\n') };
      }

      return {
        output: filteredEntries
          .map((name) => (children[name]?.type === 'dir' ? `${name}/` : name))
          .join('  '),
      };
    }

    case 'mkdir': {
      if (positionalArgs.length === 0) {
        return { output: 'mkdir: missing operand\nTry \'mkdir --help\' for more information.', isError: true };
      }

      const hasP = flags.some((f) => f.includes('p'));
      let modified = false;

      for (const target of positionalArgs) {
        const segments = resolvePathSegments(currentCwd, target);
        if (segments.length === 0) {
          return { output: 'mkdir: cannot create directory \'/\': File exists', isError: true };
        }

        const parentSegments = segments.slice(0, -1);
        const newDirName = segments[segments.length - 1];

        if (hasP) {
          // Build parents progressively
          let curr = vfsCopy;
          for (const seg of segments) {
            if (!curr.children) curr.children = {};
            if (!curr.children[seg]) {
              curr.children[seg] = { name: seg, type: 'dir', children: {} };
              modified = true;
            } else if (curr.children[seg].type !== 'dir') {
              return { output: `mkdir: cannot create directory '${target}': Not a directory`, isError: true };
            }
            curr = curr.children[seg];
          }
        } else {
          const parentNode = getNodeBySegments(vfsCopy, parentSegments);
          if (!parentNode) {
            return {
              output: `mkdir: cannot create directory '${target}': No such file or directory`,
              isError: true,
            };
          }
          if (parentNode.type !== 'dir') {
            return { output: `mkdir: cannot create directory '${target}': Not a directory`, isError: true };
          }
          if (parentNode.children && parentNode.children[newDirName]) {
            return { output: `mkdir: cannot create directory '${target}': File exists`, isError: true };
          }
          if (!parentNode.children) parentNode.children = {};
          parentNode.children[newDirName] = {
            name: newDirName,
            type: 'dir',
            children: {},
          };
          modified = true;
        }
      }

      return {
        output: '',
        newVfs: modified ? vfsCopy : undefined,
      };
    }

    case 'touch': {
      if (positionalArgs.length === 0) {
        return { output: 'touch: missing file operand\nTry \'touch --help\' for more information.', isError: true };
      }

      for (const target of positionalArgs) {
        const segments = resolvePathSegments(currentCwd, target);
        const parentSegments = segments.slice(0, -1);
        const fileName = segments[segments.length - 1];

        const parentNode = getNodeBySegments(vfsCopy, parentSegments);
        if (!parentNode || parentNode.type !== 'dir') {
          return { output: `touch: cannot touch '${target}': No such file or directory`, isError: true };
        }

        if (!parentNode.children) parentNode.children = {};
        if (!parentNode.children[fileName]) {
          parentNode.children[fileName] = {
            name: fileName,
            type: 'file',
            content: '',
          };
        }
      }

      return {
        output: '',
        newVfs: vfsCopy,
      };
    }

    case 'cat': {
      if (positionalArgs.length === 0) {
        return { output: 'cat: missing file operand', isError: true };
      }
      const target = positionalArgs[0];
      const segments = resolvePathSegments(currentCwd, target);
      const node = getNodeBySegments(vfsCopy, segments);

      if (!node) {
        return { output: `cat: ${target}: No such file or directory`, isError: true };
      }
      if (node.type === 'dir') {
        return { output: `cat: ${target}: Is a directory`, isError: true };
      }
      return { output: node.content || '' };
    }

    case 'head': {
      if (positionalArgs.length === 0) {
        return { output: 'head: missing file operand', isError: true };
      }
      let linesCount = 10;
      const nFlagIdx = args.findIndex((a) => a === '-n');
      if (nFlagIdx !== -1 && args[nFlagIdx + 1]) {
        linesCount = parseInt(args[nFlagIdx + 1], 10) || 10;
      }

      const target = positionalArgs[positionalArgs.length - 1];
      const segments = resolvePathSegments(currentCwd, target);
      const node = getNodeBySegments(vfsCopy, segments);

      if (!node) {
        return { output: `head: cannot open '${target}' for reading: No such file or directory`, isError: true };
      }
      if (node.type === 'dir') {
        return { output: `head: error reading '${target}': Is a directory`, isError: true };
      }

      const lines = (node.content || '').split('\n');
      return { output: lines.slice(0, linesCount).join('\n') };
    }

    case 'tail': {
      if (positionalArgs.length === 0) {
        return { output: 'tail: missing file operand', isError: true };
      }
      let linesCount = 10;
      const nFlagIdx = args.findIndex((a) => a === '-n');
      if (nFlagIdx !== -1 && args[nFlagIdx + 1]) {
        linesCount = parseInt(args[nFlagIdx + 1], 10) || 10;
      }

      const target = positionalArgs[positionalArgs.length - 1];
      const segments = resolvePathSegments(currentCwd, target);
      const node = getNodeBySegments(vfsCopy, segments);

      if (!node) {
        return { output: `tail: cannot open '${target}' for reading: No such file or directory`, isError: true };
      }
      if (node.type === 'dir') {
        return { output: `tail: error reading '${target}': Is a directory`, isError: true };
      }

      const lines = (node.content || '').split('\n').filter((l, idx, arr) => idx < arr.length - 1 || l.trim() !== '');
      const start = Math.max(0, lines.length - linesCount);
      return { output: lines.slice(start).join('\n') };
    }

    case 'cp': {
      if (positionalArgs.length < 2) {
        return { output: 'cp: missing destination file operand after source', isError: true };
      }
      const isRecursive = flags.some((f) => f.includes('r') || f.includes('R'));
      const srcPath = positionalArgs[0];
      const dstPath = positionalArgs[1];

      const srcSegments = resolvePathSegments(currentCwd, srcPath);
      const srcNode = getNodeBySegments(vfsCopy, srcSegments);

      if (!srcNode) {
        return { output: `cp: cannot stat '${srcPath}': No such file or directory`, isError: true };
      }

      if (srcNode.type === 'dir' && !isRecursive) {
        return { output: `cp: -r not specified; omitting directory '${srcPath}'`, isError: true };
      }

      const dstSegments = resolvePathSegments(currentCwd, dstPath);
      const dstParent = dstSegments.slice(0, -1);
      const dstTargetName = dstSegments[dstSegments.length - 1];

      const existingDst = getNodeBySegments(vfsCopy, dstSegments);
      if (existingDst && existingDst.type === 'dir') {
        // Copy into existing dir
        if (!existingDst.children) existingDst.children = {};
        existingDst.children[srcNode.name] = cloneVfs(srcNode);
      } else {
        const parentNode = getNodeBySegments(vfsCopy, dstParent);
        if (!parentNode || parentNode.type !== 'dir') {
          return { output: `cp: cannot create regular file '${dstPath}': No such file or directory`, isError: true };
        }
        if (!parentNode.children) parentNode.children = {};
        const copied = cloneVfs(srcNode);
        copied.name = dstTargetName;
        parentNode.children[dstTargetName] = copied;
      }

      return {
        output: '',
        newVfs: vfsCopy,
      };
    }

    case 'mv': {
      if (positionalArgs.length < 2) {
        return { output: 'mv: missing destination file operand after source', isError: true };
      }
      const srcPath = positionalArgs[0];
      const dstPath = positionalArgs[1];

      const srcSegments = resolvePathSegments(currentCwd, srcPath);
      const srcParentSegments = srcSegments.slice(0, -1);
      const srcName = srcSegments[srcSegments.length - 1];

      const srcParentNode = getNodeBySegments(vfsCopy, srcParentSegments);
      const srcNode = getNodeBySegments(vfsCopy, srcSegments);

      if (!srcNode || !srcParentNode || !srcParentNode.children) {
        return { output: `mv: cannot stat '${srcPath}': No such file or directory`, isError: true };
      }

      const dstSegments = resolvePathSegments(currentCwd, dstPath);
      const existingDst = getNodeBySegments(vfsCopy, dstSegments);

      if (existingDst && existingDst.type === 'dir') {
        // Move into directory
        if (!existingDst.children) existingDst.children = {};
        existingDst.children[srcName] = srcNode;
        delete srcParentNode.children[srcName];
      } else {
        // Rename
        const dstParentSegments = dstSegments.slice(0, -1);
        const dstName = dstSegments[dstSegments.length - 1];
        const dstParentNode = getNodeBySegments(vfsCopy, dstParentSegments);

        if (!dstParentNode || dstParentNode.type !== 'dir') {
          return { output: `mv: cannot move '${srcPath}' to '${dstPath}': No such file or directory`, isError: true };
        }
        if (!dstParentNode.children) dstParentNode.children = {};

        const movedNode = cloneVfs(srcNode);
        movedNode.name = dstName;
        dstParentNode.children[dstName] = movedNode;
        delete srcParentNode.children[srcName];
      }

      return {
        output: '',
        newVfs: vfsCopy,
      };
    }

    case 'rm': {
      if (positionalArgs.length === 0) {
        return { output: 'rm: missing operand\nTry \'rm --help\' for more information.', isError: true };
      }
      const isRecursive = flags.some((f) => f.includes('r') || f.includes('R'));

      for (const target of positionalArgs) {
        const segments = resolvePathSegments(currentCwd, target);
        if (segments.length === 0) {
          return { output: 'rm: it is dangerous to operate recursively on \'/\' (RootAccess protection)', isError: true };
        }

        const parentSegments = segments.slice(0, -1);
        const targetName = segments[segments.length - 1];
        const parentNode = getNodeBySegments(vfsCopy, parentSegments);
        const targetNode = getNodeBySegments(vfsCopy, segments);

        if (!targetNode || !parentNode || !parentNode.children) {
          return { output: `rm: cannot remove '${target}': No such file or directory`, isError: true };
        }

        if (targetNode.type === 'dir' && !isRecursive) {
          return { output: `rm: cannot remove '${target}': Is a directory`, isError: true };
        }

        delete parentNode.children[targetName];
      }

      return {
        output: '',
        newVfs: vfsCopy,
      };
    }

    case 'echo': {
      return { output: positionalArgs.join(' ') };
    }

    default: {
      return {
        output: `bash: ${command}: command not found.
Supported commands in this sandbox: pwd, ls, cd, mkdir, touch, cat, head, tail, cp, mv, rm, man, clear, help.`,
        isError: true,
      };
    }
  }
}
