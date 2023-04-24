import React, { useState } from "react";
import { Typography } from "@mui/material";
import Form from "./components/Form";
import Board from "../KanbanContainer/Homeworks";
import { SelectedLectureIdContext } from "../../../context/SelectedLectureIdContext";
import { SelectedTrainingIdContext } from "../../../context/SelectedTrainingIdContext";
import { SelectedCreationDateFromContext } from "../../../context/SelectedCreationDateFromContext";
import { SelectedCreationDateToContext } from "../../../context/SelectedCreationDateToContext";
import { ShouldSkipHomeWorksContext } from "../../../context/ShouldSkipHomeWorksContext";

const Kanban = () => {
  const [selectedTrainingId, setSelectedTrainingId] =
    useState<string | null>(null);
  const [selectedLectureId, setSelectedLectureId] =
    useState<string | null>(null);
  const [selectedCreationDateFrom, setSelectedCreationDateFrom] =
    useState<string | null>(null);
  const [selectedCreationDateTo, setSelectedCreationDateTo] =
    useState<string | null>(null);
  const [shouldSkipHomeWorks, setShouldSkipHomeWorks] =
    useState<boolean>(false);

  return (
    <SelectedTrainingIdContext.Provider
      value={{ selectedTrainingId, setSelectedTrainingId }}
    >
      <SelectedLectureIdContext.Provider
        value={{ selectedLectureId, setSelectedLectureId }}
      >
        <SelectedCreationDateFromContext.Provider
          value={{ selectedCreationDateFrom, setSelectedCreationDateFrom }}
        >
          <SelectedCreationDateToContext.Provider
            value={{ selectedCreationDateTo, setSelectedCreationDateTo }}
          >
            <ShouldSkipHomeWorksContext.Provider
              value={{ shouldSkipHomeWorks, setShouldSkipHomeWorks }}
            >
              <Typography variant="h4">Task Board</Typography>
              <Form />
              <Board />
            </ShouldSkipHomeWorksContext.Provider>
          </SelectedCreationDateToContext.Provider>
        </SelectedCreationDateFromContext.Provider>
      </SelectedLectureIdContext.Provider>
    </SelectedTrainingIdContext.Provider>
  );
};

export default Kanban;
