import { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";

import { Maybe, StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { STATES } from "shared/constants";

import useUpdateHomeworkStatus from "../../hooks/use-update-homework-status";
import { IStatusSelect } from "./status-select.types";
import { StyledIcon, StyledStack } from "./status-select.styled";
import ReturnForReworkDialog from "./return-for-rework-dialog";

const StatusSelect: FC<IStatusSelect> = ({ currentStatus, homeworkId }) => {
  const [status, setStatus] = useState(currentStatus);
  const [reworkOpen, setReworkOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const { takeForReview, approved } = useUpdateHomeworkStatus();
  const generationRef = useRef(0);

  useEffect(() => {
    generationRef.current += 1;
    setStatus(currentStatus);
    setReworkOpen(false);
    setPending(false);
    setActionError(null);
  }, [currentStatus, homeworkId]);

  const getAvailableStatuses = (status?: Maybe<StudentHomeWorkStatus>) => {
    switch (status) {
      case StudentHomeWorkStatus.Review:
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
    setActionError(null);

    if (newStatus === StudentHomeWorkStatus.NotApproved) {
      setReworkOpen(true);
      return;
    }

    const generation = generationRef.current;
    setPending(true);
    try {
      switch (newStatus) {
        case StudentHomeWorkStatus.InReview:
          await takeForReview({ variables: { homeworkId: homeworkId! } });
          break;
        case StudentHomeWorkStatus.Approved:
          await approved({ variables: { homeWorkId: homeworkId! } });
          break;
        default:
          return;
      }

      if (generation !== generationRef.current) return;
      setStatus(newStatus);
    } catch (error) {
      if (generation !== generationRef.current) return;
      console.error(error);
      setActionError(
        "Не удалось обновить статус. Проверьте актуальные данные."
      );
    } finally {
      if (generation === generationRef.current) setPending(false);
    }
  };

  const handleReworkDone = (newStatus: StudentHomeWorkStatus) => {
    setStatus(newStatus);
    setReworkOpen(false);
  };

  return (
    <FormControl fullWidth size="small">
      <Box>
        <InputLabel>Статус</InputLabel>
        <Select
          value={status!}
          label="Статус"
          onChange={updateStatus}
          disabled={pending}
        >
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
        {actionError && <FormHelperText error>{actionError}</FormHelperText>}
      </Box>
      <ReturnForReworkDialog
        homeworkId={homeworkId}
        open={reworkOpen}
        initialContent={null}
        onClose={() => setReworkOpen(false)}
        onDone={handleReworkDone}
      />
    </FormControl>
  );
};

export default StatusSelect;
