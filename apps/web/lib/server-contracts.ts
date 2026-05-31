import type {
  ApiErrorResponse,
  ServerActionRequest,
  ServerActionResponse,
  ServerResourceSnapshot,
  ServerSummary,
} from "@mineguardian/shared";

export type {
  ApiErrorResponse,
  ServerActionRequest,
  ServerActionResponse,
  ServerResourceSnapshot,
  ServerSummary,
};

export const SERVER_STATUS_LABELS: Record<ServerSummary["status"], string> = {
  online: "Online",
  offline: "Offline",
  starting: "Starting",
  stopping: "Stopping",
  error: "Error",
};
