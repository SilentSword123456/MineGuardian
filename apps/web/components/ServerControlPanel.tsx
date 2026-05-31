"use client";

import { useActionState, useMemo, useState } from "react";
import { Button } from "@workspace/ui";
import { triggerServerAction } from "@/lib/actions";
import type { ServerLifecycleAction } from "@workspace/shared";

const AVAILABLE_ACTIONS: ServerLifecycleAction[] = [
  "install",
  "start",
  "stop",
  "restart",
  "uninstall",
];

interface ControlPanelState {
  status: "idle" | "success" | "error";
  message: string;
}

async function actionHandler(
  previousState: ControlPanelState,
  formData: FormData,
): Promise<ControlPanelState> {
  const serverId = String(formData.get("serverId") ?? "").trim();
  const action = String(formData.get("action") ?? "").trim() as ServerLifecycleAction;

  if (!serverId || !AVAILABLE_ACTIONS.includes(action)) {
    return {
      status: "error",
      message: "Please provide a server identifier and valid lifecycle action.",
    };
  }

  try {
    const result = await triggerServerAction({ serverId, action });

    return {
      status: "success",
      message: `Action queued (${result.operationId}) at ${new Date(result.requestedAt).toLocaleTimeString()}.`,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : previousState.message,
    };
  }
}

const INITIAL_STATE: ControlPanelState = {
  status: "idle",
  message: "Submit a lifecycle action through the authenticated server boundary.",
};

export function ServerControlPanel() {
  const [selectedAction, setSelectedAction] = useState<ServerLifecycleAction>("start");
  const [state, formAction, isPending] = useActionState(actionHandler, INITIAL_STATE);

  const statusTone = useMemo(() => {
    if (state.status === "error") {
      return "text-rose-300";
    }

    if (state.status === "success") {
      return "text-emerald-300";
    }

    return "text-slate-400";
  }, [state.status]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span>Server ID</span>
          <input
            name="serverId"
            required
            placeholder="primary-survival"
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span>Action</span>
          <select
            name="action"
            value={selectedAction}
            onChange={(event) => setSelectedAction(event.target.value as ServerLifecycleAction)}
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-sky-400"
          >
            {AVAILABLE_ACTIONS.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting…" : "Queue action"}
      </Button>

      <p className={`text-sm ${statusTone}`}>{state.message}</p>
    </form>
  );
}
