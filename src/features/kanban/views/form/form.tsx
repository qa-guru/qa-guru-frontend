import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/system";
import CreationDateFromSelection from "./creation-date-from-selection";
import CreationDateToSelection from "./creation-date-to-selection";
import {
  StyledColumnStack,
  StyledGrid,
  StyledLargeButton,
  StyledRowStack,
  StyledSmallButton,
} from "./form.styled";
import MentorsSelection from "../../containers/mentors";
import LectureSelection from "../../containers/training-lectures";
import { KanbanContext } from "../../context/kanban-context";
import TrainingSelectionByRole from "../../roles/training-selection-by-role";

const Form: React.FC = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      lectures: "",
      trainings: "",
      creationDateFrom: "",
      creationDateTo: "",
      mentors: "",
    },
  });

  const [isAccordionExpanded, setAccordionExpanded] = useState(false);
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    setTrainingId,
    setLectureId,
    setMentorId,
    setCreationDateFrom,
    setCreationDateTo,
  } = useContext(KanbanContext);

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

  return (
    <form>
      {isDownMd ? (
        <Accordion
          expanded={isAccordionExpanded}
          onChange={handleAccordionToggle}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Фильтр</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StyledColumnStack>
              <TrainingSelectionByRole control={control} />
              <LectureSelection control={control} />
              <MentorsSelection control={control} />
              <StyledRowStack>
                <CreationDateFromSelection control={control} />
                <CreationDateToSelection control={control} />
              </StyledRowStack>
              <StyledRowStack>
                <StyledSmallButton
                  onClick={handleReset}
                  color="secondary"
                  variant="contained"
                >
                  Сбросить
                </StyledSmallButton>
              </StyledRowStack>
            </StyledColumnStack>
          </AccordionDetails>
        </Accordion>
      ) : (
        <StyledGrid container>
          <Grid item md={1.9} lg={2}>
            <TrainingSelectionByRole control={control} />
          </Grid>
          <Grid item md={1.9} lg={2}>
            <LectureSelection control={control} />
          </Grid>
          <Grid item md={1.9} lg={2}>
            <MentorsSelection control={control} />
          </Grid>
          <Grid item md={1.9} lg={2}>
            <CreationDateFromSelection control={control} />
          </Grid>
          <Grid item md={1.9} lg={2}>
            <CreationDateToSelection control={control} />
          </Grid>
          <Grid item md={2.5} lg={2}>
            <StyledLargeButton
              onClick={handleReset}
              color="secondary"
              variant="contained"
              size="large"
            >
              Сбросить
            </StyledLargeButton>
          </Grid>
        </StyledGrid>
      )}
    </form>
  );
};

export default Form;
