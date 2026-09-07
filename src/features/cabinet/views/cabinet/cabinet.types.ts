import { ArtifactTypeKey } from "../../constants";
import { CabinetLoadError, OwnerView, VitrineSlice } from "../../types";

export interface ICabinet {
  loading: boolean;
  saving: boolean;
  error: CabinetLoadError | null;
  owner: OwnerView | null;
  preview: VitrineSlice | null;
  onToggleMaster: (profilePublic: boolean) => void;
  onToggleType: (type: ArtifactTypeKey, on: boolean) => void;
}
