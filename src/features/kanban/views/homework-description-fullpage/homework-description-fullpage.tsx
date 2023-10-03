import React from "react";
import { Button, Box } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { IHomeworkDescriptionFullpage } from "./homework-description-fullpage.types";
import { StyledBox } from "./homework-description-fullpage.styled";

const HomeworkDescriptionFullpage: React.FC<
  IHomeworkDescriptionFullpage
> = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/kanban`);
  };

  return (
    <Box>
      <StyledBox>
        <Button onClick={handleBack} variant="contained">
          Назад <ChevronRightIcon />
        </Button>
      </StyledBox>
    </Box>
  );
};

export default HomeworkDescriptionFullpage;
