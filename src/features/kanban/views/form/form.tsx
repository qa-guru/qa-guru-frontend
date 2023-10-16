import { FC, useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreationDateFromSelection from "./creation-date-from-selection";
import CreationDateToSelection from "./creation-date-to-selection";
import { StyledColumnStack, StyledRow, StyledRowStack } from "./form.styled";
import MentorsSelection from "../../containers/mentors";
import LectureSelection from "../../containers/training-lectures";
import { KanbanFormContext } from "../../context/kanban-form-context";
import TrainingSelectionByRole from "../../roles/training-selection-by-role";

const Form: FC = () => {
  const { control, reset } = useForm({
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
  } = useContext(KanbanFormContext);

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
                <IconButton onClick={handleReset}>
                  <RefreshIcon color={"primary"} fontSize={"large"} />
                </IconButton>
              </StyledRowStack>
            </StyledColumnStack>
          </AccordionDetails>
        </Accordion>
      ) : (
        <StyledRow>
          <TrainingSelectionByRole control={control} />
          <LectureSelection control={control} />
          <MentorsSelection control={control} />
          <CreationDateFromSelection control={control} />
          <CreationDateToSelection control={control} />
          <Box>
            <IconButton onClick={handleReset}>
              <RefreshIcon color={"primary"} fontSize={"large"} />
            </IconButton>
          </Box>
        </StyledRow>
      )}
    </form>
  );
};

export default Form;
