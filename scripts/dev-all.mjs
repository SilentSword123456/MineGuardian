import { spawn } from 'node:child_process';

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

const children = processes.map(({ name, command, args }) => {
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
  }, 5000);

  setTimeout(() => process.exit(0), 8000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
