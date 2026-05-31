"use server";

import { auth } from "@clerk/nextjs/server";
import { postServerAction } from "@/lib/backend-client";
import type { ServerActionRequest, ServerActionResponse } from "@/lib/server-contracts";

export async function triggerServerAction(
  request: ServerActionRequest,
): Promise<ServerActionResponse> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Authentication required before triggering server lifecycle actions.");
  }

  return postServerAction(request);
}
