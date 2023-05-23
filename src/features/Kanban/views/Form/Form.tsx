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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={2}>
          <TrainingSelectionByRole control={control} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <LectureSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <MentorsSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <CreationDateFromSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <CreationDateToSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={handleSubmit(handleFilterKanban)}
              variant="contained"
            >
              Применить
            </Button>
            <Button onClick={handleReset} color="secondary" variant="contained">
              Сбросить
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
