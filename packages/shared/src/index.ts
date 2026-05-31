export type ServerLifecycleAction =
  | "install"
  | "start"
  | "stop"
  | "restart"
  | "uninstall";

export type ServerState = "online" | "offline" | "starting" | "stopping" | "error";

export interface ServerSummary {
  id: string;
  name: string;
  host: string;
  port: number;
  status: ServerState;
  playerCount: number;
  maxPlayers: number;
  updatedAt: string;
}

export interface ServerResourceSnapshot {
  serverId: string;
  cpuPercent: number;
  memoryMb: number;
  memoryTotalMb: number;
  tps: number;
  updatedAt: string;
}

export interface ServerActionRequest {
  serverId: string;
  action: ServerLifecycleAction;
}

export interface ServerActionResponse {
  accepted: boolean;
  operationId: string;
  requestedAt: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: unknown;
}
