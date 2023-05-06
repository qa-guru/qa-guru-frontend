import React, { useContext } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFilterKanban } from "./Form.types";
import CreationDateFromSelection from "./CreationDateFromSelection";
import CreationDateToSelection from "./CreationDateToSelection";
import TrainingSelection from "../../containers/TrainingsByMentor";
import LectureSelection from "../../containers/TrainingLectures";
import { KanbanContext } from "../../context/KanbanContext";

const Form: React.FC = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      selectLectures: "",
      selectTrainings: "",
      creationDateFrom: "",
      creationDateTo: "",
    },
  });
  const {
    setSelectedTrainingId,
    setSelectedLectureId,
    setSelectedCreationDateFrom,
    setSelectedCreationDateTo,
  } = useContext(KanbanContext);

  const handleFilterKanban: SubmitHandler<IFilterKanban> = (data) => {
    setSelectedTrainingId(data.selectTrainings);
    setSelectedLectureId(data.selectLectures);
    setSelectedCreationDateFrom(data.creationDateFrom);
    setSelectedCreationDateTo(data.creationDateTo);
  };

  const handleReset = () => {
    setSelectedTrainingId(null);
    setSelectedLectureId(null);
    setSelectedCreationDateFrom(null);
    setSelectedCreationDateTo(null);
    reset();
  };

  return (
    <form style={{ marginTop: "20px" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={2}>
          <TrainingSelection control={control} />
        </Grid>
        <Grid item xs={12} sm={2}>
          <LectureSelection control={control} />
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
            <Button onClick={handleReset} variant="contained">
              Сбросить
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
