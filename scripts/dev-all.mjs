import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const SIGTERM_FALLBACK_DELAY_MS = 5000;
const FORCE_EXIT_DELAY_MS = 8000;

const processes = [
  {
    name: 'web',
    command: process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
    args: ['--filter', '@mineguardian/web', 'dev'],
  },
  {
    name: 'minecraft-backend',
    command: process.platform === 'win32' ? 'python' : 'python3',
    args: ['apps/minecraft-backend/main.py'],
  },
];

const runnableProcesses = processes.filter(({ name, args }) => {
  if (name !== 'minecraft-backend') return true;

  const entrypoint = args[0];
  if (existsSync(entrypoint)) return true;

  console.warn(
    `Skipping minecraft-backend: ${entrypoint} does not exist yet.`,
  );
  return false;
});

const children = runnableProcesses.map(({ name, command, args }) => {
  const child = spawn(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
    }
  });
  return child;
});

let shuttingDown = false;
const shutdown = () => {
  if (shuttingDown) return;
  shuttingDown = true;

  const alive = children.filter((child) => child.exitCode === null);
  if (alive.length === 0) {
    process.exit(0);
    return;
  }

  let remaining = alive.length;
  const onExit = () => {
    remaining -= 1;
    if (remaining === 0) {
      process.exit(0);
    }
  };

  alive.forEach((child) => {
    child.once('exit', onExit);
    child.kill('SIGINT');
  });

  setTimeout(() => {
    alive.forEach((child) => {
      if (child.exitCode === null) child.kill('SIGTERM');
    });
  }, SIGTERM_FALLBACK_DELAY_MS);

  setTimeout(() => process.exit(0), FORCE_EXIT_DELAY_MS);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
