import { spawn } from 'node:child_process';

const processes = [
  {
    name: 'web',
    command: 'pnpm',
    args: ['--filter', '@mineguardian/web', 'dev'],
  },
  {
    name: 'minecraft-backend',
    command: 'python3',
    args: ['apps/minecraft-backend/main.py'],
  },
];

const children = processes.map(({ name, command, args }) => {
  const child = spawn(command, args, { stdio: 'inherit', shell: false });
  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
    }
  });
  return child;
});

const shutdown = () => {
  children.forEach((child) => child.kill('SIGINT'));
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
