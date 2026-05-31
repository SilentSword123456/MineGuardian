import { Badge } from "@workspace/ui";
import { fetchServerSummaries } from "@/lib/backend-client";
import { SERVER_STATUS_LABELS } from "@/lib/server-contracts";

const STATUS_TONE: Record<string, "default" | "muted" | "danger"> = {
  online: "default",
  offline: "muted",
  starting: "muted",
  stopping: "muted",
  error: "danger",
};

export async function ServerList() {
  const servers = await fetchServerSummaries();

  return (
    <div className="space-y-3">
      {servers.map((server) => (
        <article
          key={server.id}
          className="flex flex-col gap-3 rounded-md border border-slate-800 bg-slate-900/40 p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className="text-base font-semibold text-slate-100">{server.name}</h3>
            <p className="text-sm text-slate-400">
              {server.host}:{server.port}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right text-xs text-slate-400">
              <p>
                Players: {server.playerCount}/{server.maxPlayers}
              </p>
              <p>Updated: {new Date(server.updatedAt).toLocaleTimeString()}</p>
            </div>

            <Badge tone={STATUS_TONE[server.status] ?? "muted"}>
              {SERVER_STATUS_LABELS[server.status]}
            </Badge>
          </div>
        </article>
      ))}
    </div>
  );
}
