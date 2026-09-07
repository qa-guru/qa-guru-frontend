import { FC } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import {
  ContourCheckVerdict,
  ContourEvidenceDto,
  HomeWorkDocument,
  Maybe,
  useCheckHomeWorkByContourMutation,
} from "api/graphql/generated/graphql";

export interface ContourVerdictPanelProps {
  homeworkId?: Maybe<string>;
  verdict?: Maybe<ContourCheckVerdict>;
  comment?: Maybe<string>;
  evidence?: Maybe<ContourEvidenceDto>;
  canRecheck?: boolean;
}

const TITLE: Record<ContourCheckVerdict, string> = {
  [ContourCheckVerdict.Rejected]: "Авто-reject по уликам контура",
  [ContourCheckVerdict.PendingMentor]: "Улики контура — нужна проверка ментора",
  [ContourCheckVerdict.WaitingContour]: "Контур ещё не готов",
  [ContourCheckVerdict.IndexUnavailable]: "Индекс контура недоступен",
  [ContourCheckVerdict.None]: "Проверка по контуру",
};

const SEVERITY: Record<
  ContourCheckVerdict,
  "error" | "info" | "warning" | "success"
> = {
  [ContourCheckVerdict.Rejected]: "error",
  [ContourCheckVerdict.PendingMentor]: "info",
  [ContourCheckVerdict.WaitingContour]: "warning",
  [ContourCheckVerdict.IndexUnavailable]: "warning",
  [ContourCheckVerdict.None]: "info",
};

const ContourVerdictPanel: FC<ContourVerdictPanelProps> = ({
  homeworkId,
  verdict,
  comment,
  evidence,
  canRecheck,
}) => {
  const [check, { loading }] = useCheckHomeWorkByContourMutation({
    refetchQueries: homeworkId
      ? [{ query: HomeWorkDocument, variables: { homeWorkId: homeworkId } }]
      : [],
  });

  const current = verdict ?? ContourCheckVerdict.None;

  return (
    <Box sx={{ my: 2 }}>
      <Alert severity={SEVERITY[current]} variant="outlined">
        <AlertTitle>{TITLE[current]}</AlertTitle>
        {comment ? (
          <Typography
            variant="body2"
            component="pre"
            sx={{ whiteSpace: "pre-wrap", fontFamily: "inherit", m: 0 }}
          >
            {comment}
          </Typography>
        ) : (
          <Typography variant="body2">
            Вердикт опирается на индекс provisioning (GitHub / Jenkins / TestOps),
            не только на текст ответа.
          </Typography>
        )}
        {evidence?.handle ? (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Handle: {evidence.handle}
            {evidence.contourStatus ? ` · контур ${evidence.contourStatus}` : ""}
          </Typography>
        ) : null}
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
          <EvidenceLink href={evidence?.githubUrl} label={evidence?.githubSlug || "GitHub"} />
          <EvidenceLink href={evidence?.jenkinsUrl} label={evidence?.jenkinsJob || "Jenkins"} />
          <EvidenceLink href={evidence?.testopsUrl} label="TestOps" />
          <EvidenceLink href={evidence?.allureUrl} label="Allure" />
        </Stack>
        {canRecheck && homeworkId ? (
          <Button
            size="small"
            variant="outlined"
            sx={{ mt: 1.5 }}
            disabled={loading}
            onClick={() => check({ variables: { homeWorkId: homeworkId } })}
          >
            Проверить по контуру
          </Button>
        ) : null}
      </Alert>
    </Box>
  );
};

const EvidenceLink: FC<{ href?: Maybe<string>; label: string }> = ({
  href,
  label,
}) => {
  if (!href) {
    return null;
  }
  return (
    <Link href={href} target="_blank" rel="noreferrer" variant="body2">
      {label}
    </Link>
  );
};

export default ContourVerdictPanel;
