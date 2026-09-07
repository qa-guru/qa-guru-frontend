import { ArtifactTypeKey } from "./constants";

export type ArtifactPayload = Record<string, unknown>;

export interface VisibilityFlags {
  profilePublic: boolean;
  types: Partial<Record<ArtifactTypeKey, boolean>>;
}

export type OwnerView = {
  handle: string;
  visibility: VisibilityFlags;
} & Partial<Record<ArtifactTypeKey, ArtifactPayload>>;

export type VitrineSlice = {
  handle: string;
} & Partial<Record<ArtifactTypeKey, ArtifactPayload>>;

export interface VisibilityUpdate {
  profilePublic?: boolean;
  types?: Partial<Record<ArtifactTypeKey, boolean>>;
}

export type CabinetLoadError = "unauthorized" | "not-found" | "network";
