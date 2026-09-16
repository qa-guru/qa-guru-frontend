import { FC } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { Lock as LockIcon, Schedule as ScheduleIcon } from "@mui/icons-material";

import {
  lectureGateBody,
  lectureGateKind,
  lectureGateTitle,
  lectureQueryFailureKind,
} from "shared/helpers";

import { ILectureGate } from "./lecture-gate.types";
import { StyledPaper } from "./lecture-gate.styled";

const LectureGate: FC<ILectureGate> = ({ slot, lectureMissing }) => {
  const kind = lectureMissing
    ? lectureQueryFailureKind(slot)
    : lectureGateKind(slot);
  const locked = kind === "locked" || kind === "denied";

  return (
    <StyledPaper>
      <Alert
        severity={locked ? "warning" : "info"}
        icon={locked ? <LockIcon /> : <ScheduleIcon />}
      >
        <AlertTitle>{lectureGateTitle(slot, lectureMissing)}</AlertTitle>
        {lectureGateBody(slot, lectureMissing)}
      </Alert>
    </StyledPaper>
  );
};

export default LectureGate;
