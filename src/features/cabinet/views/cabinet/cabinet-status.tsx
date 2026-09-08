import { FC } from "react";
import { Alert } from "@mui/material";

import { AppSpinner } from "shared/components/spinners";

import { CabinetLoadError } from "../../types";

interface ICabinetStatus {
  loading: boolean;
  error: CabinetLoadError | null;
  hasOwner: boolean;
}

const CabinetStatus: FC<ICabinetStatus> = ({ loading, error, hasOwner }) => {
  if (loading) {
    return <AppSpinner />;
  }

  if (error === "unauthorized") {
    return (
      <Alert severity="info">
        Кабинет читает provisioning <code>/api/me</code> по JWT IdP (cookie
        BFF, не localStorage).
        {import.meta.env.DEV ? (
          <>
            {" "}
            На стенде: <code>?access_token=</code>
          </>
        ) : null}
      </Alert>
    );
  }

  if (error === "not-found") {
    return (
      <Alert severity="warning">
        Контур ещё не в реестре. Кнопка «Поднять проект» появляется после
        успешного <code>GET /api/me</code> (пустой срез для нового логина).
      </Alert>
    );
  }

  if (error === "network" || !hasOwner) {
    return (
      <Alert severity="error">
        Не удалось загрузить кабинет. Проверьте, что provisioning отвечает.
      </Alert>
    );
  }

  return null;
};

export default CabinetStatus;
