import { AuthSession } from "api/rest/idp-roles";

import { ArtifactTypeKey } from "../../constants";
import { StaffIssueInput } from "../../staff-issue";
import {
  CabinetLoadError,
  ContourStatus,
  OwnerView,
  VitrineSlice,
} from "../../types";

export interface ICabinet {
  loading: boolean;
  saving: boolean;
  error: CabinetLoadError | null;
  owner: OwnerView | null;
  preview: VitrineSlice | null;
  session?: AuthSession | null;
  onToggleMaster: (profilePublic: boolean) => void;
  onToggleType: (type: ArtifactTypeKey, on: boolean) => void;
  onIssueContour: () => void;
  issuing?: boolean;
  onStaffIssueContour?: (input: StaffIssueInput) => void;
  staffIssuing?: boolean;
  staffIssueError?: string | null;
  staffIssue?: ContourStatus | null;
}
