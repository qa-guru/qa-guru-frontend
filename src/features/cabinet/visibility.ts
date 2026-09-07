import {
  ARTIFACT_TYPES,
  ArtifactTypeKey,
  FORBIDDEN_KEYS,
} from "./constants";
import { ArtifactPayload, OwnerView, VitrineSlice } from "./types";

const FORBIDDEN = new Set<string>(FORBIDDEN_KEYS);

export function isArtifactType(key: string): key is ArtifactTypeKey {
  return (ARTIFACT_TYPES as readonly string[]).includes(key);
}

function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/-/g, "_");
}

export function stripForbidden(node: unknown): unknown {
  if (Array.isArray(node)) {
    return node.map(stripForbidden);
  }

  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};

    Object.entries(node as Record<string, unknown>).forEach(([key, value]) => {
      if (!FORBIDDEN.has(normalizeKey(key))) {
        out[key] = stripForbidden(value);
      }
    });

    return out;
  }

  return node;
}

export function typeVisible(
  visibility: OwnerView["visibility"] | undefined,
  type: ArtifactTypeKey
): boolean {
  return visibility?.types?.[type] === true;
}

/**
 * Anonymous vitrine slice: profile ∧ type. Closed keys omitted.
 * Same rule as provisioning `GET /api/u/{handle}`. HTML page is `GET /u/{handle}` on the provisioning host.
 */
export function vitrineSlice(owner: OwnerView): VitrineSlice | null {
  if (!owner.visibility?.profilePublic) {
    return null;
  }

  const slice: VitrineSlice = { handle: owner.handle };

  ARTIFACT_TYPES.forEach((type) => {
    if (!typeVisible(owner.visibility, type)) {
      return;
    }

    const payload = owner[type];

    if (payload && typeof payload === "object") {
      slice[type] = stripForbidden(payload) as ArtifactPayload;
    }
  });

  return slice;
}
