import { FC, useCallback, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useSnackbar } from "notistack";

import { ArtifactTypeKey } from "../constants";
import ProvisioningService, {
  ProvisioningHttpError,
} from "../provisioning-service";
import { CabinetLoadError, OwnerView } from "../types";
import { vitrineSlice } from "../visibility";
import Cabinet from "../views/cabinet";

function errorFromStatus(status: number): CabinetLoadError {
  if (status === 401) {
    return "unauthorized";
  }

  if (status === 404) {
    return "not-found";
  }

  return "network";
}

const CabinetContainer: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<CabinetLoadError | null>(null);
  const [owner, setOwner] = useState<OwnerView | null>(null);

  const [issuing, setIssuing] = useState(false);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) {
      setLoading(true);
    }

    try {
      const data = await ProvisioningService.getMe();

      setOwner(data);
      setError(null);
    } catch (caught) {
      setOwner(null);
      setError(
        caught instanceof ProvisioningHttpError
          ? errorFromStatus(caught.status)
          : "network"
      );
    } finally {
      if (!opts?.silent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const status = owner?.contour?.status;
    if (status !== "queued" && status !== "running") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      load({ silent: true });
    }, 2000);

    return () => window.clearInterval(timer);
  }, [load, owner?.contour?.status]);

  const persist = async (next: OwnerView, rollback: OwnerView | null) => {
    setSaving(true);
    setOwner(next);

    try {
      const saved = await ProvisioningService.updateVisibility({
        profilePublic: next.visibility.profilePublic,
        types: next.visibility.types,
      });

      setOwner(saved);
    } catch (caught) {
      setOwner(rollback);
      enqueueSnackbar("Не удалось сохранить флаги", { variant: "error" });

      if (caught instanceof ProvisioningHttpError && caught.status === 401) {
        setError("unauthorized");
      }
    } finally {
      setSaving(false);
    }
  };

  const onIssueContour = async () => {
    setIssuing(true);

    try {
      await ProvisioningService.issueContour();
      await load();
    } catch (caught) {
      if (caught instanceof ProvisioningHttpError && caught.status === 409) {
        enqueueSnackbar("Квота: один активный контур на курс", { variant: "warning" });
        await load();
      } else {
        enqueueSnackbar("Не удалось выдать контур", { variant: "error" });
      }

      if (caught instanceof ProvisioningHttpError && caught.status === 401) {
        setError("unauthorized");
      }
    } finally {
      setIssuing(false);
    }
  };

  const onToggleMaster = (profilePublic: boolean) => {
    if (!owner) {
      return;
    }

    persist(
      {
        ...owner,
        visibility: { ...owner.visibility, profilePublic },
      },
      owner
    );
  };

  const onToggleType = (type: ArtifactTypeKey, on: boolean) => {
    if (!owner) {
      return;
    }

    persist(
      {
        ...owner,
        visibility: {
          ...owner.visibility,
          types: { ...owner.visibility.types, [type]: on },
        },
      },
      owner
    );
  };

  return (
    <Container>
      <Cabinet
        loading={loading}
        saving={saving}
        error={error}
        owner={owner}
        preview={owner ? vitrineSlice(owner) : null}
        onToggleMaster={onToggleMaster}
        onToggleType={onToggleType}
        onIssueContour={onIssueContour}
        issuing={issuing}
      />
    </Container>
  );
};

export default CabinetContainer;
