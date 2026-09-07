let memoryToken: string | undefined;

export function setProvisioningAccessToken(token: string | undefined): void {
  const trimmed = token?.trim();

  memoryToken = trimmed ? trimmed : undefined;
}

function consumeDevTokenFromQuery(): string | undefined {
  if (!import.meta.env.DEV || typeof window === "undefined") {
    return undefined;
  }

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("access_token");

  if (!fromQuery) {
    return undefined;
  }

  setProvisioningAccessToken(fromQuery);
  params.delete("access_token");
  const search = params.toString();
  const next = `${window.location.pathname}${search ? `?${search}` : ""}${
    window.location.hash
  }`;

  window.history.replaceState({}, "", next);

  return memoryToken;
}

/** In-memory only — not localStorage (ADR 018). Dev hatch: `?access_token=`. */
export function getProvisioningAccessToken(): string | undefined {
  if (memoryToken) {
    return memoryToken;
  }

  return consumeDevTokenFromQuery();
}
