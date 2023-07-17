import React, { useContext } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
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

  return (
    <form>
      <Grid
        container
        spacing={{ xs: 1.5, lg: 1 }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item xs={12} md={1.9} lg={2}>
          <TrainingSelectionByRole control={control} />
        </Grid>
        <Grid item xs={12} md={1.9} lg={2}>
          <LectureSelection control={control} />
        </Grid>
        <Grid item xs={12} md={1.9} lg={2}>
          <MentorsSelection control={control} />
        </Grid>
        <Grid item xs={12} md={1.9} lg={2}>
          <CreationDateFromSelection control={control} />
        </Grid>
        <Grid item xs={12} md={1.9} lg={2}>
          <CreationDateToSelection control={control} />
        </Grid>
        <Grid item xs={12} md={2.5} lg={2}>
          <Stack
            direction="row"
            justifyContent={{ xs: "center", md: "flex-end" }}
            spacing={1}
          >
            <Button
              onClick={handleSubmit(handleFilterKanban)}
              variant="contained"
              sx={{ fontSize: { xs: "12px", xl: "14px" } }}
            >
              Применить
            </Button>
            <Button
              onClick={handleReset}
              color="secondary"
              variant="contained"
              sx={{ fontSize: { xs: "12px", xl: "14px" } }}
            >
              Сбросить
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
