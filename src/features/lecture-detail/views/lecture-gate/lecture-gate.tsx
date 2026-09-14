import { FC } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { Lock as LockIcon, Schedule as ScheduleIcon } from "@mui/icons-material";

import {
  lectureCardBody,
  lectureCardTitle,
  lectureGateKind,
} from "shared/helpers";

import { ILectureGate } from "./lecture-gate.types";
import { StyledPaper } from "./lecture-gate.styled";

const LectureGate: FC<ILectureGate> = ({ slot }) => {
  const kind = lectureGateKind(slot);
  const locked = kind === "locked";

  return (
    <StyledPaper>
      <Alert
        severity={locked ? "warning" : "info"}
        icon={locked ? <LockIcon /> : <ScheduleIcon />}
      >
        <AlertTitle>{lectureCardTitle(slot)}</AlertTitle>
        {lectureCardBody(slot)}
      </Alert>
    </StyledPaper>
  );
};

export default LectureGate;
