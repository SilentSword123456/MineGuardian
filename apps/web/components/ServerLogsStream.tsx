"use client";

import { useEffect, useState } from "react";

interface LogEntry {
  id: string;
  message: string;
  createdAt: string;
}

const SAMPLE_LOGS = [
  "[INFO] Bootstrapping MineGuardian daemon",
  "[INFO] Loading world chunks",
  "[INFO] Player SilentSword connected",
  "[WARN] Resource usage above threshold",
  "[INFO] Autosave completed",
];

function createLogId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ServerLogsStream() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const message = SAMPLE_LOGS[Math.floor(Math.random() * SAMPLE_LOGS.length)];
      setLogs((previous) => {
        const next: LogEntry = {
          id: createLogId(),
          message,
          createdAt: new Date().toISOString(),
        };

        return [next, ...previous].slice(0, 12);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  if (logs.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-slate-700 p-4 text-sm text-slate-400">
        Waiting for backend stream…
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {logs.map((log) => (
        <li
          key={log.id}
          className="rounded-md border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-200"
        >
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-slate-500">
            {new Date(log.createdAt).toLocaleTimeString()}
          </div>
          <p className="font-mono leading-relaxed">{log.message}</p>
        </li>
      ))}

      <li className="rounded-md border border-dashed border-slate-700 p-3 text-[11px] text-slate-400">
        Stream source currently uses placeholder events until authenticated realtime transport is
        wired.
      </li>
    </ul>
  );
}
