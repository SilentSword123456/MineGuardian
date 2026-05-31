import {
  createMockServerActionResponse,
  createMockServerResources,
  mockServerSummaries,
} from "@/lib/mock-servers";
import type {
  ServerActionRequest,
  ServerActionResponse,
  ServerResourceSnapshot,
  ServerSummary,
} from "@/lib/server-contracts";

const CONTROL_PLANE_BASE_URL = process.env.MINEGUARDIAN_BACKEND_URL;

async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!CONTROL_PLANE_BASE_URL) {
    throw new Error(
      "MINEGUARDIAN_BACKEND_URL is not configured.",
    );
  }

  const url = new URL(path, CONTROL_PLANE_BASE_URL);
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Backend request failed (${response.status}): ${details}`);
  }

  return (await response.json()) as T;
}

export async function fetchServerSummaries(): Promise<ServerSummary[]> {
  try {
    return await backendFetch<ServerSummary[]>("/api/v1/servers");
  } catch {
    return mockServerSummaries;
  }
}

export async function fetchServerResources(serverId: string): Promise<ServerResourceSnapshot> {
  try {
    return await backendFetch<ServerResourceSnapshot>(`/api/v1/servers/${serverId}/resources`);
  } catch {
    return createMockServerResources(serverId);
  }
}

export async function postServerAction(
  request: ServerActionRequest,
): Promise<ServerActionResponse> {
  try {
    return await backendFetch<ServerActionResponse>("/api/v1/servers/actions", {
      method: "POST",
      body: JSON.stringify(request),
    });
  } catch {
    return createMockServerActionResponse(request.serverId, request.action);
  }
}
