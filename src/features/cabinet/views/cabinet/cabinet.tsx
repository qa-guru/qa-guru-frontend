import { ChangeEvent, FC } from "react";
import {
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import {
  ARTIFACT_LABELS,
  ARTIFACT_TYPES,
  ArtifactTypeKey,
} from "../../constants";
import { ArtifactPayload } from "../../types";
import { typeVisible } from "../../visibility";
import { ICabinet } from "./cabinet.types";
import { StyledFlagRow, StyledPaper, StyledPreview } from "./cabinet.styled";
import CabinetStatus from "./cabinet-status";

function payloadLines(payload: ArtifactPayload): string[] {
  return Object.entries(payload).map(([key, value]) => {
    if (value && typeof value === "object") {
      return `${key}: ${JSON.stringify(value)}`;
    }

    return `${key}: ${String(value)}`;
  });
}

const Cabinet: FC<ICabinet> = (props) => {
  const { loading, saving, error, owner, preview, onToggleMaster, onToggleType } =
    props;

  const status = (
    <CabinetStatus loading={loading} error={error} hasOwner={Boolean(owner)} />
  );

  if (loading || error || !owner) {
    return status;
  }

  const handleMaster = (event: ChangeEvent<HTMLInputElement>) => {
    onToggleMaster(event.target.checked);
  };

  const handleType = (type: ArtifactTypeKey) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onToggleType(type, event.target.checked);
    };
  };

  const indexed = ARTIFACT_TYPES.filter((type) => owner[type]);

  return (
    <Stack gap={2}>
      <Typography variant="h4">Кабинет контура</Typography>
      <Typography variant="body2" color="text.secondary">
        Handle <strong>{owner.handle}</strong>. Флаги те же, что у витрины{" "}
        <code>/u/{owner.handle}</code> (страница витрины — не это окно).
      </Typography>
      <StyledPaper>
        <StyledFlagRow>
          <Typography variant="h6">Публичный профиль</Typography>
          <FormControlLabel
            disabled={saving}
            control={
              <Switch
                color="primary"
                checked={Boolean(owner.visibility?.profilePublic)}
                onChange={handleMaster}
              />
            }
            label={owner.visibility?.profilePublic ? "открыт" : "закрыт"}
          />
        </StyledFlagRow>
        <Typography variant="caption" color="text.secondary">
          Мастер выключен — аноним получает 404, даже если типы включены.
        </Typography>
      </StyledPaper>
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Типы на витрине
        </Typography>
        {ARTIFACT_TYPES.map((type) => (
          <StyledFlagRow key={type}>
            <Typography>{ARTIFACT_LABELS[type]}</Typography>
            <FormControlLabel
              disabled={saving}
              control={
                <Switch
                  color="primary"
                  checked={typeVisible(owner.visibility, type)}
                  onChange={handleType(type)}
                />
              }
              label={typeVisible(owner.visibility, type) ? "виден" : "скрыт"}
            />
          </StyledFlagRow>
        ))}
      </StyledPaper>
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Индекс (вам видно всё)
        </Typography>
        {indexed.length === 0 && (
          <Typography variant="body2">
            Пока нет проиндексированных артефактов.
          </Typography>
        )}
        {indexed.map((type) => {
          const payload = owner[type] as ArtifactPayload;

          return (
            <Stack key={type} gap={0.5} mb={1.5}>
              <Typography variant="subtitle1">{ARTIFACT_LABELS[type]}</Typography>
              {payloadLines(payload).map((line) => (
                <Typography key={line} variant="body2">
                  {line}
                </Typography>
              ))}
            </Stack>
          );
        })}
      </StyledPaper>
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Предпросмотр витрины
        </Typography>
        {preview === null ? (
          <Typography variant="body2">
            Аноним не увидит профиль (мастер выключен).
          </Typography>
        ) : (
          <StyledPreview>{JSON.stringify(preview, null, 2)}</StyledPreview>
        )}
      </StyledPaper>
    </Stack>
  );
};

export default Cabinet;
