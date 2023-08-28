import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/system";
import { IFilterKanban } from "./Form.types";
import CreationDateFromSelection from "./CreationDateFromSelection";
import CreationDateToSelection from "./CreationDateToSelection";
import MentorsSelection from "../../containers/Mentors";
import LectureSelection from "../../containers/TrainingLectures";
import { KanbanContext } from "../../context/KanbanContext";
import TrainingSelectionByRole from "../../roles/TrainingSelectionByRole";

const Form: React.FC = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      selectLectures: "",
      selectTrainings: "",
      creationDateFrom: "",
      creationDateTo: "",
      selectMentors: "",
    },
  });

  const [isAccordionExpanded, setAccordionExpanded] = useState(false);
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    setSelectedTrainingId,
    setSelectedLectureId,
    setSelectedCreationDateFrom,
    setSelectedCreationDateTo,
    setSelectedMentorId,
  } = useContext(KanbanContext);

  const handleFilterKanban: SubmitHandler<IFilterKanban> = (data) => {
    setSelectedTrainingId(data.selectTrainings);
    setSelectedLectureId(data.selectLectures);
    setSelectedCreationDateFrom(data.creationDateFrom);
    setSelectedCreationDateTo(data.creationDateTo);
    setSelectedMentorId(data.selectMentors);
  };

  const handleReset = () => {
    setSelectedTrainingId(null);
    setSelectedLectureId(null);
    setSelectedCreationDateFrom(null);
    setSelectedCreationDateTo(null);
    setSelectedMentorId(null);
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
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <TrainingSelectionByRole control={control} />
              </Grid>
              <Grid item>
                <LectureSelection control={control} />
              </Grid>
              <Grid item>
                <MentorsSelection control={control} />
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <CreationDateFromSelection control={control} />
                  <CreationDateToSelection control={control} />
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" justifyContent={"center"} spacing={2}>
                  <Button
                    onClick={handleSubmit(handleFilterKanban)}
                    variant="contained"
                    sx={{ fontSize: "14px" }}
                  >
                    Применить
                  </Button>
                  <Button
                    onClick={handleReset}
                    color="secondary"
                    variant="contained"
                    sx={{ fontSize: "14px" }}
                  >
                    Сбросить
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Grid container spacing={1.5} alignItems="center">
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
            <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
              <Button
                onClick={handleSubmit(handleFilterKanban)}
                variant="contained"
                size="large"
                sx={{ fontSize: "12px" }}
              >
                Применить
              </Button>
              <Button
                onClick={handleReset}
                color="secondary"
                variant="contained"
                size="large"
                sx={{ fontSize: "12px" }}
              >
                Сбросить
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default Form;
