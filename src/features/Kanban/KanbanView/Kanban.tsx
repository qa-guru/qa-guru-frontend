import React, { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Board from "../KanbanContainer/Homeworks";
import TrainingSelection from "../KanbanContainer/TrainingsByMentor";
import LectureSelection from "../KanbanContainer/TrainingLectures";
import { SelectedTrainingIdContext } from "../../../context/SelectedTrainingIdContext";
import { SelectedLectureIdContext } from "../../../context/SelectedLectureIdContext";

const Kanban = () => {
  const [selectedTrainingId, setSelectedTrainingId] =
    useState<string | null>(null);
  const [selectedLectureId, setSelectedLectureId] =
    useState<string | null>(null);

  return (
    <SelectedTrainingIdContext.Provider
      value={{ selectedTrainingId, setSelectedTrainingId }}
    >
      <SelectedLectureIdContext.Provider
        value={{ selectedLectureId, setSelectedLectureId }}
      >
        <Typography variant="h4">Task Board</Typography>
        <Stack direction="row" spacing={3} mt="20px">
          <TrainingSelection />
          <LectureSelection />
        </Stack>
        <Board />
      </SelectedLectureIdContext.Provider>
    </SelectedTrainingIdContext.Provider>
  );
};

export default Kanban;
