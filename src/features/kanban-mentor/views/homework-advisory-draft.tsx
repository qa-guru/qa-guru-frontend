import { FC, useEffect, useRef, useState } from "react";
import {
  ApolloError,
  gql,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import { userIdVar, userRolesVar } from "cache";
import { Maybe, UserRole } from "api/graphql/generated/graphql";
import { useRoleAccess } from "shared/hooks/use-role-access";

export const HomeWorkAdvisoryDraftDocument = gql`
  query homeWorkAdvisoryDraft($homeWorkId: ID!) {
    homeWorkAdvisoryDraft(homeWorkId: $homeWorkId) {
      currentSourceRevision
      stale
      draft {
        id
        boundSourceRevision
        marker
        content
        author {
          id
        }
        creationDate
        updateDate
      }
    }
  }
`;

export const SaveHomeWorkAdvisoryDraftDocument = gql`
  mutation saveHomeWorkAdvisoryDraft(
    $homeWorkId: ID!
    $marker: AdvisoryDraftMarker!
    $content: String!
    $baseSourceRevision: Int!
  ) {
    saveHomeWorkAdvisoryDraft(
      homeWorkId: $homeWorkId
      marker: $marker
      content: $content
      baseSourceRevision: $baseSourceRevision
    ) {
      currentSourceRevision
      stale
      draft {
        id
        boundSourceRevision
        marker
        content
        author {
          id
        }
        creationDate
        updateDate
      }
    }
  }
`;

type SourceRevision = string | number;
type AdvisoryMarker = "SOURCE_CONFIRMED" | "SOURCE_PARTIAL" | "NOT_VERIFIED";
type AdvisoryDraft = {
  id: string;
  boundSourceRevision: SourceRevision;
  marker: string | null;
  content: string | null;
  author: { id: string } | null;
  creationDate: string | null;
  updateDate: string | null;
};
type AdvisoryResponse = {
  currentSourceRevision: SourceRevision;
  stale: boolean;
  draft: AdvisoryDraft | null;
};
type AdvisoryQuery = { homeWorkAdvisoryDraft: AdvisoryResponse | null };
type AdvisoryMutation = {
  saveHomeWorkAdvisoryDraft: AdvisoryResponse | null;
};
type SaveVariables = {
  homeWorkId: string;
  marker: AdvisoryMarker;
  content: string;
  baseSourceRevision: SourceRevision;
};
type EditingState = {
  homeworkId: string;
  authorId: string;
  baseSourceRevision: SourceRevision;
  marker: "" | AdvisoryMarker;
  content: string;
};
type Props = {
  homeworkId?: Maybe<string>;
  sourceUpdatedAt?: Maybe<string>;
};

const TITLE = "AI advisory draft — решение за ментором";
const API_ERROR =
  "Не удалось загрузить черновик. API недоступен или вернул ошибку.";
const SAVE_ERROR =
  "Не сохранено. Проверьте текст и версию сдачи, затем повторите.";
const DENIED_ERROR = "Нет доступа к черновику этой сдачи";
const EDIT_ACTION = "Редактировать приватный черновик";
const SAVE_ACTION = "Сохранить приватный черновик";
const REFRESH_ACTION = "Обновить контекст";
const STAFF_ROLES = [UserRole.Admin, UserRole.Mentor, UserRole.Lector];
const MARKER_OPTIONS: readonly AdvisoryMarker[] = [
  "SOURCE_CONFIRMED",
  "SOURCE_PARTIAL",
  "NOT_VERIFIED",
];
// Mirrors HomeWorkAdvisoryDraftService.MAX_CONTENT_LENGTH on the server.
const MAX_CONTENT_LENGTH = 4000;

const isAccessDenied = (error: ApolloError) =>
  (error.networkError as { statusCode?: number } | null)?.statusCode === 403 ||
  error.graphQLErrors.some(
    ({ extensions, message }) =>
      [extensions.classification, extensions.errorType, extensions.code].some(
        (code) =>
          ["FORBIDDEN", "UNAUTHORIZED", "ACCESS_DENIED"].includes(
            String(code).toUpperCase()
          )
      ) || message === "Access Denied"
  );

const isRevision = (value: unknown): value is SourceRevision =>
  typeof value === "string" ||
  (typeof value === "number" && Number.isFinite(value));

const isMarker = (value: unknown): value is AdvisoryMarker =>
  MARKER_OPTIONS.includes(value as AdvisoryMarker);

const hasValidMetadata = (
  result?: AdvisoryResponse | null
): result is AdvisoryResponse =>
  Boolean(
    result &&
      isRevision(result.currentSourceRevision) &&
      typeof result.stale === "boolean" &&
      (result.draft === null
        ? !result.stale
        : result.draft &&
          typeof result.draft.id === "string" &&
          isRevision(result.draft.boundSourceRevision))
  );

const validateEditing = (value: EditingState): string | null => {
  if (!isMarker(value.marker)) return "Выберите категорию evidence";
  if (!value.content.trim()) return "Введите текст черновика";
  if (value.content.length > MAX_CONTENT_LENGTH)
    return `Черновик длиннее ${MAX_CONTENT_LENGTH} символов`;
  return null;
};

type EditorProps = {
  editing: EditingState;
  saving: boolean;
  revisionMoved: boolean;
  saveError: string | null;
  onMarker: (marker: AdvisoryMarker) => void;
  onContent: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onRefresh: () => void;
};

const AdvisoryEditor: FC<EditorProps> = ({
  editing,
  saving,
  revisionMoved,
  saveError,
  onMarker,
  onContent,
  onSave,
  onCancel,
  onRefresh,
}) => (
  <Stack spacing={1}>
    <Typography variant="body2" color="text.secondary">
      Ручной черновик — текст пишет ментор, не автогенерация и не решение по
      сдаче.
    </Typography>
    <FormControl size="small" fullWidth>
      <InputLabel id="advisory-draft-marker-label">
        Категория evidence
      </InputLabel>
      <Select
        labelId="advisory-draft-marker-label"
        label="Категория evidence"
        value={editing.marker}
        disabled={saving}
        onChange={(event: SelectChangeEvent) =>
          onMarker(event.target.value as AdvisoryMarker)
        }
      >
        {MARKER_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Текст приватного черновика"
      value={editing.content}
      onChange={(event) => onContent(event.target.value)}
      multiline
      minRows={4}
      fullWidth
      disabled={saving}
    />
    {revisionMoved && (
      <Alert severity="warning">
        Версия сдачи изменилась — перепроверьте текст и обновите контекст.
        <Button size="small" onClick={onRefresh} sx={{ ml: 1 }}>
          {REFRESH_ACTION}
        </Button>
      </Alert>
    )}
    {saveError && <Alert severity="error">{saveError}</Alert>}
    <Stack direction="row" spacing={1}>
      <Button
        variant="contained"
        size="small"
        onClick={onSave}
        disabled={saving || revisionMoved}
      >
        {SAVE_ACTION}
      </Button>
      <Button size="small" onClick={onCancel} disabled={saving}>
        Отмена
      </Button>
    </Stack>
  </Stack>
);

type ReadViewProps = {
  draft: AdvisoryDraft | null;
  outdated: boolean;
  onEdit: () => void;
};

const AdvisoryReadView: FC<ReadViewProps> = ({ draft, outdated, onEdit }) => (
  <>
    {!outdated && draft && (
      <>
        <Typography variant="body2">
          Категория evidence: {draft.marker}
        </Typography>
        <Typography
          component="pre"
          variant="body2"
          sx={{
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            fontFamily: "inherit",
            m: 0,
          }}
        >
          {draft.content}
        </Typography>
      </>
    )}
    {!outdated && !draft && <Typography>Черновик пока отсутствует</Typography>}
    <Box>
      <Button size="small" variant="outlined" onClick={onEdit}>
        {EDIT_ACTION}
      </Button>
    </Box>
  </>
);

type BodyProps = {
  result: AdvisoryResponse;
  editing: EditingState | null;
  saving: boolean;
  contextMatches: boolean;
  saveError: string | null;
  onEdit: () => void;
  onMarker: (marker: AdvisoryMarker) => void;
  onContent: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onRefresh: () => void;
};

const AdvisoryBody: FC<BodyProps> = ({
  result,
  editing,
  saving,
  contextMatches,
  saveError,
  onEdit,
  onMarker,
  onContent,
  onSave,
  onCancel,
  onRefresh,
}) => {
  const { draft, currentSourceRevision, stale } = result;
  const outdated =
    stale ||
    (draft !== null && draft.boundSourceRevision !== currentSourceRevision);
  if (
    draft &&
    !outdated &&
    (typeof draft.marker !== "string" || typeof draft.content !== "string")
  ) {
    return <Alert severity="error">{API_ERROR}</Alert>;
  }
  return (
    <Stack spacing={1}>
      <Typography variant="body2">
        Текущая версия сдачи: {currentSourceRevision}
      </Typography>
      {draft && (
        <Typography variant="body2">
          Версия черновика: {draft.boundSourceRevision}
        </Typography>
      )}
      {outdated && (
        <Alert severity="warning">
          Версия сдачи изменилась, черновик неактуален
        </Alert>
      )}
      {editing ? (
        <AdvisoryEditor
          editing={editing}
          saving={saving}
          revisionMoved={!contextMatches}
          saveError={saveError}
          onMarker={onMarker}
          onContent={onContent}
          onSave={onSave}
          onCancel={onCancel}
          onRefresh={onRefresh}
        />
      ) : (
        <AdvisoryReadView draft={draft} outdated={outdated} onEdit={onEdit} />
      )}
    </Stack>
  );
};

const AdvisoryQueryBlock: FC<{ homeworkId: string }> = ({ homeworkId }) => {
  const userId = useReactiveVar(userIdVar);
  const { data, loading, error } = useQuery<
    AdvisoryQuery,
    { homeWorkId: string }
  >(HomeWorkAdvisoryDraftDocument, {
    variables: { homeWorkId: homeworkId },
    fetchPolicy: "no-cache",
    errorPolicy: "none",
    notifyOnNetworkStatusChange: true,
    context: { queryDeduplication: false },
  });
  const [saveDraft] = useMutation<AdvisoryMutation, SaveVariables>(
    SaveHomeWorkAdvisoryDraftDocument,
    { fetchPolicy: "no-cache", errorPolicy: "none" }
  );
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmed, setConfirmed] = useState<{
    forResult: unknown;
    response: AdvisoryResponse;
  } | null>(null);
  const mountedRef = useRef(true);
  const savingRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const result =
    confirmed && confirmed.forResult === data
      ? confirmed.response
      : data?.homeWorkAdvisoryDraft;

  const startEdit = () => {
    if (!hasValidMetadata(result) || !userId) return;
    const outdated =
      result.stale ||
      (result.draft !== null &&
        result.draft.boundSourceRevision !== result.currentSourceRevision);
    const draft = outdated ? null : result.draft;
    setSaveError(null);
    setEditing({
      homeworkId,
      authorId: userId,
      baseSourceRevision: result.currentSourceRevision,
      marker: isMarker(draft?.marker) ? draft.marker : "",
      content: draft?.content ?? "",
    });
  };

  const refreshContext = () => {
    setSaveError(null);
    setEditing((current) =>
      current && hasValidMetadata(result)
        ? { ...current, baseSourceRevision: result.currentSourceRevision }
        : current
    );
  };

  const contextMatches =
    editing !== null &&
    hasValidMetadata(result) &&
    editing.baseSourceRevision === result.currentSourceRevision &&
    editing.homeworkId === homeworkId &&
    editing.authorId === userId;

  const onSave = async () => {
    if (!editing || savingRef.current) return;
    const validationError = validateEditing(editing);
    if (validationError) {
      setSaveError(validationError);
      return;
    }
    if (!contextMatches || !isMarker(editing.marker)) return;
    savingRef.current = true;
    setSaving(true);
    setSaveError(null);
    try {
      const { data: mutationData } = await saveDraft({
        variables: {
          homeWorkId: editing.homeworkId,
          marker: editing.marker,
          content: editing.content,
          baseSourceRevision: editing.baseSourceRevision,
        },
      });
      if (!mountedRef.current) return;
      const response = mutationData?.saveHomeWorkAdvisoryDraft;
      if (!hasValidMetadata(response)) {
        setSaveError(SAVE_ERROR);
        return;
      }
      setConfirmed({ forResult: data, response });
      setEditing(null);
    } catch (saveFailure) {
      if (!mountedRef.current) return;
      setSaveError(
        saveFailure instanceof ApolloError && isAccessDenied(saveFailure)
          ? DENIED_ERROR
          : SAVE_ERROR
      );
    } finally {
      savingRef.current = false;
      if (mountedRef.current) setSaving(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <Typography role="status">Загрузка черновика…</Typography>;
    }
    if (error) {
      return (
        <Alert severity="error">
          {isAccessDenied(error) ? DENIED_ERROR : API_ERROR}
        </Alert>
      );
    }
    if (!hasValidMetadata(result)) {
      return <Alert severity="error">{API_ERROR}</Alert>;
    }
    return (
      <AdvisoryBody
        result={result}
        editing={editing}
        saving={saving}
        contextMatches={contextMatches}
        saveError={saveError}
        onEdit={startEdit}
        onMarker={(marker) =>
          setEditing((current) => (current ? { ...current, marker } : current))
        }
        onContent={(content) =>
          setEditing((current) => (current ? { ...current, content } : current))
        }
        onSave={onSave}
        onCancel={() => setEditing(null)}
        onRefresh={refreshContext}
      />
    );
  };

  return (
    <Box component="section" aria-label={TITLE} sx={{ my: 2 }}>
      <Typography component="h3" variant="h6">
        {TITLE}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Marker — категория evidence, не оценка и не рекомендация зачёта.
      </Typography>
      {renderContent()}
    </Box>
  );
};

const HomeworkAdvisoryDraft: FC<Props> = ({ homeworkId, sourceUpdatedAt }) => {
  const userId = useReactiveVar(userIdVar);
  const roles = useReactiveVar(userRolesVar);
  const hasStaffRole = useRoleAccess({ allowedRoles: STAFF_ROLES });

  if (!userId || !hasStaffRole || !homeworkId) return null;

  return (
    <AdvisoryQueryBlock
      key={JSON.stringify([userId, roles, homeworkId, sourceUpdatedAt])}
      homeworkId={homeworkId}
    />
  );
};

export default HomeworkAdvisoryDraft;
