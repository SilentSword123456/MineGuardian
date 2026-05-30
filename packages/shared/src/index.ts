export type ServerLifecycleAction = 'install' | 'start' | 'stop' | 'restart' | 'uninstall';

export type ServerStatus = {
  id: string;
  status: 'offline' | 'starting' | 'online' | 'stopping' | 'error';
  cpuPercent?: number;
  memoryMb?: number;
  playersOnline?: number;
};
