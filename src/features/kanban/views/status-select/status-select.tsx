import { FC, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";

import { Maybe, StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { STATES } from "shared/constants";

import { IStatusSelect } from "./status-select.types";
import { StyledIcon, StyledStack } from "./status-select.styled";
import useUpdateHomeworkStatus from "../../hooks/use-update-homework-status";

const StatusSelect: FC<IStatusSelect> = ({ currentStatus, homeworkId }) => {
  const [status, setStatus] = useState(currentStatus);
  const { takeForReview, approved, notApproved } = useUpdateHomeworkStatus();

  const getAvailableStatuses = (
    currentStatus?: Maybe<StudentHomeWorkStatus>
  ) => {
    switch (currentStatus) {
      case StudentHomeWorkStatus.New:
        return [StudentHomeWorkStatus.InReview];
      case StudentHomeWorkStatus.InReview:
        return [
          StudentHomeWorkStatus.Approved,
          StudentHomeWorkStatus.NotApproved,
        ];
      case StudentHomeWorkStatus.NotApproved:
        return StudentHomeWorkStatus.Approved;
      case StudentHomeWorkStatus.Approved:
      default:
        return [];
    }
  };

  const availableStatuses = getAvailableStatuses(status);

  const updateStatus = async (
    event: SelectChangeEvent<StudentHomeWorkStatus>
  ) => {
    const newStatus = event.target.value as StudentHomeWorkStatus;
    setStatus(newStatus);

    switch (newStatus) {
      case StudentHomeWorkStatus.InReview:
        await takeForReview({ variables: { homeworkId: homeworkId! } });
        break;
      case StudentHomeWorkStatus.Approved:
        await approved({ variables: { homeWorkId: homeworkId! } });
        break;
      case StudentHomeWorkStatus.NotApproved:
        await notApproved({ variables: { homeWorkId: homeworkId! } });
        break;
      default:
        break;
    }
  };

  return (
    <FormControl fullWidth size="small">
      <Box>
        <InputLabel>Статус</InputLabel>
        <Select value={status!} label="Статус" onChange={updateStatus}>
          {STATES.map(({ value, Icon, text }) => (
            <MenuItem
              key={value}
              value={value}
              disabled={
                !availableStatuses.includes(value as StudentHomeWorkStatus)
              }
            >
              <StyledStack>
                <StyledIcon as={Icon} />
                <Typography variant="body2">{text}</Typography>
              </StyledStack>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
  );
};

export default StatusSelect;
