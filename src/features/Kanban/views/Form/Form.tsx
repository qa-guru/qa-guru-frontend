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
import AssignedToMeSelection from "../../containers/UserId";

const Form: React.FC = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      selectLectures: "",
      selectTrainings: "",
      creationDateFrom: "",
      creationDateTo: "",
      selectMentors: "",
      selectAssignToMe: "",
    },
  });
  const {
    setSelectedTrainingId,
    setSelectedLectureId,
    setSelectedCreationDateFrom,
    setSelectedCreationDateTo,
    setSelectedMentorId,
    setSelectedAssignToMe,
  } = useContext(KanbanContext);

  const handleFilterKanban: SubmitHandler<IFilterKanban> = (data) => {
    setSelectedTrainingId(data.selectTrainings);
    setSelectedLectureId(data.selectLectures);
    setSelectedCreationDateFrom(data.creationDateFrom);
    setSelectedCreationDateTo(data.creationDateTo);
    setSelectedMentorId(data.selectMentors);
    setSelectedAssignToMe(data.selectAssignToMe);
  };

  const handleReset = () => {
    setSelectedTrainingId(null);
    setSelectedLectureId(null);
    setSelectedCreationDateFrom(null);
    setSelectedCreationDateTo(null);
    setSelectedMentorId(null);
    setSelectedAssignToMe(null);
    reset();
  };

  return (
    <form>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={1.5}>
          <TrainingSelectionByRole control={control} />
        </Grid>
        <Grid item xs={12} sm={1.5}>
          <LectureSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={1.9}>
          <MentorsSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={1.5}>
          <AssignedToMeSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={1.7}>
          <CreationDateFromSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={1.7}>
          <CreationDateToSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Stack direction="row" spacing={1}>
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
