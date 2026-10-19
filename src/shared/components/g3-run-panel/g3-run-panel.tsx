import { FC, useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";

import {
  G3RunJobStatus,
  G3RunJobsQuery,
  Maybe,
  useG3RunJobsQuery,
} from "api/graphql/generated/graphql";
import G3EvidenceService from "api/rest/g3-evidence-service";

export interface G3RunPanelProps {
  homeworkId?: Maybe<string>;
}

type Job = G3RunJobsQuery["g3RunJobs"][number];

const TITLE: Record<G3RunJobStatus, string> = {
  [G3RunJobStatus.Queued]: "Автопроверка в очереди",
  [G3RunJobStatus.Claimed]: "Автопроверка выполняется",
  [G3RunJobStatus.Done]: "Автопроверка завершена",
  [G3RunJobStatus.Failed]: "Автопроверка не удалась",
  [G3RunJobStatus.Cancelled]: "Автопроверка отменена — сдача обновилась",
};

const SEVERITY: Record<
  G3RunJobStatus,
  "error" | "info" | "warning" | "success"
> = {
  [G3RunJobStatus.Queued]: "info",
  [G3RunJobStatus.Claimed]: "info",
  [G3RunJobStatus.Done]: "success",
  [G3RunJobStatus.Failed]: "error",
  [G3RunJobStatus.Cancelled]: "warning",
};

const DATE_FORMAT = "dd.MM.yyyy HH:mm";

const ACTIVE: ReadonlyArray<G3RunJobStatus> = [
  G3RunJobStatus.Queued,
  G3RunJobStatus.Claimed,
];

interface RunCounters {
  api?: { tests?: number; failures?: number; errors?: number };
  e2e?: { tests?: number; failures?: number; errors?: number };
}

const countersLine = (evidenceJson?: string | null): string | null => {
  if (!evidenceJson) return null;
  try {
    const parsed = JSON.parse(evidenceJson) as RunCounters;
    const part = (label: string, c?: RunCounters["api"]) =>
      c?.tests != null
        ? `${label} ${(c.tests ?? 0) - (c.failures ?? 0) - (c.errors ?? 0)}/${
            c.tests
          }`
        : null;
    const line = [part("api", parsed.api), part("e2e", parsed.e2e)]
      .filter(Boolean)
      .join(" · ");
    return line || null;
  } catch {
    return null;
  }
};

const G3RunJobAlert: FC<{ job: Job; homeworkId: string }> = ({
  job,
  homeworkId,
}) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const status = job.status ?? G3RunJobStatus.Queued;

  const toggleEvidence = async () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    if (detail != null || loading || !job.jobRef) return;
    setLoading(true);
    try {
      const response = await G3EvidenceService.getEvidence(
        homeworkId,
        job.jobRef
      );
      setDetail(response.data.detail ?? "");
      setSummary(countersLine(response.data.evidenceJson));
    } catch {
      setDetail("Не удалось загрузить логи прогона");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Alert severity={SEVERITY[status]} variant="outlined" sx={{ mb: 1 }}>
      <AlertTitle>
        {TITLE[status]}
        {job.jobRef ? ` · ${job.jobRef}` : ""}
      </AlertTitle>
      <Typography variant="body2">
        {job.fileName ?? "submission"}
        {job.sourceRevision != null ? ` · rev ${job.sourceRevision}` : ""}
        {job.createdAt
          ? ` · ${format(parseISO(job.createdAt), DATE_FORMAT)}`
          : ""}
        {job.finishedAt
          ? ` → ${format(parseISO(job.finishedAt), DATE_FORMAT)}`
          : ""}
      </Typography>
      {status === G3RunJobStatus.Failed && job.error ? (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {job.error}
        </Typography>
      ) : null}
      {summary ? (
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
          {summary}
        </Typography>
      ) : null}
      {status === G3RunJobStatus.Done && job.evidenceReady ? (
        <>
          <Button
            size="small"
            variant="outlined"
            sx={{ mt: 1.5 }}
            disabled={loading}
            onClick={toggleEvidence}
          >
            {open ? "Скрыть логи" : "Показать логи"}
          </Button>
          <Collapse in={open} unmountOnExit>
            <Typography
              variant="body2"
              component="pre"
              sx={{
                mt: 1,
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                maxHeight: 320,
                overflow: "auto",
              }}
            >
              {detail ?? (loading ? "Загрузка…" : "")}
            </Typography>
          </Collapse>
        </>
      ) : null}
    </Alert>
  );
};

const G3RunPanel: FC<G3RunPanelProps> = ({ homeworkId }) => {
  const { data, startPolling, stopPolling } = useG3RunJobsQuery({
    variables: { homeWorkId: homeworkId ?? "" },
    skip: !homeworkId,
    fetchPolicy: "cache-and-network",
  });
  const jobs = data?.g3RunJobs ?? [];
  const hasActive = jobs.some(
    (job) => job.status != null && ACTIVE.includes(job.status)
  );

  useEffect(() => {
    if (hasActive) {
      startPolling(10000);
      return () => stopPolling();
    }
    return undefined;
  }, [hasActive, startPolling, stopPolling]);

  if (!homeworkId || jobs.length === 0) {
    return null;
  }

  return (
    <Box sx={{ my: 2 }}>
      {jobs.map((job) => (
        <G3RunJobAlert
          key={job.jobRef ?? job.id}
          job={job}
          homeworkId={homeworkId}
        />
      ))}
      <Typography variant="caption" color="text.secondary" component="div">
        Автопроверка на изолированном раннере — предварительный результат.
        Финальное решение за ментором.
      </Typography>
    </Box>
  );
};

export default G3RunPanel;
