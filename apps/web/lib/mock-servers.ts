import type {
  ServerActionResponse,
  ServerLifecycleAction,
  ServerResourceSnapshot,
  ServerSummary,
} from "@workspace/shared";

export const mockServerSummaries: ServerSummary[] = [
  {
    id: "primary-survival",
    name: "Primary Survival",
    host: "10.0.1.25",
    port: 25565,
    status: "online",
    playerCount: 12,
    maxPlayers: 32,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "creative-hub",
    name: "Creative Hub",
    host: "10.0.1.25",
    port: 25566,
    status: "offline",
    playerCount: 0,
    maxPlayers: 20,
    updatedAt: new Date().toISOString(),
  },
];

export function createMockServerResources(serverId: string): ServerResourceSnapshot {
  return {
    serverId,
    cpuPercent: 18,
    memoryMb: 3072,
    memoryTotalMb: 8192,
    tps: 19.8,
    updatedAt: new Date().toISOString(),
  };
}

export function createMockServerActionResponse(
  serverId: string,
  action: ServerLifecycleAction,
): ServerActionResponse {
  return {
    accepted: true,
    operationId: `${serverId}-${action}-${Date.now()}`,
    requestedAt: new Date().toISOString(),
  };
}
