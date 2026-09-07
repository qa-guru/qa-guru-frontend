import { ArtifactTypeKey } from "./constants";

export type ArtifactPayload = Record<string, unknown>;

export interface VisibilityFlags {
  profilePublic: boolean;
  types: Partial<Record<ArtifactTypeKey, boolean>>;
}

export type OwnerView = {
  handle: string;
  visibility: VisibilityFlags;
  contour?: ContourStatus;
} & Partial<Record<ArtifactTypeKey, ArtifactPayload>>;

export type VitrineSlice = {
  handle: string;
} & Partial<Record<ArtifactTypeKey, ArtifactPayload>>;

export interface VisibilityUpdate {
  profilePublic?: boolean;
  types?: Partial<Record<ArtifactTypeKey, boolean>>;
}

export interface ContourQuota {
  used: number;
  limit: number;
}

export type ContourJobStatus = "none" | "queued" | "running" | "ready" | "failed";

export interface ContourStatus {
  id?: string;
  handle?: string;
  courseId?: string;
  template?: string;
  status: ContourJobStatus;
  staffIssue?: boolean;
  issuedBy?: string;
  quota?: ContourQuota;
  error?: string;
}

export type CabinetLoadError = "unauthorized" | "not-found" | "network";
