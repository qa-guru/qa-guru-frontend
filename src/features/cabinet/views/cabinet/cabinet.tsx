import { ChangeEvent, FC } from "react";
import {
  Button,
  FormControlLabel,
  Link,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { PROVISIONING_URI } from "config";

import {
  ARTIFACT_LABELS,
  ARTIFACT_TYPES,
  ArtifactTypeKey,
  vitrineHref,
} from "../../constants";
import { ArtifactPayload, OwnerView } from "../../types";
import { typeVisible } from "../../visibility";
import { ICabinet } from "./cabinet.types";
import { StyledFlagRow, StyledPaper, StyledPreview } from "./cabinet.styled";
import CabinetStatus from "./cabinet-status";
import StaffIssueForm, { StaffIssueFormProps } from "./staff-issue-form";

function payloadLines(payload: ArtifactPayload): string[] {
  return Object.entries(payload).map(([key, value]) => {
    if (value && typeof value === "object") {
      return `${key}: ${JSON.stringify(value)}`;
    }

    return `${key}: ${String(value)}`;
  });
}

type StaffViewProps = { username: string } & StaffIssueFormProps;

const StaffCabinet: FC<StaffViewProps> = ({ username, ...issue }) => (
  <Stack gap={2} id="view-staff">
    <Typography variant="h4">Кабинет сотрудника</Typography>
    <Typography variant="body2" color="text.secondary">
      {username} · /staff. Потоки, выдача, доступ менторов. Не кабинет ученика.
    </Typography>
    <StaffIssueForm {...issue} />
  </Stack>
);

const MentorCabinet: FC<StaffViewProps> = ({ username, ...issue }) => (
  <Stack gap={2} id="view-mentor">
    <Typography variant="h4">Проверка ДЗ</Typography>
    <Typography variant="body2" color="text.secondary">
      {username} · /mentors. Очередь работ потока. Без админки школы.
    </Typography>
    <StyledPaper>
      <Typography variant="body2">
        Канбан ментора — в меню. Флаги витрины ученика здесь не крутятся.
      </Typography>
    </StyledPaper>
    <StaffIssueForm {...issue} />
  </Stack>
);

type StudentCabinetProps = Omit<ICabinet, "session" | "owner" | "loading" | "error"> & {
  owner: OwnerView;
};

const StudentCabinet: FC<StudentCabinetProps> = (props) => {
  const {
    saving,
    owner,
    preview,
    onToggleMaster,
    onToggleType,
    onIssueContour,
    issuing,
  } = props;

  const handleMaster = (event: ChangeEvent<HTMLInputElement>) => {
    onToggleMaster(event.target.checked);
  };

  const handleType = (type: ArtifactTypeKey) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onToggleType(type, event.target.checked);
    };
  };

  const indexed = ARTIFACT_TYPES.filter((type) => owner[type]);
  const href = vitrineHref(
    owner.handle,
    PROVISIONING_URI,
    import.meta.env.VITE_PROVISIONING_ENDPOINT || "http://127.0.0.1:8088"
  );

  return (
    <Stack gap={2} id="view-student">
      <Typography variant="h4">Кабинет контура</Typography>
      <Typography variant="body2" color="text.secondary">
        Handle <strong>{owner.handle}</strong>. Флаги те же, что у витрины{" "}
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cabinet-vitrine-link"
        >
          /u/{owner.handle}
        </Link>
        .
      </Typography>
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Контур etalon
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Шаблон autotests-cloud/{owner.handle}-app-tests · квота{" "}
          {owner.contour?.quota?.used ?? 0}/{owner.contour?.quota?.limit ?? 1}{" "}
          на курс. Staff может выдать за ученика с API.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Статус: <strong>{owner.contour?.status ?? "none"}</strong>
          {owner.contour?.error ? ` — ${owner.contour.error}` : ""}
        </Typography>
        <Button
          variant="contained"
          disabled={
            saving ||
            issuing ||
            owner.contour?.status === "ready" ||
            owner.contour?.status === "queued" ||
            owner.contour?.status === "running"
          }
          onClick={onIssueContour}
        >
          {owner.contour?.status === "ready"
            ? "Контур выдан"
            : issuing ||
              owner.contour?.status === "queued" ||
              owner.contour?.status === "running"
            ? "Выдаём…"
            : "Поднять проект"}
        </Button>
      </StyledPaper>
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
        <StyledFlagRow>
          <Typography variant="h6">Предпросмотр витрины</Typography>
          <Button
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cabinet-vitrine-open"
          >
            Открыть витрину
          </Button>
        </StyledFlagRow>
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

const Cabinet: FC<ICabinet> = (props) => {
  const {
    loading,
    saving,
    error,
    owner,
    preview,
    session,
    onToggleMaster,
    onToggleType,
    onIssueContour,
    issuing,
    onStaffIssueContour,
    staffIssuing,
    staffIssueError,
    staffIssue,
  } = props;

  const staffForm: StaffIssueFormProps = {
    issuing: staffIssuing,
    error: staffIssueError,
    result: staffIssue,
    onSubmit: onStaffIssueContour ?? (() => undefined),
  };

  if (session?.role === "staff") {
    return <StaffCabinet username={session.username} {...staffForm} />;
  }

  if (session?.role === "mentor") {
    return <MentorCabinet username={session.username} {...staffForm} />;
  }

  if (loading || error || !owner) {
    return (
      <Stack id="view-student">
        <CabinetStatus
          loading={loading}
          error={error}
          hasOwner={Boolean(owner)}
        />
      </Stack>
    );
  }

  return (
    <StudentCabinet
      saving={saving}
      owner={owner}
      preview={preview}
      onToggleMaster={onToggleMaster}
      onToggleType={onToggleType}
      onIssueContour={onIssueContour}
      issuing={issuing}
    />
  );
};

export default Cabinet;
