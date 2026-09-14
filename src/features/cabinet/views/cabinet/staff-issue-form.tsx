import { FC, FormEvent, useState } from "react";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";

import { StaffIssueInput, staffIssueStatusLine } from "../../staff-issue";
import { ContourStatus } from "../../types";
import { StyledPaper } from "./cabinet.styled";

export type StaffIssueFormProps = {
  issuing?: boolean;
  error?: string | null;
  result?: ContourStatus | null;
  onSubmit: (input: StaffIssueInput) => void;
};

const StaffIssueForm: FC<StaffIssueFormProps> = ({
  issuing = false,
  error = null,
  result = null,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, handle });
  };

  const blocked = issuing || !email.trim() || !handle.trim();
  const failed = result?.status === "failed";

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Выдать контур ученику
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        POST /api/staff/contours. Email ученика в теле, не из JWT
        преподавателя. Шаблон etalon, квота 1 активный / курс.
      </Typography>
      <Stack gap={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email ученика"
          name="email"
          type="text"
          autoComplete="off"
          value={email}
          disabled={issuing}
          onChange={(event) => setEmail(event.target.value)}
          inputProps={{ "data-testid": "staff-issue-email" }}
        />
        <TextField
          label="Handle ученика"
          name="handle"
          autoComplete="off"
          value={handle}
          disabled={issuing}
          onChange={(event) => setHandle(event.target.value)}
          helperText="логин контура; API требует handle вместе с email"
          inputProps={{ "data-testid": "staff-issue-handle" }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={blocked}
          data-testid="staff-issue-submit"
        >
          {issuing ? "Выдаём…" : "Выдать контур"}
        </Button>
        {error ? (
          <Alert severity="error" data-testid="staff-issue-error">
            {error}
          </Alert>
        ) : null}
        {result ? (
          <Alert
            severity={failed ? "error" : "success"}
            data-testid="staff-issue-status"
          >
            {staffIssueStatusLine(result.status, result.error)}
          </Alert>
        ) : null}
      </Stack>
    </StyledPaper>
  );
};

export default StaffIssueForm;
