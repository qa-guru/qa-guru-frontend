import { FC, useEffect, useState } from "react";
import { AccordionSummary, Box, IconButton, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import useResponsive from "shared/hooks/use-responsive";

import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledColumnStack,
  StyledRow,
  StyledRowStack,
} from "./form.styled";
import CreationDateFromSelection from "../creation-date-from-selection";
import CreationDateToSelection from "../creation-date-to-selection";
import { LectureSelection, MentorsSelection } from "../../containers";
import { useKanbanForm } from "../../context/kanban-form-context";
import TrainingSelection from "../../containers/trainings";

const Form: FC = () => {
  const { control, reset, resetField } = useForm({
    defaultValues: {
      lectures: "",
      trainings: "",
      creationDateFrom: "",
      creationDateTo: "",
      mentors: "",
    },
  });

  const [isAccordionExpanded, setAccordionExpanded] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const { isMobileOrTablet } = useResponsive();

  const {
    lectureId,
    setTrainingId,
    setLectureId,
    setMentorId,
    setCreationDateFrom,
    setCreationDateTo,
  } = useKanbanForm();

  const handleReset = () => {
    setTrainingId(null);
    setLectureId(null);
    setMentorId(null);
    setCreationDateFrom(null);
    setCreationDateTo(null);
    reset();
    setResetCounter((n) => n + 1);
  };

  const handleAccordionToggle = () => {
    setAccordionExpanded(!isAccordionExpanded);
  };

  useEffect(() => {
    if (!lectureId) {
      resetField("lectures");
    }
  }, [lectureId, resetField]);

  return (
    <form style={{ minWidth: "100%" }}>
      {isMobileOrTablet ? (
        <StyledAccordion
          expanded={isAccordionExpanded}
          onChange={handleAccordionToggle}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Фильтр</Typography>
          </AccordionSummary>
          <StyledAccordionDetails>
            <StyledColumnStack>
              <TrainingSelection control={control} />
              <LectureSelection control={control} />
              <MentorsSelection control={control} />
              <StyledRowStack>
                <CreationDateFromSelection control={control} />
                <CreationDateToSelection control={control} />
              </StyledRowStack>
              <StyledRowStack>
                <IconButton onClick={handleReset}>
                  <RefreshIcon color={"primary"} />
                </IconButton>
              </StyledRowStack>
            </StyledColumnStack>
          </StyledAccordionDetails>
        </StyledAccordion>
      ) : (
        <StyledRow>
          <TrainingSelection control={control} />
          <LectureSelection control={control} />
          <MentorsSelection control={control} />
          <CreationDateFromSelection
            control={control}
            key={`creationDateFrom-${resetCounter}`}
          />
          <CreationDateToSelection
            control={control}
            key={`creationDateTo-${resetCounter}`}
          />
          <Box>
            <IconButton onClick={handleReset}>
              <RefreshIcon color={"primary"} fontSize={"medium"} />
            </IconButton>
          </Box>
        </StyledRow>
      )}
    </form>
  );
};

export default Form;
