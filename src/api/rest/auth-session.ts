import { AUTH_SESSION_URI } from "config";

import { AuthSession, IdpRole } from "./idp-roles";

interface SessionResponse {
  ok?: boolean;
  username?: string;
  role?: IdpRole;
  groups?: string[];
  auth?: string;
  access_token?: string;
  token?: string;
}

export async function fetchAuthSession(): Promise<AuthSession | null> {
  const response = await fetch(AUTH_SESSION_URI, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const body = (await response.json()) as SessionResponse;

  if (body.access_token || body.token) {
    throw new Error("BFF leaked a token into /auth/session");
  }

  if (!body.ok || !body.username || !body.role) {
    return null;
  }

  return {
    username: body.username,
    role: body.role,
    groups: body.groups || [],
    auth: body.auth || "oidc",
  };
}
