import React, { FC, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  // eslint-disable-next-line import/named
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import useUpdateHomeworkStatus from "features/kanban/hooks/use-update-homework-status";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { IStatusSelect, states } from "./status-select.types";
import { StyledIcon, StyledStack } from "./status-select.styled";

const StatusSelect: FC<IStatusSelect> = ({ currentStatus, homeworkId }) => {
  const [status, setStatus] = useState(currentStatus);
  const { takeForReview, approved, notApproved } = useUpdateHomeworkStatus();

  const getAvailableStatuses = (currentStatus: StudentHomeWorkStatus) => {
    switch (currentStatus) {
      case "NEW":
        return ["IN_REVIEW"];
      case "IN_REVIEW":
        return ["APPROVED", "NOT_APPROVED"];
      case "NOT_APPROVED":
        return ["APPROVED"];
      case "APPROVED":
      default:
        return [];
    }
  };

  const availableStatuses = getAvailableStatuses(status!);

  const updateStatus = async (
    event: SelectChangeEvent<StudentHomeWorkStatus>
  ) => {
    const newStatus = event.target.value as StudentHomeWorkStatus;
    setStatus(newStatus);

    switch (newStatus) {
      case "IN_REVIEW":
        await takeForReview({ variables: { homeworkId: homeworkId! } });
        break;
      case "APPROVED":
        await approved({ variables: { homeWorkId: homeworkId! } });
        break;
      case "NOT_APPROVED":
        await notApproved({ variables: { homeWorkId: homeworkId! } });
        break;
      default:
        break;
    }
  };

  return (
    <FormControl fullWidth>
      <Box>
        <InputLabel id="status-select-label">Статус</InputLabel>
        <Select
          id="status-select"
          value={status!}
          label="Статус"
          onChange={updateStatus}
        >
          {states.map(({ value, Icon, text }) => (
            <MenuItem
              key={value}
              value={value}
              disabled={!availableStatuses.includes(value)}
            >
              <StyledStack>
                <StyledIcon as={Icon} />
                <Typography>{text}</Typography>
              </StyledStack>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
};

export default StatusSelect;
