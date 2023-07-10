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
import { width } from "@mui/system";

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
        spacing={1}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item xs={12} md={2.4}>
          <TrainingSelectionByRole control={control} />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <LectureSelection control={control} />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <MentorsSelection control={control} />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <CreationDateFromSelection control={control} />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <CreationDateToSelection control={control} />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <Button
          onClick={handleSubmit(handleFilterKanban)}
          variant="contained"
          sx={{ width: "130px" }}
        >
          Применить
        </Button>
        <Button
          onClick={handleReset}
          color="secondary"
          variant="contained"
          sx={{ width: "130px" }}
        >
          Сбросить
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
