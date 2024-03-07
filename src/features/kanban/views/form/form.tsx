import { FC, useEffect, useState } from "react";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import useResponsive from "shared/hooks/use-responsive";

import {
  StyledAccordion,
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
    <form>
      {isMobileOrTablet ? (
        <StyledAccordion
          expanded={isAccordionExpanded}
          onChange={handleAccordionToggle}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Фильтр</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
          </AccordionDetails>
        </StyledAccordion>
      ) : (
        <StyledRow>
          <TrainingSelection control={control} />
          <LectureSelection control={control} />
          <MentorsSelection control={control} />
          <CreationDateFromSelection control={control} />
          <CreationDateToSelection control={control} />
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
